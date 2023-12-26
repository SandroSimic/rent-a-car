import mongoose from "mongoose";
import Car from "../models/carModel.js";
import User from "../models/userModel.js";
import catchAsync from "../middleware/catchAsync.js";
import AppError from "../utils/appError.js";
import {
  priceFilter,
  keywordFilter,
  ratingsAverageFilter,
  buildFilter,
} from "../utils/carFilters.js";
import { deleteImageFromS3, s3Upload } from "../utils/s3Service.js";

const getAllCars = catchAsync(async (req, res, next) => {
  // Pagination
  const pageSize = 9;
  const page = Number(req.query.pageNumber) || 1;
  // Search filters
  const search = keywordFilter(req.query.keyword);
  // Price Filter-------------------------
  const price = priceFilter(req.query.priceFrom, req.query.priceTo);
  // Rating Filter-------------------------
  const rating = ratingsAverageFilter(req.query.ratingsAverage);
  // Car Model Filter
  const carModel = buildFilter(req.query.model, "carModel");
  // Car Body Style Filter
  const carBodyStyle = buildFilter(req.query.bodyStyle, "bodyStyle");
  // Car Transmission Filter
  const carTransmission = buildFilter(req.query.transmission, "transmission");
  // Engine Type Filter
  const carEngineType = buildFilter(req.query.engineType, "engineType");

  // Query
  const query = {
    ...search,
    ...price,
    ...rating,
    ...carModel,
    ...carBodyStyle,
    ...carTransmission,
    ...carEngineType,
  };

  // Search and Count Cars
  const count = await Car.countDocuments(query);

  const cars = await Car.find(query)
    .populate("owner", "username")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ cars, page, pages: Math.ceil(count / pageSize) });
});

const getCar = catchAsync(async (req, res, next) => {
  const carId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return next(new AppError("Invalid Car Id", 404));
  }

  const car = await Car.findById(carId).populate("owner", "username");

  if (car) {
    res.status(200).json(car);
  } else {
    return next(new AppError("No car found with that id", 404));
  }
});

const createCar = catchAsync(async (req, res, next) => {
  const {
    name,
    price,
    rating,
    carModel,
    bodyStyle,
    transmission,
    engineType,
    description,
    year,
    longitude,
    latitude,
  } = req.body;

  if (!req.file || !req.file.buffer) {
    throw new AppError("No file or empty file uploaded", 400);
  }

  const data = await s3Upload(req.file);

  const car = new Car({
    name,
    price,
    rating,
    carModel,
    bodyStyle,
    transmission,
    engineType,
    description,
    year,
    image: data.Location,
    owner: req.user._id,
    lat: latitude,
    lng: longitude,
  });

  const newCar = await car.save();

  res.status(201).json(newCar);
});

const deleteCar = catchAsync(async (req, res, next) => {
  const carId = req.params.id;

  const car = await Car.findById(carId);

  if (!car) {
    return next(new AppError("No car found with that Id", 404));
  }

  if (car.image) {
    try {
      await deleteImageFromS3(car.image);
    } catch (err) {
      console.error("Error deleting image from S3:", err);
      return next(new AppError("Error deleting image from S3", 500));
    }
  }

  await Car.deleteOne({ _id: car._id });
  res.status(200).json({ message: "Car deleted" });
});

const updateCar = catchAsync(async (req, res, next) => {
  const {
    name,
    price,
    rating,
    carModel,
    bodyStyle,
    transmission,
    engineType,
    description,
    lat,
    lng,
  } = req.body;

  const carId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(carId)) {
    return next(new AppError("Invalid Car Id", 404));
  }

  let updatedCarData = {
    name,
    price,
    rating,
    carModel,
    bodyStyle,
    transmission,
    engineType,
    description,
    lat,
    lng,
  };

  if (req.file && req.file.buffer) {
    const data = await s3Upload(req.file);
    updatedCarData = {
      ...updatedCarData,
      image: data.Location || "",
    };
  }

  const updatedCar = await Car.findByIdAndUpdate(carId, updatedCarData, {
    new: true,
    runValidators: true,
  });

  if (!updatedCar) {
    return next(new AppError("Car not found", 404));
  }

  res.status(200).json({ updatedCar });
});

const getUsersCars = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const usersCars = await Car.find({ owner: userId });

  if (!usersCars || usersCars.length === 0) {
    return res.status(404).json({ message: "No cars found for this user" });
  }

  res.status(200).json({ usersCars });
});

const getMyCars = catchAsync(async (req, res, next) => {
  const myId = req.user._id;

  const myCars = await Car.find({ owner: myId });

  if (!myCars || myCars.length === 0) {
    return res.status(404).json({ message: "No cars found" });
  }

  res.status(200).json(myCars);
});

const createCarReview = catchAsync(async (req, res, next) => {
  const { rating, comment } = req.body;
  const { username, userImage } = req.user;

  if (!rating || !comment) {
    return next(new AppError("Please enter a review and a rating", 400));
  }

  const car = await Car.findById(req.params.id);

  if (car) {
    const alreadyReviewed = car.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return next(new AppError("You have already submitted a review", 400));
    }

    const review = {
      user: req.user._id,
      username,
      image: userImage,
      rating: Number(rating),
      comment,
    };

    car.reviews.push(review);
    car.numRatings = car.reviews.length;

    const totalRatings = car.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    car.ratingsAverage = totalRatings / car.numRatings;
    await car.save();

    res.status(201).json({ message: "Review added successfully" });
  } else {
    return next(new AppError("Resource not found", 404));
  }
});

export {
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
  createCar,
  getUsersCars,
  getMyCars,
  createCarReview,
};

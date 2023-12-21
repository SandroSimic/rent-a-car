import mongoose from "mongoose";
import Car from "../models/carModel.js";
import catchAsync from "../middleware/catchAsync.js";
import AppError from "../utils/appError.js";
import {
  priceFilter,
  keywordFilter,
  ratingsAverageFilter,
  buildFilter,
} from "../utils/carFilters.js";
import { s3Upload } from "../utils/s3Service.js";

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

const getAllCarsNoFilter = catchAsync(async (req, res, next) => {
  const cars = await Car.find();

  if (cars.length === 0) {
    return next(new AppError("There are no cars", 404));
  }

  res.status(200).json({ cars });
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

  if (car) {
    await Car.deleteOne({ _id: car._id });
    res.status(200).json({ message: "car deleted" });
  } else {
    return next(new AppError("No car found with that Id", 404));
  }
});

const updateCar = catchAsync(async (req, res) => {
  try {
    const {
      name,
      price,
      rating,
      carModel,
      bodyStyle,
      transmission,
      engineType,
      description,
    } = req.body;
    const carId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return next(new AppError("Invalid Car Id", 404));
    }

    const car = await Car.findById(carId);

    if (car) {
      car.name = name || car.name;
      car.price = price || car.price;
      car.rating = rating || car.rating;
      car.carModel = carModel || car.carModel;
      car.bodyStyle = bodyStyle || car.bodyStyle;
      car.transmission = transmission || car.transmission;
      car.engineType = engineType || car.engineType;
      car.description = description || car.description;

      const updatedCar = await car.save();
      res.status(201).json(updatedCar);
    } else {
      return next(new AppError("No car found with that Id", 404));
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

export {
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
  createCar,
  getAllCarsNoFilter,
};

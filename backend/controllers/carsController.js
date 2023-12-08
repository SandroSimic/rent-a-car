import Car from "../models/carModel.js";

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json(cars);
  } catch (error) {
    console.log("Error: ", error);
  }
};

const getCar = async (req, res) => {
  const carId = req.params.id;

  const car = await Car.findById(carId);

  if (car) {
    res.status(200).json(car);
  } else {
    res.status(404).json({ message: "No car found" });
  }
};

const createCar = async (req, res) => {
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
    const car = new Car({
      name,
      price,
      rating,
      carModel,
      bodyStyle,
      transmission,
      engineType,
      description,
    });

    const newCar = await car.save();

    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;

    const car = await Car.findById(carId);

    if (car) {
      await Car.deleteOne({ _id: car._id });
      res.status(200).json({ message: "car deleted" });
    } else {
      res.status(404).json({ message: "No car found" });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

const updateCar = async (req, res) => {
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
      res.status(404).json({ message: "no car found with that id" });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export { getAllCars, getCar, deleteCar, updateCar, createCar };

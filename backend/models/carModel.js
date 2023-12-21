import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  rating: { type: Number, default: 4 },
  numRatings: { type: Number, default: 1 },
  ratingsAverage: { type: Number, default: 4 },
  carModel: {
    type: String,
    enum: [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "BMW",
      "Mercedes",
      "Audi",
      "Tesla",
      "Nissan",
      "Hyundai",
      "Porsche",
      "Ferrari",
      "Lamborghini",
    ],
    required: [true, "Model of car is required"],
  },
  bodyStyle: {
    type: String,
    enum: ["Coupe", "Jeep", "Sedan", "Sport"],
    required: [true, "Body of car is required"],
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual"],
    required: [true, "Transmission is required"],
  },
  engineType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "LPG", "Hybrid"],
    required: [true, "Transmission is required"],
  },
  image: {
    type: String,
    required: [true, "Image of car is required"],
  },
  description: {
    type: String,
    required: [true, "description on car is required"],
  },
  year: {
    type: Number,
    required: [true, "Year of car is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
});

const Car = mongoose.model("Car", carSchema);
export default Car;

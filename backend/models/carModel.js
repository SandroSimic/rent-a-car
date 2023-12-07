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
  rating: Number,
  numRatings: Number,
  ratingsAverage: Number,
  carModel: {
    type: String,
    enum: [
      "toyota",
      "honda",
      "ford",
      "chevrolet",
      "bmw",
      "mercedes-benz",
      "audi",
      "tesla",
      "nissan",
      "hyundai",
    ],
    required: [true, "Model of car is required"],
  },
  bodyStyle: {
    type: String,
    enum: ["coupe", "jeep", "sedan", "sport"],
    required: [true, "Body of car is required"],
  },
  transmission: {
    type: String,
    enum: ["automatic", "manual"],
    required: [true, "Transmission is required"],
  },
  engineType: {
    type: String,
    enum: ["petrol", "diesel", "electric", "lpg", "hybrid"],
    required: [true, "Transmission is required"],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "description on car is required"],
  },
});

const Car = mongoose.model("Car", carSchema);
export default Car;

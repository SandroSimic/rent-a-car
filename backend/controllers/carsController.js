const getAllCars = async (req, res) => {
  res.send("Get All Cars");
};

const getCar = (req, res) => {
  res.send("Get Car");
};

const createCar = (req, res) => {
  res.send("Create car");
};

const deleteCar = (req, res) => {
  res.send("Delete Car");
};

const updateCar = (req, res) => {
  res.send("update Car");
};

export { getAllCars, getCar, deleteCar, updateCar, createCar };

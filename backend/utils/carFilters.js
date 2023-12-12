const keywordFilter = (keyword) => {
  return keyword ? { name: { $regex: keyword, $options: "i" } } : {};
};

const priceFilter = (priceFrom, priceTo) => {
  const priceFilter = {};
  if (priceFrom || priceTo) {
    if (priceFrom) {
      priceFilter.$gte = Number(priceFrom);
    }
    if (priceTo) {
      priceFilter.$lte = Number(priceTo);
    }
  }
  return Object.keys(priceFilter).length !== 0 ? { price: priceFilter } : {};
};

const ratingsAverageFilter = (ratingAverage) => {
  return ratingAverage ? { ratingsAverage: { $gte: Number(ratingAverage) } } : {};
};

const buildFilter = (param, field) => {
  return param ? { [field]: { $regex: param, $options: "i" } } : {};
};

export { keywordFilter, priceFilter, ratingsAverageFilter, buildFilter };

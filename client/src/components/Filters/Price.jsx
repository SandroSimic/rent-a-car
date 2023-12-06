
const Price = () => {
  return (
      <div className="filter__price">
        <h2>Price: </h2>
        <div className="filter__price__range">
          <input type="number" placeholder="from"/>
          <div className="filter__price__range--line" />
          <input type="number" placeholder="to"/>
        </div>
      </div>
  );
};

export default Price;

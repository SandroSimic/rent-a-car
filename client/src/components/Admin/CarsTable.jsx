/* eslint-disable react/prop-types */
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const CarsTable = ({ cars, handleDelete }) => {
  const AllCars = cars?.cars;
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Owner</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {cars &&
            AllCars?.map((car) => (
              <tr key={car._id}>
                <td data-cell="image">
                  <Link to={`/car/${car._id}`}>
                    <img src={car.image} alt={car.name} />
                  </Link>
                </td>
                <td data-cell="name">
                  {" "}
                  <Link to={`/car/${car._id}`}>{car.name}</Link>
                </td>
                <td data-cell="owner">{car.owner.username}</td>
                <td data-cell="id">{car._id}</td>
                <td data-cell="">
                  <button
                    className="carDetails__actions--delete"
                    onClick={() => handleDelete(car._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td data-cell="">
                  <Link to={`/car/edit/${car._id}`}>
                    <button className="carDetails__actions--edit">
                      <MdEdit />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsTable;

import { useEffect, useState } from "react";
import { useGetAllUsers } from "../Users/useGetAllUsers";
import { useDeleteUser } from "../Users/useDeleteUser";
import { useGetAllCars } from "../Cars/useGetAllCars";
import { useDeleteCar } from "../Cars/useDeleteCar";

import UsersTable from "./UsersTable";
import CarsTable from "./CarsTable";
import Spinner from "../../UI/Spinner";

const Table = () => {
  const [switchTable, setSwitchTable] = useState(false);
  const { users, refetch } = useGetAllUsers();
  const { cars } = useGetAllCars();
  const { deleteUserQuery, isDeleting } = useDeleteUser();
  const { deleteCarQuery } = useDeleteCar();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      try {
        deleteUserQuery(userId);
        refetch();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleDeleteCar = async (carId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Car?"
    );
    if (confirmed) {
      try {
        deleteCarQuery(carId);
        refetch();
      } catch (error) {
        console.error("Error deleting Car:", error);
      }
    }
  };

  if (isDeleting) {
    return <Spinner />;
  }

  return (
    <div>
      <caption className="switchTable">
        <span
          className={`table__active ${switchTable ? "active" : ""}`}
          onClick={() => setSwitchTable(true)}
        >
          Users
        </span>{" "}
        /{" "}
        <span
          className={`table__active ${!switchTable ? "active" : ""}`}
          onClick={() => setSwitchTable(false)}
        >
          Cars
        </span>
      </caption>
      {switchTable ? (
        <UsersTable users={users} handleDelete={handleDeleteUser} />
      ) : (
        <CarsTable cars={cars} handleDelete={handleDeleteCar} />
      )}
    </div>
  );
};

export default Table;

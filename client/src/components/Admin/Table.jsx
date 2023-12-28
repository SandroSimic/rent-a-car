import React, { useEffect } from "react";
import { useGetAllUsers } from "../Users/useGetAllUsers";
import { useDeleteUser } from "../Users/useDeleteUser";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Table = () => {
  const { users, refetch } = useGetAllUsers();
  const { deleteUserQuery, isDeleting } = useDeleteUser();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = async (userId) => {
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

  return (
    <table className="table">
      <caption>Users</caption>

      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>ID</th>
      </tr>

      {users?.map((user) => (
        <>
          <tr key={user._id}>
            <td data-cell="image">
              <Link to={`/user/${user._id}`}>
                <img src={user.userImage} alt={user.username} />
              </Link>
            </td>
            <td data-cell="username">
              {" "}
              <Link to={`/user/${user._id}`}>{user.username}</Link>
            </td>
            <td data-cell="email">{user.email}</td>
            <td data-cell="id">{user._id}</td>
            <td data-cell="">
              <button
                className="carDetails__actions--delete"
                onClick={() => handleDelete(user._id)}
              >
                <MdDelete />
              </button>
            </td>
            <td data-cell="">
              <Link to={`/users/${user._id}/edit`}>
                <button className="carDetails__actions--edit">
                  <MdEdit />
                </button>
              </Link>
            </td>
          </tr>
        </>
      ))}
    </table>
  );
};

export default Table;

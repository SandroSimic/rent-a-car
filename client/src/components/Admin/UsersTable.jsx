/* eslint-disable react/prop-types */
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const UsersTable = ({ users, handleDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>ID</th>
        </tr>
      </thead>

      <tbody>
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
      </tbody>
    </table>
  );
};

export default UsersTable;

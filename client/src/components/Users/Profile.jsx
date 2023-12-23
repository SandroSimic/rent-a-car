import React from "react";
import { useMyCars } from "./useMyCars";
import { useUser } from "../Users/useUser";

const Profile = () => {
  const { isLoading, myCars, error } = useMyCars();
  const { user } = useUser();

  return (
    <div className="profile">
      <div className="profile__info">
        <img src={user?.userImage} alt={user?.name} />
        <div className="profile__info__text">
          <h2>{user?.username}</h2>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

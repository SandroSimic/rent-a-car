/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useMyCars } from "./useMyCars";
import { useUser } from "../Users/useUser";
import MyCarsCard from "./MyCarsCard";
import { fetchCountryName } from "../../utils/fetchCityName";

const Profile = () => {
  const { isLoading, myCars, error } = useMyCars();
  const { user } = useUser();

  const [countries, setCountries] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const countryData = {};
      for (const myCar of myCars) {
        const country = await fetchCountryName(myCar.lat, myCar.lng);
        countryData[`${myCar.lat},${myCar.lng}`] = country;
      }
      setCountries(countryData);
    };

    if (myCars && myCars.length > 0) {
      fetchData();
    }
  }, [myCars]);

  if (!myCars || myCars.length === 0) {
    return <p>No Cars Found</p>;
  }

  return (
    <div className="profile">
      <div className="profile__info">
        <img src={user?.userImage} alt={user?.name} />
        <div className="profile__info__text">
          <h2>{user?.username}</h2>
          <p>Email: {user?.email}</p>
        </div>
      </div>
      <div className="profile__myCars">
        {myCars?.map((myCar) => (
          <MyCarsCard
            key={myCar._id}
            id={myCar._id}
            name={myCar.name}
            price={myCar.price}
            image={myCar.image}
            country={countries[`${myCar.lat},${myCar.lng}`]}
          />
        ))}
        {!myCars || (myCars.length === 0 && <h1>No Cars Found</h1>)}
      </div>
    </div>
  );
};

export default Profile;

/* eslint-disable react/jsx-key */
import { useParams } from "react-router-dom";
import { useUsersCars } from "../../components/Users/useUsersCars";
import { useGetUser } from "../../components/Users/useGetUser";
import { useEffect, useState } from "react";
import MyCarsCard from "./MyCarsCard";
import Spinner from "./../../UI/Spinner";
import { fetchCountryName } from "../../utils/fetchCityName";

const UsersProfile = () => {
  const { userId } = useParams();
  const { user, refetch, isLoading: isLoadingUser } = useGetUser(userId);
  const {
    cars: usersCars,
    isLoading,
    refetch: refetchCars,
  } = useUsersCars(userId);
  const [countries, setCountries] = useState({});
  const cars = usersCars?.usersCars;

  useEffect(() => {
    const fetchData = async () => {
      const countryData = {};
      for (const car of cars) {
        const country = await fetchCountryName(car.lat, car.lng);
        countryData[`${car.lat},${car.lng}`] = country;
      }
      setCountries(countryData);
      refetchCars();
      refetch();
    };

    if (cars && cars.length > 0) {
      fetchData();
      refetch();
      refetchCars();
    }
  }, [cars, refetch, refetchCars]);

  if (isLoading || isLoadingUser) {
    return <Spinner />;
  }

  return (
    <div className="profileScreen">
      <div className="profile">
        <div className="profile__info">
          <img src={user?.userImage} alt={user?.name} />
          <div className="profile__info__text">
            <h2>{user?.username}</h2>
            <p>Email: {user?.email}</p>
          </div>
        </div>
        <div className="profile__myCars">
          {cars?.map((myCar) => (
            <MyCarsCard
              key={myCar._id}
              id={myCar._id}
              name={myCar.name}
              price={myCar.price}
              image={myCar.image}
              country={countries[`${myCar.lat},${myCar.lng}`]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;

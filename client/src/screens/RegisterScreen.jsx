import React from "react";
import carBackground from "../images/background2.jpg";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  return (
    <div className="background">
      <form className="login-form">
        <h1>Register</h1>
        <div className="login-form__input">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="login-form__input">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="login-form__input">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <p>
            Have an account? <Link to={"/login"}>Login</Link>
          </p>
          <p>
            Go <Link to={"/"}>Home</Link>
          </p>
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="carImage">
        <img src={carBackground} alt="backgroundCar" />

        <div className="carImage__text">
          <h1>
            <span>Rently </span>Driving Your Experience, One Rental at a Time.
          </h1>
          <p>
            Experience the road like never before with Rently. Drive your dreams
            with seamless rentals designed for your ride to perfection
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;

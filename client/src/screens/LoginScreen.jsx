import React from "react";
import carBackground from "../images/background.jpg";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <div className="background">
      <form className="login-form">
        <h1>Login</h1>
        <div className="login-form__input">
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="login-form__input">
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
          <p>
            Go <Link to={"/"}>Home</Link>
          </p>
        </div>
        <button type="submit">Log in</button>
      </form>
      <div className="carImage">
        <img src={carBackground} alt="backgroundCar" />
        <div className="carImage__text">
          <h1><span>Rently </span>Where Every Mile is a Memory.</h1>
          <p>
            Rev up your adventure with Rently! Unlock the wheels to your journey
            with hassle-free car rentals tailored to your pace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

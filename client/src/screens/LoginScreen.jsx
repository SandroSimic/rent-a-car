import carBackground from "../images/background.jpg";
import { Link } from "react-router-dom";
import { useLogin } from "../components/Users/useLogin";
import { useForm } from "react-hook-form";
import FormRow from "../UI/FormRow";
import Spinner from "../UI/Spinner";

const LoginScreen = () => {
  const { isLoading, loginUserQuery } = useLogin();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  async function onSubmit(userData) {
    const formData = new FormData();
    formData.append("password", userData.password);
    formData.append("email", userData.email);

    if (!formData) return;
    try {
      loginUserQuery(formData);
    } catch (error) {
      console.error(error.response);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="background">
      <form className="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
        <h1>Login</h1>
        <div className="login-form__input">
          <FormRow label="Email: " error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </FormRow>
        </div>
        <div className="login-form__input">
          <FormRow label="Password: " error={errors?.password?.message}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
              })}
            />
          </FormRow>
        </div>
        <div>
          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
          <p>
            Go <Link to={"/"}>Home</Link>
          </p>
        </div>
        <button type="submit" disabled={isLoading}>
          Log in
        </button>
      </form>
      <div className="carImage">
        <img src={carBackground} alt="backgroundCar" />
        <div className="carImage__text">
          <h1>
            <span>Rently </span>Where Every Mile is a Memory.
          </h1>
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

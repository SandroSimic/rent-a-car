import carBackground from "../images/background2.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormRow from "../UI/FormRow";
import { useRegister } from "../components/Users/useRegister";
import Spinner from "../UI/Spinner";
import toast from "react-hot-toast";
import { useUser } from "../components/Users/useUser";
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const { isLoading, registerQuery } = useRegister();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const { user } = useUser();

  if (user) {
    navigate("/");
  }

  async function onSubmit(userData) {
    const formData = new FormData();
    formData.append("userImage", userData.userImage[0]);

    formData.append("username", userData.username);
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    if (!formData) return;
    try {
      registerQuery(formData);
      reset();
    } catch (error) {
      toast.error(error.message);
      console.log(error.response);
    }
    console.log(userData);
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
        <h1>Register</h1>
        <div className="login-form__input">
          <FormRow label="Username: " error={errors?.username?.message}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters long",
                },
              })}
            />
          </FormRow>
        </div>
        <div className="login-form__input">
          <FormRow label="Email: " error={errors?.email?.message}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
          </FormRow>
        </div>
        <div className="login-form__input">
          <FormRow label="Image: " error={errors?.userImage?.message}>
            <input
              type="file"
              id="userImage"
              name="userImage"
              placeholder="Profile picture"
              accept="image/*"
              {...register("userImage", {
                required: "this field is required",
              })}
            />
          </FormRow>
        </div>
        <div>
          <p>
            Have an account? <Link to={"/login"}>Login</Link>
          </p>
          <p>
            Go <Link to={"/"}>Home</Link>
          </p>
        </div>
        <button disabled={isLoading}>Register</button>
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

import FormRow from "../../UI/FormRow";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateUser } from "./useUpdateUser";
import Spinner from "../../UI/Spinner";
import { useGetUser } from "./useGetUser";

const EditUserForm = () => {
  const { userId } = useParams();

  const { isUpdating, updateUserQuery } = useUpdateUser();
  const { user } = useGetUser(userId);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("userImage", data.userImage[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      updateUserQuery({ userId, userData: formData });
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isUpdating) {
    return <Spinner />;
  }

  return (
    <div className="addCarScreen">
      <h2 className="addCarText">Edit User</h2>
      {user && (
        <form className="addCarForm" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="addCarForm__inputs">
            <div className="addCarForm__inputs1">
              <FormRow label="username" error={errors?.username?.message}>
                <input
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  {...register("username", {
                    value: user?.username,
                  })}
                  disabled={isUpdating}
                />
              </FormRow>
              <FormRow label="email" error={errors?.email?.message}>
                <input
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  {...register("email", {
                    value: user?.email,
                  })}
                  disabled={isUpdating}
                />
              </FormRow>
              <FormRow label="password" error={errors?.password?.message}>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  {...register("password")}
                  disabled={isUpdating}
                />
              </FormRow>
              <div className="addCarForm__input">
                <label>Image</label>
                <input
                  type="file"
                  id="userImage"
                  {...register("userImage")}
                  accept="image/*"
                  placeholder="Image of user"
                  disabled={""}
                />
              </div>
            </div>
          </div>
          <button className="addCarForm__btn" disabled={""}>
            Update User
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUserForm;

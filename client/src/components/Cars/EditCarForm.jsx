import React from "react";
import FormRow from "../../UI/FormRow";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditCarForm = () => {
  const { carId } = useParams();
  console.log(carId);

  const { isUpdating, updateCarQuery } = useUpdateCar();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("carModel", data.carModel);
    formData.append("bodyStyle", data.bodyStyle);
    formData.append("transmission", data.transmission);
    formData.append("engineType", data.engineType);
    formData.append("description", data.description);
    formData.append("year", data.year);
    formData.append("latitude", parseFloat(data.latitude) || "");
    formData.append("longitude", parseFloat(data.longitude) || "");
    try {
      createCarQuery(formData);
      console.log(formData);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <div className="addCarScreen">
      <h2 className="addCarText">Add Car For Rent</h2>
      <form className="addCarForm" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="addCarForm__inputs">
          <div className="addCarForm__inputs1">
            <FormRow label="name" error={errors?.name?.message}>
              <input
                type="text"
                placeholder="Enter Car Name"
                id="name"
                {...register("name", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              />
            </FormRow>
            <FormRow label="Price" error={errors?.price?.message}>
              <input
                type="text"
                placeholder="Enter Car price (per day)"
                id="price"
                {...register("price", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              />
            </FormRow>
            <FormRow label={"Car Model"} errors={errors?.carModel?.message}>
              <select
                id="carModel"
                {...register("carModel", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              >
                <option>Toyota</option>
                <option>Honda</option>
                <option>Ford</option>
                <option>Chevrolet</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
                <option>Tesla</option>
                <option>Nissan</option>
                <option>Hyundai</option>
                <option>Porsche</option>
                <option>Ferrari</option>
                <option>Lamborghini</option>
              </select>
            </FormRow>
            <FormRow label={"Body Style"} errors={errors?.bodyStyle?.message}>
              <select
                id="bodyStyle"
                {...register("bodyStyle", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              >
                <option>Coupe</option>
                <option>Jeep</option>
                <option>Sedan</option>
                <option>Sport</option>
              </select>
            </FormRow>
            <FormRow
              label="Transmission"
              errors={errors?.transmission?.message}
            >
              <select
                id="transmission"
                {...register("transmission", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              >
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </FormRow>
            <FormRow
              label="Coordinates *"
              errors={errors?.transmission?.message}
              tooltipId="my-tooltip"
              tooltipContent="This field is not required but the car won't show on the map"
            >
              <div className="addCarForm__inputs1--coordinates">
                <input
                  placeholder="Lat"
                  id="latitude"
                  type="number"
                  {...register("latitude")}
                  disabled={isCreating}
                  step="any"
                />
                <input
                  placeholder="Lng"
                  id="longitude"
                  type="number"
                  {...register("longitude")}
                  disabled={isCreating}
                  step="any"
                />
              </div>
            </FormRow>
          </div>
          <div className="addCarForm__inputs2">
            <FormRow label="Engine Type" errors={errors?.engineType?.message}>
              <select
                id="engineType"
                {...register("engineType", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              >
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>LPG</option>
                <option>Hybrid</option>
              </select>
            </FormRow>
            <div className="addCarForm__input">
              <label>Image</label>
              <input
                type="file"
                id="image"
                {...register("image", {
                  required: "This field is required",
                })}
                accept="image/*"
                placeholder="Image of Car"
                disabled={isCreating}
              />
            </div>
            <FormRow label={"Description"} error={errors?.description?.message}>
              <textarea
                disabled={isCreating}
                placeholder="Car description"
                id="description"
                {...register("description", {
                  required: "This field is required",
                  minLength: {
                    value: 20,
                    message: "Name must be longer then 20 character",
                  },
                })}
              />
            </FormRow>
            <FormRow label="Year" error={errors?.year?.message}>
              <input
                type="number"
                placeholder="Add Car Year"
                id="year"
                {...register("year", {
                  required: "This field is required",
                })}
                disabled={isCreating}
              />
            </FormRow>
          </div>
        </div>
        <button className="addCarForm__btn" disabled={isCreating}>
          Add Car
        </button>
      </form>
    </div>
  );
};

export default EditCarForm;

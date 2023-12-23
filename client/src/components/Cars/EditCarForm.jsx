import React from "react";
import FormRow from "../../UI/FormRow";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCar } from "./useCar";
import { useUpdateCar } from "./useUpdateCar";
import Spinner from "../../UI/Spinner";

const EditCarForm = () => {
  const { carId } = useParams();

  const { car } = useCar();
  const { isUpdating, updateCarQuery } = useUpdateCar();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: car,
  });
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
    formData.append("lat", parseFloat(data.lat) || "");
    formData.append("lng", parseFloat(data.lng) || "");

    try {
      updateCarQuery({ carId, newCarData: formData });
      console.log(data)
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
      <h2 className="addCarText">Edit Car</h2>
      {car && (
        <form className="addCarForm" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="addCarForm__inputs">
            <div className="addCarForm__inputs1">
              <FormRow label="name" error={errors?.name?.message}>
                <input
                  type="text"
                  placeholder="Enter Car Name"
                  id="name"
                  {...register("name", {
                    value: car.name,
                  })}
                  disabled={""}
                />
              </FormRow>
              <FormRow label="Price" error={errors?.price?.message}>
                <input
                  type="text"
                  placeholder="Enter Car price (per day)"
                  id="price"
                  {...register("price", {
                    value: car.price,
                  })}
                  disabled={""}
                />
              </FormRow>
              <FormRow label={"Car Model"} errors={errors?.carModel?.message}>
                <select
                  id="carModel"
                  {...register("carModel", {
                    value: car.carModel,
                  })}
                  disabled={""}
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
                    value: car.bodyStyle,
                  })}
                  disabled={""}
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
                    value: car.transmission,
                  })}
                  disabled={""}
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </FormRow>
              <FormRow
                label="Coordinates"
                errors={errors?.transmission?.message}
              >
                <div className="addCarForm__inputs1--coordinates">
                  <input
                    placeholder="Lat"
                    id="lat"
                    type="number"
                    {...register("lat", {
                      value: car.lat,
                    })}
                    disabled={""}
                    step="any"
                  />
                  <input
                    placeholder="Lng"
                    id="lng"
                    type="number"
                    {...register("lng", {
                      value: car.lng,
                    })}
                    disabled={""}
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
                    value: car.engineType,
                  })}
                  disabled={""}
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
                  {...register("image")}
                  accept="image/*"
                  placeholder="Image of Car"
                  disabled={""}
                />
              </div>
              <FormRow
                label={"Description"}
                error={errors?.description?.message}
              >
                <textarea
                  disabled={""}
                  placeholder="Car description"
                  id="description"
                  {...register("description", {
                    value: car.description,
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
                    value: car.year,
                  })}
                  disabled={""}
                />
              </FormRow>
            </div>
          </div>
          <button className="addCarForm__btn" disabled={""}>
            Update Car
          </button>
        </form>
      )}
    </div>
  );
};

export default EditCarForm;

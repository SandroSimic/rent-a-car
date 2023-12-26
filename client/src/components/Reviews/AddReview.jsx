/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useAddReview } from "../Reviews/useAddReview";
import { useCar } from "../Cars/useCar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddReview = ({ carId }) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { isCreating, addReviewQuery } = useAddReview();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("comment", data.comment);
    formData.append("rating", data.rating);
    console.log(formData);
    try {
      await addReviewQuery({ carId, reviewData: formData });
      reset();
    } catch (error) {
      console.log(error.message);
    }
  };
  function onError(errors) {
    console.log(errors);
  }

  return (
    <form className="addReview" onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        type="text"
        placeholder="comment"
        className="addReview__input"
        {...register("comment")}
      />
      <select className="addReview__select" {...register("rating")}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <button className="addReview__button">Send</button>
    </form>
  );
};

export default AddReview;

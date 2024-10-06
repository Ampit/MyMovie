import React, { useState } from "react";
import "./filterForm.scss";
import StarRatings from "react-star-ratings";
import { Slider } from "@mui/material";

const FilterForm = ({ formData }) => {
  const [rating, setRating] = useState(0);
  const [genre, setGenre] = useState("");
  const [runtimeRange, setRuntimeRange] = useState([0, 300]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!genre && rating === 0 && runtimeRange[0] === 0 && runtimeRange[1] === 300) {
      alert("Please fill at least one field");
    } else {
      formData({ 
        genre: genre || undefined, 
        rating: rating || undefined, 
        runtimeLess: runtimeRange[0] !== 0 ? runtimeRange[0] : undefined, 
        runtimeGreater: runtimeRange[1] !== 300 ? runtimeRange[1] : undefined 
      });
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating * 2);  // Convert 5-star rating to 10-point scale
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__heading">Genre</h3>
      <div className="form__select select">
        <select name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Choose Genre</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="53">Thriller</option>
        </select>
      </div>

      <h3 className="form__heading">Select Movie Rating</h3>
      <div className="form__rating">
        <StarRatings
          rating={rating / 2}
          starRatedColor="red"
          changeRating={handleRatingChange}
          numberOfStars={5}
          name='rating'
          starDimension="1.5rem"
          starSpacing="5px"
        />
      </div>

      <h3 className="form__heading">Runtime (minutes)</h3>
      <div className="form__range">
        <Slider
          value={runtimeRange}
          onChange={(_, newValue) => setRuntimeRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={300}
        />
      </div>

      <div className="form__button">
        <button className="form__button--submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default FilterForm;

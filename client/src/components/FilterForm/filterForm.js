import React, { Component } from "react";
import "./filterForm.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import StarRatings from "react-star-ratings";
let rating;

class FilterForm extends Component {
  submitHandler = event => {
    event.preventDefault();

    if (event.target.rating5.checked) {
      rating = 9;
    }
    if (event.target.rating4.checked) {
      rating = 8;
    }
    if (event.target.rating3.checked) {
      rating = 6;
    }
    if (event.target.rating2.checked) {
      rating = 4;
    }
    if (event.target.rating1.checked) {
      rating = 2;
    }
    const genre = event.target.genre.value.trim();
    const runtimeLess = event.target.runtimeLess.value.trim();
    const runtimeGreater = event.target.runtimeGreater.value.trim();

    if (!genre || !rating || !runtimeLess || !runtimeGreater) {
      return alert("Empty Fields");
    } else this.props.formData({ genre, rating, runtimeLess, runtimeGreater });
  };

  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;
    const handle = props => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    const wrapperStyle = { width: 300, margin: 10 };
    return (
      <>
        <form className="form" onSubmit={this.submitHandler}>
          <h3 className="form__heading">Genre</h3>
          <div className="form__select select">
            <select name="genre">
              <option value disabled>
                Choose Genre
              </option>
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
          <h3 className="form__heading">Select Year</h3>
          <div className="form__range" style={wrapperStyle}>
            <Range
              min={1950}
              max={2020}
              defaultValue={[1950, 2020]}
              tipFormatter={value => `${value}`}
              handle={handle}
            />
          </div>
          <h3 className="form__heading">Select Movie Rating</h3>
          <div>
            <div className="form__rating">
              <input
                name="rating5"
                className="form__rating--checkbox"
                type="checkbox"
                value="8"
              ></input>
              <label className="form__rating--label">5 stars</label>
              <StarRatings
                rating={5}
                starRatedColor="red"
                starDimension="1.5rem"
                starSpacing="5px"
                numberOfStars={5}
              />
            </div>
            <br></br>
            <div className="form__rating">
              <input
                name="rating4"
                className="form__rating--checkbox"
                type="checkbox"
                value="6"
              ></input>
              <label className="form__rating--label">4 stars</label>
              <StarRatings
                rating={4}
                starRatedColor="red"
                starDimension="1.5rem"
                starSpacing="5px"
                numberOfStars={5}
              />
            </div>
            <br></br>
            <div className="form__rating">
              <input
                name="rating3"
                className="form__rating--checkbox"
                type="checkbox"
                value="4"
              ></input>
              <label className="form__rating--label">3 stars</label>
              <StarRatings
                rating={3}
                starRatedColor="red"
                starDimension="1.5rem"
                starSpacing="5px"
                numberOfStars={5}
              />
            </div>
            <br></br>
            <div className="form__rating">
              <input
                name="rating2"
                className="form__rating--checkbox"
                type="checkbox"
                value="2"
              ></input>
              <label className="form__rating--label">2 stars</label>
              <StarRatings
                rating={2}
                starRatedColor="red"
                starDimension="1.5rem"
                starSpacing="5px"
                numberOfStars={5}
              />
            </div>
            <br></br>
            <div className="form__rating">
              <input
                name="rating1"
                className="form__rating--checkbox"
                type="checkbox"
                value="1"
              ></input>
              <label className="form__rating--label">1 stars</label>
              <StarRatings
                rating={1}
                starRatedColor="red"
                starDimension="1.5rem"
                starSpacing="5px"
                numberOfStars={5}
              />
            </div>
          </div>

          <h3 className="=form__heading">Runtime</h3>
          <div className="input-field">
            <input
              className="input"
              name="runtimeLess"
              type="text"
              placeholder="runtime"
            ></input>
            <label className="input__label">To</label>
            <input
              className="input"
              name="runtimeGreater"
              type="text"
              placeholder="runtime"
            ></input>
          </div>
          <div className="form__button">
            <button className="form__button--submit">Submit</button>
          </div>
        </form>
      </>
    );
  }
}

export default FilterForm;

import React from "react";
import "./card.scss";
import StarRatings from "react-star-ratings";
import thumbnail from "../../assets/images/no-image-png-1/no-image-png-1-original.png";

const Cards = props => {
  return (
    <>
      <div className="card" onClick={() => props.handleClick(props)}>
        <div className="card__flipper">
          <div className="card__front">
            {props.data.poster_path === null ? (
              <img
                className="card__image"
                src={thumbnail}
                alt="Movie or Show Poster"
              ></img>
            ) : (
              <img
                className="card__image"
                src={`https://image.tmdb.org/t/p/w300/${props.data.poster_path}`}
                alt="Movie or Show Poster"
              ></img>
            )}
          </div>
          <div className="card__details">
            <div className="card__details__container">
              <h3 className="card__details--heading ">
                {props.data.title || props.data.name}
              </h3>
              <StarRatings
                rating={props.data.vote_average / 2}
                starRatedColor="red"
                starDimension="1.5rem"
                starSpacing="5px"
                numberOfStars={5}
              />
              <p className="card__details--overview">{props.data.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;

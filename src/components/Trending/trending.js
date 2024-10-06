import React from "react";
import Cards from "../MovieCard/card";
import "./trending.scss";

const TrendingMovies = props => {
  return (
    <>
      <div className="movie__container">
        {props.trending.map(movie => (
          <Cards
            key={movie.id}
            data= {movie}
            handleClick={props.handleClick}
          />
        ))}
      </div>
    </>
  );
};

export default TrendingMovies;

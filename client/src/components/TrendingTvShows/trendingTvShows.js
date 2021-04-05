import React from "react";
import Cards from "../MovieCard/card";
import "./trendingTvShows.scss";

const TrendingShows = props => {
  return (
    <>
      <div className="shows__container">
        {props.trendingShow.map(shows => {
          return(
          <Cards key={shows.id}
          data={shows}
          handleClick={props.handleClick}
          />)
})}
      </div>
    </>
  );
};

export default TrendingShows;

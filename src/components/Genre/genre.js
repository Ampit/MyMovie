import React from "react";
import Cards from "../MovieCard";
import "./genre.scss";

const Genre = props => {
    return (
      <>
      <h1 className="genre__sub-heading">Featured List : {props.genreString}</h1>
        <div className="genre__result">
          {props.genre.map(movie => (          
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
  
  export default Genre;
  
import React, { useState, useEffect } from "react";
import FilterForm from "../FilterForm";
import Cards from "../MovieCard";
import TrailerModal from "../TrailerModal";
import "./advanceFilter.scss";
import axios from "axios";
import config from "../../config";

const AdvanceFilter = () => {
  const [state, setState] = useState({
    movieData: [],
    dataReceived: false,
    popularMovie: true,
    popularMovieData: [],
    url: "",
    modalState: false,
    videoId: null
  });

  useEffect(() => {
    defaultData();
  }, []);

  const formData = event => {
    let url = `${config.API_URL}discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    
    if (event.rating) url += `&vote_average.gte=${event.rating}`;
    if (event.genre) url += `&with_genres=${event.genre}`;
    if (event.runtimeLess) url += `&with_runtime.gte=${event.runtimeLess}`;
    if (event.runtimeGreater) url += `&with_runtime.lte=${event.runtimeGreater}`;

    axios.get(url)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          movieData: response.data.results,
          dataReceived: true,
          popularMovie: false
        }));
      });
  };

  const defaultData = () => {
    axios
      .get(`${config.API_URL}movie/popular?api_key=${config.API_KEY}&language=en-US&page=1`)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          popularMovieData: response.data.results
        }));
      });
  };

  const handleClick = event => {
    setState(prevState => ({
      ...prevState,
      videoId: event.data.id,
      modalState: !prevState.modalState
    }));
  };

  const handleClose = () => {
    setState(prevState => ({
      ...prevState,
      modalState: false
    }));
  };

  const { popularMovie, popularMovieData, dataReceived, movieData, modalState, videoId } = state;

  return (
    <div className="user__container">
      <div className="aside">
        <FilterForm formData={formData} />
      </div>
      <div className="hero__container">
        {popularMovie &&
          popularMovieData.map(movie => (
            <Cards
              key={movie.id}
              data={movie}
              handleClick={handleClick}
            />
          ))}
        {dataReceived &&
          movieData.map(movie => (
            <Cards
              key={movie.id}
              data={movie}
              handleClick={handleClick}
            />
          ))}
      </div>
      {modalState && (
        <TrailerModal
          Id={videoId}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default AdvanceFilter;

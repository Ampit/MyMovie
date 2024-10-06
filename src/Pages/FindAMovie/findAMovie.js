import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import Genre from "../../components/Genre";
import "./findAMovie.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerModal from "../../components/TrailerModal";
import TotalPages from "../../components/TotalPages";
import StarRatings from "react-star-ratings";
import config from "../../config";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
console.log("API Key in FindAMovie:", API_KEY);

const genreArr = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" }
];

const FindAMovie = () => {
  const [state, setState] = useState({
    upComing: [],
    dataReceived: false,
    genre: [],
    selectedGenre: 28,
    genreString: "action",
    isActive: true,
    modalState: false,
    totalResults: 0,
    currentPage: 1,
    videoId: null
  });

  useEffect(() => {
    defaultData();
    genreData();
  }, []);

  const defaultData = () => {
    axios
      .get(`${config.API_URL}movie/upcoming?api_key=${config.API_KEY}&language=en-US&page=1`)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          upComing: response.data.results,
          dataReceived: true
        }));
      });
  };

  const genreData = () => {
    axios
      .get(
        `${config.API_URL}discover/movie?api_key=${config.API_KEY}&language=en-US&page=1&with_genres=${state.selectedGenre}`
      )
      .then(response => {
        setState(prevState => ({
          ...prevState,
          genre: response.data.results,
          totalResults: response.data.total_results
        }));
      });
  };

  const nextPage = pageNumber => {
    axios
      .get(
        `${config.API_URL}discover/movie?api_key=${config.API_KEY}&language=en-US&page=${pageNumber}&with_genres=${state.selectedGenre}`
      )
      .then(response => {
        setState(prevState => ({
          ...prevState,
          genre: response.data.results,
          currentPage: pageNumber
        }));
      });
  };

  const handleClass = () => {
    setState(prevState => ({
      ...prevState,
      isActive: !prevState.isActive
    }));
  };

  const clickHandler = (event, value) => {
    setState(
      prevState => ({
        ...prevState,
        selectedGenre: value.id,
        genreString: value.name,
        isActive: !prevState.isActive
      }),
      () => genreData()
    );
  };

  const handleClick = (event, data) => {
    setState(prevState => ({
      ...prevState,
      videoId: data ? data.id : event.data.id,
      modalState: !prevState.modalState
    }));
  };

  const handleClose = () => {
    setState(prevState => ({
      ...prevState,
      modalState: false
    }));
  };

  const { upComing, dataReceived, genre, genreString, isActive, modalState, totalResults, currentPage, videoId } = state;

  const settings = {
    className: "carousel",
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnFocus: true
  };

  const totalPages = Math.floor(totalResults / 20);

  return (
    <>
      <section className="hero__carousel">
        <Slider {...settings}>
          {dataReceived &&
            upComing.map(data => (
              <div key={`${data.id}${data.title}`}>
                <div className="hero__details">
                  <h2 className="hero__details--heading">{data.title}</h2>
                  <p className="hero__details--ellipsis">{data.overview}</p>
                  <StarRatings
                    rating={data.vote_average / 2}
                    starRatedColor="red"
                    starDimension="1.5rem"
                    starSpacing="5px"
                    numberOfStars={5}
                  />
                  <h4>Release Date: {data.release_date}</h4>
                </div>
                <img
                  className="hero__image"
                  src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
                  alt="Upcoming And New movies"
                  onClick={event => handleClick(event, data)}
                />
              </div>
            ))}
        </Slider>
      </section>
      <section className="genre">
        <div className="genre__container">
          <h1 className="genre__heading" onClick={handleClass}>
            Browse Genre
          </h1>
          <div
            className={`genre__list ${
              isActive ? "genre__hide" : ""
            }`}
          >
            {genreArr.map(list => (
              <h2
                key={list.id}
                className="genre__list--border"
                onClick={event => clickHandler(event, list)}
              >
                {list.name}
              </h2>
            ))}
          </div>
          <Genre
            genre={genre}
            genreString={genreString}
            handleClick={handleClick}
          />
          {totalResults > 20 && (
            <TotalPages
              pages={totalPages}
              nextPage={nextPage}
              currentPage={currentPage}
            />
          )}
        </div>
      </section>
      {modalState && (
        <TrailerModal
          Id={videoId}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default FindAMovie;
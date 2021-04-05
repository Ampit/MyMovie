import React, { Component } from "react";
import axios from "axios";
import "./advanceFilter.scss";
import FilterForm from "../FilterForm";
import Cards from "../MovieCard";
import TrailerModal from "../TrailerModal"

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";

class AdvanceFilter extends Component {
  constructor() {
    super();
    this.state = {
      movieData: [],
      dataRecieved: false,
      popularMovie: true,
      popularMovieData: [],
      url: "",
      modalState: false,
      videoId: null
    };
  }
  formData = event => {
    axios
      .get(
        `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=${Number(event.rating)}&with_genres=${Number(
          event.genre
        )}&with_runtime.gte=${Number(event.runtimeLess)}&with_runtime.lte=${Number(event.runtimeGreater)}
        `
      )
      .then(response => {
        this.setState({
          movieData: response.data.results,
          dataRecieved: true,
          popularMovie: false
        });
      });
  };

  defaultData() {
    axios
      .get(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => {
        this.setState({
          popularMovieData: response.data.results
        });
      });
  }

  handleClick = event => {
    this.setState({
      videoId: event.data.id,
      modalState: !this.state.modalState
    });
  };

  handleClose = () => {
    this.setState({
      modalState: false
    });
  };

  componentDidMount() {
    this.defaultData();
  }

  render() {
    return (
      <>
        <div className="user__container">
          <div className="aside">
            <FilterForm formData={this.formData} />
          </div>
          <div className="hero__container">
            {this.state.popularMovie &&
              this.state.popularMovieData.map(movie => {
                return (
                  <Cards
                    key={movie.id}
                    data={movie}
                    handleClick={this.handleClick}
                  />
                );
              })}
            {this.state.dataRecieved &&
              this.state.movieData.map(movie => {
                return (
                  <Cards
                    key={movie.id}
                    data={movie}
                    handleClick={this.handleClick}
                  />
                );
              })}
          </div>
          {this.state.modalState && (
            <TrailerModal
              playTrailer={this.state.url}
              Id={this.state.videoId}
              handleClose={this.handleClose}
            />
          )}
        </div>
      </>
    );
  }
}

export default AdvanceFilter;

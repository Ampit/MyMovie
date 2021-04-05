import React, { Component } from "react";
import axios from "axios";
import "./homePage.scss";
import Video from "../../assets/videos/videoplayback.mp4";
import TrendingMovies from "../../components/Trending";
import TrendingTvShows from "../../components/TrendingTvShows";
import TrailerModal from "../../components/TrailerModal";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      trendingMovies: [],
      trendingShows: [],
      modalState: false,
      videoId: null
    };
  }

  defaultData() {
    axios
      .get(`${API_URL}trending/movie/week?api_key=${API_KEY}`)
      .then(response => {
        this.setState({
          trendingMovies: response.data.results
        });
      });
    axios
      .get(`${API_URL}trending/tv/week?api_key=${API_KEY}`)
      .then(response => {
        this.setState({
          trendingShows: response.data.results
        });
      });
  }

  componentDidMount() {
    this.defaultData();
  }

  handleClick = event => {
    this.setState({
      videoId: event.data.id,
      modalState: !this.state.modalState
    })
  };

  handleClose = () =>{
    this.setState({
      modalState: false
    })
  }

  render() {
    return (
      <>
        <section className="hero">
          <video
            className="hero__video"
            src={Video}
            autoPlay
            loop
            type="video/mp4"
            muted={true}
          ></video>
          <div className="movie">
            <h1 className="movie__header">Trending Movies</h1>
            <TrendingMovies
              trending={this.state.trendingMovies}
              handleClick={this.handleClick}
            ></TrendingMovies>
            <h1 className="movie__header">Trending TV shows</h1>
            <TrendingTvShows
              trendingShow={this.state.trendingShows}
              handleClick={this.handleClick}
            ></TrendingTvShows>
            {this.state.modalState && <TrailerModal  Id={this.state.videoId} handleClose={this.handleClose} />}    
          </div>
        </section>
      </>
    );
  }
}

export default HomePage;

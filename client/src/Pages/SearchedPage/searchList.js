import React, { Component } from "react";
import "./searchList.scss";
import Cards from "../../components/MovieCard";
import axios from "axios";
import TrailerModal from "../../components/TrailerModal";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";

class SearchList extends Component {
  constructor() {
    super();
    this.state = {
      movie: [],
      set: false,
      url: "",
      modalState: false,
      videoId: null
    };
  }

  getRelatedMovie = () => {
    const id = this.props.searchMovie.map(relatedData => {
      return relatedData.id;
    });

    axios
      .get(
        `${API_URL}movie/${id[0]}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(response => {
        this.setState({
          movie: response.data.results,
          set: true
        });
      });
  };

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
    this.getRelatedMovie();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.movie === prevState.movie) {
      this.getRelatedMovie();
    }
  }

  render() {
    return (
      <>
        <section className="searched__container">
          <h1 className="searched__container--header">
            Showing All Results For <span>{this.props.value}</span>{" "}
          </h1>
          <div className="movie__container">
            {this.props.searchMovie.map(data => {
              return (
                <Cards
                  key={data.id}
                  data={data}
                  handleClick={this.handleClick}
                />
              );
            })}
          </div>
          <h1 className="searched__container--header">Related Movies</h1>
          <div className="movie__container">
            {this.state.movie.length > 1
              ? this.state.movie.map(data => {
                  return (
                    <Cards
                      key={data.id}
                      data={data}
                      handleClick={this.handleClick}
                    />
                  );
                })
              : ""}
          </div>
          {this.state.modalState && (
            <TrailerModal
              playTrailer={this.state.url}
              Id={this.state.videoId}
              handleClose={this.handleClose}
            />
          )}
        </section>
      </>
    );
  }
}

export default SearchList;

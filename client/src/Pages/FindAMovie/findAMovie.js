import React, { Component } from "react";
import axios from "axios";
import Slider from "react-slick";
import Genre from "../../components/Genre";
import "./findAMovie.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrailerModal from "../../components/TrailerModal";
import TotalPages from "../../components/TotalPages";
import StarRatings from "react-star-ratings";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";

const genreArr = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 53,
    name: "Thriller"
  }
];

class FindAMovie extends Component {
  constructor() {
    super();
    this.state = {
      upComing: [],
      dataRecieved: false,
      genre: [],
      selectedGenre: 28,
      genreString: "action",
      isActive: true,
      modalState: false,
      totalResults: 0,
      currentPage: 1,
      search: "",
      videoId: null
    };
  }

  defaultData = () => {
    axios
      .get(`${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => {
        this.setState({
          upComing: response.data.results,
          dataRecieved: true
        });
      });
  };

  genreData = () => {
    axios
      .get(
        `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${this.state.selectedGenre}`
      )
      .then(response => {
        this.setState({
          genre: response.data.results,
          totalResults: response.data.total_results
        });
      });
  };

  nextPage = pageNumber => {
    axios
      .get(
        `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=${pageNumber}&with_genres=${this.state.selectedGenre}`
      )
      .then(response => {
        this.setState({
          genre: response.data.results,
          currentPage: pageNumber
        });
      });
  };

  componentDidMount() {
    this.defaultData();
    this.genreData();
  }

  handleClass = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  };

  clickHandler = (event, value) => {
    this.setState(
      {
        selectedGenre: value.id,
        genreString: value.name,
        isActive: !this.state.isActive
      },
      () => this.genreData()
    );
  };

  handleClick = (event, data) => {
    if (data !== undefined) {
        this.setState({
          videoId: data.id,
          modalState: !this.state.modalState
        })
    } else {
      this.setState({
        videoId: event.data.id,
        modalState: !this.state.modalState
      })
    }
  };

  handleClose = () => {
    this.setState({
      modalState: false
    });
  };

  render() {
    var settings = {
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
    const totalPages = Math.floor(this.state.totalResults / 20);

    return (
      <>
        <section className="hero__carousel">
          <Slider {...settings}>
            {this.state.dataRecieved &&
              this.state.upComing.map(data => {
                return (
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
                      className="hero__image "
                      src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
                      alt="Upcoming And New movies"
                      onClick={event => this.handleClick(event, data)}
                    ></img>
                  </div>
                );
              })}
          </Slider>
        </section>
        <section className="genre">
          <div className="genre__container ">
            <h1 className="genre__heading" onClick={this.handleClass}>
              Browse Genre
            </h1>
            <div
              className={`genre__list ${
                this.state.isActive ? "genre__hide" : ""
              }`}
            >
              {genreArr.map(list => {
                return (
                  <h2
                    key={list.id}
                    className="genre__list--border"
                    onClick={event => this.clickHandler(event, list)}
                  >
                    {list.name}
                  </h2>
                );
              })}
            </div>
            <Genre
              genre={this.state.genre}
              genreString={this.state.genreString}
              handleClick={this.handleClick}
            />
            {this.state.totalResults > 20 ? (
              <TotalPages
                pages={totalPages}
                nextPage={this.nextPage}
                currentPage={this.state.currentPage}
              />
            ) : (
              ""
            )}
          </div>
        </section>
        {this.state.modalState && (
          <TrailerModal
            Id={this.state.videoId}
            handleClose={this.handleClose}
          />
        )}
      </>
    );
  }
}

export default FindAMovie;

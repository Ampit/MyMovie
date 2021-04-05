import React, { Component } from "react";
import axios from "axios";
import "./mood.scss";
import { questionsData } from "./questionsData";
import Cards from "../../components/MovieCard";
import alone from "../../assets/images/alone.jpg";
import withFriends from "../../assets/images/withFriends.png";
import withFamily from "../../assets/images/withFamily.jpg";
import withKids from "../../assets/images/withKids.jpg";
import TrailerModal from "../../components/TrailerModal";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";
let flag;
let genreId;
let genreName;

class Mood extends Component {
  constructor() {
    super();
    this.state = {
      userAnswer: null,
      questionNumber: 0,
      options: [],
      questions: "",
      result: 0,
      movieData: [],
      handleimages: true,
      handleQuestions: false,
      genreString: "",
      endQuiz: false,
      url: "",
      modalState: false,
      videoId: null
    };
  }

  loadQuestionsData = () => {
    const { questionNumber } = this.state;
    this.setState({
      questions: questionsData[questionNumber].question,
      options: questionsData[questionNumber].options
    });
  };

  componentDidMount() {
    this.loadQuestionsData();
  }

  getMovies = () => {
    axios
      .get(
        `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${this.state.result}`
      )
      .then(response => {
        this.setState({
          movieData: response.data.results,
          endQuiz: true,
          handleQuestions: false
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

  nextQuestionHandler = () => {
    const { userAnswer } = this.state;
    if (userAnswer === "Alone") {
      this.setState({
        questionNumber: this.state.questionNumber + 1
      });
    } else if (userAnswer === "With Friends") {
      this.setState({
        questionNumber: this.state.questionNumber + 4
      });
      flag = 2;
    } else if (userAnswer === "With Family") {
      this.setState({
        questionNumber: this.state.questionNumber + 6
      });
    } else if (userAnswer === "With Kids") {
      this.setState({
        questionNumber: this.state.questionNumber + 7
      });
    } else if (userAnswer === "Stressful/Sad") {
      genreId = 35;
      genreName = "Comedy";
    } else if (userAnswer === "Good") {
      genreId = 28;
      genreName = "Action";
    } else if (userAnswer === "Excellent") {
      flag = 1;
      this.state.questionNumber = 0;
      this.setState({
        questionNumber: this.state.questionNumber + 3
      });
    } else if (userAnswer === "Please Don't Ask") {
      this.state.questionNumber = 0;
      this.setState({
        questionNumber: this.state.questionNumber + 2
      });
    } else if (userAnswer === "Make it Documentary") {
      genreId = 99;
      genreName = "Documentary";
    } else if (userAnswer === "Make it Movie") {
      genreId = 18;
      genreName = "Drama";
    } else if (userAnswer === "I do not care") {
      genreId = 99;
      genreName = "Documentary";
    } else if (userAnswer === "Hell Yeah...." && flag === 1) {
      genreId = 27;
      genreName = "Horror";
      flag = 0;
    } else if (userAnswer === "Please No....." && flag === 1) {
      genreId = 12;
      genreName = "Adventure";
      flag = 0;
    } else if (userAnswer === "Yes" && flag === 2) {
      genreId = 80;
      genreName = "Crime";
      flag = 0;
    } else if (userAnswer === "No" && flag === 2) {
      genreId = 28;
      genreName = "Action";
      flag = 0;
    } else if (userAnswer === "May be Yes") {
      genreId = 10749;
      genreName = "Romance";
    } else if (userAnswer === "No Something intense") {
      genreId = 9648;
      genreName = "Mystery";
    } else if (userAnswer === "Yes, Something super Funny") {
      genreId = 35;
      genreName = "Funny";
    } else if (userAnswer === "Cartoons") {
      genreId = 16;
      genreName = "Animation";
    } else if (userAnswer === "Science Fun") {
      genreId = 878;
      genreName = "Science Fiction";
    } else if (userAnswer === "Something Historical and Informational") {
      genreId = 36;
      genreName = "Historical";
    } else if (userAnswer === "Something Magical") {
      genreId = 14;
      genreName = "Fantasy";
    }
    if (genreId > 0) {
      this.setState(
        {
          result: genreId,
          genreString: genreName
        },
        () => this.getMovies()
      );
    }
  };

  componentDidUpdate(_, prevState) {
    const { questionNumber } = this.state;
    if (this.state.questionNumber !== prevState.questionNumber) {
      this.setState(() => {
        return {
          questions: questionsData[questionNumber].question,
          options: questionsData[questionNumber].options
        };
      });
    }
  }
  componentDidMount() {
    genreId = 0;
  }

  checkAnswer = answer => {
    this.setState(
      {
        userAnswer: answer,
        handleimages: false,
        handleQuestions: true
      },
      () => this.nextQuestionHandler()
    );
  };

  render() {
    const { questions, options } = this.state;
    return (
      <>
        {this.state.handleimages && (
          <>
            <div className="mood__container body">
              <h1 className="mood__heading">With Whom you Are Watching... ?</h1>
              <div className="mood__images">
                <div className="mood__images--container">
                  <div className="position">
                    <button
                      className="mood__images--button"
                      onClick={() => this.checkAnswer("Alone")}
                    >
                      <img src={alone} alt="Picutre displaying alone guy"></img>
                      <h1 className="mood__images--button--text">ALONE</h1>
                    </button>
                  </div>

                  <div className="position">
                    <button
                      className="mood__images--button"
                      onClick={() => this.checkAnswer("With Friends")}
                    >
                      <img
                        src={withFriends}
                        alt="Picutre displaying Friends"
                      ></img>
                      <h1 className="mood__images--button--text">
                        WITH FRIENDS
                      </h1>
                    </button>
                  </div>
                </div>

                <div className="mood__images--container">
                  <div className="position">
                    <button
                      className="mood__images--button"
                      onClick={() => this.checkAnswer("With Family")}
                    >
                      <img
                        src={withFamily}
                        alt="Picutre displaying Family"
                      ></img>
                      <h1 className="mood__images--button--text">
                        WITH FAMILY
                      </h1>
                    </button>
                  </div>
                  <div className="position">
                    <button
                      className="mood__images--button"
                      onClick={() => this.checkAnswer("With Kids")}
                    >
                      <img src={withKids} alt="Picutre displaying kids"></img>
                      <h1 className="mood__images--button--text">WITH KIDS</h1>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {this.state.handleQuestions && (
          <>
            <div className="mood__container body">
              <h1 className="mood__heading">{questions}</h1>
              {options.map(option => (
                <p
                  className="mood__answers"
                  onClick={() => this.checkAnswer(option)}
                  key={option}
                >
                  {option}
                </p>
              ))}
            </div>
          </>
        )}

        {this.state.endQuiz && (
          <>
            <div className="mood__result body">
              <h1 className="mood__heading">
                Based On your Answers Looks Like{" "}
                <span>{this.state.genreString}</span> Movies Are the Ones you
                want to watch
              </h1>
              <div className="movie__container">
                {this.state.result > 0 &&
                  this.state.movieData.map(data => {
                    return (
                      <Cards
                        key={data.id}
                        data={data}
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
        )}
      </>
    );
  }
}

export default Mood;

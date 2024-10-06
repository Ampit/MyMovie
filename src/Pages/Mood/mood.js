import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./mood.scss";
import { questionsData } from "./questionsData";
import Cards from "../../components/MovieCard";
import alone from "../../assets/images/alone.jpg";
import withFriends from "../../assets/images/withFriends.png";
import withFamily from "../../assets/images/withFamily.jpg";
import withKids from "../../assets/images/withKids.jpg";
import TrailerModal from "../../components/TrailerModal";
import config from "../../config";

const Mood = () => {
  const [state, setState] = useState({
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
  });

  const loadQuestionsData = useCallback(() => {
    const { questionNumber } = state;
    console.log("Loading question data for question number:", questionNumber);
    setState(prevState => ({
      ...prevState,
      questions: questionsData[questionNumber].question,
      options: questionsData[questionNumber].options
    }));
  }, [state.questionNumber]);

  useEffect(() => {
    loadQuestionsData();
  }, [loadQuestionsData]);

  const getMovies = useCallback(() => {
    console.log("Getting movies for genre:", state.result);
    const url = `${config.API_URL}discover/movie?api_key=${config.API_KEY}&language=en-US&page=1&with_genres=${state.result}`;
    console.log("API URL:", url);
    axios
      .get(url)
      .then(response => {
        console.log("API Response:", response.data);
        setState(prevState => ({
          ...prevState,
          movieData: response.data.results,
          endQuiz: true,
          handleQuestions: false,
          handleimages: false
        }));
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  }, [state.result]);

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

  const nextQuestionHandler = useCallback((answer) => {
    console.log("Next question handler called with answer:", answer);
    let newQuestionNumber = state.questionNumber;
    let genreId = 0;
    let genreName = "";

    switch(answer) {
      case "Alone":
        newQuestionNumber += 1;
        break;
      case "With Friends":
        newQuestionNumber += 4;
        break;
      case "With Family":
        newQuestionNumber += 6;
        break;
      case "With Kids":
        newQuestionNumber += 7;
        break;
      case "Stressful/Sad":
        genreId = 35;
        genreName = "Comedy";
        break;
      case "Good":
        genreId = 28;
        genreName = "Action";
        break;
      case "Excellent":
        newQuestionNumber = 3;
        break;
      case "Please Don't Ask":
        newQuestionNumber = 2;
        break;
      case "Make it Documentary":
        genreId = 99;
        genreName = "Documentary";
        break;
      case "Make it Movie":
        genreId = 18;
        genreName = "Drama";
        break;
      case "I do not care":
        genreId = 99;
        genreName = "Documentary";
        break;
      case "Hell Yeah....":
        genreId = 27;
        genreName = "Horror";
        break;
      case "Please No.....":
        genreId = 12;
        genreName = "Adventure";
        break;
      case "Yes":
        genreId = 80;
        genreName = "Crime";
        break;
      case "No":
        genreId = 28;
        genreName = "Action";
        break;
      case "May be Yes":
        genreId = 10749;
        genreName = "Romance";
        break;
      case "No Something intense":
        genreId = 9648;
        genreName = "Mystery";
        break;
      case "Yes, Something super Funny":
        genreId = 35;
        genreName = "Funny";
        break;
      case "Cartoons":
        genreId = 16;
        genreName = "Animation";
        break;
      case "Science Fun":
        genreId = 878;
        genreName = "Science Fiction";
        break;
      case "Something Historical and Informational":
        genreId = 36;
        genreName = "Historical";
        break;
      case "Something Magical":
        genreId = 14;
        genreName = "Fantasy";
        break;
      default:
        break;
    }

    console.log("New question number:", newQuestionNumber);
    console.log("Genre ID:", genreId);
    console.log("Genre Name:", genreName);

    setState(prevState => ({
      ...prevState,
      userAnswer: answer,
      questionNumber: newQuestionNumber,
      result: genreId || prevState.result,
      genreString: genreName || prevState.genreString,
      handleQuestions: genreId === 0,
      handleimages: false
    }));
  }, [state.questionNumber]);

  useEffect(() => {
    if (state.result > 0) {
      getMovies();
    } else {
      loadQuestionsData();
    }
  }, [state.result, getMovies, loadQuestionsData]);

  const checkAnswer = useCallback((answer) => {
    console.log("Check answer called with:", answer);
    nextQuestionHandler(answer);
  }, [nextQuestionHandler]);

  const { questions, options, handleimages, handleQuestions, endQuiz, genreString, result, movieData, modalState, videoId } = state;

  console.log("Current state:", state);

  return (
    <>
      {handleimages && (
        <div className="mood__container body">
          <h1 className="mood__heading">With Whom you Are Watching... ?</h1>
          <div className="mood__images">
            <div className="mood__images--container">
              <div className="position">
                <button
                  className="mood__images--button"
                  onClick={() => checkAnswer("Alone")}
                >
                  <img src={alone} alt="Alone guy" />
                  <h1 className="mood__images--button--text">ALONE</h1>
                </button>
              </div>
              <div className="position">
                <button
                  className="mood__images--button"
                  onClick={() => checkAnswer("With Friends")}
                >
                  <img src={withFriends} alt="Friends" />
                  <h1 className="mood__images--button--text">WITH FRIENDS</h1>
                </button>
              </div>
            </div>
            <div className="mood__images--container">
              <div className="position">
                <button
                  className="mood__images--button"
                  onClick={() => checkAnswer("With Family")}
                >
                  <img src={withFamily} alt="Family" />
                  <h1 className="mood__images--button--text">WITH FAMILY</h1>
                </button>
              </div>
              <div className="position">
                <button
                  className="mood__images--button"
                  onClick={() => checkAnswer("With Kids")}
                >
                  <img src={withKids} alt="Kids" />
                  <h1 className="mood__images--button--text">WITH KIDS</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {handleQuestions && (
        <div className="mood__container body">
          <h1 className="mood__heading">{questions}</h1>
          {options.map(option => (
            <p
              className="mood__answers"
              onClick={() => checkAnswer(option)}
              key={option}
            >
              {option}
            </p>
          ))}
        </div>
      )}
      {endQuiz && (
        <div className="mood__result body">
          <h1 className="mood__heading">
            Based On your Answers Looks Like <span>{genreString}</span> Movies Are the Ones you
            want to watch
          </h1>
          <div className="movie__container">
            {result > 0 && movieData.length > 0 ? (
              movieData.map(data => (
                <Cards
                  key={data.id}
                  data={data}
                  handleClick={handleClick}
                />
              ))
            ) : (
              <p>No movies found for this genre. Please try again.</p>
            )}
          </div>
          {modalState && (
            <TrailerModal
              playTrailer={state.url}
              Id={videoId}
              handleClose={handleClose}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Mood;
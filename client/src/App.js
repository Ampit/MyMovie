import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import FindAMovie from "./Pages/FindAMovie";
import SearchPage from "./Pages/SearchedPage";
import Mood from "./Pages/Mood";
import Login from "./components/Login";
import { connect } from "react-redux";
import * as actions from "./actions";
import UserPage from "./Pages/UserPage/userPage";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      set: false,
      value: ""
    };
  }

  handleSubmit = (event, props) => {
    event.preventDefault();
    axios
      .get(
        `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${event.target.search.value}&page=1&include_adult=false`
      )
      .then(response => {
        console.log("searched Data", response.data.total_results);
        this.setState({
          movies: response.data.results,
          set: true
        });
      });

      this.setState({
        value: event.target.search.value
      })
    event.target.reset();
  };

  componentDidUpdate() {
    if (this.state.set) {
      this.setState({
        set: false
      });
    }
  }

  componentDidMount(){
    this.props.getUser();
  }

  render() {
    return (
      <>
        <Router>
          <Header handleSubmit={this.handleSubmit} />
          {this.state.set && <Redirect to="/searchPage" />}
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/findMovie" component={FindAMovie} />
            <Route
              path="/searchPage"
              render={props => (
                <SearchPage {...props} searchMovie={this.state.movies} value={this.state.value} />
              )}
            />
            <Route path="/mood" component={Mood} />
            <Route path="/login" component={Login} />
            <Route path="/user" component={UserPage} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(null, actions) (App);

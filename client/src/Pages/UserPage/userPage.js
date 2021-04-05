import React, { Component } from "react";
import { connect } from "react-redux";
import "./userPage.scss";
import AdvanceFilter from "../../components/AdvanceFilter";

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isLoginError: false,
      errorMessage: "",
      authData: " "
    };
  }

  renderContent = props => {
    if (this.props.auth) {
      this.setState({
        isLoggedIn: true,
        authData: this.props.auth.name
      });
    } else {
      console.log("in a else");
    }
  };

  componentDidMount() {
    this.renderContent();
  }

  componentDidUpdate(_, prevState) {
    if (!(prevState.isLoggedIn)) {
      if (!(this.state.isLoggedIn)) {
        this.renderContent();
      }
    }
  }

  render() {
    return (
      <>
        <div className="user">
          {!this.state.isLoggedIn && (
            <h1 className="user__heading">
              PLEASE SIGN IN TO ACCESS ADVANCE MOVIE SEARCH
            </h1>
          )}
          {this.state.isLoggedIn && (
            <>
              <h1 className="user__heading">
                Welcome {this.state.authData} To Advance Movie Search
              </h1>
              <AdvanceFilter />
            </>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(UserPage);

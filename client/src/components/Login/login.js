import React, { Component } from "react";
import "./login.scss";
import { connect } from "react-redux";
import icon from "../../assets/images/google-icon.svg"

class Login extends Component {
  renderContent = props => {
    switch (this.props.auth) {
      case null:
        return "Login With Google";
      case false:
        return (
          <a
            className="header__login"
            style={{ textDecoration: "none" }}
            href="/auth/google"
          >
            {" "}
            Login With Google
          </a>
        );
      default:
        return (
          <a
            className="header__login"
            style={{ textDecoration: "none" }}
            href="/api/logout"
          >
            Signed In as {this.props.auth.name}
          </a>
        );
    }
  };

  render() {
    return (
      <>
        <section className="auth">
          <div className="auth__container">
          <div className="auth__google">
              <div className="auth__google__container">
              <img className="auth__google__icon" src={icon} alt="google icon"></img>
              <button className="auth__google__button">
                {this.renderContent()}
              </button>
              </div>
            </div>
            <div className="auth__login auth__login--border">
              <h1 className="auth__login__header">Login</h1>
              <form className="auth__login__form">
                <input className="auth__input" type="email" placeholder="Enter your Email"></input>
                <input
                className="auth__input"
                  type="password"
                  placeholder="Enter Your Password"
                ></input>
                <button className="auth__login__button">Log In</button>
              </form>
            </div>
            <div className="auth__login ">
              <h1 className="auth__login__header">Create Account</h1>
              <form className="auth__login__form">
                <input
                className="auth__input"
                  type="name"
                  placeholder="Please Enter your Full Name"
                ></input>
                <input className="auth__input" type="email" placeholder="Please Enter Email"></input>
                <input
                className="auth__input"
                  type="password"
                  placeholder="Please Enter Your Password"
                ></input>
                <button className="auth__login__button">Sign Up</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Login);

import React,  { useState }from "react";
import { NavLink, Link } from "react-router-dom";
import Search from "../SearchInput";
import "./header.scss";
import { connect } from "react-redux";
import ContactUsModal from "../ContactUsModal/contactUsModal";
import ModalContact from "../ModalContact/modalContact";

function Header(props) {

  const [isOpen, setIsOpen]  = useState(false)

  function renderContent() {
    switch (props.auth) {
      case null:
        return (
          <Link
            className="header__login"
            style={{ textDecoration: "none" }}
            to="/login"
          >
            {" "}
            Login
          </Link>
        );
      case false:
        return (
          <Link
            className="header__login"
            style={{ textDecoration: "none" }}
            to="/login"
          >
            {" "}
            Login
          </Link>
        );
      default:
        return (
          <>
            <a
              className="header__login"
              style={{ textDecoration: "none" }}
              href="/login"
            >
              {props.auth.name}
            </a>
          </>
        );
    }
  }
  function renderDropdown() {
    switch (props.auth) {
      case null:
        return (
          <Link style={{ textDecoration: "none" }} to="/login">
            {" "}
            Sign In
          </Link>
        );
      case false:
        return (
          <Link style={{ textDecoration: "none" }} to="/login">
            {" "}
            Sign In
          </Link>
        );
      default:
        return (
          <>
            <a style={{ textDecoration: "none" }} href="/api/logout">
              SignOut
            </a>
          </>
        );
    }
  }

  return (
    <header className="header">
      <div className="header__navbar">
        <div className={`burger ${isOpen ? "toggle" : "" }`}onClick={()=> setIsOpen(!isOpen)}>
          <div className= "line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="header__navbar--primary">
          <div className={`header__navbar--primary--links  ${isOpen ? "header__navbar--primary--links-active" : ""}`}>
          <NavLink
            activeClassName="active-link"
            className="header__logo"
            style={{ textDecoration: "none" }}
            to="/"
          >
            myMovie
          </NavLink>
            <NavLink
              exact
              activeClassName="active-link"
              className="header__menu"
              style={{ textDecoration: "none" }}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              activeClassName="active-link"
              className="header__menu"
              style={{ textDecoration: "none" }}
              to="/findMovie"
            >
              Find A Movie
            </NavLink>
            <NavLink
              activeClassName="active-link"
              className="header__menu "
              style={{ textDecoration: "none" }}
              to="/mood"
            >
              Mood
            </NavLink>
            <NavLink
              activeClassName="active-link"
              className="header__menu"
              style={{ textDecoration: "none" }}
              to="/user"
            >
              Advance Search
            </NavLink>
          </div>
        </div>
        <div className="header__navbar--secondry">
          <Search handleSubmit={props.handleSubmit} />
          <div className="dropdown">
            <div>
              {renderContent()}
              <div className="dropdown-content">
                {renderDropdown()}
                <Link to="/user">User</Link>
                <ContactUsModal />
                <ModalContact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);

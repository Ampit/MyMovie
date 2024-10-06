import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="header__navbar">
        <div className={`burger ${isOpen ? "toggle" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="header__navbar--primary">
          <div className={`header__navbar--primary--links ${isOpen ? "header__navbar--primary--links-active" : ""}`}>
            <NavLink className="header__logo" style={{ textDecoration: "none" }} to="/">
              myMovie
            </NavLink>
            <NavLink className="header__menu" style={{ textDecoration: "none" }} to="/">
              Home
            </NavLink>
            <NavLink className="header__menu" style={{ textDecoration: "none" }} to="/findmovie">
              Find A Movie
            </NavLink>
            <NavLink className="header__menu" style={{ textDecoration: "none" }} to="/mood">
              Mood
            </NavLink>
            <NavLink className="header__menu" style={{ textDecoration: "none" }} to="/advancesearch">
              Advance Search
            </NavLink>
          </div>
        </div>
        <div className="header__navbar--secondary">
          <div className="dropdown">
            <div>
              <div className="dropdown-content">
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

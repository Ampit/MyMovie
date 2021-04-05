import React, { Component } from "react";
import "./searchInput.scss";

class SearchInput extends Component {
  render() {
    return (
      <div>
        <div className="search">
          <div className="search__container">
            <form
              onSubmit={event => this.props.handleSubmit(event, this.props)}
            >
              <input
                name="search"
                type="search"
                placeholder="Search..."
              ></input>
            </form>
            <div className="search__bar"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchInput;

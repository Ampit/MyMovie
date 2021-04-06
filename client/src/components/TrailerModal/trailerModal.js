import React, { Component } from "react";
import Modal from "react-modal";
import "./trailerModal.scss";
import axios from "axios";
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "18c3782da003aade5577c69d80583477";

Modal.setAppElement("#root");
class Trailer extends Component {
  state = {
    showModal: false,
    url: "",
    netflixId: "",
    title: "",
    homepageURL: "",
    overview: "",
    onNetflix: "",
  };

  handleOpenModal = () => {
    axios
      .get(`${API_URL}movie/${this.props.Id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        this.setState({
          url: `https://www.youtube.com/embed/${response.data.results[0].key}`,
          showModal: true,
        });
      });
    axios
      .get(`${API_URL}movie/${this.props.Id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        this.setState({
          netflixId: response.data.imdb_id,
          title: response.data.title,
          overview: response.data.overview,
          homepageURL: response.data.homepage,
        });
        this.isNetflix();
      });
  };
  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  isNetflix = () => {
    axios
      .get(
        `https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=getimdb&q=${this.state.netflixId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
            "x-rapidapi-key": "Your Rapid API Key",
          },
        }
      )
      .then((response) => {
        if (this.isEmpty(response.data)) {
          this.setState({
            onNetflix: "No It is not available",
          });
        } else {
          this.setState({
            onNetflix: "Yes It is available",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.props.handleClose();
  };

  componentDidMount() {
    this.handleOpenModal();
  }

  render() {
    return (
      <div className="modal-container">
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="modal"
          overlayClassName="Overlay"
        >
          <iframe
            className="modal__iframe"
            id="ytplayer"
            type="text/html"
            width="750"
            height="400"
            src={this.state.url}
            border-radius="5"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="modal__description">
            <h2 className="modal__description--heading">{this.state.title}</h2>
            <h3></h3>
            <h5 className="modal__description--overview">
              {this.state.overview}
            </h5>
            <h4 className="modal__description--subheading">
              Netflix : {this.state.onNetflix}
            </h4>
            <a
              className="modal__description--link"
              href={this.state.homepageURL}
              target="blank"
            >
              Link to Movie
            </a>
          </div>
          <button className="modal__button" onClick={this.handleCloseModal}>
            CLOSE
          </button>
        </Modal>
      </div>
    );
  }
}

export default Trailer;

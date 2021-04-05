import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import "./contactUsModal.scss";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid none",
    borderRadius: "14px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
};

export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a type="button" href="#" onClick={handleOpen}>
        About Us
      </a>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="about">
              <h2 id="spring-modal-title" className="about__heading">
                About Us
              </h2>
              <div className="about__container">
                <h2 id="spring-modal-description" className="about__subheading">
                  What is it
                </h2>
                <p className="about__description">
                  {" "}
                  myMovie is a website to suggest you the best highly rated
                  movies based on your resarch. It also Pairs you with the
                  movies based on your mood. The purpose is saves your time by
                  giving you the latest released, trending and much more about
                  movies and also you can watch the trailer of any movie you
                  want. That all in one place.
                </p>
                <h2 className="about__subheading">How it knows your Mood</h2>
                <p className="about__description">
                  {" "}
                  To pair you with the best movies It asks you some questions
                  and based on those answers it detect your Mood and then Gives
                  you 20 movies to watch.
                </p>
                <h2 className="about__subheading">Technologies Used</h2>
                <p className="about__description">
                  The Soul of myMovie is the data Provided by APIs called The
                  Movie Data Base. Other then that made in React. It uses
                  MongoDB database to store the login
                </p>
              </div>             
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

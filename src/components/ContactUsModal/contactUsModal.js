import React from "react";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import "./contactUsModal.scss";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledPaper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: "2px solid none",
  borderRadius: "14px",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3)
}));

export default function SpringModal() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>
        About Us
      </button>
      <StyledModal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <StyledPaper>
            <div className="about">
              <h2 id="spring-modal-title" className="about__heading">
                About Us
              </h2>
              <div className="about__container">
                <h2 id="spring-modal-description" className="about__subheading">
                  What is it
                </h2>
                <p className="about__description">
                  myMovie is a website to suggest you the best highly rated
                  movies based on your research. It also pairs you with the
                  movies based on your mood. The purpose is to save your time by
                  giving you the latest released, trending and much more about
                  movies and also you can watch the trailer of any movie you
                  want. That all in one place.
                </p>
                <h2 className="about__subheading">How it knows your Mood</h2>
                <p className="about__description">
                  To pair you with the best movies it asks you some questions
                  and based on those answers it detects your Mood and then gives
                  you 20 movies to watch.
                </p>
                <h2 className="about__subheading">Technologies Used</h2>
                <p className="about__description">
                  The soul of myMovie is the data provided by APIs called The
                  Movie Database. Other than that it's made in React. It uses
                  MongoDB database to store the login information.
                </p>
              </div>             
            </div>
          </StyledPaper>
        </Fade>
      </StyledModal>
    </>
  );
}

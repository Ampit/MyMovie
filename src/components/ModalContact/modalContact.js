import React from "react";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import "./modalContact.scss";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledPaper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: "2px solid #000",
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
        Contact Us
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
          <StyledPaper className="contact-form">
            <h1 className="contact-form__heading">Let's Talk</h1>
            <form className="contact-form__container">
              <input
                type="text"
                className="contact-form__input"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="contact-form__input"
                placeholder="Your Email"
              />
              <textarea className="contact-form__textarea" placeholder="Your Message..."></textarea>
              <button type="submit" className="contact-form__submit">
                <span>Let's Talk</span>
              </button>
            </form>
          </StyledPaper>
        </Fade>
      </StyledModal>
    </>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/header";
import Search from "./components/SearchInput";
import HomePage from "./Pages/HomePage";
import FindAMovie from "./Pages/FindAMovie";
import Mood from "./Pages/Mood";
import SearchedPage from "./Pages/SearchedPage";
import ContactUsModal from "./components/ContactUsModal/contactUsModal";
import ModalContact from "./components/ModalContact/modalContact";
import AdvanceFilter from "./components/AdvanceFilter/advanceFilter";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  // Function to handle search submit
  const handleSubmit = (searchQuery) => {
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="App">
      <Header />
      <Search handleSubmit={handleSubmit} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/findmovie" element={<FindAMovie />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/search/:query" element={<SearchedPage />} />
        <Route path="/about" element={<ContactUsModal />} />
        <Route path="/contact" element={<ModalContact />} />
        <Route path="/advancesearch" element={<AdvanceFilter />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
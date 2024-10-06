import React from "react";
import { Link } from "react-router-dom";
import "./totalPages.scss";

const TotalPages = props => {
  const pageLinks = [];
  for (let i = 1; i <= 10; i++) {
    let active = props.currentPage === i ? "active" : "";
    pageLinks.push(
      <span
        className={`pagination__links ${active}`}
        key={i}
        onClick={() => props.nextPage(i)}
      >
        <Link  to= {`/findMovie/${i}`} style={{ textDecoration: "none" }} className={`pagination__links--color ${active}`}>{i}</Link>
      </span>
    );
  }

  return (
    <div className="pagination">
      <p> {pageLinks}</p>
    </div>
  );
};

export default TotalPages;

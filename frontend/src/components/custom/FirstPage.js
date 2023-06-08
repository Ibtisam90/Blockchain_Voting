import React from "react";
import { Link } from "react-router-dom";
import candidateImage from "../../Pictures/candidate2.jpg";
import voterImage from "../../Pictures/voter.jpg";

function FirstPage() {
  return (
    <div className="container">
      <h2>Login</h2>
      <p className="prompt">Are you a candidate or a voter?</p>
      <div className="buttons">
        <Link to="/registerCand" className="button">
          <img src={candidateImage} alt="Candidate" className="image" />
          <span className="label">Candidate</span>
        </Link>
        <br />
        <Link to="/register" className="button">
          <img src={voterImage} alt="Voter" className="image" />
          <span className="label">Voter</span>
        </Link>
      </div>
    </div>
  
  );
  
  
}

// const intervalInMilliseconds = 2000;
// setInterval(myFunction, intervalInMilliseconds);

export default FirstPage;

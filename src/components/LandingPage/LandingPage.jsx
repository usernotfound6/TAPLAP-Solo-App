import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";


// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h2>{heading} to TAPLAP</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <img id= 'penny' src="https://media.tenor.com/K8FWysJyy7gAAAAC/spinning-coin-coin-toss.gif"></img>
          <p>
            Welcome to our online community, a place where vulnerability,
            genuine interests, and ideas are explored, shared and celebrated. We're thrilled
            to have you here!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

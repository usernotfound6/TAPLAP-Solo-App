import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./RegisterPage.css";

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="register-container">
      <div className="left-content">
        <img height={80} src={require("./taplap.png")} alt="pennies" />
        <h3>
          Welcome to our online community,<br></br> a place where vulnerability,
          genuine interests,<br></br> and curious ideas are celebrated.
          <br></br>We're thrilled to have you here!
        </h3>
      </div>
      <div className="right-content">
        <RegisterForm />
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        </center>
      </div>
    </div>
  );
}

export default RegisterPage;

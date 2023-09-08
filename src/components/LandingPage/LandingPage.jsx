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
          <p>
            Welcome to our online community, a place where vulnerability,
            genuine interests, and ideas are explored, shared and celebrated. We're thrilled
            to have you here!
          </p>
          <p>
            Our website is a safe and welcoming space where you can share your
            thoughts, feelings, and experiences on topics that matter to you, no
            matter how personal or vulnerable they may be. We believe that
            opening up about your vulnerabilities is an act of courage and
            strength, and here, you'll find a supportive and understanding
            community ready to listen and provide friendly insight and
            perspective.
          </p>

          <p>
            We encourage you to post about the things that truly matter to you,
            whether it's a heartfelt reflection on your life journey, a
            passionate discussion about your favorite hobby, or a wild and
            creative idea you can't stop thinking about. This is a place to be
            authentic and explore the depths of your interests and curiosities.
          </p>
          <p>
            What sets our community apart is the spirit of camaraderie and
            empathy that defines our interactions. When you share your thoughts
            and ideas, you'll find fellow members eager to engage with kindness
            and understanding. Whether through thoughtful comments, shared
            experiences, or helpful advice, you'll discover a wealth of
            perspectives that can broaden your horizons and enrich your
            understanding.
          </p>
          <p>
            Join us in building a community that thrives on authenticity,
            empathy, and the endless wonder of human experience. Together, we
            can make this space a beacon of positivity and understanding.
            Welcome aboard!
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

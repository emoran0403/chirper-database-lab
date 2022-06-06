import React, { useState } from "react";
import * as Types from "../types";
import { useNavigate } from "react-router-dom";

const Loginpage = (props: Types.LoginPageProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter your Username");
      return;
    }
    if (!password) {
      alert("Please enter your passwprd");
      return;
    }
    if (password.length <= 8) {
      alert("Enter a stronger password");
      return;
    }
    if (username.includes("Ervin Howell")) {
      const secretTrackz = new Audio(`../secretTrack.mp3`);
      secretTrackz.play();
    }

    nav("/chirps/");
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card bg-light shadow col-md-4">
        <div className="card-body d-flex flex-wrap justify-content-center">
          <h5 className="card-title text-center col-md-7">Please log in</h5>
          <input
            placeholder="Username"
            type="text"
            value={username}
            className="form-control col-md-7 mb-1"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            className="form-control col-md-7 mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary my-2 ms-2 col-md-7" type="button" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

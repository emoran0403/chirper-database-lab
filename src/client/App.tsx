import * as React from "react";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as Types from "../types";
import Chirps from "./Chirps";
import Loginpage from "./Loginpage";
import { useNavigate } from "react-router-dom";

const App = (props: Types.AppProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [chirpArray, setChirpArray] = useState<Types.IChirp[]>([]);

  const nav = useNavigate();

  // ln LoginPage Props **************************************************************************************************/
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const handleloggedIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // if (!username) {
    //   alert("Please enter your Username");
    //   return;
    // }
    // if (!password) {
    //   alert("Please enter your passwprd");
    //   return;
    // }
    // if (password.length <= 8) {
    //   alert("Enter a stronger password");
    //   return;
    // }
    // make a call to get all chirps here so that they will show up on the next view
    // navigate to "/api/chirps/" here
    nav("/api/chirps/");

    return setloggedIn(!loggedIn);
  };

  // ln Chirps >> Inputs Props **************************************************************************************************/
  const handleSetChirpArray = (data: Types.IChirp[]) => {
    setChirpArray(data);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Loginpage
            username={username}
            password={password}
            loggedIn={loggedIn}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleloggedIn={handleloggedIn}
          />
        }
      />
      <Route path="/api/chirps/" element={<Chirps handleSetChirpArray={handleSetChirpArray} chirpArray={chirpArray} />} />
    </Routes>
  );
};

export default App;

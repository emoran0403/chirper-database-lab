import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as Types from "../types";
import AllChirps from "./AllChirps";
import Loginpage from "./Loginpage";
import SingleChirp from "./SingleChirp";

const App = (props: Types.AppProps) => {
  const [chirpArray, setChirpArray] = useState<Types.IChirp[]>([]);

  // ln Chirps >> Inputs Props **************************************************************************************************/
  const handleSetChirpArray = (data: Types.IChirp[]) => {
    setChirpArray(data);
  };

  useEffect(() => {
    // if (secretSuccess) {
    //   const secretTrackz = new Audio(`secretTrack.mp3`);
    //   secretTrackz.play();
    // }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/chirps/" element={<AllChirps handleSetChirpArray={handleSetChirpArray} chirpArray={chirpArray} />} />
      <Route path="/chirps/:id" element={<SingleChirp handleSetChirpArray={handleSetChirpArray} chirpArray={chirpArray} />} />
    </Routes>
  );
};

export default App;

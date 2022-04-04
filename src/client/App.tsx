import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as Types from "../types";
import Chirps from "./Chirps";
import Loginpage from "./Loginpage";

const App = (props: Types.AppProps) => {
  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/api/chirps/" element={<Chirps />} />
    </Routes>
  );
};

export default App;

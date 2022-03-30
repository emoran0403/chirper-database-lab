import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Types from "../types";
import Homepage from "./Homepage";

/* HOOK REACT EXAMPLE */
const App = (props: Types.AppProps) => {
  return (
    <main className="container my-5">
      <h1 className="text-primary text-center">Hello </h1>
    </main>
  );
};

export default App;

<Routes>
  <Route path="/api" element={<Homepage />} />
</Routes>;

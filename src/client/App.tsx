import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Types from "../types";
import Homepage from "./Homepage";

/* HOOK REACT EXAMPLE */
const App = (props: Types.AppProps) => {
  //   const [greeting, setGreeting] = useState<string>("");

  //   useEffect(() => {
  //     async function getGreeting() {
  //       try {
  //         const res = await fetch("/api/hello");
  //         const greeting = await res.json();
  //         setGreeting(greeting);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getGreeting();
  //   }, []);

  return (
    <main className="container my-5">
      <h1 className="text-primary text-center">Hello </h1>
    </main>
  );
};

export default App;

<Routes>
  <Route path="/api" element={<Homepage />} />
  <Route path="/api" element={<Homepage />} />
  <Route path="/api" element={<Homepage />} />
  <Route path="/api" element={<Homepage />} />
  <Route path="/api" element={<Homepage />} />
  <Route path="/api" element={<Homepage />} />
</Routes>;

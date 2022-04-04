import * as React from "react";
import Inputs from "./Inputs";
import Timeline from "./Timeline";
import * as Types from "../types";

const Chirps = (props: Types.AppProps) => {
  return (
    <>
      <Inputs />
      <Timeline />
    </>
  );
};

export default Chirps;

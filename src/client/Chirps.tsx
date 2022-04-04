import * as React from "react";
import Inputs from "./Inputs";
import Timeline from "./Timeline";
import * as Types from "../types";

const Chirps = (props: Types.ChirpsProps) => {
  return (
    <>
      <Inputs handleSetChirpArray={props.handleSetChirpArray} />
      <Timeline chirpArray={props.chirpArray} />
    </>
  );
};

export default Chirps;

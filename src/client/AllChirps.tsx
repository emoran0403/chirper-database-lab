import React from "react";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import * as Types from "../types";

const AllChirps = (props: Types.ChirpsProps) => {
  const [IDBoxContent, setIDBoxContent] = useState<number>(null);

  const handleIDBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    let numString: number = Number(e.target.value);
    return setIDBoxContent(numString);
  };

  useEffect(() => {
    // when the page first loads
    fetch("/api/chirps") // GET from "/api/chirps"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            props.handleSetChirpArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1>Chirper</h1>
        <div>Find a specific chirp by entering the ID in the box below.</div>
        <input type="number" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Show me some ID" />
      </div>
      <div>
        <div>Chirpline</div>
        <div className="d-flex flex-wrap justify-content-around">
          {props.chirpArray.map((chirp) => (
            <div key={`chirp-${chirp.id}`} className="card col-md-2">
              <div className="card-body">
                <h5 className="card-title">This Chirp says:</h5>
                <div className="card-text">{chirp.content}</div>
                <hr></hr>
                <h6 className="card-subtitle">From: {chirp.location}</h6>
                <h6 className="card-subtitle">UserID: {chirp.userid}</h6>
                <h6 className="card-subtitle">Chirp ID: {chirp.id}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllChirps;

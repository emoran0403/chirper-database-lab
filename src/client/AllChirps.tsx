import React from "react";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Types from "../types";
import NewChirp from "./NewChirp";
import { intChecker } from "./Utils/Input_Validation";

const AllChirps = (props: Types.ChirpsProps) => {
  const [IDBoxContent, setIDBoxContent] = useState<string>("");
  const [chirpArray, setChirpArray] = useState<Types.IChirp[]>([]);

  const nav = useNavigate();

  const handleIDBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setIDBoxContent(e.target.value);
  };

  const getAllChirps = () => {
    fetch("/api/chirps") // GET from "/api/chirps"
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse as JSON data, then with that data
          if (res.ok) {
            // if there was an OK response
            setChirpArray(data); // set the data to state
          } else {
            // if there was not an OK response
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const goToSingleChirp = () => {
    if (intChecker(Number(IDBoxContent))) {
      console.log(`log here`);

      const result = chirpArray.filter((chirp) => {
        return chirp.id === Number(IDBoxContent);
      });

      if (result[0]) {
        console.log(`log here too`);

        nav(`/chirps/${Number(IDBoxContent)})`, { state: { ...result[0] } });
      } else {
        alert(`Sorry, the chirp with an ID of ${Number(IDBoxContent)} does not exist.`);
      }
    }
  };

  useEffect(() => {
    getAllChirps();
  }, []);

  return (
    <>
      <div>
        <h1>Chirper</h1>
        <div>
          <NewChirp />
        </div>
        <div>
          <div>Find a specific chirp by entering the ID in the box below.</div>
          <input
            type="text"
            className="form-control mt-3"
            value={IDBoxContent}
            onChange={(e) => handleIDBoxContentChange(e)}
            placeholder="Show me some ID"
          />
        </div>
        <button className="btn btn-primary" onClick={() => goToSingleChirp()}>
          See Chirp!
        </button>

        <div>
          <div>Chirpline</div>
          <div className="d-flex flex-wrap justify-content-around">
            {chirpArray.map((chirp) => (
              <div key={`chirp-${chirp.id}`} className="card col-md-1">
                <div className="card-body">
                  <h5 className="card-title">This Chirp says:</h5>
                  <div className="card-text">{chirp.content?.substring(0, 10) + "..."}</div>
                  <hr></hr>
                  <h6 className="card-subtitle">From: {chirp.location}</h6>
                  <h6 className="card-subtitle">UserID: {chirp.userid}</h6>
                  <h6 className="card-subtitle">Chirp ID: {chirp.id}</h6>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      nav(`/chirps/${chirp.id}`, { state: { ...chirp } });
                    }}
                  >
                    Manage Chirp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllChirps;

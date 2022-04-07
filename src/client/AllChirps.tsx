import e from "express";
import React from "react";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import * as Types from "../types";

//!  allow user to search for a specific chirp, which will set that to state, to appear below the top stuff

const AllChirps = (props: Types.ChirpsProps) => {
  const [IDBoxContent, setIDBoxContent] = useState<string>("");
  const [textBoxContent, setTextBoxContent] = useState<string>("");
  const [locationBoxContent, setLocationBoxContent] = useState<string>("");
  const [chirpViewToggle, setChirpViewToggle] = useState<boolean>(false); // toggle to show a button to show all chirps.  intended for use after viewing a single chirp

  const handletextBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setTextBoxContent(e.target.value);
  };

  const handleIDBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setIDBoxContent(e.target.value);
  };

  const handleLocationBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setLocationBoxContent(e.target.value);
  };

  const checkLocationBoxContent = (): Boolean => {
    // helper function to determine if the location box has content
    if (locationBoxContent) {
      // If user provides a location, return true
      return true;
    } else {
      // If user does not provide a location, alert and return false
      alert("Where are you Chirping from?");
      return false;
    }
  };

  const checkTextBoxContent = (): Boolean => {
    // helper function to determine if the text box has content
    if (textBoxContent) {
      // If user provides content, return true
      return true;
    } else {
      // if user does not provide content, alert and return false
      alert("Your Chirp needs more text!");
      return false;
    }
  };

  const checkIDBoxContent = (): Boolean => {
    // helper function to determine if the ID box has acceptable content
    // isNaN() returns TRUE if the value is Not a Number
    // !isNaN(Number(IDBoxContent)) converts from a string to a number, since we can only have number IDs
    if (IDBoxContent && !isNaN(Number(IDBoxContent))) {
      // if user does provide an id, and it is an acceptable ID, return true
      return true;
    } else {
      // if user does not provide an id, or if it was an unacceptable ID, return false
      alert("Please enter an ID");
      return false;
    }
  };

  const getAllChirps = () => {
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
            throw new Error(data.message); // throw a new error
          }
        });
      })
      .catch((error) => console.log(error));
    if (chirpViewToggle) {
      setChirpViewToggle(false);
    }
  };

  const getSingleChirp = () => {
    if (checkIDBoxContent()) {
      fetch(`/api/chirps/${Number(IDBoxContent)}`) // GET from "/api/chirps"
        .then((res) => {
          // then with that response
          res.json().then((data) => {
            // parse as JSON data, then with that data
            if (res.ok) {
              // if there was an OK response
              props.handleSetChirpArray(data); // set the data to state
              setIDBoxContent(""); // clear out the input
              setChirpViewToggle(true);
            } else {
              // if there was not an OK response
              alert("No Chirp with that ID exists.");
              throw new Error(data.message); // throw a new error
            }
          });
        })
        .catch((error) => console.log(error));
    }
  };

  function createChirp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (checkLocationBoxContent() && checkTextBoxContent()) {
      // if there is a location and content entered...
      fetch("/api/chirps/", {
        // use the route:  /api/chirps/ ...
        method: "POST", // ...send a POST request...
        headers: {
          // ...specifying the type of content...
          "content-type": "application/json",
        },
        body: JSON.stringify({ userid: 123, content: textBoxContent, location: locationBoxContent }), // ...and deliver the content
      })
        .then((res) => {
          // then with that response
          res.json().then((data) => {
            // parse as JSON data, then with that data
            if (res.ok) {
              // if there was an OK response
              getAllChirps(); // then get all chirps
            } else {
              // if there was not an OK response
              throw new Error(data.message); // throw a new error
            }
          });
        })
        .catch((error) => console.log(error));
    }
    setTextBoxContent("");
    setLocationBoxContent("");
  }

  useEffect(() => {
    getAllChirps();
  }, []);

  return (
    <>
      <div>
        <h1>Chirper</h1>
        <div>
          <form>
            <input id="textBox" className="form-control mt-3" value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} placeholder="Chirp here!" type="text" />
            <input
              id="locationBox"
              className="form-control mt-3"
              value={locationBoxContent}
              onChange={(e) => handleLocationBoxContentChange(e)}
              placeholder="Where do you chirp from?"
              type="text"
            />
            <button className="btn btn-primary" onClick={(e) => createChirp(e)}>
              Send Chirp!
            </button>
          </form>
        </div>
        <div>
          <div>Find a specific chirp by entering the ID in the box below.</div>
          <input type="text" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Show me some ID" />
        </div>
        <button className="btn btn-primary" onClick={() => getSingleChirp()}>
          See Chirp!
        </button>
        {chirpViewToggle && (
          <button className="btn btn-primary" onClick={() => getAllChirps()}>
            See All Chirps again!
          </button>
        )}
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
      </div>
    </>
  );
};

export default AllChirps;

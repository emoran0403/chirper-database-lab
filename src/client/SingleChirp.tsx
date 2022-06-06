import React from "react";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as Types from "../types";

const SingleChirp = (props: Types.InputsProps) => {
  const [chirp, setChirp] = useState<Types.IChirp>(null);
  const [editButtonWasPressed, setEditButtonWasPressed] = useState<boolean>(false);
  const [textBoxContent, setTextBoxContent] = useState<string>("");
  const [locationBoxContent, setLocationBoxContent] = useState<string>("");
  const nav = useNavigate();
  const loc = useLocation();

  const CHIRP = loc.state as Types.IChirp;

  const handleSetEditButtonWasPressed = () => {
    setEditButtonWasPressed(!editButtonWasPressed);
    setTextBoxContent(chirp.content);
    setLocationBoxContent(chirp.location);
  };

  const handletextBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setTextBoxContent(e.target.value);
  };

  const handleLocationBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setLocationBoxContent(e.target.value);
  };

  function editChirp() {
    setEditButtonWasPressed(false);
    fetch(`/api/chirps/${CHIRP.id}`, {
      // use the route:  /api/chirps/ ...
      method: "PUT", // ...send a POST request...
      headers: {
        // ...specifying the type of content...
        "content-type": "application/json",
      },
      body: JSON.stringify({ content: textBoxContent, location: locationBoxContent }), // ...and deliver the content}
    })
      .then((res) => {
        // then with that response
        res.json().then((data) => {
          // parse the response, then with the response
          if (res.ok) {
            // if it was a good response
            getThisChirp();
            // nav("/chirps/");
          } else {
            // if it was a bad response
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  }

  function deleteChirp() {
    fetch(`/api/chirps/${CHIRP.id}`, { method: "DELETE" })
      .then((res) => {
        res.json().then((data) => {
          if (res.ok) {
            nav("/chirps/");
          } else {
            throw new Error(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  }

  const getThisChirp = () => {
    fetch(`/api/chirps/${Number(CHIRP.id)}`).then((res) => {
      // then with that response
      res.json().then((data) => {
        // parse as JSON data, then with that data
        if (res.ok) {
          // if there was an OK response
          setChirp(data[0]); // set the data to state
        } else {
          // if there was not an OK response
          throw new Error(data.message); // throw a new error
        }
      });
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="card col-md-6">
          <div className="card-body">
            {!editButtonWasPressed && (
              <>
                <div className="card-title">Chirp ID: {CHIRP.id}</div>
                <hr />
                <div className="card-text">{CHIRP.content}</div>
                <div className="card-text">{CHIRP.location}</div>
              </>
            )}
            {editButtonWasPressed && (
              <>
                <div className="card-title">Chirp ID: {CHIRP.id}</div>
                <hr />
                <input value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} className="form-control" />
                <input value={locationBoxContent} onChange={(e) => handleLocationBoxContentChange(e)} className="form-control" />
              </>
            )}
          </div>
          <div className="d-flex">
            <button className="btn btn-primary my-2 mx-2" onClick={() => nav("/chirps/")}>
              Go back
            </button>

            {!editButtonWasPressed && (
              <button className="btn btn-warning my-2 mx-2" onClick={() => handleSetEditButtonWasPressed()}>
                Edit this Chirp
              </button>
            )}

            {editButtonWasPressed && (
              <button className="btn btn-success my-2 mx-2" onClick={() => editChirp()}>
                Submit Edit
              </button>
            )}
            {!editButtonWasPressed && (
              <button className="btn btn-danger my-2 mx-2" onClick={() => deleteChirp()}>
                Delete this Chirp
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleChirp;

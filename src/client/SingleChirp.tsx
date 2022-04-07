import e from "express";
import React from "react";
import { ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { useRoutes, useParams } from "react-router-dom";
import * as Types from "../types";

const SingleChirp = (props: Types.InputsProps) => {
  const { id } = useParams(); // we just need the id from the useParams object, so we can destructure it
  const [chirp, setChirp] = useState<Types.IChirp>(null);

  function deleteChirp() {
    // contact /api/chirps/:id with a DELETE request to delete the specified chirp
    fetch(`/api/chirps/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetch(`/api/chirps/${id}`).then((res) => {
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
  }, [id]);

  return (
    <>
      <div>
        <div className="card">
          Content: {chirp?.content}
          <div className="card-footer">Chirp ID: {chirp?.id}</div>
        </div>
        <button className="btn btn-primary" onClick={() => editChirp()}></button>
        <button className="btn btn-primary" onClick={() => deleteChirp()}></button>
      </div>
    </>
  );
};

export default SingleChirp;

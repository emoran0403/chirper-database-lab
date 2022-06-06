import React, { useState } from "react";
import * as Types from "../types";
import { emptyStringChecker } from "./Utils/Input_Validation";
import { useNavigate } from "react-router-dom";

const NewChirp = (props: Types.NewChirpProps) => {
  const [textBoxContent, setTextBoxContent] = useState<string>("");
  const [locationBoxContent, setLocationBoxContent] = useState<string>("");

  const nav = useNavigate();

  function createChirp(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (emptyStringChecker(textBoxContent) && emptyStringChecker(locationBoxContent)) {
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
              // if there was an OK response, navigate to /chirps/ and clear out the input fields
              setTextBoxContent("");
              setLocationBoxContent("");
              nav("/chirps/");
            } else {
              // if there was not an OK response
              throw new Error(data.message); // throw a new error
            }
          });
        })
        .catch((error) => console.log(error));
    } else {
      alert("Please check your input");
    }
  }

  return (
    <>
      <div>
        <form>
          <input
            id="textBox"
            className="form-control mt-3"
            value={textBoxContent}
            onChange={(e) => setTextBoxContent(e.target.value)}
            placeholder="Chirp here!"
            type="text"
          />
          <input
            id="locationBox"
            className="form-control mt-3"
            value={locationBoxContent}
            onChange={(e) => setLocationBoxContent(e.target.value)}
            placeholder="Where do you chirp from?"
            type="text"
          />
          <button className="btn btn-primary" onClick={(e) => createChirp(e)}>
            Send Chirp!
          </button>
        </form>
      </div>
    </>
  );
};

export default NewChirp;

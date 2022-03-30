import react from "react";
import { useState, useEffect } from "react";
import * as Types from "../types";

const Inputs = () => {
  const [textBoxContent, setTextBoxContent] = useState<string>("");
  const [IDBoxContent, setIDBoxContent] = useState<string>("");
  const [locationBoxContent, setLocationBoxContent] = useState<string>("");
  const [userIsCreating, setUserIsCreating] = useState<boolean>(false);
  const [userIsReading, setUserIsReading] = useState<boolean>(false);
  const [userIsUpdating, setUserIsUpdating] = useState<boolean>(false);
  const [userIsDeleting, setUserIsDeleting] = useState<boolean>(false);

  /*************************  Input Boxes  ***********************/

  const handletextBoxContentChange = (e) => {
    return setTextBoxContent(e.target.value);
  };

  const handleIDBoxContentChange = (e) => {
    return setIDBoxContent(e.target.value);
  };

  const handleLocationBoxContentChange = (e) => {
    return setLocationBoxContent(e.target.value);
  };

  /*************************  CRUD Buttons  ***********************/

  const handleUserIsCreating = () => {
    return setUserIsCreating(!userIsCreating);
  };

  const handleUserIsReading = () => {
    return setUserIsReading(!userIsReading);
  };

  const handleUserIsUpdating = () => {
    return setUserIsUpdating(!userIsUpdating);
  };

  const handleUserIsDeleting = () => {
    return setUserIsDeleting(!userIsDeleting);
  };

  /*************************  Submit / Cancel Buttons  ***********************/

  const handleCancelButton = () => {
    setUserIsCreating(false);
    setUserIsReading(false);
    setUserIsUpdating(false);
    setUserIsDeleting(false);
  };

  const handleSubmitButton = () => {
    // do submit stuff
  };

  return (
    <main className="container">
      <div>
        <form>
          <input id="textBox" className="form-control mt-3" value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} placeholder="Chirp box!" type="text" />
          <input id="IDBox" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Chirp box!" type="text" />
          <input
            id="locationBox"
            className="form-control mt-3"
            value={locationBoxContent}
            onChange={(e) => handleLocationBoxContentChange(e)}
            placeholder="Chirp box!"
            type="text"
          />
          <button id="createBtn" onClick={handleUserIsCreating} className="btn-primary">
            Create
          </button>
          <button id="readBtn" onClick={handleUserIsReading} className="btn-primary">
            Read
          </button>
          <button id="updateBtn" onClick={handleUserIsUpdating} className="btn-primary">
            Update
          </button>
          <button id="deleteBtn" onClick={handleUserIsDeleting} className="btn-primary">
            Delete
          </button>
          <button id="submitBtn" onClick={handleSubmitButton} className="btn-primary">
            Submit
          </button>
          <button id="cancelBtn" onClick={handleCancelButton} className="btn-primary">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default Inputs;

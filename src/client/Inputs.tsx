import react from "react";
import { ChangeEvent } from "react";
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

  // useEffect(() => {}, [userIsCreating, userIsReading, userIsUpdating, userIsDeleting]);
  // might need this later

  /*************************  Input Boxes  ***********************/

  const handletextBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setTextBoxContent(e.target.value);
  };

  const handleIDBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setIDBoxContent(e.target.value);
  };

  const handleLocationBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setLocationBoxContent(e.target.value);
  };

  /*************************  CRUD Buttons  ***********************/

  const handleUserIsCreating = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return setUserIsCreating(!userIsCreating);
  };

  const handleUserIsReading = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return setUserIsReading(!userIsReading);
  };

  const handleUserIsUpdating = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return setUserIsUpdating(!userIsUpdating);
  };

  const handleUserIsDeleting = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return setUserIsDeleting(!userIsDeleting);
  };

  /*************************  Submit / Cancel Buttons  ***********************/

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearFieldsAndEnableButtons();
  };

  const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // do submit stuff
    clearFieldsAndEnableButtons();
  };

  /*************************  Helper Functions  ***********************/

  const clearFieldsAndEnableButtons = () => {
    // helper function that clears the input fields and enables buttons
    clearInputs();
    enableAllButtons();
  };

  const enableAllButtons = () => {
    // helper function to enable all buttons
    setUserIsCreating(false);
    setUserIsReading(false);
    setUserIsUpdating(false);
    setUserIsDeleting(false);
  };

  const clearInputs = () => {
    // helper function to clear input fields
    setTextBoxContent("");
    setIDBoxContent("");
    setLocationBoxContent("");
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
          <button id="createBtn" disabled={userIsReading || userIsUpdating || userIsDeleting} onClick={(e) => handleUserIsCreating(e)} className="btn-primary">
            Create
          </button>
          <button id="readBtn" disabled={userIsCreating || userIsUpdating || userIsDeleting} onClick={(e) => handleUserIsReading(e)} className="btn-primary">
            Read
          </button>
          <button id="updateBtn" disabled={userIsCreating || userIsReading || userIsDeleting} onClick={(e) => handleUserIsUpdating(e)} className="btn-primary">
            Update
          </button>
          <button id="deleteBtn" disabled={userIsCreating || userIsReading || userIsUpdating} onClick={(e) => handleUserIsDeleting(e)} className="btn-primary">
            Delete
          </button>
          <button id="submitBtn" onClick={(e) => handleSubmitButton(e)} className="btn-primary">
            Submit
          </button>
          <button id="cancelBtn" onClick={(e) => handleCancelButton(e)} className="btn-primary">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default Inputs;

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

  // lets us conditionally render the crud buttons - when one is clicked, hide them all
  // evaluates to true when user is doing any CRUD operation
  // { !crudButtonClicked && ( crud button JSX here)} // when user is doing CRUD, hide the CRUD buttons
  let crudButtonClicked: boolean = userIsCreating || userIsReading || userIsUpdating || userIsDeleting;

  // lets us conditionally render the submit and cancel buttons - when a crud button is clicked, show them all
  // submit and cancel button functionality includes resetting crud buttons to false, which shows crud buttons and subsequently hides submit / cancel
  // { !hideSubmitCancelButtons && ( submit and cancel JSX here)} // when user is doing CRUD, show the submit and cancel buttons
  let hidingSubmitCancelButtons: boolean = !userIsCreating || !userIsReading || !userIsUpdating || !userIsDeleting;

  /******************************  Conditional render logic for input boxes  **************************/

  // evaluates to true when user is reading OR deleting
  // { !showChirpBox && (chirpBox JSX here)} // used to hide the chirpBox when user is reading or deleting
  let showChirpBox: boolean = userIsReading || userIsDeleting;

  // evaluates to true when user is creating
  // { !showIDBox && (IDBox JSX here)} // used to hide the IDBox when the user is creating
  let showIDBox: boolean = !userIsCreating;

  // evaluates to true when user is reading OR deleting
  // { !showLocationBox && (locationBox JSX here)} // used to hide the locationBox when user is reading or deleting
  let showLocationBox: boolean = !userIsReading || !userIsDeleting;

  /**
   * chirp - show on create and update - hide on read and delete
   * id - show on read and update and delete - hide on create
   * location - show on create and update - hide on read and delete
   */

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
          <div>Click a button to get started</div>

          {/*************************************  CRUD BUTTONS  ***************************************/}

          {!crudButtonClicked && (
            <>
              <button id="createBtn" onClick={(e) => handleUserIsCreating(e)} className="btn-primary">
                Create
              </button>
              <button id="readBtn" onClick={(e) => handleUserIsReading(e)} className="btn-primary">
                Read
              </button>
              <button id="updateBtn" onClick={(e) => handleUserIsUpdating(e)} className="btn-primary">
                Update
              </button>
              <button id="deleteBtn" onClick={(e) => handleUserIsDeleting(e)} className="btn-primary">
                Delete
              </button>
            </>
          )}

          {/*************************************  SUBMIT / CANCEL BUTTONS  ***************************************/}

          {!hidingSubmitCancelButtons && (
            <>
              <button id="submitBtn" onClick={(e) => handleSubmitButton(e)} className="btn-primary">
                Submit
              </button>
              <button id="cancelBtn" onClick={(e) => handleCancelButton(e)} className="btn-primary">
                Cancel
              </button>
            </>
          )}

          {/*************************************  FORM INPUTS  ***************************************/}

          {userIsReading && <div>Enter an id to view a single chirp, or leave blank to view all chirps.</div>}

          {!showChirpBox && (
            <input id="textBox" className="form-control mt-3" value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} placeholder="Chirp box!" type="text" />
          )}
          {!showIDBox && <input id="IDBox" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Chirp box!" type="text" />}
          {!showLocationBox && (
            <input
              id="locationBox"
              className="form-control mt-3"
              value={locationBoxContent}
              onChange={(e) => handleLocationBoxContentChange(e)}
              placeholder="Chirp box!"
              type="text"
            />
          )}
        </form>
      </div>
    </main>
  );
};

export default Inputs;

/**
 *
 * crud buttons are in the form box by default
 * inputs and sumbit / cancel are hidden
 *
 * when a crud button is clicked all crud buttons disappear, and are replaced with submit and cancel
 * the relevant inputs for the clicked crud button appears
 * can i make the sumbit and cancel take up the full width as the crud buttons?
 */

// { condition && (dothiswhentrue)} //shows jsx when condition is true.  if false, returns nothing

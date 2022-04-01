import React from "react";
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

  // ln Conditional render logic for CRUD / Submit / Cancel buttons  ****************************************************************************/

  // lets us conditionally render the crud buttons - when one CRUD button is clicked, hide all CRUD buttons
  // evaluates to true when user is doing any CRUD operation
  // { !crudButtonClicked && ( crud button JSX here)}
  let crudButtonClicked: boolean = userIsCreating || userIsReading || userIsUpdating || userIsDeleting;

  // lets us conditionally render the submit and cancel buttons - when a CRUD button is clicked, show submit and cancel buttons
  // submit and cancel button functionality includes resetting crud buttons to false, which shows crud buttons and subsequently hides submit / cancel
  // evaluates to true when user is doing any CRUD operation
  // { !hideSubmitCancelButtons && ( submit and cancel JSX here)}
  let hidingSubmitCancelButtons: boolean = userIsCreating || userIsReading || userIsUpdating || userIsDeleting;

  // ln Conditional render logic for input boxes  **********************************************************************************************/

  // user needs textbox when creating or updating, user does not need textbox when reading or deleting
  // { !showTextBox && (chirpBox JSX here)}
  // evaluates to true when user does need this rendered
  let showTextBox: boolean = userIsCreating || userIsUpdating;

  // user needs IDbox when reading or updating or deleting, user does not need IDbox when creating
  // { !showIDBox && (IDBox JSX here)}
  // evaluates to true when user does need this rendered
  let showIDBox: boolean = userIsCreating || userIsUpdating || userIsReading;

  // user needs location box when creating or updating, user does not need location box when reading or deleting
  // { !showLocationBox && (locationBox JSX here)}
  // evaluates to true when user does need this rendered

  let showLocationBox: boolean = userIsCreating || userIsUpdating;

  // ln Input Boxes  ****************************************************************************************************************************/

  const handletextBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setTextBoxContent(e.target.value);
  };

  const handleIDBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setIDBoxContent(e.target.value);
  };

  const handleLocationBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setLocationBoxContent(e.target.value);
  };

  // ln CRUD Buttons  ***************************************************************************************************************************/

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

  // ln Submit Button  ****************************************************************************************************************/

  const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Submit will execute each CRUD operation based on which was selected
    e.preventDefault();

    // ln CREATE / POST ****************************************************************************************************************/

    if (userIsCreating && checkTextBoxContent() && checkLocationBoxContent()) {
      // if user is creating, and both textbox and location box have content
      // do create stuff
    }

    // ln READ / GET ****************************************************************************************************************/

    if (userIsReading) {
      // if user is reading chirps...
      if (!IDBoxContent) {
        // ...and did not provide an id, get all chirps...
        // do get all chirps stuff
      } else {
        // ...Otherwise, get the specified chirp
        // do get one chirp stuff
      }
    }

    // ln UPDATE / PUT ****************************************************************************************************************/

    if (userIsUpdating && checkIDBoxContent() && checkTextBoxContent() && checkLocationBoxContent()) {
      // if user is updating, and ALL boxes have content
      // do update stuff
    }

    // ln DESTROY / DELETE ****************************************************************************************************************/

    if (userIsDeleting && checkIDBoxContent()) {
      // if user is deleting, and id box has acceptable content
      // do destroy stuff
    }
    clearFieldsAndEnableButtons();
  };

  // ln Cancel Button ************************************************************************************************************************/

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearFieldsAndEnableButtons();
  };

  // ln Helper Functions  *************************************************************************************************************/

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

  return (
    <main className="container">
      <div>
        <form>
          <div>Click a button to get started</div>

          {/************************************  CRUD BUTTONS  ***************************************/}

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

          {hidingSubmitCancelButtons && (
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

          {showTextBox && (
            <input id="textBox" className="form-control mt-3" value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} placeholder="Chirp box!" type="text" />
          )}
          {showIDBox && <input id="IDBox" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Chirp box!" type="text" />}
          {showLocationBox && (
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

/**
 * chirp - show on create and update - hide on read and delete
 * id - show on read and update and delete - hide on create
 * location - show on create and update - hide on read and delete
 */

// useEffect(() => {}, [userIsCreating, userIsReading, userIsUpdating, userIsDeleting]);
// might need this later

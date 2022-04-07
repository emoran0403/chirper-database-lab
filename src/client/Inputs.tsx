// import { data } from "jquery";
// import React from "react";
// import { ChangeEvent } from "react";
// import { useState, useEffect } from "react";
// import * as Types from "../types";

// const Inputs = (props: Types.InputsProps) => {
//   const [textBoxContent, setTextBoxContent] = useState<string>("");
//   const [IDBoxContent, setIDBoxContent] = useState<string>("");
//   const [locationBoxContent, setLocationBoxContent] = useState<string>("");

//   const [userIsCreating, setUserIsCreating] = useState<boolean>(false);
//   const [userIsReading, setUserIsReading] = useState<boolean>(false);
//   const [userIsUpdating, setUserIsUpdating] = useState<boolean>(false);
//   const [userIsDeleting, setUserIsDeleting] = useState<boolean>(false);

//   const [crudToggle, setCrudToggle] = useState<boolean>(false); // false to show crud buttons, true to show submit/cancel

//   const [showTextBox, setShowTextBox] = useState<boolean>(false); // true to show, false to hide
//   const [showIDBox, setShowIDBox] = useState<boolean>(false); // true to show, false to hide
//   const [showLocationBox, setShowLocationBox] = useState<boolean>(false); // true to show, false to hide

//   useEffect(() => {
//     let currentChirp = props.chirpArray[0]; // get the first chirp in the array
//     if (currentChirp) {
//       // if the first chirp in the array exists, set the text and location from that chirp
//       setTextBoxContent(props.chirpArray[0].content);
//       setLocationBoxContent(props.chirpArray[0].location);
//     }
//   }, [props.chirpArray]); // watch for changes in the chirp array

//   // ln Input Boxes  ****************************************************************************************************************************/

//   const handletextBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
//     return setTextBoxContent(e.target.value);
//   };

//   const handleIDBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
//     return setIDBoxContent(e.target.value);
//   };

//   const handleLocationBoxContentChange = (e: ChangeEvent<HTMLInputElement>) => {
//     return setLocationBoxContent(e.target.value);
//   };

//   // ln CRUD Buttons  ***************************************************************************************************************************/

//   const handleUserIsCreating = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setCrudToggle(true);
//     setShowTextBox(true);
//     setShowLocationBox(true);
//     setUserIsCreating(!userIsCreating);
//   };

//   const handleUserIsReading = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setCrudToggle(true);
//     setShowIDBox(true);
//     setUserIsReading(!userIsReading);
//   };

//   const handleUserIsUpdating = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setCrudToggle(true);
//     // setShowTextBox(true);
//     setShowIDBox(true);
//     // setShowLocationBox(true);
//     setUserIsUpdating(!userIsUpdating);
//   };

//   const handleUserIsDeleting = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setCrudToggle(true);
//     setShowIDBox(true);
//     setUserIsDeleting(!userIsDeleting);
//   };

//   // ln Submit Button  ****************************************************************************************************************/

//   const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
//     // Submit will execute each CRUD operation based on which was selected
//     e.preventDefault();

//     // ln CREATE / POST ****************************************************************************************************************/

//     if (userIsCreating && checkTextBoxContent() && checkLocationBoxContent()) {
//       // if user is creating, and both textbox and location box have content
//       // do create stuff
//       createChirp();
//       clearFieldsAndEnableButtons();
//     }

//     // ln READ / GET ****************************************************************************************************************/

//     if (userIsReading) {
//       // if user is reading chirps...
//       if (!IDBoxContent) {
//         // ...and did not provide an id, get all chirps...
//         readAllChirps();
//         clearFieldsAndEnableButtons();
//       } else {
//         // ...Otherwise, get the specified chirp
//         // checkIDBoxContent() returns true if there is a number entered
//         if (checkIDBoxContent()) {
//           readSingleChirp(Number(IDBoxContent));
//           clearFieldsAndEnableButtons();
//         }
//       }
//     }

//     // ln UPDATE / PUT ****************************************************************************************************************/

//     if (userIsUpdating && checkTextBoxContent() && checkLocationBoxContent()) {
//       // if user is updating, and boxes have content
//       // do update stuff
//       updateChirp();
//       // readSingleChirp(Number(IDBoxContent));
//       clearFieldsAndEnableButtons();
//     }

//     // ln DESTROY / DELETE ****************************************************************************************************************/

//     if (userIsDeleting && checkIDBoxContent()) {
//       // if user is deleting, and id box has acceptable content, then delete the chirp and clear fields and enable buttons
//       deleteChirp(Number(IDBoxContent));
//       clearFieldsAndEnableButtons();
//     }
//   };

//   // ln Cancel Button ************************************************************************************************************************/

//   const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     clearFieldsAndEnableButtons();
//   };

//   // ln Helper Functions  *************************************************************************************************************/

//   const clearFieldsAndEnableButtons = () => {
//     // helper function that clears the input fields and enables buttons
//     clearAndHideInputs();
//     enableAllButtons();
//   };

//   const enableAllButtons = () => {
//     // helper function to enable all buttons
//     setUserIsCreating(false);
//     setUserIsReading(false);
//     setUserIsUpdating(false);
//     setUserIsDeleting(false);
//     setCrudToggle(false);
//   };

//   const clearAndHideInputs = () => {
//     // helper function to clear and hide input fields
//     setTextBoxContent("");
//     setShowTextBox(false);
//     setIDBoxContent("");
//     setShowIDBox(false);
//     setLocationBoxContent("");
//     setShowLocationBox(false);
//   };

//   const checkTextBoxContent = (): Boolean => {
//     // helper function to determine if the text box has content
//     if (textBoxContent) {
//       // If user provides content, return true
//       return true;
//     } else {
//       // if user does not provide content, alert and return false
//       alert("Your Chirp needs more text!");
//       return false;
//     }
//   };

//   const checkLocationBoxContent = (): Boolean => {
//     // helper function to determine if the location box has content
//     if (locationBoxContent) {
//       // If user provides a location, return true
//       return true;
//     } else {
//       // If user does not provide a location, alert and return false
//       alert("Where are you Chirping from?");
//       return false;
//     }
//   };

//   const checkIDBoxContent = (): Boolean => {
//     // helper function to determine if the ID box has acceptable content
//     // isNaN() returns TRUE if the value is Not a Number
//     // !isNaN(Number(IDBoxContent)) converts from a string to a number, since we can only have number IDs
//     if (IDBoxContent && !isNaN(Number(IDBoxContent))) {
//       // if user does provide an id, and it is an acceptable ID, return true
//       return true;
//     } else {
//       // if user does not provide an id, or if it was an unacceptable ID, return false
//       alert("Please enter an ID");
//       return false;
//     }
//   };

//   function getChirpAndStageForEditing(e: React.MouseEvent<HTMLButtonElement>) {
//     e.preventDefault();

//     if (checkIDBoxContent()) {
//       // if there is a good id...
//       let chirpOfInterest = readSingleChirp(Number(IDBoxContent))[0];
//       if (chirpOfInterest) {
//         // ... and if the chirp exists
//         setShowTextBox(true);
//         setShowIDBox(false);
//         setShowLocationBox(true);
//       } else {
//         //! check here for the shit going wrong
//         // ... otherwise, alert the user and go back
//         clearFieldsAndEnableButtons();
//       }
//     }
//   }

//   // ln Fetch Requests  *************************************************************************************************************/
//   /**
//    * create - done
//    * update
//    * read1 - done
//    * readall - done
//    * delete - done
//    */
//   //! not quite done yet
//   function createChirp() {
//     /**
//    * {
//   "userid": number,
//   "content": "string",
//   "location": "string"
// }
//    */
//     fetch("/api/chirps/", {
//       // use the route:  /api/chirps/ ...
//       method: "POST", // ...send a POST request...
//       headers: {
//         // ...specifying the type of content...
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({ userid: 123, content: textBoxContent, location: locationBoxContent }), // ...and deliver the content
//     }).then(() => readAllChirps());
//   }

//   function readSingleChirp(ID: Number): Types.IChirp {
//     // contact /api/chirps
//     fetch(`/api/chirps/${ID}`)
//       .then((chirp) => {
//         // console.log(chirp);
//         if (chirp.ok) {
//           return chirp.json();
//         } else {
//           alert("No chirp with that ID found");
//           setShowIDBox(false);
//           throw new Error();
//         }
//       })
//       .then((data) => data.json())
//       .then((data) => props.handleSetChirpArray(data))
//       .catch((error) => console.log(error));
//     return;
//   }

//   function readAllChirps(): Types.IChirp {
//     // contact /api/chirps
//     fetch(`/api/chirps/`)
//       .then((res) => res.json())
//       .then((data) => props.handleSetChirpArray(data));
//     return;
//   }

//   function updateChirp() {
//     fetch(`/api/chirps/${IDBoxContent}`, {
//       // use the route:  /api/chirps/ ...
//       method: "PUT", // ...send a POST request...
//       headers: {
//         // ...specifying the type of content...
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({ content: textBoxContent, location: locationBoxContent }), // ...and deliver the content
//     })
//       .then((chirp) => {
//         console.log("hey look here");
//         console.log(chirp);
//         if (chirp.ok) {
//           return chirp.json();
//         } else {
//           clearFieldsAndEnableButtons();
//           console.log("this is super annoying");
//           alert("No chirp with that ID found - this came from wrong edits");

//           throw new Error();
//         }
//       })
//       .then(() => readSingleChirp(Number(IDBoxContent)))
//       .catch((error) => console.log(error));
//   }

//   function deleteChirp(ID: number) {
//     // contact /api/chirps/:id with a DELETE request to delete the specified chirp
//     fetch(`/api/chirps/${ID}`, { method: "DELETE" })
//       .then((res) => res.json())
//       .then(() => readAllChirps())
//       .catch((error) => console.log(error));
//   }

//   return (
//     <main className="container">
//       <div>
//         <form>
//           <div>Click a button to get started</div>

//           {/************************************  CRUD BUTTONS  ***************************************/}

//           {!crudToggle && (
//             <>
//               <button id="createBtn" onClick={(e) => handleUserIsCreating(e)} className="btn btn-primary mx-1">
//                 Create
//               </button>
//               <button id="readBtn" onClick={(e) => handleUserIsReading(e)} className="btn btn-info mx-1">
//                 Read
//               </button>
//               <button id="updateBtn" onClick={(e) => handleUserIsUpdating(e)} className="btn btn-warning mx-1">
//                 Update
//               </button>
//               <button id="deleteBtn" onClick={(e) => handleUserIsDeleting(e)} className="btn btn-danger mx-1">
//                 Delete
//               </button>
//             </>
//           )}

//           {/*************************************  SUBMIT / CANCEL BUTTONS  ***************************************/}

//           {crudToggle && (
//             <>
//               <button id="submitBtn" onClick={(e) => handleSubmitButton(e)} className="btn btn-success mx-1">
//                 Submit
//               </button>
//               <button id="cancelBtn" onClick={(e) => handleCancelButton(e)} className="btn btn-secondary mx-1">
//                 Cancel
//               </button>
//             </>
//           )}

//           {/*************************************  FORM INSTRUCTIONS  ***************************************/}

//           {userIsReading && <div>Enter an id to view a single chirp, or leave blank to view all chirps.</div>}
//           {userIsUpdating && (
//             <>
//               <div>Enter the id of the chirp you want to edit, then click the Re-Chirp button.</div>
//               <button id="updateIDBtn" className="btn btn-primary" onClick={(e) => getChirpAndStageForEditing(e)}>
//                 Re-Chirp
//               </button>
//             </>
//           )}
//           {/* {<div>Edit the your chirp below.</div>} */}

//           {/*************************************  FORM INPUTS  ***************************************/}

//           {showTextBox && (
//             <input id="textBox" className="form-control mt-3" value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} placeholder="Chirp here!" type="text" />
//           )}
//           {showIDBox && (
//             <input id="IDBox" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Let me see some ID" type="text" />
//           )}
//           {showLocationBox && (
//             <input
//               id="locationBox"
//               className="form-control mt-3"
//               value={locationBoxContent}
//               onChange={(e) => handleLocationBoxContentChange(e)}
//               placeholder="Where do you chirp from?"
//               type="text"
//             />
//           )}
//         </form>
//       </div>
//     </main>
//   );
// };

// export default Inputs;

// /**
//  *
//  * crud buttons are in the form box by default
//  * inputs and sumbit / cancel are hidden
//  *
//  * when a crud button is clicked all crud buttons disappear, and are replaced with submit and cancel
//  * the relevant inputs for the clicked crud button appears
//  * can i make the sumbit and cancel take up the full width as the crud buttons?
//  */

// // { condition && (dothiswhentrue)} //shows jsx when condition is true.  if false, returns nothing

// /**
//  * chirp - show on create and update - hide on read and delete
//  * id - show on read and update and delete - hide on create
//  * location - show on create and update - hide on read and delete
//  */

// // useEffect(() => {}, [userIsCreating, userIsReading, userIsUpdating, userIsDeleting]);
// // might need this later

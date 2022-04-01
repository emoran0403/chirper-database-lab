import * as express from "express";
import db from "./db";
import { MysqlError } from "mysql";
import { Type } from "typescript";

const router = express.Router();

//ln CREATE  ********************************************************************************************************************/

// Route for making a chirp
router.post("/api/chirps/newchirp", async (req, res) => {
  try {
    const { userid, content, location } = req.body;
    //todo this is where i'll need to use   writeOne = async (userid: number, content: string, location: string)
    const results = await db.Chirps.writeOne(userid, content, location);

    res.status(200).json({ message: `New Chirp Added`, ID: results.insertId });
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

//ln READ  ********************************************************************************************************************/

// Route for getting all chirps
router.get("/api/chirps", async (req, res) => {
  try {
    const data = await db.Chirps.readAll();
    data.forEach((chirp) => {
      delete chirp.location; // remove the location info from all chirps.  data now an array of chirps without the location property
    });

    res.json(data); // when we go to /api/chirps, we want to make a Chirps query of all chirps
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

// Route for getting a single chirp
router.get("/api/chirps/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const [chirp] = await db.Chirps.readOne(Number(id)); // ...and use it as a number later.  We want the first chirp in the array, so we specify the [0] here

    //* how can we check if there is a response that does not include a chirp?
    // This is how:
    if (chirp) {
      // if the chirp exists in the database, send it as the response
      res.json(chirp);
    } else {
      // if the chirp does not exist, send a 404 error
      res.status(404).json({ message: "does not exist" });
    }
    // returns an array, but we want the first in the array, so we can specify [0] here
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

//ln UPDATE  ********************************************************************************************************************/

// Route for editing a chirp
router.put("/api/chirps/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const { content, location } = req.body; // grab the content and location from the body...

    const newChirpInfo = { content: content, location: location }; //! need to make this work // pack it into an object to send all at once...

    const [results] = await db.Chirps.readOne(Number(id)); // ...and use the id as a number to get that particular chirp.  We destructure the array to get the first chirp in the array

    //* how can we check if there is a response that does not include a chirp?
    // This is how:
    if (results) {
      // if the chirp exists in the database, send it as the response

      const updateResults = await db.Chirps.updateChirp(newChirpInfo, Number(id)); // newChirpInfo contains the new content and location, id specifies the chirp

      if (updateResults.affectedRows) {
        res.status(200).json({ message: `Chirp ${id} was updated to show ${content}` });
      } else {
        res.status(400).json({ message: `Could not update` });
      }
    } else {
      // if the chirp does not exist, send a 404 error
      res.status(404).json({ message: "does not exist" });
    }
    // returns an array, but we want the first in the array, so we can specify [0] here
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

//ln  DESTROY  ********************************************************************************************************************/

// Route for deleting a chirp
router.delete("/api/chirps/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const results = await db.Chirps.deleteChirp(Number(id)); // ...and use it as a number later.  We want the first chirp in the array, so we specify the [0] here

    //? how can we check if there is a response that does not inclued a chirp?
    // This is how:
    if (results.affectedRows) {
      // if the chirp exists in the database, send it as the response
      res.status(200).json({ message: `Chirp ${id} was deleted` });
    } else {
      // if the chirp does not exist, send a 404 error
      // instead of a mean 404, I want to inform the user that a bad id was entered and to try again
      res.status(404).json({ message: "does not exist" });
    }
    // returns an array, but we want the first in the array, so we can specify [0] here
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.status(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

export default router;

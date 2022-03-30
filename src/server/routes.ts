import * as express from "express";
import db from "./db";
import { MysqlError } from "mysql";

const router = express.Router();

//*************************  CREATE  *****************************/

// Route for making a chirp
router.post("/api/chirps/newchirp", async (req, res) => {
  try {
    //todo this is where i'll need to use   writeOne = async (id: number, userid: number, content: string, location: string)

    res.status(200).json({ message: "New Chirp Added!" });
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.sendStatus(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

//*************************  READ  *****************************/

// Route for getting all chirps
router.get("/api/chirps", async (req, res) => {
  try {
    const data = await db.Chirps.readAll();

    //todo I can use a for each loop to remove data we dont need from the db response, and send the relevant data to the front end

    res.json(data); // when we go to /api/chirps, we want to make a Chirps query of all chirps
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.sendStatus(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

// Route for getting a single chirp
router.get("/api/chirps/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const [chirp] = await db.Chirps.readOne(Number(id))[0]; // ...and use it as a number later.  We want the first chirp in the array, so we specify the [0] here

    //* how can we check if there is a response that does not include a chirp?
    // This is how:
    if (chirp) {
      // if the chirp exists in the database, send it as the response
      res.json(chirp);
    } else {
      // if the chirp does not exist, send a 404 error
      //! instead of a mean 404, I want to inform the user that a bad id was entered and to try again
      res.status(404).json({ message: "does not exist" });
    }
    // returns an array, but we want the first in the array, so we can specify [0] here
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.sendStatus(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

//*************************  UPDATE  *****************************/

// Route for editing a chirp
router.post("/api/chirps/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const [chirp] = await db.Chirps.readOne(Number(id))[0]; // ...and use it as a number later.  We want the first chirp in the array, so we specify the [0] here

    //* how can we check if there is a response that does not include a chirp?
    // This is how:
    if (chirp) {
      // if the chirp exists in the database, send it as the response
      res.json(chirp);
    } else {
      // if the chirp does not exist, send a 404 error
      //! instead of a mean 404, I want to inform the user that a bad id was entered and to try again
      res.status(404).json({ message: "does not exist" });
    }
    // returns an array, but we want the first in the array, so we can specify [0] here
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.sendStatus(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

//*************************  DESTROY  *****************************/

// Route for deleting a chirp
router.delete("/api/chirps/deletechirp/:id", async (req, res) => {
  try {
    const { id } = req.params; // grab the id from req.params...
    const [chirp] = await db.Chirps.deleteChirp(Number(id))[0]; // ...and use it as a number later.  We want the first chirp in the array, so we specify the [0] here

    //? how can we check if there is a response that does not inclued a chirp?
    // This is how:
    if (chirp) {
      // if the chirp exists in the database, send it as the response
      res.json(chirp);
    } else {
      // if the chirp does not exist, send a 404 error
      //! instead of a mean 404, I want to inform the user that a bad id was entered and to try again
      res.status(404).json({ message: "does not exist" });
    }
    // returns an array, but we want the first in the array, so we can specify [0] here
  } catch (error) {
    const myError: MysqlError = error;
    console.log(`\n`);
    console.log(error); // if an error happens, log the error
    console.log(`\n${myError.sqlMessage}\n`); // log the sql error as well message
    res.sendStatus(500).json({ message: "Pizza peepee spaghetti poopoo error happened here" }); // send status of 500
  }
});

export default router;

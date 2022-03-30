import * as mysql from "mysql"; // import mysql so that we can make requests from the database
import Chirps from "./queries";
import * as dotenv from "dotenv";
import { DATABASE_CONFIG } from "../config"; // import the database config object containing the connection info
import * as Types from '../../types';

dotenv.config();

// console.log(process.env);

// creates a database connection with the following properties
// make sure to enable 'chirper'@'localhost' in mysql

export const Connection = mysql.createPool(DATABASE_CONFIG);

export const Query = <Types.IQuery>(query, values?) => {
  // this helper function allows us to abstract this part out from every query we want to make later
  // this query function will create a promise for us, enabling our requests to be non-blocking
  // values is optional because when querying all chirps, we don't need to specify a specific chirp

  return new Promise<Array<any>>((resolve, reject) => {
    //   const formattedSQL = mysql.format(query, string) // check video
    Connection.query(query, values, (err, results) => {
      if (err) reject(err);
      return resolve(results);
    });
  });
};

export default {
  // this is where the tables from the database will be exported
  Chirps, // Chirps contains the query functions defined in chirps.ts
};



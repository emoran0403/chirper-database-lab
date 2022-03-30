import { Query } from ".";
import * as Type from "../../types";
// mysql knows to evaluate each query parameter separately to prevent bad things from happening

//*************************  CREATE  *****************************/

// insert into chirps (id: number, userid: number, content: string, location: string) values (id, userid, content, location);
const writeOne = (userid: number, content: string, location: string) => Query("INSERT INTO chirps (id, userid, content, location) VALUES (?, ?, ?)", [userid, content, location]); // id will be provided by the DB

//*************************  READ  *****************************/

// readAll will query the database and select all chirps from the chirps table
const readAll = () => Query<Type.IChirp>("SELECT * FROM chirps");

// readOne will query the database and select a single chirp specified by its id
const readOne = (id: number) => Query<Type.IChirp>("SELECT * FROM chirps WHERE id = ?", [id]);

//*************************  UPDATE  *****************************/
// updateChirp will update the content of a chirp matching the id provided
const updateChirp = (content: string, id: number) => Query(`UPDATE chirps SET content = ? WHERE id = ?`, [content, id]);

//*************************  DESTROY  *****************************/
//    DELETE FROM chirps WHERE id = 3
const deleteChirp = (id: number) => Query(`DELETE FROM chirps WHERE id = ?`, [id]);

export default {
  // export functions so that we may call them from another file
  readAll,
  readOne,
  writeOne,
  updateChirp,
  deleteChirp,
};

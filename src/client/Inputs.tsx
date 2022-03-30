import react from "react";
import { useState, useEffect } from "react";
import * as Types from "../types";

const Inputs = () => {
  const [textBoxContent, setTextBoxContent] = useState<string>("");
  const [IDBoxContent, setIDBoxContent] = useState<string>("");

  const handletextBoxContentChange = (e) => {
    return setTextBoxContent(e.target.value);
  };

  const handleIDBoxContentChange = (e) => {
    return setIDBoxContent(e.target.value);
  };

  return (
    <main className="container">
      <div>
        <form>
          <input id="textBox" className="form-control mt-3" value={textBoxContent} onChange={(e) => handletextBoxContentChange(e)} placeholder="Chirp box!" type="text" />
          <input id="IDBox" className="form-control mt-3" value={IDBoxContent} onChange={(e) => handleIDBoxContentChange(e)} placeholder="Chirp box!" type="text" />
          <button id="createBtn" className="btn-primary">
            Create
          </button>
          <button id="readBtn" className="btn-primary">
            Read
          </button>
          <button id="updateBtn" className="btn-primary">
            Update
          </button>
          <button id="deleteBtn" className="btn-primary">
            Delete
          </button>
          <button id="cancelBtn" className="btn-primary">
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default Inputs;

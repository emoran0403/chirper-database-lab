import React, { ChangeEvent, MouseEvent } from "react";
import { useState, useEffect } from "react";
import * as Types from "../types";

const Loginpage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    return setPassword(e.target.value);
  };

  const handleloggedIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return setloggedIn(!loggedIn);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card bg-light shadow col-md-4">
        <div className="card-body d-flex flex-wrap justify-content-center">
          <h5 className="card-title text-center col-md-7">Please log in</h5>
          <input type="text" value={username} className="form-control col-md-7 mb-1" onChange={(e) => handleUsernameChange(e)} />
          <input type="password" value={password} className="form-control col-md-7 mt-1" onChange={(e) => handlePasswordChange(e)} />
          <button className="btn btn-primary my-2 ms-2 col-md-7" type="button" onClick={(e) => handleloggedIn(e)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

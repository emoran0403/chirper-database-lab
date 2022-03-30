import react from "react";
import { useState, useEffect } from "react";
import * as Types from "../types";

const Homepage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const handleUsernameChange = (e) => {
    return setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    return setUsername(e.target.value);
  };

  const handleloggedIn = (e) => {
    return setloggedIn(!loggedIn);
  };

  return (
    <div className="card bg-light shadow">
      <div className="card-body">
        <h5 className="card-title text-center">Please log in</h5>
        <input type="text" value={username} className="card-text" onChange={(e) => handleUsernameChange(e)} />
        <input type="password" value={password} className="card-text" onChange={(e) => handlePasswordChange(e)} />

        <button className="btn btn-primary my-2 ms-2" type="button" onClick={(e) => handleloggedIn(e)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Homepage;

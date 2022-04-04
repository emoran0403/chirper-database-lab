import React, { ChangeEvent, MouseEvent } from "react";
import { useState, useEffect } from "react";
import * as Types from "../types";

const Loginpage = (props: Types.LoginPageProps) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card bg-light shadow col-md-4">
        <div className="card-body d-flex flex-wrap justify-content-center">
          <h5 className="card-title text-center col-md-7">Please log in</h5>
          <input type="text" value={props.username} className="form-control col-md-7 mb-1" onChange={(e) => props.handleUsernameChange(e)} />
          <input type="password" value={props.password} className="form-control col-md-7 mt-1" onChange={(e) => props.handlePasswordChange(e)} />
          <button className="btn btn-primary my-2 ms-2 col-md-7" type="button" onClick={(e) => props.handleloggedIn(e)}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;

import React from "react";
import * as Types from "../types";

const Timeline = (props: Types.TimelineProps) => {
  return (
    <>
      <div>Chirpline</div>
      <div className="d-flex flex-wrap justify-content-around">
        {props.chirpArray.map((chirp) => (
          <div key={`chirp-${chirp.id}`} className="card col-md-2">
            <div className="card-body">
              <h5 className="card-title">This Chirp says:</h5>
              <div className="card-text">{chirp.content}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Timeline;

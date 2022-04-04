import React from "react";
import * as Types from "../types";

const Timeline = (props: Types.TimelineProps) => {
  return (
    <>
      <div>This is Timeline</div>
      <div>
        {props.chirpArray.map((chirp) => (
          <div className="card">
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

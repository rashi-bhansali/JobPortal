import React from 'react'
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import "../Styles/Applicant/CircularProgress.css";

  function CircularProgress()
  {
      return(
      <div className="completeness pt-5">
        <div className="pb-3">
        <h5>Profile Completeness</h5>
        <p>Put value for "Cover Image" field to increase your skill up to "15%"</p>
        </div>
        <div className="circularprogress">
        <CircularProgressbar
        value={85}
        text={`85%`}
        strokeWidth={20}
        background
        backgroundPadding={7}
        styles={buildStyles({
            strokeLinecap: "butt",
            textColor: "#777",
            pathColor: "#e9896a",
            trailColor: "white",
            textSize: "14px",
            backgroundColor: "#fff",
            rotation: 0.25
        })}
      />
      </div>
      </div>);
  }

  export default CircularProgress;
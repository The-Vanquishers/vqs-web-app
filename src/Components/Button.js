import React from "react";
import "../App.css";
import { default as MuiButton } from "@mui/material/Button";

function Button(props) {
  return (
    <div className="input-container">
      <MuiButton
        variant="contained"
        color={props.color || "primary"}
        onClick={props.onClick}
        disabled={props.loading}
      >
        {props.text}
      </MuiButton>
    </div>
  );
}

export default Button;

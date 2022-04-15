import React from "react";
import "../App.css";
import TextField from "@mui/material/TextField";

function Input(props) {
  return (
    <div className="input-container">
      <TextField
        type={props.type || "text"}
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        placeholder={props.placeholder}
        classes={props.class}
      />
    </div>
  );
}

export default Input;

import { TextField } from "@mui/material";
import React from "react";

const Input = ({ ...props }) => {
  return (
    <TextField
      id="outlined-basic"
      label={props.label}
      variant="outlined"
      onChange={props.func}
    />
  );
};

export default Input;

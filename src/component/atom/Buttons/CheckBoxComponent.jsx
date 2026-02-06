import React from "react";
import { Checkbox } from "@mui/material";

const CheckBoxComponent = ({ onClick, value, defaultChecked }) => {
  return (
    <>
      <Checkbox
        inputProps={{ "aria-label": "controlled" }}
        value={value}
        onClick={onClick}
        defaultChecked={defaultChecked}
        color="success"
      />
    </>
  );
};

export default CheckBoxComponent;

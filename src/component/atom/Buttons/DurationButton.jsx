import React from "react";
import Radio from "@mui/material/Radio";
import { Box, Typography } from "@mui/material";

const DurationButton = ({ title = "", subtitle = "" }) => {
  return (
    <Box className="btn-duration">
      <span  style={{fontFamily:"Montserrat", fontSize:15, color:"#2d3945"}}>
        {title}
      </span>
      <span style={{fontFamily:"Montserrat", fontWeight:800, fontSize:15, color:"#2d3945"}}>
        {subtitle}
      </span>
    </Box>
  );
};

export default DurationButton;

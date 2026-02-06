import React from "react";
import Radio from '@mui/material/Radio';
import { Box } from "@mui/material";

const RadioButtonComponent = ({ size, color, value, name, checked, selectedValue, handleChange=()=>{}}) => {
   
    return (<Box>
        <Radio
            checked={checked}
            onChange={handleChange}
            value={value}
            name={name}
            size={size}
            color={color}
        />
    </Box>);
}

export default RadioButtonComponent;
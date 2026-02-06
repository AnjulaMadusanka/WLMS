import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};



const VideoDropDownComponent = ({ onchange, defaultValue, list, selectedValue, dropdownLabel, readOnly}) => {
  return (
    <Box sx={{ width: "100%" }} style={{padding:10}}>
      <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 500 }}>{dropdownLabel}</p>
      {/* <FormControl fullWidth >
        <InputLabel  id="demo-simple-select-label">Age</InputLabel> */}
      <Select
        // multiple
        fullWidth={true}
        readOnly={readOnly}
        size="small"
        displayEmpty
        value={selectedValue}
        onChange={onchange}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        // inputProps={{ 'aria-label': 'Without label' }}
        style={{padding:'4px 4px'}}
      >

        {list?.map((value, index) => (
          <MenuItem
            key={index}
            value={value?.link}>
            {value?.title}
          </MenuItem>
        ))}
      </Select>
      {/* </FormControl> */}
    </Box>

  );
}

export default VideoDropDownComponent;
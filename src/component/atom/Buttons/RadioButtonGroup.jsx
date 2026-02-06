import React from "react";
import Radio from '@mui/material/Radio';
import { Grid, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
export default ({ size, color, value, name, checked, selectedValue, handleChange = () => { } }) => {

    return (
        <Grid container>
            <Grid style={{textAlign:'center'}} item xs={6}>
                <Radio
                    checked={checked}
                    onChange={handleChange}
                    value={'Yes'}
                    name={name}
                    size={size}
                    color={color}
                />
                <div><span><DoneIcon sx={{color:"#28B882"}} fontSize="small"/> </span></div>
            </Grid>
            <Grid style={{textAlign:'center'}} item xs={6}>
                <Radio
                    checked={!checked}
                    onChange={handleChange}
                    value={"No"}
                    name={name}
                    size={size}
                    color={color}
                />
               <div> <span><ClearIcon sx={{color:"#D06060"}} fontSize="small"/></span></div>
            </Grid>
        </Grid>)
}



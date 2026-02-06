
import React from "react";
import IconButton from '@mui/material/IconButton';
import { Box,Typography } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";


const CourseContentCard = ({ icon, onclick, size }) => {
    return (
        <Box sx={{
            display:'flex',
            width:1/1.4,
            height:'fit-content',
            flexDirection:'row',
            marginLeft:15,
            marginBottom:2
        }}>
                    <Typography style={{display:'flex',flex:0.4}}>
             Day 2 
            </Typography> 
            <Typography style={{display:'flex',flex:0.4}}>
             30 min
            </Typography> 
            <Typography style={{display:'flex',flex:0.4}}>
             Basic Theory
            </Typography> 
            <TextButtonComponet classStyle={"btn btn-secondary"} text={"view"}/>
          
        </Box>
        
    );
}

export default CourseContentCard;
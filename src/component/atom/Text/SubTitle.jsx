
import React from "react";
import IconButton from '@mui/material/IconButton';
import { Box,SvgIcon,Typography } from "@mui/material";
import StarRatingoComponent from "../Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";


const SubTitle = ({ icon, onclick, size }) => {
    return (
        <Box sx={{            width:1,
            display:'flex',
            flexDirection:'row',
            alignSelf:'center',
            justifyContent:'center'
            }}>
        <Typography style={{ 
            flexGrow: 0,
            fontWeight:600,
            color: '#2d3945',
            margin:3,
        }}>
            Week 2- In progress
        </Typography>
        <SvgIcon>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="100" height="100" rx="50" fill="#28B882"/>
<path d="M80.4343 34.0572L36.9561 77.5354L17.0286 57.6079L22.1373 52.4992L36.9561 67.2818L75.3256 28.9485L80.4343 34.0572Z" fill="white"/>
</svg>

        </SvgIcon>
        </Box>
        
    );
}

export default SubTitle;
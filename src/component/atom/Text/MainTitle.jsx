
import React from "react";
import IconButton from '@mui/material/IconButton';
import { Box,Typography } from "@mui/material";
import StarRatingoComponent from "../Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";


const MainTitle = ({ icon, onclick, size }) => {
    return (
        <Box sx={{
            width:1
        }}>
                     <Box sx={{
            display:'flex',
            flexDirection:'row',
            width:1,
            marginBottom:2,
            justifyContent:'space-between'
        }}>
        <Typography fontSize={22} fontWeight={800}>
        Winspart ADC
</Typography>
    <Box sx={{
        width:'fit-content',
        height:'fit-content',
        padding:2,
        borderRadius:2,
        backgroundColor:"#25A18E",
        boxShadow:2
    }}>
        <Typography color={"white"} fontSize={12} fontWeight={700}>
       1 Hour
</Typography>
    </Box>
        </Box>
            <Typography fontSize={30} fontWeight={800} color={'black'}>
                Introduction
            </Typography>
            <Typography fontSize={18} fontWeight={800} color={'black'}>
              Sample Class one
            </Typography>
             <Box sx={{
                display:'flex',
                alignSelf:'center',
                width:1,
                height:1,
                
             }}>
{/* <SampleVideoCard/> */}
             </Box>
        </Box>
        
    );
}

export default MainTitle;
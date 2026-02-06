import React from "react";
import { Box, Grid } from "@mui/material";
import IconButtonComponent from "../Buttons/IconButton";
import { useNavigate } from "react-router-dom";

const HeadingComponent = ({text, color, size = 30, fontweigth, fontfamily, backNavigation = false}) => {

    const navigate = useNavigate();
return(
    <Grid container alignItems={'center'}>
        {backNavigation ?  <Grid  item><IconButtonComponent btnType={'admin-backbtn'} onclick={()=> navigate(-1)}/></Grid> : null}
        <Grid item><span style={{color:color, fontSize:size, fontFamily:fontfamily, fontWeight:fontweigth, 
            // textAlign:'center', display:'block'
            }}>{text}</span></Grid>
    </Grid>
    
    
    );
}

export default HeadingComponent;
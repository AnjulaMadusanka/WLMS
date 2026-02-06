import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { HeaderStudent } from "../Header";


const StudentScreenContainer = () => {
return(<Box sx={{backgroundColor:'#ffffff'}}>
    <Outlet />
</Box>);
}

export default StudentScreenContainer;
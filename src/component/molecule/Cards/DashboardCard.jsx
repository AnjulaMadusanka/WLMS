import React from "react";
import { Box } from "@mui/material";

const DashboardCard = ({ value, text, icon }) => {
    return (
        <Box className="dashboard-card-container" 
        width={{sm:'auto', md:'auto', lg:'auto'}}
        // width={{sm:350, md:'auto', lg:'auto'}}
        >
            <Box className="dashboard-card-wrap" >
                <Box className="dashboard-card-text">
                    <Box sx={{ textAlign: "center"}}>
                        <h2 className="dashboard-users">{value < 10 ? "0" + value : value}</h2>
                     
                        <h6 className="dashboard-users-text">{text}</h6>
                    </Box>
                    <Box>
                        <img src={icon} alt="userIcon" className="dashboard-card-logo" />
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}

export default DashboardCard;
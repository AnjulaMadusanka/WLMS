import React from "react";
import { Box } from "@mui/system";

const InitialCard = ({ text, img, onclick }) => {
    return (<Box className="initial-card-container" onClick={onclick}>
        <Box className="dashboard-card-wrap">
            <Box className="dashboard-card-text">

                <Box>
                    <img src={img} alt="userIcon" className="dashboard-card-logo" />
                </Box>

                <Box>
                    <p className="inital-screen-text">{text}</p>
                </Box>

            </Box>
        </Box>
    </Box>);
}

export default InitialCard;

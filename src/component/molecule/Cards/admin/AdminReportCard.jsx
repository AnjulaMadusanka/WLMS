import React from "react";
import { Box } from "@mui/material";


const AdminReportCard = ({ value, icon, type }) => {
    return (
        <Box className="admin-report-card-container">

            <Box className="admin-report-card-wrap">
                <Box>
                    <img src={icon} alt="card-icon" className="admin-report-icon" />
                </Box>
                <Box sx={{display:"flex", flexDirection:"column" , alignItems:"center"}}>
                    {type === "studnets" ?
                        <p className="admin-report-card-text">Total Students</p>
                        :
                        <p className="admin-report-card-text">Total Enrollments</p>
                    }
                    <p className="admin-report-card-text-value">{value}</p>
                </Box>

            </Box>
        </Box>
    );
}

export default AdminReportCard;
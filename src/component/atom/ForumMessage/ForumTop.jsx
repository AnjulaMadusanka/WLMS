import React from "react";
import { Box, Grid, List, ListItem, ListItemText, Badge } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash"
import { getSourcePath } from "../../../core/Constant";
import { useNavigate } from "react-router-dom";

export default ({ }) => {
    const selectedForum = useSelector(state => state.forum.get('selectedForum'));
    const navigate = useNavigate();
    const type = localStorage.getItem('userType');
    
    return (
        <Box className="forum-top-wrap">
            <Box sx={{ width: "fit-content" }}>
                <img src={getSourcePath(_.get(selectedForum, 'image', ''))} alt="forum-img" style={{ objectFit: "cover", width: 70, height: 70, borderRadius: 10 }} /></Box>
            <Box sx={{ flexGrow: 1 }}>
                <p className='forum-card-heading' >{_.get(selectedForum, 'name', '')}</p>
                <span style={{color:"#4a6375"}}>{_.get(selectedForum, 'description', '')}</span>
            </Box>
            <Box className="students-btn-wrap" >
                {type == 0 ? (<>
                    <Box sx={{ display: "flex", gap:0.5, alignItems: "center", width: "fit-content", cursor: "pointer" }} onClick={()=> navigate("/admin-view-forum-student", {state:{selected_forum: selectedForum}})}>
                    <PeopleIcon sx={{ color: "#4A6375", fontSize: 25 }} />
                    <p style={{ fontWeight: 700, fontSize: 15, fontFamily: "Montserrat, sans serif", color: "#4A6375",  margin: 0, padding: 0, whiteSpace: '' }}>{_.get(selectedForum, 'forum_replies_count', 0) < 10 ? "0"+_.get(selectedForum, 'forum_replies_count', 0): _.get(selectedForum, 'forum_replies_count', 0) }</p>
                </Box>
                </>):(<>
                    <Box sx={{ display: "flex", gap:0.5, alignItems: "center", width: "fit-content" }}>
                    <PeopleIcon sx={{ color: "#4A6375", fontSize: 25 }} />
                    <p style={{ fontWeight: 700, fontSize: 15, fontFamily: "Montserrat, sans serif", color: "#4A6375",  margin: 0, padding: 0, whiteSpace: '' }}>{_.get(selectedForum, 'forum_replies_count', 0) < 10 ? "0"+_.get(selectedForum, 'forum_replies_count', 0): _.get(selectedForum, 'forum_replies_count', 0) }</p>
                </Box>  
                </>)}
              
            </Box>
        </Box>
    )
}
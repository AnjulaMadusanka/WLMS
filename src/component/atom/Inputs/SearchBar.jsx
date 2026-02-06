import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/material";

const SearchBarComponent = ({ onchange=()=>{}, value=''}) => {
return(<Box>
    <Box className="search-wrap">
        <Box className="search-input"><input type="text" value={value} placeholder="Search" onChange={onchange} /></Box>
        <Box className="search-icon"><SearchIcon  sx={{fontSize:25, color:"#c4c4c4"}}/></Box>
    </Box>
</Box>);
}

export default SearchBarComponent;
import React from "react";
import { Box} from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TextIconButtonComponent = ({ onclick=()=>{}, backgroundColor = '#9834F0', borderColor="#9834F0", textColor="#fff", icon, buttonStyleClass="btn btn-primary", btnText}) => {
    return (<Box>
         <button onClick={onclick} style={{backgroundColor:backgroundColor, borderColor:borderColor, color:textColor}} className={buttonStyleClass}><Box sx={{display:"flex", alignItems:"center"}}></Box><FontAwesomeIcon icon={icon}/> {btnText}</button>
    </Box>);
}

export default TextIconButtonComponent;
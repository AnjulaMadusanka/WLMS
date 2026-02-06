import React from "react";
import { Box } from "@mui/material";

const TextAreaComponent = ({height, onchange, error, placeholder, textlabel,isError, value}) => {
return(<Box  style={{padding:10}}>
    <p style={{padding:0, margin:0, marginBottom:10, color:"#4E657C", fontSize:19, fontWeight:700}}>{textlabel}</p>
    <textarea className="form-control" style={{height:height}}  placeholder={placeholder} onChange={onchange} value={value} />
    {isError ? <p className="input-error-text">{error}</p> : null}
</Box>);
}

export default TextAreaComponent;
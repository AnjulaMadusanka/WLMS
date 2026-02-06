import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const StarRatingoComponent = (props) => {
    return (<Stack spacing={1}>
        <Rating  value={props.selectValue} {...props} />
        {props?.isError ? <p className="input-error-text">{props?.error}</p> : null}
    </Stack>);
}

export default StarRatingoComponent;
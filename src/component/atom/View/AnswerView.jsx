import React from "react";
import RadioButtonComponent from "../Buttons/RadioButton";
import _ from "lodash";
import { Box } from "@mui/material";


export default ({ item, isShowRadio = true }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", height: 50 }}>
            {isShowRadio ? <Box>
                <RadioButtonComponent
                    checked={_.get(item, 'is_correct', 0) == 1}
                />
            </Box> : null}
            <Box>
                <p style={{ fontFamily: "Montserrat, sans serif", fontSize: "100%", padding: 0, margin: 0 }}>{_.get(item, 'answer', '')}</p>
            </Box>
        </Box>
    )
}
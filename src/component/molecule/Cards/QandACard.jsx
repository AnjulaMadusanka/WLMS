import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import {
  IconButtonComponent,
} from "../../atom";
import _ from "lodash";
import { is } from "immutable";

export default ({
  item,
  index,
  onclick = () => {},
  onPressDelete = () => {},
  onPressEdit = () => {},
  isChecked = false, 
  onCheckboxChange = () => {}, 
  checked = false,
  isView = false ,
  isEdit = false ,
  isDelete = false
}) => {
  return (
    <Box className="admin-question-wrap">
      <Box className="admin-question">
        <Box       sx={{
            paddingInlineStart: 2,
          }}>
          <div
           style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight:  "50px",// Adjust width as needed to prevent overflow
            }}
            dangerouslySetInnerHTML={{
              __html: `${index + 1 < 10 ? `0${index + 1}` : index + 1}. ${_.get(
                item,
                "question",
                ""
              )}`,
            }}
          />
        </Box>
      </Box>
      <Box className="admin-question-btn-section">
        <Box className="admin-question-btn">
          {
            isView ?            <IconButtonComponent
            btntitle={"View"}
            btnType={"viewIconbtn"}
            onclick={() => {
              onclick();
            }}
          /> : <></>
          }
          {
            isEdit ?            <IconButtonComponent

            btnType={"editbtn"}
            onclick={() => {
              onPressEdit();
            }}
          /> : <></>
          }
          {
            isDelete ?            <IconButtonComponent
            onclick={onPressDelete}
            btntitle={"Delete"}
            btnType={"deleteIconbtn"}
          /> : <></>
          }
          {
            checked ?            <FormControlLabel
            control={
              <Checkbox
              sx={{marginLeft:5}}
                checked={isChecked}
                onChange={(e) => onCheckboxChange(e.target.checked, item)}
              />
            }
            //label="Enable/Disable"
          /> : <></>
          }
        </Box>
      </Box>
      <Box className="admin-question-checkbox">
       
      </Box>
    </Box>
  );
};

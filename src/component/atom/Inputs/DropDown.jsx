import React, { useEffect } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};




const DropDownComponent = ({ isError = false, error = '', onchange, defaultValue, list, selectedValue='', dropdownLabel='', readOnly, isShowZero = true, isInactive = false, initialValue = "All" , placeholder="",isShowPlaceholder=false,radius,backgroundColor, outerStyle={padding:10}}) => {  
  const showMenuItem = (item,index) =>{
    if(item.course_name && item.course_id){
      return(   <MenuItem
        key={index}
        value={item?.course_id}>
        {item?.course_name}
      </MenuItem>)
    }
    else if (item.currency && item.currency_name){
      return(   <MenuItem
        key={index}
        value={item?.id}>
        {item?.currency}
      </MenuItem>)
    }
    else if (item.promoTypeId && item.promoType){
      return(   <MenuItem
        key={index}
        value={item?.promoTypeId}>
        {item?.promoType}
      </MenuItem>)
    }
    else{
      return(
        <MenuItem
        key={index}
        value={item?.id}>
        {item?.name}
      </MenuItem>
      )
    }

  }
  
  
  return (
    <Box sx={{ width: "100%",borderRadius:'10px' }}  style={outerStyle}>
      {(dropdownLabel!='')&&(
      <p style={{ borderRadius:'10px',padding: 0, margin: 0,marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>{dropdownLabel}</p>
      )}
      <Select
      id="dropDown"
        // multiple
        disabled={isInactive}
        fullWidth={true}
        readOnly={readOnly}
        size="small"
        displayEmpty
        value={selectedValue}
        onChange={onchange}
        input={<OutlinedInput/>}
        MenuProps={MenuProps}
        // inputProps={{ 'aria-label': 'Without label' }}
        style={{padding:'4px 4px',borderRadius:radius,backgroundColor:backgroundColor}}
      >
        {isShowZero ? <MenuItem
          key={0}
          value={0}>
          {initialValue}
        </MenuItem> : null}
        {/* { isShowPlaceholder ? 
      <MenuItem value={""}>{initialValue}</MenuItem> : <></>
        } */}

            {list?.map((value, index) => (
              showMenuItem(value,index)
        ))}

        {/* {list?.map((value, index) => (
          {value.id ? : }
          <MenuItem
            key={index}
            value={value?.id}>
            {value?.name}
          </MenuItem>
        ))} */}
      </Select>
      {/* </FormControl> */}
      {isError ? <p className="input-error-text">{error}</p> : null}
    </Box>

  );
}

export default DropDownComponent;
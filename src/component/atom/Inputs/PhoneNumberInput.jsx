import { Box } from "@mui/material";
import React from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberComponent = (props) => {
  const { label, error, isError } = props;
  return (<Box style={{padding:10}}>
    <p style={{ padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 500 }}>
      {label}
    </p>
    <PhoneInput
      className={'form-control input-phone-number'}
      international
      countrySelectProps={{ unicodeFlags: true }}
      countryCallingCodeEditable={false}
      {...props} />

    {isError ? <p className="input-error-text">{error}</p> : null}
  </Box>)
}
export default PhoneNumberComponent;
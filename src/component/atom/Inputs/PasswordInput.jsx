import React from "react";
import { Box, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordInputComponent = ({
  isError = false,
  error = "",
  placeholder = "",
  type = "password",
  value = "",
  onchange = () => {},
  name = "",
  label = "",
  readOnly = false,
  min = 0,
  visibility = false,
  onClickVisibility = () => {},
}) => {
  return (
    <Box style={{ padding: 10 }}>
      <p
        style={{
          padding: 0,
          margin: 0,
          marginBottom: 10,
          color: "#4E657C",
          fontSize: 19,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <div className="pw-field-wrap">
        <input
          className="pw-input-field"
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={onchange}
          readOnly={readOnly}
          name={name}
          min={min}
        />

        <IconButton aria-label="View" sx={{ m: 1 }} onClick={onClickVisibility}>
          {visibility ? (
            <VisibilityIcon fontSize="small" />
          ) : (
            <VisibilityOffIcon fontSize="small" />
          )}
        </IconButton>
      </div>
      {isError ? <p className="input-error-text">{error}</p> : null}
    </Box>
  );
};

export default PasswordInputComponent;

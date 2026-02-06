import React from "react";
import { Box } from "@mui/material";

const TextInputComponent = ({
  isError = false,
  error = '',
  backgroundColor = '#f2f6f8',
  placeholder = '',
  type = 'text',
  value = '',
  onchange = () => {},
  name = '',
  label = '',
  readOnly = false,
  min = 0,
  borderStyle = "none"
}) => {
  const handleKeyDown = (e) => {
    // Allow control keys: Backspace (8), Delete (46), Arrow keys (37-40), Tab (9), Enter (13)
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Enter'
    ];

    // Prevent non-numeric inputs and scientific notation
    if (type === 'number' && !allowedKeys.includes(e.key) && (isNaN(e.key) || e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-')) {
      e.preventDefault();
    }
  };

  return (
    <Box style={{ padding: 10 }}>
      {label && (
        <p
          style={{
            padding: 0,
            margin: 0,
            marginBottom: 10,
            color: "#4E657C",
            fontSize: 19,
            fontWeight: 700,
          }}
        >
          {label}
        </p>
      )}
      <input
        maxLength="255"
        className="form-control"
        style={{
          backgroundColor: backgroundColor,
          borderStyle: borderStyle,
          borderWidth: 1,
          borderColor: '#bdbebf',
        }}
        value={value}
        type={type === 'number' ? 'number' : type}
        placeholder={placeholder}
        onChange={onchange}
        readOnly={readOnly}
        name={name}
        min={min}
        onKeyDown={handleKeyDown} // Restrict input to numeric and control keys
      />
      {isError ? <p className="input-error-text">{error}</p> : null}
    </Box>
  );
};

export default TextInputComponent;

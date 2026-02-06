import React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Box } from "@mui/material";

const TimePickerComponent = (props) => {
  const { isError = false, error } = props;
  return (
    <Box mt={2} mb={2} ml={1} mr={2}>
      <p
        style={{
          padding: 0,
          margin: 0,
          color: "#4E657C",
          fontSize: 19,
          fontWeight: 500,
        }}
      >
        Time
      </p>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker", "DesktopTimePicker"]}>
          <TimePicker sx={{ width: "100%" }} {...props} />
        </DemoContainer>
      </LocalizationProvider>

      {isError ? <p className="input-error-text">{error}</p> : null}
    </Box>
  );
};

export default TimePickerComponent;

import React, { useRef, useState } from "react";
import TextInputComponent from "../../atom/Inputs/TextInput";
import { IconButtonComponent } from "../../atom";
import { Box } from "@mui/material";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { useDropzone } from "react-dropzone";

const SendMessageForm = ({
  onPress = () => {},
  onchange = () => {},
  isValid = false,
  onSend = () => [],
  value = "",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#fff",
        p: 1,
        pt: 3,
      }}
    >
      <Box
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          rotate: "35deg",
        }}
      >
        <IconButtonComponent onclick={onPress} btnType={"attachFilebtn"} />
      </Box>
      <Box sx={{ flexGrow: 1, height: "fix-content" }}>
        <TextInputComponent
          value={value}
          onchange={onchange}
          placeholder={"Type your message here.."}
        />
      </Box>
      {isValid ? (
        <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
          <TextButtonComponet onButtonClick={onSend} text={"Send"} />
        </Box>
      ) :   <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
      <TextButtonComponet isDisabled={true} onButtonClick={onSend} text={"Send"} />
    </Box>}
    </Box>
  );
};
export default SendMessageForm;
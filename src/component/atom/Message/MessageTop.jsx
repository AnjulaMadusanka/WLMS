import React from "react";
import { Box, Avatar } from "@mui/material";
import { getSourcePath } from "../../../core/Constant";
import IconButtonComponent from "../Buttons/IconButton";

export default ({ user }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar
          alt={`${user?.first_name} ${user?.last_name}`}
          src={getSourcePath(user?.profile_image)}
          sx={{ width: 56, height: 56 }}
        />
        <p
          style={{
            fontWeight: 700,
            fontSize: 20,
            fontFamily: "Montserrat, sans serif",
            color: "#4A6375",
            margin: 0,
            padding: 0,
          }}
        >
          {user?.first_name + " " + user?.last_name}
        </p>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", width: "fit-content" }}>
        <IconButtonComponent btnType={"infobtn"} />
      </Box>
    </Box>
  );
};

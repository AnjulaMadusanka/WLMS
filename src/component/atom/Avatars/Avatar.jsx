import React from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";

const AvatarComponent = ({ image, height, width }) => {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Avatar alt="avatar-logo" src={image}  sx={{ width: width, height: height }} />
            </Stack>
        </Box>
    );
}

export default AvatarComponent;
import React from "react";
import IconButton from "@mui/material/IconButton";
import { Box, Divider, Grid, SvgIcon, Typography } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ForumButton } from "../../atom";

const ForumCard = ({
  heading,
  description,
  user,
  date,
  onViewForum = () => {},
}) => {
  return (
    <>
      <Grid container flexDirection={"column"} p={2} spacing={1.5}>
        <Grid item pr={2.5}>
          <p className="forum-card-heading">{heading}</p>
        </Grid>
        <Grid item pr={2.5}>
          <span className="forum-card-description">{description}</span>
        </Grid>
        <Grid item>
          <Grid container justifyContent={"space-between"} pr={2.5}>
            <Grid item xs={8}>
              <Box sx={{ display: "flex" }}>
                <SvgIcon sx={{ height: 20, width: 20 }}> 
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 99"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50.0001 48.2134C61.3289 48.2134 70.5131 39.2504 70.5131 28.194C70.5131 17.1376 61.3289 8.17456 50.0001 8.17456C38.6712 8.17456 29.4873 17.1376 29.4873 28.194C29.4873 39.2504 38.6712 48.2134 50.0001 48.2134Z"
                      fill="#778FA7"
                    />
                    <path
                      d="M60.6838 56.5552H39.3163C26.9232 56.5552 16.6667 66.5654 16.6667 78.6601C16.6667 81.5797 17.9488 84.0823 20.5129 85.3335C24.359 87.4188 32.9061 89.9206 50.0001 89.9206C67.0942 89.9206 75.6409 87.4188 79.4872 85.3335C81.6238 84.0823 83.3334 81.5797 83.3334 78.6601C83.3334 66.1481 73.0772 56.5552 60.6838 56.5552Z"
                      fill="#778FA7"
                    />
                  </svg>
                </SvgIcon>
                <span className="forum-card-subtext">Created by {user}</span>
              </Box>
            </Grid>
            <Grid item xs={2} sx={{display:"flex", justifyContent:"center",alignItems:'center'}}>
              <span className="forum-card-subtext">{date}</span>
            </Grid>
            <Grid item xs={2}>
              <ForumButton onButtonClick={onViewForum} text={"View"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
    </>
  );
};

export default ForumCard;

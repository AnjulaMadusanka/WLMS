import React, { useState, useEffect } from "react";
import { Grid, Avatar, Box, IconButton } from "@mui/material";
import moment from "moment";
import _ from "lodash";
import { IMAGES } from "../../../assets/Images";
import ContentCopyIcon from "@mui/icons-material/Visibility";

const NotificationCard = ({ item, handleCardClick = () => {}, handleIconClick = () => {} }) => {
  const [read, setRead] = useState(false); // State to track if notification is read

  useEffect(() => {
    console.log(item,'dtaaaaaa')
   // setNotification(item);
    { item.is_read == 1 ?   setRead(true) : setRead(false) }
  }, [item]);

  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      rowGap={1}
      sx={{
        p: 2,
        margin: "auto",
        backgroundColor: read ? "#f2f6f8" : "#e3e7e8", // Change background based on read state
        borderRadius: "20px",
        mb: 2,
        cursor: "pointer",
      }}
      onClick={handleCardClick} // Handle click event on the card
    >
      <Grid item sm={12} md={2} lg={2} xl={2}>
        <Avatar
          alt="Notification"
          src={IMAGES.notification}
          sx={{
            width: { sm: "100%", md: 130, lg: 130, xl: 130, xs: "100%" },
            height: { sm: 180, md: 130, lg: 130, xl: 130, xs: 180 },
            borderRadius: 4,
          }}
        />
      </Grid>

      <Grid item lg={8} xl={8} md={7} sm={12}>
        <Grid container sx={{ flexDirection: "column" }}>
          <Grid item>
            <p className="announcement-text">{_.get(item, "title", "")}</p>
          </Grid>
          <Grid item>
            <Box style={{ textAlign: "justify", textJustify: "inter-word" }}>
              {/* <span className="announcement-subtext">
                {_.get(item, "message", "")}
              </span> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        md={2}
        lg={2}
        xl={2}
        sx={{ textAlign: "right" }}
      >
        <Grid
          container
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item>
            <span className="announcement-subtext-date">
              {moment(new Date(_.get(item, "updated_at", new Date()))).format(
                "Do MMM YYYY"
              )}
            </span>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="VisibilityIcon"
              onClick={() => handleIconClick(item)}
              className="copy-icon"
            >
              <ContentCopyIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotificationCard;


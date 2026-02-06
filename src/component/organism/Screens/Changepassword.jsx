import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ChangePasswordForm } from "../../molecule";
import TextButtonComponet from "../../atom/Buttons/TextButton";

export default ({}) => {
  const cp = useRef();

  const onBtnPress = () => {
    cp.current.onPress();
  };

  const onClose = () => {
    cp.current.onClean();
  };

  return (
    <Grid
      container
      spacing={2}
      className=" profilePageCover"
      mt={5}
      // className="profile-top-space"
    >
      <Grid item md={5} sm={12} xs={12}>
        <div>
          <span className="Change-PasswordText">Change Password</span>
        </div>
        <div className="Change-Password-space">
          <span className="Change-Password-description">
            <span className="Change-Password-subtext">
              The password must be
            </span>

            <ul>
              <li className="Change-Password-subtext ">Minimum of 8 characters</li>
              <li className="Change-Password-subtext ">Minimum of 1 upper case</li>
              <li className="Change-Password-subtext ">Minimum of 1 lower case</li>
              <li className="Change-Password-subtext ">Minimum of 1 number</li>
              <li className="Change-Password-subtext ">Minimum of 1 special character</li>
            </ul>
          </span>
        </div>
      </Grid>
      <Grid item md={7} sm={12} xs={12}>
        <ChangePasswordForm ref={cp} />
        <Grid
          style={{ marginTop: "20px" }}
          container
          className="profileBottom"
          rowSpacing={3}
          columnSpacing={{ xs: 3, sm: 3, md: 3 }}
        >
          <Grid className="profileButtonCoverSpB" item xs={12} sm={6}>
            <TextButtonComponet
              onButtonClick={onClose}
              classStyle={"btn buttonPro profileLightButton"}
              text={"Cancel"}
            />
          </Grid>

          <Grid className="profileButtonCoverSpB" item xs={12} sm={6}>
            <TextButtonComponet
              onButtonClick={onBtnPress}
              classStyle={"profileButton buttonPro"}
              text={"Update"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

import React, { useState, useEffect, useRef } from "react";
import { AdminAnnouncementForm } from "../../../../component/molecule";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import { Box, Grid } from "@mui/material";
import { IMAGES } from "../../../../assets/Images";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextIconButtonComponent } from "../../../../component/atom";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const AdminAnnouncementScreen = ({ resetData, courseList, verifyToken }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box className="main-screen-container">
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <HeadingComponent
              text={"Resources"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item>
            <TextIconButtonComponent
              icon={faBullhorn}
              btnText={"View Resources"}
              onclick={() => navigate("/admin-resources-view")}
            />
          </Grid>
        </Grid>

        <Grid container mt={3} className="announment-content-main-container">
          <Grid md={6} xs={12} className="announment-content-container">
            <AdminAnnouncementForm />
          </Grid>
          <Grid md={6} xs={12} className="announment-content-container">
            <Box className="announcement-img-wrap">
              <img
                src={IMAGES.announcement}
                alt="announcement"
                className="announcement-img"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// export default AdminAnnouncementScreen;
export default connect(
  (state) => ({
    resetData: state.announcement.get("resetData"),
  }),
  {
    verifyToken: Actions.auth.verifyToken,
  }
)(AdminAnnouncementScreen);

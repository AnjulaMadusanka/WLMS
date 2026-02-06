import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import {
  DialogComponent,
  IconButtonComponent,
  SwitchButtonComponet,
} from "../../../../component/atom";
import AdminForumEditForm from "../../../../component/molecule/Forms/forumAdmin/AdminForumEditForm";
import { useNavigate } from "react-router-dom";
import {
  AnnouncementCard,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../../../core/Constant";
import _ from "lodash";
import { AdminAnnouncemntUpdateForm } from "../../../../component/molecule/Forms";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";

const AdminAnnouncementView = ({
  getAllAnnouncementForAdmin,
  adminAnnoucementList,
}) => {
  // const [edit, setEdit] = useState(false);

  const [annoucementList, setAnnoucementList] = useState([]);

  const navigate = useNavigate(false);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    getAllAnnouncementForAdmin();
  }, []);

  useEffect(() => {
    setAnnoucementList(adminAnnoucementList);
  }, [adminAnnoucementList]);

  return (
    <>
      <Box className="main-screen-container">
        <Box>
          <HeadingComponent
            text={"View Resources"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
            backNavigation={true}
          />
        </Box>
        <Box mt={3}>
          {/* <Box m={1}>
            <Grid container>
              <Grid item>
                <TextButtonComponet
                  onButtonClick={() => navigate(-1)}
                  text={"Back"}
                  classStyle="btn btn-secondary"
                />
              </Grid>
            </Grid>
          </Box> */}

          <Box mt={3}>
            {/* <TableComponent columns={columns} data={annoucementList} /> */}
            {annoucementList?.map((item, index) => (
              <Grid
                sx={{
                  p: 2,
                  margin: "auto",
                  backgroundColor: "#f2f6f8",
                  borderRadius: "20px",
                  mb: 2,
                }}
              >
                <Grid container key={`std-announcement_${index}`}>
                  <AnnouncementCard item={item} />
                </Grid>
              </Grid>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    adminAnnoucementList: state.announcement.get("adminAnnoucementList"),
  }),
  {
    getAllAnnouncementForAdmin: Actions.announcement.getAllAnnouncementForAdmin,
    getAnnouncementForAdmin: Actions.announcement.getAnnouncementForAdmin,
  }
)(AdminAnnouncementView);

import React, { useEffect, useRef } from "react";
import SendMessageForm from "../../../../component/molecule/Forms/SendMessageForm";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  ForumMessageComponent,
  SearchBarComponent,
} from "../../../../component/atom";
import PeopleIcon from "@mui/icons-material/People";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ForumMessageCard,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";

const AdminViewForumScreen = ({}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const forumId = location.state?.forumId;
    dispatch(Actions.forum.getForumById(forumId));
  }, [location]);

  return (
    <Box className="main-screen-container">
      <Box>
        <HeadingComponent
          text={"Forum"}
          fontweigth={600}
          // size={40}
          fontfamily={"Montserrat"}
          backNavigation={true}
        />
      </Box>
      <Box className="common-admin-content-wrap">
        {/* <Box className="admin-forum-search-wrap">
          <Box sx={{ width: "50%", minWidth: 180 }}>
            <Grid container spacing={1}>
              <Grid item>
                <TextButtonComponet
                  onButtonClick={() => navigate(-1)}
                  text={"Back"}
                  classStyle="btn btn-secondary"
                />
              </Grid>
            </Grid>
          </Box>
        </Box > */}
        <Box >
        <ForumMessageCard />

        </Box>
      </Box>
    </Box>
  );
};
export default AdminViewForumScreen;

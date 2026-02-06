import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { Box } from "@mui/material";
import {
  ForumMessageComponent,
  IconButtonComponent,
  SearchBarComponent,
} from "../../../component/atom";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import { ForumMessageCard, MainForumCard } from "../../../component/molecule";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";

export default () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const { forumId } = location.state;
    dispatch(Actions.forum.getForumById(forumId));
  }, [location]);

  return (
    <>
      <Box className="main-screen-container">
        <Grid container flexDirection={'column'}  rowSpacing={1.5}>
          <Grid item>
          <IconButtonComponent
            onclick={() => navigate(-1)}
            btnType="backbtn"
            btnText="Back"
          />
          </Grid>
          <Grid xs={7} item>
            <HeadingComponent
              text={"Message"}
              fontweigth={600}
              size={26}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item>
          <ForumMessageCard />
          </Grid>
        </Grid>
        
      </Box>
    </>
  );
};

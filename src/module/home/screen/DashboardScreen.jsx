import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Rating,
  Typography,
  Grid,
  Item,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import {
  DashboardStudentCard,
  ForumCard,
  LiveClassCard,
} from "../../../component/molecule";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import moment from "moment";
import _ from "lodash";
import { IMAGES } from "../../../assets/Images";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core";
import DashboardForumCard from "../../../component/molecule/Cards/DashboardForumCard";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  dot: {
    backgroundColor: "#00FFFFFF",
  },
  dotActive: {
    backgroundColor: "#00FFFFFF",
  },
});

const DashboardScreen = ({
  userDashboardData,
  userDashboard,
  getcourseProgress,
  getLiveWebinar,
  courseprogress,
  verifyToken,
  liveWebinar,
}) => {
  const navigate = useNavigate();
  // const intervalRef = useRef(null);
  const theme = useTheme();
  const [value, setValue] = React.useState(2);
  const [forumData, setForumData] = useState([]);
  const [progress, setProgress] = useState([]);
  const [livewebinar, setLiveWebinar] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [maxsteps, setMaxSteps] = useState(0);
  const classes = useStyles();

  const cropText = (inputText, maxLength) => {
    if (inputText.length > maxLength) {
      return inputText.slice(0, maxLength) + "...";
    } else {
      return inputText;
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    userDashboard({ dashboard: 1 });
    getcourseProgress();
    getLiveWebinar();
  }, [navigate]);

  useEffect(() => {
    // const result = _.map(userDashboardData.forums, ({ forums }) => ({forums }));
    //console.log(result)
    setForumData(userDashboardData);
    setProgress(courseprogress);
    setLiveWebinar(liveWebinar);
    setMaxSteps(progress.length);
    console.log(userDashboardData,'dataaaaaaa')
  }, [forumData, courseprogress, progress, liveWebinar]);

  useEffect(() => { }, [progress]);

  const onViewForum = (item) => {
    // 👇️ navigate to /contacts
    navigate("/forum-message", {
      state: { forumId: _.get(item, "id", ""), forum: item },
    });
  };

  const navigateToCourseDetails = (params) => {
    navigate("/course-details", {
      state: params,
    });
  };

  return (
    <div className="main-screen-container">
      <Grid container flexDirection={"column"} rowGap={4}>
        <Grid item>
          <Grid container flexDirection={"column"}>
            <Grid item>
              <Box>
                <img
                  src={IMAGES.welcomeText}
                  alt="Welcome-text"
                  style={{
                    objectFit: "cover",
                    height: "auto",
                    width: 400,
                    alignSelf: "center",
                  }}
                />
              </Box>
            </Grid>
            <Grid item>
              <HeadingComponent
                fontfamily={"Montserrat"}
                size={16}
                color={"#4e657c"}
                text={
                  "Navigating Excellence: Your Learning Adventure at Winspert"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item md={5} lg={4} sm={1} xs={1} order={{ md: 1, lg: 1, sm: 1, xs: 1 }} sx={{ minWidth: 300 }}>
              <div
                style={{
                  padding: "20px",
                  background:
                    "repeating-linear-gradient(45deg, #bd8aead9, #782abcd9 140px, white 140px, white 80px)",
                  boxShadow: "#7b52d959 0px 0px 5px 0.25rem",
                  borderRadius: "10px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                    borderRadius: "10px"
                  }}
                >
                  <Box sx={{ backgroundColor: "#ffffff", width: "100%", borderRadius: "10px" }}>
                    <LiveClassCard list={livewebinar} />
                  </Box>
                </Box>
              </div>
            </Grid>
            <Grid item lg={4} md={5} sm={1} xs={1} order={{ md: 1, lg: 1, sm: 1 }} sx={{ minWidth: 300 }}>
              <div
                style={{
                  padding: "20px",
                  background:
                    "repeating-linear-gradient(45deg, #bd8aead9, #782abcd9 140px, white 140px, white 80px)",
                  boxShadow: "#7b52d959 0px 0px 5px 0.25rem",
                  borderRadius: "10px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                    borderRadius: "10px"
                  }}
                >
                  <Box sx={{ backgroundColor: "#ffffff", width: "100%", borderRadius: "10px" }}>
                    <DashboardForumCard list={userDashboardData} />
                  </Box>
                </Box>
              </div>
            </Grid>
            <Grid item md={5} lg={4} sm={1} xs={1} order={{ md: 1, lg: 1, sm: 1 }} sx={{ minWidth: 300 }}>
              <div
                style={{
                  padding: "20px",
                  background:
                    "repeating-linear-gradient(45deg, #bd8aead9, #782abcd9 140px, white 140px, white 80px)",
                  boxShadow: "#7b52d959 0px 0px 5px 0.25rem",
                  borderRadius: "10px"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Box sx={{ backgroundColor: "#ffffff", width: "100%", borderRadius: "10px" }}>
                    <DashboardStudentCard
                      onButtonClick={(params) =>
                        navigateToCourseDetails(params)
                      }
                      list={progress}
                    />
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(
  (state) => ({
    userDashboardData: state.home.get("userDashboardData"),
    courseprogress: state.home.get("courseprogress"),
    liveWebinar: state.home.get("liveWebinar"),
  }),
  {
    userDashboard: Actions.home.userDashboard,
    getcourseProgress: Actions.home.getcourseProgress,
    verifyToken: Actions.auth.verifyToken,
    getLiveWebinar: Actions.home.getLiveWebinar,
  }
)(DashboardScreen);

import React from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {
  Box,
  Card,
  Paper,
  MobileStepper,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import HeadingComponent from "../../atom/Headings/Heading";
import { CircularWithValueLabel, CourseButton } from "../../atom";
import _ from "lodash";
import moment from "moment";

// const DashboardStudentCard = ({coursename,coursedate,newprogress,text='0',onButtonClick = () =>{}}) => {
//     return (
//         <Box className="dashboard-student-container">
//            <p className="dashboard-student-heading">{coursename}</p>
//            <p className="dashboard-student-subheading">On {coursedate}</p>
//             <CircularWithValueLabel text={text}  progress={newprogress}/>
//             <CourseButton onButtonClick={onButtonClick}  color={'#28b882'} text={'View Course'}/>
//         </Box>
//     );
// }

const DashboardStudentCard = ({ list = [], onButtonClick = () => {} }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = list?.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems={"center"}
      rowGap={5}
      minHeight={403}
      maxHeight={403}
      p={2}
    >
      <Grid item>
        <h3 style={{ fontWeight: 700,marginTop:10,color:"#9834F0"}}>In Progress</h3>
      </Grid>

      <Grid item sx={{ width: "100%" }}>
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          style={{
            // marginTop: 1,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {list.map((item, index) => {
            return (
              <Grid
                container
                flexDirection={"column"}
                alignItems={"center"}
                rowGap={1}
              >
                <Grid item>
                  <p
                    style={{ textAlign: "center" }}
                    className="dashboard-student-heading"
                  >
                    {_.get(item, "course_name", "")}
                  </p>
                </Grid>
                <Grid item>
                  <span
                    style={{ textAlign: "center" }}
                    className="dashboard-student-subtext"
                  >
                    On{" "}
                    {moment(
                      _.get(item, "registeredDate", ""),
                      "YYYY-MM-DD"
                    ).format("Do MMM YYYY")}
                  </span>
                </Grid>
                <Grid item>
                  <CircularWithValueLabel
                    text={_.get(item, "progress", 0) + "%"}
                    progress={_.get(item, "progress", 0)}
                  />
                </Grid>
                <Grid item sx={{ width: "100%" }}>
                  <CourseButton
                    onButtonClick={() => {
                      onButtonClick({
                        course_id: _.get(item, "course_id", ""),
                        is_registered: 1,
                        course: item,
                      });
                    }}
                    color={"#9834F0"}
                    text={"View Course"}
                  />
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#ffffff !important",
                            color: "#28b882 !important",
                            boxShadow: "10px !important",
                          },
                        }}
                      >
                        {/* Next */}
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        sx={{
                          "&:hover": {
                            backgroundColor: "#ffffff !important",
                            color: "#28b882 !important",
                            boxShadow: "10px !important",
                          },
                        }}
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        {/* Back */}
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
            );
          })}
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};

export default DashboardStudentCard;

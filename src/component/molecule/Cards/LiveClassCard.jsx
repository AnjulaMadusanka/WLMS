import React, { useState } from "react";
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
  SvgIcon,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Stack
} from "@mui/material";
import HeadingComponent from "../../atom/Headings/Heading";
import { CircularWithValueLabel, CourseButton } from "../../atom";
import _ from "lodash";
import moment from "moment";
import { IMAGES } from "../../../assets/Images";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';


const LiveClassCard = ({ list = [], onButtonClick = () => { } }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = list?.length;
  const navigate = useNavigate();
  const [copyStatus, setCopyStatus] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [url, setURL] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onCopyText = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
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

  const onViewWebinar = (item) => {
    // handleClickOpen();
    try {
      window.webkit.messageHandlers.openURL.postMessage(item);
    } catch {
      window.open(item);
    }
    setURL(item)
    // navigate("/LiveClassScreen", {
    //   state: { url: item },
    // });
    // commented
    // window.open(item);
    // LiveClassScreen
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems={"center"}
      rowGap={5}
      p={2}
      minHeight={403}
      maxHeight={403}
    >
      <Grid item>
        <h3 style={{ fontWeight: 700, marginTop: 10, color: "#9834F0" }}>Live Webinar</h3>
      </Grid>
      {list?.length == 0 ? (
        <Grid item>
          <img
            src={IMAGES.noVideo}
            alt="video"
            style={{
              objectFit: "cover",
              width: 210,
              //   alignSelf: "center",
              //   height: "100%",

              "&:hover": {
                color: "#fff",
                backgroundColor: "#D96E6E !important",
              },
            }}
          />
        </Grid>
      ) : (
        <Grid item sx={{ width: '100%' }}>
          <SwipeableViews
            axis={"x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            style={{
              //   marginTop: 1,
              backgroundColor: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {list.map((item, index) => {
              console.log("poppopop", item)
              const date = _.get(item, "date", null);
              return (
                <Grid
                  container
                  flexDirection={"column"}
                  alignItems={"center"}
                  // rowGap={2}
                >
                  <Grid xs={12} item>
                    <p
                      style={{ textAlign: "center" }}
                      className="dashboard-student-heading"
                    >
                      {_.get(item, "course_name", "")}
                    </p>
                  </Grid>
                  <Grid xs={12} item>
                    <p className="dashboard-student-subtext">
                      Date:   {_.isNull(date)?'': moment(date).format('DD/MM/YYYY') }
                    </p>
                  </Grid>
                  <Grid xs={12} item>
                    <p className="dashboard-student-subtext">
                      {_.get(item, "duration", "")} minutes
                    </p>
                  </Grid>
                  <Grid  xs={12} items>
                    <LiveIcon />
                  </Grid>
                  <Grid item sx={{ width: '100%' }}>
                    <CourseButton
                      onButtonClick={() => {
                        onViewWebinar(item.join_url);
                      }}
                      color={"#9834F0"}
                      text={"View Class"}
                    />
                  </Grid>

                  <Grid item sx={{ width: '100%' }}>
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
                // <>
                //      <Box  sx={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingY:1}}>
                //      <LiveIcon/>
                //      </Box>
                //     <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                //     <p style={{ textAlign: 'center' }} className="dashboard-student-heading">{_.get(item.course, 'name', '')}</p>
                //     <span  className="dashboard-student-subtext">{_.get(item, 'duration', '')} minutes</span>
                //     </Box>
                //     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
                //         <CourseButton
                //             onButtonClick={() => {
                //                 onViewWebinar(item.join_url)
                //             }} color={'#9834F0'} text={'View Class'} />
                //     </div>
                // </>
              );
            })}
          </SwipeableViews>
        </Grid>
      )}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Live class Link"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Copy below live class link to login your live class session
          </DialogContentText>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert
              severity="success"
              action={
                <CopyToClipboard text={url} onCopy={onCopyText}>
                  {copyStatus ? <p>COPIED</p> : <Button color="inherit" size="small">
                    COPY
                  </Button>}
                </CopyToClipboard>
              }
            >
              {url}
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog> */}
    </Grid>
    //     <Box className="dashboard-live-container" p={1}>
    //         <div style={{textAlign:"center"}}><span style={{color:"#2D3945", fontSize:"19px",fontWeight:"900"}}>Live Webinar</span></div>

    //     {
    //         list.length == 0 ? <>
    //                     <Box sx={{width:'280px',alignItems:'center',height:'280px',marginTop:1,alignSelf:'center'}}>
    //                    <img
    //         src={IMAGES.noVideo}
    //         alt="video"
    //         style={{
    //           objectFit: 'contain',
    //           width: '100%',
    //           alignSelf:'center',
    //           height: "100%",

    //           "&:hover": {
    //             color: "#fff",
    //             backgroundColor: "#D96E6E !important",
    //           },
    //         }}
    //       />
    //                    </Box>
    //         </> : <>
    //         <SwipeableViews
    //         axis={'x'}
    //         index={activeStep}
    //         onChangeIndex={handleStepChange}
    //         enableMouseEvents
    //         style={{marginTop: 1, backgroundColor: '#ffffff',alignItems:'center',justifyContent:'center' }}
    //     >

    //         {list.map((item, index) => {
    //             return (
    //                 <>
    //                      <Box  sx={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingY:1}}>
    //                      <LiveIcon/>
    //                      </Box>
    //                     <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
    //                     <p style={{ textAlign: 'center' }} className="dashboard-student-heading">{_.get(item.course, 'name', '')}</p>
    //                     <span  className="dashboard-student-subtext">{_.get(item, 'duration', '')} minutes</span>
    //                     </Box>
    //                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0 }}>
    //                         <CourseButton
    //                             onButtonClick={() => {
    //                                 onViewWebinar(item.join_url)
    //                             }} color={'#9834F0'} text={'View Class'} />
    //                     </div>
    //                 </>
    //             )
    //         })

    //         }
    //     </SwipeableViews>
    //     <MobileStepper
    //         steps={maxSteps}
    //         position="static"
    //         activeStep={activeStep}
    //         nextButton={
    //             <Button
    //                 size="small"
    //                 onClick={handleNext}
    //                 disabled={activeStep === maxSteps - 1}
    //                 sx={{    "&:hover": {backgroundColor:"#ffffff !important", color: "#28b882 !important" ,boxShadow:"10px !important"},}}
    //             >
    //                 {/* Next */}
    //                 {theme.direction === 'rtl' ? (
    //                     <KeyboardArrowLeft />
    //                 ) : (
    //                     <KeyboardArrowRight />
    //                 )}
    //             </Button>
    //         }
    //         backButton={
    //             <Button sx={{    "&:hover": {backgroundColor:"#ffffff !important", color: "#28b882 !important",boxShadow:"10px !important" },}} size="small" onClick={handleBack} disabled={activeStep === 0}>
    //                 {theme.direction === 'rtl' ? (
    //                     <KeyboardArrowRight />
    //                 ) : (
    //                     <KeyboardArrowLeft />
    //                 )}
    //                 {/* Back */}
    //             </Button>
    //         }
    //     />
    //         </>
    //     }

    // </Box>
  );
};

export default LiveClassCard;

const LiveIcon = () => {
  return (
    <SvgIcon sx={{ width: "70px", maxwidth: "150px", height: "100%" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 72 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="72" height="31" rx="15.5" fill="#E2535D" />
        <path
          d="M20.245 21V10.5H22.675V19.02H27.94V21H20.245ZM29.2977 21V10.5H31.7277V21H29.2977ZM41.841 10.5H44.256L39.711 21H37.311L32.781 10.5H35.406L38.601 18L41.841 10.5ZM47.5477 19.05H53.2627V21H45.1327V10.5H53.0677V12.45H47.5477V14.73H52.4227V16.62H47.5477V19.05Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};

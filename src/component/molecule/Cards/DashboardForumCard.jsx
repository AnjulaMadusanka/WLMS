import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Card,
  Paper,
  Grid,
  MobileStepper,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ForumButton } from "../../atom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import _ from "lodash";
import moment from "moment";
import { CircularWithValueLabel, CourseButton } from "../../atom";

const DashboardForumCard = ({
  heading,
  description,
  user,
  list = [],
  onButtonClick = () => { },
  date,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = list?.length;
  const [forums, setForums] = useState([])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const onViewForum = (item) => {
    // 👇️ navigate to /contacts
    console.log(item, 'item navigate')
    navigate("/forum-message", {
      state: { forumId: _.get(item, "id", ""), forum: item },
    });
  };

  useEffect(() => {
    // setForums(list.forums)
    //  console.log(list.forums)
  }, []);
  return (
//     <>
//       <Grid
//         container
//         flexDirection={"column"}
//         alignItems={"center"}
//         rowGap={5}
//         minHeight={403}
//         maxHeight={403}
//         p={2}
//       >
//         <Grid item>
//           <h3 style={{ fontWeight: 700, marginTop: 10, color: "#9834F0" }}>New Threads</h3>
//         </Grid>

//         <Grid item sx={{ width: "100%" }}>
//           <SwipeableViews
//             axis={"x"}
//             index={activeStep}
//             onChangeIndex={handleStepChange}
//             enableMouseEvents
//             style={{
//               // marginTop: 1,
//               backgroundColor: "#ffffff",
//               alignItems: "center",
//               display: 'flex',
//               justifyContent: "center",
//             }}
//           >
//             {list.map((item, index) => {
//               return (
//                 <Grid
//                   item
//                   display={'flex'}
//                   flexDirection={"column"}
//                   alignItems={"center"}
//                   justifyContent={'space-between'}
//                   // bgcolor={'red'}
//                   width={'100%'}
//                   maxHeight={290}
//                   minHeight={290}
//                 //   rowGap={1}
//                 >
//                   <Grid item flexDirection={"column"}
//                     alignItems={"center"}>

//                     <p
//                       style={{ textAlign: "center" }}
//                       className="dashboard-student-heading"
//                     >
//                       {_.get(item, "name", "")}
//                     </p>
//                   </Grid>
// {/* 
//                   <Grid item sx={{ width: "100%",height:250,overflow:'hidden'}}>
//                   {item?.forums.map((val, index) => {
//                       return (
//                           <div style={{display:'flex',flexDirection:'column',justifyContent:'center',cursor: "pointer",paddingInline:30}}   onClick={() => onViewForum(val)}>
//                             <p className="forum-card-heading-x">{val.name}</p>
//                             <span className="forum-card-description-x">{val.description}</span>
    
//                           <Divider variant="middle" />
//                           </div>
//                       )
//                     })
//                     }
//                 </Grid> */}


//                   <Grid item sx={{ width: "100%" }}>
//                     <MobileStepper
//                       steps={maxSteps}
//                       position="static"
//                       activeStep={activeStep}
//                       nextButton={
//                         <Button
//                           size="small"
//                           onClick={handleNext}
//                           disabled={activeStep === maxSteps - 1}
//                           sx={{
//                             "&:hover": {
//                               backgroundColor: "#ffffff !important",
//                               color: "#28b882 !important",
//                               boxShadow: "10px !important",
//                             },
//                           }}
//                         >
//                           {/* Next */}
//                           {theme.direction === "rtl" ? (
//                             <KeyboardArrowLeft />
//                           ) : (
//                             <KeyboardArrowRight />
//                           )}
//                         </Button>
//                       }
//                       backButton={
//                         <Button
//                           sx={{
//                             "&:hover": {
//                               backgroundColor: "#ffffff !important",
//                               color: "#28b882 !important",
//                               boxShadow: "10px !important",
//                             },
//                           }}
//                           size="small"
//                           onClick={handleBack}
//                           disabled={activeStep === 0}
//                         >
//                           {theme.direction === "rtl" ? (
//                             <KeyboardArrowRight />
//                           ) : (
//                             <KeyboardArrowLeft />
//                           )}
//                           {/* Back */}
//                         </Button>
//                       }
//                     />
//                   </Grid>
//                 </Grid>
//               );
//             })}
//           </SwipeableViews>
//         </Grid>
//       </Grid>
//     </>
<Grid
container
flexDirection={"column"}
alignItems={"center"}
minHeight={403}
maxHeight={403}
flexWrap={'nowrap'}
justifyContent={'center'}
p={2}
>
<Grid item>
  <h3 style={{ fontWeight: 700,marginTop:15,color:"#9834F0"}}>New Threads</h3>
</Grid>

<Grid item sx={{ width: "100%",display:'flex',flexDirection:'column'}}>
{list.length === 0 ? (
      <Grid item maxHeight={330} minHeight={330} >
       <p
              style={{ textAlign: "center" ,marginTop:40}}
              className="dashboard-student-heading"
            >
              No Threads Available
            </p>
      </Grid>
    ) : (
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
         // rowGap={1}
        >
          <Grid item marginTop={4}>
            <p
              style={{ textAlign: "center" }}
              className="dashboard-student-heading"
            >
              {_.get(item, "name", "")}
            </p>
          </Grid>
          <Grid item maxHeight={200} minHeight={200} overflow={'hidden'}>
          {item?.forums.map((val, index) => {
                      return (
                          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',cursor: "pointer",paddingInline:30,marginBottom:2}}   onClick={() => onViewForum(val)}>
                             <p className="forum-card-heading-x">{val.name}</p>
                             <span className="forum-card-description-x">{val.description}</span>
    
                           <Divider variant="middle" />
                           </div>
                      )
                     })
                   }
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
    )
  }
</Grid>
</Grid>
  );
};

export default DashboardForumCard;

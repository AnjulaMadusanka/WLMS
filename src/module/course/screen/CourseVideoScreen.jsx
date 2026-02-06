import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box, Rating, Typography } from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import { useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import { CircularWithValueLabel, VideoPlayerComponent } from "../../../component/atom";
import { CourseViewCard } from "../../../component/molecule";
import { useLocation } from 'react-router-dom';
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { IconButtonComponent } from "../../../component/atom";
import { onToast } from "../../../core/Constant";
import ReactPlayer from 'react-player'
// import Amplify, { API, Storage } from "aws-amplify";

const CourseVideoScreen = ({ videoStatus, setVideoCompleted, verifyToken,verifyData, coursecatalog, getSignedUrl, signedUrl, setVideosInCompleted }) => {

  const navigate = useNavigate();
  const [value, setValue] = React.useState(2);
  // const [newcourse, setCourse] = useState()
  const [newcourseList, setNewCourseList] = useState()
  const [newlink, setLink] = useState();
  const [newwebinar, setWebinar] = useState(false)
  const [newcoursecatalog, setCourseCatalog] = useState([],)
  const location = useLocation();
  const [token, setToken] = useState(null)
  const [screenshotDetected, setScreenshotDetected] = useState(false);
  const [url, setUrl] = useState();
 const [course, setCourse] = useState({})
  let link = location.state?.course?.content_link;
  let webinar = true //location.state?.webinar;
  let path = location.state?.course?.aws_file_name;
  let courselist = location.state?.courselist;
  const [isComplete, setIsComplete]=useState(0);

  useEffect(()=>{
    let course = location.state?.course;
    setIsComplete(course?.isCompleted)
 console.log(course,"kjkjkjk",course?.isCompleted)
    setCourse(course);
  },[location])

  useEffect(() => {
    setCourseCatalog(coursecatalog)
  }, [])

  const videoMarkCompleted = () => {
    if (!isComplete) {
      setVideoCompleted({ course_content_ids: [course.id], courseId: course?.id });
      // navigate(-2)
      setCourse({...course, isCompleted:1});
      setIsComplete(1)

    } else {
      setVideosInCompleted({ list: [course.id], courseId: course?.id });
      setIsComplete(0)
    }

  };

  // useEffect(() => {
  //   getSignedUrl(course?.id)
  //   setUrl(signedUrl)
  //   console.log(link, " signedUrl  ", signedUrl)
  // }, [signedUrl])



  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token)
    document.addEventListener('contextmenu', event => event.preventDefault());
    // const handleScreenshotAttempt = () => {
    //   setScreenshotDetected(true);
    //   onToast('Taking screenshots is not allowed on this screen');
    //   navigate(-1)
    // };
    window.addEventListener("visibilitychange", function (event) {
      event.stopImmediatePropagation();
    }, true);
    // document.addEventListener('keyup', handleScreenshotAttempt);


    // return () => {
    //   document.removeEventListener('keyup', handleScreenshotAttempt);
    // };
  }, [])

  return (< >
    {screenshotDetected && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          pointerEvents: 'none',
        }}
      ></div>
    )}

    <Box className="main-screen-container">
      <Box
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{
          width: 1
        }}>
          <Box>
            <IconButtonComponent onclick={() => navigate(-1)} btnType="backbtn" btnText="Back" />
          </Box>
          {
            newwebinar ? <></> :
              <>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: 1,
                  justifyContent: 'space-between',
                }}>
                  <Typography fontFamily={'Montserrat'} fontSize={22} fontWeight={800}>
                    {newcoursecatalog.data?.name}
                  </Typography>

                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: 2 }}>
                      <Typography fontFamily={'Montserrat'} fontSize={20} fontWeight={800} color={'black'}>
                        {course?.content}
                      </Typography>
                      <Typography fontFamily={'Montserrat'} fontSize={18} fontWeight={600} color={'#9eafbe'}>
                        {course?.week}- Day 0{course?.day}
                      </Typography>
                    </Box>
                    <CircularWithValueLabel text={course?.duration} progress={100} />
                  </Box>
                  <Box>
                    {token && token.length && !newwebinar  ? <Box sx={{ width: 200 }}>
                      <TextButtonComponet onButtonClick={videoMarkCompleted} text={isComplete ? "Mark as incomplete" : 'Mark as complete'} />
                    </Box> : null}
                    {/* <p>Description</p>
        <p></p> */}

                    {/* {courselist?.map((item, index) => {
          return (
            <>
              <CourseViewCard  contentType={item?.content_type} day={item?.day} content={item?.content} />
            </>
          )
        })} */}
                  </Box>
                </Box>
              </>

          }
          <Box sx={{
            display: 'flex',
            alignSelf: 'center',
            width: 1,
            height: 1,
            marginTop: 2,

          }}>

            <VideoPlayerComponent
              path={path}
              videoUrl={url}
            />
            {/* <SampleVideoCard/> */}
          </Box>

        </Box>
      </Box>
    </Box>
  </>);
}

export default connect(
  state => ({
    coursecatalog: state.course.get('coursecatalog'),
    signedUrl: state.course.get('signedUrl'),
    verifyData:state.auth.get('verifyData')

  }),
  {
    setVideoCompleted: Actions.course.setVideoCompleted,
    verifyToken: Actions.auth.verifyToken,
    getSignedUrl: Actions.course.getSignedUrl,
    setVideosInCompleted: Actions.course.setVideosInCompleted
  }
)(CourseVideoScreen); 

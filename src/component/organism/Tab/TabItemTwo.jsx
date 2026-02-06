import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { CourseListCard, SignUpForm } from "../../molecule";
import _ from "lodash";
import CourseTabContainer from "./CourseTabContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { Actions } from "../../../core/modules/Actions";
import { DialogComponent } from "../../atom";


const TabItemTwo = ({ itemtwoData, onNavigatetoPreview }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [courseID, setCourseId] = useState('');
  const [courseData, setCourseData] = useState({});
  // const [newcourse, setNewCourse] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);
  const [cList, setCList] = useState([]);
  const [signup, setSignUp] = useState(false);

  const [isShow, setIsShow] = useState(0);
  const show = useSelector(state => state.common.get('show'));

  useEffect(() => {
      setIsShow(show == 1);
  }, [show]);

  const [selectedCourse, setSelectedCourse] = useState({})
  const dispatch = useDispatch();

  const initCourse = useSelector((state) => state.guest.get('initCourse'));
  const topBannerCourses = useSelector((state) => state.guest.get('topBannerCourses'))

  useEffect(() => {
    let list = [...topBannerCourses, ...initCourse];
    setCList(list);
    const id = location?.state?.course_id;
    const obj = _.find(list, item => item.id == id)
    setSelectedCourse(obj)
  }, [topBannerCourses, initCourse]);

  useEffect(() => {
    const courseDetails = location?.state;
    setIsRegistered(courseDetails?.is_registered);
    setCourseData(courseDetails?.course);
    setCourseId(courseDetails?.course_id)
    console.log(isRegistered);
  }, [location]);
  let list = [];

  useEffect(() => {
    const courseList = _.get(itemtwoData, "courses[0].course_contents", []);
    list = _.groupBy(courseList, "week");
    const array = _.values(courseList);
    setData(array);
  }, [itemtwoData]);

  const onEnroll = () => {
    const isFree = courseData?.is_free;
    if (isFree || !isShow) {
      onRegister({ course_id: courseID, is_free: isFree || !isShow })
    } else {
      setSignUp(true)
    }
  };

  const onRegister = (params) => {
    dispatch(Actions.course.registerNewCourseByUser(params))
  }

  return (
    <Box>
      {isRegistered ? <Typography
        style={{ display: "flex", flexDirection: "column" }}
        color={"#2d3945"}
        fontSize={20}
        fontWeight={800}
      >
        Course Content
      </Typography> : null}

      {isRegistered ? <CourseListCard courseData={data} isRegistered={isRegistered} /> :
        <CourseTabContainer courseData={selectedCourse} />}

      {!isRegistered ? <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
        <Grid >
          <TextButtonComponet
            text={"Enroll now"}
            classStyle={"btn btn-enroll"}
            onButtonClick={onEnroll}
          />
        </Grid>

      </Grid> : null}
      <DialogComponent
        isShowCloseButton={false}
        border={30}
        open={signup}
        backgroundColor="#fff"
        onClose={() => setSignUp(false)}
      >
        <SignUpForm isRegistered={true} stepIndex={1} item={selectedCourse} onClose={() => setSignUp(false)} />
      </DialogComponent>
    </Box>
  );
};

export default TabItemTwo;

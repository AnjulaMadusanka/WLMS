import React, { useEffect, useState, useRef } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  AdminCircularWithValueLabel,
  CircularWithValueLabel,
  IconButtonComponent,
  SearchBarComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../../component/atom";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminCourseCard,
  AdminCourseContent,
  AdminCourseForm,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import AdminCourseFormView from "../../../../component/molecule/Forms/courseAdmin/AdminCourseView";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import _ from 'lodash'
import { getText } from "../../../../core/Constant";
import { AdminGraphView } from "../../../../component/molecule/Forms";
import moment from "moment";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { LineChart } from "@mui/x-charts";
import AdminLineChart from "../../../../component/molecule/Forms/quizAdmin/AdminLineChart";

const AdminCourseStudentProgressScreen = ({
  courseList,
  getCourseList,
  updateCourseStatus,
  deleteCourse,
  getStudentProgress,
  studentProgress,
  getStudentAttemptDetails,
  attemptData,
  getQuizeList,
  quizList,
  getAdminCourseDetails,
  studentCourseData

}) => {
  const navigate = useNavigate();
  const [addCourse, setAddCourse] = useState(false);
  const [viewCourse, setViewCourse] = useState(false);
  const [deleteCoursePopup, setDeleteCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [currentSelectedID, setCurrentSelectedID] = useState(0);
  const [deleteCourseID, setDeleteCourseID] = useState(0);
  const [studentId, setStudentID] = useState()
  const [studentData, setStudentData] = useState()
  const [progressData, setProgressData] = useState()
  const location = useLocation();
  const [course, setCourse] = useState()
  const [quiz, setQuiz] = useState();
  const [quizData, SetQuizData] = useState({});
  const [attempts, setAttempts] = useState([])
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [series, setSeries] = useState([]);



  useEffect(() => {
    setStudentID(location.state?.studentId)
    setStudentData(location.state?.student)
  }, [location]);

  useEffect(() => {
    getStudentProgress({ user_id: location.state?.studentId })
    getStudentAttemptDetails({ user_id: location.state?.studentId })
  }, [location]);

  useEffect(() => {
    setAttempts(attemptData)
  }, [attemptData])

  useEffect(() => {
    getCourseList();
    getQuizeList()
  }, []);



  let list = [];

  useEffect(() => {
    const courseList = _.get(studentCourseData, "courses[0].course_contents", []);
    list = _.groupBy(courseList, "week");
    const array = _.values(courseList);
    setData(array);
    console.log(array, 'dataaaaaaa array')
  }, [studentCourseData]);



  useEffect(() => {
    if (studentProgress.length > 0) {
      const selectedCourseId = studentProgress[0]?.course_id;
      const filteredProgress = studentProgress.filter(item => item.course_id === selectedCourseId);
      setProgressData(filteredProgress[0]?.progress);
      setCourse(studentProgress[0]?.course_id);
      getAdminCourseDetails({ stdId: location.state?.studentId, courseId: selectedCourseId });

      const list = _.map(studentProgress, item => ({
        id: item?.course_id,
        course_id: item?.course_id,
        name: item?.course_name,
      }));

      setCourses(list);

      if (Array.isArray(attemptData)) {
        const organizedQuizzes = attemptData.reduce((acc, item) => {
          if (item.course_id === selectedCourseId) {
            const quizId = item.quiz_id;
            if (!acc[quizId]) {
              acc[quizId] = [];
            }
            acc[quizId].push({
              ...item,
              marks: item.marks !== undefined && item.marks !== null ? item.marks : 0,  // Ensure marks are handled
            });
          }
          return acc;
        }, {});

        SetQuizData(organizedQuizzes);
        console.log(organizedQuizzes, 'quizesssssss')

      }
    }
  }, [studentProgress, attemptData]);

  useEffect(() => {
    if (Array.isArray(attemptData)) {
      const categories = new Set();
      const xAxisLabels = [];
      const chartData = [];
  
      attemptData.forEach((attempt, index) => {
        const attemptLabel = `Attempt ${index + 1}`;
        xAxisLabels.push(attemptLabel);
  
        attempt?.category_results?.forEach((category) => {
          categories.add(category?.category_name);
  
          // Find or create series for the category
          let seriesItem = chartData.find((s) => s.name === category?.category_name);
          if (!seriesItem) {
            seriesItem = { name: category.category_name, data: Array(index).fill(null) }; // Fill gaps with `null`
            chartData.push(seriesItem);
          }
  
          // Add marks to the category's series
          seriesItem.data[index] = parseFloat(category?.marks);
        });
      });
  
      // Ensure all series have the same length as xAxisLabels
      chartData.forEach((seriesItem) => {
        while (seriesItem.data.length < xAxisLabels.length) {
          seriesItem.data.push(null); // Fill missing points
        }
      });
  
      setSeries(chartData);
      setXLabels(xAxisLabels);
      console.log("Chart Data:", chartData);
      console.log("X-Axis Labels:", xAxisLabels);
    }
  }, [attemptData]);
  




  const deletebtnPress = () => {
    deleteCourse(deleteCourseID);
    setDeleteCourse(false);
  };

  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    setCourse(Selectedvalue);
    const filteredProgress = studentProgress.filter(item => item.course_id === Selectedvalue);
    setProgressData(filteredProgress[0]?.progress)
    getAdminCourseDetails({ stdId: location.state?.studentId, courseId: Selectedvalue })
    if (Array.isArray(attemptData)) {
      const organizedQuizzes = attemptData.reduce((acc, item) => {
        if (item.course_id === Selectedvalue) {
          const quizId = item.quiz_id;
          if (!acc[quizId]) {
            acc[quizId] = [];
          }
          acc[quizId].push({
            ...item,
            marks: item.marks !== undefined && item.marks !== null ? item.marks : 0,  // Ensure marks are handled
          });
        }
        return acc;
      }, {});
      SetQuizData(organizedQuizzes);
    }
  };


  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between" alignItems={'center'}>
          <Grid item>
            <HeadingComponent
              text={studentData?.first_name + ' ' + studentData?.last_name + "  Progress"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item justifyContent={'flex-end'} alignItems={'center'} display={'flex'} flexDirection={'row'} sx={{ flex: 0.5 }}>
            <Box sx={{ flex: 0.5 }}>
              <DropDownComponent
                isShowPlaceholder={true}
                isShowZero={courses.length > 0 ? false : true}
                initialValue="Select Course"
                onchange={onCourseChange}
                radius={"15px"}
                list={courses}
                selectedValue={course}
              />
            </Box>



          </Grid>
        </Grid>
        <Grid container direction="row" alignItems={'center'}>
          <Grid item mr={5}>
            <div>
              <span className="Profile-PictureText">Overall Course Progress</span>
            </div>
          </Grid>
          <Grid item >
            <AdminCircularWithValueLabel
              text={String(progressData) + "%"}
              progress={progressData}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent={'space-between'} gap={2}>
          <Grid item xs={12} md={6}>
            <div>
              <span className="progress-text">Course Content Progress</span>
            </div>
            {
              data.length > 0 ? <AdminCourseCard courseData={data} /> : <div>
                Course Content Not Found!
              </div>
            }

          </Grid>
          <Grid item xs={10} md={5} >
            <div>
              <span className="progress-text">Quiz Progress</span>
            </div>
            <Box>
              {
                _.isEmpty(quizData)
                  ? <div>
                    Quiz Progress Not Found!
                  </div> : <>
                    {Object.keys(quizData)?.map((quizId) => (
                      <Grid item xs={12} gap={2} mb={1} key={quizId}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls={`panel-${quizId}-content`}
                            id={`panel-${quizId}-header`}
                          >
                            <Typography variant="h6">{`Quiz ${quizData[quizId]?.[0].name}`}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <AdminGraphView graphData={quizData[quizId]} />
                          <AdminLineChart graphData={quizData[quizId]} />
                            <Box>
                  </Box>

                            {quizData[quizId].map((quizItem) => (
                              <Box key={quizItem.id}>
                                <Typography sx={{ fontSize: 18, fontWeight: '800' }}>{`Attempt ${quizItem.attempts}`}</Typography>
                                <Typography>{`Date: ${moment(quizItem.created_at).format('MMMM Do YYYY, h:mm:ss a')}`}</Typography>
                              </Box>
                            ))}
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    ))}

                  </>
              }
            </Box>
          </Grid>
        </Grid>


      </Box>

    </>
  );
};

export default connect(
  (state) => ({
    courseList: state.course.get("allStatusCourseList"),
    studentProgress: state.students.get("studentProgress"),
    attemptData: state.students.get("attemptData"),
    quizList: state.quizes.get("quizList"),
    studentCourseData: state.students.get("studentCourseData")
  }),
  {
    getCourseList: Actions.course.getAllStateCourseList,
    updateCourseStatus: Actions.course.updateCourseStatus,
    deleteCourse: Actions.course.deleteCourse,
    getStudentProgress: Actions.students.getStudentProgress,
    getStudentAttemptDetails: Actions.students.getStudentAttemptDetails,
    getQuizeList: Actions.quizes.getQuizeList,
    getAdminCourseDetails: Actions.students.getAdminCourseDetails,
  }
)(AdminCourseStudentProgressScreen);

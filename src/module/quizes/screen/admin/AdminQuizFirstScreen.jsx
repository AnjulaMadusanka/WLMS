import React, { useEffect, useState, useRef } from "react";
import { Box, Chip, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  IconButtonComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
  TextInputComponent,
} from "../../../../component/atom";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminQuizForm,
  AdminQuizView,
  AdminwebinarForm,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import { useNavigate } from "react-router-dom";
import { faEye, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import _ from "lodash";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import moment from "moment";
import { AdminQuizEdit } from "../../../../component/molecule/Forms";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import TextAreaComponent from "../../../../component/atom/Inputs/TextArea";
import { getText, setText } from "../../../../core/Constant";

const AdminQuizFirstScreen = ({
  getQuizeList,
  quizList,
  upDateQuizState,
  getQuizById,
  deleteQuize,
  verifyToken,
  getAllStateCourseList,
  getCourseList,
  courseList
}) => {
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState(0);
  const [name, setName] = useState('');
  const [isNameValid, setNameValid] = useState(false);
  const [isNameError, setNameError] = useState(false);

  const [description, setDescription] = useState('');
  const [isDescriptionValid, setDescriptionValid] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);


  const [noQuestion, setNoQuestion] = useState('');
  const [isNoQuestionValid, setNoQuestionValid] = useState(false);
  const [isNoQuestionError, setNoQuestionError] = useState(false);

  const [noAttempt, setNoAttempt] = useState('');
  const [isNoAttemptValid, setNoAttemptValid] = useState(false);
  const [isNoAttemptError, setNoAttemptError] = useState(false);

  const [time, setTime] = useState('');
  const [isTimeValid, setTimeValid] = useState(false);
  const [isTimeError, setTimeError] = useState(false);


  const [clist, setCList] = useState([]);
  const [weekList, setWeekList] = useState([]);
  const [selectedCourse, setCourse] = useState({});

  const [selectedCourseId, setSelectedCourseId] = useState(-1);
  const [isSelectedCourseValid, setSelectedCourseValid] = useState(false);
  const [isSelectedCourseError, setSelectedCourseError] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedWeekId, setSelectedWeekId] = useState(-1);
  const [isSelectedWeekValid, setSelectedWeekValid] = useState(false);
  const [isSelectedWeekError, setSelectedWeekError] = useState(false);
  const [open, setOpen] = useState(false);


  const dispatch = useDispatch();

  const commonCourseList = useSelector(state => state.course.get('allStatusCourseList'));
  const courseWeekQuiz = useSelector(state => state.quizes.get("courseWeekQuiz"))

  useEffect(() => {
    dispatch(Actions.course.getAllStateCourseList());
    dispatch(Actions.quizes.getCourseWeekDataList());

  }, []);

  useEffect(() => {
    setCList(commonCourseList);
  }, [commonCourseList]);



  const onChangeName = (e) => {
    const text = getText(e);
    setName(text);
    setNameValid(text?.length > 0);
    setNameError(false);
  }

  const onChangeDescription = (e) => {
    const text = getText(e);
    setDescription(text);
    setDescriptionValid(text?.length > 0);
    setDescriptionError(false);
  }

  const onChangeAttempt = (e) => {
    const text = getText(e);
    setNoAttempt(text);
    setNoAttemptValid(text > 0);
    setNoAttemptError(false);
  }

  const onChangeQuestion = (e) => {
    const text = getText(e);
    setNoQuestion(text);
    setNoQuestionValid(text > 0);
    setNoQuestionError(false);
  }

  const handleCourseChange = (event) => {
    const value = event.target.value;
    setSelectedCourses(typeof value === "string" ? value.split(",") : value);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChipDelete = (courseId) => {
    setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
  };


  const onCourseChangeWeek = (e) => {
    const id = getText(e);
    setSelectedWeekId(id);
    setSelectedWeekError(false);
    setSelectedWeekValid(id ? true : false);
  }

  const onUpload = () => {
    if (isNameValid && isNoAttemptValid && isNoQuestionValid && isTimeValid) {
      dispatch(Actions.quizes.createQuize({
        course_ids: selectedCourses,
        name: name,
        no_of_questions: noQuestion,
        no_of_attempts: noAttempt,
        duration: time,
        week: 'Week',
        description: description
      }))
      // onClose()
      // onClean()
    } else {
      if (!isNameValid) {
        setNameError(true)
      }
      if (!isDescriptionValid) {
        setDescriptionError(true)
      }
      if (!isNoAttemptValid) {
        setNoAttemptError(true)
      }
      if (!isNoQuestionValid) {
        setNoQuestionError(true)
      }
      if (!isSelectedCourseValid) {
        setSelectedCourseError(true)
      }
      if (!isTimeValid) {
        setTimeError(true)
      }

    }
  }

  const onChangeTime = (e) => {
    const text = getText(e);
    setTime(text);
    setTimeValid(text > 1);
    setTimeError(false)
    // // e['$d']
    // setTime(${e['$H']}:${e['$m']});
    // setTimeValid(moment(e['$d']).isValid());
    // setTimeError(false);
  }

  const onClean = () => {
    onChangeName(setText(''));
    onChangeDescription(setText(''));
    onChangeQuestion(setText(''))
    onChangeAttempt(setText(''));
    setSelectedCourseId(-1);
    setSelectedCourseError(false);
    setSelectedCourseValid(false);
    setSelectedWeekError(false);
    setSelectedWeekValid(false);
    setSelectedWeekId(-1);
    onChangeTime(setText(''))
    // setTimeValid(false);
    // setTimeError(false);
    // setTime(null)
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };


  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={"Add Quiz"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>

        </Grid>
        <Box className="common-admin-content-wrap">
          <Grid container>
            <Grid container padding={2} spacing={2}>
              {/* Select Field */}
              <Grid item xs={8}>
                <p style={{ borderRadius: '10px', padding: 0, margin: 0, marginBottom: 10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>Select Courses</p>
                <Select
                  multiple
                  value={selectedCourses}
                  onChange={handleCourseChange}
                  input={<OutlinedInput placeholder="Select Courses" />}
                  renderValue={() => null}
                  MenuProps={MenuProps}
                  open={open}
                  onOpen={handleOpen}
                  onClose={handleClose}
                  style={{ width: '50%' }}
                  placeholder="Select Courses"
                >
                  {clist.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>


              <Grid item xs={8}>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {selectedCourses.map((id) => (
                    <Chip
                      key={id}
                      label={clist.find((course) => course.id === id)?.name}
                      onDelete={() => handleChipDelete(id)}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={6} >
              <TextInputComponent
                label={"Name"}
                placeholder="Enter quiz name"
                onchange={onChangeName}
                value={name}
                error={"Add valid Quiz name"}
                isError={isNameError}
              />

            </Grid>
            <Grid item xs={6} >
              <TextAreaComponent
                error={'Add valid description'}
                isError={isDescriptionError}
                value={description}
                onchange={onChangeDescription}
                textlabel={"Description"}
                placeholder={"Enter quiz description"} />
            </Grid>
            <Grid item xs={4} >
              <TextInputComponent
                isError={isNoQuestionError}
                error="Add valid Number of Questions"
                value={noQuestion}
                label={"No Of Questions"}
                placeholder="Enter Number of Questions"
                type={'number'}
                onchange={onChangeQuestion}
              />
            </Grid>
            <Grid item xs={4} >
              <TextInputComponent
                isError={isNoAttemptError}
                error="Add valid number of attempts"
                value={noAttempt}
                label={"No Of Attempts"}
                placeholder="Enter number of attempts"
                type={'number'}
                onchange={onChangeAttempt}
              />
            </Grid>
            <Grid item xs={4} >
              <TextInputComponent
                error={'please select valid time'}
                isError={isTimeError}
                value={time}
                label={"Time Duration (minutes)"}
                placeholder="Enter Time duration"
                type={'number'}
                onchange={onChangeTime}
              />
            </Grid>

            <Grid mt={10} alignItems={'flex-end'} justifyContent={'flex-end'} container>
              <Grid item >

                <TextIconButtonComponent
                  btnText={"Next"}
                  // icon={faQuestionCircle}
                  animation={"shake"}
                  onclick={onUpload}
                />
              </Grid>

            </Grid>

          </Grid>
        </Box>


      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    quizList: state.quizes.get("quizList"),
    courseList: state.students.get("commonCourseList"),

  }),
  {
    getQuizeList: Actions.quizes.getQuizeList,
    upDateQuizState: Actions.quizes.upDateQuizState,
    getQuizById: Actions.quizes.getQuizById,
    deleteQuize: Actions.quizes.deleteQuize,
    verifyToken: Actions.auth.verifyToken,
    getAllStateCourseList: Actions.course.getAllStateCourseList,
    getCourseList: Actions.quizes.getCourseListByQuiz,
    getQuizById: Actions.quizes.getQuizById,
  }
)(AdminQuizFirstScreen);
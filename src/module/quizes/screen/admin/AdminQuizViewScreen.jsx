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
  AdminQuestionView,
  AdminQuizForm,
  AdminQuizView,
  AdminwebinarForm,
  PopUpMessageComponent,
  QandACard,
} from "../../../../component/molecule";
import { useLocation, useNavigate } from "react-router-dom";
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
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

const AdminQuizViewScreen = ({
  getQuizeList,
  quizList,
  upDateQuizState,
  getQuizById,
  deleteQuize,
  verifyToken,
  getAllStateCourseList,
  getCourseList,
  courseList,
  quizData,
  questionAndAnswersList,
  getQuizQuestionAndAnswerByQuizId,
  removeQuestionfromQuiz
}) => {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(0);
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
  const [questionList, setQuestionList] = useState([]);
  const [viewQuestion, setViewQuestion] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [questionData, setQuestionData] = useState([]);
  const [editQuestion, setEditQuestion] = useState(false);
  const [isdeletequestion, setIsDeleteQuestion] = useState(false);

  const [quiz, setQuiz]=useState({});
  const location = useLocation();

  const id = location?.state?.id;


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

  useEffect(() => {
    getQuizById(id);
    getQuizQuestionAndAnswerByQuizId(id)
  }, []);


  useEffect(() => {
    setQuestionList(questionAndAnswersList);
  }, [questionAndAnswersList]);



  useEffect(() => {
    const quiz = _.get(quizData, [0], {});
    if (quizData) {
      setQuizId(quiz?.id);
      setName(quiz?.name);
      setDescription(quiz?.description);
      setNoAttempt(quiz?.no_of_attempts);
      setNoQuestion(quiz?.no_of_questions);
      setTime(quiz?.duration);
      setQuiz(quizData);
    }
  }, [quizData]);



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


  const handleChipDelete = (courseId) => {
    setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
  };




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



  const onView = (quiz) => {

  }

  const onViewOff = () => {
    setViewQuestion(false);
    setSelectedItem({});
  };

  const handleViewQuestion = (question) => {
    setSelectedItem(question);
    setViewQuestion(true);
  };

  const handleDeleteQuestion = (question) => {
    setSelectedItem(question);
    setIsDeleteQuestion(true)
  }


  const onDeleteQuestion = () => {
    setIsDeleteQuestion(false)
    removeQuestionfromQuiz({
      quiz_id: quizId,
      question_id: selectedItem?.id
    })
    // setSelectedQuiz('');
    // deleteSubject(selectedSubject)
    onDeleteClose();
  };

  const onDeleteClose = () => {
    setIsDeleteQuestion(false);
    setSelectedItem("");
  };



  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={"Quiz Details"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>

          <Grid item className="student-search-btn-section" columnGap={2}>
            {/* <Box className="student-search-btn-inner-section">
              <DropDownComponent
                list={courseList}
                initialValue={"All Courses"}
                selectedValue={courseId}
                radius={"15px"}
                onchange={(e) => filterCourse(e.target.value)}
                placeholder={"All Courses"}
              />
            </Box>
            <TextIconButtonComponent
              btnText={"Add Quiz"}
              icon={faQuestionCircle}
              animation={"shake"}
              onclick={() => setAddQuiz(true)}
            /> */}
            {/* <TextIconButtonComponent
              btnText={"View Submission"}
              icon={faEye}
              onclick={() => navigate("/admin-submission-history")}
            /> */}

            {quiz[0]?.id? <Box>
                      <TextIconButtonComponent
                        btnText={"Show Result In Graph"}
                        icon={faChartLine}
                        // onclick={() => loadAddCourse()}
                        onclick={() =>{
                          navigate('/admin-quiz-attempt-result', { state: { quiz: quiz[0], type:'0' } })
                        }}
                      />
              </Box>: null}
          </Grid>
        </Grid>
        <Box className="common-admin-content-wrap">
          <Grid container>
            <Grid container padding={2} spacing={2}>

              {/* Render Chips Outside the Select */}
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
              <Grid xs={12} item >
                {
                  questionList.map((question, index) => (
                    <QandACard
                      item={question}
                      index={index}
                      key={index}
                      isView={true}
                      isDelete={true}
                      onclick={() => handleViewQuestion(question)}
                      onPressDelete={() => handleDeleteQuestion(question)}
                    />
                  ))
                }

              </Grid>

            </Grid>

          </Grid>
        </Box>


      </Box>
      <DialogComponent
        isShowCloseButton={true}
        title={"View Question"}
        maxwidth={"lg"}
        open={viewQuestion}
        onClose={onViewOff}
      >
        <AdminQuestionView item={selectedItem} onClose={() => onViewOff()} />
      </DialogComponent>
      <PopUpMessageComponent
        open={isdeletequestion}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete Subject?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        onclick={onDeleteQuestion}
        altonclick={onDeleteClose}
        onclose={onDeleteClose}
      />
    </>
  );
};

export default connect(
  (state) => ({
    quizList: state.quizes.get("quizList"),
    courseList: state.students.get("commonCourseList"),
    quizData: state.quizes.get("quizData"),
    questionAndAnswersList: state.quizes.get("questionAndAnswersList"),
  }),
  {
    getQuizeList: Actions.quizes.getQuizeList,
    upDateQuizState: Actions.quizes.upDateQuizState,
    getQuizById: Actions.quizes.getQuizById,
    deleteQuize: Actions.quizes.deleteQuize,
    verifyToken: Actions.auth.verifyToken,
    getAllStateCourseList: Actions.course.getAllStateCourseList,
    getCourseList: Actions.quizes.getCourseListByQuiz,
    getQuizQuestionAndAnswerByQuizId:
      Actions.quizes.getQuizQuestionAndAnswerByQuizId,
    removeQuestionfromQuiz: Actions.quizes.removeQuestionfromQuiz,
  }
)(AdminQuizViewScreen);
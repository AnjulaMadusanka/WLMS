import React, { useState, useRef } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import { useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { QuizMainCard } from "../../../component/molecule";
import { QuizFirstCard } from "../../../component/molecule";
import { CircularWithValueLabel } from "../../../component/atom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { onToast } from "../../../core/Constant";
import moment from "moment";
import _ from "lodash";
import { IconButtonComponent } from "../../../component/atom";
import FlagIcon from "@mui/icons-material/Flag";
import { QuestionStatus } from "../../../component/molecule/Cards";

// stored data of object     // quiz:[]
// isFinished: bool,
// isStarted: bool,
//  endTime: timeStamp,
//  curentTime: timeStamp,
// quizId: Integer
// duration: integerx
// currentIndex

const QuizMainScreen = ({
  loadingAction,
  startData,
  stdstartQuiz,
  completeData,
  updateQuizState,
  isQuizStarted,
  stdquizComplted,
  questions,
  stdgetQuestions,
  stdStudentAnswer,
  studentAnswers,
  quizStateChange,

  quizDataNew={},
  getAQuestionOfQuiz=()=>{}
}) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(2);
  const [start, setStart] = useState(false);
  const location = useLocation();
  const [duration, setDuration] = useState();
  const [newDuration, setNewDuration] = useState();
  const [seconds, setNewSeconds] = useState();
  const [index, setIndex] = useState(0);
  const [diff, setDiff] = useState();
  const [oldQuestions, setOldQuestions] = useState();
  const [newquestions, setNewQuestions] = useState([]);
  const interval = useRef();
  const [quizData, setQuizData] = useState("");
  const timer = useRef(null);
  const [showNextButton, setShowNextButton] = useState(true);
  const [stdData, setStdData] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);

  const [tempObj, setTempObj] = useState(null);
  const [aws, setAws] = useState("");

  const [min, setMin] = useState(0);

  let time = 100;


  useEffect(() => {
    setStdData(startData);
    if (startData && startData?.attempts) {
      addAttempt(startData, false);
    }
  }, [startData]);

  useEffect(() => {
    setStart(isQuizStarted);
    getReamingTime();
  }, [isQuizStarted, quizData]);

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, [timer]);

  useEffect(() => {
    setOldQuestions(questions);
  }, [questions]);

  const initialQusestionObj = (questions) => {
    const data = questions.map((item, index) => {
      return { id: item.id, type: item.type, answer: [] };
    });
     setNewQuestions(data);
    return data;
  };

  useEffect(() => {
    let quizData = location.state?.quizData;
    setQuizData(quizData);
    stdgetQuestions(quizData.id);
  }, [location]);

  const addAttempt = (stdData, isStarted = false) => {
    const qD = localStorage.getItem("quiz");
    const dataList = JSON.parse(qD);
    const index = _.findIndex(dataList, (item) => item.quizId == quizData.id);
    if (index > -1) {
      let data = { ...dataList[index], attempt: stdData?.attempts };

      if (isStarted) {
        const diff = stdData?.duration;
        onDurationRun(diff);
        const endTime = getEndTime(diff);
        setDuration(diff);
        // dataList[index] = { ...data, currentTime: new Date(), endTime, isStarted: true, questions: newquestions };
        // localStorage.setItem('quiz', JSON.stringify(dataList))
        data = {
          ...data,
          currentTime: new Date(),
          endTime,
          questions: newquestions,
          isStarted: true,
        };
      }

      dataList[index] = data;
      localStorage.setItem("quiz", JSON.stringify(dataList));
    }
  };

  useEffect(() => {
    if (!oldQuestions) return;
    const qD = localStorage.getItem("quiz");
    if (quizData && quizData.duration && quizData.id) {
     
      if (qD && qD.length && qD.length > 0) {
        const dataList = JSON.parse(qD);
      
        const index = _.findIndex(
          dataList,
          (item) => item.quizId == quizData.id
        );

        if (index > -1) {
         
          const data = dataList[index];
          if (data && data?.isStarted) {
           
            const endTime = data?.endTime;
            const diff = moment(new Date(endTime)).diff(moment(), "minutes");
            if (diff > 0) {
              const qs = dataList[index]?.questions
              setNewQuestions(qs);
              // still ongoingh
              quizStateChange(true);
            } else {
             
              // finshed
              // call finish api
            }
          } else {
           
            const obj = initialObj(quizData);
            // he can start
            setTempObj(obj);
            setStart(false);
            initialQusestionObj(oldQuestions);
          }
        } else {
          const obj = initialObj(quizData);
          // he can start


          setTempObj(obj);
          setStart(false);
          const dl = [...dataList, obj];
          localStorage.setItem("quiz", JSON.stringify(dl));
          initialQusestionObj(oldQuestions);
        }
        // 
      } else {
        const obj = initialObj(quizData);
        // ok new
        console.log("cant", oldQuestions)
        initialQusestionObj(oldQuestions);
        setTempObj(obj);
        setStart(false);

        localStorage.setItem("quiz", JSON.stringify([obj]));
      }
    }
  }, [oldQuestions]);

  const initialObj = (quizData) => {
    setDuration(quizData.duration);
    return { duration: quizData?.duration, quizId: quizData?.id, index: 0 };
  };

  const getReamingTime = () => {
    const qD = localStorage.getItem("quiz");
    const dataList = JSON.parse(qD);
    const index = _.findIndex(dataList, (item) => item.quizId == quizData.id);
    if (index > -1) {
      const data = dataList[index];
      if (data && data?.isStarted) {
        const endTime = data?.endTime;
        // const diff = moment(new Date(endTime)).diff(moment(), 'minutes');
        let diff = moment(new Date(endTime)).diff(moment(), "seconds");
        diff = diff / 60;

        setDuration(diff);
        const questions = data?.questions;
        if (diff > 0) {
          onDurationRun(diff);
          setNewDuration(data?.questions);
          setNewQuestions(questions);
          setIndex(data?.index);
        } else {
          onToast(
            "finished",
            { status_code: 1, message: "quiz attempt was completed" },
            false
          );
          const attempt = dataList[index]?.attempt;
          stdquizComplted({ quiz_id: quizData.id, attempt });
        }
      } else {
        const diff = data?.duration;
        onDurationRun(diff);
        const endTime = getEndTime(diff);
        setDuration(diff);
        // dataList[index] = { ...data, currentTime: new Date(), endTime, isStarted: true, questions: newquestions };
        // localStorage.setItem('quiz', JSON.stringify(dataList))
      }
    }
    // currentTime,
    // endTime
    // isStarted
  };

  const onDurationRun = (duration) => {
    var timeLimitInMinutes = duration;
    var timeLimitInSeconds = timeLimitInMinutes * 60;
    clearInterval(timer.current);

    function startTimer() {
      timeLimitInSeconds--;
      var minutes = Math.floor(timeLimitInSeconds / 60);
      var seconds = timeLimitInSeconds % 60;
      if (minutes < duration) {
        // todo check
        setNewDuration(minutes);
        let string = seconds + "";
        if (string.length == 1) {
          string = `0${seconds}`;
        }
        setNewSeconds(seconds);
      }
    }
    timer.current = setInterval(startTimer, 1000);
  };

  useEffect(() => {
    if (newDuration < 0) {
      const qD = localStorage.getItem("quiz");
      const dataList = JSON.parse(qD);
      const index = _.findIndex(dataList, (item) => item.quizId == quizData.id);
      const attempt = dataList[index]?.attempt;
      clearInterval(timer.current);
      onToast(
        timer.current,
        "Time is over",
        { status_code: 1, message: "quiz attempt was completed" },
        false
      );
      stdquizComplted({ quiz_id: quizData.id, attempt });
    }
    setMin(newDuration);
  }, [newDuration, quizData]);

  const getEndTime = (duration) => {
    const durationValue = duration;
    const currentTime = new Date(); //stdData?.started_at
    const durationMille = durationValue * 60 * 1000;
    const endTime = new Date(currentTime.getTime() + durationMille);
    return endTime;
  };

  const onStart = () => {
    // const attempt = _.get(quizData, 'quiz_status[0].attempts', NaN);
    let attempt = _.get(quizData, "max_attempt", NaN);
    if (!attempt || _.isNaN(attempt)) {
      attempt = 0;
    }
    const duration = _.get(quizData, "duration", "0");
    stdstartQuiz({ quiz_id: quizData?.id, attempt: attempt });
    addAttempt({ attempts: parseInt(attempt) + 1, duration }, true);
  };

  const onBackClick = (questionData) => {
    const newIndex = index - 1;
    if (newIndex > -1) {
      setIndex(newIndex);
      setShowNextButton(true);
    }
    if (newIndex == 0) {
      setShowBackButton(false);
    }
  };

  const onSubmitLast =(questionData,data)=>{
    const qD = localStorage.getItem("quiz");
    const dataList = JSON.parse(qD);
    const indexNumber = _.findIndex(
      dataList,
      (item) => item?.quizId == quizData.id
    );
    const attempt = dataList[indexNumber]?.attempt;
    const tempIndex = index;
    const nextIndex = index + 1;


    stdStudentAnswer({
      attempt,
      quiz_id: quizData.id,
      question_id: oldQuestions[tempIndex].id,
      answer: _.get(data, "answer", []),
      is_answered: _.get(data, "isAnswered", 0),
      is_flag: _.get(data, "isFlag", 0),
    });
  }

  const onComplet = ()=>{
    const qD = localStorage.getItem("quiz");
    const dataList = JSON.parse(qD);
    const indexNumber = _.findIndex(
      dataList,
      (item) => item?.quizId == quizData.id
    );
    const attempt = dataList[indexNumber]?.attempt;
    _.delay(() => {
      stdquizComplted({ quiz_id: quizData.id, attempt });
    }, 1000);
    clearInterval(timer.current);
  }

  const onNextClick = (questionData, data,) => {
    const list = newquestions;
    list[index] = data;
    setNewQuestions(list);
    const questions = list;
    const qD = localStorage.getItem("quiz");
    const dataList = JSON.parse(qD);
    const indexNumber = _.findIndex(
      dataList,
      (item) => item?.quizId == quizData.id
    );
    const obj = { ...dataList[indexNumber], questions, index };
    dataList[indexNumber] = obj;
    localStorage.setItem("quiz", JSON.stringify(dataList));
    const tempIndex = index;
    const nextIndex = index + 1;
    // setAws(_.get(list,'[nextIndex].answer',[]).join());
    setShowBackButton(true);
    const attempt = dataList[indexNumber]?.attempt;

    stdStudentAnswer({
      attempt,
      quiz_id: quizData.id,
      question_id: oldQuestions[tempIndex].id,
      answer: _.get(data, "answer", []),
      is_answered: _.get(data, "isAnswered", 0),
      is_flag: _.get(data, "isFlag", 0),
    });


    if (oldQuestions.length > nextIndex) {
      setIndex(nextIndex);
    } else {
      // finish button show here

      _.delay(() => {
        stdquizComplted({ quiz_id: quizData.id, attempt });
      }, 1000);
      clearInterval(timer.current);
    }

    if (newquestions.length == nextIndex) {
      setShowNextButton(false);
    }
  };


  return (
    <>
      <Box className="main-screen-container">
        <Grid container flexDirection={"column"} mt={3}>
          <Grid item>
            <IconButtonComponent
              onclick={() => navigate(-1)}
              btnType="backbtn"
              btnText="Back"
            />
          </Grid>
          <Grid item>
            <Grid container flexDirection={"column"}>
              <Grid item>
                <Grid container spacing={2}>
                  {start ? (
                    <Grid
                      item
                      xl={2}
                      lg={2}
                      md={2}
                      xs={12}
                      sx={{
                        backgroundColor: { xl: '#ededed', lg: '#ededed', md: '#ededed' },
                        maxHeight: { xl: 800, lg: 700, md: 600, sm: 300 },
                        overflow: "scroll",
                        display: 'flex',

                      }}
                      className="custom-scroll-quiz"
                    >
                      <Grid container gap={1} mt={1} mb={1}>
                        {_.map(newquestions, (item, index) => {
                          return (
                            <Grid
                              item
                              xl={5}
                              lg={5}
                              md={5}
                              sm={2}
                              xs={2}
                              key={index + 1 + 'list'}
                            >
                              <QuestionStatus
                                handleClick={() => {
                                  if (index > -1) {
                                    setIndex(index);
                                    setShowNextButton(true);
                                  }
                                  if (index == 0) {
                                    setShowBackButton(false);
                                  }
                                }}
                                data={item}
                                question={index + 1} />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  ) : null}

                  <Grid
                    item
                    xl={start ? 10 : 12}
                    lg={start ? 10 : 12}
                    md={start ? 10 : 12}
                    xs={12}
                  >
                    <Grid container flexDirection={"column"}>
                      <Grid item>
                        <Box p={2}>
                          {start ? (
                            <QuizMainCard
                              index={index}
                              length={oldQuestions?.length}
                              answers={newquestions[index]}
                              onBack={() => onBackClick(oldQuestions)}
                              onNext={(data) => onNextClick(oldQuestions, data)}
                              data={oldQuestions[index]}
                              quizName={quizData.name}
                              duration={duration}
                              quizId={quizData.id}
                              quizWeek={quizData.week}
                              start={start}
                              min={min}
                              seconds={seconds}
                              time={time}
                              newList={newquestions}
                              onSubmitLast={(data) => onSubmitLast(oldQuestions, data)}
                              onComplet={onComplet}
                            />
                          ) : (
                            <QuizFirstCard onQuizStart={onStart} />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item>
          <Box p={2}>
            {start ? (
              <QuizMainCard
                index={index}
                length={oldQuestions?.length}
                answers={newquestions[index]}
                onBack={() => onBackClick(oldQuestions)}
                onNext={(data) => onNextClick(oldQuestions, data)}
                data={oldQuestions[index]}
              />
            ) : (
              <QuizFirstCard onQuizStart={onStart} />
            )}
          </Box>
        </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    stdquizList: state.quizes.get("stdquizList"),
    startData: state.quizes.get("startData"),
    completeData: state.quizes.get("completeData"),
    questions: state.quizes.get("questions"),
    studentAnswers: state.quizes.get("studentAnswers"),
    loadingAction: state.common.get("loadingAction"),
    isQuizStarted: state.quizes.get("isQuizStarted"),
    quizDataNew: state.quizes.get('quizDataNew')
  }),
  {
    stdstartQuiz: Actions.quizes.stdstartQuiz,
    stdquizComplted: Actions.quizes.stdquizComplted,
    stdgetQuestions: Actions.quizes.stdgetQuestions,
    stdStudentAnswer: Actions.quizes.stdStudentAnswer,
    updateQuizState: Actions.quizes.updateQuizState,
    quizStateChange: Actions.quizes.quizStateChange,
    getAQuestionOfQuiz: Actions.quizes.getAQuestionOfQuiz
  }
)(QuizMainScreen);

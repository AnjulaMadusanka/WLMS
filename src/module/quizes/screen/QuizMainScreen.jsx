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

    quizDataNew = {},
    getAQuestionOfQuiz = () => { },
    currentQuestion = {},
    quizState = {},
    getStudentQuizStatus = () => { }
}) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(2);
    const [start, setStart] = useState(false);
    const location = useLocation();
    const [duration, setDuration] = useState();
    const [newDuration, setNewDuration] = useState();

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

    const [startTime, setStartTime]= useState(null)

    const [qData, setQData] = useState({});

    const [tempObj, setTempObj] = useState(null);
    const [aws, setAws] = useState("");


    const [seconds, setNewSeconds] = useState(0);
    const [min, setMin] = useState(0);

    let time = 100;


    useEffect(() => {
        // setQuizData(_.get(quizDataNew,'quiz',{}));
        setValue(quizDataNew)
        console.log(quizDataNew, 'quizDataNewwwwwwwww')
        // const startTime = _.get(quizDataNew, 'attempt_details.started_at', new Date());
        // setStartTime(startTime)
    }, [quizDataNew])

    useEffect(() => {
        setStdData(startData);
        setStartTime(startData?.started_at)
        if (!start && startData && startData?.attempts) {
            setStart(true)
            
        }
    }, [startData, start]);

    useEffect(() => {
        if(!_.isNull(startTime)){
            getReamingTime(true)
        }
    }, [startTime]);

   

    useEffect(() => {
        if(questions?.length>0){
            setOldQuestions(questions);
        }
        

    }, [questions]);

    useEffect(() => {
        console.log(currentQuestion, 'currentQuestion')
        if (currentQuestion?.question_id) {
            setQData(currentQuestion);
        }
    }, [currentQuestion])

   

    useEffect(() => {
        let quizData = location.state?.quizData;
        setQuizData(quizData);
        getStudentQuizStatus(quizData.id);
        setStart(false)
        // const duration = _.get(quizData, "duration", "0");
        // onDurationRun(duration)
    }, [location]);

    useEffect(() => {
        if (quizState?.status && quizState?.question_id && quizState?.action != 'start') {
            let quizData = location.state?.quizData;
            onCallQuestion({ qId: quizState?.question_id, quizId: quizData.id });
            setStart(true);
            setStartTime(quizState?.started_at)
        }

    }, [quizState, location])



    
    const getReamingTime = (isStarted) => {
        if (isStarted) {
          const endTime = getEndTime(quizData?.duration);
          // const diff = moment(new Date(endTime)).diff(moment(), 'minutes');
          let diff = moment(new Date(endTime)).diff(moment(), "seconds");
          diff = diff / 60;

          setDuration(diff);
         
          if (diff > 0) {
            onDurationRun(diff);
          } else {
            // completed
          }
        } else {
          const diff = quizData?.duration;
          onDurationRun(diff);
          const endTime = getEndTime(diff);
          setDuration(diff);
        }
    
     
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
            clearInterval(timer.current);
            onToast(
                timer.current,
                "Time is over",
                { status_code: 1, message: "quiz attempt was completed" },
                false
            );
            //   stdquizComplted({ quiz_id: quizData.id, attempt });
        }
        setMin(newDuration);
    }, [newDuration, quizData]);

    const getEndTime = (duration) => {
      const durationValue = duration;
      const currentTime = new Date(startTime); //stdData?.started_at
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
        onDurationRun(duration)
        // addAttempt({ attempts: parseInt(attempt) + 1, duration }, true);
    };

    const onBackClick = () => {
        onCallQuestion({ qId: value.previous_question_id, quizId: quizData?.id })
    };

   

    const onComplet = () => {
        const attemptData = _.get(value, 'attempt_details', null);

        _.delay(() => {
          stdquizComplted({ quiz_id: quizData.id, attempt:  _.get(attemptData, 'attempts', '') });
        }, 1000);
         clearInterval(timer.current);
    }

    const onNextClick = (questionData, data) => {

        const attemptData = _.get(value, 'attempt_details', null);
       
        let qId = value?.next_question_id;
        if(_.isNull(qId) || !qId){
            qId = data?.id;
        }

        stdStudentAnswer({
            attempt: _.get(attemptData, 'attempts', ''),
            quiz_id: quizData.id,
            question_id: data?.id,
            answer: _.get(data, "answer", []),
            is_answered: _.get(data, "isAnswered", 0),
            is_flag: _.get(data, "isFlag", 0),
        }, { quizId: quizData.id, qId });
    };


    const onCallQuestion = ({ quizId, qId }) => {
        getAQuestionOfQuiz({ quizId, qId })
    }


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
                                                {_.map(oldQuestions, (item, index) => {
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
                                                                    onCallQuestion({ quizId: quizData?.id, qId: item?.question_id })
                                                                    //   if (index > -1) {
                                                                    //     setIndex(index);
                                                                    //     setShowNextButton(true);
                                                                    //   }
                                                                    //   if (index == 0) {
                                                                    //     setShowBackButton(false);
                                                                    //   }
                                                                }}
                                                                data={_.get(item, 'user_answer', {})}
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
                                                            index={qData?.sequential_number}
                                                            length={oldQuestions?.length}
                                                            data={qData}
                                                            answers={qData?.user_answer}
                                                            onBack={onBackClick}
                                                            onNext={(data) => onNextClick(qData, data)}
                                                            //   data={oldQuestions[index]}
                                                            quizName={quizData.name}
                                                            duration={duration}
                                                            quizId={quizData.id}
                                                            quizWeek={quizData.week}
                                                            start={start}
                                                            min={min}
                                                            seconds={seconds}
                                                            time={time}
                                                            newList={oldQuestions}
                                                        //   onSubmitLast={(data) => onSubmitLast(oldQuestions, data)}
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
        quizDataNew: state.quizes.get('quizDataNew'),
        currentQuestion: state.quizes.get('currentQuestion'),
        quizState: state.quizes.get("quizState")
    }),
    {
        stdstartQuiz: Actions.quizes.stdstartQuiz,
        stdquizComplted: Actions.quizes.stdquizComplted,
        stdgetQuestions: Actions.quizes.stdgetQuestions,
        stdStudentAnswer: Actions.quizes.stdStudentAnswer,
        updateQuizState: Actions.quizes.updateQuizState,
        quizStateChange: Actions.quizes.quizStateChange,
        getAQuestionOfQuiz: Actions.quizes.getAQuestionOfQuiz,
        getStudentQuizStatus: Actions.quizes.getStudentQuizStatus
    }
)(QuizMainScreen);
import React, { useState } from "react";
import { Box, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { QuizMainCard } from "../../../component/molecule";
import { QuizFirstCard } from "../../../component/molecule";
import QuizAssesmentCard from "../../../component/molecule/Cards/QuizAssesmentCard";
import { CircularWithValueLabel } from "../../../component/atom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { IconButtonComponent } from "../../../component/atom";
import { USER_ROLE } from "../../../core/Constant";

const QuizDoneScreen = ({
  startData,
  stdstartQuiz,
  getAssessmentQnR,
  assessmentQnR,
  getAssessmentQnRAdmin,
}) => {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [questionDetails, setQuestionDetails] = useState({});
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);

  const questionId = location?.state?.question_id;
  const attempt = location?.state?.attempt;
  const quizId = location?.state?.quiz_id;
  const quizName = location?.state?.quiz_name;
  const userId = location?.state?.user_id;
  const id = location?.state?.id;

  useEffect(()=>{
    // console.log('question Id: ', questionId)
    // console.log('attempt: ', attempt)
    // console.log('quiz Id: ', quizId)
    // console.log('quiz name: ', quizName)
    // console.log('user Id: ', userId)
    // console.log('Id: ', id)

  },[])

  useEffect(() => {
    
    setQIndex(id);
  }, [location]);

  useEffect(() => {
    setQuestionDetails(assessmentQnR);
  }, [questionId, attempt, quizId, assessmentQnR]);

  useEffect(() => {
    if (localStorage.getItem("userType") == USER_ROLE.admin) {
      getAssessmentQnRAdmin({
        quiz_id: quizId,
        question_id: questionId,
        attempt: attempt,
        user_id: userId,
      });
    } else {
      getAssessmentQnR({
        quiz_id: quizId,
        question_id: questionId,
        attempt: attempt,
      });
      // console.log("popopopopo",{
      //   quiz_id: quizId,
      //   question_id: questionId,
      //   attempt: attempt,
      // })
    }
  }, []);

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

  const onNextClick = (questionData) => {
    const newIndex = index - 1;
    if (newIndex > -1) {
      setIndex(newIndex);
      setShowNextButton(true);
    }
    if (newIndex == 0) {
      setShowBackButton(false);
    }
  };

  return (
    <>
      <Box className="main-screen-container">
        <Box>
          <IconButtonComponent
            onclick={() => navigate(-1)}
            btnType="backbtn"
            btnText="Back"
          />
        </Box>
        <Box mt={1.6}>
          <HeadingComponent
            text={quizId < 10 ? "Quiz 0" + quizId : "Quiz" + quizId}
            fontweigth={600}
            size={26}
            fontfamily={"Montserrat"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 1,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <p className="quiz-title-assest">{quizName}</p>
            <p
              style={{
                display: "flex",
                flexDirection: "row",
                fontFamily: "Montserrat",
                color: "#9c9c9c",
              }}
            >
              Attempt {attempt}
            </p>
          </Box>
          {/* <CircularWithValueLabel color="#28b882" type="1" /> */}
        </Box>
        <Box p={2}>
          <QuizAssesmentCard
            index={qIndex}
            onNext={onNextClick()}
            onBack={() => onBackClick()}
            data={questionDetails}
          />
        </Box>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    stdquizList: state.quizes.get("stdquizList"),
    startData: state.quizes.get("startData"),
    assessmentQnR: state.quizes.get("assessmentFormQnR"),
  }),
  {
    stdstartQuiz: Actions.quizes.stdstartQuiz,
    getAssessmentQnR: Actions.quizes.getAssessmentResonNQuestion,
    getAssessmentQnRAdmin: Actions.quizes.getAssessmentResonNQuestionAdmin,
  }
)(QuizDoneScreen);

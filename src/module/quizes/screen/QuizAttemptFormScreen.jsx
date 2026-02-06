import React, { useEffect, useState } from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { QuizAttemptCard, QuizMainCard } from "../../../component/molecule";
import { QuizFirstCard } from "../../../component/molecule";
import {
  AssementButton,
  CircularWithValueLabel,
  TextEditior,
} from "../../../component/atom";
import { connect, useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import TextAreaComponent from "../../../component/atom/Inputs/TextArea";
import { USER_ROLE } from "../../../core/Constant";

const QuizAttemptFormScreen = ({ getAssessmentDetails, assessmentDetails }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const quizStatusId = location?.state?.quiz_status_id;
  const quizId = location?.state?.quiz_id;
  const userId = location?.state?.user_id;
  const quizName = location?.state?.quiz_name;
  const studentName = location?.state?.stuName;
  const attempt = location?.state?.attempt;
  const [assessmentInfo, setAssessmentInfo] = useState({});
  const [feedback, setFeedback] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [userRole, setUserRole] = useState(0);

  useEffect(() => {
    setUserRole(parseInt(localStorage.getItem("userType")));
    setAssessmentInfo(assessmentDetails);
    setFeedback(assessmentDetails?.feedback);
  }, [assessmentDetails]);
  useEffect(() => { }, [feedback]);

  useEffect(() => {
    getAssessmentDetails({
      status_id: quizStatusId,
      user_id: userId,
    });
  }, [getAssessmentDetails]);

  const dotBtnClick = (value, id) => {
    if (userRole == USER_ROLE.student) {
      navigate("/quiz-done", {
        state: {
          quiz_id: quizId,
          question_id: value?.id,
          // attempt: assessmentInfo?.attempts,
          quiz_name: quizName,
          id,
          attempt,
        },
      });
    } else {
      navigate("/quiz-done", {
        state: {
          quiz_id: quizId,
          question_id: value?.id,
          attempt: attempt[0],
          quiz_name: quizName,
          user_id: userId,
        },
      });
    }
  };
  const handleSubmit = () => {
    if (!errorStatus) {
      dispatch(
        Actions.quizes.addFeedbackForm({
          quiz_status_id: quizStatusId,
          feedback: feedback,
        })
      );
      setFeedback("");
      setFeedback(assessmentInfo?.feedback);
    }
  };

  const onFeedbackChange = (value) => {
    setFeedback(value);
    if (value === undefined || value === null || value === "") {
      setErrorStatus(true);
    } else {
      setErrorStatus(false);
    }
  };
  return (
    <>
      <Box className="main-screen-container">
        <Box mt={1}>
          <HeadingComponent
            text={"Quiz 0" + quizId}
            backNavigation={true}
            fontweigth={600}
            size={26}
            fontfamily={"Montserrat"}
          />
        </Box>

        {/* <Box mt={5}>
          <Grid container>
            <Grid item>
              <TextButtonComponet
                onButtonClick={() => navigate(-1)}
                text={"Back"}
                classStyle="btn btn-secondary"
              />
            </Grid>
          </Grid>
        </Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            p: 2,
            mt: 0.2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: 2,
                    height: "100%",
                  }}
                >
                  <span className="quiz-card-txt">{quizName}</span>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      color: "#9C9C9C",
                      fontSize: "14px",
                    }}
                  >
                    Attempt {attempt < 10 ? "0" + attempt?.toString() : attempt}
                  </span>
                </Box>
                {userRole ? (
                  <CircularWithValueLabel
                    color="#28B882"
                    progress="Done"
                    text="Done"
                  />
                ) : null}
              </Box>
              <p
                style={{ width: 200, textAlign: "center" }}
                className="quiz-attempt-marktext"
              >
                {userRole ? "Marks" : "Percentage"} - {assessmentInfo?.marks}%
              </p>
            </Box>
            {!userRole ? (
              <Box mt={1}>
                <p className="quiz-card-txt">{studentName}</p>
              </Box>
            ) : null}
          </Box>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Note:Please click on the question number to view the answer</span>
          <Box>
            <Grid
              container
              rowGap={5}
              columnGap={8}
              sx={{ paddingInlineStart: 3 }}
            >
              {assessmentInfo?.questions?.map((question, index) => {
                
                return (
                  <Grid item key={index}>
                    <AssementButton
                      onButtonClick={() => dotBtnClick(question, index)}
                      btncolor={question?.is_correct ? "#28B882" : "#d06060"}
                      text={index + 1}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          <Box>
            <p className="quiz-card-txt">Feedback</p>
            {userRole ? (
              <>
                {assessmentInfo?.feedback ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: assessmentInfo?.feedback,
                    }}
                  />
                ) : (
                  "Feedback not given"
                )}
              </>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* <TextAreaComponent
              height={120}
              value={feedback}
              onchange={(e) => onFeedbackChange(e.target.value)}
              placeholder="Enter your feedback here..."
              isError={errorStatus}
              error={"Please enter feedback before submitting"} /> */}

                <TextEditior
                  value={feedback}
                  isError={errorStatus}
                  error="Please enter feedback before submitting"
                  // label={"Question"}
                  placeholder={"Enter your feedback here.."}
                  onchange={onFeedbackChange}
                />

                <Grid container spacing={1} justifyContent={"flex-end"}>
                  <Grid item>
                    <TextButtonComponet
                      text={"Add"}
                      onButtonClick={handleSubmit}
                    />
                  </Grid>
                  <Grid item>
                    <TextButtonComponet
                      classStyle="btn btn-secondary"
                      onButtonClick={() => {
                        setFeedback("");
                        setErrorStatus(false);
                      }}
                      text={"Cancel"}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    assessmentDetails: state.quizes.get("assessmentDetails"),
  }),
  {
    getAssessmentDetails: Actions.quizes.getAssessmentFormDetails,
  }
)(QuizAttemptFormScreen);

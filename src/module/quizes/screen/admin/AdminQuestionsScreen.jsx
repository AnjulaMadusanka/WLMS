import React, { useEffect, useState, useRef } from "react";
import { IMAGES } from "../../../../assets/Images";
import { Avatar, Box, Grid } from "@mui/material";
import {
  IconButtonComponent,
  RadioButtonComponent,
  TextIconButtonComponent,
} from "../../../../component/atom";
import {
  AdminQuestionView,
  AdminQuestions,
  PopUpMessageComponent,
  QandACard,
} from "../../../../component/molecule";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import _ from "lodash";
import { AdminQuestionsEdit } from "../../../../component/molecule/Forms";

const AdminQuestionsScreen = ({
  getQuizQuestionAndAnswerByQuizId,
  questionAndAnswersList,
  deleteQuestion,
}) => {
  const [question, setQuestion] = useState({});
  const [addQuestion, setAddQuestions] = useState(false);
  const [viewQuestion, setViewQuestion] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [editQuestion, setEditQuestion] = useState(false);

  const [onDeletePopup, setOnDeletePopUp] = useState(false);

  const [quiz, setQuiz] = useState({});
  const [qAndAList, setQandAList] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const data = location.state;
    if (data) {
      setQuiz(data);
      getQuizQuestionAndAnswerByQuizId(data?.id);
    }
  }, [location]);

  useEffect(() => {
    setQandAList(questionAndAnswersList);
  }, [questionAndAnswersList]);

  const onDelete = () => {
    setOnDeletePopUp(false);
    const { quiz_id, id } = selectedItem;
    deleteQuestion(id, quiz_id);
    _.delay(() => {
      setSelectedItem({});
    }, 1000);
  };

  const onViewOff = () => {
    setViewQuestion(false);
    setSelectedItem({});
  };

  const onNotDelete = () => {
    setOnDeletePopUp(false);
    setSelectedItem({});
  };

  return (
    <Box>
      {questionAndAnswersList.length == 0 ? (
        <Grid container flexDirection={"column"}>
          <Grid item>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <HeadingComponent
                  text={"Quizzes - Questions"}
                  fontweigth={600}
                  size={30}
                  fontfamily={"Montserrat"}
                  backNavigation={true}
                />
              </Grid>
              <Grid item>
                <TextIconButtonComponent
                  icon={faQuestionCircle}
                  onclick={() => setAddQuestions(true)}
                  btnText={"Add Question"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            // p={2}
            container
            flexDirection={"column"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <Avatar
                alt="Q"
                src={IMAGES?.quizEmptyImg}
                sx={{ width: 400, height: 400 }}
              />
            </Grid>
            <Grid item>
              <Grid
                container
                flexDirection={"column"}
                alignItems={"center"}
                rowSpacing={2}
              >
                <Grid item>
                  <p
                    style={{
                      fontSize: 35,
                      fontFamily: "Montserrat, sans serif,",
                      color: "#2D394580",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    There are no questions added yet <br /> Click on "Add
                    Question" button to add your questions
                  </p>
                </Grid>
                <Grid item>
                  <TextIconButtonComponent
                    icon={faQuestionCircle}
                    buttonStyleClass="btn btn-primary add-question-btn"
                    onclick={() => setAddQuestions(true)}
                    btnText={"Add Question"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container flexDirection={'column'}>
          <Grid item>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <HeadingComponent
                  text={"Quizzes - Questions"}
                  fontweigth={600}
                  size={30}
                  fontfamily={"Montserrat"}
                  backNavigation={true}
                />
              </Grid>
              <Grid item xs={2} md={3} sm={4} lg={2} xl={2}>
                <TextIconButtonComponent
                  icon={faQuestionCircle}
                  onclick={() => setAddQuestions(true)}
                  btnText={"Add Question"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {qAndAList?.map((item, index) => {
              return (
                <QandACard
                  onclick={() => {
                    setViewQuestion(true);
                    setSelectedItem(item);
                  }}
                  onPressDelete={() => {
                    setOnDeletePopUp(true);
                    setSelectedItem(item);
                  }}
                  onPressEdit={() => {
                    setEditQuestion(true);
                    setQuestion(item);
                  }}
                  key={`qAndA${index}`}
                  index={index}
                  item={item}
                />
              );
            })}
          </Grid>
        </Grid>
      )}

      <AdminQuestions
        open={addQuestion}
        onClose={() => setAddQuestions(false)}
      />

      <DialogComponent
        isShowCloseButton={true}
        title={"View Question"}
        maxwidth={"lg"}
        open={viewQuestion}
        onClose={onViewOff}
      >
        <AdminQuestionView item={selectedItem} onClose={() => onViewOff()} />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Question"}
        maxwidth={"lg"}
        open={editQuestion}
        onClose={() => setEditQuestion(false)}
      >
        {/* <AdminQuestionView item={selectedItem} onClose={() => setEditQuestion()} /> */}
        <AdminQuestionsEdit
          questionDetails={question}
          onClose={() => setEditQuestion(false)}
        />
      </DialogComponent>

      <PopUpMessageComponent
        open={onDeletePopup}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete this question ?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        altonclick={onNotDelete}
        onclick={onDelete}
        onclose={onNotDelete}
      />
    </Box>
  );
};

export default connect(
  (state) => ({
    questionAndAnswersList: state.quizes.get("questionAndAnswersList"),
  }),
  {
    getQuizQuestionAndAnswerByQuizId:
      Actions.quizes.getQuizQuestionAndAnswerByQuizId,
    deleteQuestion: Actions.quizes.deleteQuestion,
    verifyToken: Actions.auth.verifyToken,
  }
)(AdminQuestionsScreen);

import React, { useEffect, useState } from "react";
import { Box, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getText, setText } from "../../../../core/Constant";
import { Actions } from "../../../../core/modules/Actions";
import DropDownComponent from "../../../atom/Inputs/DropDown";

const AdminQuizEdit = ({ onClose }) => {
  const quizData = useSelector((state) => state.quizes.get("quizData"));
  const newData = quizData[0]
  console.log(quizData, "quizDataaaaaaa");
  const commonCourseList = useSelector((state) =>
    state.course.get("allStatusCourseList")
  );
  const courseWeekQuiz = useSelector((state) =>
    state.quizes.get("courseWeekQuiz")
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isNameValid, setNameValid] = useState(false);
  const [isNameError, setNameError] = useState(false);

  const [noQuestion, setNoQuestion] = useState("");
  const [isNoQuestionValid, setNoQuestionValid] = useState(false);
  const [isNoQuestionError, setNoQuestionError] = useState(false);

  const [noAttempt, setNoAttempt] = useState("");
  const [isNoAttemptValid, setNoAttemptValid] = useState(false);
  const [isNoAttemptError, setNoAttemptError] = useState(false);

  const [time, setTime] = useState("");
  const [isTimeValid, setTimeValid] = useState(false);
  const [isTimeError, setTimeError] = useState(false);

  const [week, setWeek] = useState("");
  const [weekList, setWeekList] = useState([]);
  const [selectedWeekId, setSelectedWeekId] = useState(_.get(quizData, "week", ""));
  const [isSelectedWeekValid, setSelectedWeekValid] = useState(false);
  const [isSelectedWeekError, setSelectedWeekError] = useState(false);

  const [courseId, setCourseId] = useState(0);
  const [isSelectedCourseValid, setSelectedCourseValid] = useState(false);
  const [isSelectedCourseError, setSelectedCourseError] = useState(false);

  const [clist, setCList] = useState([]);
  const [quizId, setQuizId] = useState(0);

  const [description, setDescription] = useState("");
  const [isDescriptionValid, setDescriptionValid] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    setCList(commonCourseList);
  }, [commonCourseList]);

  useEffect(() => {
    dispatch(Actions.quizes.getCourseWeekDataList(_.get(quizData, "course_id", "")));
    setQuizId(_.get(newData, "id", ""));
    setName(_.get(newData, "name", ""));
    setNameValid(_.get(newData, "name", "").length > 0);
    setNameError(false);

    setNoAttempt(_.get(newData, "no_of_attempts", ""));
    setNoAttemptValid(_.get(newData, "no_of_attempts", "") > 0);
    setNoAttemptError(false);

    setNoQuestion(_.get(newData, "no_of_questions", ""));
    setNoQuestionValid(_.get(newData, "no_of_questions", "") > 0);
    setNoQuestionError(false);


    setTime(_.get(newData, "duration", ""));
    setTimeValid(_.get(newData, "duration", "").length > 1);
    setTimeError(false);

   
    setCourseId(_.get(newData, "course_id", ""));
    setSelectedCourseError(false);
    setSelectedCourseValid(_.get(newData, "course_id", "") ? true : false);


    setWeek(_.get(newData, "week", ""));
    setSelectedWeekId(_.get(newData, "week", ""));
    setSelectedWeekError(false);
    setSelectedWeekValid(_.get(newData, "week", "").length > 3 ? true : false);
    
    setDescription(
      _.get(newData, "description", "") == null
        ? ""
        : _.get(newData, "description", "")
    );
    setDescriptionValid(_.get(newData, "description", "").length > 0);
    setDescriptionError(false);
   
  }, [quizData]);

  // useEffect(() => {
  //   const data = _.find(clist, (i) => (i.id = courseId));
  // }, [clist]);

  useEffect(() => {
    setWeekList(
      _.map(courseWeekQuiz, (i, id) => {
        return { ...i, id: i.week, name: `Week ${i.week}` };
      })
    );
  }, [courseWeekQuiz]);

  const onChangeName = (e) => {
    const text = getText(e);
    setName(text);
    setNameValid(text?.length > 0);
    setNameError(false);
  };

  const onChangeDescription = (e) => {
    const text = getText(e);
    setDescription(text);
    setDescriptionValid(text?.length > 0);
    setDescriptionError(false);
  };

  const onChangeAttempt = (e) => {
    const text = getText(e);
    setNoAttempt(text);
    setNoAttemptValid(text > 0);
    setNoAttemptError(false);
  };

  const onChangeQuestion = (e) => {
    const text = getText(e);
    setNoQuestion(text);
    setNoQuestionValid(text > 0);
    setNoQuestionError(false);
  };

  const onCourseChange = (e) => {
    const id = getText(e);
    setCourseId(id);
    setSelectedCourseError(false);
    setSelectedCourseValid(id ? true : false);
    dispatch(Actions.quizes.getCourseWeekDataList(id));
  };

  const onCourseChangeWeek = (e) => {
    const id = getText(e);
    setSelectedWeekId(id);
    setSelectedWeekError(false);
    setSelectedWeekValid(id ? true : false);
  };

  const onChangeTime = (e) => {
    const text = getText(e);
    setTime(text);
    setTimeValid(text > 1);
    setTimeError(false);
  };

  const onUpdate = () => {
    if (
      isNameValid &&
      isNoAttemptValid &&
      isNoQuestionValid &&
      isSelectedCourseValid &&
      isSelectedWeekValid &&
      isTimeValid
    ) {
      dispatch(
        Actions.quizes.updateQuiz({
          quiz_id:quizId,
          course_id: courseId,
          name: name,
          no_of_questions: noQuestion,
          no_of_attempts: noAttempt,
          duration: time,
          week: week,
          description:description,
        })
      );
      onClose();
      // onClean()
    } else {
      if (!isNameValid) {
        setNameError(true);
      }
      if (!isDescriptionValid) {
        setDescriptionError(true);
      }
      if (!isNoAttemptValid) {
        setNoAttemptError(true);
      }
      if (!isNoQuestionValid) {
        setNoQuestionError(true);
      }
      if (!isSelectedCourseValid) {
        setSelectedCourseError(true);
      }
      if (!isSelectedWeekValid) {
        setSelectedWeekError(true);
      }
      if (!isTimeValid) {
        setTimeError(true);
      }
    }
  };

  return (
    <>
      <form>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid md={12} xs={12}>
              <TextInputComponent
                label={"Name"}
                placeholder="Enter quiz name"
                onchange={onChangeName}
                value={name}
                error={"Add valid Quiz name"}
                isError={isNameError}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextInputComponent
                error={"please select valid time"}
                isError={isTimeError}
                value={time}
                label={"Time Duration"}
                placeholder="Enter Time duration"
                type={"number"}
                onchange={onChangeTime}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextInputComponent
                isError={isNoQuestionError}
                error="Add valid Number of Questions"
                value={noQuestion}
                label={"No Of Questions"}
                placeholder="Enter Number of Questions"
                type={"number"}
                onchange={onChangeQuestion}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextInputComponent
                isError={isNoAttemptError}
                error="Add valid number of attempts"
                value={noAttempt}
                label={"No Of Attempts"}
                placeholder="Enter number of attempts"
                type={"number"}
                onchange={onChangeAttempt}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextAreaComponent
                error={"Add valid description"}
                isError={isDescriptionError}
                value={description}
                onchange={onChangeDescription}
                textlabel={"Description"}
                placeholder={"Enter quiz description"}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <DropDownComponent
                isError={isSelectedCourseError}
                error={"Please select a course"}
                placeholder="Select Course"
                onchange={onCourseChange}
                list={clist}
                selectedValue={courseId}
                isShowZero={false}
                dropdownLabel="Course"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <DropDownComponent
                isError={isSelectedWeekError}
                error={"please select a week"}
                isInactive={!isSelectedCourseValid}
                placeholder="Select a week"
                onchange={onCourseChangeWeek}
                list={weekList}
                selectedValue={selectedWeekId}
                isShowZero={false}
                dropdownLabel="Week"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                columnGap: 1,
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ width: 100 }}>
                <TextButtonComponet
                  text={"Save"}
                  classStyle="btn btn-primary" 
                  onButtonClick={onUpdate}
                />
              </Box>
              <Box sx={{ width: 100 }}>
                <TextButtonComponet
                  text={"Cancel"}
                  classStyle="btn btn-secondary"
                  onButtonClick={() => onClose()}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </>
  );
};

export default AdminQuizEdit;

import React, { useEffect, useState } from "react";
import { Avatar, Box, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { IconButtonComponent, RadioButtonGroup, TextEditior } from "../../../atom";
import { getSourcePath, getText } from "../../../../core/Constant";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { useParams } from "react-router-dom";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import DropDownComponent from "../../../atom/Inputs/DropDown";

const initObj = {
  textValue: "",
  isChecked: false,
  isTextValid: false,
  isTextError: false,
};

const AdminQuestionsEdit = ({ onClose = () => {}, questionDetails = {} }) => {
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState([initObj]);
  const param = useParams();

  const [qId, setQid] = useState(-1);
  const [questionId, setQuestionId] = useState(-1);

  const [question, setQuestion] = useState("");
  const [qisValid, setIsQValid] = useState(false);
  const [qIsError, setIsQError] = useState(false);
  const dispatch = useDispatch();

  const [isValidAns, setIsValidAns] = useState(false);

  const [reason, setReason] = useState("");
  const [reasonValid, setIsReasonValid] = useState(false);
  const [reasonIsError, setIsReasonError] = useState(false);
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState(false);

  const [isCorrectAnsValid, setIsCorrectAnsValid] = useState(false);
  const [correctAnsError, setCorrectAnsError] = useState(false);
  const [image, setImage] = useState("");

  const [subject, setSubject] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    dispatch(Actions.questions.getSubjectList());
    dispatch(Actions.questions.getCategoryList());
 },[])



 const categoryList = useSelector((state) => state.questions.get("categoryList"));
 const subjectList = useSelector((state) => state.questions.get("subjectList"));

  useEffect(() => {
    setQuestionId(questionDetails?.id);
    setQuestion(questionDetails?.question);
    setIsQValid(true);
    setReason(questionDetails?.reason);
    setSubject(questionDetails?.subject_id);
    setCategory(questionDetails?.category_id);
    setIsReasonValid(true);
    if (questionDetails?.image !== null) {
      setImage(getSourcePath(questionDetails?.image));
    } else {
      setImage(null);
    }

    let newInputValues = [];
    let answers = _.get(questionDetails, "answers", []);
    
    // Check if 'answers' is a string (JSON encoded)
    if (typeof answers === "string") {
      try {
        answers = JSON.parse(answers); // Parse it into an array
      } catch (error) {
        console.error("Error parsing answers JSON:", error);
        answers = [];
      }
    }
    answers.forEach((item, index) => {
      newInputValues.push({
        textValue: item?.answer,
        isChecked: item?.is_correct === 1,
        isTextValid: true,
        isTextError: false,
        key: index,
      });
      if (newInputValues.length > 0) {
        setInputValues(newInputValues);
        setIsValidAns(true);
      } else {
        setInputValues([]);
      }
    });
  }, [questionDetails]);

  useEffect(() => {
    const id = param.id;
    setQid(id);
  }, [param]);

  useEffect(() => {}, [image]);
  const addInputField = () => {
    setInputCount(inputCount + 1);
    setInputValues([...inputValues, initObj]);
  };

  const removeInputField = (index) => {
    let newInputFields = [...inputValues];
    newInputFields.splice(index, 1);
    setInputValues(newInputFields);
    setInputCount(inputCount - 1);
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...inputValues];
    const item = updatedValues[index];

    let isValid = value?.length > 0;

    updatedValues[index] = {
      ...item,
      textValue: value,
      isTextValid: value?.length > 0,
      isTextError: false,
    };

    for (const item of updatedValues) {
      isValid = item.isTextValid && isValid;
    }
    setInputValues(updatedValues);
    setIsValidAns(isValid);
  };

  const handleRadioChange = (index, value) => {
    const updatedValues = [...inputValues];

    const item = updatedValues[index];
    const isChecked = item?.isChecked;
    updatedValues[index] = {
      ...item,
      isChecked: !isChecked,
    };
    setInputValues(updatedValues);
  };

  const checkCorrectAnswer = (dataArray) => {
    let ansCount = 0;
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].isChecked) {
        ansCount++;
      }
    }
    setIsCorrectAnsValid(ansCount > 0);
    setCorrectAnsError(!ansCount > 0);

    setInputValues(
      dataArray.map((item) => {
        if (!item.isTextValid) {
          return { ...item, isTextError: true };
        }
        return item;
      })
    );
    return ansCount > 0;
  };

  const onSubjectChange = (e) => {
    const Selectedvalue = getText(e);
    console.log(e,'course')
    console.log(Selectedvalue, 'selected valuee')
    setSubject(Selectedvalue);
}

const onCategoryChange = (e) => {
  const Selectedvalue = getText(e);
  console.log(e,'course')
  console.log(Selectedvalue, 'selected valuee')
  setCategory(Selectedvalue);
}

  const onChangeQuestion = (text) => {
    // const text = getText(e);
    setIsQError(false);
    setIsQValid(text.length > 0);
    setQuestion(text);
  };

  const onChangeReason = (text) => {
    // const text = getText(e);
    setIsReasonError(false);
    setIsReasonValid(text.length > 0);
    setReason(text);
  };

  const onFileUpload = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileError(false);
    }
  };

  const onRemoveImg = () => {
    setFile("");
    setFileError(false);
  };

  const onUpdateQuestion = () => {
    const isValid = checkCorrectAnswer(inputValues);
    _.delay(()=>onUpload(isValid),200)
   
  };

  const onUpload = (isCorrectAns)=>{
    if (qisValid && reasonValid && isValidAns && isCorrectAns) {
      const list = inputValues.map((item) => {
        return { answer: item?.textValue, is_correct: item?.isChecked ? 1 : 0 };
      });
      const fd = new FormData();
      fd.append('category_id',category)
      fd.append('subject_id',subject)
      fd.append('question', question)
      fd.append('question_id',questionId)
      fd.append('answers', JSON.stringify(list))
      fd.append('reason', reason)
      fd.append('image', file)
      fd.append('quiz_id', qId)

      dispatch(Actions.questions.editQuestion(fd))
      onClose();
    } else {
      if (!qisValid) {
        setIsQError(true);
      }
      if (!reasonValid) {
        setIsReasonError(true);
      }
      if (!isValidAns) {
        setInputValues(
          inputValues.map((item) => {
            if (!item.isTextValid) {
              return { ...item, isTextError: true };
            }
            return item;
          })
        );
      }
    }
  }

  return (
    <>
      <form>
        <DialogContent>
          <Grid container flexDirection={"column"}>
            <Grid item>
              <Box>
              <Grid xs={6} item>
                        <DropDownComponent
                               isShowPlaceholder={true}
                               isShowZero={subjectList.length > 0 ? false : true}
                               initialValue="Select Main subject"
                               radius={'15px'}
                               onchange={onSubjectChange}
                               dropdownLabel="Select Subject"
                               list={subjectList}
                               selectedValue={subject}
                        />
                    </Grid>
                    <Grid xs={6} item>
                        <DropDownComponent
                               isShowPlaceholder={true}
                               isShowZero={categoryList.length > 0 ? false : true}
                               initialValue="Select Cluster"
                               radius={'15px'}
                               onchange={onCategoryChange}
                               dropdownLabel="Select Cluster"
                              list={categoryList}
                               selectedValue={category}
                        />
                    </Grid>
                <Box>
                  {/* <TextInputComponent
                    label={"Question"}
                    placeholder="Enter question"
                    value={question}
                    onchange={onChangeQuestion}
                    isError={qIsError}
                    error="Please add question"
                  /> */}

                  <TextEditior
                    value={question}
                    isError={qIsError}
                    error="Please add question"
                    label={"Question"}
                    placeholder={"Enter question"}
                    onchange={onChangeQuestion}
                  />
                </Box>

                <Box p={1}>
                  {image !== null ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        columnGap: 4,
                      }}
                    >
                      <Box>
                        <Avatar
                          alt="Image"
                          src={image}
                          sx={{ width: 150, height: 150, borderRadius: 5 }}
                        />
                      </Box>
                      <Box>
                        {file && file?.name ? (
                          <div
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                            }}
                          >
                            <p>{file?.name}</p>
                            <IconButtonComponent
                              onclick={onRemoveImg}
                              btnType={"deleteIconbtn"}
                            />
                          </div>
                        ) : (
                          <TextInputComponent
                            onchange={onFileUpload}
                            type={"file"}
                            // label={"Image"}
                          />
                        )}
                        {fileError ? (
                          <span style={{ color: "red" }}>
                            Please upload a image
                          </span>
                        ) : null}
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      {file && file?.name ? (
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "10px",
                          }}
                        >
                          <p>{file?.name}</p>
                          <IconButtonComponent
                            onclick={onRemoveImg}
                            btnType={"deleteIconbtn"}
                          />
                        </div>
                      ) : (
                        <TextInputComponent
                          onchange={onFileUpload}
                          type={"file"}
                          label={"Image"}
                        />
                      )}
                      {fileError ? (
                        <span style={{ color: "red" }}>
                          Please upload a image
                        </span>
                      ) : null}
                    </Box>
                  )}
                </Box>

                <Box className="admin-question-answers-wrap">
                  <p
                    style={{
                      padding: 0,
                      paddingInlineStart:10,
                      margin: 0,
                      color: "#4E657C",
                      fontSize: 19,
                      fontWeight: 700,
                    }}
                  >
                    Answers
                  </p>
                  {inputValues?.map((item, index) => {
                    return (
                      <Box
                        className="admin-question-inner-content"
                        key={index + "new_Ans"}
                      >
                        <Box p={1}>
                          <IconButtonComponent
                            onclick={() => removeInputField(index)}
                            btnType={"deleteIconbtn"}
                          />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <TextInputComponent
                            key={index}
                            onchange={(e) =>
                              handleInputChange(index, getText(e))
                            }
                            placeholder="Enter answer"
                            value={item?.textValue}
                            isError={item?.isTextError}
                            error="Please add value"
                          />
                        </Box>
                        <Box sx={{ width: "fit-content" }}>
                          <RadioButtonGroup
                            checked={item.isChecked}
                            handleChange={(e) => handleRadioChange(index, e)}
                            key={index}
                            size={"large"}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                  {correctAnsError ? (
                    <span style={{ color: "red" }}>Select correct answer</span>
                  ) : null}

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButtonComponent
                      title="Add Answer"
                      onclick={addInputField}
                      size={"large"}
                      fontsize={"large"}
                      btnType={"addIconbtn"}
                    />
                  </Box>
                </Box>

                <Box>
                  {/* <TextAreaComponent
                    isError={reasonIsError}
                    error="Please add reason"
                    onchange={onChangeReason}
                    value={reason}
                    textlabel={"Reason"}
                    placeholder={"Add reason"}
                  /> */}

<TextEditior
                    value={reason}
                    isError={qIsError}
                    error="Please add reason"
                    label={"Reason"}
                    placeholder={"Add reason"}
                    onchange={onChangeReason}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                columnGap: 1,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Box sx={{ width: 150 }}>
                <TextButtonComponet
                  text={"Save"}
                  classStyle="btn btn-primary"
                  onButtonClick={onUpdateQuestion}
                />
              </Box>
              <Box sx={{ width: 150 }}>
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

export default AdminQuestionsEdit;

import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { DialogComponent, IconButtonComponent, RadioButtonComponent, RadioButtonGroup, TextEditior, TimePickerComponent } from "../../../atom";
import { getText, setText } from "../../../../core/Constant";
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { useLocation, useParams } from "react-router-dom";

const initObj = { textValue: '', isChecked: false, isTextValid: false, isTextError: false };

const AdminQuestions = ({ onClose = () => { }, open = false, quizData =[] }) => {
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState([initObj]);
  const location = useLocation();
  const param = useParams()

  const [qId, setQid] = useState(-1);

  const [question, setQuestion] = useState('');
  const [qisValid, setIsQValid] = useState(false);
  const [qIsError, setIsQError] = useState(false);
  const dispatch = useDispatch()


  const [isValidAns, setIsValidAns] = useState(false);

  const [reason, setReason] = useState('');
  const [reasonValid, setIsReasonValid] = useState(false);
  const [reasonIsError, setIsReasonError] = useState(false);
  const [file, setFile] = useState('');
  const [fileError, setFileError] = useState(false);

  const [isCorrectAnsValid, setIsCorrectAnsValid] = useState(false);
  const [correctAnsError, setCorrectAnsError] = useState(false);

  const [subject, setSubject] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    const id = param.id

    setQid(id);
  }, [param])


  useEffect(() => {
     dispatch(Actions.questions.getSubjectList());
     dispatch(Actions.questions.getCategoryList());
  },[])



  const categoryList = useSelector((state) => state.questions.get("categoryList"));
  const subjectList = useSelector((state) => state.questions.get("subjectList"));

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
      isTextError: false
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
      isChecked: !isChecked
    };
    setInputValues(updatedValues);
  };

  const checkCorrectAnswer = (dataArray) => {

    let ansCount = 0;
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].isChecked) { ansCount++ }
    }
    setIsCorrectAnsValid(ansCount > 0)
    setCorrectAnsError(!ansCount > 0)

    setInputValues(dataArray.map((item) => {
      if (!item.isTextValid) {
        return { ...item, isTextError: true }
      }
      return item

    }))
    return ansCount > 0;

  }

  const onChangeQuestion = (text) => {
    // const text = getText(e);
    setIsQError(false);
    setIsQValid(text.length > 0);
    setQuestion(text);
  }

  const onChangeReason = (text) => {
    // const text = getText(e);
    setIsReasonError(false);
    setIsReasonValid(text.length > 0);
    setReason(text);
  }

  const onFileUpload = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileError(false)
    }
  }

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

  const onRemoveImg = () => {
    setFile('')
    setFileError(false)
  }

  const onClean = () => {
    onRemoveImg();
    onChangeQuestion(setText(''));
    onChangeReason(setText(''));
    setInputValues([initObj]);
    setInputCount(1)
    onClose();
    setCorrectAnsError(false);
  }



  const onCreateQuestion = () => {
  const isValid =  checkCorrectAnswer(inputValues);
     _.delay(()=>onUpload(isValid),200)
  }



  const onUpload = (isCorrectAns)=>{
    if (qisValid && reasonValid && isValidAns && isCorrectAns && subject && category) {
      const list = inputValues.map((item) => {
        return { answer: item?.textValue, is_correct: item?.isChecked ? 1 : 0 }
      })
      const fd = new FormData();
      fd.append('category_id',category)
      fd.append('subject_id',subject)
      fd.append('question', question)
      fd.append('answers', JSON.stringify(list))
      fd.append('reason', reason)
      fd.append('image', file)
      fd.append('quiz_id', qId)

      const re = {
        question, list, reason, file, qId
      }
    
      dispatch(Actions.questions.addQuestion(fd,quizData))
      onClean()
    } else {
      if (!qisValid) {
        setIsQError(true)
      }
      if (!reasonValid) {
        setIsReasonError(true)
      }
      if (!isValidAns) {
        setInputValues(inputValues.map((item) => {
          if (!item.isTextValid) {
            return { ...item, isTextError: true }
          }
          return item

        }))
      }

      // if (!isCorrectAnsValid) {
      //     setCorrectAnsError(true)
      // }
      // if(_.isNull(file)){
      //     setFileError(true)
      // }

    }
  }

  return (
    <DialogComponent
      title={"Add Question"}
      isShowCloseButton={true}
      btntextone={"Add"}
      btntexttwo={"Cancel"}
      onclickone={onCreateQuestion}
      open={open}
      maxwidth={'lg'}
      // sx={{ '& .MuiDialog-paper': { width: '70%', maxWidth: '1000px' } }}
      onClose={() => {
        onClean();
      }}
    >
      <form>
        <DialogContent>

          <Box>
            <Grid container>
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
            </Grid>
            <Box>
              <TextEditior
                value={question}
                isError={qIsError}
                error="Please add question"
                label={"Question"}
                placeholder={"Enter question"}
                onchange={onChangeQuestion}
              />
            </Box>

            <Box className="admin-question-answers-wrap">
              <p
                style={{
                  padding: 0,
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
                        onchange={(e) => handleInputChange(index, getText(e))}
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
                isError={reasonIsError}
                error="Please add reason"
                label={"Reason"}
                placeholder={"Add reason"}
                onchange={onChangeReason}
              />
            </Box>

            <Box>
              {file && file.name ? (
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <p>{file.name}</p>
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
                <span style={{ color: "red" }}>Please upload a image</span>
              ) : null}
            </Box>
          </Box>
        </DialogContent>
      </form>
    </DialogComponent>
  );
}

export default AdminQuestions;

import React from "react";
import IconButton from "@mui/material/IconButton";
import { Avatar, Box, Button, Grid, Typography, LinearProgress,Modal } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import {
  IMAGE_URL,
  getSourcePath,
  getText,
  onToast,
} from "../../../core/Constant";
import _ from "lodash";
import { CircularWithValueLabel, ConfirmQuiz, DialogComponent } from "../../atom";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HeadingComponent from "../../atom/Headings/Heading";
import { useSelector } from "react-redux";


const QuizMainCard = ({
  data,
  length,
  index,
  showFinish = false,
  attempt = false,
  onNext = () => { },
  onBack = () => { },
  answers = [],
  quizName,
  duration,
  quizId,
  quizWeek,
  start,
  min,
  seconds,
  time,
  newList = [],
  onSubmitLast = () => { },
  onComplet = () => { }
}) => {
  const [answer, setAnswer] = useState([]);
  const [submitDialog, setSubmitDialog] = useState();
  const [isFlag, setIsFlag] = useState(false);
  const [show, setShow] = useState(false)

  const loadingAction = useSelector(state => state.common.get('loadingAction'));

  useEffect(() => {
    if (loadingAction?.action?.type == 'STD_STUDENT_ANSWERS') {
      setShow(loadingAction?.loading)
    }
  }, [loadingAction])

  useEffect(() => {
    const anw = _.get(answers, "answer", []);
    if (anw.length > 0) {
      setAnswer(anw);
    } else {
      setAnswer([])
    }
    setIsFlag(_.get(answers, "is_flag", false))
  }, [answers, data]);

  const onClickFlag = () => {
    setIsFlag(!isFlag)
  }

  const handleChange = (event) => {
    const text = getText(event);
    setAnswer([text]);
    // localStorage.setItem("answer", event.target.value)
  };

  const handlechangeForm = (event) => {
    const text = getText(event);
    const isChecked = _.findIndex(answer, (i) => i == text) > -1;
    if (!isChecked) {
      setAnswer([...answer, text]);
    } else {
      const anw = _.filter(answer, (i) => i !== text);
      setAnswer(anw);
    }
  };

  const onClick = () => {

    if (index == length) {
      const data = {
        ...newList[index],
        isAnswered: answer?.length > 0 ? 1 : 0,
        isFlag: isFlag ? 1 : 0
      }
      newList[index] = data
      setSubmitDialog(true)
      onsubmit(true);
    } else {
      onsubmit(false);
    }

    //   setAnswer([]);
    // if (answer.length > 0) {
    //   onNext(object);
    //   setAnswer([]);
    // } else {
    //   const respons_json =
    //     '{"status_code": "0", "message":"Please Select Value to Continue" }';
    //   onToast("Select", JSON.parse(respons_json), false);
    // }
  };

  const onsubmit = (isSubmiit) => {
    const object = {
      id: data.question_id,
      type: data.type,
      answer,
      isAnswered: answer?.length > 0 ? 1 : 0,
      isFlag: isFlag ? 1 : 0
    };
    // if (isSubmiit) {
    //   onSubmitLast(object);

    // } 
    onNext(object);

    setAnswer([]);
    setIsFlag(false)
  }

  return (
    <>

      <Grid container flexDirection={"column"} gap={3}>
        <Grid item>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Grid item>
              <Box>
                <HeadingComponent
                  text={quizName}
                  fontweigth={600}
                  size={26}
                  fontfamily={"Montserrat"}
                />

                <Box>
                  <p className="quiz-title-assest">Quiz {quizId}</p>
                  <p
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontFamily: "Montserrat",
                      fontSize: 20,
                    }}
                  >
                    {quizWeek}
                  </p>
                </Box>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ display: "flex", gap: 1 }}>
                {start ? (
                  <Box
                    onClick={onClickFlag}
                    sx={{
                      width: "50px",
                      border: "solid",
                      borderWidth: 1,
                      textTransform: "capitalize",
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      borderRadius: 2,
                      borderColor: isFlag ? 'transparent' : 'black',
                      "&:hover": {
                        backgroundColor: "#FFB200 !important",
                        color: "#fff !important",
                      },
                      backgroundColor: isFlag ? "#FFB200 !important" : '#ffffff'
                    }}
                  >

                    {isFlag ? <FlagIcon sx={{ color: "#ffffff" }} fontSize="small" /> : <FlagOutlinedIcon color="secondary" fontSize="small" />}

                  </Box>

                ) : null}

                <CircularWithValueLabel
                  duration={duration}
                  color="#28b882"
                  text={start ? min + ":" + seconds : duration}
                  progress={time}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {show ? <Grid item>
          <Grid container>
            <Grid item sx={{ width: '100%', height: 20 }}>
              <Box >
                <LinearProgress />
              </Box>
            </Grid>
          </Grid>
        </Grid> : null}
        <Grid item>
          <Grid container gap={2}>
            <Grid
              item
              xs={data?.image !== null || data.image !== undefined ? 8 : 12}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `${index}. ${data?.question}`,
                }}
              />
            </Grid>
            {data?.image ? (
              <Grid item>
                <Avatar
                  sx={{ width: 300, borderRadius: 2, height: 280 }}
                  alt="image"
                  src={getSourcePath(data?.image)}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        <Grid item>
          {data?.type == 2 ? (
            <FormControl
              variant="outlined"
              margin="normal"
              component="fieldset"
              defaultValue={[]}
              onChange={handlechangeForm}
              sx={{ width: "100%" }}
            >
              <FormGroup
                style={{
                  display: "grid",
                  gap: 5,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {data?.answers?.map((item, index) => {
                  const isChecked =
                    _.findIndex(answer, (i) => i == item.id) > -1;
                  return (
                    <Box sx={{ padding: 0 }} className="quiz-box">
                      <FormControlLabel
                        style={{ width: '100%', padding: 15 }}
                        value={item.id}
                        control={<Checkbox checked={isChecked} />}
                        label={`${item?.answer}`}
                      />
                    </Box>
                  );
                })}
              </FormGroup>
            </FormControl>
          ) : (
            <FormControl sx={{ width: "100%" }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={answer}
                onChange={handleChange}
                style={{
                  display: "grid",
                  gap: 5,
                  gridTemplateColumns: "repeat(2, 1fr)",
                }}
              >
                {data?.answers?.map((item, index) => {
                  const isChecked = answer[0] == item.id;
                  return (
                    <Box sx={{ padding: 0 }} className="quiz-box" key={index + 1}>
                      <FormControlLabel
                        style={{ width: '100%', padding: 15 }}
                        value={item.id}
                        control={<Radio checked={isChecked} />}
                        label={item.answer}
                      />
                    </Box>
                  );
                })}
              </RadioGroup>
            </FormControl>
          )}
        </Grid>
        <Grid item>
          <Grid container gap={2} justifyContent={"flex-end"}>
            {index == 1 ? null : (
              <Grid item xl={2}>
                <TextButtonComponet
                  onButtonClick={onBack}
                  classStyle="btn btn-secondary"
                  text={"Back"}
                />
              </Grid>
            )}

            <Grid item xl={2}>
              <TextButtonComponet
                onButtonClick={onClick}
                text={length == index ? "Finish" : "Save"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogComponent
        title={"Questions you answered"}
        isShowCloseButton={true}
        btntextone={"Confirm & Submit"}
        btntexttwo={"Cancel"}
        open={submitDialog}
        children={<ConfirmQuiz list={newList} />}
        onClose={() => setSubmitDialog(false)}
        onclickone={() => {
          setSubmitDialog(false)
          onComplet()
        }}
      />

      <Modal open={show}>
        <div style={{height:'100%', width:'100%'}}>

        </div>
      </Modal>
    </>
  );
};

export default QuizMainCard;
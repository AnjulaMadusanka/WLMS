import React,{useEffect,useState,useRef} from "react";
import IconButton from "@mui/material/IconButton";
import { Box, Typography, makeStyles, Grid, LinearProgress } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import {
  IMAGE_URL,
  getSourcePath,
  getText,
  onToast,
} from "../../../core/Constant";
import _ from "lodash";
import { List, ListItem } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizAssesmentCard = ({
  data,
  index,
  // showFinish = true,
  // attempt = false,
  // onNext = () => { },
  // onBack = () => { },
  // answers = [],
}) => {
  const [answer, setAnswer] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [isFlag, setFlag]=useState(false);

  const [show, setShow] = useState(false)

  const loadingAction = useSelector(state => state.common.get('loadingAction'));

  useEffect(() => {
    if (loadingAction?.action?.type == 'GET_ASSESSMENT_QUESTION_N_REASON') {
       if(loadingAction?.loading){
        setShow(loadingAction?.loading)
       }else{
        _.delay(()=>{
          setShow(loadingAction?.loading)
        },2000)
       }
      
    }
  }, [loadingAction])

  useEffect(() => {
    const anw = _.get(data, "quiz_results[0].answer", []);
    if (anw.length > 0) {
      setAnswer(anw);
    }
    setFlag(_.get(data,'quiz_results[0].is_flag',false));
    const anwAll = _.get(data, "answers", []);
    const isCorrect = _.filter(anwAll, (item) => item.is_correct == 1);
    setCorrect(isCorrect);
  }, [data]);

  const handleChange = (event) => {
    const text = getText(event);
    setAnswer([text]);
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

  return (
    <>
     <Grid
            container
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            style={{marginBottom:2}}
          >
            <Grid item>
              <Box sx={{ display: "flex", gap: 1 }}>
              {!show &&<Box
                    
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
                      // "&:hover": {
                      //   backgroundColor: "#FFB200 !important",
                      //   color: "#fff !important",
                      // },
                      backgroundColor: isFlag ? "#FFB200 !important" : '#ffffff'
                    }}
                  >

                    {isFlag ? <FlagIcon sx={{ color: "#ffffff" }} fontSize="small" /> : <FlagOutlinedIcon color="secondary" fontSize="small" />}

                  </Box>}
                  
              </Box>
            </Grid>
            
          </Grid>
      <>
      {show ? <Grid item>
                      <Grid container>
                        <Grid item sx={{ width: '100%', height: 20 }}>
                          <Box >
                            <LinearProgress />
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid> : 
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 1,
            height: "auto",
            minHeight: 300,
            justifyContent: "center",
          }}
        >
          
          <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${index + 1}. ${data?.question}`,
              }}
            />
             
            {data?.type == 2 ? (
              <FormControl
                // disabled={true}
                variant="outlined"
                margin="normal"
                component="fieldset"
                defaultValue={[]}
                onChange={handlechangeForm}
                style={{ marginTop: '20px' }}
              >
                <FormGroup
                  style={{
                    display: "grid",
                    marginTop: 10,
                    marginRight: 5,
                    gap: 5,
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  {data?.answers?.map((item, index) => {
                    const isChecked =
                      _.findIndex(answer, (i) => i == item.id) > -1;

                    return (
                      <Box className="quiz-box">
                        <FormControlLabel
                          value={item.id}
                          control={<>
                            <Checkbox
                              color={item?.is_correct ? "success" : "error"}
                              checked={isChecked}
                            />
                          </>}
                          label={item.answer}
                        />
                      </Box>
                    );
                  })}
                </FormGroup>
              </FormControl>
            ) : (
              <FormControl
                // disabled
                style={{ marginTop: '20px' }}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  style={{
                    display: "grid",
                    gap: 5,
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                  value={answer}
                  onChange={handleChange}
                >
                  {data?.answers?.map((item, index) => {
                    const isChecked = answer[0] == item.id;
                    return (
                      <Box className="quiz-box">
                        <FormControlLabel
                          value={item.id}
                          control={
                            <Radio
                              disabled={!isChecked}
                              color={item?.is_correct == 1 ? "success" : "error"}
                              checked={isChecked}
                            />
                          }
                          label={item.answer}
                        />
                      </Box>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            )}
          </Box>
          {data?.image !== null || undefined ? (
            <Box
              component="img"
              sx={{
                boxShadow: 2,
                height: 250,
                width: 250,
                marginLeft: 2,
              }}
              alt="The house from the offer."
              src={getSourcePath(data?.image)}
            />
          ) : (
            <></>
          )}
        </Box>}
      {!show &&  <p className="attempt-answer">
          {`Correct answer ${correct.length > 1 ? "are" : "is"}`}
          <List>
            {correct.map((item, index) => {
              return (
                <ListItem key={`anw${index}`}>
                  <span style={{ color: "#28b882", fontWeight: 700 }}>
                    {item?.answer}
                  </span>
                </ListItem>
              );
            })}
          </List>
        </p>}
       {!show && <p
          style={{ fontWeight: 800, color: "black", fontSize: 16 }}
          className="attempt-reason"
        >
          Reason:<div
            dangerouslySetInnerHTML={{
              __html: data?.reason,
            }}
          />
        </p>}
      </>

    </>
  );
};

export default QuizAssesmentCard;

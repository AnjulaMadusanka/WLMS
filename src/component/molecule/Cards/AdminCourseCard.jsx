import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdminVideoListView, VideoListView } from '../../atom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from "lodash"
import { useDispatch } from 'react-redux';
import { Actions } from '../../../core/modules/Actions';
import TextButtonComponet from '../../atom/Buttons/TextButton';

const MarkAsinCompletedText = ({ isCompleted = false, onPress = () => { } }) => {
  return (
    <Box
      sx={{
        ".Mui-expanded & > .collapsIconWrapper": {
          display: "none"
        },
        ".expandIconWrapper": {
          display: "none"
        },
        ".Mui-expanded & > .expandIconWrapper": {
          display: "block"
        }
      }}
    >
      <Grid style={{ flexDirection: 'row', justifyContent: 'flex-end' }} container>
        <Grid item xs={8} sm={6} md={4} lg={3} > <TextButtonComponet
          text={isCompleted ? "Mark As Incomplete" : "Mark As Complete"} classStyle={isCompleted ? "btn btn-primary" : "btn btn-secondary"} width={120} onButtonClick={() => {
            onPress()
          }}
        /></Grid>
      </Grid>
    </Box>
  );
};



const AdminCourseCard = ({ icon, onclick, size, courseData, isRegistered }) => {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    const list = _(courseData).groupBy("week").values().map(item => {
      return _(item).map(i => {
        const day = i?.day;
        if (day == 0) {
          i = { ...i, day: 1000 }
        }
        return i;
      }).groupBy('day').values().value()
    }).value();
    setDataList(list)
  }, [courseData])

  const onNavigatetoPreview = (value, item, isCompleted) => {
    const token = localStorage.getItem('token')

    if (token && token.length && token.length > 1 && value.content_type == 1) {
      navigate('/course-video', {
        state: { course: {...value,isCompleted}, courselist: item }
      });
    }
    else if (token && token.length && token.length > 1) {
      dispatch(Actions.quizes.updateQuizState(false))
      navigate('/quiz-main', {
        state: { quizData: { ...value, id: value.content_link, duration: value.duration } }
      });
    }
    else if (!token && value.content_type == 1) {
      navigate('/course-video-free', {
        state: { course: value, courselist: item }
      });
    }

  }

  const setOnHide = (item) => {
    if (hide == true) {
      setHide(true)
    }
    else {
      setHide(false)
    }
  }

  const CustomExpandText = () => {
    return (
      <Box
        sx={{
          ".Mui-expanded & > .collapsIconWrapper": {
            display: "none"
          },
          ".expandIconWrapper": {
            display: "none"
          },
          ".Mui-expanded & > .expandIconWrapper": {
            display: "block"
          }
        }}
      >
        <div className="expandIconWrapper">
          <Typography sx={{
            fontFamily: 'Montserrat',
            fontSize: '16px',
            color: 'rgb(152, 52, 240)', flex: 0.2
          }}>Hide Details</Typography>
        </div>
        <div className="collapsIconWrapper">
          <Typography sx={{
            fontFamily: 'Montserrat',
            fontSize: '16px',
            color: 'rgb(152, 52, 240)', flex: 0.2
          }}>Show Details</Typography>
        </div>
      </Box>
    );
  };





  return (<Box sx={{
    width: '100%',
    alignSelf: 'center'
  }}>
    <div>
      {/* { Object.keys(courseData).forEach(function(item, index) { */}

      {/* }) */}
      {dataList.map((item, index) => {
        const list = _(item).flatten().filter(i => i?.students_course_status?.length > 0).value();
        const isCompleted= list?.length > 0;
        
        return (
          <Accordion sx={{ boxShadow: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'rgb(152, 52, 240)' }} />}
              aria-controls="panel1a-content"
              id={item[index]}
              exp
              sx={{ display: 'flex', flexDirection: 'row', width: 1, flex: 1 }}
              onClick={() => setOnHide()}
            >
              <Typography sx={{
                fontFamily: 'Montserrat',
                fontSize: '16px',
                fontWeight: '600',
                color: '#2d3945',
                flex: 0.8
              }}>{item[0][0].week}</Typography>
              {
                CustomExpandText()
              }
            </AccordionSummary>
            {/* {isCompleted ?
             <MarkAsinCompletedText onPress={() => onMarkAsCompleteOrInComplete(isCompleted,isCompleted? list: _.flatten(item))} isCompleted={isCompleted} />
             : null} */}
            <AccordionDetails>
              <>
                {item.map((values, count) => {

                  return (
                    <>
                      {values.map((value, id) => {
                        let contenttype = 0;
                        if (value?.students_course_status?.length == 1) {
                          contenttype = 3
                        }
                        else {
                          contenttype = value?.content_type
                        }
                        return (
                          <AdminVideoListView index={id} item={value} loked={true} contentType={contenttype} 
                          onPreviewClick={() => {
                              onNavigatetoPreview(value, item, value?.students_course_status?.length)
                          }} content={value?.content} heading={value?.day} />

                        )
                      })}
                    </>
                  )
                })}
              </>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>

  </Box>);
}

export default AdminCourseCard;
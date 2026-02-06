import React, { useEffect, useState } from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { QuizAttemptCard, QuizMainCard } from "../../../component/molecule";
import { QuizFirstCard } from "../../../component/molecule";
import { CircularWithValueLabel, TextIconButtonComponent } from "../../../component/atom";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { IconButtonComponent } from "../../../component/atom";
import moment from 'moment';
import _ from "lodash";
import { USER_ROLE } from "../../../core/Constant";
import { BarChart, LineChart } from "@mui/x-charts";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";


// const ca1 = [40, 30, 20, 27, 18, 90, 49];
// const ca2 = [24, 39, 98, 39, 0, 38, 43];
// const ca3 = [45, 92, 90, 31, 20, 37, 90];
// const xLabels = [
//   '1',
//   '2',
//   '3',
//   '4',
//   '5',
//   '6',
//   '7',
// ];

const valueFormatter = (value) => {
  return `${value} %`
};

const chartSetting = {
  yAxis: [
    {
      label: 'Marks (%)',
    },
  ],
  series: [{ dataKey: 'marks', label: 'Marks', valueFormatter }],
  // height: 300,
  // sx: {
  //   [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
  //     transform: 'translateX(-10px)',
  //   },
  // },
};

const QuizAttemptScreen = ({ stdgetquizAttempts, attemptsData, }) => {
  const navigate = useNavigate();
  const [newquiz, setQuiz] = useState('');
  const [attempts, setAttempts] = useState([]);
  const location = useLocation();
  const [userType, setUserType] = useState(1);
  const [newList, setNewList] = useState([]);
  const [series, setSeries] = useState([]);
  const [xLabels, setXLabels] = useState([]);


  useEffect(() => {
    getUserType()
  }, []);

  const getUserType = async () => {
    const type = localStorage.getItem('userType');
    setUserType(type)
  };


  useEffect(() => {
    const qId = location.state?.quiz;
    setQuiz(qId)
    stdgetquizAttempts(qId?.id);
  }, [location]);

  useEffect(() => {
    setAttempts(attemptsData)
    const list = _.orderBy(attemptsData, ['attempts'], ['asc']);
    const result = _.map(list,item=>{
      return {attempt : item?.attempts, marks: parseFloat(item?.marks)}
    });
    setNewList(result);
    const dataAttempt = _.filter(list, i => i?.category_results?.length > 0);

    const dataSet = _(dataAttempt).map(i => i?.category_results).flatten().groupBy('category_name').map((items, label) => {
      return { label, data: items.map(item => item.marks) }
    }).value();


    setSeries(dataSet);
    setXLabels(_.map(dataAttempt, i => i?.attempts))

    //  [{data:[],label}]
  }, [attemptsData]);

  const onViewAttemptForm = (id, user, quizid, name, attempt) => {
    navigate('/quiz-attempt-form', { state: { quiz_status_id: id, user_id: user, quiz_id: quizid, quiz_name: name, attempt } });
  }

  return (< >
    <Box className="main-screen-container">
      <Box>
        <IconButtonComponent onclick={() => navigate(userType == USER_ROLE.admin ? -1 : '/quiz')} btnType="backbtn" btnText="Back" />
      </Box>
      {/* <Box>
        <HeadingComponent text={""} fontweigth={600} size={40} fontfamily={"Montserrat"} />
      </Box> */}
      <Box sx={{ display: 'flex', flexDirection: 'row', width: 1, justifyContent: 'space-between', mt: 2.5 }}>
        <Box>
          <p className="quiz-attempt-text">{newquiz?.id < 10 ? 'Quiz 0' + newquiz?.id : newquiz?.id}</p>
          <p className="quiz-attempt-subtext">{newquiz?.name}</p>
        </Box>
        <Box>
          <TextIconButtonComponent
            btnText={"Show Result In Graph"}
            icon={faChartLine}
            // onclick={() => loadAddCourse()}
            onclick={() => navigate('/quiz-attempt-result', { state: { quiz: location?.state?.quiz } })}
          />
        </Box>
      </Box>
      <Box>
        <Grid container>
          <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12} >
            <HeadingComponent text={`Quiz Progress`} fontfamily={"Montserrat"} fontweigth={560} size={25} />
          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }} xs={12}>
            <Grid container>
              <Grid item>
                <Box>
                  {newList?.length > 0 ? <BarChart
                    xAxis={[
                      { scaleType: 'band', dataKey: 'attempt', tickPlacement: 'middle', tickLabelPlacement: 'middle', label: 'Attempts' },
                    ]}

                    dataset={newList}
                    className="css-1vuxth3-MuiBarElement-root"
               
                    {...chartSetting}
                    width={600}
                    height={400}
                    // margin={{top:0}}
                    tooltip={{ trigger: 'axis' }}
                    viewBox={"0 100 600 400"}
                  /> : null}
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  {xLabels?.length > 0 ? <LineChart
                    width={600}
                    height={400}
                    series={series}
                    xAxis={[{ scaleType: 'point', dataKey: 'attempts', tickPlacement: 'middle', tickLabelPlacement: 'middle', label: 'Attempts', data: xLabels }]}
                    yAxis={[{ label: 'Marks' }]}
                  /> : null}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {
        attemptsData == [] ? <p>loading</p> : <Box width={'100%'} padding={0} alignItems={'center'} justifyContent={'center'} p={1}>
          {/* <QuizFirstCard/> */}
          {/* <QuizMainCard/> */}
          {
            attempts.map((item, index) => {

              return (
                <QuizAttemptCard
                  itemData={item}
                  index={attempts?.length - index}
                  key={`attempt${index}`}
                  onButtonClick={() => onViewAttemptForm(item.id, item.user_id, item.quiz_id, newquiz?.name, item?.attempts)}
                  attempt={item.attempts}
                  time={moment(new Date(_.get(item, 'finished_at', new Date()))).format('hh:mm a')}
                  date={moment(new Date(_.get(item, 'finished_at', new Date()))).format('Do MMM YYYY')}
                  marks={item.marks} />
              )
            })}
        </Box>
      }


    </Box>
  </>);
}

export default connect(state => ({
  attemptsData: state.quizes.get('attemptsData'),
  startData: state.quizes.get('startData')
}),
  {
    stdgetquizAttempts: Actions.quizes.stdgetquizAttempts,
  }
)(QuizAttemptScreen); 

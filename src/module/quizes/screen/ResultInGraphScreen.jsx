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
import _, { size } from "lodash";
import { USER_ROLE } from "../../../core/Constant";
import BellCurveGraph from "./ResultInGraph";



const ResultInGraphScreen = ({ stdgetquizAttempts, attemptsData, getStudentsGraphData = () => { }, studentsGraphData = {}, studentCategoryGraphData = [], }) => {
    const navigate = useNavigate();
    const [newquiz, setQuiz] = useState('');
    const [attempts, setAttempts] = useState([]);
    const location = useLocation();
    const [userType, setUserType] = useState(1);
    const [mainQS, setMainQS] = useState([]);
    const [mainQSMark, setMainQSMark] = useState([]);
    const [userMark, setUserMark] = useState(NaN);
    const [categoryListMark, setCategoryListMark] = useState([]);


    useEffect(() => {
        getUserType()
        // console.log("scatterData ",scatterData)
    }, []);

    const getUserType = async () => {
        const type = localStorage.getItem('userType');
        setUserType(type)
    };


    useEffect(() => {
        setCategoryListMark(studentCategoryGraphData);
    }, [studentCategoryGraphData]);

    useEffect(() => {
     
        const list = _.get(studentsGraphData, 'all_marks', [])
        setMainQSMark(list);
        // setMainQS(_.map(list, (item, index) => index + 1))
        // const myMark = _.get(studentsGraphData, 'student_marks', 0);
        // const index = _.findIndex(list, i => i == myMark)
        setUserMark(_.get(studentsGraphData,'student_marks',NaN));
    }, [studentsGraphData])

    useEffect(() => {
        const qId = location.state?.quiz;
        setQuiz(qId)
        getStudentsGraphData(qId?.id);
        // stdgetquizAttempts(qId?.id);
    }, [location]);

    // Chart.js data object


    // Chart.js options


    return (< >
        <Box className="main-screen-container">
            <Box>
                <IconButtonComponent onclick={() => navigate(userType == USER_ROLE.admin ? -1 : '/quiz-attempt', { state: { quiz: location.state?.quiz } })} btnType="backbtn" btnText="Back" />
            </Box>
            {/* <Box>
        <HeadingComponent text={""} fontweigth={600} size={40} fontfamily={"Montserrat"} />
      </Box> */}
            <Box sx={{ display: 'flex', flexDirection: 'row', width: 1, justifyContent: 'space-between', mt: 2.5 }}>
                <Box>
                    <p className="quiz-attempt-text">{newquiz?.id < 10 ? 'Quiz 0' + newquiz?.id : newquiz?.id}</p>
                    <p className="quiz-attempt-subtext">{newquiz?.name}</p>
                </Box>

            </Box>
            <Box>
                <Grid container>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={12} >
                        <HeadingComponent text={`Quiz Progress in Graph`} fontfamily={"Montserrat"} fontweigth={560} size={25} />
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }} xs={12}>
                        <Grid container>
                            <Grid xs={11} sm={11} lg={11} item>
                                <Box>
                                    <Typography fontFamily={'Montserrat'} variant="p" gutterBottom>
                                        Quiz Students Marks
                                    </Typography>
                                    <Box sx={{height: 400}}>
                                    <BellCurveGraph  studentMark={userMark} list={mainQSMark}/>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    

                

                    <Grid xs={12}>
                        <Grid container>
                            {_.map(categoryListMark, (item, index) => {
                               
                                const marks = _.get(item, 'all_marks', [])
                                const students = _.map(marks,(item, index) => index + 1);
                                const myMark = _.get(item, 'student_marks', 0);
                                const userIndex = _.findIndex(marks, i => i == myMark);
                                let xs=11, sm = 6, lg=4;
                                if(marks?.length>200){
                                    sm=11;
                                    lg=11;
                                }
                            //    if(attempts?.length==1 && attempts?.category_results?.length >0){
                            //       const indexNumber = _.findIndex(attempts?.category_results,(d,i)=>d?.category_id == item?.category_id);
                            //       if(indexNumber>-1){
                            //         const value = attempts?.category_results[indexNumber];
                            //       }else{

                            //       }
                            //    }

                              

                                return (
                                    <Grid xs={xs} sm={sm} lg={lg} key={`mark_${item?.category_name}_${index}`} item>
                                        <Box>
                                            <Typography fontFamily={'Montserrat'} variant="p" gutterBottom>
                                                Quiz Cluster <span style={{fontWeight:'bold'}}>{_.capitalize(item?.category_name)}</span> Students Marks
                                            </Typography>
                                            <Box sx={{height: 400}}>
                                              <BellCurveGraph studentMark={_.get(item,'student_marks',NaN)} list={marks}/>
                                            </Box>
                                        </Box>
                                    </Grid>
                                )
                            })

                            }
                           
                        </Grid>
                    </Grid>
                </Grid>
            </Box>


        </Box>
    </>);
}

export default connect(state => ({
    attemptsData: state.quizes.get('attemptsData'),
    startData: state.quizes.get('startData'),
    studentsGraphData: state.quizes.get('studentsGraphData'),
    studentCategoryGraphData: state.quizes.get('studentCategoryGraphData'),
}),
    {
        stdgetquizAttempts: Actions.quizes.stdgetquizAttempts,
        getStudentsGraphData: Actions.quizes.getStudentsGraphData
    }
)(ResultInGraphScreen);


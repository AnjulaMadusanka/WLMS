import React, { useEffect, useState } from "react";
import { Box, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";


const AdminQuizView = ({ onClose }) => {
    const navigate = useNavigate();
    const quizData = useSelector(state => state.quizes.get('quizData'));
    const commonCourseList = useSelector(state => state.course.get('commonCourseList'));
    const [data, setData] = useState({});

    const [name, setName] = useState('');
    const [noQuestion, setNoQuestion] = useState('');
    const [noAttempt, setNoAttempt] = useState('');
    const [time, setTime] = useState('');
    const [course, setCourse] = useState('');
    const [week, setWeek] = useState('');
    const [courseId, setCourseId] = useState(-1);
    const [clist, setCList] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setCList(commonCourseList);
    }, [commonCourseList]);

    useEffect(() => {
        setData(quizData);
        setName(_.get(quizData, 'name', ''));
        setNoAttempt(_.get(quizData, 'no_of_attempts', ''));
        setNoQuestion(_.get(quizData, 'no_of_questions', ''));
        setTime(_.get(quizData, 'duration', ''));
        setCourseId(_.get(quizData, 'course_id', ''));
        setWeek(_.get(quizData, 'week', ''));
        setCourse(_.get(quizData, 'course.name', ''));
        setDescription(_.get(quizData, 'description', '') == null ? "": _.get(quizData, 'description', ''))
    }, [quizData]);

    useEffect(() => {
       const data = _.find(clist, i=>i.id=courseId);
    //    setCourse(data)
    }, [courseId, clist])


    return (
        <>
            <form>
                <DialogContent>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box sx={{ width: "50%" }}>
                            <TextButtonComponet text={"View Questions"} onButtonClick={() => { navigate("/admin-add-questions/"+_.get(quizData, 'id', ''),{state:data}) }} />
                        </Box>
                    </Box>

                    <Grid container spacing={1}>
                    <Grid md={12} xs={12}>
                            <TextInputComponent
                                label={"Name"}
                                readOnly={true}
                                placeholder="Quiz"
                                value={name}
                            />
                        </Grid>

                        <Grid md={4} xs={12}>
                            <TextInputComponent
                                label={"Time "}
                                readOnly={true}
                                placeholder="duration"
                                value={time}
                            />
                        </Grid>

                        <Grid md={4} xs={12}>
                            <TextInputComponent
                                label={"No of Questions"}
                                readOnly={true}
                                placeholder="No of Questions"
                                value={noQuestion}
                            />
                        </Grid>

                        <Grid md={4} xs={12}>
                            <TextInputComponent
                                label={"No of Attempts"}
                                readOnly={true}
                                placeholder="No of Attempts"
                                value={noAttempt}
                            />
                        </Grid>

                        <Grid md={12} xs={12}>
                            <TextAreaComponent
                                textlabel={"Description"}
                                readOnly={true}
                                value={description}
                               />
                        </Grid>

                        <Grid md={12} xs={12}>
                            <TextInputComponent
                                label={"Course"}
                                placeholder="Course"
                                readOnly={true}
                                value={course}
                            />
                        </Grid>

                        <Grid md={12} xs={12}>
                            <TextInputComponent
                                label={"Week"}
                                placeholder="Week 01"
                                readOnly={true}
                                value={week}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
            </form>

        </>
    );
}

export default AdminQuizView;

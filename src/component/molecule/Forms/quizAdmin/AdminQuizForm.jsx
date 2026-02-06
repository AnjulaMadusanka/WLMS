import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { DialogComponent, TimePickerComponent } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { getText, setText } from "../../../../core/Constant";
import _ from "lodash";
import moment from "moment";




const AdminQuizForm = ({ onClose = () => { }, open = false }) => {
   const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isNameValid, setNameValid] = useState(false);
    const [isNameError, setNameError] = useState(false);

    const [description, setDescription] = useState('');
    const [isDescriptionValid, setDescriptionValid] = useState(false);
    const [isDescriptionError, setDescriptionError] = useState(false);


    const [noQuestion, setNoQuestion] = useState('');
    const [isNoQuestionValid, setNoQuestionValid] = useState(false);
    const [isNoQuestionError, setNoQuestionError] = useState(false);

    const [noAttempt, setNoAttempt] = useState('');
    const [isNoAttemptValid, setNoAttemptValid] = useState(false);
    const [isNoAttemptError, setNoAttemptError] = useState(false);

    const [time, setTime] = useState('');
    const [isTimeValid, setTimeValid] = useState(false);
    const [isTimeError, setTimeError] = useState(false);


    const [clist, setCList] = useState([]);
    const [weekList, setWeekList] = useState([]);
    const [selectedCourse, setCourse] = useState({});

    const [selectedCourseId, setSelectedCourseId] = useState(-1);
    const [isSelectedCourseValid, setSelectedCourseValid] = useState(false);
    const [isSelectedCourseError, setSelectedCourseError] = useState(false);

    const [selectedWeekId, setSelectedWeekId] = useState(-1);
    const [isSelectedWeekValid, setSelectedWeekValid] = useState(false);
    const [isSelectedWeekError, setSelectedWeekError] = useState(false);



    const dispatch = useDispatch();

    const commonCourseList = useSelector(state => state.course.get('allStatusCourseList'));
    const courseWeekQuiz = useSelector(state => state.quizes.get("courseWeekQuiz"))

    useEffect(() => {
        dispatch(Actions.course.getAllStateCourseList());
        
    }, []);

    useEffect(() => {
        setCList(commonCourseList);
    }, [commonCourseList]);

    useEffect(() => {
        setWeekList(_.map(courseWeekQuiz, (i, id) => {
            return { ...i, id: i.week, name: `Week ${i.week}` }
        }))
    }, [courseWeekQuiz])

    const onChangeName = (e) => {
        const text = getText(e);
        setName(text);
        setNameValid(text?.length > 0);
        setNameError(false);
    }

    const onChangeDescription = (e) => {
        const text = getText(e);
        setDescription(text);
        setDescriptionValid(text?.length > 0);
        setDescriptionError(false);
    }

    const onChangeAttempt = (e) => {
        const text = getText(e);
        setNoAttempt(text);
        setNoAttemptValid(text > 0);
        setNoAttemptError(false);
    }

    const onChangeQuestion = (e) => {
        const text = getText(e);
        setNoQuestion(text);
        setNoQuestionValid(text > 0);
        setNoQuestionError(false);
    }

    const onCourseChange = (e) => {

        const id = getText(e);
        setSelectedCourseId(id);
        setSelectedCourseError(false);
        setSelectedCourseValid(id ? true : false);
        dispatch(Actions.quizes.getCourseWeekDataList(id));
    }


    const onCourseChangeWeek = (e) => {
        const id = getText(e);
        setSelectedWeekId(id);
        setSelectedWeekError(false);
        setSelectedWeekValid(id ? true : false);
    }

    const onUpload = () => {
        if (isNameValid  && isNoAttemptValid && isNoQuestionValid && isSelectedCourseValid && isSelectedWeekValid && isTimeValid) {
            dispatch(Actions.quizes.createQuize({
                course_id: selectedCourseId,
                name:name,
                no_of_questions: noQuestion,
                no_of_attempts: noAttempt,
                duration: time,
                week: selectedWeekId,
                description:description
            }))
            onClose()
            onClean()
        } else {
            if (!isNameValid) {
                setNameError(true)
            }
            if (!isDescriptionValid) {
                setDescriptionError(true)
            }
            if (!isNoAttemptValid) {
                setNoAttemptError(true)
            }
            if (!isNoQuestionValid) {
                setNoQuestionError(true)
            }
            if (!isSelectedCourseValid) {
                setSelectedCourseError(true)
            }
            if (!isSelectedWeekValid) {
                setSelectedWeekError(true)
            }
            if (!isTimeValid) {
                setTimeError(true)
            }

        }
    }

    const onChangeTime = (e) => {
        const text = getText(e);
        setTime(text);
        setTimeValid(text>1);
        setTimeError(false)
        // // e['$d']
        // setTime(`${e['$H']}:${e['$m']}`);
        // setTimeValid(moment(e['$d']).isValid());
        // setTimeError(false);
    }

    const onClean = () => {
        onChangeName(setText(''));
        onChangeDescription(setText(''));
        onChangeQuestion(setText(''))
        onChangeAttempt(setText(''));
        setSelectedCourseId(-1);
        setSelectedCourseError(false);
        setSelectedCourseValid(false);
        setSelectedWeekError(false);
        setSelectedWeekValid(false);
        setSelectedWeekId(-1);
        onChangeTime(setText(''))
        // setTimeValid(false);
        // setTimeError(false);
        // setTime(null)
    }


    return (<DialogComponent
        isShowCloseButton={true}
        title={"Add Quiz"}
        btntextone={"Next"}
        onclickone={() => {
            onUpload()
            //  navigate("/admin-add-questions")
        }}
        btntexttwo={"Cancel"}
        open={open}
        onClose={() => {
            onClose()
            onClean()
        }}
    >
        <>
            <form>
                <DialogContent>
                    <Box>
                        <Box>
                            <TextInputComponent
                                label={"Name"}
                                placeholder="Enter quiz name"
                                onchange={onChangeName}
                                value={name}
                                error={"Add valid Quiz name"}
                                isError={isNameError}
                            />

                        </Box>

                        <Box>
                            <DropDownComponent
                                isError={isSelectedCourseError}
                                error={'Please select a course'}
                                placeholder="Select Course"
                                onchange={onCourseChange}
                                list={clist}
                                selectedValue={selectedCourseId}
                                isShowZero={false}
                                dropdownLabel="Course" />
                        </Box>

                        <Box>
                            <TextAreaComponent error={'Add valid description'} isError={isDescriptionError} value={description} onchange={onChangeDescription} textlabel={"Description"} placeholder={"Enter quiz description"} />

                        </Box>

                        <Box className="admin-quiz-form-lower-section">
                            <Box className="admin-quiz-form-horizontal-input">
                                <Box>
                                    <TextInputComponent
                                        isError={isNoQuestionError}
                                        error="Add valid Number of Questions"
                                        value={noQuestion}
                                        label={"No Of Questions"}
                                        placeholder="Enter Number of Questions"
                                        type={'number'}
                                        onchange={onChangeQuestion}
                                    />
                                </Box>

                                <Box>
                                    <TextInputComponent
                                        isError={isNoAttemptError}
                                        error="Add valid number of attempts"
                                        value={noAttempt}
                                        label={"No Of Attempts"}
                                        placeholder="Enter number of attempts"
                                        type={'number'}
                                        onchange={onChangeAttempt}
                                    />

                                </Box>
                            </Box>
                            <Box className="admin-quiz-form-horizontal-input">
                                <Box>
                                <TextInputComponent
                                        error={'please select valid time'}
                                        isError={isTimeError}
                                        value={time}
                                        label={"Time Duration (minutes)"}
                                        placeholder="Enter Time duration"
                                        type={'number'}
                                        onchange={onChangeTime}
                                    />
                                    {/* <TimePickerComponent
                                        onChange={onChangeTime}
                                        error={'please select valid time'}
                                        isError={isTimeError}
                                    /> */}
                                </Box>

                                <Box>
                                    <DropDownComponent
                                        isError={isSelectedWeekError}
                                        error={'please select a week'}
                                        isInactive={!isSelectedCourseValid}
                                        placeholder="Select a week"
                                        onchange={onCourseChangeWeek}
                                        list={weekList}
                                        selectedValue={selectedWeekId}
                                        isShowZero={false}
                                        dropdownLabel="Week" />
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </DialogContent>

            </form>


        </>
    </DialogComponent>
    );
}


export default AdminQuizForm;

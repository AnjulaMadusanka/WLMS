import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import VideoDropDownComponent from "../../../atom/Inputs/VideoDropDown";
import { COURSE_SECTION_TYPE, getText, onToast } from "../../../../core/Constant";
import { Actions } from "../../../../core/modules/Actions";
import { connect, useDispatch } from 'react-redux';
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import DropDownComponent from "../../../atom/Inputs/DropDown";


const AdminCourseWeekContent = ({ onClose, courseID, weekNo, dayNo, fetchVideo, uploadedVideoList, dataState, sectionName, courseQuizList, getCourseQuizList }) => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState('paper');
    const [expanded, setExpanded] = useState(1);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titalValid, setTitleVaid] = useState(false);

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [linkErrorMsg, setLinkErrorMsg] = useState('');
    const [isLinkValid, setIsLinkVaid] = useState(false);

    const [duration, setDuration] = useState('');
    const [durationError, setDurationError] = useState(false);
    const [durationErrorMsg, setDurationErrorMsg] = useState('Please add the valid duration');
    const [isDurationValid, setDurationValid] = useState(false);

    const [newWeekContent, setNewWeekContent] = useState([]);
    const [uploadedVideos, setUploadedVideos] = useState([]);
    const [contentDayCount, setContentDayCount] = useState(0);
    const [saveBtnValidMsg, setSaveBtnValidMsg] = useState('');

    const [type, setType] = useState(COURSE_SECTION_TYPE[0]?.id);
    const [isTypeError, setTypeError] = useState(false);
    const [isTypeValid, setTypeValid] = useState(true);

    const [quiz, setQuiz] = useState(0);
    const [isAddQuizError, setAddQuizError] = useState(false);
    const [isAddQuizValid, setAddQuizValid] = useState(true);
    const [quizs, setQuizs] = useState([])

    const dayArr = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "5" },
        { id: 6, name: "6" },
        { id: 7, name: "7" }];

    const [day, setDay] = useState('');
    const [dayError, setDayError] = useState(false);
    const [isDayValid, setDayValid] = useState(false);

    const [newSectionName, setSectionName] = useState('');
    const [sectionNameError, setSectionNameError] = useState(false);
    const [isSectionNameValid, setSectionNameValid] = useState(false);
    const [sectionNameRead, setSectionNameReadOnly] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setContentDayCount(dayNo)
        if (dataState == 0) {
            resetInput();
            setSectionName("");
            setSectionNameValid(false);
            setSectionNameError(false);
            setSectionNameReadOnly(false)

        } else {

            setSectionNameValid(true);
            setSectionNameError(false);
            setSectionName(sectionName)
        }

    }, [dayNo, dataState, sectionName]);

    useEffect(() => {

        resetInput();
        setNewWeekContent([])
        setSaveBtnValidMsg('');

    }, [onClose]);

    useEffect(() => {
        // get quiz list by course
        getCourseQuizList(courseID);
    }, [courseID]);

    useEffect(() => {
        setQuizs(courseQuizList);
    }, [courseQuizList])

    useEffect(() => {
        setNewWeekContent(newWeekContent)

    }, [newWeekContent]);


    const onAddValues = () => {
        setNewWeekContent([
            ...newWeekContent,
            {
                // "content_type": '1',
                "content_type": type == 2 && dataState == 0 ? type : 1,
                'content': title,
                'link': type == 2 && dataState == 0 ? quiz : "" + link + "",
                'duration': duration,
                'day': day,
                'is_locked': '1',
                // 'quiz_id':quiz
            }
        ]);

        setContentDayCount(contentDayCount + 1)
        resetInput();
        setSectionNameValid(true);
        setSectionNameError(false);
        setSectionNameReadOnly(true);
    }

    const onAddVideoContentToDo = () => {
        if (isLinkValid && isDurationValid && titalValid && isDayValid && isSectionNameValid) {

            onAddValues();

        } else {
            if (!isLinkValid) {
                setLinkError(true);
            }
            if (!isDurationValid) {
                setDurationError(true);
            }
            if (!titalValid) {
                setTitleError(true);
            }
            if (!isDayValid) {
                setDayError(true);
            }

            if (!isSectionNameValid) {
                setSectionNameError(true);
            }
        }

    }

    const onAddQuizToDo = () => {

        if (isAddQuizValid && isDurationValid && titalValid && isSectionNameValid) {

            onAddValues();

        } else {
            if (!isAddQuizValid) {
                setAddQuizError(true);
            }
            if (!isDurationValid) {
                setDurationError(true);
            }
            if (!titalValid) {
                setTitleError(true);
            }
            if (!isSectionNameValid) {
                setSectionNameError(true);
            }
        }
    }

    const addToList = () => {
        setSaveBtnValidMsg('');

        if (dataState == 1 || dataState == 0 && type == 1) {
            onAddVideoContentToDo()
        } else {
            onAddQuizToDo()
        }


    };

    useEffect(() => {
        fetchVideo()
        setSaveBtnValidMsg('');

    }, [])

    useEffect(() => {
        setUploadedVideos(uploadedVideoList);

    }, [uploadedVideoList]);

    const onTitleChange = (e) => {
        const text = getText(e)
        setTitle(text);
        setTitleError(false)
        const isValid = text?.length > 0;
        setTitleVaid(isValid);
    }

    const onLinkChange = (e) => {
        const text = getText(e)
        setLink(text);
        setLinkError(false)
        const isValid = text?.length > 0;
        setIsLinkVaid(isValid);
    }

    const onDurationChange = (e) => {
        const text = getText(e)
        setDuration(text);
        setDurationError(false)
        const isValid = text > 0;
        setDurationErrorMsg('Please add the valid duration')
        if (text.includes('.')) {
            setDurationErrorMsg("Decimal not allowed");
            setDurationValid(false);
        } else {
            setDurationValid(isValid);
        }


    }

    const onDayChange = (e) => {
        const text = getText(e)
        setDay(text);
        setDayError(false)
        const isValid = text > 0;
        setDayValid(isValid);
    }

    const onSectionTypeChange = (e) => {
        const text = getText(e);
        setType(text);
        setTypeError(false);
        setTypeValid(true);
    }

    const onSelectQuiz = (e) => {
        const text = getText(e);
        setQuiz(text);
        setAddQuizError(false);
        setAddQuizValid(true);
    }

    const onNewSectionChange = (e) => {
        const text = getText(e)
        setSectionName(text);
        setSectionNameError(false)
        const isValid = text?.length > 0;
        setSectionNameValid(isValid);
    }

    const resetInput = () => {
        setTitle("");
        setLink("");
        setDuration("");
        setDay("");

        setTitleVaid(false);
        setIsLinkVaid(false);
        setDurationValid(false);
        setDayValid(false);

        setLinkError(false);
        setDurationError(false);
        setTitleError(false);
        setDayError(false);


    }

    const saveAddedWeekContent = () => {

        if (newWeekContent.length > 0) {

            var json_request_data = '{"course_id": "' + courseID + '","weeks": [ {"week": "' + newSectionName + '","details": ' + JSON.stringify(newWeekContent) + '}]}';
            dispatch(Actions.course.createCourseContent(JSON.parse(json_request_data)))
            onClose();


        } else {

            setSaveBtnValidMsg('Please add at least one day course content');


        }
    }

    return (
        <>
            <form>
                <DialogContent>
                    <Grid container>
                        {dataState == 0 ? (<>
                            <Grid item xs={12} md={4}>
                                <TextInputComponent
                                    label={"Section Name"}
                                    isError={sectionNameError}
                                    placeholder="Enter section name"
                                    name={"newSectionName"}
                                    value={newSectionName}
                                    error={"Please add the section name"}
                                    onchange={onNewSectionChange}
                                    readOnly={sectionNameRead}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box>
                                    <DropDownComponent
                                        isShowZero={false}
                                        isError={isTypeError}
                                        error={'Please select a type'}
                                        readOnly={false}
                                        selectedValue={type}
                                        name="sectionType"
                                        initialValue=""
                                        list={COURSE_SECTION_TYPE}
                                        dropdownLabel="Section Type"
                                        onchange={onSectionTypeChange}
                                    />
                                </Box>
                            </Grid>
                        </>) : (<></>)}

                        {dataState == 1 || dataState == 0 && type == 1 ?
                            <>
                                <Grid item xs={12} md={3}>
                                    <Box>
                                        <DropDownComponent
                                            isShowZero={false}
                                            isError={dayError}
                                            error={'Please select day'}
                                            readOnly={false}
                                            selectedValue={day}
                                            name="day"
                                            initialValue=""
                                            list={dayArr}
                                            dropdownLabel="Day"
                                            onchange={onDayChange}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Box>
                                        <VideoDropDownComponent
                                            placeholder="Please add the video"
                                            onchange={onLinkChange}
                                            list={uploadedVideoList}
                                            selectedValue={link}
                                            dropdownLabel="Video" />
                                        {linkError ? <p className="input-error-text">Select a video </p> : null}
                                    </Box>
                                </Grid>
                            </>
                            : <>
                                <Grid item xs={12} md={3}>
                                    <Box>
                                        <DropDownComponent
                                            isShowZero={false}
                                            isError={dayError}
                                            error={'Please select a quiz'}
                                            readOnly={false}
                                            selectedValue={quiz}
                                            name="quiz"
                                            initialValue=""
                                            list={quizs}
                                            dropdownLabel="Quiz"
                                            onchange={onSelectQuiz}
                                        />
                                    </Box>
                                </Grid>
                            </>}


                        <Grid item xs={12} md={6}>
                            <Box>
                                <TextInputComponent
                                    label={"Title"}
                                    isError={titleError}
                                    placeholder="Enter Title"
                                    name={"title"}
                                    value={title}
                                    error={"Please add the title"}
                                    onchange={onTitleChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Box>
                                <TextInputComponent
                                    label={"Duration (MIN)"}
                                    isError={durationError}
                                    placeholder="Duration (MIN)"
                                    name={"duration"}
                                    value={duration}
                                    error={durationErrorMsg}
                                    type="number"
                                    onchange={onDurationChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={2} container direction="row" justifyContent="right" alignItems="right">
                            <Box mt={6} >
                                <TextButtonComponet text={"Add"} style={{ width: "80px" }} onButtonClick={() => addToList()} />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container xs={12}>
                        {newWeekContent.length > 0 ? (<>
                            <Grid item xs={12} container direction={'row'} justifyContent="center" alignItems="center" mb={2} >
                                <Box mt={1} >
                                    <HeadingComponent text={"Added Content"} fontweigth={600} size={25} fontfamily={"Montserrat"} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <table width={'100%'} style={{ fontFamily: "Montserrat, sans serif" }}>
                                        <thead>
                                            <th width={'10%'}>Day</th>
                                            <th width={'35%'}>Title</th>
                                            <th width={'40%'}>Link</th>
                                            <th width={'15%'}>Duration (Min)</th>
                                        </thead>
                                        <tbody>
                                            {newWeekContent.map((item, index) => (
                                                <> <tr><td> {item.day}</td><td>{item.content}</td><td>{item.link}</td><td>{item.duration} </td></tr></>
                                            ))}
                                        </tbody>
                                    </table>
                                </Box>
                            </Grid>
                        </>) : (<></>)}
                        <Box>
                            <b> <p className="text-center" style={{ color: 'red' }}>{saveBtnValidMsg}</p></b>
                        </Box>
                    </Grid>

                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => onClose()} />
                        <TextButtonComponet text={"Save"} width={120} onButtonClick={() => saveAddedWeekContent()} />
                    </Box>

                </DialogActions>
            </form>
        </>
    );
}

export default connect(
    state => ({
        uploadedVideoList: state.video.get("uploadedVideoList"),
        loadingAction: state.common.get("loadingAction"),
        courseQuizList: state.course.get("courseQuizList"),
    }),
    {
        fetchVideo: Actions.video.fetchVideo,
        getCourseQuizList: Actions.course.getCourseQuizList
    }
)(AdminCourseWeekContent);

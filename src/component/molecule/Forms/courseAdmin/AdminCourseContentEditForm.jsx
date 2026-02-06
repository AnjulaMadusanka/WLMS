import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from 'react-redux';
import { getText } from "../../../../core/Constant";
import { useDispatch } from 'react-redux';
import VideoDropDownComponent from "../../../atom/Inputs/VideoDropDown";
import DropDownComponent from "../../../atom/Inputs/DropDown";


const AdminCourseContentEditForm = ({ onClose, isclose, courseContentData, fetchVideo, uploadedVideoList, courseQuizList, getCourseQuizList }) => {
    const [scroll, setScroll] = useState('paper');

    const dispatch = useDispatch();
    const [content_id, setContentId] = useState(0);
    const [content_type, setContentType] = useState(0);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titalValid, setTitleVaid] = useState(false);

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [isLinkValid, setIsLinkVaid] = useState(false);

    const [duration, setDuration] = useState('');
    const [durationError, setDurationError] = useState(false);
    const [isDurationValid, setDurationValid] = useState(false);
    const [durationErrorMsg, setDurationErrorMsg] = useState('Please add the valid duration');
    
    const [is_locked, setIsLocked] = useState('');
    const [lockedError, setLockedError] = useState(false);
    const [islockedValid, setLockedValid] = useState(false);

    const [quizId, setQuizId] = useState('');
    const [quizIdError, setQuizIdError] = useState(false);
    const [quizIdValid, setQuizIdVaid] = useState(false);

    const [day, setDay] = useState('');
    const [dayError, setDayError] = useState(false);
    const [isDayValid, setDayValid] = useState(false);

    const dayArr = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "5" },
        { id: 6, name: "6" },
        { id: 7, name: "7" }];

    useEffect(() => {
        fetchVideo()
    }, [courseQuizList])

    // useEffect(() => {
    //     setTitle("");
    //     setLink("");
    //     setDuration("");
    //     setDay("");
    //     setTitleVaid(false);
    //     setIsLinkVaid(false);
    //     setDurationValid(false);
    //     setLinkError(false);
    //     setDurationError(false);
    //     setTitleError(false);

    // }, [onClose]);


    useEffect(() => {
        setTitle("");
        setLink("");
        setDuration("");
        setDay("");
        setTitleVaid(false);
        setIsLinkVaid(false);
        setDurationValid(false);
        setLinkError(false);
        setDurationError(false);
        setTitleError(false);

        setDurationError(false);


    }, [isclose]);

    useEffect(() => {

     
        setTitle(courseContentData.content);
        setLink(courseContentData.content_link);
        setDuration(courseContentData.duration);
        setContentId(courseContentData.id);
        setIsLocked(courseContentData.is_locked);
        setContentType(courseContentData.content_type);
       
        getCourseQuizList(courseContentData.course_id);
        setQuizId(courseContentData.content_link);
        setDay(courseContentData.day);

        setTitleVaid(true);
        setTitleError(false);
        setIsLinkVaid(true);
        setLinkError(false);
        setDurationValid(true);
        setDurationError(false);
        setQuizIdVaid(true);
        setQuizIdError(false);
        setDayError(false);
        setDayValid(true);


    }, [courseContentData]);


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

        if(text.includes('.')) {
            setDurationErrorMsg("Decimal not allowed");
            setDurationValid(false);
        }else{
            setDurationValid(isValid);
        }
        
    }

    const onQuizIdChange = (e) => {
        const text = getText(e)
        setQuizId(text);
        setQuizIdError(false)
        const isValid = text > 0;
        setQuizIdVaid(isValid);
    }

    const onDayChange = (e) => {
        const text = getText(e)
        setDay(text);
        setDayError(false)
        const isValid = text >= 0;
        setDayValid(isValid);
    }

    const onKeyChangeDuration = (e) => {
        const text = getText(e)
        setDuration(text);
        setDurationError(false)
        const isValid = text > 0;
        setDurationValid(isValid);
    }

    const updateCourseContent = () => {

        
        if (titalValid && isDurationValid && (content_type == '1' && isLinkValid && isDayValid || content_type == '2' && quizIdValid)) {
            const content_data = content_type == '1' ? link : quizId;
            var json_request_data = '[ {"id": "'+content_id+'","content_type": "'+content_type+'", "content":"'+title+'", "link":"'+content_data+'", "duration": "'+duration+'","is_locked":"'+is_locked+'", "day": "'+day+'" }]';
        
            dispatch(Actions.course.updateCourseContent(JSON.parse(json_request_data)));
            onClose();
        } else {

            if (!titalValid) {
                setTitleError(true);
            }

            if (!isDurationValid) {
                setDurationError(true);
            }

            if(content_type == '1'){
                if (!isLinkValid) {
                    setLinkError(true);
                }
            }else{
                if (!quizIdValid) {
                    setQuizIdError(true);
                }
            }
           
           
        }
    }

    return (
        <>
            <form>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} md={9}>
                            <Box>
                                <TextInputComponent
                                    label={"Title"}
                                    isError={titleError}
                                    placeholder="Enter title"
                                    name={"title"}
                                    value={title}
                                    error={"Please add the title"}
                                    onchange={onTitleChange}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                        {content_type == '1' ? (<>
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
                        </>) : (<></>)}
                           
             
                        </Grid>

                        <Grid item xs={12} md={12}>
                        <Box>
                        <Box>
                            {content_type == '1' ? (<>
                                <VideoDropDownComponent
                                placeholder="Please add the link"
                                onchange={onLinkChange}
                                list={uploadedVideoList}
                                selectedValue={link}
                                initialValue={""}
                                dropdownLabel="Video Link" />
                            {linkError ? <p className="input-error-text">Select video link</p> : null}
                            </>):(<>
                                <DropDownComponent
                                placeholder="Please add the quiz"
                                onchange={onQuizIdChange}
                                list={courseQuizList}
                                selectedValue={quizId}
                                initialValue={""}
                                dropdownLabel="Quiz" />
                            {quizIdError ? <p className="input-error-text">Select the quiz</p> : null}
                            </>)}
                           
                            </Box>
                        </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                keyup={onKeyChangeDuration}
                            />

                        </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <Box>
                        <Box style={{padding:10}}>
                            <p className="form-label">Lock Status</p>
                            <select className="form-control" value={is_locked} name="is_locked" id="is_locked" onChange={(e) => setIsLocked(e.target.value)}>
                                <option value={1}>Locked</option>
                                <option value={0}>Un-Lock</option>
                            </select>
                            {lockedError ? <p className="input-error-text">Please select</p> : null}

                        </Box>
                        </Box>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextButtonComponet text={"Update"} width={120} onButtonClick={() => updateCourseContent()} />
                        <TextButtonComponet text={"Close"} classStyle="btn btn-secondary" width={120} onButtonClick={() => onClose()} />
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
    }), {
    fetchVideo: Actions.video.fetchVideo,
    getCourseQuizList: Actions.course.getCourseQuizList,
},
)(AdminCourseContentEditForm);


import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { getText, onToast } from "../../../../core/Constant";
import { Actions } from "../../../../core/modules/Actions";
import { connect, useDispatch } from 'react-redux';
import HeadingComponent from "../../../../component/atom/Headings/Heading";


const AdminCourseWeekQuiz = ({ onClose, courseID, weekNo, dayNo, courseQuizList, getCourseQuizList, sectionName }) => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState('paper');
    const [expanded, setExpanded] = useState(1);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titalValid, setTitleVaid] = useState(false);

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [isLinkValid, setIsLinkVaid] = useState(false);

    const [duration, setDuration] = useState('');
    const [durationError, setDurationError] = useState(false);
    const [durationErrorMsg, setDurationErrorMsg] = useState('Please add the valid duration');
    const [isDurationValid, setDurationValid] = useState(false);

    const [newWeekContent, setNewWeekContent] = useState([]);
    const [addedQuizList, setAddedQuizList] = useState([]);

    const [saveBtnValidMsg, setSaveBtnValidMsg] = useState('');
    const items = ["", "", "", ""];

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setTitle("");
        setLink("");
        setDuration("");
        setTitleVaid(false);
        setIsLinkVaid(false);
        setDurationValid(false);
        setLinkError(false);
        setDurationError(false);
        setTitleError(false);
        setNewWeekContent([])
        setSaveBtnValidMsg('');

    }, [onClose]);

    const addToList = () => {

        setSaveBtnValidMsg('');
        if (isLinkValid && isDurationValid && titalValid) {
            setNewWeekContent([
                ...newWeekContent,
                { "content_type": '2', 'content': title, 'link': "" + link + "", 'duration': duration, 'day': '0', 'is_locked': '1' }
            ]);

            setTitle("");
            setLink("");
            setDuration("");
            setTitleVaid(false);
            setIsLinkVaid(false);
            setDurationValid(false);
            setLinkError(false);
            setDurationError(false);
            setTitleError(false);

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
        }


    };

    useEffect(() => {
       
        if (courseID) {
            getCourseQuizList(courseID)
        } else {
            
        }
        setSaveBtnValidMsg('');
    }, [courseID,sectionName])

    useEffect(() => {
        setAddedQuizList(courseQuizList);
    }, [courseQuizList]);

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
        const isValid = text > 0;
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

    const saveAddedWeekContent = () => {

        if (newWeekContent.length > 0) {

            var json_request_data = '{"course_id": "' + courseID + '","weeks": [ {"week": "' + sectionName + '","details": ' + JSON.stringify(newWeekContent) + '}]}';

            dispatch(Actions.course.createCourseContent(JSON.parse(json_request_data)))
            onClose();


        } else {

            setSaveBtnValidMsg('Please add at least one quiz');


        }
    }

    return (
        <>
            <form>
                <DialogContent>
                    <Box className="admin-course-content-form-wrap">
                        <Box className="admin-course-input-group">

                            {/* Links */}
                            <Box className="admin-course-links">
                                <Box p={1}>
                                    <DropDownComponent
                                        placeholder="Please add the quiz"
                                        onchange={onLinkChange}
                                        list={addedQuizList}
                                        selectedValue={link}
                                        initialValue={""}
                                        dropdownLabel="Quiz" />
                                    {linkError ? <p className="input-error-text">Select the quiz</p> : null}
                                </Box>
                            </Box>
                            {/* Title */}
                            <Box className="admin-course-titles">

                                <Box p={1}>
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
                            </Box>

                            {/* Duration */}
                            <Box className="admin-course-duration">
                                <Box p={1}>
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
                            </Box>
                            <Box mt={8}>

                                <TextButtonComponet text={"Add"} width={60} onButtonClick={() => addToList()} />
                            </Box>
                        </Box>
                    </Box>
                    {newWeekContent.length > 0 ? (<>
                        <Box p={3}>
                            <Box mt={4} justifyContent="center" alignItems="center">
                                <HeadingComponent text={"Added Quiz"} fontweigth={600} size={25} fontfamily={"Montserrat"} />
                            </Box>
                            <Box justifyContent="center" alignItems="center">

                                <table width={'100%'} style={{ fontFamily: "Montserrat, sans serif" }}>
                                    <thead>
                                        <th width={'60%'}>Title</th>
                                        <th width={'40%'}>Duration (Min)</th>
                                    </thead>
                                    <tbody>

                                        {newWeekContent.map((item, index) => (
                                            <> <tr><td>{item.content}</td><td>{item.duration}</td></tr></>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        </Box>

                    </>) : (<></>)}
                    <Box>
                        <b> <p className="text-center" style={{ color: 'red' }}>{saveBtnValidMsg}</p></b>
                    </Box>

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
        courseQuizList: state.course.get("courseQuizList"),
        loadingAction: state.common.get("loadingAction")
    }), {
    getCourseQuizList: Actions.course.getCourseQuizList,
}
)(AdminCourseWeekQuiz);

/*
import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { getText, onToast } from "../../../../core/Constant";
import { Actions } from "../../../../core/modules/Actions";
import { connect, useDispatch } from 'react-redux';
import HeadingComponent from "../../../../component/atom/Headings/Heading";


const AdminCourseWeekQuiz = ({ onClose, courseID, weekNo, dayNo, courseQuizList, getCourseQuizList, sectionName }) => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState('paper');
    const [expanded, setExpanded] = useState(1);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titalValid, setTitleVaid] = useState(false);

    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState(false);
    const [isLinkValid, setIsLinkVaid] = useState(false);

    const [duration, setDuration] = useState('');
    const [durationError, setDurationError] = useState(false);
    const [durationErrorMsg, setDurationErrorMsg] = useState('Please add the valid duration');
    const [isDurationValid, setDurationValid] = useState(false);

    const [newWeekContent, setNewWeekContent] = useState([]);
    const [addedQuizList, setAddedQuizList] = useState([]);

    const [saveBtnValidMsg, setSaveBtnValidMsg] = useState('');
    const items = ["", "", "", ""];

    // const dayArr = [
    //     { id: 1, name: "1" },
    //     { id: 2, name: "2" },
    //     { id: 3, name: "3" },
    //     { id: 4, name: "4" },
    //     { id: 5, name: "5" },
    //     { id: 6, name: "6" },
    //     { id: 7, name: "7" }];

    // const [day, setDay] = useState('');
    // const [dayError, setDayError] = useState(false);
    // const [isDayValid, setDayValid] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        setTitle("");
        setLink("");
        setDuration("");
        setTitleVaid(false);
        setIsLinkVaid(false);
        setDurationValid(false);
        setLinkError(false);
        setDurationError(false);
        setTitleError(false);
        setNewWeekContent([])
        setSaveBtnValidMsg('');

    }, [onClose]);

    const addToList = () => {

        setSaveBtnValidMsg('');
        if (isLinkValid && isDurationValid && titalValid) {
            setNewWeekContent([
                ...newWeekContent,
                { "content_type": '2', 'content': title, 'link': "" + link + "", 'duration': duration, 'day': 0, 'is_locked': '1' }
            ]);

            setTitle("");
            setLink("");
            setDuration("");
            setTitleVaid(false);
            setIsLinkVaid(false);
            setDurationValid(false);
            setLinkError(false);
            setDurationError(false);
            setTitleError(false);

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
        }


    };

    useEffect(() => {

        if (courseID) {
            getCourseQuizList(courseID)
        } else {

        }
        setSaveBtnValidMsg('');
    }, [courseID, sectionName])

    useEffect(() => {
        setAddedQuizList(courseQuizList);
    }, [courseQuizList]);

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
        const isValid = text > 0;
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

    const saveAddedWeekContent = () => {

        if (newWeekContent.length > 0) {

            var json_request_data = '{"course_id": "' + courseID + '","weeks": [ {"week": "' + sectionName + '","details": ' + JSON.stringify(newWeekContent) + '}]}';

            dispatch(Actions.course.createCourseContent(JSON.parse(json_request_data)))
            onClose();


        } else {

            setSaveBtnValidMsg('Please add at least one quiz');


        }
    }

    // const onDayChange = (e) => {
    //     const text = getText(e)
    //     setDay(text);
    //     setDayError(false)
    //     const isValid = text > 0;
    //     setDayValid(isValid);
    // }

    return (
        <>
            <form>
                <DialogContent>
                    <Grid container>
                        {/* <Box className="admin-course-content-form-wrap">
                        <Box className="admin-course-input-group"> */

                        {/* Links */}
                        {/* <Box className="admin-course-links">
                                <Box p={1}> */}
                            //     <Grid item xs={12} md={6}>
                            //     <DropDownComponent
                            //         placeholder="Please add the quiz"
                            //         onchange={onLinkChange}
                            //         list={addedQuizList}
                            //         selectedValue={link}
                            //         initialValue={""}
                            //         dropdownLabel="Quiz" />
                            //     {linkError ? <p className="input-error-text">Select the quiz</p> : null}
                            // </Grid>
                            {/* </Box>
                                </Box> */}
                            {/* Title */}
    
                            {/* <Grid item xs={12} md={3}>
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
                            </Grid> */}
                            {/* <Box className="admin-course-titles">
    
                                    <Box p={1}> */}
                            // <Grid item xs={12} md={3}>
                            //     <TextInputComponent
                            //         label={"Title"}
                            //         isError={titleError}
                            //         placeholder="Enter Title"
                            //         name={"title"}
                            //         value={title}
                            //         error={"Please add the title"}
                            //         onchange={onTitleChange}
                            //     />
                                {/* </Box>
                                </Box> */}
                            // </Grid>
                            {/* Duration */}
                            {/* <Box className="admin-course-duration">
                                    <Box p={1}> */}
                            // <Grid item xs={12} md={3}>
                            //     <TextInputComponent
                            //         label={"Duration (MIN)"}
                            //         isError={durationError}
                            //         placeholder="Duration (MIN)"
                            //         name={"duration"}
                            //         value={duration}
                            //         error={durationErrorMsg}
                            //         type="number"
                            //         onchange={onDurationChange}
                            //     />
                            // </Grid>
                            {/* </Box>
                                </Box> */}
    
                            // <Grid item xs={12} md={12} style={{marginTop:20}}>
                            //     <Grid container >
                            //         <Grid item xs={12} md={2} >
                            //             <TextButtonComponet text={"Add"} width={60} onButtonClick={() => addToList()} />
                            //         </Grid>
                            //     </Grid>
    
    
                            // </Grid>
                            {/* </Box> */}
                            {/* </Box> */}
    //                         {newWeekContent.length > 0 ? (<>
    //                             <Box p={3}>
    //                                 <Box mt={4} justifyContent="center" alignItems="center">
    //                                     <HeadingComponent text={"Added Quiz"} fontweigth={600} size={25} fontfamily={"Montserrat"} />
    //                                 </Box>
    //                                 <Box justifyContent="center" alignItems="center">
    
    //                                     <table width={'100%'} style={{ fontFamily: "Montserrat, sans serif" }}>
    //                                         <thead>
    //                                             <th width={'60%'}>Title</th>
    //                                             <th width={'40%'}>Duration (Min)</th>
    //                                         </thead>
    //                                         <tbody>
    
    //                                             {newWeekContent.map((item, index) => (
    //                                                 <> <tr><td>{item.content}</td><td>{item.duration}</td></tr></>
    //                                             ))}
    //                                         </tbody>
    //                                     </table>
    //                                 </Box>
    //                             </Box>
    
    //                         </>) : (<></>)}
    //                         <Box>
    //                             <b> <p className="text-center" style={{ color: 'red' }}>{saveBtnValidMsg}</p></b>
    //                         </Box>
    //                     </Grid>
    //                 </DialogContent>
    //                 <DialogActions sx={{ mr: 2, mb: 2 }}>
    //                     <Box sx={{ display: "flex", gap: 1 }}>
    //                         <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => onClose()} />
    //                         <TextButtonComponet text={"Save"} width={120} onButtonClick={() => saveAddedWeekContent()} />
    //                     </Box>
    
    //                 </DialogActions>
    //             </form>
    //         </>
    //     );
    // }
    
    // export default connect(
    //     state => ({
    //         courseQuizList: state.course.get("courseQuizList"),
    //         loadingAction: state.common.get("loadingAction")
    //     }), {
    //     getCourseQuizList: Actions.course.getCourseQuizList,
    // }
    // )(AdminCourseWeekQuiz);
    



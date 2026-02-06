import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { TimePickerComponent } from "../../../atom";
import { Actions } from "../../../../core/modules/Actions";
import { useDispatch } from 'react-redux';
import { getText, getFile } from "../../../../core/Constant";
import { connect } from 'react-redux'

const AdminAnnouncementForm = ({ resetData, courseList, getCourseList }) => {
    const dispatch = useDispatch();
    const imageRef = useRef();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [course, setCourse] = useState('');
    const [message, setMessage] = useState('');
    const [study_material, setStudyMaterial] = useState('');

    const [titleError, setTitleError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [studyMaterialError, setStudyMaterialError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [courseError, setCourseError] = useState(false);

    const [titleValid, setTitleValid] = useState(false);
    const [messageValid, setMessageValid] = useState(false);
    const [studyMaterialValid, setStudyMaterialValid] = useState(false);
    const [imageValid, setImageValid] = useState(false);
    const [courseValid, setCourseValid] = useState(false);



    const [imageErrorMsg, setImageErrorMsg] = useState('');
    const [courseErrorMsg, setCourseErrorMsg] = useState('');
    const [postBtnStatus, setPostBtnStatus] = useState(false);

    useEffect(() => {
        getCourseList()
    }, []);

    useEffect(() => {

        if (resetData) {
            formClear();
        } else {
            setPostBtnStatus(false);
        }

    }, [resetData]);

    const onTitleChange = (e) => {
        const text = getText(e)
        setTitle(text);
        setTitleError(false)
        setTitleValid(text.length > 0)
    }
    const onMessageChange = (e) => {
        const text = getText(e)
        setMessage(text);
        setMessageError(false);
        setMessageValid(text.length > 0)
    }

    const onImageChange = (e) => {
        const file = getFile(e)
        if (file != "" && file != undefined) {
            setImage(file);
            setImageError(false);
            setImageValid(true)
        } else {
            setImageValid(false)
        }
    }

    const onStudyMaterialChange = (e) => {
        const text = getText(e)
        setStudyMaterial(text);
        setStudyMaterialError(false)
        setStudyMaterialValid(text.length > 0)
    }


    const onCourseChange = (e) => {
        const Selectedvalue = getText(e);
        setCourse(Selectedvalue);
        setCourseError(false)
        setCourseValid(true)
    }

    const announcementPost = () => {

        if (titleValid && messageValid && courseValid) {
            //    setPostBtnStatus(true);
            const data = new FormData();
            data.append("title", title);
            data.append("message", message);
            data.append("course", course);
            // if(!image == ''){
            //     data.append("image", image);
            // }
            data.append("image", !image == '' ? image : '');
            data.append("study_material", study_material);

            dispatch(Actions.announcement.postAnnouncement(data))
            formClear();
        } else {
            if (!titleValid) {
                setTitleError(true);
            }
            if (!messageValid) {
                setMessageError(true);
            }
            if (!courseValid) {
                setCourseError(true);
                setCourseErrorMsg('Please select the course')
            }
            // if (!imageError) {
            //     setImageErrorMsg('Please select the image');
            //     setImageError(true)
            // }
            // if (!studyMaterialValid) {
            //     setStudyMaterialError(true);
            // }

        }
    }
    const formClear = () => {
        setTitle("");
        setStudyMaterial("");
        setCourse("");
        setMessage("");
        const form = document.getElementById('announcement_form');
        form.reset();
        setTitleError(false);
        setMessageError(false);
        setImageError(false);
        setStudyMaterialError(false);
        setCourseError(false);
        setPostBtnStatus(false);

        setTitleValid(false);
        setMessageValid(false);
        setImageValid(false);
        setStudyMaterialValid(false);
        setCourseValid(false);

    }
    return (
            <form id="announcement_form" style={{width:"100%", padding:10, backgroundColor:"#fff", borderRadius:15}}>
                <Box>
                    <Box>
                        <TextInputComponent
                            label={"Title"}
                            placeholder="Resource Title"
                            isError={titleError}
                            name={"title"}
                            value={title}
                            error="Please enter the resource title"
                            onchange={onTitleChange}
                        />

                    </Box>
                    <Box>
                        <TextAreaComponent textlabel={"Message"}
                            placeholder={"Resource Message"}
                            isError={messageError}
                            name={"message"}
                            value={message}
                            error="Please enter the resource message"
                            onchange={onMessageChange}
                        />

                    </Box>

                    <Box>
                        <DropDownComponent
                            error={courseErrorMsg}
                            isError={courseError}
                            isShowZero={true}
                            placeholder="Select Course"
                            onchange={onCourseChange}
                            list={courseList}
                            selectedValue={course}
                            dropdownLabel="Course" />
                    </Box>


                    <Box>
                        <Box  style={{padding:10}}>
                            <label className="form-label" style={{padding: 0, margin: 0, marginBottom:10, color: "#4E657C", fontSize: 19, fontWeight: 700 }}>Image</label>
                            <input
                                className="form-control"
                                type={"file"}
                                accept="image/*"
                                ref={imageRef}
                                onChange={onImageChange}
                            />
                            { imageError ? <p className="input-error-text">{imageErrorMsg}</p> : null}
                        </Box>
                        
                    </Box>

                    <Box>
                        <TextInputComponent
                            label={"Link"}
                            isError={studyMaterialError}
                            name={"study_material"}
                            value={study_material}
                            error="Please enter the link"
                            onchange={onStudyMaterialChange}
                        />

                    </Box>

                </Box>
                <Box mt={3} sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <TextButtonComponet text={"Post"} width={120} onButtonClick={() => announcementPost()} isDisabled={postBtnStatus} />
                    <TextButtonComponet text={"Clear"} classStyle="btn btn-secondary" width={120} onButtonClick={() => formClear()} />
                </Box>
            </form>

    );
}

export default connect(
    state => ({
        resetData: state.announcement.get("resetData"),
        courseList: state.course.get("commonCourseList")
    }), {
    getCourseList: Actions.course.getCourseList
}
)(AdminAnnouncementForm)

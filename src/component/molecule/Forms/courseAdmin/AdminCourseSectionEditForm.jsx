import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from 'react-redux';
import { getText } from "../../../../core/Constant";
import { useDispatch } from 'react-redux';
import VideoDropDownComponent from "../../../atom/Inputs/VideoDropDown";
import DropDownComponent from "../../../atom/Inputs/DropDown";


const AdminCourseSectionEditForm = ({ onClose, isclose, courseSectionData }) => {
    const [scroll, setScroll] = useState('paper');

    const dispatch = useDispatch();
    const [content_id, setContentId] = useState(0);

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [titalValid, setTitleVaid] = useState(false);

    useEffect(() => {
        setTitleVaid(false);
        setTitleError(false);

    }, [onClose]);


    useEffect(() => {
        setTitleVaid(false);
        setTitleError(false);
    }, [isclose]);

    useEffect(() => {

        setTitle(courseSectionData.section_name);
        setContentId(courseSectionData.section_id);
        setTitleVaid(true);
        setTitleError(false);

    }, [courseSectionData]);


    const onTitleChange = (e) => {
        const text = getText(e)
        setTitle(text);
        setTitleError(false)
        const isValid = text?.length > 0;
        setTitleVaid(isValid);
    }

    const updateCourseContent = () => { 

        if (titalValid) {
            dispatch(Actions.course.updateCourseSectionName({ content_id: content_id, week: title }));
            onClose();
        } else {

            if (!titalValid) {
                setTitleError(true);
            }           
           
        }
    }

    return (
        <>
            <form>
                <DialogContent>
                    <Box>
                        <Box>
                            <TextInputComponent
                                label={"Section Name"}
                                isError={titleError}
                                placeholder="Enter section name"
                                name={"title"}
                                value={title}
                                error={"Please add the section name"}
                                onchange={onTitleChange}
                            />
                        </Box>

                    </Box>
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
        loadingAction: state.common.get("loadingAction"),
    }), {
},
)(AdminCourseSectionEditForm);


import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from 'react-redux';
import { getText } from "../../../../core/Constant";
import { useDispatch } from 'react-redux';


const AdminVideoTitleEditForm = ({ onClose, isclose, videoData }) => {
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

        setTitle(videoData.title_name);
        setContentId(videoData.video_id);
        setTitleVaid(true);
        setTitleError(false);

    }, [videoData]);


    const onTitleChange = (e) => {
        const text = getText(e)
        setTitle(text);
        setTitleError(false)
        const isValid = text?.length > 0;
        setTitleVaid(isValid);
    }

    const updateCourseContent = () => { 

        if (titalValid) {
            dispatch(Actions.video.updateVideoTitle({ id: content_id, title: title }));
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
                                label={"Title Name"}
                                isError={titleError}
                                placeholder="Enter title name"
                                name={"title"}
                                value={title}
                                error={"Please add the title name"}
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
)(AdminVideoTitleEditForm);


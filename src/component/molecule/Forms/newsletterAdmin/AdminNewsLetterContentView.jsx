import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { IconButtonComponent, TextEditior } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";


const AdminNewsletterContentView = ({ onClose, newsletterDetails }) => {
    const [newslettercontent, setNewslettercontent] = useState();
    const [newslettertitle, setNewslettertitle] = useState();
    const [contentValid, setIsContentValid] = useState(false);
    const [contentIsError, setIsContentError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setNewslettertitle(newsletterDetails?.title);
        setNewslettercontent(newsletterDetails?.content)
    }, [newsletterDetails]);


    const onChangeContent = (text) => {
        setIsContentError(false);
        setIsContentValid(text.length > 0);
        setNewslettercontent(text);
      }
    return (
        <>
                <DialogContent>
                    <Box>
                        <TextInputComponent
                            label={"NewsLetter Title"}
                            name="name"
                            value={newslettertitle}
                            onchange={(e) => setNewslettertitle(e.target.value)}
                            placeholder="First Name"
                            readOnly={false}
                        />
                    </Box>
                    <Box>
                    <TextEditior
                            value={newslettercontent}
                            isError={contentIsError}
                            error="Please add Content"
                            label={"Content"}
                            placeholder={"Add Content"}
                        onchange={onChangeContent}
                        />
                    </Box>
                </DialogContent>

          

        </>
    );
}

export default AdminNewsletterContentView;

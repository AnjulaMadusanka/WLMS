import React, { useEffect, useRef, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { NumberInput, TextInputComponent } from "../../atom";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { Actions } from "../../../core/modules/Actions";
import TextAreaComponent from "../../atom/Inputs/TextArea";
import TextEditorTiny from "../../atom/Inputs/TextEditorTiny";


const NotificationEditForm = ({ onClose, notificationDetails }) => {
    const [notificationName, setNotificationName] = useState();
    const [notificationTitle, setNotificationTitle] = useState();
    const [notificationContent, setNotificationContent] = useState();

    const [notificationstatus, setNotificationStatus] = useState();
    const [sendingduration, setSendingDuration] = useState()
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            // setNotificationContent(editorRef.current.getContent());
            // console.log(editorRef.current.getContent());
        }
    };




    useEffect(() => {
        setNotificationName(notificationDetails?.name);
        setNotificationTitle(notificationDetails?.title)
        setNotificationContent(notificationDetails?.content)
        setNotificationStatus(notificationDetails?.status)
        setSendingDuration(notificationDetails?.sending_duration)
    }, [notificationDetails]);

    const handleSubmit = async (event) => {
        console.log(notificationContent)
        dispatch(Actions.notification.createAdminNotification({ id: notificationDetails?.id, name: notificationName, title: notificationTitle, notification_content: notificationContent, status: notificationstatus, sending_duration: sendingduration }))
        onClose();

    };
    return (
        <>
            <DialogContent>
                <Box>
                    <NumberInput
                        label={"Set Duration"}
                        name="Duration"
                        value={sendingduration}
                        onchange={(e) => setSendingDuration(e.target.value)}
                        placeholder="Set Duration"
                        readOnly={false}
                        type="number"
                    />
                </Box>
                <TextEditorTiny
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={notificationContent}
                    onEditorChange={(newContent) => setNotificationContent(newContent)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist",
                            "anchor",
                            "autolink",
                            "link",
                            "lists",
                            "searchreplace",
                            "wordcount",
                        ],
                        toolbar:
                            "blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist | " +
                            "link | outdent indent",
                        content_style: `
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 0;
                text-align: center;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .footer {
                text-align: center;
                padding: 10px 0;
                background-color: #f4f4f4;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        `,
                        extended_valid_elements: "style[type|media]",
                        valid_children: "+body[style]",
                        a11y_advanced_options: true,
                        relative_urls: false,
                        remove_script_host: false,
                    }}
                />

            </DialogContent>

            <DialogActions>
                <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
                    <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <TextButtonComponet text={"Update"} classStyle="btn btn-primary" onButtonClick={handleSubmit} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" onButtonClick={() => onClose()} />
                        </Box>
                    </Box>

                </Box>
            </DialogActions>

        </>
    );
}

export default NotificationEditForm;

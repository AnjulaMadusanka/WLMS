import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { IconButtonComponent } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";


const AdminForumEditForm = ({ onClose, forumDetails }) => {
    const [forumName, setForumName] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setForumName(forumDetails?.name);
    }, [forumDetails]);

    const handleSubmit = async (event) => {
         dispatch(Actions.forum.updateAdminForumName({forum_id:forumDetails?.id, name:forumName}))
        onClose();
    };
    return (
        <>
                <DialogContent>
                    <Box>
                        <TextInputComponent
                            label={"Forum Name"}
                            name="name"
                            value={forumName}
                            onchange={(e) => setForumName(e.target.value)}
                            placeholder="First Name"
                            readOnly={false}
                        />
                    </Box>
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

export default AdminForumEditForm;

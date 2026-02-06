import React, { useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IconButtonComponent, TextIconButtonComponent } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";




const AdminCourseContent = ({ onClose }) => {
    const [scroll, setScroll] = useState('paper');
    const navigate  = useNavigate();
    const [expanded, setExpanded] = useState(1);
    const items = ["", "","",""];



    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <>

            <form>
                <DialogContent>
                    <Box sx={{display:"flex", justifyContent:"flex-end", mb:4}}>
                        <TextIconButtonComponent  btnText={"Webinar"} icon={faUsers} onclick={()=>navigate("/admin-webinar")}/>
                    </Box>
                    {items.map((_, index) => (
                        <Accordion expanded={expanded === index + 1} onChange={handleChange(index + 1)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Week {index + 1}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box className="admin-course-content-form-wrap">
                                    <Box className="admin-course-input-group">
                                        {/* Title */}
                                        <Box className="admin-course-titles">
                                            <p className="admin-show-day">Day 01</p>
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Title"
                                                />
                                            </Box>
                                        </Box>
                                        {/* Links */}
                                        <Box className="admin-course-links">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Links"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Duration */}
                                        <Box className="admin-course-duration">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Duration (MIN)"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="admin-course-content-form-wrap">
                                    <Box className="admin-course-input-group">
                                        {/* Title */}
                                        <Box className="admin-course-titles">
                                            <p className="admin-show-day">Day 02</p>
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Title"
                                                />
                                            </Box>
                                        </Box>
                                        {/* Links */}
                                        <Box className="admin-course-links">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Links"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Duration */}
                                        <Box className="admin-course-duration">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Duration (MIN)"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>



                                <Box className="admin-course-content-form-wrap">
                                    <Box className="admin-course-input-group">
                                        {/* Title */}
                                        <Box className="admin-course-titles">
                                            <p className="admin-show-day">Day 03</p>
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Title"
                                                />
                                            </Box>
                                        </Box>
                                        {/* Links */}
                                        <Box className="admin-course-links">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Links"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Duration */}
                                        <Box className="admin-course-duration">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Duration (MIN)"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>




                                <Box className="admin-course-content-form-wrap">
                                    <Box className="admin-course-input-group">
                                        {/* Title */}
                                        <Box className="admin-course-titles">
                                            <p className="admin-show-day">Day 04</p>
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Title"
                                                />
                                            </Box>
                                        </Box>
                                        {/* Links */}
                                        <Box className="admin-course-links">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Links"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Duration */}
                                        <Box className="admin-course-duration">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Duration (MIN)"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>




                                <Box className="admin-course-content-form-wrap">
                                    <Box className="admin-course-input-group">
                                        {/* Title */}
                                        <Box className="admin-course-titles">
                                            <p className="admin-show-day">Day 05</p>
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Title"
                                                />
                                            </Box>
                                        </Box>
                                        {/* Links */}
                                        <Box className="admin-course-links">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Enter Links"
                                                />
                                            </Box>
                                        </Box>

                                        {/* Duration */}
                                        <Box className="admin-course-duration">
                                            <Box>
                                                <TextInputComponent
                                                    placeholder="Duration (MIN)"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextButtonComponet text={"Upload"} width={120} onButtonClick={() => onClose()} />
                        <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => onClose()} />
                    </Box>

                </DialogActions>
            </form>
        </>
    );
}

export default AdminCourseContent;

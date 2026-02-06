import React, { useState, useEffect } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { DatePickerComponent, TimePickerComponent } from "../../../atom";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";
import { connect } from 'react-redux';
import { convertStringDate, convertStringTime } from "../../../../core/Constant";
import dayjs from 'dayjs';
import moment from "moment";



const AdminWebinarUpdateForm = ({ onClose, courseList, getCourseList, webinarDetails, webinarById, getWebinarById, }) => {
    const dispatch = useDispatch();
    const [webinarCourse, setWebinarCourse] = useState([]);
    const [newWebinar, setNewWebinar] = useState({
        date: '',
        time: '',
        duration: '',
        course: ''
    });

    const [errors, setErrors] = useState({
        date: '',
        time: '',
        duration: '',
        course: ''
    });

    useEffect(() => {
        
        setNewWebinar({
            date: new Date(moment(webinarDetails?.date)),
            time: dayjs(webinarDetails?.time, "HH:mm:ss"),
            duration: webinarDetails?.duration,
            course: webinarDetails?.course_id
        });
        setWebinarCourse(webinarDetails?.courses);
    }, [errors, courseList, webinarDetails, webinarById]);

    useEffect(() => {
        getCourseList();
        // getWebinarById(webinarId);
    }, []);

    const emptyFormfields = () => {
        setNewWebinar({
            date: '',
            time: '',
            duration: '',
            course: ''
        })
    }

    const validateForm = () => {
        const newErrors = {
            date: '',
            time: '',
            duration: '',
            course: ''
        };

        if (!newWebinar?.date) {
            newErrors.date = "Date is required";
        }

        if (!newWebinar?.time) {
            newErrors.time = "Time is required";
        }

        if (!newWebinar?.duration) {
            newErrors.duration = "Duration is required";
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.values(newErrors).every(error => !error);
    }

    const handleChange = async (name, value) => {
        setNewWebinar({
            ...newWebinar,
            [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let convertedTime = convertStringTime(newWebinar.time);
        if (validateForm()) {
            dispatch(Actions.webinar.updateWebinarAdmin({
                id: webinarDetails?.id,
                date: convertStringDate(newWebinar.date),
                time: convertedTime?.convertTime?.time,
                time_ext: convertedTime?.convertTime?.timeExt,
                duration: newWebinar.duration,
            }));

            onClose();
            emptyFormfields();
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box>
                        <Box>
                            <DatePickerComponent
                                label={"Date"}
                                selected={newWebinar?.date}
                                dateFormat="dd/MM/yyyy"
                                onChange={(e) => handleChange('date', e)}
                                minDate={new Date()}
                            />
                        </Box>

                        <Box>
                            <TimePickerComponent
                                value={newWebinar?.time}
                                onChange={(e) => handleChange('time', e)}
                                isError={errors?.time !== "" ? true : false}
                                error={errors?.time}
                            />
                        </Box>

                        <Box>
                            <TextInputComponent
                                type="number"
                                label={"Duration (Hours)"}
                                placeholder="Enter Webinar duration"
                                name="duration"
                                value={newWebinar?.duration}
                                onchange={(e) => handleChange('duration', e.target.value)}
                                readOnly={false}
                                isError={errors?.duration !== "" ? true : false}
                                error={errors?.duration}
                            />

                        </Box>

                        {/* <Box>
                            <DropDownComponent
                                dropdownLabel={"Courses"}
                                name="course"
                                selectedValue={webinarCourse}
                                onchange={(e) => setWebinarCourse(e.target.value)}
                                readOnly={false}
                                isError={errors?.course !== "" ? true : false}
                                error={errors?.course}
                                list={courseList}
                            />

                        </Box> */}




                    </Box>
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <TextButtonComponet text={"Save"} width={120} onButtonClick={handleSubmit} />
                        <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => { onClose(); }} />
                    </Box>

                </DialogActions>
            </form>

        </>
    );
}

export default connect(
    state => ({
        courseList: state.students.get("commonCourseList"),
        webinarById: state.webinar.get("getAdminWebinarById"),
    }),
    {
        getCourseList: Actions.students.getCourseList,
        getWebinarById: Actions.webinar.getWebinarDetailsByIdAdmin,
    },
)(AdminWebinarUpdateForm);

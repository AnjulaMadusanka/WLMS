import React, { useState, useEffect } from "react";
import { Grid, Chip, Typography } from "@mui/material";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { useDispatch } from 'react-redux';
import { Actions } from "../../../../core/modules/Actions";
import { connect } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';
import _ from "lodash";

const AdminSelectCoursesForm = ({ courseList = [], webinarDetails, addCourseToWebinar, onClose }) => {
    const dispatch = useDispatch();
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (webinarDetails && Array.isArray(webinarDetails.courses) && webinarDetails.courses.length > 0) {
            const courseIds = webinarDetails.courses.map(course => course.id);
            setSelectedCourses(courseIds);
        } else {
            setSelectedCourses([]);
        }
    }, [webinarDetails, courseList]);

    const handleClick = (courseId) => {
        if (selectedCourses.includes(courseId)) {
            setSelectedCourses(selectedCourses.filter(id => id !== courseId));
        } else {
            setSelectedCourses([...selectedCourses, courseId]);
        }
        setErrorMessage("");
    };

    const handleSubmit = () => {
        if (selectedCourses.length === 0) {
            setErrorMessage("Please select at least one course.");
            return;
        }

        const webinarId = webinarDetails?.id;
        addCourseToWebinar({ webinar_id: webinarId, course_ids: selectedCourses });
        onClose();
    };

    return (
        <Grid sx={{ marginTop: 2, justifyContent: "center", marginBottom: 2 }} rowGap={1} spacing={2} container>
            {_.map(courseList, (item, index) => {
                const isSelected = selectedCourses.includes(item.id);
                return (
                    <Grid key={`${index}_course`} spacing={2} item>
                        <Chip
                            icon={isSelected ? <DoneIcon style={{ color: 'rgb(152, 52, 240)' }} /> : null}
                            label={item?.name}
                            onClick={() => handleClick(item.id)}
                            color={isSelected ? "primary" : "default"}
                            sx={{
                                backgroundColor: isSelected ? '#6e86f0' : 'default',
                                color: isSelected ? 'white' : 'default'
                            }}
                        />
                    </Grid>
                );
            })}
            {errorMessage && (
                <Grid xs={12} item>
                    <Typography color="error" align="center">
                        {errorMessage}
                    </Typography>
                </Grid>
            )}
            <Grid xs={12} spacing={2} item>
                <Grid style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} container>
                    <Grid style={{ alignSelf: 'center', display: 'flex' }} xs={12} md={8}>
                        <TextButtonComponet text={"Save"} onButtonClick={handleSubmit} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default connect(
    state => ({
        courseList: state.students.get("commonCourseList"),
    }),
    {
        getCourseList: Actions.students.getCourseList,
        getWebinarById: Actions.webinar.getWebinarDetailsByIdAdmin,
        addCourseToWebinar: Actions.webinar.addCourseToWebinar
    },
)(AdminSelectCoursesForm);

import React, { useState, useEffect } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import { DatePickerComponent, TimePickerComponent } from "../../../atom";
import { useDispatch } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import {
  convertStringDate,
  convertStringTime,
} from "../../../../core/Constant";

const AdminwebinarForm = ({ onClose, courseList, getCourseList }) => {
  const dispatch = useDispatch();
  const [newWebinar, setNewWebinar] = useState({
    date: "",
    time: "",
    duration: "",
    course: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    duration: "",
    course: "",
  });
  const [courseId, setCourseId] = useState(0);

  useEffect(() => {}, [errors, courseList]);

  useEffect(() => {
    getCourseList();
  }, []);

  const emptyFormfields = () => {
    setNewWebinar({
      date: "",
      time: "",
      duration: "",
      course: "",
    });
  };

  const validateForm = () => {
    const newErrors = {
      date: "",
      time: "",
      duration: "",
      course: "",
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
    // if (!newWebinar?.course) {
    //   newErrors.course = "Course is required";
    // }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = async (name, value) => {
    if (name == "course") {
      setCourseId(value);
    }

    setNewWebinar({
      ...newWebinar,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let convertedTime = convertStringTime(newWebinar.time);
    if (validateForm()) {
      dispatch(
        Actions.webinar.createWebinarAdmin({
          date: convertStringDate(newWebinar.date),
          time: convertedTime?.convertTime?.time,
          time_ext: convertedTime?.convertTime?.timeExt,
          duration: newWebinar.duration,
          // course: newWebinar.course,
        })
      );

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
                selected={newWebinar.date}
                dateFormat="dd/MM/yyyy"
                onChange={(e) => handleChange("date", e)}
                isError={errors?.date !== "" ? true : false}
                error={errors?.date}
                minDate={new Date()}
              />
            </Box>

            <Box>
              <TimePickerComponent
                value={newWebinar.time}
                onChange={(e) => handleChange("time", e)}
                isError={errors?.time !== "" ? true : false}
                error={errors?.time}
              />
            </Box>

            <Box>
              <TextInputComponent
                label={"Duration (MIN)"}
                placeholder="Enter Webinar duration"
                name="duration"
                value={newWebinar.duration}
                onchange={(e) => handleChange("duration", e.target.value)}
                readOnly={false}
                isError={errors?.duration !== "" ? true : false}
                error={errors?.duration}
              />
            </Box>

            {/* <Box>
              <DropDownComponent
                list={courseList}
                dropdownLabel={"Course"}
                initialValue={"Select a course"}
                selectedValue={courseId}
                onchange={(e) => handleChange("course", e.target.value)}
              />
            </Box> */}
            
          </Box>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextButtonComponet
              text={"Add"}
              width={120}
              onButtonClick={handleSubmit}
            />
            <TextButtonComponet
              text={"Cancel"}
              classStyle="btn btn-secondary"
              width={120}
              onButtonClick={() => {
                onClose();
                emptyFormfields();
                setErrors();
              }}
            />
          </Box>
        </DialogActions>
      </form>
    </>
  );
};

export default connect(
  (state) => ({
    courseList: state.students.get("commonCourseList"),
  }),
  {
    getCourseList: Actions.students.getCourseList,
  }
)(AdminwebinarForm);

import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent } from "@mui/material";
import {
  PhoneNumberComponent,
  StarRatingoComponent,
  TextInputComponent,
} from "../../../atom";
import DropDownComponent from "../../../atom/Inputs/DropDown";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import { EMAIL_REGEX, getText } from "../../../../core/Constant";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import _ from "lodash";

const AddReviewForm = ({ onclickcancel, courses, userId }) => {
  const dispatch = useDispatch();
  const [clist, setCList] = useState([]);

  const [courseId, setCourseId] = useState(0);
  const [isSelectedCourseValid, setSelectedCourseValid] = useState(false);
  const [isSelectedCourseError, setSelectedCourseError] = useState(false);

  const [rating, setRating] = useState(0);
  const [isRatedValid, setRatedValid] = useState(false);
  const [isRatedError, setRatedError] = useState(false);

  const [feedBack, setFeedBack] = useState(0);
  const [isFeedBackValid, setFeedBackValid] = useState(false);
  const [isFeedBackError, setFeedBackError] = useState(false);


  const [errors, setErrors] = useState({
    courseId: "",
    rating: "",
    feedback: "",
  });

  useEffect(() => {
    emptyForm()
    _.delay(() => {
      const list = _.map(courses, item => {
        return { ...item?.course }
      });
      if (list?.length > 0) {
        const id = list[0]?.id;
        setCourseId(id);
        setSelectedCourseError(false);
        setSelectedCourseValid(id ? true : false);

      }
      setCList(list);
    }, 500)
  }, [courses]);

  useEffect(() => { }, [errors]);


  const onCourseChange = (e) => {
    const id = getText(e);
    setCourseId(id);
    setSelectedCourseError(false);
    setSelectedCourseValid(id ? true : false);
  };

  const onFeedBackChange = (e) => {
    const value = getText(e);
    setFeedBack(value);
    setFeedBackValid(value?.length > 3);
    setFeedBackError(false)
  };

  const onRatingChange = (e) => {
    const value = getText(e);
    setRating(value);
    setRatedError(false);
    setRatedValid(value > 0)
  };


  const validateForm = () => {
    const newErrors = {
      feedback: "",
    };


    if (!isFeedBackValid) {
      newErrors.feedback = "Feedback is required";
      setFeedBackError(true);
    }
    if (!isSelectedCourseValid) {
      newErrors.courseId = "Course selection is required";
      setSelectedCourseError(true);
    }

    if (!isRatedValid) {
      newErrors.rating = "Please rate the course before submit";
      setRatedError(true);
    }

    setErrors(newErrors);
   
    // Return true if there are no errors
     return Object.values(newErrors).every((error) => !error);
   
  };

  // const handleChange = async (name, value) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(
        Actions.review.addStudentReviewByAdmin({
          user_id: userId,
          course_id: courseId,
          rating: rating,
          feedback: feedBack,
        })
      );
      onCloseDialog();
      // onclickcancel();
      // emptyFormfields();
    }
  };

  const emptyForm = () => {
    setErrors({
      courseId: "",
      rating: "",
      feedback: "",
    });
    setSelectedCourseError(false);
    setSelectedCourseValid(false);
    setFeedBackError(false);
    setFeedBackValid(false);
    setRatedError(false);
    setRatedValid(false);
    setCourseId('');
    setFeedBack('');
    setRating('');

  }

  const onCloseDialog = () => {
    emptyForm();
    onclickcancel();
  }

  return (
    <Box p={1}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box>
            <Box mt={2} mb={2}>
              <Box style={{ padding: 10 }}>
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    color: "#4E657C",
                    fontSize: 19,
                    fontWeight: 500,
                  }}
                >
                  Rating
                </p>

                <StarRatingoComponent
                  name="simple-controlled"
                  onChange={onRatingChange}
                  value={rating}
                  precision={1}
                  isError={errors.rating !== "" ? true : false}
                  error={errors?.rating}
                />
              </Box>
            </Box>
            <Box mt={2} mb={2}>
              <DropDownComponent
                isError={isSelectedCourseError}
                error={"Please select a course"}
                placeholder="Select Course"
                onchange={onCourseChange}
                list={clist}
                selectedValue={courseId}
                isShowZero={false}
                dropdownLabel="Course"
              />
            </Box>

            <Box mt={2} mb={2}>
              <TextAreaComponent
                textlabel={"Feedback"}
                name="feedback"
                value={feedBack}
                onchange={onFeedBackChange}
                placeholder="feedback"
                readOnly={false}
                isError={errors.feedback !== "" ? true : false}
                error={errors?.feedback}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Box sx={{ display: "flex", width: "50%", mr: 2.2, mb: 2, ml: 2.2 }}>
            <Box sx={{ display: "flex", gap: 0.5, flexGrow: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <TextButtonComponet
                  text="Add"
                  classStyle="btn btn-primary"
                  onButtonClick={handleSubmit}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <TextButtonComponet
                  text="Cancel"
                  classStyle="btn btn-secondary"
                  onButtonClick={onCloseDialog}
                />
              </Box>
            </Box>
          </Box>
        </DialogActions>
      </form>
    </Box>
  );
};

export default AddReviewForm;

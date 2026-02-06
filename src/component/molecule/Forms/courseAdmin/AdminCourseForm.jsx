import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, DialogActions, DialogContent, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import TextAreaComponent from "../../../atom/Inputs/TextArea";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { getText, getFile, onGetCurrencySymble } from "../../../../core/Constant";
import { useDispatch } from "react-redux";
import { IMAGE_URL } from "../../../../core/Constant";
import { SwitchButtonComponet } from "../../../atom";
import _ from "lodash";
import CurrencySelector from "../../CurrencySelector/CurrencySelector";
import ViewSelectedCurrency from "../../ViewSelectedCurrency/ViewSelectedCurrency";

const AdminCourseForm = ({
  onClose,
  isclose,
  courseID,
  getCourseMainDetails,
  mainDetailsState,
  getCourseList,
  getSystemParameters,
  systemParams,
}) => {
  const dispatch = useDispatch();
  const imageRef = useRef();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameValid, setNameVaid] = useState(false);

  const [duration, setDuration] = useState("");
  const [durationError, setDurationError] = useState(false);
  const [durationValid, setDurationVaid] = useState(false);

  const [lecturer, setLecturer] = useState("");
  const [lecturerError, setLecturerError] = useState(false);
  const [lecturerValid, setLecturerVaid] = useState(false);

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionValid, setDescriptionVaid] = useState(false);

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState(false);
  const [priceValid, setPriceVaid] = useState(false);

  const [course_image, setCourseImage] = useState(null);

  const [newImage, setNewImage] = useState("");
  const [newImageError, setNewImageError] = useState(false);
  const [newImageValid, setNewImageVaid] = useState(false);
  const [newImageErrorMsg, setNewImageErrorMsg] = useState("");

  //   const [currency_code, setCurrencyCode] = useState("$");

  const [postBtnStatus, setPostBtnStatus] = useState(false);
  const [freeCourse, setFreeCourse] = useState(0);
  const [disablePrice, setDisablePrice] = useState(false);
  const [showOnBanner, setShowOnBanner] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("");

  const [listAmount, setListAmount] = useState([]);
  const [listError, setListError] = useState(false);

  useEffect(() => {
    if (courseID == "0") {
      setName("");
      setDescription("");
      setDuration("");
      setLecturer("");
      setCourseImage(null);
      setPrice("");
      setFreeCourse(0);
      setShowOnBanner(0);
      setPostBtnStatus(false);
      imageRef.current.value = "";
      setNewImageVaid(false);
      setNameVaid(false);
      setPriceVaid(false);
      setDescriptionVaid(false);
      setLecturerVaid(false);
      setDurationVaid(false);
      setNameError(false);
      setPriceError(false);
      setDurationError(false);
      setLecturerError(false);
      setDescriptionError(false);
      setNewImageError(false);
      setDisablePrice(false);
    } else {
      setPostBtnStatus(false);
      getCourseMainDetails({
        id: courseID,
      });
    }
  }, [courseID]);

  useEffect(() => {
    setName("");
    setDescription("");
    setDuration("");
    setLecturer("");
    setCourseImage(null);
    setPrice("");
    setFreeCourse(0);
    setShowOnBanner(0);
    setPostBtnStatus(false);
    imageRef.current.value = "";
    setNewImageVaid(false);
    setNameVaid(false);
    setPriceVaid(false);
    setDescriptionVaid(false);
    setLecturerVaid(false);
    setDurationVaid(false);
    setNameError(false);
    setPriceError(false);
    setDurationError(false);
    setLecturerError(false);
    setDescriptionError(false);
    setDisablePrice(false);
  }, [isclose]);

  useEffect(() => {
    setCurrencySymbol(onGetCurrencySymble(_.get(systemParams, "system_currency", '')))
  }, [systemParams]);
  useEffect(() => {
    getSystemParameters();
  }, []);

  const clearFormOnsubmit = () => {
    setName("");
    setDescription("");
    setDuration("");
    setLecturer("");
    setCourseImage(null);
    setPrice("");
    setFreeCourse(0);
    setShowOnBanner(0);
    setPostBtnStatus(false);
    imageRef.current.value = "";
    setNewImageVaid(false);
    setNameVaid(false);
    setPriceVaid(false);
    setDescriptionVaid(false);
    setLecturerVaid(false);
    setDurationVaid(false);
    setNameError(false);
    setPriceError(false);
    setDurationError(false);
    setLecturerError(false);
    setDescriptionError(false);
    setDisablePrice(false);
  };

  useEffect(() => {
    setName(mainDetailsState?.name);
    setDescription(mainDetailsState?.description);
    setDuration(mainDetailsState?.duration);
    setLecturer(mainDetailsState?.lecturer);
    setCourseImage(mainDetailsState?.course_image);
    setPrice(mainDetailsState?.price);
    setFreeCourse(mainDetailsState?.is_free);
    setShowOnBanner(mainDetailsState?.is_top_banner);
    setPostBtnStatus(false);
    setNameVaid(true);
    setPriceVaid(true);
    setDescriptionVaid(true);
    setLecturerVaid(true);
    setDurationVaid(true);
    setNameError(false);
    setPriceError(false);
    setDurationError(false);
    setLecturerError(false);
    setDescriptionError(false);
    imageRef.current.value = "";
    const list = _.get(mainDetailsState,'course_currencies',[])
    const amList = _.map(list, i=> {
      return { amount:i?.price , ...i?.currency }
    });
  
    setListAmount(amList)
  }, [mainDetailsState]);

  const onNameChange = (e) => {
    const text = getText(e);
    setName(text);
    setNameError(false);
    const isValid = text?.length > 0;
    setNameVaid(isValid);
  };

  const onPriceChange = (e) => {
    const text = getText(e);
    setPrice(text);
    setPriceError(false);
    const isValid = text > 0;
    setPriceVaid(isValid);
  };

  const onDurationChange = (e) => {
    const text = getText(e);
    setDuration(text);
    setDurationError(false);
    const isValid = text > 0;
    setDurationVaid(isValid);
  };

  const onDescriptionChange = (e) => {
    const text = getText(e);
    setDescription(text);
    setDescriptionError(false);
    const isValid = text?.length > 0;
    setDescriptionVaid(isValid);
  };

  const onLecturerChange = (e) => {
    const text = getText(e);
    setLecturer(text);
    setLecturerError(false);
    const isValid = text?.length > 0;
    setLecturerVaid(isValid);
  };

  const onImageChange = (e) => {
    const file = getFile(e);
    setNewImageError(false);
    const isValid = file != "" && file != undefined;
    setNewImageVaid(isValid);
    setNewImage(isValid ? file : "");
  };

  const onChangekMarkAsFree = (value) => {
    let currentValue = value.target.checked;
    let freeCourseState = currentValue ? 1 : 0;
    setFreeCourse(freeCourseState);

    if (freeCourseState == 1) {
      setPrice(0);
      setDisablePrice(true);
    } else {
      setDisablePrice(false);
      setPrice(mainDetailsState?.price);
    }
  };

  const onChangeShowOnBanner = (value) => {
    let currentValue = value.target.checked;
    let freeCourseState = currentValue ? 1 : 0;
    setShowOnBanner(freeCourseState);
  };

  const updateCourseDetails = () => {
    if (nameValid && durationValid && descriptionValid && lecturerValid) {
      setPostBtnStatus(true);

      const data = new FormData();
      data.append("id", courseID);
      data.append("name", name);
      data.append("price", price);
      data.append("duration", duration);
      data.append("lecturer", lecturer);
      data.append("description", description);
      data.append("image", newImage);
      data.append("is_free", freeCourse);
      data.append("is_top_banner", showOnBanner);

      dispatch(Actions.course.updateCourseMainDetails(data));
      onClose();
    } else {
      if (!nameValid) {
        setNameError(true);
      }
      if (!durationValid) {
        setDurationError(true);
      }
      if (!descriptionValid) {
        setDescriptionError(true);
      }
      if (!lecturerValid) {
        setLecturerError(true);
      }
    }
  };

  const createCourse = () => {
    if (
      nameValid &&
      durationValid &&
      descriptionValid &&
      lecturerValid &&
      newImageValid
    ) {
      // setPostBtnStatus(true);
      const data = new FormData();

      data.append("name", name);
      data.append("price", price);
      data.append("duration", duration);
      data.append("lecturer", lecturer);
      data.append("description", description);
      data.append("image", newImage);
      data.append("is_free", freeCourse);
      data.append("is_top_banner", showOnBanner);
      dispatch(Actions.course.createCourse(data));
      clearFormOnsubmit();
      onClose();
    } else {
      if (!nameValid) {
        setNameError(true);
      }
      if (!durationValid) {
        setDurationError(true);
      }
      if (!descriptionValid) {
        setDescriptionError(true);
      }
      if (!lecturerValid) {
        setLecturerError(true);
      }
      if (!newImageValid) {
        setNewImageError(true);
        setNewImageErrorMsg("Please select the course image");
      }
    }
  };


  const onAddCurrency = ({ amount, currencyData, currency }) => {
    const index = _.findIndex(listAmount, i => i?.id == currency);
    let list = listAmount;
    if (index > -1) {
      list = _.map(listAmount, (item, i) => {
        if (i == index) {
          return { amount, ...currencyData }
        }
        return item
      })
    } else {
      list = [...listAmount, { amount, ...currencyData }]
    }
    setListAmount(list);
    setListError(false)
  }

  const onClickRemoveAmountItem = (item) => {
    const list = _.filter(listAmount, value => {
      return item?.id != value?.id
    });
    setListAmount(list)
  }

  return (
    <>
      <form>
        <DialogContent>
          <Box>
            <Grid container spacing={1}>
              <Grid md={6} xs={12}>
                <TextInputComponent
                  label={"Name"}
                  placeholder="Enter your course name"
                  value={name}
                  isError={nameError}
                  error="Please enter the course name"
                  onchange={onNameChange}
                />
              </Grid>

              {/* <Grid md={6} xs={12}>
                <TextInputComponent
                  label={`Price (${currencySymbol})`}
                  placeholder="Enter course price"
                  type={"number"}
                  value={price}
                  isError={priceError}
                  error="Please enter the valid fee"
                  onchange={onPriceChange}
                  readOnly={disablePrice}
                />
              </Grid> */}

              <Grid md={6} xs={12}>
                <TextInputComponent
                  label={"Duration (Weeks)"}
                  placeholder="Enter course duration"
                  type={"number"}
                  value={duration}
                  isError={durationError}
                  error="Please enter the valid duration"
                  onchange={onDurationChange}
                />
              </Grid>

              <Grid md={6} xs={12}>
                <TextInputComponent
                  label={"Lecturer"}
                  placeholder="Enter lecturer name"
                  value={lecturer}
                  isError={lecturerError}
                  error="Please enter the lecturer name"
                  onchange={onLecturerChange}
                />
              </Grid>

              <Grid md={12} xs={12} p={1}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item>
                    <Grid container alignItems={"center"} spacing={2}>
                      <Grid item>
                        <p
                          style={{
                            padding: 0,
                            margin: 0,
                            marginBottom: 4,
                            color: "#4E657C",
                            fontSize: 19,
                            fontWeight: 500,
                          }}
                        >
                          Mark as free
                        </p>
                      </Grid>
                      <Grid item>
                        <SwitchButtonComponet
                          checked={freeCourse == 1 ? true : false}
                          onChange={(e) => onChangekMarkAsFree(e)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {!disablePrice ? <Grid container flexDirection={"column"} mt={1} gap={1}>
                    <Grid item>
                      <CurrencySelector onClickAdd={onAddCurrency} />
                    </Grid>
                    <Grid item>
                      <ViewSelectedCurrency onClickRemove={onClickRemoveAmountItem} list={listAmount} />
                    </Grid>
                  </Grid> : null}
                  {listError ? (
                    <p className="input-error-text">{'Please add course amounts'}</p>
                  ) : null}
                </Grid>
              </Grid>

              <Grid md={12} xs={12}>
                <TextAreaComponent
                  textlabel={"Description"}
                  placeholder={"Enter course description"}
                  isError={descriptionError}
                  name={"description"}
                  value={description}
                  error="Please enter the description"
                  onchange={onDescriptionChange}
                />
              </Grid>

              <Grid md={12} xs={12}>
                <Box style={{ padding: 10 }}>
                  <p style={{ marginBottom: 10 }} className="form-label">
                    Course Image
                  </p>
                  <input
                    className="form-control"
                    type={"file"}
                    accept="image/*"
                    ref={imageRef}
                    onChange={onImageChange}
                  />
                  {newImageError ? (
                    <p className="input-error-text">{newImageErrorMsg}</p>
                  ) : null}
                </Box>
              </Grid>
              <Grid md={12} xs={12}>
                <Box style={{ padding: 10 }}>
                  {course_image != null ? (
                    <>
                      <p className="form-label">Current Course Image</p>
                      <br></br>{" "}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 3,
                        }}
                      >
                        <Avatar
                          alt="course-image"
                          src={IMAGE_URL + course_image}
                          sx={{ width: 350, height: 200, borderRadius: 3 }}
                        />
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {courseID == 0 ? (
              <TextButtonComponet
                text={"Add"}
                width={120}
                isDisabled={postBtnStatus}
                onButtonClick={() => createCourse()}
              />
            ) : (
              <TextButtonComponet
                text={"Update"}
                width={120}
                isDisabled={postBtnStatus}
                onButtonClick={() => updateCourseDetails()}
              />
            )}
            <TextButtonComponet
              text={"Cancel"}
              classStyle="btn btn-secondary"
              width={120}
              onButtonClick={() => onClose()}
            />
          </Box>
        </DialogActions>
      </form>
    </>
  );
};

export default connect(
  (state) => ({
    mainDetailsState: state.course.get("mainDetailsState"),
    systemParams: state.course.get("systemParams"),
  }),
  {
    getCourseMainDetails: Actions.course.getCourseMainDetails,
    getCourseList: Actions.course.getCourseList,
    getSystemParameters: Actions.course.getSystemParameters,
  }
)(AdminCourseForm);

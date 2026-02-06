import React, { useEffect, useState, useRef, useCallback } from "react";
import {
    SwitchButtonComponet,
    TextIconButtonComponent,
    TextInputComponent,
} from "../../../../component/atom";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import AddStudentForm from "../../../../component/molecule/Forms/AddStudentForm";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import AddReviewForm from "../../../../component/molecule/Forms/courseAdmin/AdminAddReviewForm";
import { useNavigate, useLocation } from "react-router-dom";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import _ from "lodash";
import { EMAIL_REGEX, getText } from "../../../../core/Constant";
import TextAreaComponent from "../../../../component/atom/Inputs/TextArea";
import { useDropzone } from "react-dropzone";
import {
    CurrencySelector,
    ViewSelectedCurrency,
} from "../../../../component/molecule";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const AdminCoursAddScreen = ({ createCourse }) => {
    //   const [addStudent, setAddStudent] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [studentListId, setStudentListId] = useState([]);
    const [courseName, setCourseName] = useState(0);
    const hasExecuted = useRef(1);

    const navigation = useNavigate();
    const location = useLocation();

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

    const [freeCourse, setFreeCourse] = useState(0);
    const [disablePrice, setDisablePrice] = useState(false);

    const uploadRef = useRef(null);
    const [img, setImg] = useState(null);
    const [imgPath, setImgPath] = useState("");
    const [isUploadedImg, setIsUploadedImg] = useState(false);

    const [newImageError, setNewImageError] = useState(false);
    const [newImageErrorMsg, setNewImageErrorMsg] = useState("");

    const [listAmount, setListAmount] = useState([]);
    const [listError, setListError] = useState(false);

    const [inVisible, setInVisible]=useState(0);

    const onNameChange = (e) => {
        const text = getText(e);
        setName(text);
        setNameError(false);
        const isValid = text?.length > 0;
        setNameVaid(isValid);
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

    // Hide function demo 
    // const onChangekMarkAsInvisible = (value) => {
    //     let currentValue = value.target.checked;
    //     let inVisibleState = currentValue ? 1 : 0;
    //     setInVisible(inVisibleState);
    // };

    const onChangekMarkAsFree = (value) => {
        let currentValue = value.target.checked;
        let freeCourseState = currentValue ? 1 : 0;
        setFreeCourse(freeCourseState);
        setListError(false);

        if (freeCourseState == 1) {
            // setPrice(0);
            setDisablePrice(true);
        } else {
            setDisablePrice(false);
            // setPrice(mainDetailsState?.price);
        }
    };

    const onAddCourse = () => {
        if (
            nameValid &&
            durationValid &&
            descriptionValid &&
            lecturerValid &&
            isUploadedImg &&
            (freeCourse == 1 || listAmount?.length > 0)
        ) {
            const data = new FormData();
            data.append("name", name);
            data.append('is_invisible',inVisible)
            data.append("duration", duration);
            data.append("lecturer", lecturer);
            data.append("description", description);
            data.append("is_free", freeCourse);
            data.append("image", img);
            if (freeCourse !== 1) {
                for (let i of listAmount) {
                    data.append("currency_id[]", i?.id);
                    data.append("price[]", i?.amount);
                    data.append("is_default[]", 0);
                    data.append("other_price[]", 0);
                }
            } else {
                data.append("currency_id[]", 1);
                data.append("price[]", 0);
                data.append("is_default[]", 0);
                data.append("other_price[]", 0);
            }

            createCourse(data);
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
            if (!isUploadedImg) {
                setNewImageError(true);
                setNewImageErrorMsg("Please add course image");
            }
            if (!listAmount?.length && freeCourse == 0) {
                setListError(true);
            }
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];

        if (file && file?.path) {
            // if (!isEdit) {
            //     return
            // }
            setImg(file);
            const objectUrl = URL.createObjectURL(file);
            setImgPath(objectUrl);
            setIsUploadedImg(true);
            setNewImageError(false);
        }
    }, []);

    const onAddCurrency = ({ amount, currencyData, currency }) => {
        const index = _.findIndex(listAmount, (i) => i?.id == currency);
        let list = listAmount;
        if (index > -1) {
            list = _.map(listAmount, (item, i) => {
                if (i == index) {
                    const isRemoved = item?.isRemoved;
                    return { amount, ...currencyData, isRemoved };
                }
                return item;
            });
        } else {
            list = [...listAmount, { amount, ...currencyData, isRemoved: true }];
        }
        setListAmount(list);
        setListError(false);
    };

    const onClickRemoveAmountItem = (item) => {
        const list = _.filter(listAmount, (value) => {
            return item?.id != value?.id;
        });
        setListAmount(list);
    };

    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        onDrop,
    });
    return (
        <>
            <div {...getRootProps()}>
                <Box className="main-screen-container">
                    <Grid container direction="row" justifyContent="space-between">
                        <Grid item>
                            <HeadingComponent
                                text={`Add Course`}
                                fontweigth={600}
                                size={40}
                                fontfamily={"Montserrat"}
                                backNavigation={true}
                            />
                        </Grid>
                    </Grid>

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
                    </Grid>

                    {/* invisible */}
                    {/* <Grid md={12} xs={12} p={1}>
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
                                            Mark as Invisible Course
                                        </p>
                                    </Grid>
                                    <Grid item>
                                        <SwitchButtonComponet
                                            checked={inVisible == 1 ? true : false}
                                            onChange={(e) => onChangekMarkAsInvisible(e)}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> */}

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
                        </Grid>
                    </Grid>




                    {!disablePrice ? (
                        <Grid container flexDirection={"column"} mt={1} gap={1}>
                            <Grid item>
                                <CurrencySelector onClickAdd={onAddCurrency} />
                            </Grid>
                            {listAmount.length > 0 ? (
                                <Grid item>
                                    <ViewSelectedCurrency
                                        onClickRemove={onClickRemoveAmountItem}
                                        list={listAmount}
                                    />
                                </Grid>
                            ) : null}
                        </Grid>
                    ) : null}
                    {listError ? (
                        <p className="input-error-text">{"Please add course amounts"}</p>
                    ) : null}

                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <TextAreaComponent
                                textlabel={"Description"}
                                placeholder={"Enter course description"}
                                isError={descriptionError}
                                name={"description"}
                                value={description}
                                error="Please enter the description"
                                onchange={onDescriptionChange}
                                height={150}
                            />
                        </Grid>
                        <Grid xs={2} item>
                            <Box style={{ padding: 10 }}>
                                <p
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                        color: "#4E657C",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Montserrat",
                                        marginBottom: 10,
                                    }}
                                >
                                    Image
                                </p>
                                <button
                                    onClick={open}
                                    className="btn"
                                    type={"button"}
                                    style={{
                                        borderRadius: 15,
                                        borderColor: "#778fa7",
                                        backgroundColor: "#ffffff",
                                        height: "80px",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: 12,
                                    }}
                                    title="Click to upload"
                                >
                                    <UploadSvg />
                                    <span>Click to upload</span>
                                </button>
                            </Box>
                            {newImageError ? (
                                <p className="input-error-text">{newImageErrorMsg}</p>
                            ) : null}
                        </Grid>
                        <Grid
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 4,
                            }}
                            xs={7}
                            item
                        >
                            <img
                                className="uploadImageForum"
                                src={imgPath}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        rowGap={4}
                        container
                        direction={"row"}
                        justifyContent={"center"}
                    >
                        <Grid item xs={2}>
                            <Box pt={4}>
                                <TextButtonComponet text={"Add"} onButtonClick={onAddCourse} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} />
                    </Grid>
                    <input
                        {...getInputProps()}
                        style={{ display: "none" }}
                        type={"file"}
                    />
                </Box>
            </div>
        </>
    );
};

export default connect(
    (state) => ({
        verifyEmailData: state.auth.get("verifyEmailData"),
    }),
    {
        validateEmail: Actions.auth.validateEmail,
        createCourse: Actions.course.createCourse,
    }
)(AdminCoursAddScreen);

const UploadSvg = () => {
    return (
        <svg
            width="30%"
            height="50%"
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M36.2916 32.1249L45.8333 22.5416V62.4999C45.8333 63.605 46.2722 64.6648 47.0536 65.4462C47.835 66.2276 48.8949 66.6666 49.9999 66.6666C51.105 66.6666 52.1648 66.2276 52.9462 65.4462C53.7276 64.6648 54.1666 63.605 54.1666 62.4999V22.5416L63.7083 32.1249C64.0956 32.5154 64.5564 32.8254 65.0642 33.0369C65.5719 33.2485 66.1165 33.3574 66.6666 33.3574C67.2166 33.3574 67.7612 33.2485 68.269 33.0369C68.7767 32.8254 69.2376 32.5154 69.6249 32.1249C70.0155 31.7376 70.3254 31.2767 70.537 30.769C70.7485 30.2612 70.8574 29.7166 70.8574 29.1666C70.8574 28.6165 70.7485 28.0719 70.537 27.5642C70.3254 27.0564 70.0155 26.5956 69.6249 26.2082L52.9583 9.54156C52.562 9.16222 52.0947 8.86487 51.5833 8.66656C50.5688 8.24982 49.431 8.24982 48.4166 8.66656C47.9051 8.86487 47.4379 9.16222 47.0416 9.54156L30.3749 26.2082C29.9864 26.5967 29.6783 27.0579 29.468 27.5655C29.2578 28.0731 29.1495 28.6171 29.1495 29.1666C29.1495 29.716 29.2578 30.26 29.468 30.7676C29.6783 31.2752 29.9864 31.7364 30.3749 32.1249C30.7634 32.5134 31.2246 32.8216 31.7322 33.0318C32.2398 33.2421 32.7838 33.3503 33.3333 33.3503C33.8827 33.3503 34.4267 33.2421 34.9343 33.0318C35.4419 32.8216 35.9031 32.5134 36.2916 32.1249ZM87.4999 49.9999C86.3949 49.9999 85.335 50.4389 84.5536 51.2203C83.7722 52.0017 83.3333 53.0615 83.3333 54.1666V79.1666C83.3333 80.2716 82.8943 81.3314 82.1129 82.1129C81.3315 82.8943 80.2717 83.3332 79.1666 83.3332H20.8333C19.7282 83.3332 18.6684 82.8943 17.887 82.1129C17.1056 81.3314 16.6666 80.2716 16.6666 79.1666V54.1666C16.6666 53.0615 16.2276 52.0017 15.4462 51.2203C14.6648 50.4389 13.605 49.9999 12.4999 49.9999C11.3949 49.9999 10.335 50.4389 9.55364 51.2203C8.77224 52.0017 8.33325 53.0615 8.33325 54.1666V79.1666C8.33325 82.4818 9.65021 85.6612 11.9944 88.0054C14.3386 90.3496 17.518 91.6666 20.8333 91.6666H79.1666C82.4818 91.6666 85.6612 90.3496 88.0054 88.0054C90.3496 85.6612 91.6666 82.4818 91.6666 79.1666V54.1666C91.6666 53.0615 91.2276 52.0017 90.4462 51.2203C89.6648 50.4389 88.605 49.9999 87.4999 49.9999Z"
                fill="#4A6375"
            />
        </svg>
    );
};

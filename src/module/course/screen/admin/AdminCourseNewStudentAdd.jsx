import React, { useEffect, useState, useRef } from "react";
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

const AdminCourseNewStudentAddScreen = ({
  validateEmail,
  verifyEmailData,
  createAdminNewStudent,
  getCourseCurruncies,
  courseCurrencies,
}) => {
  //   const [addStudent, setAddStudent] = useState(false);

  const [courseId, setCourseId] = useState(0);
  const [studentListId, setStudentListId] = useState([]);
  const [courseName, setCourseName] = useState(0);
  const hasExecuted = useRef(1);

  const navigation = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [fName, setFName] = useState("");
  const [isFNameValid, setIsFNameValid] = useState(false);
  const [fNameError, setFNameError] = useState(false);

  const [lName, setLName] = useState("");
  const [isLNameValid, setIsLNameValid] = useState(false);
  const [lNameError, setLNameError] = useState(false);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyId, setCurrencyId] = useState(0);
  const [currencyError, setCurrencyError] = useState(false);

  const onChangeFirstName = (e) => {
    const text = getText(e);
    setFName(text);
    setFNameError(false);
    setIsFNameValid(text?.length > 0);
  };

  const onChangeLastName = (e) => {
    const text = getText(e);
    setLName(text);
    setLNameError(false);
    setIsLNameValid(text?.length > 0);
  };

  const onEmailChange = (e) => {
    const text = getText(e);
    let isValid = false;
    const reg = EMAIL_REGEX;
    if (text.trim().length > 3) {
      isValid = reg.test(text.trim());
    }
    setEmail(text);
    setIsEmailValid(isValid);
    setEmailErrorMessage("Please add valid email");
    setEmailError(false);
    if (isValid) {
      onEmailVerify(text);
      setStatusIndex(1);
    }
  };

  const onSelectCurrency = (e) => {
    const currencyValue = e?.target.value;
    setCurrencyId(currencyValue);
    if(e?.target?.value > 0 ){
      setCurrencyError(false);
    }else{
      setCurrencyError(true);
    }
  };

  const onEmailVerify = _.debounce((email) => {
    validateEmail({ email });
  }, 1500);

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (verifyEmailData?.status && verifyEmailData?.status_code == 1) {
      setIsEmailValid(false);
      setEmailError(true);
      setEmailErrorMessage(verifyEmailData?.message);
    } else {
      setIsEmailValid(true);
      setEmailError(false);
    }
    setStatusIndex(0);
  }, [verifyEmailData, statusIndex]);

  useEffect(() => {
    const id = location?.state?.id;
    setCourseId(id);
    setCourseName(location?.state?.courseData[1]);
  }, [location]);

  useEffect(() => {
    getCourseCurruncies(location?.state?.id);
  }, []);

  useEffect(() => {
    const currenciesArr = courseCurrencies?.map((item) => {
      return item?.currency;
    });
    setCurrencyList(currenciesArr);
  }, [courseCurrencies]);

  // useEffect(() => {
  //     if (!hasExecuted.current === 1) {
  //         courseList?.unshift({
  //             id: 0,
  //             name: "All Courses",
  //         });
  //         hasExecuted.current = true;
  //     }
  // }, []);

  const onAddStudent = () => {
    console.log(currencyId, " klkl ", currencyError)
    if (isEmailValid && isFNameValid && isLNameValid && currencyId > 0) {
      createAdminNewStudent({
        first_name: fName,
        last_name: lName,
        email,
        course_id: location?.state?.id,
        currency_id: currencyId,
      });
    } else {
      if (!isEmailValid) {
        setEmailError(true);
      }
      if (!isLNameValid) {
        setLNameError(true);
      }
      if (!isFNameValid) {
        setFNameError(true);
      }
      if(currencyId <= 0){
        setCurrencyError(true);
      }
     
    }
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={`Add new students to ${courseName}`}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
              backNavigation={true}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Grid item md={6} xs={12}>
          <TextInputComponent
            label={"First Name"}
            placeholder="First Name"
            name="first_name"
            value={fName}
            onchange={onChangeFirstName}
            isError={fNameError}
            error={"Please add first name"}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInputComponent
            label={"Last Name"}
            name="last_name"
            value={lName}
            onchange={onChangeLastName}
            placeholder="Last Name"
            isError={lNameError}
            error={"Please add last name"}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextInputComponent
            label={"Email"}
            value={email}
            placeholder="Email"
            name="email"
            onchange={onEmailChange}
            isError={emailError}
            error={emailErrorMessage}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <DropDownComponent
            isShowZero={false}
            dropdownLabel="Currency"
            selectedValue={currencyId}
            onchange={onSelectCurrency}
            list={currencyList}
            error="Please select a currency"
            isError={currencyError}
          />
        </Grid>
      </Grid>
      <Grid rowGap={4} container direction={"column"} justifyContent={"center"}>
        <Grid item></Grid>
        <Grid xs={6} item>
          <Grid justifyContent={"center"} container>
            <Grid item>
              <TextIconButtonComponent
                buttonStyleClass="btn btn-primary"
                // icon={faUserPlus}
                btnText={"Add new student"}
                onclick={() => onAddStudent()}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state) => ({
    verifyEmailData: state.auth.get("verifyEmailData"),
    courseCurrencies: state.course.get("courseCurrencies"),
  }),
  {
    validateEmail: Actions.auth.validateEmail,
    createAdminNewStudent: Actions.students.createAdminNewStudent,
    getCourseCurruncies: Actions.course.getCourseCurrencies,
  }
)(AdminCourseNewStudentAddScreen);

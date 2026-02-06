import React, { useEffect, useState, useRef } from "react";
import {
  SwitchButtonComponet,
  TextIconButtonComponent,
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

const AdminCourseStudentManageScreen = ({
  getAdminCourseStudentList,
  courseStudentsList,
  updateStudentCourseStatus,
  getStudentListNotRegisteredInACourse,
  notRegisteredInACourse,
  addExistingStudentsToACourse,
  getCourseCurruncies,
  courseCurrencies,
}) => {
  //   const [addStudent, setAddStudent] = useState(false);
  const [OpenReview, setOpenReview] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [studentListId, setStudentListId] = useState([]);
  const [courseName, setCourseName] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyId, setCurrencyId] = useState(0);
  const [currencyError, setCurrencyError] = useState(false);
  const hasExecuted = useRef(1);

  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const id = location?.state?.id;
    setCourseId(id);
    setCourseName(location?.state?.courseData[1]);

    getStudentListNotRegisteredInACourse(id);

    getAdminCourseStudentList({
      course: id,
      type: 2,
    });
    // getCourseList();
  }, [location]);

  useEffect(() => {
    const list = _.map(notRegisteredInACourse, (item) => {
      const courseStatus = false;
      return { ...item, courseStatus };
    });

    setStudentList(list);
  }, [notRegisteredInACourse]);

  useEffect(() => {
    getCourseCurruncies(location?.state?.id);
  }, []);

  useEffect(() => {
    const currenciesArr = courseCurrencies?.map((item) => {
      return item?.currency;
    });
    setCurrencyList(currenciesArr);
  }, [courseCurrencies]);

  const onSelectCurrency = (e) => {
    const currencyValue = e?.target.value;
    setCurrencyId(currencyValue);
    if (currencyValue > 0) {
      setCurrencyError(false);
    } else {
      setCurrencyError(true);
    }
  };

  // useEffect(() => {
  //     if (!hasExecuted.current === 1) {
  //         courseList?.unshift({
  //             id: 0,
  //             name: "All Courses",
  //         });
  //         hasExecuted.current = true;
  //     }
  // }, []);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //     name: "course_id",
    //     label: "",
    //     options: {
    //         filter: true,
    //         sort: false,
    //         display: false,
    //     },
    // },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  // const updateAdminStatus = (tableMeta, value) => {
  //     const updatedStudents = studentList?.map((item) => {
  //         if (item?.id == tableMeta?.rowData[0]) {
  //             const { courseStatus, id } = item;
  //             // const currentStatus = item?.is_active;
  //             const updatedStatus = courseStatus ? 0 : 1;
  //             // const updatedStatus = currentStatus == 1 ? 0 : 1;
  //             updateStudentCourseStatus({
  //                 user_id: id,
  //                 course_id: courseId,
  //                 status: updatedStatus
  //             })
  //             return { ...item, courseStatus: updatedStatus };
  //         }
  //         return item;
  //     });

  //     setStudentList(updatedStudents);
  // };

  const onAddStudent = () => {
    const params = {
      course_id: courseId,
      currency_id: currencyId,
      users: studentListId,
    };
    console.log(currencyError);
    if (currencyId > 0 && !currencyError) {
      addExistingStudentsToACourse(params, location?.state);
    } else {
      if (currencyId <= 0) {
        setCurrencyError(true);
      }
    }
  };

  const onRowsSelect = (currentRowsSelected, allRowsSelected) => {
    // setStudentListId(allRowsSelected)
    const list = _.map(allRowsSelected, (item, index) => {
      const user = _.find(studentList, (data, id) => {
        return id == item?.dataIndex;
      });
      return user?.id;
    });

    setStudentListId(list);
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item md={10} xs={12}>
            <HeadingComponent
              text={`Add Students to ${courseName}`}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
              backNavigation={true}
            />
          </Grid>

          <Grid item md={2} xs={12}>
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

        <Box className="common-admin-content-wrap">
          <TableComponent
            rowsPerPage={8}
            onRowsSelect={onRowsSelect}
            selectableRowsHideCheckboxes={false}
            columns={columns}
            data={studentList}
            filter={false}
          />
        </Box>
      </Box>
      <Grid container direction={"row"} justifyContent="space-between">
        <Grid item style={{ paddingRight: "20px" }}></Grid>
        <Grid item>
          <TextIconButtonComponent
            buttonStyleClass="btn btn-primary"
            // icon={faUserPlus}
            btnText={"Add"}
            onclick={() => onAddStudent()}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state) => ({
    courseStudentsList: state.course.get("courseStudentsList"),
    courseList: state.students.get("commonCourseList"),
    studentStatus: state.students.get("studentStatusUpdate"),
    notRegisteredInACourse: state.course.get("notRegisteredInACourse"),
    courseCurrencies: state.course.get("courseCurrencies"),
  }),
  {
    getAdminCourseStudentList: Actions.course.getAdminCourseStudentList,
    updateStudentCourseStatus: Actions.course.updateStudentCourseStatus,
    getCourseList: Actions.students.getCourseList,
    updateStudentStatus: Actions.students.updateStudentStatus,
    getStudentListNotRegisteredInACourse:
      Actions.course.getStudentListNotRegisteredInACourse,
    addExistingStudentsToACourse: Actions.course.addExistingStudentsToACourse,
    getCourseCurruncies: Actions.course.getCourseCurrencies,
  }
)(AdminCourseStudentManageScreen);

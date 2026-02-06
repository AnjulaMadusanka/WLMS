import React, { useEffect, useState, useRef } from "react";
import {
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../component/atom";
import { Box, Grid, LinearProgress, Stack } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import TableComponent from "../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../component/atom/Dialog/Dialog";
import AddStudentForm from "../../../component/molecule/Forms/AddStudentForm";
import { faUserPlus ,faLaptop} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import AddReviewForm from "../../../component/molecule/Forms/courseAdmin/AdminAddReviewForm";
import { ResetDeviceIdForm } from "../../../component/molecule/Forms";
import { useNavigate } from "react-router-dom";
import _ from 'lodash'


const StudentsScreen = ({
  getAdminUserDetails,
  adminStudents,
  courseList,
  getCourseList,
  studentStatus,
  updateStudentStatus,
  coursecatalog,
  getCousreCatalog,
}) => {
  const [addStudent, setAddStudent] = useState(false);
  const [OpenReview, setOpenReview] = useState(false);
  const [resetDeviceId, setResetDeviceId]= useState(false);
  const [studentList, setStudentList] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [studentPaymentData, setStudentPaymentData] = useState([]);

  const hasExecuted = useRef(1);
  const navigate = useNavigate();

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    setStudentList(adminStudents);
  }, [adminStudents, courseList, studentList, studentStatus]);



  useEffect(() => {
    getAdminUserDetails({
      course: "",
      type: 2,
    });
    getCourseList();
    getCousreCatalog()
  }, []);

  useEffect(() => {
    if (!hasExecuted.current === 1) {
      courseList?.unshift({
        id: 0,
        name: "All Courses",
      });
      hasExecuted.current = true;
    }
  }, []);

  const onNavigateUser = (tableMeta,value) =>{
    for (const item of studentList) {
      if (item?.id == tableMeta?.rowData[0]) {
        onNavigate("/admin-course-student-progress", {
          state: { studentId: _.get(item, "id", ""), student: item },
        });
      }
    }

  }

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "course_id",
      label: "",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
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
    {
      name: "payment_details",
      label: "Enrolled Course",
      options: {
        filter: true,
        sort: false,
        display: true,
        customBodyRender: (value) => {
          return value?.map((item) => (
            <>
              <ul>
                <li>{item?.course?.name}</li>
              </ul>
            </>
          ));
        },
      },
    },
    {
      name: "course_progress",
      label: "Progress",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const progressData = Array.isArray(value) ? value : [value]; 
          return (
            <Stack spacing={1}>
              {progressData.map((progress, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress?.progress || 0} 
                    sx={{ width: '100%', marginRight: 1 }}
                  />
                  <span>{`${Math.round(progress?.progress)}%`}</span>
                </Box>
              ))}
            </Stack>
          );
        },
      },
    }
,    

    {
      name: "is_active",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <SwitchButtonComponet
              checked={value ? true : false}
              onChange={() => updateAdminStatus(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },
    {
      name: "id",
      label: "Add Review",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box sx={{ minWidth: 150 }}>
              <TextButtonComponet
                text={"Add Review"}
                onButtonClick={() => addReviewBtn(value, tableMeta)}
              />
            </Box>
          );
        },
      },
    },
    {
      name: "id",
      label: "Progress",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box sx={{ minWidth: 100 }}>
              <TextButtonComponet
                text={"View Progress"}
                onButtonClick={() => onNavigateUser(tableMeta, value)}
              />
            </Box>
          );
        },
      },
    },
    
  ];

  const updateAdminStatus = (tableMeta) => {
    const updatedStudents = studentList?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.is_active;
        const updatedStatus = currentStatus == 1 ? 0 : 1;
        updateStudentStatus({
          user_id: tableMeta?.rowData[0],
          status: updatedStatus,
        });
        return { ...item, updatedStatus };
      }
      return item;
    });

    setStudentList(updatedStudents);
  };

  const filterStudentsDetails = (courseId) => {
    setCourseId(courseId);
    getAdminUserDetails({
      course: courseId == 0 ? "" : courseId,
      type: 2,
    });
  };

  const addReviewBtn = (value, tableMeta) => {
    setStudentId(value);
    setCourseId(tableMeta?.rowData[1]);
    setOpenReview(true);
    setStudentPaymentData(tableMeta?.rowData[5])
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item><HeadingComponent
            text={"Students"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
          /></Grid>

          <Grid item className="student-search-btn-section">
            <Box style={{marginRight:10}}>
              <TextIconButtonComponent
                buttonStyleClass="btn btn-primary"
                icon={faLaptop}
                btnText={"Reset device id"}
                onclick={() => {
                  setResetDeviceId(true)
                }}
              />
            </Box>
            <TextIconButtonComponent
              buttonStyleClass="btn btn-primary"
              icon={faUserPlus}
              btnText={"Add Student"}
              onclick={() => setAddStudent(true)}
            />
            <Box className="student-search-btn-inner-section">
              <DropDownComponent
                list={courseList}
                initialValue={"All Courses"}
                selectedValue={courseId}
                onchange={(e) => filterStudentsDetails(e.target.value)}
                placeholder={"All Courses"}
              />
            </Box>
          </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={studentList} filter={false} />
        </Box>
      </Box>

      <DialogComponent
        title={"Reset Device Id"}
        children={
          <ResetDeviceIdForm
            onclickcancel={() => setResetDeviceId(false)}
          />
        }
        onClose={() => setResetDeviceId(false)}
        open={resetDeviceId}
      />

      <DialogComponent
        title={"Add Student"}
        children={
          <AddStudentForm
            dropdownList={courseList}
            onclickcancel={() => setAddStudent(false)}
          />
        }
        onClose={() => setAddStudent(false)}
        open={addStudent}
      />
      <DialogComponent
        title={"Add Review"}
        children={
          <AddReviewForm
            courseId={courseId}
            courses={studentPaymentData}
            userId={studentId}
            dropdownList={courseList}
            onclickcancel={() => setOpenReview(false)}
          />
        }
        onClose={() => setOpenReview(false)}
        open={OpenReview}
      />
    </>
  );
};

export default connect(
  (state) => ({
    adminStudents: state.students.get("adminStudents"),
    courseList: state.students.get("commonCourseList"),
    studentStatus: state.students.get("studentStatusUpdate"),
    coursecatalog: state.course.get("coursecatalog"),
  }),
  {
    getAdminUserDetails: Actions.students.getAdminUserDetails,
    getCourseList: Actions.students.getCourseList,
    updateStudentStatus: Actions.students.updateStudentStatus,
    getCousreCatalog: Actions.course.getCousreCatalog,
  }
)(StudentsScreen);

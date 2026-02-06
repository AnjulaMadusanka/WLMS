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
  courseList,
  // getCourseList,
  studentStatus,
  updateStudentStatus,
}) => {
  //   const [addStudent, setAddStudent] = useState(false);
  const [OpenReview, setOpenReview] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [courseName, setCourseName] = useState(0);
  const hasExecuted = useRef(1);
  const navigate = useNavigate();

  const location = useLocation();
  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    const id = location?.state?.id;
    setCourseId(id);
    setCourseName(location?.state?.courseData[1]);
    getAdminCourseStudentList({
      course: id,
      type: 2,
    });
    // getCourseList();
  }, [location]);

  useEffect(() => {
    const list = _.map(courseStudentsList, (item) => {
      const courseStatus = item?.payment_details[0]?.status;
      return { ...item, courseStatus };
    });

    setStudentList(list);
  }, [courseStudentsList]);

  // useEffect(() => {
  //     if (!hasExecuted.current === 1) {
  //         courseList?.unshift({
  //             id: 0,
  //             name: "All Courses",
  //         });
  //         hasExecuted.current = true;
  //     }
  // }, []);

  const onNavigateUser = (tableMeta,value) =>{
    // for (const item of list) {
    //   console.log(item?.id, tableMeta?.rowData[0], 'itemmmmmmm')

    //   if (item?.id == tableMeta?.rowData[0]) {
    //     // navigate("/admin-view-forum",{ state: { forumId: _.get(item, 'id', ''), forum: item } })
    //     console.log(item?.id, tableMeta?.rowData[0], 'itemmmmmmm')
    //     onNavigate("/admin-view-newsletter", {
    //       state: { newsLetterId: _.get(item, "id", ""), newsLetter: item },
    //     });
    //   }
    // }
    onNavigate("/admin-course-student-progress",{});

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
      name: "courseStatus",
      label: "Course Status",
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
    }
  ];

  const updateAdminStatus = (tableMeta, value) => {
    const updatedStudents = studentList?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const { courseStatus, id } = item;
        // const currentStatus = item?.is_active;
        const updatedStatus = courseStatus ? 0 : 1;
        // const updatedStatus = currentStatus == 1 ? 0 : 1;
        updateStudentCourseStatus({
          user_id: id,
          course_id: courseId,
          status: updatedStatus,
        });
        return { ...item, courseStatus: updatedStatus };
      }
      return item;
    });

    setStudentList(updatedStudents);
  };

  //   const filterStudentsDetails = (courseId) => {
  //     setCourseId(courseId);
  //     console.log(courseId)
  //     getAdminUserDetails({
  //       course: courseId == 0 ? "" : courseId,
  //       type: 2,
  //     });
  //   };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={`${courseName}`}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
              backNavigation={true}
            />
          </Grid>

          <Grid
            xs={{ marginTop: 2 }}
            xl={{ marginTop: 0 }}
            item
            className="student-search-btn-section"
          >
            <Grid container direction={"row"} justifyContent="space-between">
              <Grid item style={{ paddingRight: "20px" }}>
                <TextIconButtonComponent
                  buttonStyleClass="btn btn-primary"
                  icon={faUserPlus}
                  btnText={"Add New Student"}
                  onclick={() => {
                    navigate("/admin-course-student-new-add-registered", {
                      state: { ...location?.state },
                    });
                  }}
                />
              </Grid>
              <Grid xs={{ marginTop: 2 }} sm={{ marginTop: 2 }} item>
                <TextIconButtonComponent
                  buttonStyleClass="btn btn-secondary"
                  icon={faUserPlus}
                  btnText={"Add Registered Students"}
                  onclick={() => {
                    navigate("/admin-course-student-add-registered", {
                      state: { ...location?.state },
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={studentList} filter={false} />
        </Box>
      </Box>

      {/* <DialogComponent
        title={"Add Student"}
        children={
          <AddStudentForm
            dropdownList={courseList}
            onclickcancel={() => setAddStudent(false)}
          />
        }
        onClose={() => setAddStudent(false)}
        open={addStudent}
      /> */}
      {/* <DialogComponent
        title={"Add Review"}
        children={
          <AddReviewForm
            courseId={courseId}
            courses={courseList}
            userId={studentId}
            dropdownList={courseList}
            onclickcancel={() => setOpenReview(false)}
          />
        }
        onClose={() => setOpenReview(false)}
        open={OpenReview}
      /> */}
    </>
  );
};

export default connect(
  (state) => ({
    courseStudentsList: state.course.get("courseStudentsList"),
    courseList: state.students.get("commonCourseList"),
    studentStatus: state.students.get("studentStatusUpdate"),
  }),
  {
    getAdminCourseStudentList: Actions.course.getAdminCourseStudentList,
    updateStudentCourseStatus: Actions.course.updateStudentCourseStatus,
    getCourseList: Actions.students.getCourseList,
    updateStudentStatus: Actions.students.updateStudentStatus,
  }
)(AdminCourseStudentManageScreen);

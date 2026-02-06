import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  IconButtonComponent,
  SearchBarComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../../component/atom";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminCourseContent,
  AdminCourseForm,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import AdminCourseFormView from "../../../../component/molecule/Forms/courseAdmin/AdminCourseView";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";


const AdminCourseScreen = ({
  courseList,
  getCourseList,
  updateCourseStatus,
  deleteCourse,
}) => {
  const navigate = useNavigate();
  const [addCourse, setAddCourse] = useState(false);
  const [viewCourse, setViewCourse] = useState(false);
  const [editCourse, setEditCourse] = useState(false);
  const [deleteCoursePopup, setDeleteCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [currentSelectedID, setCurrentSelectedID] = useState(0);
  const [deleteCourseID, setDeleteCourseID] = useState(0);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    setCourses(courseList);
  }, [courseList]);

  useEffect(() => {
    getCourseList();
  }, []);

  const loadCourseViewModal = (course_id) => {
    setCurrentSelectedID(course_id);
    setViewCourse(true);
  };

  const loadCourseEditModal = (course_id) => {
    navigate('/admin-edit-course', {
      state: { id: course_id }
    })
    // setCurrentSelectedID(course_id);
    // setEditCourse(true);
  };

  const loadAddCourse = () => {
    setCurrentSelectedID("0");
    setAddCourse(true);
  };

  const updateCourseStatusFunction = (tableMeta, value) => {
    const updatedCourse = courses?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.is_active;
        const updatedStatus = currentStatus == 1 ? 0 : 1;
        updateCourseStatus({
          course_id: tableMeta?.rowData[0],
          status: updatedStatus,
        });

        return { ...item, updatedStatus };
      }
      return item;
    });

    setCourses(updatedCourse);
  };

  const deleteCourseSelect = (selectedCourse) => {
    setDeleteCourseID(selectedCourse);
    setDeleteCourse(true);
  };

  const deletebtnPress = () => {
    deleteCourse(deleteCourseID);
    setDeleteCourse(false);
  };

  const onManageStudent = (value, tableMeta) => {
    navigate(
      '/admin-course-student',
      {
        state: { id: value, courseData: tableMeta?.rowData }
      });
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
      name: "name",
      label: "Course Name",
      options: {
        filter: true,
        sort: false,
      },
    },

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
              onChange={() => updateCourseStatusFunction(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },

    {
      name: "id",
      label: "View",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"viewIconbtn"}
              onclick={() => loadCourseViewModal(value)}
            />
          );
        },
      },
    },

    {
      name: "id",
      label: "Content",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"contentbtn"}
              onclick={() => {
                onNavigate("/admin-courseContent-edit/" + value, {
                  state: { id: value },
                });
              }}
              disabled={tableMeta.rowData[2] == 0 ? true : false}
            />
          );
        },
      },
    },

    {
      name: "id",
      label: "Edit",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"editbtn"}
              onclick={() => loadCourseEditModal(value)}
              disabled={tableMeta.rowData[2] == 0 ? true : false}
            />
          );
        },
      },
    },

    {
      name: "id",
      label: "Delete",
      options: {
        filter: true,
        sort: false,
        display: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"deleteIconbtn"}
              onclick={() => deleteCourseSelect(value)}
            />
          );
        },
      },
    },

    {
      name: "is_free",
      label: "Course Type",
      options: {
        filter: true,
        sort: false,
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == 0 ? "Paid" : "Free";
        },
      },
    },
    {
      name: "is_invisible",
      label: "Course visiblity",
      options: {
        filter: true,
        sort: false,
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == 0 ? "All" : "Mentioned";
        },
      },
    },
    {
      name: "id",
      label: "Manage Student",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box sx={{ minWidth: 100 }}>
              <TextButtonComponet
                text={"Manage Student"}
                onButtonClick={() => onManageStudent(value, tableMeta)}
              />
            </Box>
          );
        },
      },
    },
  ];



  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between" alignItems={'center'}>
          <Grid item>
            <HeadingComponent
              text={"Courses"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item>
            <TextIconButtonComponent
              btnText={"Add Course"}
              icon={faBook}
              // onclick={() => loadAddCourse()}
              onclick={() => navigate('/admin-add-course', {})}
            />
          </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <TableComponent
            columns={columns}
            data={courses}
            filter={false}
            download={false}
          />
        </Box>
      </Box>
      <PopUpMessageComponent
        open={deleteCoursePopup}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete course?"}
        btntext={"Yes, delete"}
        onclick={() => deletebtnPress()}
        altbtntext={"No"}
        altonclick={() => setDeleteCourse(false)}
        onclose={() => setDeleteCourse(false)}
      />
      {/* <DialogComponent
        title={"Add Course"}
        open={addCourse}
        onClose={() => setAddCourse(false)}
      >
        <AdminCourseForm
          onClose={() => setAddCourse(false)}
          courseID={currentSelectedID}
        />
      </DialogComponent> */}
      {/* <DialogComponent
        title={"Edit Course"}
        open={editCourse}
        onClose={() => setEditCourse(false)}
      >
        <AdminCourseForm
          onClose={() => setEditCourse(false)}
          courseID={currentSelectedID}
        /> */}
      {/* </DialogComponent> */}
      <DialogComponent
        title={"View Course"}
        open={viewCourse}
        onClose={() => setViewCourse(false)}
      >
        <AdminCourseFormView
          onClose={() => setViewCourse(false)}
          courseID={currentSelectedID}
        />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    courseList: state.course.get("allStatusCourseList"),
  }),
  {
    getCourseList: Actions.course.getAllStateCourseList,
    updateCourseStatus: Actions.course.updateCourseStatus,
    deleteCourse: Actions.course.deleteCourse,
  }
)(AdminCourseScreen);

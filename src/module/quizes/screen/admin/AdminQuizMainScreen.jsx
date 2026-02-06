import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  IconButtonComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../../component/atom";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminQuizForm,
  AdminQuizView,
  AdminwebinarForm,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import { useNavigate } from "react-router-dom";
import { faEye, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import _ from "lodash";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import moment from "moment";
import { AdminQuizEdit } from "../../../../component/molecule/Forms";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";

const AdminQuizMainScreen = ({
  getQuizeList,
  quizList,
  upDateQuizState,
  getQuizById,
  deleteQuize,
  verifyToken,
  getAllStateCourseList,
  getCourseList,
  courseList
}) => {
  const navigate = useNavigate();
  const [addQuiz, setAddQuiz] = useState(false);
  const [viewQuiz, setViewQuiz] = useState(false);
  const [deleteQuiz, setDeleteQuiz] = useState(false);
  const [selectQuiz, setSelectedQuiz] = useState("");
  const [editQuiz, setEditQuiz] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const cQuizRef = useRef(null);
  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState();

  const [allQuiz, setAllQuiz] = useState([]);

  useEffect(() => {
    if(courseId == 0){
      const list = _.map(quizList, (item) => {
        const createdDate = moment(_.get(item, "created_at", new Date())).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        return { ...item, createdDate };
      });
      setAllQuiz(list);
    }
  }, [quizList]);

  useEffect(() => {
    getQuizeList();
    getAllStateCourseList();
    getCourseList();
  }, []);

  useEffect(() => {
  }, [courseList])

  const statusUpdate = (tableMeta, value) => {
    const updatedQuiz = allQuiz?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.status;
        const status = currentStatus == 1 ? 0 : 1;
        upDateQuizState({ quiz_id: tableMeta?.rowData[0], status });
        return { ...item, status };
      }
      return item;
    });
    setAllQuiz(updatedQuiz);
  };

  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "duration",
      label: "Time (Minutes)",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => value,
      },
    },

    {
      name: "no_of_attempts",
      label: "No Of Attempts",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <SwitchButtonComponet
              checked={value ? true : false}
              onChange={() => statusUpdate(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },

    {
      name: "view",
      label: "View",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"viewIconbtn"}
              // onclick={() => {
              //   const id = tableMeta?.rowData[0];
              //   getQuizById(id);
              //   setViewQuiz(true);
              // }}
              onclick={() => onViewBtn(tableMeta, value)}
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
              onclick={() => navigate('/admin-quiz-edit-first',{state:{id:tableMeta.rowData[0]}})}
            />
          );
        },
      },
    },
    {
      name: "delete",
      label: "Delete",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"deleteIconbtn"}
              onclick={() => onPressDelete(tableMeta, value)}
            />
          );
        },
      },
    },
  ];

  useEffect(() => {
    const foundObject = _.filter(quizList, ({ id }) => id === courseId);
    setList(foundObject);
    setOriginalList(foundObject)
  }, [quizList]);

  const filterCourse = (courseId) => {
    setCourseId(courseId);
    if(courseId === 0){
      setAllQuiz(quizList)
    }
    else{
      const foundObject = _.filter(quizList, ({ course_id }) => course_id === courseId);
      setAllQuiz(foundObject)
    }
    // getAdminUserDetails({
    //   course: courseId == 0 ? "" : courseId,
    //   type: 2,
    // });
  };

  const onPressDelete = (tableMeta, value) => {
    setSelectedQuiz(tableMeta.rowData[0]);
    setDeleteQuiz(true);
  };

  const onDeleteQuize = () => {
    deleteQuize(selectQuiz);
    // setDeleteQuiz(false)
    // setSelectedQuiz('');
    onDeleteClose();
  };

  const onDeleteClose = () => {
    setDeleteQuiz(false);
    setSelectedQuiz("");
  };

  const onViewBtn = (tableMeta) => {
    // getQuizById(tableMeta.rowData[0]);
    // setViewQuiz(true);
    navigate('/admin-quiz-view', { state: { id: tableMeta.rowData[0] } })
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container  direction="row" justifyContent="space-between">
          <Grid item>
            <HeadingComponent
              text={"Quizzes"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>

          <Grid item className="student-search-btn-section" columnGap={2}>
            <Box className="student-search-btn-inner-section">
              <DropDownComponent
                list={courseList}
                initialValue={"All Courses"}
                selectedValue={courseId}
                radius={"15px"}
                onchange={(e) => filterCourse(e.target.value)}
                placeholder={"All Courses"}
              />
            </Box>
            <TextIconButtonComponent
              btnText={"Add Quiz"}
              icon={faQuestionCircle}
              animation={"shake"}
              onclick={() => navigate("/admin-quiz-first")}
            />
            <TextIconButtonComponent
              btnText={"View Submission"}
              icon={faEye}
              onclick={() => navigate("/admin-submission-history")}
            />
          </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={allQuiz} filter={false} />
        </Box>
      </Box>
      <PopUpMessageComponent
        open={deleteQuiz}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete quiz?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        onclick={onDeleteQuize}
        altonclick={onDeleteClose}
        onclose={onDeleteClose}
      />

      <AdminQuizForm open={addQuiz} onClose={() => setAddQuiz(false)} />
      <DialogComponent
        isShowCloseButton={true}
        title={"View Quiz"}
        open={viewQuiz}
        onClose={() => setViewQuiz(false)}
      >
        <AdminQuizView onClose={() => setViewQuiz(false)} />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Quiz"}
        open={editQuiz}
        onClose={() => setEditQuiz(false)}
      >
        <AdminQuizEdit onClose={() => setEditQuiz(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    quizList: state.quizes.get("quizList"),
    courseList: state.students.get("commonCourseList"),
  }),
  {
    getQuizeList: Actions.quizes.getQuizeList,
    upDateQuizState: Actions.quizes.upDateQuizState,
    getQuizById: Actions.quizes.getQuizById,
    deleteQuize: Actions.quizes.deleteQuize,
    verifyToken: Actions.auth.verifyToken,
    getAllStateCourseList: Actions.course.getAllStateCourseList,
    getCourseList: Actions.quizes.getCourseListByQuiz,
  }
)(AdminQuizMainScreen);

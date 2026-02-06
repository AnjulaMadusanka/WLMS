import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import { connect } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  DialogComponent,
  IconButtonComponent,
  PaginationTable,
  TextIconButtonComponent,
} from "../../../../component/atom";
import { PopUpMessageComponent } from "../../../../component/molecule";
import { AdminGraphView } from "../../../../component/molecule/Forms";

const AdminSubmissionHistoryScreen = ({
  quizSubmissionHistory,
  getQuizSumbissionHistory,
  deleteAttempt,
  graphData,
  onGetAttemptgraph,
  resetAttempts = () => { }
}) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [quizId, setQuizId] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [open,setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");



  const fetchQuizSubmissionHistory = (page, perPage, search) => {
    const trimmedSearch = search ? search.trim() : ""; 
    getQuizSumbissionHistory({ page, per_page: perPage, search: trimmedSearch });
  };

  useEffect(() => {
    fetchQuizSubmissionHistory(currentPage, rowsPerPage,searchQuery);
  }, [currentPage,rowsPerPage,searchQuery]);


  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchQuizSubmissionHistory(currentPage, rowsPerPage, "");
    } else {
      fetchQuizSubmissionHistory(currentPage, rowsPerPage, searchQuery);
    }
  }, [currentPage, rowsPerPage, searchQuery]);

  useEffect(() => {
    if (quizSubmissionHistory) {
      setList(quizSubmissionHistory.data);
      setTotalPages(quizSubmissionHistory.last_page);
      setRowsPerPage(quizSubmissionHistory.per_page);
    }
  }, [quizSubmissionHistory, currentPage]);



  const columns = [
    {
      name: "quiz_name",
      label: "Quiz",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "user_id",
      label: "",
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: "user_name",
      label: "Student Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "course_name",
      label: "Course Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "attempts",
      label: "Attempt",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "submitdated",
      label: "Submitted Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
    },

    {
      name: "id",
      label: "View Assessment",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let attempt = list?.map((item) => {
            if (value == item?.id) {
              return item?.attempts;
            }
          })
          return (
            <Box sx={{ width: "fit-content" }}>
              <TextButtonComponet
                text={"Assessment Form "}
                onButtonClick={() =>
                  navigate(
                    `/admin-quiz-assessment/${value}/${tableMeta.rowData[0]}`,
                    {
                      state: {
                        quiz_status_id: value,
                        user_id: tableMeta.rowData[1],
                        quiz_name: tableMeta.rowData[0],
                        stuName: tableMeta.rowData[2],
                        quiz_id: tableMeta.rowData[7],
                        attempt: attempt
                      },
                    }
                  )
                }
              />
            </Box>
          );
        },
      },
    },
    // {
    //   name: "id",
    //   label: "View Graph",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Box sx={{ width: "fit-content" }}>
    //         <TextButtonComponet
    //           text={"View Graph"}
    //           disabled={tableMeta.rowData[5] == 0 ? true : false}
    //           onButtonClick={() => onViewBtn(tableMeta, value)}/>
    //         </Box>
    //       );
    //     },
    //   },
    // },
    {
      name: "quiz_id",
      label: "Quize Id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "id",
      label: "Reset Attempts",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"deleteIconbtn"}
              onclick={() => {
                onPressDeletebtn(tableMeta, value);
                setConfirmDelete(true);
              }}
            />
          );
        },
      },
    },
  ];

  const onPressDeletebtn = (tableMeta, value) => {
    list?.forEach((item) => {
      if (value == item?.id) {
     
        setAttempt(item?.attempts);
        setQuizId(item?.quiz_id);
        setUserId(item?.user_id);
      }
    });
  };

  const ondeleteAttempt = () => {
    // deleteAttempt({
    //   user_id: userId,
    //   quiz_id: quizId,
    //   attempt: attempt,
    // });
    resetAttempts({
      user_id: userId,
      quiz_id: quizId,
    })
    setConfirmDelete(false);
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container flexDirection={"column"} spacing={3}>
          <Grid item>
            <HeadingComponent
              text={"Submission History"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
              backNavigation={true}
            />
          </Grid>
          {/* <Grid item xs={2}>
            <TextButtonComponet
              onButtonClick={() => navigate(-1)}
              text={"Back"}
              classStyle="btn btn-secondary"
            />
          </Grid> */}
          <Grid item>
          <PaginationTable
            columns={columns}
            data={list}
            totalRecords={totalPages}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowsPerPageChange={(perPage) => setRowsPerPage(perPage)}
            onSearchChange={(searchText) => {
              setSearchQuery(searchText);
            }}
          />
          </Grid>
        </Grid>
      </Box>

      <PopUpMessageComponent
        open={confirmDelete}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete Attempt?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        onclick={ondeleteAttempt}
        altonclick={() => setConfirmDelete(false)}
        onclose={() => setConfirmDelete(false)}
      />
         <DialogComponent
        isShowCloseButton={true}
        title={"View Graph"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AdminGraphView   graphData={graphData} onClose={() => setOpen(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    quizSubmissionHistory: state.quizes.get("quizSubmissionHistory"),
    graphData:state.quizes.get("graphData"),
  }),
  {
    getQuizSumbissionHistory: Actions.quizes.getQuizSumbissionHistory,
    deleteAttempt: Actions.quizes.deleteAttempt,
    resetAttempts: Actions.quizes.resetAttempts,
    onGetAttemptgraph:Actions.quizes.onGetAttemptgraph
  }
)(AdminSubmissionHistoryScreen);

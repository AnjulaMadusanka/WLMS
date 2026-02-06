import React, { useState, useRef } from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  IconButtonComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../../component/atom";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import {
  AdminwebinarForm,
  PopUpMessageComponent,
} from "../../../../component/molecule";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../core/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import { faUsers, faCheck } from "@fortawesome/free-solid-svg-icons";
import { AdminSelectCoursesForm, AdminWebinarUpdateForm } from "../../../../component/molecule/Forms";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from "dayjs";
import _ from "lodash";


const AdminWebinarMainScreen = ({
  adminWebinarList,
  getAdminWebinarList,
  getAdminWebinarStatus,
  deleteAdminWebinar,
  verifyToken,
  updateWebinarCompleteAdmin,
  addCourseToWebinar
}) => {
  const [addwebinar, setAddWebinar] = useState(false);
  const [editWebinar, setEditWebinar] = useState(false);
  const [deleteWebinar, setDeleteWebinar] = useState(false);
  const [webinarList, setWebinarList] = useState([]);
  const [webinardetails, setWebinardetails] = useState({});
  // const [removeWebinar, setRemoveWebinar] = useState({});
  const [webinarId, setWebinarId] = useState(0);
  const [webinarMessage, setWebinarMessage] = useState("");
  const [webinarAlert, setWebinarAlert] = useState(false);
  const [completeWebinar, setCompleteWebinar] = useState(false);
  const [completeWebinarId, setCompleteWebinarId] = useState(0);

  const [openCouse, setOpenCouse] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isSuccess = location?.state?.isSuccess;

  useEffect(() => {
    const list = adminWebinarList.map((item) => {
      return { ...item, newTime: `${item?.time} ${item?.time_ext}` };
    });
    console.log("popopop", list)
    setWebinarList(list);
  }, [adminWebinarList]);


  useEffect(() => {
    getAdminWebinarList();
  }, []);

  useEffect(() => {
    if (isSuccess !== undefined) {
      if (parseInt(isSuccess)) {
        setWebinarMessage("Live class created successfully");
        setWebinarAlert(true);
      } else {
        setWebinarMessage("Live class created unsuccessfull");
        setWebinarAlert(true);
      }
    }
  }, []);

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
      name: "date",
      label: "Date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) =>
          moment(new Date(value)).format(DATE_FORMAT),
      },
    },
    {
      name: "newTime",
      label: "Time",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => value,
      },
    },
    {
      name: "duration",
      label: "Duration",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => value + " min",
      },
    },
    {
      name: "courses",
      label: "Course",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <Grid spacing={2} rowGap={1}>
                {_.map(value, (item, index) => {
                  return (
                    <Grid style={{ marginBottom: 2 }} spacing={2} key={`course_name_${item?.id}`}>
                      <Chip label={item?.name} />
                    </Grid>
                  )
                })
                }
              </Grid>
              {tableMeta.rowData[7] == 0 ? (
                <>
                  <IconButtonComponent
                    backgroundColor={'transparent'}
                    btnType={"editbtn"}
                    onclick={() => editCoursePress(value, tableMeta)}
                    disabled={tableMeta.rowData[5] == 0 ? true : false}
                  />
                </>
              ) :
                null
              }
            </>
          );
        },


      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <SwitchButtonComponet
              checked={value ? true : false}
              onChange={() => updateWebinarStatus(tableMeta)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },

    {
      name: "start_url",
      label: "Start",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              {tableMeta.rowData[7] == 0 ? (
                <>
                  <TextButtonComponet
                    text={"Start"}
                    onButtonClick={() => window.open(value, "_blank")}
                    isDisabled={tableMeta.rowData[5] == 0 ? true : false}
                  />
                </>
              ) : (
                <TextButtonComponet
                  text={"End"}
                  // onButtonClick={() => window.open(value, "_blank")}
                  isDisabled={true}
                />
              )}
            </>
          );
        },
      },
    },

    {
      name: "is_completed",
      label: "Mark as Completed",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              {value == 0 ? (
                <>
                  <TextButtonComponet
                    text={"Complete"}
                    onButtonClick={() => completeSelectWebinar(tableMeta.rowData[0])}
                    isDisabled={tableMeta.rowData[5] == 0 ? true : false}
                  />
                </>
              ) : (

                <CheckCircleIcon sx={{ color: "#28b882" }} fontSize={"large"} />

              )}
            </>
          );
        },
      },
    },

    {
      name: "edit",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <IconButtonComponent
              btnType={"editbtn"}
              onclick={() => editBtnPress(value, tableMeta)}
              disabled={tableMeta.rowData[5] == 0 ? true : false}
            />
          );
        },
      },
    },

    {
      name: "delete",
      label: "Delete",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"deleteIconbtn"}
              onclick={() => deleteSelectWebinar(tableMeta)}
            />
          );
        },
      },
    },
  ];

  const editBtnPress = (value, tableMeta) => {
    webinarList?.map((webinar) => {
      if (webinar?.id == tableMeta.rowData[0]) {
        setWebinardetails(webinar);
      }
    });
    setEditWebinar(true);
  };

  const editCoursePress = (value, tableMeta) => {
    webinarList?.map((webinar) => {
      if (webinar?.id == tableMeta.rowData[0]) {
        setWebinardetails(webinar);
      }
    });
    setOpenCouse(true);
  };

  const updateWebinarStatus = (tableMeta) => {
    const updatedWebinar = webinarList?.map((webinar) => {
      if (webinar?.id == tableMeta?.rowData[0]) {
        const currentStatus = webinar?.status;
        const updatedStatus = currentStatus == 1 ? 0 : 1;
        getAdminWebinarStatus({
          id: tableMeta?.rowData[0],
          status: updatedStatus,
        });
        return { ...webinar, updatedStatus };
      }
      return webinar;
    });

    setWebinarList(updatedWebinar);
  };

  const deleteSelectWebinar = (tableMeta) => {
    webinarList?.map((webinar) => {
      if (webinar?.id == tableMeta?.rowData[0]) {
        setWebinarId(webinar?.id);
      }
    });
    setDeleteWebinar(true);
  };

  const confirmDelete = () => {
    deleteAdminWebinar(webinarId);
    setDeleteWebinar(false);
  };

  const completeSelectWebinar = (id) => {
    setCompleteWebinarId(id);
    setCompleteWebinar(true);
  };

  const confirmClassCompleted = () => {
    updateWebinarCompleteAdmin({ id: completeWebinarId, is_completed: 1 });
    setCompleteWebinar(false);
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container flexDirection={"column"} rowSpacing={3}>
          <Grid item>
            <Grid container justifyContent={"space-between"} alignItems={'center'}>
              <Grid item>
                <HeadingComponent
                  text={"Live Classes"}
                  fontweigth={600}
                  size={40}
                  fontfamily={"Montserrat"}
                  backNavigation={true}
                />
              </Grid>

              <Grid item>
                <TextIconButtonComponent
                  icon={faUsers}
                  btnText={"Add live class"}
                  size={"large"}
                  onclick={() => setAddWebinar(true)}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <TextButtonComponet
                  onButtonClick={() => navigate(-1)}
                  text={"Back"}
                  classStyle="btn btn-secondary"
                />
              </Grid>
              
            </Grid>
          </Grid> */}
          <Grid item>
            <Box>
              <TableComponent columns={columns} data={webinarList} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PopUpMessageComponent
        open={deleteWebinar}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want to delete?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        onclick={confirmDelete}
        altonclick={() => setDeleteWebinar(false)}
        onclose={() => setDeleteWebinar(false)}
      />

      <PopUpMessageComponent
        open={completeWebinar}
        type={"other"}
        title={"Complete!"}
        message={"Are you sure this live class is completed?"}
        btntext={"Yes, completed"}
        altbtntext={"No"}
        onclick={confirmClassCompleted}
        altonclick={() => setCompleteWebinar(false)}
        onclose={() => setCompleteWebinar(false)}
      />

      <PopUpMessageComponent
        open={webinarAlert}
        type={webinarAlert ? "success" : "error"}
        title={"Create Live Class"}
        message={webinarMessage}
        btntext={"OK"}
        onclick={() => setWebinarAlert(false)}
        onclose={() => setWebinarAlert(false)}
      />

      <DialogComponent
        title={"Add Live Class"}
        open={addwebinar}
        onClose={() => setAddWebinar(false)}
      >
        <AdminwebinarForm onClose={() => setAddWebinar(false)} />
      </DialogComponent>

      <DialogComponent
        title={"Edit Live Class"}
        open={editWebinar}
        onClose={() => setEditWebinar(false)}
      >
        <AdminWebinarUpdateForm
          webinarDetails={webinardetails}
          onClose={() => setEditWebinar(false)}
        />
      </DialogComponent>

      <DialogComponent
        title={"Edit Courses"}
        open={openCouse}
        onClose={() => setOpenCouse(false)}
      >
        <AdminSelectCoursesForm
          webinarDetails={webinardetails}
          onClose={() => setOpenCouse(false)}
        />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    adminWebinarList: state.webinar.get("getAdminAllWebinarList"),
  }),
  {
    getAdminWebinarList: Actions.webinar.getAllWebinarsAdmin,
    getAdminWebinarStatus: Actions.webinar.updateWebinarAdminStatus,
    deleteAdminWebinar: Actions.webinar.deleteWebinarAdmin,
    verifyToken: Actions.auth.verifyToken,
    updateWebinarCompleteAdmin: Actions.webinar.updateWebinarCompleteAdmin,
    addCourseToWebinar: Actions.webinar.addCourseToWebinar
  }
)(AdminWebinarMainScreen);

import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import {
  DialogComponent,
  IconButtonComponent,
  SwitchButtonComponet,
  TextIconButtonComponent,
} from "../../../../component/atom";
import AdminForumEditForm from "../../../../component/molecule/Forms/forumAdmin/AdminForumEditForm";
import { useNavigate } from "react-router-dom";
import { PopUpMessageComponent } from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../../../core/Constant";
import _ from "lodash";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AdminForumCreate } from "../../../../component/molecule/Forms";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import { getText } from "../../../../core/Constant";

const AdminMainForumScreen = ({
  getForumList,
  forumList,
  updateStatus,
  deleteAdminForum,
  updateForumStatus,
  verifyToken,
  getStdCourseList,
  stdCourseList,
  getCourseList,
  courseList
}) => {
  const [edit, setEdit] = useState(false);
  const [forumDetails, setForumDetails] = useState({});
  const [deleteForum, setDeleteForum] = useState(false);
  const [userId, setUserId] = useState(0);
  const [forums, setForums] = useState([]);
  const [open, setOpen] = useState(false);
  const [newcourseList, setCourseList] = useState([]);
  const [course, setCourse] = useState("");
  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState();

  const navigate = useNavigate(false);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    getForumList();
  }, []);

  useEffect(() => {
    const result = _.map(forumList, ({ id, forums }) => ({ id, forums }));
    const foundObject = _.find(result, ({ id }) => id === course);
    setList(foundObject?.forums);
    setOriginalList(foundObject?.forums)
  }, [forumList]);


  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    setCourse(Selectedvalue);
    if (
      Selectedvalue !== null ||
      Selectedvalue !== undefined ||
      Selectedvalue !== ""
    ) {
      const result = _.map(forumList, ({ id, forums }) => ({ id, forums }));
      const foundObject = _.find(result, ({ id }) => id === Selectedvalue);
      setList(foundObject?.forums);
      setOriginalList(foundObject?.forums)
    }
  };


  useEffect(() => {
    getCourseList();
  }, []);

  useEffect(() => {
    const list = _.map(courseList, (item, index) => {
      return {
        id: item.id,
        course_id: item.id,
        name: item.name,
      };
    });
    setCourseList(list);
    setCourse(courseList[0]?.id);

  }, [courseList]);


  useEffect(() => {
    setForums(forumList);
  }, [forumList]);

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
      name: "image",
      label: "Image",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return <Avatar variant="rounded" src={IMAGE_URL + value} />;
        },
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
      name: "forum_participants_count",
      label: "No of Students",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "creator",
      label: "Created By",
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
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"viewIconbtn"}
              disabled={tableMeta.rowData[5] == 0 ? true : false}
              onclick={() => onNavigateUser(tableMeta, value)}
            />
          );
        },
      },
    },
    {
      name: "upload",
      label: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"editbtn"}
              onclick={() => updateBtn(tableMeta)}
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
              onclick={() => deleteBtnpress(tableMeta)}
            />
          );
        },
      },
    },
  ];

  const onNavigateUser = (tableMeta, value) => {
    for (const item of list) {
      if (item?.id == tableMeta?.rowData[0]) {
        onNavigate("/admin-view-forum", {
          state: { forumId: _.get(item, "id", ""), forum: item },
        });
      }
    }
  };

  const statusUpdate = (tableMeta, value) => {
    const updatedForms = list?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.status;
        const status = currentStatus == 1 ? 0 : 1;
        updateForumStatus({ forum_id: tableMeta?.rowData[0], status });
        return { ...item, status };
      }
      return item;
    });
    setForums(updatedForms);
  };

  const updateBtn = (tableMeta) => {
    list?.map((forum) => {
      if (forum?.id == tableMeta.rowData[0]) {
        setForumDetails(forum);
      }
    });
    setEdit(true);
  };

  const deleteBtnpress = (tableMeta) => {
    list?.map((forum) => {
      if (forum?.id == tableMeta.rowData[0]) {
        setUserId(forum?.id);
      }
    });

    setDeleteForum(true);
  };

  const deleteForumById = () => {
    deleteAdminForum(userId);
    setDeleteForum(false);
  };

  const loadCreateForum = () => {
    setOpen(true)
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container justifyContent={"space-between"} mt={1}>
          <Grid item>
            <HeadingComponent
              text={"Forum"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item justifyContent={'flex-end'} alignItems={'center'} display={'flex'} flexDirection={'row'} sx={{ flex: 0.5 }}>
          <Box sx={{flex:0.5}}>
                <DropDownComponent
                  isShowPlaceholder={true}
                  isShowZero={newcourseList.length > 0 ? false : true}
                  initialValue="Select Course"
                  onchange={onCourseChange}
                  radius={"15px"}
                  list={newcourseList}
                  selectedValue={course}
                />
              </Box>
                <Box sx={{flex:0.4}}>
                <TextIconButtonComponent
              btnText={"Create Forum"}
              icon={faPlus}
              onclick={() => loadCreateForum()}
            />
                </Box>

              </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={list} />
        </Box>
      </Box>
      <PopUpMessageComponent
        open={deleteForum}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete forum?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        altonclick={() => setDeleteForum(false)}
        onclick={deleteForumById}
        onclose={() => setDeleteForum(false)}
      />
      <DialogComponent
        isShowCloseButton={true}
        title={"Edit Forum"}
        open={edit}
        onClose={() => setEdit(false)}
      >
        <AdminForumEditForm
          forumDetails={forumDetails}
          onClose={() => setEdit(false)}
        />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"Create Forum"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AdminForumCreate  courseList={newcourseList}  onClose={() => setOpen(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    forumList: state.forum.get("forumList"),
    updateStatus: state.forum.get("editForumStatus"),
    courseList: state.course.get("commonCourseList"),
    stdCourseList: state.course.get("stdCourseList"),
  }),
  {
    getForumList: Actions.forum.getForumList,
    updateForumStatus: Actions.forum.updateAdminForumStatus,
    deleteAdminForum: Actions.forum.deleteAdminForum,
    verifyToken: Actions.auth.verifyToken,
    getCourseList: Actions.course.getCourseList,
    getStdCourseList: Actions.course.getStdCourseList,
  }
)(AdminMainForumScreen);

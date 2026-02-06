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
import { useNavigate } from "react-router-dom";
import { AdminDocumentAdd, PopUpMessageComponent } from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../../../core/Constant";
import _ from "lodash";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import { getText } from "../../../../core/Constant";
import { AdminNewsLetterView } from "../../../../component/molecule/Forms";
import { documentURL } from "../../../../core/repository/Repository";

const AdminDocumentScreen = ({
  documentList,
  deleteNewsletter,
  addDocument,
  deleteDocument,
  courseList,
  getCourseList,
  getDocumentList,
  updateDocumentStatus
}) => {
  const [create, setCreate] = useState(false);
  const [documentdelete, setDeleteDocument] = useState(false);
  const [documentId, setDocumentId] = useState(0);
  const [newcourseList, setCourseList] = useState([]);
  const [course, setCourse] = useState("");
  const [list, setList] = useState([]);

  const navigate = useNavigate(false);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };


  useEffect(() => {
    setList(documentList.documents);
  }, [documentList]);




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
    localStorage.setItem("courseId", courseList[0]?.id);
    getDocumentList(courseList[0]?.id);
  }, [courseList]);

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
      label: "Title",
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
              checked={value == 1 ? true : false}
              onChange={() => statusUpdate(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },

    {
      name: "course_id",
      label: "View",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"viewIconbtn"}
              disabled={tableMeta.rowData[5] == 0 ? true : false}
              onclick={() => onViewBtn(tableMeta, value)}
            />
          );
        },
      },
    },
    {
      name: "course_id",
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




  const deleteBtnpress = (tableMeta) => {
    list?.map((document) => {
      if (document?.id == tableMeta.rowData[0]) {
        setDocumentId(document?.id);
      }
    });

    setDeleteDocument(true);
  };

  const deleteDocumentById = () => {
    deleteDocument(documentId);
    setDeleteDocument(false);
  };

  const loadCreateDocument = () => {
    setCreate(true)
  };

  const onViewBtn = (tableMeta) => {
    list?.map((document) => {
      if (document?.id == tableMeta.rowData[0]) {
        window.open(documentURL + document.path, '_blank').focus();
      }
    });
  }

  const statusUpdate = (tableMeta, value) => {
    // list?.map((item) => {
    //   if (item?.id == tableMeta?.rowData[0]) {
    //     const currentStatus = item?.status;
    //     const status = currentStatus == 1 ? 0 : 1;
    //     
    //     return { ...item, status };
    //   }
    //   return item;
    // });
    updateDocumentStatus({ document_id: tableMeta?.rowData[0], status: value == 1 ? 0 : 1 });
  };

  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    setCourse(Selectedvalue);
    localStorage.setItem("courseId", Selectedvalue);
    getDocumentList(Selectedvalue)
  };



  return (
    <>
      <Box className="main-screen-container">
        <Grid container justifyContent={"space-between"} mt={1}>
          <Grid item>
            <HeadingComponent
              text={"Documents"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item justifyContent={'flex-end'} alignItems={'center'} display={'flex'} flexDirection={'row'} sx={{ flex: 0.5 }}>
            <Box sx={{ flex: 0.5 }}>
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
            <Box sx={{ flex: 0.4 }}>
              <TextIconButtonComponent
                btnText={"Add Document"}
                icon={faPlus}
                onclick={() => loadCreateDocument()}
              />
            </Box>

          </Grid>
        </Grid>

        <Box className="common-admin-content-wrap">
          <TableComponent columns={columns} data={list} />
        </Box>
      </Box>
      <PopUpMessageComponent
        open={documentdelete}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete document?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        altonclick={() => setDeleteDocument(false)}
        onclick={deleteDocumentById}
        onclose={() => setDeleteDocument(false)}
      />
      <DialogComponent
        isShowCloseButton={true}
        title={"Add  Document"}
        open={create}
        onClose={() => setCreate(false)}
      >
        <AdminDocumentAdd
          courseList={courseList}
          onClose={() => setCreate(false)}
        />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    documentList: state.document.get("documentList"),
    courseList: state.course.get("commonCourseList"),
  }),
  {
    getDocumentList: Actions.document.getDocumentList,
    addDocument: Actions.document.addDocument,
    deleteDocument: Actions.document.deleteDocument,
    updateDocumentStatus: Actions.document.updateDocumentStatus,
    getCourseList: Actions.course.getCourseList,

  }
)(AdminDocumentScreen);

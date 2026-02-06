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
import { PopUpMessageComponent } from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { IMAGE_URL } from "../../../../core/Constant";
import _ from "lodash";
import { faBook, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AdminNewsLetterView, AdminNewsletterCreate, AdminNewsletterEdit } from "../../../../component/molecule/Forms";
import DropDownComponent from "../../../../component/atom/Inputs/DropDown";
import { getText } from "../../../../core/Constant";

const AdminNewsLetterScreen = ({
  updateNewsletterStatus,
  deleteNewsletter,
  newsLetterHistory,
  getNewsletterHistory
}) => {
  const [edit, setEdit] = useState(false);
  const [newsletterDetails, setNewsLetterDetails] = useState({});
  const [deleteForum, setDeleteForum] = useState(false);
  const [newsLetterId, setNewsLetterId] = useState(0);
  const [newsLetters, setNewsLetter] = useState([]);
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
    getNewsletterHistory();
  }, []);

  useEffect(() => {
    setList(newsLetterHistory);
  }, [newsLetterHistory]);


  useEffect(() => {
    setNewsLetter(newsLetterHistory);
  }, [newsLetterHistory]);

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
        name: "title",
        label: "Title",
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
              checked={value ==  1 ? true : false}
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
              onclick={() => onViewBtn(tableMeta, value)}
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
              disabled={tableMeta.rowData[5] == 0 ? true : false}
              onclick={() => onNavigateUser(tableMeta, value)}
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
        onNavigate("/admin-edit-newsletter", {
          state: { newsLetterId: _.get(item, "content_id", ""), newsLetter: item },
        });
      }
    }
  };

  const statusUpdate = (tableMeta, value) => {
    const updatedNewsLetter = list?.map((item) => {
      if (item?.id == tableMeta?.rowData[0]) {
        const currentStatus = item?.is_active;
        const status = currentStatus == 1 ? 0 : 1;
        updateNewsletterStatus({ id: tableMeta?.rowData[0], is_active:status });
        return { ...item, status };
      }
      return item;
    });
    setNewsLetter(updatedNewsLetter);
  };

  const updateBtn = (tableMeta) => {
    list?.map((newsLetter) => {
      if (newsLetter?.id == tableMeta.rowData[0]) {
        setNewsLetterDetails(newsLetter);
      }
    });
    setEdit(true);
  };

  const deleteBtnpress = (tableMeta) => {
    list?.map((newsletter) => {
      if (newsletter?.id == tableMeta.rowData[0]) {
        setNewsLetterId(newsletter?.id);
      }
    });

    setDeleteForum(true);
  };

  const deleteForumById = () => {
    deleteNewsletter(newsLetterId);
    setDeleteForum(false);
  };

  const loadCreateForum = () => {
    setOpen(true)
  };

  const onViewBtn = (tableMeta) =>{
    list?.map((newsLetter) => {
      if (newsLetter?.id == tableMeta.rowData[0]) {
        setNewsLetterDetails(newsLetter);
      }
    });
    setOpen(true);

  }

  return (
    <>
      <Box className="main-screen-container">
        <Grid container justifyContent={"space-between"} mt={1}>
          <Grid item>
            <HeadingComponent
              text={"News Letter"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item justifyContent={'flex-end'} alignItems={'center'} display={'flex'} flexDirection={'row'} sx={{ flex: 0.5 }}>
       

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
        message={"Are you sure you want delete NewsLetter?"}
        btntext={"Yes, delete"}
        altbtntext={"No"}
        altonclick={() => setDeleteForum(false)}
        onclick={deleteForumById}
        onclose={() => setDeleteForum(false)}
      />
      <DialogComponent
        isShowCloseButton={true}
        title={"Edit NewsLetter"}
        open={edit}
        onClose={() => setEdit(false)}
      >
        <AdminNewsletterEdit
          newsletterDetails={newsletterDetails}
          onClose={() => setEdit(false)}
        />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"View NewsLetter"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AdminNewsLetterView    newsletterDetails={newsletterDetails} onClose={() => setOpen(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    newsLetterHistory: state.newsLetter.get("newsLetterHistory"),

  }),
  {
    getNewsletterHistory: Actions.newsLetter.getNewsletterHistory,
    updateNewsletterStatus:Actions.newsLetter.updateNewsletterStatus,
    deleteNewsletter:Actions.newsLetter.deleteNewsletter

  }
)(AdminNewsLetterScreen);

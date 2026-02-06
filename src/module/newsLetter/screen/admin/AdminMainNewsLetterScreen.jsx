import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import {
  DialogComponent,
  IconButtonComponent,
  TextIconButtonComponent,
} from "../../../../component/atom";
import { useNavigate } from "react-router-dom";
import { PopUpMessageComponent } from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import _ from "lodash";
import {faPlus } from "@fortawesome/free-solid-svg-icons";
import { AdminNewsletterContentView, AdminNewsletterCreate, AdminNewsletterEdit } from "../../../../component/molecule/Forms";


const AdminMainNewsLetterScreen = ({
  getNewsletterContentList,
  newsletterList,
  updateNewsletterContentStatus,
  deleteNewsletterContent
}) => {
  const [edit, setEdit] = useState(false);
  const [newsletterDetails, setNewsLetterDetails] = useState({});
  const [deleteForum, setDeleteForum] = useState(false);
  const [newsLetterId, setNewsLetterId] = useState(0);
  const [newsLetters, setNewsLetter] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewopen,setViewOpen] = useState(false)
  const [list, setList] = useState([]);

  const navigate = useNavigate(false);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    getNewsletterContentList();
  }, []);

  useEffect(() => {
    setList(newsletterList);
  }, [newsletterList]);


  useEffect(() => {
    setNewsLetter(newsletterList);
    console.log(newsletterList)
  }, [newsletterList]);

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
              onclick={() => viewBtn(tableMeta)}
            />
          );
        },
      },
    },
    {
      name: "create",
      label: "Create",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButtonComponent
              btnType={"addIconbtn"}
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
      console.log(item?.id, tableMeta?.rowData[0], 'itemmmmmmm')

      if (item?.id == tableMeta?.rowData[0]) {
        // navigate("/admin-view-forum",{ state: { forumId: _.get(item, 'id', ''), forum: item } })
        console.log(item?.id, tableMeta?.rowData[0], 'itemmmmmmm')
        onNavigate("/admin-view-newsletter", {
          state: { newsLetterId: _.get(item, "id", ""), newsLetter: item },
        });
      }
    }
  };

  const onNavigateNewsLetter = (tableMeta, value) => {
           onNavigate("/admin-newsletter-history");
  };



  const updateBtn = (tableMeta) => {
    list?.map((newsLetter) => {
      if (newsLetter?.id == tableMeta.rowData[0]) {
        setNewsLetterDetails(newsLetter);
      }
    });
    setEdit(true);
  };

  const viewBtn = (tableMeta) =>{
    list?.map((newsLetter) => {
      if (newsLetter?.id == tableMeta.rowData[0]) {
        setNewsLetterDetails(newsLetter);
      }
    });
    setViewOpen(true);

  }

  const deleteBtnpress = (tableMeta) => {
    list?.map((newsletter) => {
      if (newsletter?.id == tableMeta.rowData[0]) {
        setNewsLetterId(newsletter?.id);
      }
    });

    setDeleteForum(true);
  };

  const deleteForumById = () => {
    deleteNewsletterContent({id:newsLetterId});
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
              text={"NewsLetter Content"}
              fontweigth={600}
              size={40}
              fontfamily={"Montserrat"}
            />
          </Grid>
          <Grid item justifyContent={'flex-end'} alignItems={'center'} display={'flex'} flexDirection={'row'} sx={{ flex: 0.5 }}>
                <Box sx={{ flex: 0.5,marginRight:2 }}>
              <TextIconButtonComponent
                btnText={"View NewsLetters"}
                onclick={() => onNavigateNewsLetter()}
              />
            </Box>
            <Box sx={{ flex: 0.5 }}>
              <TextIconButtonComponent
                btnText={"Create NewsLetter"}
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
        message={"Are you sure you want delete content?"}
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
        maxwidth={"lg"}
        onClose={() => setEdit(false)}
      >
        <AdminNewsletterEdit
          newsletterDetails={newsletterDetails}
          onClose={() => setEdit(false)}
        />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"Create NewsLetter"}
        open={open}

        maxwidth={"lg"}
        onClose={() => setOpen(false)}
      >
        <AdminNewsletterCreate  onClose={() => setOpen(false)} />
      </DialogComponent>

      <DialogComponent
        isShowCloseButton={true}
        title={"NewsLetter Content"}
        open={viewopen}
        maxwidth={"lg"}
        onClose={() => setViewOpen(false)}
      >
        <AdminNewsletterContentView newsletterDetails={newsletterDetails}  onClose={() => setViewOpen(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    newsletterList: state.newsLetter.get("newsletterList"),
  }),
  {
    getNewsletterContentList: Actions.newsLetter.getNewsletterContentList,
    updateNewsletterContentStatus:Actions.newsLetter.updateNewsletterContentStatus,
    deleteNewsletterContent:Actions.newsLetter.deleteNewsletterContent
  }
)(AdminMainNewsLetterScreen);

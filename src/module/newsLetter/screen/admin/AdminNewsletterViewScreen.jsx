import React, { useState, useEffect, useRef } from "react";
import { Avatar, Box, Checkbox, Chip, Grid, Typography } from "@mui/material";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import {
  DialogComponent,
  TextIconButtonComponent,
  TextEditior,
  TextInputComponent,
} from "../../../../component/atom";
import { useLocation, useNavigate } from "react-router-dom";
import { PopUpMessageComponent } from "../../../../component/molecule";
import { Actions } from "../../../../core/modules/Actions";
import { connect, useDispatch } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AdminNewsletterGroup, AdminNewsletterStudent } from "../../../../component/molecule/Forms";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import _ from 'lodash'
import { getText, onToast } from "../../../../core/Constant";
import TextEditorTiny from "../../../../component/atom/Inputs/TextEditorTiny";


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
];

const stdcolumns = [
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
]


const AdminNewsLetterViewScreen = ({
  getForumList,
  forumList,
  updateStatus,
  deleteAdminForum,
  updateForumStatus,
  verifyToken,
  getStdCourseList,
  stdCourseList,
  getCourseList,
  courseList,
  showNewsLetter,
  createNewsletter,
  getAdminUserDetails,
  adminStudents
}) => {
  const [edit, setEdit] = useState(false);
  const [deleteForum, setDeleteForum] = useState(false);
  const [userId, setUserId] = useState(0);
  const [forums, setForums] = useState([]);
  const [open, setOpen] = useState(false);
  const [newcourseList, setCourseList] = useState([]);
  const [course, setCourse] = useState("");
  const [list, setList] = useState([]);
  const [originalList, setOriginalList] = useState();
  const [newsLetter, setNewsLetter] = useState([]);
  const [groupChecked, setGroupChecked] = useState(false);
  const [individualChecked, setIndividualChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [contenttitle, setContentTitle] = useState();
  const [content, setContent] = useState();
  const [contentId, setContentId] = useState();
  const [groupList, setGroupList] = useState([]);
  const [istitleValid, setIsTitleValid] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const [ischeckError, setIscheckError] = useState(false)
  const [post_content, setPostContent] = useState("");
  const editorRef = useRef(null);
  // const log = () => {
  //     if (editorRef.current) {
  //         setPostContent(editorRef.current.getContent());
  //         // console.log(editorRef.current.getContent());
  //     }
  // };

  const handleInit = (evt, editor) => {
    editorRef.current = editor;
    editor.mode.set('readonly');
  };


  useEffect(() => {


  }, [])



  const navigate = useNavigate();


  useEffect(() => {
    getCourseList();
  }, []);

  useEffect(() => {
    getAdminUserDetails({
      course: "",
      type: 2,
    });
  }, []);


  useEffect(() => {
    const newsletterId = location.state?.newsLetterId;
    dispatch(Actions.newsLetter.showNewsletterContent({ id: newsletterId }));
  }, [location]);

  useEffect(() => {
    const list = _.map(courseList, (item) => {
      return {
        id: item.id,
        course_id: item.id,
        name: item.name,
      };
    });
    setCourseList(list);
  }, [courseList]);


  useEffect(() => {
    setStudentList(adminStudents);
  }, [adminStudents]);



  useEffect(() => {
    setNewsLetter(showNewsLetter);
    setContent(showNewsLetter?.content);
    setContentTitle(showNewsLetter?.title);
    setContentId(showNewsLetter?.id);
  }, [showNewsLetter]);


  const deleteForumById = () => {
    deleteAdminForum(userId);
    setDeleteForum(false);
  };

  const loadCreateForum = () => {
    setOpen(true);
  };

  const handleGroupChange = (event) => {
    setGroupChecked(event.target.checked);
    setIndividualChecked(false);
    setAllChecked(false);
    setGroupList([])
  };

  const handleIndividualChange = (event) => {
    setIndividualChecked(event.target.checked);
    setGroupChecked(false);
    setAllChecked(false);
    setGroupList([])
  };

  const handleAllChange = (event) => {
    setAllChecked(event.target.checked);
    setGroupChecked(false);
    setIndividualChecked(false);
    setGroupList([])
  };

  const handleGroupListChange = (groupList) => {
    setGroupList(groupList);
  };

  const onTitleChange = (e) => {
    const text = getText(e);
    setTitle(text);
    setIsTitleError(false);
    setIsTitleValid(text?.length > 0)
  };

  const onCreateNewsletter = () => {
    const groupType = individualChecked ? 0 : groupChecked ? 1 : -1;
    const date = new Date();
    if (istitleValid &&  (allChecked || individualChecked || groupChecked)) {
      createNewsletter({
        title: title,
        content_id: contentId,
        user_group: allChecked ? ['user'] : groupList.map((group) => group.id),
        date: date,
        group_type: groupType,
        is_active: 0,
      });
      navigate(-1)
    }
    else {
      if (!istitleValid) {
        setIsTitleError(true);
      }
      if (!allChecked && !individualChecked && !groupChecked) {
        setIscheckError(true)
      }


    }
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container justifyContent={"space-between"} mt={1}>
          <Grid item>
            <HeadingComponent
              text={"Create NewsLetter"}
              fontweigth={600}
              size={40}
              backNavigation={true}
              fontfamily={"Montserrat"}
            />
          </Grid>
        </Grid>
        <Grid container>
          <span style={{ alignSelf: "center", color: "#4E657C", fontSize: 19, fontWeight: 700, marginBottom: 10 }}>
            Group Type
          </span>
          <Grid width={"100%"} display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Grid container alignItems={"center"} p={2}>
              <Grid item>
                <p style={{ padding: 0, margin: 0 }}>Group</p>
              </Grid>
              <Grid item>
                <Checkbox
                  checked={groupChecked}
                  onChange={handleGroupChange}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} p={2}>
              <Grid item>
                <p style={{ padding: 0, margin: 0 }}>Individual</p>
              </Grid>
              <Grid item>
                <Checkbox
                  checked={individualChecked}
                  onChange={handleIndividualChange}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              </Grid>
            </Grid>
            <Grid container alignItems={"center"} p={2}>
              <Grid item>
                <p style={{ padding: 0, margin: 0 }}>All</p>
              </Grid>
              <Grid item>
                <Checkbox
                  checked={allChecked}
                  onChange={handleAllChange}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              </Grid>
            </Grid>
            {
              allChecked ?
                <Grid item width={"100%"} justifyContent={"flex-end"} alignItems={"center"} display={"flex"} flexDirection={"row"}>
                  <Box sx={{ flex: 0.5 }}></Box> </Grid> : <Grid item width={"100%"} justifyContent={"flex-end"} alignItems={"center"} display={"flex"} flexDirection={"row"}>
                  <Box sx={{ flex: 0.5 }}>
                    <TextIconButtonComponent
                      btnText={groupChecked ? "Select Group" : "Add Users"}
                      icon={faPlus}

                      onclick={() => loadCreateForum()}
                    />
                  </Box>
                </Grid>
            }
          </Grid>
          {ischeckError ? <p className="input-error-text">Please Select group type</p> : null}
          <Grid container>
            {groupList?.map((item, index) => (
              <Chip
                key={index}
                label={item.name}
                style={{ margin: 2 }}
              />
            ))}
          </Grid>
          <Grid xs={12} item>
            <TextInputComponent
              label={"Newsletter  Title"}
              placeholder="Enter Newsletter Title"
              name={"Newsletter Title"}
              value={title}
              isError={isTitleError}
              error={"Please add valid newsletter title"}
              onchange={onTitleChange}
            />
          </Grid>
          <span style={{ alignSelf: "center", color: "#4E657C", fontSize: 19, fontWeight: 700, marginBottom: 10, marginTop: 20 }}>
            NewsLetter Contents
          </span>
          <Grid xs={12} item>
            <TextInputComponent
              label={"Newsletter Content Title"}
              placeholder="Enter Newsletter Title"
              name={"Newsletter Title"}
              value={contenttitle}
              error={"Please add valid newsletter title"}
            />
          </Grid>
          <Grid p={1} xs={12} style={{ pointerEvents: 'none' }} item>
            {/* <TextEditior
              value={content}
              error="Please add Content"
              label={"Newsletter Content"}
              placeholder={"Add Content"}
              height={300}
            /> */}
            <TextEditorTiny
              onInit={handleInit}
              // onChange={log}
              initialValue={content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "anchor",
                  "autolink",
                  "image",
                  "link",
                  "lists",
                  "searchreplace",
                  "table",
                  "media",
                  "mediaembed",
                  "wordcount",
                ],
                toolbar:
                  "blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist image | " +
                  "link table media | outdent indent",
                toolbar_sticky: true,
                content_style:
                  "body { font-family:Roboto, sans-serif; font-size:16px }",
                a11y_advanced_options: true,
                image_advtab: true,
                image_uploadtab: true,
                automatic_uploads: true,
                relative_urls: false,
                remove_script_host: false,
                contenteditable: false
                // images_upload_handler: example_image_upload_handler,
              }}
            />
          </Grid>
          <Grid item xs={6} >
            <Box style={{ padding: 10 }}>
              <TextButtonComponet
                onButtonClick={() => navigate(-1)}
                text={"Cancel"}
                classStyle="btn btn-secondary"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box style={{ padding: 10 }}>
              <TextButtonComponet
                onButtonClick={onCreateNewsletter}
                text={"Create"}
              />
            </Box>
          </Grid>
        </Grid>
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
        title={"Edit NewsLetter"}
        open={edit}
        onClose={() => setEdit(false)}
      >
        {/* <AdminNewsletterEdit
          forumDetails={forumDetails}
          onClose={() => setEdit(false)}
        /> */}
      </DialogComponent>
      <DialogComponent
        isShowCloseButton={true}
        title={groupChecked ? "Select Group" : "Add Student"}
        open={open}
        onClose={() => setOpen(false)}
      >
        {
          groupChecked ? <AdminNewsletterGroup
            columns={columns}
            newcourseList={newcourseList}
            checked={groupChecked ? false : true}
            courseList={newcourseList}
            onClose={() => setOpen(false)}
            onGroupListChange={handleGroupListChange}
          /> : <AdminNewsletterStudent
            columns={stdcolumns}
            newcourseList={newcourseList}
            checked={groupChecked ? false : true}
            studentList={studentList}
            onClose={() => setOpen(false)}
            onGroupListChange={handleGroupListChange}
          />
        }

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
    showNewsLetter: state.newsLetter.get("showNewsLetter"),
    adminStudents: state.students.get("adminStudents"),
  }),
  {
    getForumList: Actions.forum.getForumList,
    updateForumStatus: Actions.forum.updateAdminForumStatus,
    deleteAdminForum: Actions.forum.deleteAdminForum,
    verifyToken: Actions.auth.verifyToken,
    getCourseList: Actions.course.getCourseList,
    getStdCourseList: Actions.course.getStdCourseList,
    createNewsletter: Actions.newsLetter.createNewsletter,
    getAdminUserDetails: Actions.students.getAdminUserDetails,
  }
)(AdminNewsLetterViewScreen);

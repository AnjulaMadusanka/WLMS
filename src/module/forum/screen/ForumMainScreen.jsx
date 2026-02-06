import { Button, Grid, Typography, listClasses } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { Box } from "@mui/material";
import {
  DialogComponent,
  IconButtonComponent,
  SearchBarComponent,
  TextIconButtonComponent,
} from "../../../component/atom";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import { CreateForumForm, MainForumCard } from "../../../component/molecule";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import _, { initial } from "lodash";
import { getText } from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ForumMainScreen = ({
  forumList,
  getForumList,
  joinForum,
  verifyToken,
  getStdCourseList,
  stdCourseList
}) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [newcourseList, setCourseList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [course, setCourse] = useState("");
  const [originalList, setOriginalList] = useState();

  useEffect(() => {
    const initial_course = localStorage.getItem("firstcourse");
    console.log(initial_course, 'initial course');

    const result = _.map(forumList, ({ id, forums }) => ({ id, forums }));
    const initialCourseNumber = parseInt(initial_course, 10);
    const foundObject = _.find(result, ({ id }) => id === initialCourseNumber);
    setList(foundObject?.forums);
    setOriginalList(foundObject?.forums)
  }, [forumList]);


  useEffect(() => {
    getStdCourseList();
  }, []);


  useEffect(() => {
    const list = _.map(stdCourseList, (item, index) => {
      return {
        id: item.course_id,
        course_id: item.course_id,
        name: item.course_name,
      };
    });
    setCourseList(list);
    setCourse(list[0]?.id);

  }, [stdCourseList]);

  useEffect(() => {
    getForumList({ dashboard: 2 });
  }, []);



  const navigateToForumMessage = (item) => {
    // 👇️ navigate to /contacts
    navigate("/forum-message", {
      state: { forumId: _.get(item, "id", ""), forum: item },
    });
  };

  const onChange = (value) => {
    const text = getText(value);
    console.log(list, 'initial listttt')
    console.log(originalList, 'original listttt')
    if (text == "" || text == null) {
      setList(originalList);
    } else {
      var filteredData = list.filter(function (values) {
        console.log(values, 'valuesss')
        var search_string =
          values.name;
        console.log(search_string, 'serah')
        return search_string.toLowerCase().includes(text.toLowerCase());
      });
      console.log(filteredData)
      const data2 = _.values(filteredData);
      setList(data2);
    }
    setText(text);

  };


  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    // console.log(course,'course')
    console.log(Selectedvalue)
    setCourse(Selectedvalue);
    if (
      Selectedvalue !== null ||
      Selectedvalue !== undefined ||
      Selectedvalue !== ""
    ) {
      const result = _.map(forumList, ({ id, forums }) => ({ id, forums }));
      const foundObject = _.find(result, ({ id }) => id === Selectedvalue);
      console.log(foundObject);
      setList(foundObject?.forums);
      setOriginalList(foundObject?.forums)
    }
  };

  return (
    <>
      <Box className="main-screen-container">
        <Box mt={3}>
          <HeadingComponent
            text={"Forum"}
            fontweigth={600}
            size={26}
            fontfamily={"Montserrat"}
          />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: 'center',
              mt: 3.5,
              mb: 2.5
            }}
          >
            <SearchBarComponent value={text} onchange={onChange} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', flex: 0.8 }}>
              <Box sx={{ flex: 0.4 }}>
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
              <Box>
                <TextIconButtonComponent btnText={"Create a forum"} icon={faPlus} onclick={() => setOpen(true)} />

              </Box>

            </Box>
          </Box>

          {list && list.map((item, index) => {
            return (
              <MainForumCard
                onJoinForm={() => {
                  joinForum({ forum_id: item.id });
                }}
                item={item}
                key={`std_forum-${index}_number`}
                onForumView={() => navigateToForumMessage(item)}
              />
            );
          })}
        </Box>


      </Box>
      <DialogComponent
        isShowCloseButton={false}
        title={
          <span className="modalTitle modalTitleBlack">
            Create new{" "}
            <span
              style={{ color: "#9834F0" }}
              className="modalTitle modalTitleGreen"
            >
              forum
            </span>
          </span>
        }
        open={open}
        onClose={() => setOpen(false)}
        backgroundColor={"#fffff"}
      >
        <CreateForumForm courseList={newcourseList} onClose={() => setOpen(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    forumList: state.forum.get("forumList"),
    stdCourseList: state.course.get("stdCourseList"),
    courseList: state.course.get("commonCourseList"),
    stdCourseList: state.course.get("stdCourseList"),
  }),
  {
    getForumList: Actions.forum.getForumList,
    joinForum: Actions.forum.joinForum,
    verifyToken: Actions.auth.verifyToken,
    getCourseList: Actions.course.getCourseList,
    getStdCourseList: Actions.course.getStdCourseList,
  }
)(ForumMainScreen);

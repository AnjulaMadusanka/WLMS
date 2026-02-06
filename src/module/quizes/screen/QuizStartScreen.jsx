import React from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import { useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import {
  MainTitle,
  SearchBarComponent,
  VideoPlayerComponent,
} from "../../../component/atom";
import {
  CourseViewCard,
  QuizAttemptCard,
  QuizMainCard,
  QuizMarkCard,
  SampleVideoCard,
} from "../../../component/molecule";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Actions } from "../../../core/modules/Actions";
import _ from "lodash";
import moment from "moment";
import { getText } from "../../../core/Constant";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";

const QuizStartScreen = ({
  stdquizList,
  stdgetQuizlist,
  quizStateChange,
  courseList,
  getCourseList,
  getStdCourseList,
  stdCourseList,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [quizlist, setQuizList] = useState();
  const [filteredValue, setFilteredValue] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [newcourseList, setCourseList] = useState([]);
  const [course, setCourse] = useState("");

  const navigateToQuizMain = (value) => {
    navigate("/quiz-main", {
      state: { quizData: value },
    });
  };

  const navigateToAttempts = (value) => {
    navigate("/quiz-attempt", { state: { quiz: value } });
  };

  useEffect(() => {
    quizStateChange(false);
  }, []);

  useEffect(() => {
    getCourseList();
  }, []);

  useEffect(() => {
    getStdCourseList();
  }, []);

  useEffect(() => {
    const intial_course = localStorage.getItem("firstcourse");
    stdgetQuizlist(intial_course);
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

  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    console.log(Selectedvalue)
    setCourse(Selectedvalue);
    if (
      Selectedvalue !== null ||
      Selectedvalue !== undefined ||
      Selectedvalue !== ""
    ) {
      stdgetQuizlist(Selectedvalue);
      quizStateChange(false);
    }
  };



  useEffect(() => {
    // const list = _.groupBy(stdquizList, "week");

    // const data = _.values(list);
    // setValue(data);
    setFilteredValue(stdquizList);
  }, [stdquizList]);

  useEffect(() => {}, [searchInput]);

  const handleSearch = (searchedValue) => {
    setSearchInput(searchedValue);
   
    const list = _(stdquizList)
      .filter((item) =>
        item?.name?.toLowerCase().includes(searchedValue?.toLowerCase())
      )
      .value();
      setFilteredValue(list);
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid
          alignItems={"center"}
          mt={"15px"}
          container
          justifyContent={"space-between"}
        >
          <Grid item xs={6} md={4} lg={6} sm={4}>
            <HeadingComponent
              fontweigth={600}
              size={"26px"}
              color={"#2d3945"}
              text={"Quizzes"}
            />
          </Grid>
          <Grid item xs={3} sm={4} lg={3}>
            <DropDownComponent
              isShowPlaceholder={true}
              isShowZero={newcourseList.length > 0 ? false : true}
              initialValue="Select Course"
              onchange={onCourseChange}
              radius={"15px"}
              list={newcourseList}
              selectedValue={course}
            />
          </Grid>
          <Grid item xs={3} sm={4} lg={3}>
            <SearchBarComponent
              value={searchInput}
              onchange={(e) => handleSearch(getText(e))}
            />
          </Grid>
        </Grid>
        {filteredValue.length === 0 ? (
          <>
            <p style={{ marginTop: "15px" }} className="week-text">
              No Quizes found
            </p>
            <p style={{ marginTop: "1%" }} className="week-text">
              Please Select Your Course
            </p>
          </>
        ) : (
          <></>
        )}

        <Grid container sx={{gap: 2}}>
          {filteredValue?.map((value, count) => {
            let leftattempts =
              value.no_of_attempts - value.quiz_status[0].attempts;

            let isAttempt =
              value.quiz_status[0].attempts > 0 &&
              value.no_of_attempts - value.quiz_status[0].attempts > 0;
            let status = value.quiz_status[0].attempts == 0;

            return (
              <Grid key={'quiz'+count} item>
                <QuizMarkCard
                  title={value?.name}
                  status={status}
                  onViewAttempsts={() => navigateToAttempts(value)}
                  attempts={leftattempts}
                  duration={value?.duration}
                  week={value?.week}
                  date={moment(
                    new Date(_.get(value, "created_at", new Date()))
                  ).format("DD MMM YYYY")}
                  onViewQuiz={() => navigateToQuizMain(value)}
                />
              </Grid>
            );
          })}
        </Grid>
        {/* <Grid container flexDirection={"column"} rowGap={3}>
          {_.map(filteredValue, (item, index) => {
            return (
              <Grid item>
                <Box>
                  <p className="quiz-card-txt">{value[index][0].week}</p>
                  <p className="quiz-card-subtext">(0{item.length} quiz)</p>
                </Box>

                <Grid container sx={{ paddingInlineStart: 5, gap: 2 }}>
                  {item?.map((value, count) => {
                    let leftattempts =
                      value.no_of_attempts - value.quiz_status[0].attempts;

                    let isAttempt =
                      value.quiz_status[0].attempts > 0 &&
                      value.no_of_attempts - value.quiz_status[0].attempts > 0;
                    let status = value.quiz_status[0].attempts == 0;

                    return (
                      <Grid item>
                        <QuizMarkCard
                          title={value.name}
                          status={status}
                          onViewAttempsts={() => navigateToAttempts(value)}
                          attempts={leftattempts}
                          duration={value.duration}
                          date={moment(
                            new Date(_.get(value, "created_at", new Date()))
                          ).format("DD MMM YYYY")}
                          onViewQuiz={() => navigateToQuizMain(value)}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid> */}
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    stdquizList: state.quizes.get("stdquizList"),
    courseList: state.course.get("commonCourseList"),
    stdCourseList: state.course.get("stdCourseList"),
  }),
  {
    stdgetQuizlist: Actions.quizes.stdgetQuizlist,
    quizStateChange: Actions.quizes.quizStateChange,
    getCourseList: Actions.course.getCourseList,
    getStdCourseList: Actions.course.getStdCourseList,
  }
)(QuizStartScreen);

import React, { useEffect, useRef, useState } from "react";
import { Box, Rating, Typography, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import {
  SearchBarComponent,
  VideoPlayerComponent,
} from "../../../component/atom";
import {
  AdminVideoCard,
  CourseViewCard,
  SampleVideoCard,
} from "../../../component/molecule";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import _ from "lodash";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import { getText } from "../../../core/Constant";

const WebinarMainScreen = ({
  getWebinar,
  webinarList,
  verifyToken,
  getStdCourseList,
  stdCourseList,
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);
  const [originalDataSet, setOriginalDataSet] = useState([]);
  const [newcourseList, setCourseList] = useState([]);
  const [course, setCourse] = useState("");
  const searchInput = (newvalue) => {
    setSearchValue(newvalue);

    if (newvalue == "" || newvalue == null) {
      setValue(originalDataSet);
    } else {
      var filteredData = webinarList.filter(function (values) {
        var search_string =
          values.content + " week " + values.week + "day " + values.day;
        return search_string.toLowerCase().includes(newvalue.toLowerCase());
      });
      const list2 = _.groupBy(filteredData, "week");
      const data2 = _.values(list2);
      setValue(data2);
    }
  };

  // useEffect(() => {
  //   getWebinar();
  // }, [])

  useEffect(() => {
    getStdCourseList();
    const intial_course = localStorage.getItem("firstcourse");
    getWebinar(intial_course);
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
    const list = _.groupBy(webinarList, "week");
    const data = _.values(list);
    setValue(data);
    setFilteredValues(data);
    setOriginalDataSet(data);
  }, [webinarList]);

  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    setCourse(Selectedvalue);
    if (
      Selectedvalue !== null ||
      Selectedvalue !== undefined ||
      Selectedvalue !== ""
    ) {
      getWebinar(Selectedvalue);
    }
    // setCourseError(false)
    // setCourseValid(true)
  };

  const onViewVideo = (item) => {
    // window.location.href = item;
    navigate("/course-video", { state: { course: item } });
  };
  return (
    <>
      <Grid className="main-screen-container" container flexDirection={"column"} rowSpacing={1}  mt={2}>
        <Grid item>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <HeadingComponent
                text={"Webinar Archive"}
                size={"26px"}
                color={"#2d3945"}
                fontfamily={"Montserrat"}
                fontweigth={600}
              />
            </Grid>
            <Grid item>
              <Grid container alignItems={"center"}>
                <Grid item>
                  <DropDownComponent
                    isShowPlaceholder={true}
                    isShowZero={false}
                    initialValue="Select Course"
                    onchange={onCourseChange}
                    radius={"15px"}
                    list={newcourseList}
                    selectedValue={course}
                  />
                </Grid>
                <Grid item>
                  <SearchBarComponent
                    value={searchValue}
                    onchange={(e) => searchInput(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container flexDirection={"column"} >
            {value?.map((item, index) => {

              const week = value[index][0].week;

              return (
                <Grid item xs={12} >
                  <Box  mb={3}>
                    <p className="week-text">{week}</p>
                    </Box>
                    <Grid container rowGap={2} columnGap={3}>
                      {item?.map((value, count) => {
                        return value?.day != "0" ? (
                          <>
                            <Grid item>
                              <SampleVideoCard
                                onViewVideo={() => onViewVideo(value)}
                                thumbnail={value?.thumbnail}
                                videoUrl={value?.content_link}
                                description={
                                  value?.week + " - " + "Day " + value?.day
                                }
                                btnText={"Watch"}
                                title={value?.content}
                              />
                            </Grid>
                          </>
                        ) : (
                          null
                        );
                      })}
                    </Grid>
                 
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state) => ({
    webinarList: state.webinar.get("webinarList"),
    stdCourseList: state.course.get("stdCourseList"),
  }),
  {
    getWebinar: Actions.webinar.getWebinar,
    verifyToken: Actions.auth.verifyToken,
    getStdCourseList: Actions.course.getStdCourseList,
  }
)(WebinarMainScreen);

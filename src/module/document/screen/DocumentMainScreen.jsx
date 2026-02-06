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
  DocumentCard,
  SampleVideoCard,
} from "../../../component/molecule";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import _ from "lodash";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import DropDownComponent from "../../../component/atom/Inputs/DropDown";
import { getText } from "../../../core/Constant";
import { baseappURL } from "../../../core/repository/Repository";

const DocumentMainScreen = ({
  getStdCourseList,
  stdCourseList,
  getDocumentList,
  documentList
}) => {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);
  const [originalDataSet, setOriginalDataSet] = useState([]);
  const [newcourseList, setCourseList] = useState([]);
  const [course, setCourse] = useState("");
  const [baseUrl,setBaseUrl] = useState("");
  const searchInput = (newvalue) => {
    setSearchValue(newvalue);

    if (newvalue == "" || newvalue == null) {
      setValue(originalDataSet);
    } else {
      var filteredData = originalDataSet?.filter(function (values) {
        var search_string =
          values.name;
        return search_string.toLowerCase().includes(newvalue.toLowerCase());
      });
     setValue(filteredData);
    }
  };



  useEffect(() => {
    getStdCourseList();
    const intial_course = localStorage.getItem("firstcourse");
    getDocumentList(intial_course);
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
    if (documentList && documentList.documents) {
      const filteredDocuments = documentList.documents.filter(doc => doc.status === 1) || [];
      setValue(filteredDocuments);
      setOriginalDataSet(filteredDocuments);
    }
    setBaseUrl(baseappURL)
  }, [documentList]);

  const onCourseChange = (e) => {
    const Selectedvalue = getText(e);
    setCourse(Selectedvalue);
    if (
      Selectedvalue !== null ||
      Selectedvalue !== undefined ||
      Selectedvalue !== ""
    ) {
      getDocumentList(Selectedvalue);
    }
  };


  const navigateToDocumentScreen = (item) => {
    navigate('/view-document', {
        state: {
          document:item,
          baseurl:baseUrl
        }
    });
};
  return (
    <>
      <Grid className="main-screen-container" container flexDirection={"column"} rowSpacing={1}  mt={2}>
        <Grid item>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <HeadingComponent
                text={"Document"}
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

                    <Grid container rowGap={2} columnGap={4}>
                    {
                value?.length == 0 ? <span className="no-review-text" >
                    Currently, there are no Documents available for this course.
                </span> : <>
                    {
                        value?.map((item, index) => {
                         
                            return (
                                <DocumentCard onViewDocument={() => navigateToDocumentScreen(item)} title={item.name.replace(/\.[^/.]+$/, '')} btnText={'View Document'} />
                            )
                        })
                    }
                </>
            }
                    </Grid>
                 
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
    documentList: state.document.get("documentList"),
  }),
  {
    getWebinar: Actions.webinar.getWebinar,
    verifyToken: Actions.auth.verifyToken,
    getStdCourseList: Actions.course.getStdCourseList,
    getDocumentList:Actions.document.getDocumentList
  }
)(DocumentMainScreen);

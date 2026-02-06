import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent, Grid } from "@mui/material";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import HeadingComponent from "../../../../component/atom/Headings/Heading";
import TextInputComponent from "../../../../component/atom/Inputs/TextInput";
import AdminCourseWeekContent from "../../../../component/molecule/Forms/courseAdmin/AdminCourseWeekContent";
import AdminCourseContentEditForm from "../../../../component/molecule/Forms/courseAdmin/AdminCourseContentEditForm";
import AdminCourseSectionEditForm from "../../../../component/molecule/Forms/courseAdmin/AdminCourseSectionEditForm";
import AdminCourseWeekQuiz from "../../../../component/molecule/Forms/courseAdmin/AdminCourseWeekQuiz";
import TextButtonComponet from "../../../../component/atom/Buttons/TextButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  IconButtonComponent,
  TextIconButtonComponent,
} from "../../../../component/atom";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { faUsers, faLock, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setTopLevelNavigator } from "../../../../core/services/NavigationServicd";
import _ from "lodash";
import TableComponent from "../../../../component/atom/Table/TableComponent";
import { PopUpMessageComponent } from "../../../../component/molecule";

const AdminCourseContentEdit = ({
  getCourseContent,
  courseContent,
  getCourseMainDetails,
  mainDetailsState,
  deleteCourseContent,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [scroll, setScroll] = useState("paper");
  const [courseName, setCourseName] = useState("");
  const [expanded, setExpanded] = useState(1);
  const [existingWeekCount, setExistingWeekCount] = useState(0);
  const [existingWeekArray, setExistingWeekArray] = useState([]);
  const [existingWeekData, setExistingWeekData] = useState([]);
  const [weekCount, setWeekCount] = useState(1);
  const [weekValues, setWeekValues] = useState([]);
  const [weekContent, setWeekContent] = useState(false);
  const [updateContentData, setUpdateContentData] = useState("");
  const [newContentDay, setNewContentDay] = useState(0);
  const [contentAddingWeekNo, setContentAddingWeekNo] = useState(0);
  const [updateContentModal, setUpdateContentModal] = useState(false);
  const [maxWeekCount, setMaxWeekCount] = useState(0);
  const [weekQuiz, setWeekQuiz] = useState(false);
  const [id, setId] = useState("");
  const [confirmDeleteContent, setConfirmDeleteContent] = useState(false);
  const [courseContentDetails, setCourseContentDetails] = useState({
    course_id: 0,
    course_content_id: 0,
  });
  const [updateSectionModal, setUpdateSectionModal] = useState(false);
  const [selectedSectionDetails, setSelectedSectionDetails] = useState({
    section_id: 0,
    section_name: "",
  });
  const [sectionState, setSectionState] = useState(0);
  const [modalTitle, setModalTitle] = useState(0);
  const [selectedSectionName, setSelectedSectionName] = useState("");
  const [updateSectionName, setUpdateSectionName] = useState("");

  useEffect(() => {
    const id = _.get(location, "state.id", _.get(params, "id"));
    if (id) {
      getCourseContent(id);
      getCourseMainDetails({
        id,
      });
      setId(id);
    }
  }, [location, params]);

  useEffect(() => {
    setCourseName(mainDetailsState.name);
    setMaxWeekCount(mainDetailsState.duration);

    var weekArray = [];
    for (let i = 0; i < courseContent.length; i++) {
      if (!weekArray.includes(courseContent[i].week)) {
        weekArray.push(courseContent[i].week);
      }
    }
    setExistingWeekCount(weekArray.length);
    setExistingWeekArray(weekArray);

    setExistingWeekData(courseContent);
  }, [mainDetailsState, courseContent]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const addInputField = () => {
    setContentAddingWeekNo(1);
    setNewContentDay(1);
    setWeekContent(true);
  };

  const addNewWeekSection = () => {
    setContentAddingWeekNo(existingWeekArray.length + 1);
    setNewContentDay(1);
    setSectionState(0);
    setModalTitle("Create New Section Content");
    setWeekContent(true);
  };

  function filterVideo(values) {
    return values.content_type == "1";
  }

  const dayContentModalLoad = (week, sectionName) => {
    var weekDayCount = 0;
    if (existingWeekArray.length != 0) {
      const contentArray = courseContent[week - 1].content;
      weekDayCount = contentArray.filter(filterVideo).length;
    }

    setNewContentDay(weekDayCount + 1);
    setContentAddingWeekNo(week);
    setSectionState(1);
    setModalTitle("Add New Content - " + sectionName);
    setSelectedSectionName(sectionName);
    setWeekContent(true);
  };

  const loadContentEditModal = (contentData) => {
    setUpdateContentData(contentData);
    setUpdateSectionName(contentData.week);
    setUpdateContentModal(true);
  };

  const quizAddModalLoad = (week, sectionName) => {
    setContentAddingWeekNo(week);
    setSelectedSectionName(sectionName);
    setWeekQuiz(true);
  };

  const loadContentDeleteModal = (contentData) => {
    setCourseContentDetails({
      course_id: contentData.course_id,
      course_content_id: contentData.id,
    });
    setConfirmDeleteContent(true);
  };

  const deleteCourseContentbtn = () => {
    deleteCourseContent(
      courseContentDetails?.course_content_id,
      courseContentDetails.course_id
    );
    setConfirmDeleteContent(false);
  };

  const loadSectionEditModal = (sectionName, sectionId) => {
    setSelectedSectionDetails({
      section_id: sectionId,
      section_name: sectionName,
    });

    setUpdateSectionModal(true);
  };

  return (
    <>
      <Box className="main-screen-container">
        <Grid container flexDirection={"column"} rowSpacing={4}>
          <Grid item>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <HeadingComponent
                  text={courseName + " Course Content"}
                  fontWeight={600}
                  size={30}
                  fontFamily={"Montserrat"}
                  backNavigation={true}

                />
              </Grid>
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextIconButtonComponent
                      btnText={"Add Section"}
                      icon={faAdd}
                      onclick={addNewWeekSection}
                    />
                  </Grid>

                  {/* <Grid item>
                    <TextIconButtonComponent
                      btnText={"Go to live classes"}
                      icon={faUsers}
                      onclick={() => navigate("/admin-webinar")}
                    />
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>

          </Grid>
          {/* <Grid item> */}
          {/* <Grid container justifyContent={"space-between"} pl={2.5} pr={2.5}> */}
          {/* <Grid item>
                <TextButtonComponet
                  onButtonClick={() => navigate(-1)}
                  text={"Back"}
                  classStyle="btn btn-secondary"
                />
              </Grid> */}
          {/* <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextIconButtonComponent
                      btnText={"Add Section"}
                      icon={faAdd}
                      onclick={addNewWeekSection}
                    />
                  </Grid>

                  <Grid item>
                    <TextIconButtonComponent
                      btnText={"Go to live classes"}
                      icon={faUsers}
                      onclick={() => navigate("/admin-webinar")}
                    />
                  </Grid>
                </Grid>
              </Grid> */}
          {/* </Grid> */}
          {/* </Grid> */}

          <Grid item>
            <Box >
              {existingWeekCount != 0 ? (
                <>
                  {existingWeekData.map((_, index) => (
                    <>
                      <Accordion
                        expanded={expanded === index + 1}
                        onChange={handleChange(index + 1)}
                      >
                        <AccordionSummary
                          style={{
                            backgroundColor: "rgba(131, 29, 220, 0.295)",
                          }}
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item style={{ display: "flex" }}>
                              <Typography p={1}>
                                {existingWeekData[index].week}
                              </Typography>
                              <IconButtonComponent
                                btnType={"editbtn"}
                                onclick={() =>
                                  loadSectionEditModal(
                                    existingWeekData[index].week,
                                    existingWeekData[index].content[0].id
                                  )
                                }
                              />
                            </Grid>

                            <Grid item style={{ display: "flex" }}>
                              <TextIconButtonComponent
                                style={{ marginRight: "5px" }}
                                buttonStyleClass={"btn btn-warning"}
                                btnText={"Add New Content"}
                                onclick={() =>
                                  dayContentModalLoad(
                                    index + 1,
                                    existingWeekData[index].week
                                  )
                                }
                              />
                              &nbsp;
                              <TextIconButtonComponent
                                btnText={"Add Quiz"}
                                onclick={() =>
                                  quizAddModalLoad(
                                    index + 1,
                                    existingWeekData[index].week
                                  )
                                }
                              />
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* <Table  aria-label="simple table" xs={12} > */}
                          <div style={{ overflowX: "auto" }}>
                            <table id="course-content">
                              <tr>
                                <th>Day </th>
                                <th>Title</th>
                                {/* <th>Video Link</th> */}
                                <th>Duration (Min)</th>
                                <th></th>
                                <th></th>
                                <th></th>
                              </tr>

                              <tbody>
                                {existingWeekData[index].content
                                  .sort(
                                    (a, b) => a.content_type - b.content_type
                                  )
                                  .map((_, dataIndex) => (
                                    <>
                                      <tr>
                                        <td>
                                          <span>
                                            {existingWeekData[index].content[
                                              dataIndex
                                            ].content_type == "1" ? (
                                              <>
                                                {
                                                  existingWeekData[index]
                                                    .content[dataIndex].day
                                                }
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <span>
                                            {
                                              existingWeekData[index].content[
                                                dataIndex
                                              ].content
                                            }
                                          </span>
                                        </td>
                                        {/* <td>
                                          <span
                                            style={{
                                              width: 20,
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                              textOverflow: "ellipsis",
                                            }}
                                          >
                                            {existingWeekData[index].content[
                                              dataIndex
                                            ].content_type == "1" ? (
                                              <>
                                                {" "}
                                                {
                                                  existingWeekData[index]
                                                    .content[dataIndex]
                                                    .content_link
                                                }{" "}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td> */}
                                        <td
                                          style={{
                                            textAlign: "center",
                                          }}
                                        >
                                          <span>
                                            {
                                              existingWeekData[index].content[
                                                dataIndex
                                              ].duration
                                            }
                                          </span>
                                        </td>
                                        <td>
                                          {existingWeekData[index].content[
                                            dataIndex
                                          ].is_locked == "1" ? (
                                            <FontAwesomeIcon icon={faLock} />
                                          ) : (
                                            <></>
                                          )}
                                        </td>
                                        <td>
                                          {" "}
                                          <IconButtonComponent
                                            btnType={"editbtn"}
                                            onclick={() =>
                                              loadContentEditModal(
                                                existingWeekData[index].content[
                                                dataIndex
                                                ]
                                              )
                                            }
                                          />
                                        </td>

                                        <td>
                                          {" "}
                                          <IconButtonComponent
                                            btnType={"deleteIconbtn"}
                                            onclick={() =>
                                              loadContentDeleteModal(
                                                existingWeekData[index].content[
                                                dataIndex
                                                ]
                                              )
                                            }
                                          />
                                        </td>
                                      </tr>
                                    </>
                                  ))}
                              </tbody>
                            </table>
                            {/* </Table> */}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}

              {weekValues?.map((_, index) => (
                <Box key={index}>
                  <Accordion
                    expanded={expanded === index + 1}
                    onChange={handleChange(index + 1)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Week {index + 1}</Typography>
                      <Box ml={90} style={{ float: "right", display: "flex" }}>
                        <TextIconButtonComponent
                          style={{ float: "right" }}
                          btnText={"Add Content"}
                          onclick={() =>
                            dayContentModalLoad(
                              index + 1,
                              existingWeekData[index].week
                            )
                          }
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box className="admin-course-content-form-wrap">
                        <Box className="admin-course-input-group"></Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <DialogComponent
        title={modalTitle}
        open={weekContent}
        maxwidth={"lg"}
        onClose={() => setWeekContent(false)}
      >
        <AdminCourseWeekContent
          courseID={id}
          weekNo={contentAddingWeekNo}
          dayNo={newContentDay}
          dataState={sectionState}
          sectionName={selectedSectionName}
          onClose={() => setWeekContent(false)}
        />
      </DialogComponent>
      <DialogComponent
        title={"Quiz - " + selectedSectionName}
        open={weekQuiz}
        maxwidth={"lg"}
        onClose={() => setWeekQuiz(false)}
      >
        <AdminCourseWeekQuiz
          courseID={id}
          weekNo={contentAddingWeekNo}
          dayNo={newContentDay}
          sectionName={selectedSectionName}
          onClose={() => setWeekQuiz(false)}
        />
      </DialogComponent>
      <DialogComponent
        title={"Update Content - " + updateSectionName}
        open={updateContentModal}
        onClose={() => setUpdateContentModal(false)}
      >
        <AdminCourseContentEditForm
          courseContentData={updateContentData}
          onClose={() => setUpdateContentModal(false)}
        />
      </DialogComponent>

      <DialogComponent
        title={"Update Section Name"}
        open={updateSectionModal}
        onClose={() => setUpdateSectionModal(false)}
      >
        <AdminCourseSectionEditForm
          courseSectionData={selectedSectionDetails}
          onClose={() => setUpdateSectionModal(false)}
        />
      </DialogComponent>

      <PopUpMessageComponent
        open={confirmDeleteContent}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want delete this content?"}
        btntext={"Yes, delete"}
        onclick={() => deleteCourseContentbtn()}
        altbtntext={"No"}
        altonclick={() => setConfirmDeleteContent(false)}
        onclose={() => setConfirmDeleteContent(false)}
      />
    </>
  );
};

export default connect(
  (state) => ({
    mainDetailsState: state.course.get("mainDetailsState"),
    courseContent: state.course.get("courseContent"),
  }),
  {
    getCourseContent: Actions.course.getCourseContent,
    getCourseMainDetails: Actions.course.getCourseMainDetails,
    deleteCourseContent: Actions.course.deleteCourseContent,
  }
)(AdminCourseContentEdit);

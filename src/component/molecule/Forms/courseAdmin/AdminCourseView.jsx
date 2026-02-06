import React, { useState, useEffect } from "react";
import { Box, DialogContent, Divider, Grid } from "@mui/material";
import TextInputComponent from "../../../atom/Inputs/TextInput";
import { TextIconButtonComponent } from "../../../atom";
import { useNavigate } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Actions } from "../../../../core/modules/Actions";
import { connect } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";
import { IMAGE_URL } from "../../../../core/Constant";

const AdminCourseFormView = ({
  courseID,
  getCourseMainDetails,
  mainDetailsState,
}) => {
  const [scroll, setScroll] = useState("paper");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState([]);
  const [lecturer, setLecturer] = useState("");
  const [description, setDescription] = useState("");
  const [course_image, setCourseImage] = useState("");
  const [totalEnrolled, setTotalEnrolled] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    getCourseMainDetails({
      id: courseID,
    });
  }, [courseID]);

  useEffect(() => {
    console.log(mainDetailsState, "mainState");
    setName(mainDetailsState.name);
    setDescription(mainDetailsState.description);
    setDuration(mainDetailsState.duration);
    setLecturer(mainDetailsState.lecturer);
    // setPrice(
    //   getSymbolFromCurrency(mainDetailsState.currency) +
    //     mainDetailsState?.course_currencies
    // );
    setPrice(mainDetailsState?.course_currencies);
    setCourseImage(mainDetailsState.course_image);
    setTotalEnrolled(mainDetailsState.total_enrolled);
  }, [mainDetailsState]);

  return (
    <>
      <form>
        <DialogContent>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
              <TextIconButtonComponent
                icon={faStar}
                btnText={"View Reviews"}
                onclick={() =>
                  navigate("/admin-review", {
                    state: {
                      course_id: courseID,
                    },
                  })
                }
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <img
                src={IMAGE_URL + course_image}
                style={{
                  objectFit: "contain",
                  width: "350px",
                  height: "250px",
                }}
                alt="course-image"
              />
            </Box>

            <Box>
              <TextInputComponent
                label={"Name"}
                placeholder="abc"
                value={name}
              />
            </Box>

            <Box>
              <p
                style={{
                  padding: 12,
                  margin: 0,
                  marginBottom: 10,
                  color: "#4E657C",
                  fontSize: 19,
                  fontWeight: 700,
                }}
              >
                Price
              </p>
              <Grid container p={2} gap={2} justifyContent={"center"}>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Currency
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Currency Name
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Amount
                      </span>
                    </Grid>
                  </Grid>
                </Grid>

                {price?.map((item, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      key={index + 1}
                      sx={{ backgroundColor: "#f2f6f8" }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <span>{item?.currency?.currency} </span>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <span>{item?.currency?.currency_name}</span>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <span>{item?.price}</span>
                        </Grid>
                      </Grid>
                      {/* <Divider variant="middle" /> */}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Box>
              <TextInputComponent
                label={"Duration (Weeks)"}
                placeholder="3"
                value={duration}
              />
            </Box>

            <Box>
              <TextInputComponent
                label={"Total Enrolled"}
                placeholder="456"
                value={totalEnrolled}
              />
            </Box>

            <Box>
              <TextInputComponent
                label={"Lecturer"}
                placeholder="Tom Hardy"
                value={lecturer}
              />
            </Box>

            <Box m={1}>
              <p
                style={{
                  padding: 0,
                  margin: 0,
                  marginBottom: 10,
                  color: "#4E657C",
                  fontSize: 19,
                  fontWeight: 700,
                }}
              >
                Description
              </p>

              <Box p={1} sx={{ backgroundColor: "#F2F6F8", borderRadius: 2 }}>
                <span
                  style={{
                    fontFamily: "Montserrat",
                    // fontWeight: 500,
                    color: "#b0b3b6",
                  }}
                >
                  {description}
                </span>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </form>
    </>
  );
};

export default connect(
  (state) => ({
    mainDetailsState: state.course.get("mainDetailsState"),
  }),
  {
    getCourseMainDetails: Actions.course.getCourseMainDetails,
  }
)(AdminCourseFormView);

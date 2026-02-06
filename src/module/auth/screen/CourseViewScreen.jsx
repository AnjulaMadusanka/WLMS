import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Rating,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import {
  CourseListCard,
  CourseRatingCard,
  DialogAlert,
  OrientaionForm,
  Popup,
  SignUpForm,
} from "../../../component/molecule";
import DialogComponent from "../../../component/atom/Dialog/Dialog";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { CourseTabContainer } from "../../../component/organism";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import {
  IMAGE_URL,
  getText,
  onGetCountrySymble,
  onGetCurrencySymble,
} from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { IconButtonComponent } from "../../../component/atom";
import { HeaderStudent } from "../../../component/organism/Header";

const CourseViewScreen = ({
  initCourse,
  getInitialCourseDetails,
  verifyToken,
  systemCurrency,
  getSystemCurrency,
  show
}) => {
  const [value, setValue] = React.useState(2);
  const location = useLocation();
  const [openPopup, setOpenPopup] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [allCourse, setAllCourse] = useState(false);
  const [freeOrientation, setFreeOrientation] = useState(false);
  const [newcourse, setNewCourse] = useState([]);
  const [data, setData] = useState({});
  const [courseContent, setCourseContent] = useState([]);
  const params = useParams();
  // let courseId = location?.state.courseId;
  const [courseId, setCourseId] = useState("");

  const [currencyList, setCurrencyList] = useState([]);
  const [currencyValue, setCurrencyValue] = useState([]);


  const [isShow, setIsShow] = useState(0);


  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);




  let currancyId = localStorage.getItem('GlobalCurrency');

  useEffect(() => {
    // console.log(systemCurrency,'systemCurrency')
    const list = _.map(systemCurrency, (item, index) => {
      return {
        id: item.id,
        currency: item.currency,
        currency_name: item.currency_name,
      };
    });
    // console.log(list,'currncy lissssss')
    setCurrencyList(list);
    setCurrencyValue(list[0]?.id);
    // console.log(currency,'curnncy seteeeeee')
  }, [systemCurrency]);

  const onCurrancyChange = (e) => {
    const Selectedvalue = getText(e);
    setCurrencyValue(Selectedvalue);

    localStorage.setItem("GlobalCurrency", Selectedvalue)
  };

  useEffect(() => {
    let newcurrancyId = localStorage.getItem('GlobalCurrency');
    // newcurrancy = JSON.parse(newcurrancy);
    setCurrencyValue(newcurrancyId)
    // setCurrency(newcurrancy)
    // console.log(JSON.parse(newcurrancy), price, 'course curncieeesss',currencyValue)
  }, [])

  useEffect(() => {
    let courseId = location?.state.courseId;
    setCourseId(courseId);
  }, [location, params]);

  const openInPopup = (item) => {
    setOpenPopup(true);
  };

  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    intervalRef.current = onNavigate;
    setTopLevelNavigator(intervalRef);
  }, [navigate]);

  const setCourse = () => {
    var course = initCourse.filter((course) => course.id == courseId);
    setNewCourse(course);
    setCourseContent(course.course_contents);
  };

  useEffect(() => {
    setAllCourse(initCourse);
    setCourse();
  }, [initCourse]);

  useEffect(() => {
    getInitialCourseDetails();
  }, []);

  const submitFreeOrientation = () => { };
  return (
    <>
      <Box p={2} sx={{ backgroundColor: "#ffffff" }}>
        <Grid container>
          <Grid item>
            <Box>
              <IconButtonComponent
                onclick={() => navigate(-1)}
                btnType="backbtn"
                btnText="Back"
              />
            </Box>
          </Grid>

          {isShow ?
            <HeaderStudent dashboard={true} onCurrancyChange={onCurrancyChange} currancy={currencyValue} newcurrancyList={currencyList} />
            : null
          }

        </Grid>

        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            width: "fit-content",
            height: "fit-content",
            borderRadius: "44px",
            alignSelf: "center",
            backgroundColor: "#ffffff",
            justifyContent: "center",
          }}
        >
          {newcourse?.map((item, index) => {
            return (
              <div key={`course-view-${index}`}>
                <Grid container>
                  <Grid item>
                    <Avatar
                      alt="Image"
                      src={IMAGE_URL + item?.course_image}
                      sx={{
                        width: 800,
                        height: 220,
                        objectFit: "cover",
                        borderRadius: 4,
                        boxShadow: "0px 15px 15px -7px rgba(53, 79, 73, 0.36)",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Box mt={3}>
                      <CourseRatingCard
                        rating={item.averageRating}
                        pricetitle={"Price"}
                        price={`${onGetCurrencySymble(
                          _.get(item, "currency"),
                          "GBP"
                        )} ${_.get(item, "price", "")}`}
                        durationtitle={"Duration"}
                        duration={item.duration + " Weeks"}
                        title={item.name}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    height: "fit-content",
                    alignSelf: "center",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    className="text-description"
                    sx={{
                      color: " #2d3945",
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  >
                    Description
                  </Typography>
                  <span className="text-paragraph">{item?.description}</span>
                </Box>
                <Box>
                  <CourseTabContainer courseData={item} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: 1,
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    height: "fit-content",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Grid
                    container
                    spacing={1}
                    justifyContent={"center"}
                    mr={5}
                    ml={5}
                  >
                    <Grid item xs={6}>
                      <TextButtonComponet
                        classStyle={"btn btn-enroll btn-free"}
                        text="Free Orientation"
                        onButtonClick={() => setFreeOrientation(true)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextButtonComponet
                        classStyle={"btn btn-enroll"}
                        text="Enroll Now"
                        onButtonClick={() => setSignUp(true)}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </div>
            );
          })}
        </Box> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ maxWidth: 850 }}>
            <CardContent>
              {newcourse?.map((item, index) => {
                const indexValue = _.findIndex(_.get(item, 'course_currencies', []), i => {
                  return i.currency_id == currancyId
                });
                let price = _.get(item, 'course_currencies[0].price', 0.00);
                let currencyType = _.get(item, 'course_currencies[0].currency.currency', 'CAD')
                if (indexValue > -1) {
                  const dataList = _.get(item, 'course_currencies', []);
                  price = dataList[indexValue]?.price || 0.00
                  currencyType = dataList[indexValue]?.currency?.currency || 'CAD'

                }

                // course_currencies, 
                // currency_id
                // price
                return (
                  <div key={`course-view-${index}`}>
                    <Grid container flexDirection={"column"} rowGap={3}>
                      <Grid item>
                        <Avatar
                          alt="Image"
                          src={IMAGE_URL + item?.course_image}
                          sx={{
                            width: '100%',
                            height: 220,
                            objectFit: "cover",
                            borderRadius: 4,
                            boxShadow:
                              "0px 15px 15px -7px rgba(53, 79, 73, 0.36)",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <CourseRatingCard
                          rating={item.averageRating}
                          pricetitle={"Price"}
                          price={`${onGetCurrencySymble(currencyType)} ${price}`}
                          durationtitle={"Duration"}
                          duration={item.duration + " Weeks"}
                          title={item.name}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          className="text-description"
                          sx={{
                            color: " #2d3945",
                            fontSize: "22px",
                            fontWeight: 600,
                          }}
                        >
                          Description
                        </Typography>
                        <span className="text-paragraph">
                          {item?.description}
                        </span>
                      </Grid>
                      <Grid item>
                        <CourseTabContainer courseData={item} />
                      </Grid>
                      <Grid item>
                        <Grid display={'flex'} flexDirection={'row'} justifyContent={'space-between'} container>
                          <Grid item xs={5}>
                            <TextButtonComponet
                              classStyle={"btn btn-enroll btn-free"}
                              text="Free Orientation"
                              onButtonClick={() => setFreeOrientation(true)}
                            />
                          </Grid>

                          <Grid item xs={5}>
                            <TextButtonComponet
                              classStyle={"btn btn-enroll"}
                              text="Enroll Now"
                              onButtonClick={() => setSignUp(true)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </CardContent>
          </Box>
        </Box>
      </Box>

      <DialogComponent
        isShowCloseButton={false}
        border={30}
        open={freeOrientation}
        backgroundColor="#fff"
        onClose={() => setFreeOrientation(false)}
      >
        <OrientaionForm
          item={newcourse[0]}
          onClose={() => setFreeOrientation(false)}
        />
      </DialogComponent>
      <DialogComponent
        isShowCloseButton={false}
        border={30}
        open={signup}
        backgroundColor="#fff"
        onClose={() => setSignUp(false)}
      >
        <SignUpForm item={newcourse[0]} onClose={() => setSignUp(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    initCourse: state.guest.get("initCourse"),
    systemCurrency: state.auth.get("systemCurrency"),
    show: state.common.get('show')
  }),
  {
    getInitialCourseDetails: Actions.guest.getInitialCourseDetails,
    signUp: Actions.auth.signUp,
    verifyToken: Actions.auth.verifyToken,
    getSystemCurrency: Actions.auth.getSystemCurrency
  }
)(CourseViewScreen);



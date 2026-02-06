import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarContainer, TabContainer } from "../../../component/organism";
import Divider from "@mui/material/Divider";
import {
  CourseContentCard,
  CourseRatingCard,
  DocumentCard,
} from "../../../component/molecule";
import {
  CircularWithValueLabel,
  DurationButton,
  StarRatingoComponent,
  SubTitle,
} from "../../../component/atom";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
  IMAGE_URL,
  getText,
  onGetCountrySymble,
  onGetCurrencySymble,
} from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { IconButtonComponent } from "../../../component/atom";
import { IMAGES } from "../../../assets/Images";
import { HeaderStudent } from "../../../component/organism/Header";
const CourseDetailsScreen = ({
  getCousreDetails,
  coursedetails,
  course,
  verifyToken,
  getcourseProgress,
  courseprogress,
  systemCurrency,
  getSystemCurrency,
  documentList,
  getDocumentList,
  show
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courseID, setCourseId] = useState("");
  const [courseData, setCourseData] = useState();
  // const [newcourse, setNewCourse] = useState([]);
  const [progress, setProgress] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);
  const [imgWidth, setImgWidth] = useState(0);
  const [currency, setCurrency] = useState([])
  const [symbol, setSymbol] = useState()
  const [price, setPrice] = useState(0);

  const [currencyList, setCurrencyList] = useState([]);
  const [currencyValue, setCurrencyValue] = useState('');

  const [isShow, setIsShow] = useState(0);
  const [documents,setDocuments] = useState([])



  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);

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

  useEffect(() => {
    const courseDetails = location?.state;
    setIsRegistered(courseDetails?.is_registered);
    setImgWidth(courseDetails?.is_registered ? 750 : 1150);
    setCourseData(courseDetails?.course);
    setCourseId(courseDetails?.course_id);
  }, [location, imgWidth]);

  useEffect(() => {
    getCousreDetails(courseID);
    getDocumentList(courseID)
  }, [courseID]);

  useEffect(()=>{
  setDocuments(documentList)
  },[documentList])



  useEffect(() => {
    getcourseProgress();
    getSystemCurrency()
  }, []);

  useEffect(() => {
    let newcurrancyId = localStorage.getItem('GlobalCurrency');
    // newcurrancy = JSON.parse(newcurrancy);
    setCurrencyValue(newcurrancyId)
  }, [])

  useEffect(() => {
    const obj = _.find(courseprogress, (item) => item?.course_id == courseID);
    setProgress(obj);
    console.log(course,'courseeeee')
  }, [courseprogress, courseID]);



  useEffect(() => {

    if (courseData?.prices) {
      // const selectedCurrency = courseData?.prices.find(newcurrency => currencyValue === currency.currency_id);
      let selectedCurrency = _.find(courseData?.prices, item => item?.currency_id == currencyValue);
      if(courseData?.prices?.length==1){
        selectedCurrency = courseData?.prices[0]
      }

      if (selectedCurrency) {
        const currencySymbol = onGetCurrencySymble(_.get(selectedCurrency, "currency.currency"));
        const price = _.get(selectedCurrency, "price", "");
        console.log(selectedCurrency,"price  :",price,"llllll",courseData,"llll",currencyValue)
        setPrice(price)
        setSymbol(currencySymbol)
        // return `${currencySymbol}${price}`;
      }else {

      }
    }
  }, [courseData, currencyValue]);

  const onCurrancyChange = (e) => {
    const Selectedvalue = getText(e);
    setCurrencyValue(Selectedvalue);

    localStorage.setItem("GlobalCurrency", Selectedvalue)
  };




  return (
    <>

      <Box>
        <Box>
          <IconButtonComponent
            onclick={() => navigate(-1)}
            btnType="backbtn"
            btnText="Back"
          />
        </Box>
        {coursedetails.map((item, index) => {
          return (
            <Grid container flexDirection={"column"} rowGap={2} key={index + 1}>
              <Grid item>
                <HeadingComponent
                  text={"Course Details"}
                  fontweigth={600}
                  size={26}
                  fontfamily={"Montserrat"}
                />
                {isShow && !isRegistered && courseData?.is_free == 0 ?
                  <HeaderStudent dashboard={true} onCurrancyChange={onCurrancyChange} currancy={currencyValue} newcurrancyList={currencyList} />
                  : null}
              </Grid>
              <Grid item>
                <Grid container xs={12} columnGap={2}>
                  <Grid item flexGrow={1}>
                    <Avatar
                      src={IMAGE_URL + item?.course_image}
                      alt="course"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: 10,
                        height: 220,
                      }}
                    />
                  </Grid>
                  {isRegistered ? (
                    <Grid item>
                      <div
                        style={{
                          height: "100%",
                          padding: 10,
                          borderRadius: 15,
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "rgba(152, 52, 240, 0.2)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "Montserrat",
                              fontSize: "16px",
                              fontWeight: 800,
                            }}
                          >
                            Course progress
                          </p>
                          <CircularWithValueLabel
                            text={progress?.progress + "%"}
                            progress={progress?.progress}
                          />
                        </div>
                      </div>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                  <Grid item>
                    <span
                      style={{
                        color: " #2d3945",
                        fontSize: 22,
                        fontWeight: 800,
                        fontFamily: "Montserrat",
                      }}
                    >
                      {item?.name}
                    </span>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <StarRatingoComponent
                          readOnly={true}
                          selectValue={item?.averageRating}
                        />
                      </Box>
                      <Box>
                        <p
                          style={{
                            color: "#4a6375",
                            fontFamily: "Montserrat",
                            marginLeft: 10,
                          }}
                        >
                          {item?.totalRatingCount < 10
                            ? "0" + item?.totalRatingCount
                            : item?.totalRatingCount}
                          Reviews
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Grid container columnGap={1}>
                      <Grid item>
                        <DurationButton
                          subtitle={item.duration + " weeks"}
                          title={"Duration"}
                        />
                      </Grid>
                      <Grid item>
                       {isShow ? courseData?.is_free == 1? <DurationButton
                          title={"Price"}
                          subtitle={'Free'}
                        />  : <>{isRegistered == 0 ? <DurationButton
                          title={"Price"}
                          subtitle={symbol + price}
                       /> : null}</> : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TabContainer documentData={documents} data={course} />
              </Grid>
              {/* <Grid item></Grid> */}
            </Grid>
          );
        })}

        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 1,
            height: "auto",
            justifyContent: "space-between",
          }}
        ></Box>
        {coursedetails.map((item, index) => {
          if (!item.is_active) {
            return null;
          }
          return (
            <>
              <Grid container justifyContent={"space-between"} gap={1}>
                <Grid
                  item
                  lg={isRegistered ? 9.5 : 12}
                  xl={isRegistered ? 8 : 12}
                  md={isRegistered ? 8 : 12}
                  sx={{ borderRadius: 6 }}
                >
                 

                  <img
                    src={IMAGE_URL + item?.course_image}
                    alt="course"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      borderRadius: 10,
                      height: 220,
                    }}
                  />
                </Grid>
                {isRegistered ? (
                  <Grid item>
                    <div
                      style={{
                        height: "100%",
                        padding: 10,
                        borderRadius: 15,
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "rgba(152, 52, 240, 0.2)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: "16px",
                            fontWeight: 800,
                          }}
                        >
                          Course progress
                        </p>
                        <CircularWithValueLabel
                          text={progress?.progress + "%"}
                          progress={progress?.progres}
                        />
                      </div>
                    </div>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent={"space-between"}
                 
                  mt={1}
                >
                  <Grid item>
                    <Grid container flexDirection={"column"}>
                      <Grid item>
                        <span
                          style={{
                            color: " #2d3945",
                            fontSize: 22,
                            fontWeight: 800,
                            fontFamily: "Montserrat",
                          }}
                        >
                          {item?.name}
                        </span>
                      </Grid>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <StarRatingoComponent
                              readOnly={true}
                              selectValue={item?.averageRating}
                            />
                          </Grid>

                          <Grid item>
                            <p
                              style={{
                                color: "#4a6375",
                                fontFamily: "Montserrat",
                                marginLeft: 10,
                              }}
                            >
                              {item?.totalRatingCount < 10
                                ? "0" + item?.totalRatingCount
                                : item?.totalRatingCount}{" "}
                              Reviews
                            </p>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <DurationButton
                          subtitle={item.duration + " weeks"}
                          title={"Duration"}
                        />
                      </Grid>
                      <Grid item>
                        <DurationButton
                          subtitle={"Price"}
                          title={`${onGetCurrencySymble(
                            _.get(item, "currency"),
                            "GBP"
                          )} ${_.get(item, "price", "")}`}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  width: 1,
                  padding: 2,
                }}
              ></Box>

              

              <Box
                sx={{
                  maxWidth: 1100,
                  height: "auto",
                  minHeight: 500,
                  paddingRight: 4,
                }}
              >
                <TabContainer data={course} />
              </Box>

              <Divider />
              <Divider />
            </>
          );
        })} */}
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    coursedetails: state.course.get("coursedetails"),
    course: state.course.get("course"),
    courseprogress: state.home.get("courseprogress"),
    systemCurrency: state.auth.get("systemCurrency"),
    show: state.common.get('show'),
    documentList: state.document.get("documentList"),
  }),
  {
    getCousreDetails: Actions.course.getCousreDetails,
    verifyToken: Actions.auth.verifyToken,
    getcourseProgress: Actions.home.getcourseProgress,
    getSystemCurrency: Actions.auth.getSystemCurrency,
    getDocumentList:Actions.document.getDocumentList
  }
)(CourseDetailsScreen);



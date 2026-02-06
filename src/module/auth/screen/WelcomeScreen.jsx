import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Rating,
  SvgIcon,
  Typography,
} from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import { useNavigate } from "react-router-dom";
import { CourseMainCard } from "../../../component/molecule";
import {
  CourseListCard,
  CourseRatingCard,
  DialogAlert,
  OrientaionForm,
  Popup,
  SignUpForm,
} from "../../../component/molecule";
import DialogComponent from "../../../component/atom/Dialog/Dialog";
import { width } from "@mui/system";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import _ from "lodash";
import {
  IMAGE_URL,
  onGetCountrySymble,
  onGetCurrencySymble,
} from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import background from "../../../assets/Images/authSection/top-banner.jpg";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { IMAGES } from "../../../assets/Images";
import { AppDownloadButton } from "../../../component/atom";
import HeaderContainer from "../../../component/organism/Header/Header";
import { HeaderStudent } from "../../../component/organism/Header";
import { getText } from "../../../core/Constant";

const WelcomeScreen = ({
  initCourse,
  getInitialCourseDetails,
  loadingAction,
  topBannerCourses,
  getSystemCurrency,
  systemCurrency
}) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(2);
  const [student, setStudent] = useState(true);
  const [signup, setSignUp] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});
  const [data, setData] = useState({});
  const [freeOrientation, setFreeOrientation] = useState(false);
  const [topCourses, setTopCourse] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [courseCurrency, setCourseCurrency] = useState([]);

  const intervalRef = useRef(null);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    const { action, loading } = loadingAction;
    const type = action.type;
    if (type == "SIGN_UP" || type == "LOGIN_USER") {
      if (!loading) {
        _.delay(() => setLoading(loading), 2000);
      } else {
        setLoading(loading);
      }
    }
  }, [loadingAction]);

  useEffect(() => {
    setTopCourse(topBannerCourses);
  }, [topBannerCourses]);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  };

  useEffect(() => {
    intervalRef.current = onNavigate;
    setTopLevelNavigator(intervalRef);
  }, [navigate]);

  const navigateToViewCourse = (item) => {
    onNavigate("/courseview/" + item, { state: { courseId: item } });
  };

  const navigateToSampleClass = (item) => {
    onNavigate("/sampleclass", { state: { courseId: item } });
  };

  useEffect(() => {
    setCourseDetails(initCourse);
  }, [initCourse]);

  useEffect(() => {
    getInitialCourseDetails();
  }, []);

  useEffect(() => {
    getSystemCurrency()
  }, [])

  // useEffect(()=>{
  //    setCurrency(systemCurrency)
  // },[systemCurrency])

  const onCurrancyChange = (e) => {
    const Selectedvalue = getText(e);
    setCurrency(Selectedvalue);
    if (
      Selectedvalue !== null ||
      Selectedvalue !== undefined ||
      Selectedvalue !== ""
    ) {
      // getWebinar(Selectedvalue);
      console.log(currency, 'selected valueeee')
    }
    // setCourseError(false)
    // setCourseValid(true)
  };

  useEffect(() => {
    console.log(systemCurrency, 'systemCurrency')
    const list = _.map(systemCurrency, (item, index) => {
      return {
        id: item.id,
        currency: item.currency,
        currency_name: item.currency_name,
      };
    });
    setCurrencyList(list);
    setCurrency(list[0]?.id);

  }, [systemCurrency]);


  const getCurrency = (item) => {
    const selectedCurrency = item.course_currencies.find(newcurrency => newcurrency.currency_id === currency);
    if (selectedCurrency) {
      const currencySymbol = onGetCurrencySymble(_.get(selectedCurrency, "currency.currency"));
      const price = _.get(selectedCurrency, "price", "");
      // const stringifiedCurrency = JSON.stringify(selectedCurrency);
      localStorage.setItem('GlobalCurrency', selectedCurrency?.currency_id)
      return `${currencySymbol}${price}`;
    } else {
      return "";
    }
  };




  return (
    <>
      <Grid container flexDirection={"column"} spacing={1}>
        <Grid item>
          <HeaderStudent onCurrancyChange={onCurrancyChange} currancy={currency} newcurrancyList={currencyList} />
          <Grid container flexDirection={"column"} alignItems={'center'} spacing={1} style={{ marginTop: "30px" }}>
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={IMAGES.welcomeText}
                alt="welcome-text-img"
                style={{ objectFit: "contain", height: "auto", width: 350 }}
              />
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <HeadingComponent
                color={"#4A6375"}
                fontfamily={"Montserrat"}
                fontweigth={600}
                text={
                  "Please select a course to get started your journey with winspert"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item
          sx={{ display: "flex", justifyContent: "center", }}>
          <Grid container spacing={1.5} style={{justifyContent:"center"}}>
            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <AppDownloadButton style={{ width }} />
            </Grid>
          </Grid>

        </Grid> */}
        <Grid
          item
          sx={{
            display: "flex", justifyContent: "center",
            marginTop: "2%"
          }}
        // lg={5}
        >
          {topCourses.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setSignUp(true);
                  setData(item);
                }}
                style={{
                  width: "780px",
                  height: 228,
                  cursor: "pointer ",
                  borderRadius: 20,
                }}
              >
                <img src={background} style={{ borderRadius: 30, maxWidth: "780px", }} />
              </div>
              // <img src={background} alt="s"  style={{objectFit:'contain', width:'100%', height:'20%'}}/>
              // <Card
              //   key={`top-course-${index}-list-item`}
              //   sx={{
              //     width: 780,
              //     maxWidth: 780,
              //     minWidth: 370,
              //     maxHeight: 300,
              //     alignItems: 'center',
              //     justifyContent: 'center',
              //     borderRadius: 5,
              //     backgroundImage: `url(${background})`,
              //     backgroundSize:'cover'
              //   }}
              // >
              //   <Grid
              //     sx={{
              //       justifyContent: "center",
              //       alignItems: "center",
              //       display: "flex",
              //       flexDirection: 'row',
              //       paddingLeft: '4%',
              //       paddingRight: '2%',
              //       paddingBottom: "4%",
              //       paddingTop: "4%",
              //     }}
              //     p={1}
              //     container
              //   >
              //     <Grid
              //       xs={2}
              //       item
              //     >
              //       <WelcomSvgIcon />
              //     </Grid>
              //     <Grid
              //       style={{
              //         justifyContent: "center",
              //         alignItems: "center",
              //         display: "flex",
              //         flexDirection: 'column'
              //       }}
              //       xs={10}
              //       item>
              //       <Grid
              //         style={{
              //           justifyContent: "center",
              //           alignItems: "center",
              //         }}
              //         container
              //       >
              //         <span style={{ fontSize: '26px', textAlign: 'center', fontFamily: 'Montserrat', fontWeight: '700', color: '#464F57' }}>Join the Winspert community now!</span>
              //         <Grid
              //           item
              //           xs={6}
              //           mt={'20px'}
              //         >
              //           <TextButtonComponet
              //             onButtonClick={() => {
              //               setSignUp(true);
              //               setData(item);
              //             }}
              //             classStyle={"btn btn-enroll"}
              //             text="Enroll for Free!"
              //           />
              //         </Grid>
              //       </Grid>
              //     </Grid>
              //   </Grid>
              // </Card>
            );
          })}
        </Grid>

        <Grid item>
          <Grid container mt={2} mb={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 3,
                flexDirection: "row",
                flexWrap: "wrap",
                flexWrap: "wrap",
                alignSelf: "center",
              }}
            >
              {initCourse?.map((item, index) => {
                if (!item?.is_active) {
                  return null;
                }
                return (
                  <>
                    <CourseMainCard
                      item={item}
                      key={`courses-${index}-` + index}
                      // price={`${onGetCurrencySymble(
                      //   _.get(item, "currency"),
                      //   "GBP"
                      // )} ${_.get(item, "price", "")}`}
                      price={getCurrency(item)}
                      pricetitle="Price"
                      durationtitle="Duration"
                      duration={`${_.get(item, "duration", 0)} Weeks`}
                      onEnroll={() => {
                        setSignUp(true);
                        setData(item);

                      }}
                      onFreeOrientation={() => {
                        setFreeOrientation(true);
                        setData(item);
                      }}
                      id={item?.id}
                      title={item?.name}
                      rating={item?.averageRating}
                      image={IMAGE_URL + item?.course_image}
                      onSampleClass={() => navigateToSampleClass(item?.id)}
                      onCourseView={() => navigateToViewCourse(item?.id)}
                      paragraph={item?.description}
                      description={"Description"}
                      reviews={item?.totalRatingCount}
                    />
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
            mb={4}
          >
            <Grid item>
              <span className="quiz-card-subtext">
                Already have an account?
              </span>
            </Grid>
            <Grid item>
              <TextButtonComponet
                onButtonClick={() => {
                  navigate("/login");
                }}
                classStyle="btn btn-welcome-login"
                text={"Login"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DialogComponent
        isShowCloseButton={false}
        currencyId={localStorage.getItem('GlobalCurrency')}
        border={30}
        open={freeOrientation}
        onClose={() => setFreeOrientation(false)}
      >
        <OrientaionForm item={data} onClose={() => setFreeOrientation(false)} />
      </DialogComponent>
      <DialogComponent
        isShowCloseButton={false}
        border={30}
        open={signup}
        onClose={() => setSignUp(false)}
      >
        <SignUpForm item={data} onClose={() => setSignUp(false)} />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    initCourse: state.guest.get("initCourse"),
    loadingAction: state.common.get("loadingAction"),
    topBannerCourses: state.guest.get("topBannerCourses"),
    systemCurrency: state.auth.get("systemCurrency")
  }),
  {
    logIn: Actions.auth.logIn,
    getInitialCourseDetails: Actions.guest.getInitialCourseDetails,
    getSystemCurrency: Actions.auth.getSystemCurrency
  }
)(WelcomeScreen);

const WelcomSvgIcon = ({ isDefault = false }) => {
  return (
    <SvgIcon sx={{ width: 120, height: 120 }}>
      {isDefault ? (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 587 631"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_101_3733)">
            <rect
              x="58"
              y="42"
              width="471"
              height="471"
              rx="92"
              fill="white"
              fill-opacity="0.21"
              shape-rendering="crispEdges"
            />
          </g>
          <path
            d="M201.412 334.877L172.42 268.278C172.25 267.77 171.606 266.041 172.42 265.228C173.234 264.415 174.454 264.72 174.963 265.736C183.949 283.699 202.125 319.93 202.938 321.151C203.752 322.371 204.634 321.659 204.973 321.151C224.132 282.513 263.162 204.221 266.01 200.154C268.859 196.087 271.944 199.138 273.131 201.171C289.238 233.2 321.656 297.46 322.47 298.273C323.284 299.086 323.826 298.612 323.995 298.273C341.628 261.161 377.098 186.428 377.912 184.394C378.726 182.361 378.4 182.361 377.912 182.361H365.196C359.499 182.361 360.83 179.322 362.25 178.045C376.831 168.216 406.803 147.79 410.465 145.757C414.127 143.723 414.704 146.265 414.534 147.79C415.382 166.601 417.082 204.583 416.675 207.023C416.268 209.464 414.132 210.074 413.008 208.797C410.465 205.577 405.175 198.832 404.361 197.612C403.547 196.392 403.005 197.104 402.835 197.612C381.642 238.283 337.627 321.456 331.116 330.81C324.606 340.164 318.676 334.459 316.472 330.562C300.874 295.313 269.367 225.269 268.554 224.049C267.739 222.828 267.197 223.54 267.028 224.049C247.19 259.805 207.109 331.929 205.482 334.369C203.854 336.809 201.921 335.894 201.412 334.877Z"
            fill="#2D3945"
          />
          <path
            d="M175.877 372.368H180.97L187.711 391.681L186.999 391.381L192.242 377.944L194.264 383.858L186.775 400.739L175.877 372.368ZM189.246 372.368H193.553L201.042 391.269L200.181 391.119L206.397 372.368H211.078L200.443 400.664L189.246 372.368ZM222.188 372.218H226.569V399.466H222.188V372.218ZM264.031 400.439L243.098 380.153L244.371 380.677L244.484 399.466H240.065V371.282H240.252L260.886 391.569L259.875 391.269L259.8 372.218H264.144V400.439H264.031ZM291.958 377.757C290.984 377.258 289.948 376.834 288.85 376.485C287.751 376.11 286.703 375.923 285.704 375.923C284.356 375.923 283.283 376.223 282.484 376.822C281.71 377.42 281.323 378.244 281.323 379.292C281.323 380.04 281.597 380.702 282.147 381.276C282.696 381.825 283.395 382.311 284.244 382.735C285.093 383.135 285.991 383.521 286.94 383.896C287.764 384.195 288.575 384.557 289.374 384.981C290.198 385.38 290.934 385.879 291.583 386.478C292.233 387.077 292.744 387.826 293.119 388.724C293.518 389.597 293.718 390.683 293.718 391.98C293.718 393.403 293.356 394.713 292.632 395.91C291.908 397.083 290.872 398.019 289.524 398.717C288.176 399.416 286.528 399.765 284.581 399.765C283.457 399.765 282.346 399.641 281.248 399.391C280.174 399.142 279.151 398.805 278.177 398.381C277.204 397.931 276.305 397.432 275.481 396.883L277.428 393.477C278.027 393.927 278.714 394.338 279.488 394.713C280.262 395.087 281.061 395.386 281.885 395.611C282.708 395.81 283.482 395.91 284.206 395.91C284.98 395.91 285.742 395.786 286.491 395.536C287.264 395.286 287.901 394.875 288.4 394.301C288.925 393.727 289.187 392.966 289.187 392.018C289.187 391.244 288.962 390.583 288.513 390.034C288.063 389.485 287.477 389.011 286.753 388.612C286.054 388.187 285.28 387.813 284.431 387.489C283.582 387.164 282.708 386.803 281.81 386.403C280.936 386.004 280.124 385.518 279.376 384.944C278.627 384.345 278.015 383.621 277.541 382.773C277.066 381.924 276.829 380.876 276.829 379.629C276.829 378.132 277.179 376.834 277.878 375.736C278.577 374.638 279.538 373.765 280.761 373.116C282.009 372.467 283.445 372.118 285.068 372.068C286.99 372.068 288.625 372.305 289.973 372.779C291.346 373.228 292.557 373.777 293.606 374.426L291.958 377.757ZM313.154 372.218C315.226 372.218 316.999 372.567 318.472 373.266C319.945 373.965 321.068 374.963 321.842 376.26C322.641 377.558 323.041 379.13 323.041 380.976C323.041 382.049 322.866 383.122 322.516 384.195C322.192 385.268 321.667 386.241 320.943 387.114C320.244 387.988 319.296 388.699 318.097 389.248C316.924 389.772 315.476 390.034 313.753 390.034H309.821V399.466H305.44V372.218H313.154ZM313.753 385.804C314.702 385.804 315.501 385.642 316.15 385.318C316.799 384.994 317.299 384.582 317.648 384.083C318.023 383.584 318.285 383.072 318.434 382.548C318.609 381.999 318.697 381.513 318.697 381.088C318.697 380.639 318.622 380.153 318.472 379.629C318.322 379.08 318.072 378.568 317.723 378.094C317.373 377.595 316.887 377.196 316.262 376.896C315.638 376.572 314.839 376.41 313.866 376.41H309.821V385.804H313.753ZM334.324 372.218H352.412V376.41H338.706V383.671H350.914V387.9H338.706V395.274H352.936V399.466H334.324V372.218ZM372.641 372.218C374.139 372.218 375.512 372.417 376.76 372.817C378.008 373.191 379.069 373.752 379.943 374.501C380.817 375.25 381.491 376.173 381.965 377.271C382.465 378.344 382.714 379.579 382.714 380.976C382.714 382.049 382.552 383.122 382.228 384.195C381.903 385.268 381.366 386.241 380.617 387.114C379.893 387.988 378.932 388.687 377.734 389.211C376.536 389.735 375.05 389.997 373.278 389.997H369.346V399.466H364.964V372.218H372.641ZM373.24 385.804C374.214 385.804 375.025 385.655 375.674 385.355C376.323 385.031 376.823 384.632 377.172 384.158C377.547 383.684 377.809 383.184 377.959 382.66C378.133 382.111 378.221 381.6 378.221 381.126C378.221 380.677 378.146 380.19 377.996 379.666C377.846 379.117 377.597 378.606 377.247 378.132C376.898 377.633 376.398 377.221 375.749 376.896C375.125 376.572 374.339 376.41 373.39 376.41H369.346V385.804H373.24ZM377.959 388.387L384.924 399.466H379.868L372.753 388.499L377.959 388.387ZM393.657 372.218H411.894V376.41H404.854V399.466H400.51V376.41H393.657V372.218Z"
            fill="#2D3945"
          />
          <defs>
            <filter
              id="filter0_d_101_3733"
              x="0"
              y="42"
              width="587"
              height="589"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="7"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_101_3733"
              />
              <feOffset dy="30" />
              <feGaussianBlur stdDeviation="30" />
              <feComposite in2="hardAlpha" operator="out" />
            </filter>
          </defs>
        </svg>
      ) : (
        <svg
          width="272"
          height="293"
          viewBox="0 0 272 293"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.6017 209.844L1.56864 136.242C1.3813 135.68 0.669458 133.77 1.56863 132.871C2.4678 131.972 3.81657 132.309 4.37854 133.433C14.3069 153.285 34.3885 193.326 35.2877 194.674C36.1868 196.022 37.1609 195.236 37.5356 194.674C58.7038 151.974 101.826 65.4489 104.974 60.9543C108.121 56.4594 111.53 59.8306 112.841 62.0777C130.637 97.4744 166.454 168.492 167.354 169.391C168.253 170.29 168.852 169.765 169.04 169.391C188.522 128.376 227.711 45.7842 228.61 43.5367C229.509 41.2896 229.149 41.2896 228.61 41.2896H214.561C208.266 41.2896 209.737 37.9312 211.306 36.5201C227.416 25.6578 260.53 3.08378 264.577 0.836386C268.623 -1.41101 269.26 1.39823 269.073 3.08378C270.009 23.8722 271.888 65.8488 271.438 68.5455C270.989 71.2423 268.628 71.9168 267.387 70.5058C264.577 66.9472 258.732 59.4932 257.833 58.145C256.934 56.7964 256.334 57.5831 256.147 58.145C232.731 103.093 184.101 195.011 176.907 205.349C169.714 215.687 163.162 209.382 160.728 205.075C143.493 166.12 108.683 88.7093 107.784 87.3611C106.884 86.0125 106.285 86.7992 106.098 87.3611C84.1802 126.878 39.8959 206.585 38.0976 209.282C36.2992 211.979 34.1637 210.968 33.6017 209.844Z"
            fill="#2D3945"
          />
          <path
            d="M5.38898 251.277H11.0159L18.4634 272.621L17.6772 272.29L23.4697 257.44L25.7039 263.976L17.429 282.631L5.38898 251.277ZM20.1597 251.277H24.9178L33.1927 272.166L32.2411 272.001L39.1094 251.277H44.2812L32.5307 282.549L20.1597 251.277ZM56.5557 251.111H61.3965V281.225H56.5557V251.111ZM102.787 282.3L79.6588 259.881L81.0656 260.46L81.1897 281.225H76.3075V250.077H76.5144L99.3118 272.497L98.1947 272.166L98.1119 251.111H102.911V282.3H102.787ZM133.642 257.233C132.567 256.682 131.422 256.213 130.208 255.827C128.995 255.413 127.836 255.206 126.733 255.206C125.243 255.206 124.057 255.537 123.175 256.199C122.32 256.861 121.892 257.771 121.892 258.929C121.892 259.757 122.195 260.487 122.802 261.122C123.409 261.728 124.181 262.266 125.119 262.735C126.057 263.176 127.05 263.604 128.098 264.017C129.008 264.348 129.905 264.748 130.788 265.217C131.698 265.658 132.511 266.21 133.229 266.871C133.946 267.533 134.511 268.36 134.925 269.353C135.366 270.318 135.587 271.518 135.587 272.952C135.587 274.524 135.187 275.972 134.387 277.295C133.587 278.591 132.443 279.625 130.953 280.398C129.464 281.17 127.643 281.556 125.492 281.556C124.25 281.556 123.023 281.418 121.809 281.142C120.623 280.866 119.492 280.494 118.417 280.025C117.341 279.529 116.348 278.977 115.438 278.371L117.589 274.607C118.251 275.103 119.01 275.558 119.865 275.972C120.72 276.385 121.602 276.716 122.513 276.964C123.423 277.185 124.278 277.295 125.078 277.295C125.933 277.295 126.774 277.157 127.602 276.882C128.457 276.606 129.16 276.151 129.712 275.517C130.291 274.882 130.581 274.041 130.581 272.993C130.581 272.138 130.332 271.408 129.836 270.801C129.339 270.194 128.691 269.67 127.891 269.229C127.119 268.76 126.264 268.347 125.326 267.988C124.388 267.63 123.423 267.23 122.43 266.789C121.464 266.347 120.568 265.81 119.741 265.175C118.913 264.514 118.237 263.714 117.713 262.776C117.189 261.839 116.927 260.68 116.927 259.302C116.927 257.647 117.313 256.213 118.086 255C118.858 253.786 119.92 252.821 121.271 252.104C122.651 251.387 124.237 251.001 126.029 250.946C128.153 250.946 129.96 251.208 131.45 251.732C132.967 252.228 134.304 252.835 135.463 253.552L133.642 257.233ZM157.062 251.111C159.351 251.111 161.309 251.497 162.937 252.27C164.564 253.042 165.805 254.145 166.661 255.579C167.543 257.013 167.985 258.75 167.985 260.791C167.985 261.977 167.791 263.162 167.405 264.348C167.047 265.534 166.467 266.609 165.668 267.575C164.895 268.54 163.847 269.326 162.523 269.932C161.227 270.511 159.627 270.801 157.724 270.801H153.379V281.225H148.538V251.111H157.062ZM157.724 266.127C158.772 266.127 159.654 265.948 160.372 265.589C161.089 265.231 161.64 264.776 162.027 264.224C162.44 263.672 162.73 263.107 162.895 262.528C163.089 261.921 163.185 261.384 163.185 260.915C163.185 260.418 163.102 259.881 162.937 259.302C162.771 258.695 162.495 258.13 162.109 257.606C161.723 257.054 161.185 256.613 160.496 256.282C159.806 255.923 158.923 255.744 157.848 255.744H153.379V266.127H157.724ZM180.452 251.111H200.436V255.744H185.293V263.769H198.781V268.443H185.293V276.592H201.015V281.225H180.452V251.111ZM222.786 251.111C224.441 251.111 225.958 251.332 227.338 251.773C228.717 252.187 229.889 252.807 230.854 253.635C231.82 254.462 232.565 255.482 233.089 256.696C233.64 257.881 233.916 259.246 233.916 260.791C233.916 261.977 233.737 263.162 233.378 264.348C233.02 265.534 232.427 266.609 231.599 267.575C230.799 268.54 229.737 269.312 228.413 269.891C227.089 270.47 225.448 270.76 223.49 270.76H219.145V281.225H214.305V251.111H222.786ZM223.448 266.127C224.524 266.127 225.421 265.961 226.138 265.63C226.855 265.272 227.407 264.831 227.793 264.307C228.206 263.783 228.496 263.231 228.662 262.652C228.855 262.045 228.951 261.48 228.951 260.956C228.951 260.46 228.868 259.922 228.703 259.343C228.537 258.736 228.262 258.171 227.875 257.647C227.489 257.095 226.938 256.64 226.22 256.282C225.531 255.923 224.662 255.744 223.614 255.744H219.145V266.127H223.448ZM228.662 268.981L236.357 281.225H230.772L222.911 269.105L228.662 268.981ZM246.006 251.111H266.155V255.744H258.377V281.225H253.578V255.744H246.006V251.111Z"
            fill="#2D3945"
          />
        </svg>
      )}
    </SvgIcon>
  );
};

const WelcomeLogo = () => {
  return (
    <SvgIcon sx={{ width: 160, height: 160 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 587 631"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_101_3733)">
          <rect
            x="58"
            y="42"
            width="471"
            height="471"
            rx="92"
            fill="white"
            fill-opacity="0.21"
            shape-rendering="crispEdges"
          />
        </g>
        <path
          d="M201.412 334.877L172.42 268.278C172.25 267.77 171.606 266.041 172.42 265.228C173.234 264.415 174.454 264.72 174.963 265.736C183.949 283.699 202.125 319.93 202.938 321.151C203.752 322.371 204.634 321.659 204.973 321.151C224.132 282.513 263.162 204.221 266.01 200.154C268.859 196.087 271.944 199.138 273.131 201.171C289.238 233.2 321.656 297.46 322.47 298.273C323.284 299.086 323.826 298.612 323.995 298.273C341.628 261.161 377.098 186.428 377.912 184.394C378.726 182.361 378.4 182.361 377.912 182.361H365.196C359.499 182.361 360.83 179.322 362.25 178.045C376.831 168.216 406.803 147.79 410.465 145.757C414.127 143.723 414.704 146.265 414.534 147.79C415.382 166.601 417.082 204.583 416.675 207.023C416.268 209.464 414.132 210.074 413.008 208.797C410.465 205.577 405.175 198.832 404.361 197.612C403.547 196.392 403.005 197.104 402.835 197.612C381.642 238.283 337.627 321.456 331.116 330.81C324.606 340.164 318.676 334.459 316.472 330.562C300.874 295.313 269.367 225.269 268.554 224.049C267.739 222.828 267.197 223.54 267.028 224.049C247.19 259.805 207.109 331.929 205.482 334.369C203.854 336.809 201.921 335.894 201.412 334.877Z"
          fill="#2D3945"
        />
        <path
          d="M175.877 372.368H180.97L187.711 391.681L186.999 391.381L192.242 377.944L194.264 383.858L186.775 400.739L175.877 372.368ZM189.246 372.368H193.553L201.042 391.269L200.181 391.119L206.397 372.368H211.078L200.443 400.664L189.246 372.368ZM222.188 372.218H226.569V399.466H222.188V372.218ZM264.031 400.439L243.098 380.153L244.371 380.677L244.484 399.466H240.065V371.282H240.252L260.886 391.569L259.875 391.269L259.8 372.218H264.144V400.439H264.031ZM291.958 377.757C290.984 377.258 289.948 376.834 288.85 376.485C287.751 376.11 286.703 375.923 285.704 375.923C284.356 375.923 283.283 376.223 282.484 376.822C281.71 377.42 281.323 378.244 281.323 379.292C281.323 380.04 281.597 380.702 282.147 381.276C282.696 381.825 283.395 382.311 284.244 382.735C285.093 383.135 285.991 383.521 286.94 383.896C287.764 384.195 288.575 384.557 289.374 384.981C290.198 385.38 290.934 385.879 291.583 386.478C292.233 387.077 292.744 387.826 293.119 388.724C293.518 389.597 293.718 390.683 293.718 391.98C293.718 393.403 293.356 394.713 292.632 395.91C291.908 397.083 290.872 398.019 289.524 398.717C288.176 399.416 286.528 399.765 284.581 399.765C283.457 399.765 282.346 399.641 281.248 399.391C280.174 399.142 279.151 398.805 278.177 398.381C277.204 397.931 276.305 397.432 275.481 396.883L277.428 393.477C278.027 393.927 278.714 394.338 279.488 394.713C280.262 395.087 281.061 395.386 281.885 395.611C282.708 395.81 283.482 395.91 284.206 395.91C284.98 395.91 285.742 395.786 286.491 395.536C287.264 395.286 287.901 394.875 288.4 394.301C288.925 393.727 289.187 392.966 289.187 392.018C289.187 391.244 288.962 390.583 288.513 390.034C288.063 389.485 287.477 389.011 286.753 388.612C286.054 388.187 285.28 387.813 284.431 387.489C283.582 387.164 282.708 386.803 281.81 386.403C280.936 386.004 280.124 385.518 279.376 384.944C278.627 384.345 278.015 383.621 277.541 382.773C277.066 381.924 276.829 380.876 276.829 379.629C276.829 378.132 277.179 376.834 277.878 375.736C278.577 374.638 279.538 373.765 280.761 373.116C282.009 372.467 283.445 372.118 285.068 372.068C286.99 372.068 288.625 372.305 289.973 372.779C291.346 373.228 292.557 373.777 293.606 374.426L291.958 377.757ZM313.154 372.218C315.226 372.218 316.999 372.567 318.472 373.266C319.945 373.965 321.068 374.963 321.842 376.26C322.641 377.558 323.041 379.13 323.041 380.976C323.041 382.049 322.866 383.122 322.516 384.195C322.192 385.268 321.667 386.241 320.943 387.114C320.244 387.988 319.296 388.699 318.097 389.248C316.924 389.772 315.476 390.034 313.753 390.034H309.821V399.466H305.44V372.218H313.154ZM313.753 385.804C314.702 385.804 315.501 385.642 316.15 385.318C316.799 384.994 317.299 384.582 317.648 384.083C318.023 383.584 318.285 383.072 318.434 382.548C318.609 381.999 318.697 381.513 318.697 381.088C318.697 380.639 318.622 380.153 318.472 379.629C318.322 379.08 318.072 378.568 317.723 378.094C317.373 377.595 316.887 377.196 316.262 376.896C315.638 376.572 314.839 376.41 313.866 376.41H309.821V385.804H313.753ZM334.324 372.218H352.412V376.41H338.706V383.671H350.914V387.9H338.706V395.274H352.936V399.466H334.324V372.218ZM372.641 372.218C374.139 372.218 375.512 372.417 376.76 372.817C378.008 373.191 379.069 373.752 379.943 374.501C380.817 375.25 381.491 376.173 381.965 377.271C382.465 378.344 382.714 379.579 382.714 380.976C382.714 382.049 382.552 383.122 382.228 384.195C381.903 385.268 381.366 386.241 380.617 387.114C379.893 387.988 378.932 388.687 377.734 389.211C376.536 389.735 375.05 389.997 373.278 389.997H369.346V399.466H364.964V372.218H372.641ZM373.24 385.804C374.214 385.804 375.025 385.655 375.674 385.355C376.323 385.031 376.823 384.632 377.172 384.158C377.547 383.684 377.809 383.184 377.959 382.66C378.133 382.111 378.221 381.6 378.221 381.126C378.221 380.677 378.146 380.19 377.996 379.666C377.846 379.117 377.597 378.606 377.247 378.132C376.898 377.633 376.398 377.221 375.749 376.896C375.125 376.572 374.339 376.41 373.39 376.41H369.346V385.804H373.24ZM377.959 388.387L384.924 399.466H379.868L372.753 388.499L377.959 388.387ZM393.657 372.218H411.894V376.41H404.854V399.466H400.51V376.41H393.657V372.218Z"
          fill="#2D3945"
        />
        <defs>
          <filter
            id="filter0_d_101_3733"
            x="0"
            y="42"
            width="587"
            height="589"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="7"
              operator="erode"
              in="SourceAlpha"
              result="effect1_dropShadow_101_3733"
            />
            <feOffset dy="30" />
            <feGaussianBlur stdDeviation="30" />
            <feComposite in2="hardAlpha" operator="out" />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
};

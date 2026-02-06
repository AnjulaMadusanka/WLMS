import React, { useEffect, useState, useRef } from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SidebarContainer } from "../../../component/organism";
import CourseCard from "../../../component/molecule/Cards/CourseCard";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import _ from "lodash";
import {
  IMAGE_URL,
  onGetCountrySymble,
  onGetCurrencySymble,
} from "../../../core/Constant";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { HeaderStudent } from "../../../component/organism/Header";
import { getText } from "../../../core/Constant";

const CourseScreen = ({ coursecatalog, getCousreCatalog, verifyToken, getInitialCourseDetails, getSystemCurrency, systemCurrency, show }) => {
  const navigate = useNavigate();
  const [newcoursecatalog, setNewCourseCatalog] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState([]);
  let currencyId = localStorage.getItem('GlobalCurrency');

  const [isShow, setIsShow] = useState(0);

  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);


  const navigateToCourseDetails = (courseId, isRegistered, course) => {
    if (!isRegistered) {
      getInitialCourseDetails()
    }
    navigate("/course-details", {
      state: {
        course_id: courseId,
        is_registered: isRegistered,
        course
      },
    });
  };

  useEffect(() => {
    getCousreCatalog();
    verifyToken();
  }, []);

  useEffect(() => {
    setCurrency(currencyId)
    getSystemCurrency()
  }, [])

  useEffect(() => {
    // console.log(systemCurrency, 'systemCurrency')
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

  const onCurrancyChange = (e) => {
    const Selectedvalue = getText(e);
    setCurrency(Selectedvalue);
  };



  //   const getCurrency = (item) => {
  //     if(item.prices){
  //       const selectedCurrency = item.prices.find(newcurrency => newcurrency.currency_id === currency);
  //       if (selectedCurrency) {
  //           const currencySymbol =  onGetCurrencySymble( _.get(selectedCurrency, "currency.currency"));
  //           const price = _.get(selectedCurrency, "price", "");
  //           // const stringifiedCurrency = JSON.stringify(selectedCurrency);
  //           localStorage.setItem('GlobalCurrency',selectedCurrency?.currency_id)
  //           return `${currencySymbol}${price}`;
  //       } else {
  //           return "$ 0.0";
  //       }
  //     }
  // };

  useEffect(() => {
    console.log("oioioioo ", _.get(coursecatalog,'[0]','no') )
    setNewCourseCatalog(coursecatalog);
  }, [coursecatalog]);

  return (
    <>

      <Box className="main-screen-container">
        <Box mt={2}>
          <HeadingComponent
            text={"Course Catalog"}
            fontweigth={600}
            size={'26px'}
            fontfamily={"Montserrat"}
          />
        </Box>
        {isShow ? <HeaderStudent dashboard={true} onCurrancyChange={onCurrancyChange} currancy={currency} newcurrancyList={currencyList} />
          : <></>}
        <Box sx={{ mt: 2 }}>
          <Grid
            rowGap={2}
            container
            columnSpacing={{ sm: 8, md: 2, lg: 4, xl: 2 }}
          >
            {_.map(newcoursecatalog,(item, index) => {
              const indexValue = _.findIndex(_.get(item, 'prices', []), i => {
                return i.currency_id == currency
              });

              let price = _.get(item, 'prices[0].price', 0.00);
              let currencyType = _.get(item, 'prices[0].currency.currency', 'CAD')
              if (indexValue > -1) {
                const dataList = _.get(item, 'prices', []);
                price = dataList[indexValue]?.price || 0.00
                currencyType = dataList[indexValue]?.currency?.currency || 'CAD'
              }

              return (
                <>
                  <Grid item key={item?.id + `${index}`}>
                    <CourseCard
                      image={IMAGE_URL + item?.course_image}
                      selectValue={2}
                      price={price}
                      reviewCount={item?.totalRatingCount}
                      reviewAvg={item?.averageRating}
                      currancy={onGetCurrencySymble(currencyType)}
                      weeks={item?.duration}
                      onCourseDetails={() =>
                        navigateToCourseDetails(item?.id, item?.is_registered, item)
                      }
                      title={item?.name}
                      btnText={"View"}
                      description={item?.description}
                      isRegisterd={item?.is_registered}
                      isFree={_.get(item, 'is_free', 0)}
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    coursecatalog: state.course.get("coursecatalog"),
    systemCurrency: state.auth.get("systemCurrency"),
    show: state.common.get('show')
  }),
  {
    getCousreCatalog: Actions.course.getCousreCatalog,
    verifyToken: Actions.auth.verifyToken,
    getInitialCourseDetails: Actions.guest.getInitialCourseDetails,
    getSystemCurrency: Actions.auth.getSystemCurrency
  }
)(CourseScreen);

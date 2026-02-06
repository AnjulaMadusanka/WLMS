import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { StarRatingoComponent } from "../../atom";
import { IMAGES } from "../../../assets/Images";
import DropDownComponent from "../../atom/Inputs/DropDown";
import { useSelector } from "react-redux";

const HeaderStudent = ({
  image,
  title,
  description,
  btnText,
  onCurrancyChange = () => { },
  price,
  currancy,
  newcurrancyList,
  reviewCount,
  reviewAvg,
  weeks,
  dashboard = false,
  selectValue = 0,
  isRegisterd,
  isFree,
}) => {

  const [isShow, setIsShow] = useState(0);
  const show = useSelector(state => state.common.get('show'));

  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);

  return (
    <Grid container sx={{ boxShadow: dashboard ? '' : ' 0 22px 47px 0 rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }} width={'100%'} height={100} flexDirection={"column"} spacing={1}>
      {
        dashboard ? <Grid item width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} xs={12} sm={12} md={12} >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, height: 100 }}>
            <span style={{ marginLeft: 'auto' }}>Currency</span>
            <Box>
              <Box width={150}>
                <DropDownComponent
                  isShowPlaceholder={true}
                  isShowZero={false}
                  initialValue="Select Course"
                  onchange={onCurrancyChange}
                  list={newcurrancyList}
                  selectedValue={currancy}
                  radius={86}
                  backgroundColor={'#f2f6f8'}
                />
              </Box>
            </Box>
          </Box>
        </Grid> : <>
          <Grid item width={'100%'} xs={2} sm={4} md={4} >
          </Grid>
          <Grid item width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} xs={2} sm={4} md={4} >
            <Box sx={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={IMAGES.headerLogo}
                alt="header-logo"
                style={{
                  objectFit: "cover",
                  width: 300,
                  height: '100%',
                  borderRadius: 10,
                  alignSelf: 'center',
                  paddingTop: 5
                }}
              />
            </Box>
          </Grid>
          {isShow ? <Grid item width={'100%'} height={'100%'} alignItems={'end'} justifyContent={'center'} xs={2} sm={4} md={4} >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, height: 100 }}>
              <span style={{ marginLeft: 'auto' }}>Currency</span>
              <Box>
                <Box width={150}>
                  <DropDownComponent
                    isShowPlaceholder={true}
                    isShowZero={false}
                    initialValue="Select Course"
                    onchange={onCurrancyChange}
                    list={newcurrancyList}
                    selectedValue={currancy}
                    radius={86}
                    backgroundColor={'#f2f6f8'}
                  />
                </Box>
              </Box>
            </Box>
          </Grid> : <></>}
        </>
      }
    </Grid>

  );
};

export default HeaderStudent;

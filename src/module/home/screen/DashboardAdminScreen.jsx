import React, { useEffect, useState, useRef } from "react";
import DashboardCard from "../../../component/molecule/Cards/DashboardCard";
import { IMAGES } from "../../../assets/Images";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { BarChart, axisClasses } from "@mui/x-charts";
import { Actions } from "../../../core/modules/Actions";
import _ from "lodash";

const DashboardAdminScreen = ({
  adminDashboardData,
  getAdminDashboardData,
  verifyToken,
}) => {
  // const navigate = useNavigate();
  // const intervalRef = useRef(null);
  const [dataSet1, setData] = useState([]);
  const [list, setList] = useState([]);

  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    getAdminDashboardData();
    // verifyToken()
  }, []);

  useEffect(() => {
    setDashboardData(adminDashboardData);
    // const dataSet = _.values(_.get(adminDashboardData, 'countsByDay', []));
    // const keys = _(dataSet).keyBy('day').mapValues('count').value();
    var xContent = [];
    var yContent = [];
    const options = { weekday: "long" };

    if (adminDashboardData.activeStudentsCount != undefined) {
      for (var i = 0; i < adminDashboardData.countsByDay.length; i++) {
        xContent.push(
          new Date(adminDashboardData.countsByDay[i].day).toLocaleString(
            "en-US",
            options
          )
        );
        yContent.push(adminDashboardData.countsByDay[i].count);
      }
      setList(yContent);
      setData(xContent);
    }
  }, [adminDashboardData]);

  const valueFormatter = (value) => `${value}`;

  return (
    <Grid container flexDirection={"column"} rowGap={2}>
      <Grid item>
        <HeadingComponent
          text={"Dashboard"}
          fontfamily={"Montserrat"}
          fontweigth={600}
          size={40}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container  rowGap={2}>
          <Grid item xs={12}>
            <Grid container xs={12} rowGap={2} 
            flexDirection={{sm:'row', md:'row', lg:'row', xs:'row'}}
            // flexDirection={{sm:'column', md:'row', lg:'row', xs:'column'}} 
             justifyContent={ {md:'space-around', lg:'space-around', sm:'center', xl:'space-around'}}>
              <Grid xs={6} item style={{paddingRight:5}} >
                <DashboardCard
                  value={dashboardData?.activeStudentsCount}
                  text="No of Students"
                  icon={IMAGES.studentsIcon}
                />
              </Grid>
              <Grid xs={6} item style={{paddingLeft:5}}>
                <DashboardCard
                  value={dashboardData?.activeAdminCount}
                  text="No of Users"
                  icon={IMAGES.userIcon}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{display:'flex' , justifyContent:'center'}} xs={12} >
          <HeadingComponent text={"New Students for week"} fontfamily={"Montserrat"} fontweigth={560} size={25} />
          </Grid>
          <Grid item sx={{display:'flex', justifyContent:'center' }} xs={12}>
          {dashboardData?.activeStudentsCount != undefined ? (<Box>
                <BarChart
                  xAxis={[
                    {
                      id: 'barCategories',
                      data: dataSet1,
                      scaleType: 'band',
                      label: 'Day', valueFormatter
                    },
                  ]}
                  className="css-1vuxth3-MuiBarElement-root"
                  series={[
                    {
                      data: list,
                    },
                  ]}
                  width={600}
                  height={240}
                  // margin={{top:0}}
                  tooltip={{ trigger: 'axis' }}
                  viewBox={"0 100 600 400"}
                />
              </Box>) : (<></>)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default connect(
  (state) => ({
    adminDashboardData: state.home.get("adminDashboardData"),
  }),
  {
    // logIn: Actions.auth.logIn,
    getAdminDashboardData: Actions.home.getAdminDashboardData,
    verifyToken: Actions.auth.verifyToken,
  }
)(DashboardAdminScreen);

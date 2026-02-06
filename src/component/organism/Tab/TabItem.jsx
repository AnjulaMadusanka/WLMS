import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SidebarContainer from "../Sidebar/SidebarContainer";
import HeaderContainer from "../Header/Header";
import FooterContainer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import TextButtonComponet from "../../atom/Buttons/TextButton";

const TabItem = ({ userRole, itemoneData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(itemoneData.courses)
  }, [data])
  return (
    <Box>
      {itemoneData.courses.map((item, index) => {
        if (!item.is_active) {
          return null
        }
        return (
          <>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 1,
              marginBottom: 2,
              justifyContent: 'space-between'
            }}>
              <Box sx={
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }>
                <Typography style={{ display: 'flex', flexDirection: 'column', color: '#4a6375' }} fontSize={14} fontWeight={800}>
                  Created By {item?.lecturer}
                </Typography>
              </Box>
              <Box sx={{
                width: 'fit-content',
                height: 'fit-content',
                padding: 1
              }}>
                <Typography style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} color={"black"} fontSize={14} fontWeight={700}>
                  Total Enrolled:
                  <Typography style={{ marginLeft: 10, fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 600, color: '#8080f1' }}>
                    {itemoneData.totalStudents}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 1,
              justifyContent: 'space-between',
              marginTop: 2
            }}>
              <Typography style={{ display: 'flex', flexDirection: 'column' }} color={"#2d3945"} fontSize={25} fontWeight={800} fontFamily={'Montserrat'}>
                Course Overview
                <Typography style={{ display: 'flex', flexDirection: 'row' }} color={"#4a6375"} fontSize={12} fontWeight={700}>
                  {item.description}
                </Typography>
              </Typography>
            </Box>
          </>
        )
      })}
    </Box>
  )
}

export default TabItem;
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabItem from './TabItem';
import TabItemTwo from './TabItemTwo';
import TabItemThree from './TabItemThree';
import TabItemFour from './TabItemFour';
import { Avatar, SvgIcon } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import TabItemFive from './TabItemFive';
const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default ({ data, documentData, onNavigatetoPreview }) => {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const [isFree, setIsFree] = useState(0);
  const [courseData, setCourseData] = useState();
  // const [newcourse, setNewCourse] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [isRegistered, setIsRegistered] = useState(true);

  useEffect(() => {
    const courseDetails = location?.state;
    setIsRegistered(courseDetails?.is_registered);
    setCourseData(courseDetails?.course);
    setIsFree(courseDetails?.course?.is_free);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
          style={{ width: '100%' }}
          value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{
            display: 'flex',
            minWidth: 'fit-content',
            alignItems: 'flex-end', color: '#2d3945', fontWeight: 'bold', fontSize: '16px', flexDirection: 'row', justifyContent: 'flex-start'
          }} label="Course Content" {...a11yProps(0)} />
          <Tab style={{
            display: 'flex',
            alignItems: 'flex-end', color: '#2d3945', fontWeight: 'bold', fontSize: '16px', flexDirection: 'row', justifyContent: 'flex-start'
          }} label="About" {...a11yProps(1)} />
          {isRegistered ? <Tab style={{
            display: 'flex',
            alignItems: 'flex-end', color: '#2d3945', fontWeight: 'bold', fontSize: '16px', flexDirection: 'row', justifyContent: 'flex-start'
          }} label="Reviews" {...a11yProps(2)} /> : null}
           <Tab style={{
            display: 'flex',
            alignItems: 'flex-end', color: '#2d3945', fontWeight: 'bold', fontSize: '16px', flexDirection: 'row', justifyContent: 'flex-start'
          }} label="Documents" {...a11yProps(3)} />
          {data.activeWebinar !== null && isRegistered ?
            <Tab
              style={{
                display: 'flex',
                alignItems: 'flex-end', color: '#2d3945', fontWeight: 'bold', fontSize: '16px', flexDirection: 'row', justifyContent: 'center', textAlign: 'flex-start'
              }} label={
                <>

                  <SvgIcon sx={{ width: 60, height: 20, left: -5 }}>
                    <svg width="72" height="31" viewBox="0 0 72 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="72" height="31" rx="15.5" fill="#E2535D" />
                      <path d="M20.245 21V10.5H22.675V19.02H27.94V21H20.245ZM29.2977 21V10.5H31.7277V21H29.2977ZM41.841 10.5H44.256L39.711 21H37.311L32.781 10.5H35.406L38.601 18L41.841 10.5ZM47.5477 19.05H53.2627V21H45.1327V10.5H53.0677V12.45H47.5477V14.73H52.4227V16.62H47.5477V19.05Z" fill="white" />
                    </svg>

                  </SvgIcon>
                  Live
                </>

              } {...a11yProps(4)} />
            : <></>
          }


        </Tabs>

      </Box>
      <CustomTabPanel value={value} index={1}>
        <TabItem itemoneData={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={0}>
        <TabItemTwo itemtwoData={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabItemThree itemthreeData={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TabItemFive itemFiveData={documentData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <TabItemFour itemFourData={data.activeWebinar} />
      </CustomTabPanel>
    </Box>
  );
}

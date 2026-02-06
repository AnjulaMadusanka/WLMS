import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CourseListCard } from "../../molecule";
import { useEffect } from "react";
import { _ } from "../../../core/AppUtils";

function CustomTabPanel(props) {
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CourseTabContainer({ courseData }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    console.log(courseData,'dataaaaa')
  },[courseData])
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ display: "flex", alignItems: "flex-start" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            style={{
              display: "flex",
              alignItems: "flex-start",
              color: "#2d3945",
              fontWeight: "bold",
              fontSize: "18px",
              alignSelf: "left",
            }}
            label="Course content"
            {...a11yProps(0)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CourseListCard courseData={courseData?.course_contents} />
      </CustomTabPanel>
    </Box>
  );
}

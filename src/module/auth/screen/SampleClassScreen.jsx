import React, { useEffect, useState, useRef } from "react";
import { Box, Rating, Typography } from "@mui/material";
import { AdminVideoCard, SampleVideoCard } from "../../../component/molecule";
import { useLocation, useNavigate } from "react-router-dom";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { IconButtonComponent } from "../../../component/atom";
import { IMAGES } from "../../../assets/Images";
import _ from 'lodash';


const SampleClassScreen = ({ getSampleClass, sampleClass }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = React.useState(2);
  const [sampleclass, setSampleCalss] = useState([]);

  let courseId = _.get(location, 'state.courseId');


  const intervalRef = useRef(null);

  const onNavigate = (path, obj = {}) => {
    if (path) {
      navigate(path, obj);
    }
  }

  useEffect(() => {
    intervalRef.current = onNavigate;
    setTopLevelNavigator(intervalRef);
  }, [navigate]);

  useEffect(() => {
    setSampleCalss(sampleClass);
  }, [sampleClass])


  useEffect(() => {
    getSampleClass(courseId)
  }, [])

  const onViewVideo = (item) => {
    window.location.href = item;
  }

  const setSampleVideo = (item) => {
    navigate('/samplevideo', { state: { classId: item } })
  }
  return (< >
    <Box sx={{ paddingLeft: 10, paddingTop: 5 }}>
      <Box>
        <IconButtonComponent onclick={() => navigate(-1)} btnType="backbtn" btnText="Back" />
      </Box>
      {sampleclass.length == 0 ?
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <img src={IMAGES.noContent} alt="notfound" className="content-image" />
          <span style={{ fontSize: 20, fontWeight: 800 }}>No Sample Class found!</span>
        </Box> :
        <>
          <HeadingComponent text={"Sample Class"} fontweigth={600} size={30} fontfamily={"Montserrat"} />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, mt: 5 }} className="sample-class">
            {sampleclass.map((item, index) => (
              <>
                <SampleVideoCard onViewVideo={() => setSampleVideo(item)} thumbnail={item.thumbnail} videoUrl={item.link} description={item.sub_title} title={item.content} btnText={'Watch now'} />
              </>
            ))}
          </Box>
        </>

      }
    </Box>
  </>);
}

export default connect(
  state => ({
    sampleClass: state.guest.get("sampleClass"),
  }),
  {
    getSampleClass: Actions.guest.getSampleClass
  },
)(SampleClassScreen); 

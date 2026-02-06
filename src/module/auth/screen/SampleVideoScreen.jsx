import React, { useState ,useEffect, useRef} from "react";
import { Box,Rating, Typography } from "@mui/material";
import TextInputComponent from "../../../component/atom/Inputs/TextInput";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import SignInForm from "../../../component/molecule/Forms/SignInForm";
import StarRatingoComponent from "../../../component/atom/Buttons/StarRating";
import { VideoPlayer, VideoPlayerComponent } from "../../../component/atom";
import { SampleVideoCard } from "../../../component/molecule";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { connect } from "react-redux";
import {Actions} from "../../../core/modules/Actions";
import { useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { Padding } from "@mui/icons-material";
import {IconButtonComponent} from "../../../component/atom";
import { useLocation } from "react-router-dom";
import _ from 'lodash'


const SampleVideoScreen = ({sampleClass}) => {
  const [value, setValue] = React.useState(2);
  const [video,setVideo] = useState([]);
  const location = useLocation();
  
  const navigate = useNavigate()
  const intervalRef = useRef(null);

  const onNavigate = (path, obj = {}) => {
    if(path){
      navigate(path, obj);
   }
  }

  useEffect(() => {
      intervalRef.current = onNavigate;
      setTopLevelNavigator(intervalRef);
  }, [navigate]);

  useEffect(() => {
    let newclass = _.get(location, 'state.classId');
    setVideo(newclass);
  }, [location,video])


    return (< >
        <Box sx={{paddingLeft:10,paddingTop:5,paddingRight:10}}>
            <Box>
                <Box>
            <IconButtonComponent onclick={() => navigate(-1)} btnType="backbtn" btnText="Back" />
        </Box>
              <HeadingComponent fontweigth={600} size={40} fontfamily={"Montserrat"} text={'Sample Class'}/>
                <Typography fontSize={30} fontWeight={800} color={'black'}>
                     {}
                </Typography>
                <Typography fontSize={18} fontWeight={800} color={'#9c9c9c'}>

                </Typography>
                 <Box sx={{
                    alignSelf:'center',
                    width:1,
                    height:1
                 }}>
            <VideoPlayerComponent path={_.get(location, 'state.classId.aws_file_name','')}/>
{/* <VideoPlayer videoUrl={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}/> */}
{/* <SampleVideoCard/> */}
                 </Box>
            </Box>
            </Box>
    </>);
}

export default connect(
  state => ({
    sampleClass: state.auth.get("sampleClass"),
  }),
  {
      getSampleClass:Actions.auth.getSampleClass
  },
)(SampleVideoScreen); 

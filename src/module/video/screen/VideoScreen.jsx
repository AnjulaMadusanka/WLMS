import React, { useRef, useEffect, useState } from "react";
import {
  AdminVideoCard,
  PopUpMessageComponent,
  VideoForm,
} from "../../../component/molecule";
import { Box, Grid } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import {
  DialogComponent,
  IconButtonComponent,
  TextIconButtonComponent,
} from "../../../component/atom";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { CLOUD_FRONT_URL } from "../../../core/Constant";
import _ from "lodash";

const VideoScreen = ({
  uploadedVideoList,
  popupClose,
  fetchVideo,
  loadingAction,
  verifyToken,
  verifyData

}) => {
  const [videoUpload, setUploadVideo] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [cloudfronturl,setCloduFrontUrl] = useState()

  useEffect(() => {
    fetchVideo();
  }, []);

  useEffect(()=>{
    setCloduFrontUrl(_.get(verifyData,'video_url'))

    
},[verifyData])

  useEffect(() => {
    setUploadedVideos(uploadedVideoList);
  }, [uploadedVideoList]);

  useEffect(() => {
    const { action, loading } = loadingAction;
    const type = action.type;
    if (type == "UPLOAD_VIDEO" && !loading) {
      setUploadVideo(loading);
    }
  }, [loadingAction]);

  const renderUploadedVideos = uploadedVideos.map((item, index) => {
  
    return(
      <AdminVideoCard
        key={item?.id}
        id={item?.id}
        description={item?.title}
        thumbnail={item?.thumbnail}
        btnText={"Copy Link"}
        videoUrl={`${cloudfronturl}${item?.aws_file_name}`}
        // videoUrl={item?.link}
      />
    )
  });

  return (
    <>
      <Box className="main-screen-container">
        <Grid container direction="row" justifyContent="space-between" alignItems={'center'} mb={4}>
          <Grid item>
          <HeadingComponent
            text={"Video"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
          />
          </Grid>
          <Grid item>
          <TextIconButtonComponent
            btnText={"Upload Video"}
            icon={faVideo}
            onclick={() => setUploadVideo(true)}
          />
          </Grid>
          
          
        </Grid>

        <Grid
          container
          columnGap={{md:1}}
          justifyContent={{sm:'center', md:'unset', lg:'space-between', xl:'space-between'}}
          rowGap={1}
        >
          {renderUploadedVideos}
        </Grid>
      </Box>
      <DialogComponent
        title={"Upload Video"}
        open={videoUpload}
        onClose={() => setUploadVideo(false)}
      >
        <VideoForm
          isClsose={videoUpload}
          onClose={() => setUploadVideo(false)}
        />
      </DialogComponent>
    </>
  );
};

export default connect(
  (state) => ({
    uploadedVideoList: state.video.get("uploadedVideoList"),
    popupClose: state.video.get("popupClose"),
    loadingAction: state.common.get("loadingAction"),
    verifyData:state.auth.get("verifyData")
  }),
  {
    uploadVideo: Actions.video.uploadVideo,
    fetchVideo: Actions.video.fetchVideo,
    verifyToken: Actions.auth.verifyToken,
  }
)(VideoScreen);

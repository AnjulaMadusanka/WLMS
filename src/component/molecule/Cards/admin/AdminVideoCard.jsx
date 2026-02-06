import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import TextButtonComponet from "../../../atom/Buttons/TextButton";
import ReactPlayer from 'react-player'
import { IMAGE_URL, onToast } from '../../../../core/Constant';
import { IMAGES } from "../../../../assets/Images";
import { useDispatch } from "react-redux";
import { Actions } from "../../../../core/modules/Actions";
import PopUpMessageComponent from "../../PopupMessage/PopUpMessage";
import { useState } from "react";
import { IconButtonComponent } from "../../../../component/atom";
import AdminVideoTitleEditForm from "../../../../component/molecule/Forms/videoAdmin/AdminVideoTitleEditForm";
import DialogComponent from "../../../../component/atom/Dialog/Dialog";
import EditIcon from '@mui/icons-material/Edit';

const AdminVideoCard = ({ title, id, description, btnText, videoUrl, thumbnail, onVideoClick = () => { } }) => {

  const dispatch = useDispatch();
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedVideoDetails, setSelectedVideoDetails] = useState({
    video_id: 0,
    title_name: ""
  });
  const [titleUpdateModal, setTitleUpdateModal] = useState(false);


  function copyToClipboard(link, title) {
    navigator.clipboard.writeText(link);
    let message = title + ' URL copied successfully';
    const respons_json = '{"status_code": "1", "message":"' + message + '" }';
    onToast('URL Copied', JSON.parse(respons_json), false);
  }

  const deleteVideoBtn = () => {
    dispatch(Actions.video.deleteAdminVideo(id));
  }

  const loadTitleEditModal = (titleName, videoId) => {

    setSelectedVideoDetails({
      video_id: videoId,
      title_name: titleName
    });

    setTitleUpdateModal(true);
  };

  return (<>
    <Grid item >
      <Box mb={2}
        className="admin-video-card"
      >
        <Box
          className=""
          style={{ maxHeight: 200, borderRadius: '10px' }}
        >
          <ReactPlayer light={<img src={IMAGE_URL + thumbnail} alt='Thumbnail' height={150} width={300} style={{ objectFit: 'cover', borderRadius: '10px' }} />} width={'100%'} style={{ maxHeight: 150, borderRadius: '10px' }} url={videoUrl} playing={false} loop={true} controls={true} volume={null} mute={true} />
          {title ? <Typography marginTop={50} fontFamily={'Montserrat'} color={'black'} fontWeight={700} fontSize={20} >
            {title}
          </Typography> : null}

        </Box>
        <Box sx={{ height: 45, m: 1 }} style={{ display: "flex" }}>

          <Typography onClick={() => loadTitleEditModal(description, id)} title={description} style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', textAlign: 'center', cursor: 'pointer' }} fontFamily={'Montserrat'} color={'#8c8c8c'} fontWeight={500} fontSize={15} component="div" >
            {description}
          </Typography>
          <div onClick={() => loadTitleEditModal(description, id)}>
            <EditIcon />
          </div>
          {/* <IconButtonComponent btnType={"editbtn"} style={{ float: "right", display: "flex" }} onclick={() =>
            loadTitleEditModal(description,id)
          } /> */}

        </Box>

        <Box mt={1}>
          <TextButtonComponet classStyle={'btn btn-copy-link'} onButtonClick={() => copyToClipboard(videoUrl, description)} text={btnText} />
          {/* <TextButtonComponet classStyle={'btn btn-copy-link'} onButtonClick={() => copyToClipboard(videoUrl,description)} text={"Delete"} /> */}
        </Box>
        <Box mt={1}>
          {/* <TextButtonComponet classStyle={'btn btn-copy-link'} onButtonClick={() => copyToClipboard(videoUrl,description)} text={btnText} /> */}
          <TextButtonComponet classStyle={'btn btn-video-delete'} onButtonClick={() => setDeletePopup(true)} text={"Delete"} />
        </Box>
      </Box>
      <PopUpMessageComponent open={deletePopup} type={"other"} title={"Delete!"} message={"Are you sure you want to delete this video?"} btntext={"Yes, delete"} onclick={() => deleteVideoBtn()} altbtntext={"No"} altonclick={() => setDeletePopup(false)} onclose={() => setDeletePopup(false)} />

    </Grid>

    <DialogComponent
      title={"Update Video Title"}
      open={titleUpdateModal}
      onClose={() => setTitleUpdateModal(false)}
    >
      <AdminVideoTitleEditForm
        videoData={selectedVideoDetails}
        onClose={() => setTitleUpdateModal(false)}
      />
    </DialogComponent>
  </>)
}

export default AdminVideoCard;
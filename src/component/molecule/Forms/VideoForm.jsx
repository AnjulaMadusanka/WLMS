import React, { useState, useEffect, useRef } from "react";
import { Box, DialogActions, DialogContent, Button, LinearProgress } from "@mui/material";
import { TextInputComponent } from "../../atom";
import TextButtonComponent from "../../atom/Buttons/TextButton";
import { Actions } from "../../../core/modules/Actions";
import { useDispatch } from 'react-redux';
import { getText, getFile, onToast } from "../../../core/Constant";
import axios from 'axios'; // Import Axios
import { baseURL } from "../../../core/repository/Repository";

const VideoForm = ({ onClose, isClsose }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const imageRef = useRef();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [titleValid, setTitleValid] = useState(false);

  const [video, setVideo] = useState('');
  const [videoError, setVideoError] = useState(false);
  const [videoErrorMsg, setVideoErrorMsg] = useState('');
  const [isVideoValid, setIsVideoValid] = useState(false);

  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailError, setThumbnailError] = useState(false);
  const [thumbnailErrorMsg, setThumbnailErrorMsg] = useState('');
  const [isThumbnailValid, setThumbnailValid] = useState(false);

  const [videoUploadStatus, setVideoUploadStatus] = useState("");
  const [videoUploadBtnStatus, setVideoUploadBtnStatus] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const token = localStorage.getItem('token') || ''; 


  useEffect(() => {
    setTitle('');
    setVideo('');
    setThumbnail('');
    setVideoUploadStatus("");
    inputRef.current.value = "";
    imageRef.current.value = "";
    setVideoUploadBtnStatus(false);
    setTitleError(false);
    setVideoError(false);
    setThumbnailError(false);
    setTitleValid(false);
    setThumbnailValid(false);
    setIsVideoValid(false);
    setUploadProgress(0);
    setUploadSpeed(0);
    setElapsedTime(0);
  }, [isClsose]);

  const onTitleChange = (e) => {
    const text = getText(e);
    setTitle(text);
    setTitleError(false);
    setTitleValid(text?.length > 0);
  };

  const onThumbnailChange = (e) => {
    const file = getFile(e);
    setThumbnailError(false);
    const isValid = file != "" && file != undefined;
    setThumbnailValid(isValid);
    setThumbnail(isValid ? file : '');
  };

  const onVideoChange = (e) => {
    const file = getFile(e);
    const isValid = file != "" && file != undefined;
    setIsVideoValid(isValid);
    setVideoError(false);
    setVideo(isValid ? file : '');
  };

  // const adminVideoUpload = () => {
  //   if (isThumbnailValid && isVideoValid && titleValid) {
  //     setVideoUploadStatus("Uploading...");
  //     setVideoUploadBtnStatus(true);
      
  //     const data = new FormData();
  //     data.append("video", video);
  //     data.append("title", title);
  //     data.append("thumbnail", thumbnail);

  //   const config = {
  //     headers: {
  //       Authorization: token.length > 0 ? `Bearer ${token}` : `Bearer`,
  //       Accept: "application/json",
  //     },
  //       onUploadProgress: (progressEvent) => {
  //         if (progressEvent.lengthComputable) {
  //           const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //           setUploadProgress(progress);
  
  //           const currentTime = new Date().getTime();
  //           const timeElapsed = (currentTime - startTime) / 1000;
  //           setElapsedTime(timeElapsed);
  
  //           const uploadedBytes = progressEvent.loaded;
  //           const speedKBps = uploadedBytes / timeElapsed / 1024; 
  //           const speedMbps = (speedKBps * 8) / 1000;
  //           setUploadSpeed(speedMbps);
  //         }
  //       }
  //     };

  //     let startTime = new Date().getTime(); 

  //     axios.post("https://api.wlms.archnix.dev/api/admin/video/upload", data, config)
  //       .then((response) => {
  //         console.log(response.data, 'response object');
  //         setVideoUploadStatus("Upload successful!");
  //         dispatch(Actions.video.fetchVideo());
  //         onToast('Upload',{status_code:response.data.status_code,message:response.data.message})
  //         onClose();
  //       })
  //       .catch((error) => {
  //         setVideoUploadStatus("Upload failed. Please try again.");
  //         console.error(error);
  //       })
  //       .finally(() => {
  //         setVideoUploadBtnStatus(false);
  //         setUploadProgress(0); 
  //         setUploadSpeed(0); 
  //       });
  //   } else {
  //     if (!titleValid) setTitleError(true);
  //     if (!isVideoValid) {
  //       setVideoErrorMsg('Please select the video');
  //       setVideoError(true);
  //     }
  //     if (!isThumbnailValid) {
  //       setThumbnailErrorMsg('Please select the thumbnail');
  //       setThumbnailError(true);
  //     }
  //   }
  // };

  const adminVideoUpload = () => {
    if (isThumbnailValid && isVideoValid && titleValid) {
      setVideoUploadStatus("Uploading...");
      setVideoUploadBtnStatus(true);
  
      const data = new FormData();
      data.append("video", video);
      data.append("title", title);
      data.append("thumbnail", thumbnail);
  
      // Dummy field to force multipart/chunked upload
      data.append("dummy", "dummy-value");
  
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : `Bearer`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Accept: "application/json",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
  
            const currentTime = new Date().getTime();
            const timeElapsed = (currentTime - startTime) / 1000;
            setElapsedTime(timeElapsed);
  
            const uploadedBytes = progressEvent.loaded;
            const speedKBps = uploadedBytes / timeElapsed / 1024; 
            const speedMbps = (speedKBps * 8) / 1000;
            setUploadSpeed(speedMbps);
          }
        },
        transformRequest: [data => data],
      };
  
      let startTime = new Date().getTime();
  
      axios.post(baseURL + "api/admin/video/upload", data, config)
        .then((response) => {
          setVideoUploadStatus("Upload successful!");
          dispatch(Actions.video.fetchVideo());
          onToast('Upload', { status_code: response.data.status_code, message: response.data.message });
          onClose();
        })
        .catch((error) => {
          setVideoUploadStatus("Upload failed. Please try again.");
          console.error(error);
        })
        .finally(() => {
          setVideoUploadBtnStatus(false);
          setUploadProgress(0);
          setUploadSpeed(0);
        });
    } else {
      if (!titleValid) setTitleError(true);
      if (!isVideoValid) {
        setVideoErrorMsg('Please select the video');
        setVideoError(true);
      }
      if (!isThumbnailValid) {
        setThumbnailErrorMsg('Please select the thumbnail');
        setThumbnailError(true);
      }
    }
  };
  

  return (
    <form>
      <DialogContent>
        <Box>
          <Box>
            <div style={{ marginBottom: '5px' }}>
              <TextInputComponent
                label={"Title"}
                isError={titleError}
                placeholder="Enter video title"
                name={"title"}
                value={title}
                error={"Please add the video title"}
                onchange={onTitleChange}
              />
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Box style={{ padding: 10 }}>
                <label className="form-label">Video</label>
                <input
                  className="form-control"
                  type={"file"}
                  accept="video/*"
                  ref={inputRef}
                  onChange={onVideoChange}
                  required
                />
                {videoError ? <p className="input-error-text">{videoErrorMsg}</p> : null}
              </Box>
            </div>
            <div style={{ marginBottom: '5px' }}>
              <Box style={{ padding: 10 }}>
                <label className="form-label">Thumbnail</label>
                <input
                  className="form-control"
                  type={"file"}
                  accept="image/*"
                  ref={imageRef}
                  onChange={onThumbnailChange}
                />
                {thumbnailError ? <p className="input-error-text">{thumbnailErrorMsg}</p> : null}
              </Box>
            </div>
          </Box>
        </Box>

        {/* Progress Bar */}
        {videoUploadBtnStatus && (
          <Box p={1} mt={2}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <p>Uploading... {uploadProgress}%</p>
            <p>Upload Speed: {uploadSpeed.toFixed(2)} Mbps</p>
            {/* <p>Elapsed Time: {elapsedTime.toFixed(2)} seconds</p> */}
          </Box>
        )}

        <Box p={1}>
          <b><p className="text-center" style={{ color: 'red' }}>{videoUploadStatus}</p></b>
        </Box>

        <Box mt={5} sx={{ display: "flex", gap: 5, width: 1, justifyContent: 'center' }}>
          <TextButtonComponent text={"Cancel"} classStyle="btn btn-secondary" onButtonClick={() => onClose()} />
          <TextButtonComponent text="Upload" onButtonClick={() => adminVideoUpload()} isDisabled={videoUploadBtnStatus} />
        </Box>
      </DialogContent>
    </form>
  );
};

export default VideoForm;
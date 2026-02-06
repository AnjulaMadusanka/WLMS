import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ReactPlayer from 'react-player'
import CustomVideoControl from "./CustomVideoControl";
// import { CLOUD_FRONT_URL } from "../../../core/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButtonComponent from "../Buttons/IconButton";
import { useSelector } from "react-redux";
import _ from "lodash";
// const link = `https://d3oaompef0i2u8.cloudfront.net/videos/`

const CLOUD_FRONT_URL = `https://stream.archnix.dev/wlms/streams/videos/`
const VideoPlayerComponent = ({ videoUrl, tumbnailUrl, volume, muted, path }) => {
    const verifyData = useSelector(state => state.auth.get('verifyData'));
    const [currentSeek, setCurrentSeek] = useState(0)
    const [cloudfronturl,setCloduFrontUrl] = useState('')
    const videoRef = useRef(null);


    useEffect(()=>{
        setCloduFrontUrl(_.get(verifyData,'video_url'))
    },[verifyData])
    // const [isPlay, setIsPlay] = useState(false)
    // const [volumeBar, setVolumeBar] = useState(100)
    // const [totalDurationOfVideo, setTotalDurationOfVideo] = useState(0)
    // const [url, setUrl] = useState('')

    // const handlePause = async (e) => {
    //     setIsPlay(false)
    //     const data = {
    //         play: false,
    //         pause: true,
    //         isVideoPlayed: false,
    //         currentTime: currentSeek,
    //         actionBy: 'host'
    //     }
    // }

    // const handlePlay = async (e) => {
    //     // if (totalDurationOfVideo === 0) {        
    //     //     setTotalDurationOfVideo(totalDurationOfVideo: this.hostVideo.current.getDuration())
    //     // }
    //     setIsPlay(true)
    //     const data = {
    //         play: true,
    //         pause: false,
    //         isVideoPlayed: true,
    //         currentTime: this.state.currentSeek,
    //         actionBy: 'host'
    //     }

    // }

    // const handleSeekChange = async (e) => {
    //     setCurrentSeek(e.target.value)
    //     this.hostVideo.current.seekTo(e.target.value)
    //     const data = {
    //         currentTime: e.target.value,
    //         actionBy: 'host'
    //     }

    // }

    // const handleVolumeChange = async (e) => {
    //     setVolumeBar(e.target.value)
    //     const data = {
    //         volume: e.target.value / 100,
    //         actionBy: 'host'
    //     }
    // }

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10; // Forward 10 seconds
        }
    };

    // Function to handle backwarding
    const handleBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10; // Backward 10 seconds
        }
    };

    return (<Box sx={{
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 1,
        alignSelf: 'center',
        marginBottom: 2,
    }}>
        {/* <ReactPlayer controls config={{
            file: {
                attributes: {
                    controlsList: 'nodownload'
                }
            }
        }}
            onContextMenu={(e) => e.preventDefault()}
            width={'100%'} height={'100%'}
            style={{ minHeight: 400 }}
            url={`${link}${path}`}
            // url={videoUrl}
            loop={true}
            volume={null}
            mute={true} /> */}

        <video ref={videoRef} controls style={{ minHeight: 400 }} height={'100%'} width={'100%'} controlsList="nodownload">
            <source src={`${cloudfronturl}${path}`} type="video/mp4" />
            <source src={`${cloudfronturl}${path}`} type="video/ogg" />
            {/* <source type="video/mp4" src={CLOUD_FRONT_URL+path} /> */}
            <source type="video/mp4" src={`${cloudfronturl}${path}`} />
            {/* <source type="video/mp4" src={`https://iframe.dacast.com/vod/fbc11410-d6ab-150d-1327-388f863b9b05/63b17229-28a1-421c-a8dd-95788839361c`} /> */}
            Your browser does not support the video tag.
        </video>
        <div class="controls">
            <Tooltip title="10 s backward">
                <IconButton onClick={handleBackward} style={{ marginRight: 10 }}>
                    <FastRewindIcon style={{ fontSize: 20, color: '#ffffff' }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="10 s Forward">
                <IconButton onClick={handleForward} style={{ marginLeft: 10 }}>
                    <FastForwardIcon style={{ fontSize: 20, color: '#ffffff' }} />
                </IconButton>
            </Tooltip>
        </div>

        {/* <div class="controls">
            <button onClick={handleBackward}>10s</button>
            <button onClick={handleForward}>10s</button>
        </div> */}

        {/* <iframe 
        id="fbc11410-d6ab-150d-1327-388f863b9b05-vod-9fd167af-5e86-4549-af41-38a72bb29308" 
        src="https://iframe.dacast.com/vod/fbc11410-d6ab-150d-1327-388f863b9b05/9fd167af-5e86-4549-af41-38a72bb29308" 
            width="100%"
             height="100%"
             frameborder="0" 
             scrolling="no" 
             allow="autoplay;encrypted-media"
            allowfullscreen
            webkitallowfullscreen
            mozallowfullscreen 
            msallowfullscreen
        // style="position:absolute;top:0;left:0;"
        // style={{position:'absolute', top:0,left:0}}
        >
        </iframe> */}


    </Box>


    );
}

export default VideoPlayerComponent;



import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  Typography,
  Link,
} from "@mui/material";
import StarRatingoComponent from "../Buttons/StarRating";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useState } from "react";
import lock from '../../../assets/Images/lock.png'

const VideoListView = ({
  icon,
  onclick,
  size,
  loked = 0,
  heading,
  content,
  link,
  onPreviewClick,
  contentType = 0,
  item,
  index
}) => {
  const [progress, setProgress] = useState(false);
  const [locked, setLock] = useState(true)

  useEffect(() => {
    if (contentType !== 1 || contentType !== 2) {
      setProgress(true);
    }
  }, []);

  useEffect(() => {
    setLock(item?.is_locked);
  }, [item])


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        width: 1,
        margin: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Box sx={{ marginLeft: "1%", width: 100, maxWidth: "100px", marginRight: "2%" }}>
        {contentType !== 2 && index == 0 ? <Typography
          sx={{ fontSize: "16px", color: "#4a6375", fontWeight: 500, }}
        >
          Day {heading}
        </Typography> : null}

      </Box>
      <Box sx={{ /*flex: 0.05, mt:2*/ display:'flex', flexDirection:'column', justifyContent:'center', mt:1.5}}>
        {contentType == 1 ? (
          <SvgIcon sx={{ marginRight: 5, width: "35px", height: "35px" }}>
            <svg width="100%" height="100%" viewBox="0 0 100% 100%" fill="#7587E3" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55556 9H14.2222C14.5278 9 14.7778 9.25 14.7778 9.55556V11.5L17 9.27778V15.3889L14.7778 13.1667V15.1111C14.7778 15.4167 14.5278 15.6667 14.2222 15.6667H7.55556C7.25 15.6667 7 15.4167 7 15.1111V9.55556C7 9.25 7.25 9 7.55556 9ZM13.6667 14.5556V10.1111H8.11111V14.5556H13.6667Z" fill="#7587E3" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="#7587E3"/>
            </svg>

          </SvgIcon>    
        ) : contentType == 2 ? (
          <SvgIcon sx={{ marginRight: 5, width: "35px", height: "35px" }}>
            <svg width="100%" height="100%" viewBox="0 0 100% 100%" id="magicoon-Regular" xmlns="http://www.w3.org/2000/svg">
              <g id="question-circle-Regular">
                <path id="question-circle-Regular-2" data-name="question-circle-Regular" class="cls-1" d="M12,2.25A9.75,9.75,0,1,0,21.75,12,9.761,9.761,0,0,0,12,2.25Zm0,18A8.25,8.25,0,1,1,20.25,12,8.259,8.259,0,0,1,12,20.25ZM15.691,9.326A3.647,3.647,0,0,1,13.9,13.107c-.941.625-1.146,1-1.191,1.133a.751.751,0,0,1-.711.51.766.766,0,0,1-.239-.039.751.751,0,0,1-.471-.951,4.094,4.094,0,0,1,1.782-1.9,2.153,2.153,0,0,0,1.142-2.273A2.251,2.251,0,0,0,9.75,10a.75.75,0,0,1-1.5,0,3.751,3.751,0,0,1,7.441-.674ZM13,17a1,1,0,1,1-1-1A1,1,0,0,1,13,17Z" fill="#7587E3" />
              </g>
            </svg>
          </SvgIcon>
        ) : (
          <SvgIcon sx={{ marginRight: 5, width: "30px", height: "30px" }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" rx="50" fill="#28B882" />
              <path
                d="M80.4343 34.0572L36.9561 77.5354L17.0286 57.6079L22.1373 52.4992L36.9561 67.2818L75.3256 28.9485L80.4343 34.0572Z"
                fill="white"
              />
            </svg>
          </SvgIcon>
        )}
      </Box>
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          maxWidth: "600px",
        }}
      >
        <Box
          sx={{
            alignItems: "left",
            justifyContent: "center",
            display: "flex",
            padding: 2,
          }}
        >
          <SvgIcon sx={{ width: 7, height: 7 }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="#4A6375" />
            </svg>
          </SvgIcon>
        </Box>
        <Typography
          sx={{ fontSize: "16px", color: "#4a6375", fontWeight: 500 }}
        >
          {content}
        </Typography>
      </Box>
      {((!locked) || loked) ?
        <Box sx={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Link component="button" onClick={onPreviewClick} >
            <Typography
              sx={{ fontSize: "16px", color: "rgb(152, 52, 240)", fontWeight: 500 }}
            >
              {contentType == 1
                ? "View"
                : contentType == 2
                  ? "Start Quiz"
                  : "Completed"}
            </Typography>
          </Link>
        </Box>
        :
        <Box sx={{ width: 150, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <img style={{ marginLeft: 2, width: "25px", height: "25px" }} src={lock} />
        </Box>
      }
    </Box>
  );
};

export default VideoListView;


const LockedIcon = () => {
  return (
    <SvgIcon sx={{ marginLeft: 2, width: "25px", height: "25px" }}>
      <svg
        width="100"
        height="103"
        viewBox="0 0 100 103"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_101_3710)">
          <path
            fill-rule="evenodd"
            clipRule="evenodd"
            d="M68.6802 44.3264H31.4258V31.8511C31.4258 26.6004 33.5152 21.8235 36.8949 18.3691C40.2748 14.9047 44.9256 12.7532 50.0482 12.7532C55.1709 12.7532 59.8312 14.9049 63.2013 18.3691C66.581 21.8235 68.6802 26.6006 68.6802 31.8511V44.3264ZM84.5584 46.9518C83.5761 45.955 82.3726 45.1851 81.0246 44.7509V31.8511C81.0246 23.1164 77.5388 15.1712 71.9252 9.41719C66.3115 3.66317 58.5697 0.100098 50.0482 0.100098C41.5265 0.100098 33.7847 3.66317 28.1711 9.41719C22.5574 15.1712 19.0717 23.1164 19.0717 31.8511V44.7114C17.6851 45.1456 16.4429 45.9252 15.4416 46.9518C13.8625 48.5804 12.8802 50.811 12.8802 53.2782V93.448C12.8802 95.9154 13.8625 98.1459 15.4416 99.7743C17.0302 101.393 19.2066 102.4 21.6136 102.4H78.3863C80.7935 102.4 82.9697 101.393 84.5584 99.7743C86.1375 98.1459 87.1197 95.9154 87.1197 93.448V53.2782C87.1199 50.8108 86.1377 48.5804 84.5584 46.9518ZM43.9529 63.6415C45.5031 62.0623 47.6408 61.0754 50 61.0754C52.3591 61.0754 54.4966 62.0623 56.047 63.6415C57.5974 65.2306 58.5506 67.4218 58.5506 69.8397C58.5506 71.7248 57.9728 73.4619 56.9906 74.8931C56.172 76.0776 55.0744 77.0448 53.7937 77.6962V81.7626C53.7937 82.8284 53.3701 83.8056 52.6767 84.5062C51.9929 85.2069 51.0494 85.6512 49.9998 85.6512C48.9597 85.6512 48.0066 85.2069 47.3228 84.5062C46.6392 83.8056 46.2058 82.8284 46.2058 81.7626V77.6962C44.9347 77.0448 43.8371 76.0776 43.0185 74.8931C42.0267 73.4621 41.449 71.725 41.449 69.8397C41.4494 67.4216 42.4123 65.2304 43.9529 63.6415Z"
            fill="#2D3945"
            fill-opacity="0.4"
          />
        </g>
        <defs>
          <clipPath id="clip0_101_3710">
            <rect width="100" height="102.5" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
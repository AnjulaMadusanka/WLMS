import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Box, SvgIcon, Typography, Collapse, Button, Grid } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import _ from "lodash"

const QuizAttemptCard = ({
  itemData = {},
  index,
  attempt = "",
  marks = "",
  date = "",
  time = "",
  onButtonClick = () => { },
}) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        // width: 1,
        alignItems: 'flex-start',
        minWidth: 700,
      }}
    >
      <p className="quiz-attempt-subtext">
        {date} <p>&nbsp;&nbsp;&nbsp;&nbsp;{time}</p>
      </p>
      <Grid className="quiz-attempt-box-outer" container>
        <Grid item xs={12}>
          <Box sx={{ width: '100%' }} className="quiz-attempt-box">
            <span className="quiz-attempt-text">Attempt {index}</span>
            <span className="quiz-attempt-marktext">Marks - {marks}</span>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <SvgIcon>
                <svg
                  width="100"
                  height="101"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 40.991C47.5136 40.991 45.129 41.9876 43.3709 43.7616C41.6127 45.5356 40.625 47.9416 40.625 50.4504C40.625 52.9592 41.6127 55.3653 43.3709 57.1393C45.129 58.9133 47.5136 59.9099 50 59.9099C52.4864 59.9099 54.871 58.9133 56.6291 57.1393C58.3873 55.3653 59.375 52.9592 59.375 50.4504C59.375 47.9416 58.3873 45.5356 56.6291 43.7616C54.871 41.9876 52.4864 40.991 50 40.991Z"
                    fill="#28B882"
                  />
                  <path
                    fill-rule="evenodd"
                    clipRule="evenodd"
                    d="M50 23.123C39.0917 23.123 29.2833 27.5417 22.2167 33.0155C18.675 35.7567 15.7708 38.8005 13.7333 41.7603C11.7333 44.6696 10.4167 47.7218 10.4167 50.4504C10.4167 53.1789 11.7375 56.2312 13.7333 59.1363C15.775 62.1002 18.675 65.1441 22.2167 67.881C29.2833 73.3633 39.0917 77.7777 50 77.7777C60.9083 77.7777 70.7167 73.3591 77.7833 67.8852C81.325 65.1441 84.2291 62.1002 86.2625 59.1405C88.2625 56.2312 89.5833 53.1789 89.5833 50.4504C89.5833 47.7218 88.2625 44.6696 86.2625 41.7645C84.2291 38.8005 81.325 35.7567 77.7833 33.0197C70.7167 27.5375 60.9083 23.123 50 23.123ZM34.375 50.4504C34.375 46.269 36.0212 42.2589 38.9514 39.3023C41.8817 36.3456 45.856 34.6846 50 34.6846C54.144 34.6846 58.1183 36.3456 61.0485 39.3023C63.9788 42.2589 65.625 46.269 65.625 50.4504C65.625 54.6317 63.9788 58.6418 61.0485 61.5985C58.1183 64.5551 54.144 66.2161 50 66.2161C45.856 66.2161 41.8817 64.5551 38.9514 61.5985C36.0212 58.6418 34.375 54.6317 34.375 50.4504Z"
                    fill="#28B882"
                  />
                </svg>
              </SvgIcon>
              <button
                style={{ backgroundColor: "white", border: "none" }}
                onClick={onButtonClick}
              >
                <span className="quiz-attempt-text">View assessment</span>
              </button>
            </Box>
          </Box>
        </Grid>

        {_.get(itemData, 'category_results', [])?.length > 0 ? <Grid xs={12} item>
          <button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={toggleCollapse}
          >
            <span style={{ fontSize: '12px', color: 'darkviolet' }} className="quiz-attempt-text">{open ? "Hide Content" : "Show Content"}</span>
          </button>
        </Grid> : null}
        <Grid item xs={12}>
          <Collapse in={open}>
            <Grid container>
              <Grid xs={12} item>
                {_.get(itemData, 'category_results', []).map((item, index) => {
                  return (
                    <ListItem key={index + '_ca_na'}>
                      <ListItemIcon>
                        <FiberManualRecordIcon style={{ fill: '#9834f033' }} fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={<span style={{ fontFamily: 'Montserrat', fontSize: 14, fontWeight: '600' }}>
                        Cluster {item?.category_name} - <span style={{ fontFamily: 'Montserrat', fontSize: 14, fontWeight: 'normal' }}>{item?.marks}</span>  <span style={{ fontFamily: 'Montserrat', fontSize: 14, fontWeight: 'bold' }}> ( {item?.grade} )</span>
                      </span>} />

                    </ListItem>
                  )
                })}
              </Grid>

            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  )

  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flex: 1,
  //       flexDirection: "column",
  //       width: 1,
  //       alignItems: 'flex-start',
  //       minWidth: 700,
  //     }}
  //   >
  //     <p className="quiz-attempt-subtext">
  //       {date} <p>&nbsp;&nbsp;&nbsp;&nbsp;{time}</p>
  //     </p>

  // <Box sx={{ width: '100%' }} className="quiz-attempt-box">
  //   <span className="quiz-attempt-text">Attempt {index}</span>
  //   <span className="quiz-attempt-marktext">Marks - {marks}</span>
  //   <Box sx={{ display: "flex", flexDirection: "row" }}>
  //     <SvgIcon>
  //       <svg
  //         width="100"
  //         height="101"
  //         viewBox="0 0 100 101"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           d="M50 40.991C47.5136 40.991 45.129 41.9876 43.3709 43.7616C41.6127 45.5356 40.625 47.9416 40.625 50.4504C40.625 52.9592 41.6127 55.3653 43.3709 57.1393C45.129 58.9133 47.5136 59.9099 50 59.9099C52.4864 59.9099 54.871 58.9133 56.6291 57.1393C58.3873 55.3653 59.375 52.9592 59.375 50.4504C59.375 47.9416 58.3873 45.5356 56.6291 43.7616C54.871 41.9876 52.4864 40.991 50 40.991Z"
  //           fill="#28B882"
  //         />
  //         <path
  //           fill-rule="evenodd"
  //           clipRule="evenodd"
  //           d="M50 23.123C39.0917 23.123 29.2833 27.5417 22.2167 33.0155C18.675 35.7567 15.7708 38.8005 13.7333 41.7603C11.7333 44.6696 10.4167 47.7218 10.4167 50.4504C10.4167 53.1789 11.7375 56.2312 13.7333 59.1363C15.775 62.1002 18.675 65.1441 22.2167 67.881C29.2833 73.3633 39.0917 77.7777 50 77.7777C60.9083 77.7777 70.7167 73.3591 77.7833 67.8852C81.325 65.1441 84.2291 62.1002 86.2625 59.1405C88.2625 56.2312 89.5833 53.1789 89.5833 50.4504C89.5833 47.7218 88.2625 44.6696 86.2625 41.7645C84.2291 38.8005 81.325 35.7567 77.7833 33.0197C70.7167 27.5375 60.9083 23.123 50 23.123ZM34.375 50.4504C34.375 46.269 36.0212 42.2589 38.9514 39.3023C41.8817 36.3456 45.856 34.6846 50 34.6846C54.144 34.6846 58.1183 36.3456 61.0485 39.3023C63.9788 42.2589 65.625 46.269 65.625 50.4504C65.625 54.6317 63.9788 58.6418 61.0485 61.5985C58.1183 64.5551 54.144 66.2161 50 66.2161C45.856 66.2161 41.8817 64.5551 38.9514 61.5985C36.0212 58.6418 34.375 54.6317 34.375 50.4504Z"
  //           fill="#28B882"
  //         />
  //       </svg>
  //     </SvgIcon>
  //     <button
  //       style={{ backgroundColor: "white", border: "none" }}
  //       onClick={onButtonClick}
  //     >
  //       <span className="quiz-attempt-text">View assessment</span>
  //     </button>
  //   </Box>
  // </Box>

  //   </Box>
  // );
};

export default QuizAttemptCard;

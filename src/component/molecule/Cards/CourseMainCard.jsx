import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { useNavigate } from "react-router-dom";
import { DurationButton } from "../../atom";
import { useSelector } from "react-redux";

const CourseMainCard = ({
  id = "",
  title = "",
  duration = "",
  price = "",
  durationtitle = "",
  pricetitle = "",
  coursename,
  description,
  paragraph,
  reviews,
  onCourseView,
  onEnroll,
  onFreeOrientation,
  width,
  image,
  rating,
  onSampleClass = () => { },
}) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(0);
  const show = useSelector(state => state.common.get('show'));

  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);


  return (
    <Card sx={{ maxWidth: 370, minWidth: 370, borderRadius: 6 }}>
      <Box
        sx={{
          position: "relative",
          backgroundImage:
            "linear-gradient(to top, #2d3945, #292b34, #211e24, #161214, #000000)",
        }}
      >
        <CardMedia
          component="img"
          height="220"
          classes={{ img: "card-image-container" }}
          image={image}
          alt="Card-image"
          style={{ opacity: 0.9 }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            color: "white",
            fontFamily: "'Saira Extra Condensed', sans-serif",
            fontWeight: 700,
            fontSize: 40,
            bottom: 0,
            left: 0,
            textShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 10px',
            backgroundColor: "transparent",
            backgroundImage: "linear-gradient(180deg, #FFFFFF00 30%, #000000 100%)"

          }}
        >
          <span style={{ position: "absolute", bottom: 0, left: 20 }}>{title}</span>
        </div>
      </Box>

      <CardContent>
        <Grid container flexDirection={"column"} spacing={3}>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <DurationButton subtitle={duration} title={durationtitle} />
              </Grid>
              <Grid item>
                {isShow ? <DurationButton subtitle={price} title={pricetitle} /> : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignSelf: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                  }}
                >
                  <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
                    {reviews < 10 ? "0" + reviews : reviews} Reviews
                  </span>
                  <StarRatingoComponent
                    readOnly
                    selectValue={rating}
                    size={"50"}
                  />
                </Box>
              </Grid>
              <Grid item>
                <TextButtonComponet
                  onButtonClick={onCourseView}
                  classStyle={"btn btn-course"}
                  text={"View Course"}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container flexDirection={"column"} spacing={0.5}>
              <Grid item>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "Montserrat",
                  }}
                >
                  {description}
                </span>
              </Grid>
              <Grid item height={70}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 4,
                    // lineHeight: "1rem",
                    maxHeight: "4.5rem",
                  }}
                  title={paragraph}
                >
                  {paragraph}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1.5}>
              <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                <TextButtonComponet
                  width={width}
                  onButtonClick={onEnroll}
                  classStyle={"btn btn-enroll"}
                  text="Enroll now"
                />
              </Grid>
              <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                {/* {id ==   2 ? } */}
                {/* <TextButtonComponet
            width={width}
            onButtonClick={onFreeOrientation}
            classStyle={"btn btn-free"}
            text="Free Orientation"
          /> */}
                <TextButtonComponet
                  width={width}
                  onButtonClick={onSampleClass}
                  classStyle={"btn btn-enroll btn-free"}
                  text="Free sample class"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CourseMainCard;

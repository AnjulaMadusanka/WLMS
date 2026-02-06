import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { StarRatingoComponent } from "../../atom";
import { useSelector } from "react-redux";

const CourseCard = ({
  image,
  title,
  description,
  btnText,
  onCourseDetails = () => { },
  price,
  currancy,
  reviewCount,
  reviewAvg,
  weeks,
  selectValue = 0,
  isRegisterd,
  isFree,
}) => {

  const [amount, setAmount] = useState('');
  const [symbole, setSymbole] = useState('');

  const [isShow, setIsShow] = useState(0);
  const show = useSelector(state => state.common.get('show'));

  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);



  useEffect(() => {
    setAmount(price)
  }, [price])

  useEffect(() => {
    setSymbole(currancy)
  }, [currancy])

  return (
    <Card sx={{ borderRadius: 8, maxWidth: 280, minWidth: 280, }}>
      <Box
        sx={{
          maxWidth: '280px',
          width: "280px",
          position: "relative",
          backgroundImage:
            "linear-gradient(to top, #2d3945, #292b34, #211e24, #161214, #000000)",
        }}
      >
        <CardMedia
          component="img"
          height="180"
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
          <span style={{ position: "absolute", bottom: 0, left: 20, right:20}}>{title}</span>
        </div>
      </Box>
      <CardContent>
        <Grid container flexDirection={"column"} rowSpacing={2}>
          <Grid item>
            <Grid container alignItems={"center"} spacing={2}>
              <Grid item>
                <StarRatingoComponent readOnly selectValue={reviewAvg} />
              </Grid>
              <Grid item>
                <span className="course-catalog-card-text">
                  {reviewCount} Reviews
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <p className="course-catelog-card-gray-bg">{weeks} Weeks</p>
              </Grid>
              <Grid item>
                {isShow ? isFree? <p className="course-catelog-card-gray-bg">Free</p>  : 
                <>
                {isRegisterd == 0 ? <p className="course-catelog-card-gray-bg">
                  {symbole} {amount}
                </p> :null}
                </>
                : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <span
              className="course-catalog-card-description"
              title={description}
            >
              {description}
            </span>
          </Grid>
          <Grid item>
            {isRegisterd == 1 ? (
              <TextButtonComponet
                text={"View"}
                onButtonClick={onCourseDetails}
              />
            ) : (
              <TextButtonComponet
                text={"Preview"}
                classStyle="btn course-catalog-preview"
                onButtonClick={onCourseDetails}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

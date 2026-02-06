import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Box, Grid, Typography } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import { DurationButton } from "../../atom";
import { useSelector } from "react-redux";

const CourseRatingCard = ({
  title,
  reviews,
  duration,
  durationtitle,
  price,
  pricetitle,
  rating = 3,
}) => {

  const [isShow, setIsShow] = useState(0);
  const show = useSelector(state => state.common.get('show'));

  useEffect(() => {
    setIsShow(show == 1);
  }, [show]);


  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item>
        <Grid container flexDirection={"column"} >
          <Grid item>
            <span
              style={{
                color: " #2d3945",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "Montserrat",
              }}
            >
              {title}
            </span>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <StarRatingoComponent readOnly={true} selectValue={rating} />
              </Grid>
              <Grid item>
                <p
                  style={{
                    color: "#4a6375",
                    fontFamily: "Montserrat",
                    marginLeft: 10,
                  }}
                >
                  {reviews} Reviews
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <DurationButton subtitle={duration} title={durationtitle} />
          </Grid>
          <Grid item>
           {isShow? <DurationButton subtitle={price} title={pricetitle} />: false}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseRatingCard;

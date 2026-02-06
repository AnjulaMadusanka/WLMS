import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import StarRatingoComponent from "../../atom/Buttons/StarRating";
import { DurationButton } from "../../atom";
import { IMAGE_URL } from "../../../core/Constant";

const ReviewCard = ({ icon, onclick, size, reviewData }) => {
  useEffect(() => {
   
  }, []);
  return (
    <>
      {reviewData?.map((item, index) => {
        let date = new Date(item?.created_at).toLocaleDateString("en-US");
        return (
          <Box p={1}>
            <Divider sx={{ color: "#D1D5DB" }} variant="middle" />
            <Grid container flexDirection={"column"}m={1}>
              <Grid item>
                <Grid container alignItems={"center"} spacing={1}>
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src={IMAGE_URL + item?.users?.profile_image}
                      sx={{ width: 64, height: 64 }}
                    />
                  </Grid>
                  <Grid item flexGrow={1}>
                    <Grid container justifyContent={"space-between"}>
                      <Grid item xs={2} md={2}>
                        <span className="course-review-name">
                          {item?.users?.first_name}
                        </span>
                      </Grid>

                      <Grid item xs={2} md={2}>
                        <StarRatingoComponent
                          readOnly={true}
                          selectValue={item?.rating}
                        />
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <span className="course-review-description">
                          {date}
                        </span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item p={1}>
                <span className="course-review-description">
                  {item?.feedback}
                </span>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};

export default ReviewCard;

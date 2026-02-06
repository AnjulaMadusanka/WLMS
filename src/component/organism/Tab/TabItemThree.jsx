import { Box, Divider, Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextButtonComponet from "../../atom/Buttons/TextButton";
import { CourseListCard } from "../../molecule";
import ReviewCard from "../../molecule/Cards/ReviewCard";
import {
  ReviewLinearView,
  StarRatingoComponent,
  TextInputComponent,
} from "../../atom";
import TextAreaComponent from "../../atom/Inputs/TextArea";
import { connect } from "react-redux";
import { Actions } from "../../../core/modules/Actions";
import StarIcon from "@mui/icons-material/Star";

const TabItemThree = ({
  itemthreeData,
  addReviewStudentStatus,
  addReviewByStudent,
  reviewState,
}) => {
  const [review, setReview] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [addRating, setRating] = useState(0);
  const [reviewStatus, setReviewStatus] = useState(false);
  const [totRatingCount, setTotRatingCount] = useState(0);
  const [ratingList, setRatingList] = useState([]);
  const linearBarColorChange = [
    "#22B296",
    "#B8A128",
    "#FBBF24",
    "#FBA524",
    "#F57A18",
  ];

  useEffect(() => {
    let ratingArr = [];
    setReview(itemthreeData.courses[0]?.course_rating);
    for (let i = 0; i < 5; i++) {
      if (i == 0) {
        ratingArr.push({ rating: itemthreeData?.courses[0]?.rating_1 });
      } else if (i == 1) {
        ratingArr.push({ rating: itemthreeData?.courses[0]?.rating_2 });
      } else if (i == 2) {
        ratingArr.push({ rating: itemthreeData?.courses[0]?.rating_3 });
      } else if (i == 3) {
        ratingArr.push({ rating: itemthreeData?.courses[0]?.rating_4 });
      } else if (i == 4) {
        ratingArr.push({ rating: itemthreeData?.courses[0]?.rating_5 });
      }
    }
    setTotRatingCount(_.get(itemthreeData, "courses[0].totalRatingCount", ""));
    setRatingList(ratingArr);
    setReviewStatus(reviewState);
  }, [review, reviewState, itemthreeData]);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId"));
    addReviewStudentStatus({
      course_id: itemthreeData?.courses[0]?.id,
      user_id: userId,
    });
  }, []);

  const addReview = () => {
    let userId = parseInt(localStorage.getItem("userId"));

    addReviewByStudent({
      course_id: itemthreeData?.courses[0]?.id,
      rating: addRating,
      feedback: reviewText,
    });

    addReviewStudentStatus({
      course_id: itemthreeData?.courses[0]?.id,
      user_id: userId,
    });
  };

  const print = (index) => {
    return <Grid item>{printStar(index)}</Grid>;
  };

  const printStar = (index) => {
    switch (index) {
      case 0: {
        return (
          <>
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
          </>
        );
      }
      case 1: {
        return (
          <>
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
          </>
        );
      }
      case 2: {
        return (
          <>
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
          </>
        );
      }
      case 3: {
        return (
          <>
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
            <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />
          </>
        );
      }
      case 4: {
        return <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />;
      }
      default: {
        return <StarIcon sx={{ color: "#D1D5DB", fontSize: 14 }} />;
      }
    }
  };

  return (
    <Box >
      <Grid container justifyContent={"space-between"}>
        <Grid item  xs={3} sm={6} md={3.5} >
          <Grid container flexDirection={"column"} >
            <Grid item>
              <p className="dashboard-review-text">Total Reviews</p>
            </Grid>
            <Grid item>
              <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                {itemthreeData.courses[0]?.totalRatingCount < 10
                  ? "0" + itemthreeData.courses[0]?.totalRatingCount
                  : itemthreeData.courses[0]?.totalRatingCount}
              </span>
            </Grid>
            <Grid item>
              <p className="dashboard-review-subtext">
                Growth in reviews on this year
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Divider
          orientation="vertical"
          sx={{ color: "#D1D5DB" }}
          variant="middle"
          flexItem
        />
        <Grid item xs={3} md={3.5} lg={3} sm={5}>
          <Grid container flexDirection={"column"}>
            <Grid item>
              <p className="dashboard-review-text">Average Rating</p>
            </Grid>
            <Grid item>
              <Grid container alignItems={"center"} spacing={1}>
                <Grid item>
                  <span style={{ fontSize: "40px", fontWeight: "bold" }}>
                    {itemthreeData.courses[0]?.averageRating}
                  </span>
                </Grid>
                <Grid item>
                  <StarRatingoComponent
                    value={itemthreeData.courses[0]?.averageRating}
                    readOnly
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <p className="dashboard-review-subtext">
                Average rating on this year
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Divider
          orientation="vertical"
          sx={{ color: "#D1D5DB" }}
          className="responsive-divider"
          variant="middle"
          flexItem
        />

        <Grid item xs={3} md={4.5} sm={12}>
          {ratingList?.map((item, index) => {
            return (
              <Grid
                justifyContent={"center"}
                alignItems={"center"}
                container
                spacing={1}
              >
                <Grid item xs={4}>
                  {print(index)}
                </Grid>
                <Grid item xs={1}>
                  <h6 className="rating-text">{ratingList?.length - index}</h6>
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems={"center"} spacing={1}>
                    <Grid item xs={6}>
                      <LinearProgress
                        sx={{
                          backgroundColor: "#f2f6f8",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: `${linearBarColorChange[index]}`,
                          },
                          height: 8,
                          borderRadius: 10,
                        }}
                        variant="determinate"
                        value={item?.rating}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <h6 className="rating-text">
                        {item?.rating < 10 ? "0" + item?.rating : item?.rating}
                      </h6>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      {!reviewStatus ? (
        <>
          <Divider sx={{ color: "#D1D5DB" }} variant="middle" />
          <Box m={2}>
            <Grid container sx={{ flexDirection: "column" }}>
              <Grid item p={1}>
                <p className="dashboard-review-text">
                  Please add your valuble{" "}
                  <span style={{ color: "#9834F0" }}>feedback</span> here
                </p>
                <StarRatingoComponent
                  name="simple-controlled"
                  onChange={(e) => setRating(e.target.value)}
                  value={addRating}
                  precision={1}
                />
              </Grid>
              <Grid item>
                <TextAreaComponent
                  height={100}
                  onchange={(e) => setReviewText(e.target.value)}
                  placeholder="Type Here..."
                />
                <Grid container justifyContent={"flex-end"}>
                  <Grid item minWidth={"20%"}>
                    <TextButtonComponet
                      text={"Add Review"}
                      onButtonClick={addReview}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : null}

      <ReviewCard reviewData={review} />
    </Box>
  );
};

export default connect(
  (state) => ({
    reviewState: state.course.get("reviewState"),
  }),
  {
    addReviewByStudent: Actions.course.AddReviewByStudent,
    addReviewStudentStatus: Actions.course.AddReviewStudentStatus,
  }
)(TabItemThree);

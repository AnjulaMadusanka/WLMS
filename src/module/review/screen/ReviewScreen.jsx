import React, { useEffect, useState, useRef } from "react";
import { AdminReviewCard } from "../../../component/molecule";
import { Avatar, Box, Grid } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import { StarRatingoComponent } from "../../../component/atom";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { DATE_FORMAT } from "../../../core/Constant";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import { IMAGES } from "../../../assets/Images";
import { color } from "highcharts";

const ReviewScreen = ({ adminReviewList, getAdminReviewList }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location?.state?.course_id;
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    setAvgRating(adminReviewList.average_rating);
  }, [adminReviewList, courseId]);

  useEffect(() => {
    getAdminReviewList(courseId);
  }, []);

  return (
    <>
      <Box className="main-screen-container">
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={'center'}
          className="common-admin-content-wrap"
        >
          <Grid item>
          <HeadingComponent
            text={"Reviews"}
            fontweigth={600}
            size={40}
            fontfamily={"Montserrat"}
            backNavigation={true}
          />
          </Grid>
          <Grid item>
            <TextButtonComponet
              text={"Non Approved Reviews"}
              onButtonClick={() =>
                navigate("/admin-non-approved-reviews", { state: { courseId } })
              }
            />
          </Grid>
        </Grid>
        {adminReviewList?.total_reviews > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                mb: 2,
              }}
            >
              <Box
                sx={{ padding: 3, backgroundColor: "#F2F6F8", borderRadius: 5 }}
              >
                <p
                  style={{
                    color: "#4A6375",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: 20,
                  }}
                >
                  {adminReviewList?.total_reviews} Reviews
                </p>
                <StarRatingoComponent
                  name="half-rating-read"
                  value={avgRating}
                  precision={0.5}
                  readOnly
                />
              </Box>
            </Box>
            {adminReviewList?.reviews?.map((review, index) => (
              <Box key={index} mr={1} ml={1} mt={2} mb={2}>
                <AdminReviewCard
                  profilePic={review?.users?.profile_image}
                  studentName={
                    review?.users?.first_name + " " + review?.users?.last_name
                  }
                  date={moment(new Date(review?.created_at)).format(
                    DATE_FORMAT
                  )}
                  rating={review?.rating}
                  feedback={review?.feedback}
                  reviewId={review?.id}
                  courseId={courseId}
                />
              </Box>
            ))}
          </>
        ) : (
          <Grid container alignItems={"center"} justifyContent={'center'} flexDirection={"column"} p={2} rowGap={2}>
            <Grid item sx={{display:'flex', justifyContent:'center'}}>
              <img
                alt="Remy Sharp"
                src={IMAGES.emptyReviews}
                style={{ width: '60%',objectFit:'contain', borderRadius:20}}
              />
            </Grid>
            <Grid item>
              <span className="no-review-text" >
                Currently, there are no reviews available for this course.
              </span>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    adminReviewList: state.review.get("getAdminReviewList"),
  }),
  {
    getAdminReviewList: Actions.review.getAdminReviewList,
  }
)(ReviewScreen);

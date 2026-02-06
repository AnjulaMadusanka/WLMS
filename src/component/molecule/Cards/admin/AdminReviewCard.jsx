import React, { useState } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import { IconButtonComponent, StarRatingoComponent } from "../../../atom";
import { IMAGE_URL } from "../../../../core/Constant";
import { Icon } from "@material-ui/core";
import { useDispatch } from "react-redux";
import PopUpMessageComponent from "../../PopupMessage/PopUpMessage";
import { Actions } from "../../../../core/modules/Actions";

const AdminReviewCard = ({
  profilePic,
  date,
  rating,
  feedback,
  studentName,
  courseId,
  reviewId
}) => {

    const dispatch = useDispatch();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const deleteReview = () => {
        dispatch(Actions.review.deleteAdminReview(reviewId, courseId));
        setConfirmDelete(false);
    } 
  return (
    <>
    <Grid
      container
      justifyContent={"space-between"}
      spacing={1}
      rowGap={1.5}
      className="admin-review-card-wrap"
      pr={1}
      pb={1}
    >
      <Grid item md={3} lg={3} xl={3} sm={12}>
        <Avatar
          alt="P"
          src={IMAGE_URL + profilePic}
          sx={{ width: "100%", height: 150, borderRadius: 3 }}
        />
      </Grid>
      <Grid item md={6} lg={6} sm={9} xl={6}>
        <Grid container flexDirection={"column"} rowSpacing={1}>
          <Grid item>
            <p
              style={{
                fontFamily: "Montserrat",
                color: "#324C65BF",
                fontWeight: 700,
                fontSize: 20,
                padding: 0,
                margin: 0,
              }}
            >
              {studentName}
            </p>
          </Grid>
          <Grid item>
            <StarRatingoComponent
              name="half-rating-read"
              value={rating}
              precision={0.5}
              readOnly
            />
          </Grid>
          <Grid item>
            <span
              style={{
                fontFamily: "Montserrat",
                fontSize: 16,
                color: "#4A6375",
                fontWeight: 550,
              }}
            >
              {feedback}
            </span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3} lg={3} xl={3} sm={3}>
        <Grid
          container
          flexDirection={"column"}
          alignItems={"flex-end"}
          style={{height:"100%"}}
          justifyContent={"space-between"}
        >
          <Grid item>
            <span className="admin-review-date-text">{date}</span>
          </Grid>
          <Grid item>
            <IconButtonComponent btnType={"deleteIconbtn"} onclick={()=> setConfirmDelete(true)}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <PopUpMessageComponent
        open={confirmDelete}
        type={"other"}
        title={"Delete!"}
        message={"Are you sure you want to delete this review?"}
        btntext={"Yes, delete"}
        onclick={() => deleteReview()}
        altbtntext={"No"}
        altonclick={() => setConfirmDelete(false)}
        onclose={() => setConfirmDelete(false)}
      />
    </>
    
  );
};

export default AdminReviewCard;

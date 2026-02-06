import React, { useEffect, useState, useRef } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import HeadingComponent from "../../../component/atom/Headings/Heading";
import {
  StarRatingoComponent,
  SwitchButtonComponet,
} from "../../../component/atom";
import { Actions } from "../../../core/modules/Actions";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { DATE_FORMAT, IMAGE_URL } from "../../../core/Constant";
import TextButtonComponet from "../../../component/atom/Buttons/TextButton";
import TableComponent from "../../../component/atom/Table/TableComponent";
import { setTopLevelNavigator } from "../../../core/services/NavigationServicd";
import _ from "lodash";

const AdminNonApprovedReviews = ({
  getAdminReviewsNonApproved,
  nonApprovedReviews,
  courseList,
  getCourseList,
  approveReview,
  verifyToken,
}) => {
  const [nonApprovedList, setNonApprovedList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const courseId = location.state?.courseId;
  useEffect(() => {
    const list = _.filter(nonApprovedReviews, (item)=> item.course_id == courseId);
    setNonApprovedList(list);
  }, [nonApprovedReviews, courseList,courseId]);

  useEffect(() => {
    getAdminReviewsNonApproved();
    getCourseList();
  }, []);

  const columns = [
    {
      name: "users",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => value?.first_name,
      },
    },
    {
      name: "users",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => value?.last_name,
      },
    },
    {
      name: "feedback",
      label: "Feedback",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "rating",
      label: "Rating",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <StarRatingoComponent
              name="half-rating-read"
              value={value}
              precision={0.5}
              readOnly
            />
          );
        },
      },
    },
    {
      name: "created_at",
      label: "Created Date",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) =>
          moment(new Date(value)).format(DATE_FORMAT),
      },
    },
    {
      name: "courses",
      label: "Course",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => value?.name,
      },
    },
    {
      name: "is_active",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <SwitchButtonComponet
              checked={value ? true : false}
              onChange={() => updateReviewStatus(tableMeta, value)}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        },
      },
    },
  ];

  const updateReviewStatus = (tableMeta, value) => {
    const updated = nonApprovedList?.map((item) => {
      if (item?.user_id == tableMeta?.rowData[0]?.id) {
        const currentStatus = item?.is_approved;
        const updatedStatus = currentStatus == 1 ? 0 : 1;
        approveReview({ rating_id: item?.id, is_approved: updatedStatus });
        return { ...item, updatedStatus };
      }
      return item;
    });
    setNonApprovedList(updated);
  };

  return (
    <>
      <Box className="main-screen-container">
          <Grid container flexDirection={'column'} rowGap={3}>
          <Grid item>
          <HeadingComponent
            text={"Non Approved Reviews"}
            fontweigth={600}
            size={35}
            fontfamily={"Montserrat"}
            backNavigation={true}
          />
          </Grid>
          <Grid item>
          <TableComponent columns={columns} data={nonApprovedList} />
          </Grid>
        </Grid>
        {/* <Box>
          <HeadingComponent
            text={"Non Approved Reviews"}
            fontweigth={600}
            size={35}
            fontfamily={"Montserrat"}
          />
        </Box>

        <Grid container justifyContent={"space-between"} mb={3} className="common-admin-content-wrap">
          <Grid item>
            <TextButtonComponet
              onButtonClick={() => navigate(-1)}
              text={"Back"}
              classStyle="btn btn-secondary"
            />
          </Grid>
        </Grid>
        <Box>
          <TableComponent columns={columns} data={nonApprovedList} />
        </Box> */}
      </Box>
    </>
  );
};

export default connect(
  (state) => ({
    nonApprovedReviews: state.review.get("getNonApprovedReviewsAdmin"),
    courseList: state.students.get("commonCourseList"),
  }),
  {
    getAdminReviewsNonApproved: Actions.review.getNonApprovedReviewsAdmin,
    getCourseList: Actions.students.getCourseList,
    approveReview: Actions.review.approveReviewAdmin,
    verifyToken: Actions.auth.verifyToken,
  }
)(AdminNonApprovedReviews);

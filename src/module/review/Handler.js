import React from "react";
import { Actions } from "../../core/modules/Actions";
import { ModuleEvents } from "./Actions";
import { onToast } from "../../core/Constant";

export default {
  [ModuleEvents.ADD_STUDENT_REVIEW_BY_ADMIN]: ({
    dispatch,
    payload,
    appState,
  }) => {
    // dispatch(Actions.review.getAdminReviewList(payload?.course_id));
    onToast("Add Review", payload, false);
  },

  [ModuleEvents.APPROVE_REVIEW_ADMIN]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.review.getNonApprovedReviewsAdmin());
    }

    onToast("Review", payload, false);
  },

  [ModuleEvents.DELETE_ADMIN_REVIEW]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.review.getAdminReviewList(payload.courseId));
    }
    onToast("Delete Review", payload, false);
  },
};

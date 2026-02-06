import React from "react";
import { Actions } from "../../core/modules/Actions";
import { ModuleEvents } from "./Actions";
import { onToast } from "../../core/Constant";
import { useNavigate } from "react-router-dom";
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.GET_DOCUMENTLIST]: ({ dispatch, payload, appState }) => {
    // if (
    //   payload &&
    //   !payload.error &&
    //   payload.status &&
    //   payload.status_code == 1
    // ) {
    //    dispatch(Actions.newsLetter.getNewsletterHistory());
    // }
    // onToast("Newsletter Status", payload, false);
  },
  [ModuleEvents.ADD_DOCUMENT]: ({ dispatch, payload, appState }) => {
    const course = localStorage.getItem('courseId');
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.document.getDocumentList(parseInt(course)));
    }
    onToast("Add Document", payload, false);
  },

  [ModuleEvents.DELETE_DOCUMENT]: ({dispatch, payload, appState }) => {
    const course = localStorage.getItem('courseId');
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.document.getDocumentList(parseInt(course)));
    }
    onToast("Delete Document", payload, false);
  },
  [ModuleEvents.DOCUMENT_STATUS_UPDATE]: ({dispatch, payload, appState }) => {
    const course = localStorage.getItem('courseId');
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
       dispatch(Actions.document.getDocumentList(parseInt(course)));
    }
    onToast("Update Document", payload, false);
  },
};

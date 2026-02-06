import React from "react";
import { Actions } from "../../core/modules/Actions";
import { ModuleEvents } from "./Actions";
import { onToast } from "../../core/Constant";
import { useNavigate } from "react-router-dom";
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.UPDATE_NEWSLETTER_STATUS]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterHistory());
    }
    onToast("Newsletter Status", payload, false);
  },

  [ModuleEvents.UPDATE_NEWSLETTER_CONTENT]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterContentList());
    }
    onToast("Update Newsletter", payload, false);
  },

  [ModuleEvents.UPDATE_NEWSLETTER]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterHistory());
    }
    onToast("Update Newsletter", payload, false);
  },

  [ModuleEvents.DELETE_NEWSLETTER_CONTENT]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterContentList());
    }
    onToast("Delete NewsLetter", payload, false);
  },

  [ModuleEvents.DELETE_NEWSLETTER]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterHistory());
    }
    onToast("Delete NewsLetter", payload, false);
  },

  [ModuleEvents.CREATE_NEWSLETTER_CONTENT]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterContentList());
    }
    onToast("Create NewsLetter", payload, false);
  },

  [ModuleEvents.CREATE_NEWSLETTER]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.newsLetter.getNewsletterHistory());
    }
    onToast("Create NewsLetter", payload, false);
  },

};

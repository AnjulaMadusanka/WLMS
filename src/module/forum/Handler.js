import React from "react";
import { Actions } from "../../core/modules/Actions";
import { ModuleEvents } from "./Actions";
import { onToast } from "../../core/Constant";
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.UPDATE_FORUM_STATUS]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumList());
    }
    onToast("User Status", payload, false);
  },

  [ModuleEvents.UPDATE_FORUM_NAME]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumList());
    }
    onToast("Update Forum", payload, false);
  },

  [ModuleEvents.DELETE_FORUM]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumList());
    }
    onToast("Delete Forum", payload, false);
  },

  [ModuleEvents.CREATE_FORUM]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumList());
    }
    onToast("Create Forum", payload, false);
  },
  [ModuleEvents.SEND_THREAD_MESSAGE]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      const forum = appState.forum.get("selectedForum");
      dispatch(Actions.forum.getForumById(forum?.id));
    }
    onToast("Send Reply", payload, false);
  },
  [ModuleEvents.JOIN_FORUM]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumList());
    }
    onToast("Join Forum", payload, false);
  },
  [ModuleEvents.DELETE_FORUM_PARTICIPENTS]: ({
    dispatch,
    payload,
    appState,
  }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(
        Actions.forum.getAdminForumParticipents(localStorage.getItem("forumId"))
      );
    }
    onToast("Remove Forum Participant ", payload, false);
  },

  [ModuleEvents.DELETE_FORUM_REPLY]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(
        Actions.forum.getForumById(payload?.forumId)
      );
    }
    onToast("Delete Forum Reply ", payload, false);
  },

  [ModuleEvents.DELETE_FORUM_REPLY_STUDENT]: ({
    dispatch,
    payload,
    appState,
  }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumById(payload?.forumId))
    }
    onToast("Delete Forum Reply ", payload, false);
  },

  [ModuleEvents.CREATE_ADMIN_FORUM]: ({ dispatch, payload, appState }) => {
    if (
      payload &&
      !payload.error &&
      payload.status_code &&
      payload.status_code == 1
    ) {
      dispatch(Actions.forum.getForumList());
    }
    onToast("Create Forum", payload, false);
  },
};

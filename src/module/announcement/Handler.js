import React from 'react';
import {Actions} from '../../core/modules/Actions';
import {ModuleEvents} from './Actions';
import { onToast } from '../../core/Constant';

export default {
   [ModuleEvents.POST_ANNOUNCEMENT]: ({ dispatch, payload, appState }) => {
    onToast('Announcement Post', payload);
  },

  [ModuleEvents.DELETE_ADMIN_ANNOUNCEMENT]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.announcement.getAllAnnouncementForAdmin());
    }
    onToast('Delete Announcement', payload);
  },

  [ModuleEvents.UPDATE_ADMIN_ANNOUNCEMENT]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.announcement.getAnnouncementForAdmin(payload?.announcementId));
      dispatch(Actions.announcement.getAllAnnouncementForAdmin());
    }
    onToast('Update Announcement', payload);
  },
};

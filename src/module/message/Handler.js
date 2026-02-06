import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { USER_ROLE, onToast } from '../../core/Constant';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.SEND_MESSAGE]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status && payload.status_code == 1) {
      let userId = localStorage.getItem('userId');
      const userType = localStorage.getItem('userType');
      if (userType == USER_ROLE.admin) {
       userId = localStorage.getItem('adminChatUserId');
      }
      dispatch(Actions.message.getChatRoomData(userId));
    } else {
      onToast('Send Message', payload, false)
    }

  },

  [ModuleEvents.DELETE_MESSAGE]: ({ dispatch, payload, appState }) => {
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.message.getChatRoomData(payload?.userId));
    }
    onToast('Delete Message ', payload, false);
  },
};

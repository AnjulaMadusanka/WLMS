import React from 'react';
import { Actions } from '../../core/modules/Actions';
import { ModuleEvents } from './Actions';
import { onToast } from '../../core/Constant';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.CHANGE_PASSWORD]: ({ dispatch, payload, appState }) => {
    // Logger.infor(JSON.stringify(payload))
    onToast('Change Password', payload, false);
  },
  [ModuleEvents.UPDATE_PROFILE]: ({ dispatch, payload, appState }) => {
    // Logger.infor(JSON.stringify(payload))
    onToast('Profile Update', payload, false);
    if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
      dispatch(Actions.profile.getUserData());
    }

  },
};

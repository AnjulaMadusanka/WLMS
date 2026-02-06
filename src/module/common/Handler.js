import React from 'react';
import {Actions} from '../../core/modules/Actions';
import {ModuleEvents} from './Actions';
import { USER_ROLE, onToast } from '../../core/Constant';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.RESET_DEVICE_ID]: ({dispatch, payload, appState}) => {
    onToast('Device id rest',payload);
    // Logger.infor(JSON.stringify(payload))

   },
};

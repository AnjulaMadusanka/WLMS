import React from 'react';
import {Actions} from '../../core/modules/Actions';
import {ModuleEvents} from './Actions';
// import {navigate} from '../../core/repository/Repository';

export default {
  [ModuleEvents.NETWORK_ERROR]: ({dispatch, payload, appState}) => {
    // Logger.infor(JSON.stringify(payload))
   },
};

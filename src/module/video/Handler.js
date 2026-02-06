import React from 'react';
import {Actions} from '../../core/modules/Actions';
import {ModuleEvents} from './Actions';
// import {navigate} from '../../core/repository/Repository';
import { onToast } from '../../core/Constant';

export default {
   [ModuleEvents.UPLOAD_VIDEO]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.video.fetchVideo());
    onToast('Upload Status', payload);
  },
  [ModuleEvents.DELETE_VIDEO]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.video.fetchVideo());
    onToast('Delete Video', payload);
  },
  [ModuleEvents.UPDATE_TITLE]: ({ dispatch, payload, appState }) => {
    dispatch(Actions.video.fetchVideo());
    onToast('Update Title', payload);
  },
};

import {createAction} from '../../core/AppUtils';
import {AdminVideoRepository} from '../../core/repository';

export const ModuleEvents = {
  FETCH_ALL_VIDEO: 'FETCH_ALL_VIDEO',
  UPLOAD_VIDEO: 'UPLOAD_VIDEO',
  DELETE_VIDEO:'DELETE_VIDEO',
  UPDATE_TITLE:'UPDATE_TITLE',
};

export default {
  fetchVideo: createAction(ModuleEvents.FETCH_ALL_VIDEO, async (params) => {
    const data = await AdminVideoRepository.fetchVideo(params);
    return {...data, params}
  }),
  uploadVideo: createAction(ModuleEvents.UPLOAD_VIDEO, async (params) => {
   return await AdminVideoRepository.adminVideoUpload(params);
  },{loading: true, errorMessage: 'Error occured while video uploading. Please try again.' }),

  deleteAdminVideo:createAction(ModuleEvents.DELETE_VIDEO, async (params) => {
    const data = await AdminVideoRepository.deleteAdminVideo(params);
    return {...data}
  }),
  networkError: createAction(ModuleEvents.NETWORK_ERROR, error => error),
  loadingStarted: createAction(ModuleEvents.LOADING_STARTED, action => action),
  loadingFinished: createAction(ModuleEvents.LOADING_FINISHED, action => action),

  updateVideoTitle:createAction(ModuleEvents.UPDATE_TITLE, async (params) => {
    const data = await AdminVideoRepository.updateAdminVideoTitle(params);
    return {...data}
  }),
};

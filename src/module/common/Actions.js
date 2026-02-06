import { createAction } from '../../core/AppUtils';
import { CommonRepository } from '../../core/repository';

export const ModuleEvents = {
  LOADING_STARTED: 'LOADING_STARTED',
  LOADING_FINISHED: 'LOADING_FINISHED',
  NETWORK_ERROR:'NETWORK_ERROR',
  GET_ACTIVE_FLAG:'GET_ACTIVE_FLAG',
  RESET_DEVICE_ID:'RESET_DEVICE_ID',
  GET_APP_VERSION:'GET_APP_VERSION'
};

export default {
  networkError: createAction(ModuleEvents.NETWORK_ERROR, error => error),
  loadingStarted: createAction(ModuleEvents.LOADING_STARTED, action => action),
  loadingFinished: createAction(ModuleEvents.LOADING_FINISHED, action => action),
  getActiveFlag: createAction(ModuleEvents.GET_ACTIVE_FLAG, async() => {
    return await CommonRepository.getCurrencyShowHideData()
  }),
  resetDeviceId: createAction(ModuleEvents.RESET_DEVICE_ID, async({email})=>{
      return await CommonRepository.onResetUserDeviceId(email);
  }),

  getAppVersion: createAction(ModuleEvents.GET_APP_VERSION, async({})=>{
    return await CommonRepository.getVersionNumber();
}),
};




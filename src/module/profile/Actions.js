import { createAction } from '../../core/AppUtils';
import { UserRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_USER_DATA: 'GET_USER_DATA',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  UPDATE_PROFILE: "UPDATE_PROFILE"
};

export default {
  getUserData: createAction(ModuleEvents.GET_USER_DATA, async () => {
    return await UserRepository.getUserDetail();
  }),
  changePassword: createAction(ModuleEvents.CHANGE_PASSWORD, async(params) => {
    return await UserRepository.changePassword(params);
  }),
  
  onProfileUpdate: createAction(ModuleEvents.UPDATE_PROFILE, async (params) => {
     return await UserRepository.updateUser(params);
  })
};

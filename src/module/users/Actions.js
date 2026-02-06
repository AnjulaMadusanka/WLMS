// import { async } from 'q';
import { createAction } from '../../core/AppUtils';
import { AdminUsersRepository, CommonRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_ADMIN_USER_LIST: 'GET_ADMIN_USER_LIST',
  CREATE_ADMIN_USER: 'CREATE_ADMIN_USER',
  UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
  UPDATE_USER_DETAILS: 'UPDATE_USER_DETAILS',
  DELETE_USER: 'DELETE_USER',
  UPDATE_USER: 'UPDATE_USER',

};

export default {
  getAdminUserInfo: createAction(ModuleEvents.GET_ADMIN_USER_LIST, async (params) => {
    const data = await AdminUsersRepository.getAdminUsersList(params);
    return { ...data, params }
  }),

  updateUserStatus: createAction(ModuleEvents.UPDATE_USER_STATUS, async (params) => {
    const data = await AdminUsersRepository.updateAdminUserStatus(params);
    return { ...data, params }
  }),

  updateUserDetails: createAction(ModuleEvents.UPDATE_USER_DETAILS, async (params) => {
    const data = await CommonRepository.updateAdminUserDetails(params);
    return { ...data, params }
  }),

  createAdminUser: createAction(ModuleEvents.CREATE_ADMIN_USER, async (params) => {
    const data = await AdminUsersRepository.createAdminUser(params);
    return { ...data, params }
  }),

  deleteAdminUser: createAction(ModuleEvents.DELETE_USER, async (params) => {
    const data = await AdminUsersRepository.deleteAdminUser(params);
    return { ...data, params }
  }),

  updateUser: createAction(ModuleEvents.UPDATE_USER, async (params) => {
    const data = await CommonRepository.updateAdminUserDetails(params);
    return { ...data, params }
  }),
};

import {createAction} from '../../core/AppUtils';
import {AdminAnnouncementRepository, CommonRepository} from '../../core/repository';

export const ModuleEvents = {
  POST_ANNOUNCEMENT:'POST_ANNOUNCEMENT',
  GET_STUDENT_ANNOUNCEMENT: 'GET_STUDENT_ANNOUNCEMENT',
  GET_ALL_ADMIN_ANNOUNCEMENT: 'GET_ALL_ADMIN_ANNOUNCEMENT',
  GET_ADMIN_ANNOUNCEMENT: 'GET_ADMIN_ANNOUNCEMENT',
  DELETE_ADMIN_ANNOUNCEMENT: 'DELETE_ADMIN_ANNOUNCEMENT',
  UPDATE_ADMIN_ANNOUNCEMENT: 'UPDATE_ADMIN_ANNOUNCEMENT',


};

export default {
  postAnnouncement: createAction(ModuleEvents.POST_ANNOUNCEMENT, async (params) => {
    return await AdminAnnouncementRepository.adminPostAnnouncement(params);
  }),

  getAnnouncementForStudent: createAction(ModuleEvents.GET_STUDENT_ANNOUNCEMENT, async () => {
    return await CommonRepository.onGetAnnouncement();
  }),

  getAllAnnouncementForAdmin: createAction(ModuleEvents.GET_ALL_ADMIN_ANNOUNCEMENT, async () => {
    return await AdminAnnouncementRepository.adminGetAnnouncementList();
  }),

  getAnnouncementForAdmin: createAction(ModuleEvents.GET_ADMIN_ANNOUNCEMENT, async (params) => {
    return await AdminAnnouncementRepository.adminGetAnnouncement(params);
  }),

  deleteAnnouncementForAdmin: createAction(ModuleEvents.DELETE_ADMIN_ANNOUNCEMENT, async (params) => {
    return await AdminAnnouncementRepository.adminDeleteAnnouncement(params);
  }),

  updateAnnouncementForAdmin: createAction(ModuleEvents.UPDATE_ADMIN_ANNOUNCEMENT, async (params, announcementId) => {
    const data =  await AdminAnnouncementRepository.adminUpdateAnnouncement(params);
    return {...data, announcementId}
  }),

};

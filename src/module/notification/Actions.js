import {createAction} from '../../core/AppUtils';
import {AdminAnnouncementRepository, CommonRepository} from '../../core/repository';

export const ModuleEvents = {
  POST_ANNOUNCEMENT:'POST_ANNOUNCEMENT',
  GET_STUDENT_ANNOUNCEMENT: 'GET_STUDENT_ANNOUNCEMENT',
  GET_ALL_ADMIN_ANNOUNCEMENT: 'GET_ALL_ADMIN_ANNOUNCEMENT',
  GET_ADMIN_ANNOUNCEMENT: 'GET_ADMIN_ANNOUNCEMENT',
  DELETE_ADMIN_ANNOUNCEMENT: 'DELETE_ADMIN_ANNOUNCEMENT',
  UPDATE_ADMIN_ANNOUNCEMENT: 'UPDATE_ADMIN_ANNOUNCEMENT',
  GET_NOTIFICATIONS:"GET_NOTIFICATIONS",
  READ_NOTIFICATION:"READ_NOTIFICATION",
  GET_ADMIN_NOTIFIACTION:'GET_ADMIN_NOTIFIACTION',
  CREATE_EDIT_ADMIN_NOTIFYCATION:'CREATE_EDIT_ADMIN_NOTIFYCATION'


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

  getNotifications:createAction(ModuleEvents.GET_NOTIFICATIONS, async (params) => {
    return await CommonRepository.getNotifications(params);
  }),

  readNotification:createAction(ModuleEvents.READ_NOTIFICATION, async (params) => {
    return await CommonRepository.readNotification(params);
  }),

  getAdminNotification:createAction(ModuleEvents.GET_ADMIN_NOTIFIACTION, async (params) => {
    return await CommonRepository.getAdminNotification(params);
  }),

  createAdminNotification:createAction(ModuleEvents.CREATE_EDIT_ADMIN_NOTIFYCATION, async (params) => {
    return await CommonRepository.createAdminNotification(params);
  }),



};

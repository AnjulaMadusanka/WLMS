import { createAction } from '../../core/AppUtils';
import { ForumRepository, AdminForumRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_FORUM_LIST: "GET_FORUM_LIST",
  CREATE_FORUM: "CREATE_FORUM",
  GET_FORUM_BY_ID: "GET_FORUM_BY_ID",
  SEND_THREAD_MESSAGE: "SEND_THREAD_MESSAGE",
  GET_ADMIN_FORUM_BY_ID: 'GET_ADMIN_FORUM_BY_ID',
  GET_FORUM_PARTICIPENTS: 'GET_FORUM_PARTICIPENTS',
  UPDATE_FORUM_NAME: 'UPDATE_FORUM_NAME',
  UPDATE_FORUM_STATUS: 'UPDATE_FORUM_STATUS',
  DELETE_FORUM: 'DELETE_FORUM',
  DELETE_FORUM_REPLY: 'DELETE_FORUM_REPLY',
  GET_FORUM_WITH_THREADS: 'GET_FORUM_WITH_THREADS',
  JOIN_FORUM: 'JOIN_FORUM',
  DELETE_FORUM_PARTICIPENTS: 'DELETE_FORUM_PARTICIPENTS',
  DELETE_FORUM_REPLY_STUDENT:'DELETE_FORUM_REPLY_STUDENT',
  CREATE_ADMIN_FORUM:'CREATE_ADMIN_FORUM'
};

export default {
  // for getting all forum list
  getForumList: createAction(ModuleEvents.GET_FORUM_LIST, async (params) => {
    return await ForumRepository.getAllForumList(params);
  }),

  createForum: createAction(ModuleEvents.CREATE_FORUM, async (param) => {
    return await ForumRepository.onCreateForum(param);
  }),

  // for getting threads messages by passing 
  getForumById: createAction(ModuleEvents.GET_FORUM_BY_ID, async (param) => {
    return await ForumRepository.getForumById(param);
  }),

  sendThreadMessage: createAction(ModuleEvents.SEND_THREAD_MESSAGE, async (param) => {
    return await ForumRepository.onSendThreadMessage(param);
  }),

  getAdminForumById: createAction(ModuleEvents.GET_ADMIN_FORUM_BY_ID, async (params) => {
    return await AdminForumRepository.getAdminForumsById(params);
  }),

  getAdminForumParticipents: createAction(ModuleEvents.GET_FORUM_PARTICIPENTS, async (params) => {
    return await AdminForumRepository.getAdminForumsParticipants(params);
  }),

  updateAdminForumName: createAction(ModuleEvents.UPDATE_FORUM_NAME, async (params) => {
    return await AdminForumRepository.updateForumName(params);
  }),

  updateAdminForumStatus: createAction(ModuleEvents.UPDATE_FORUM_STATUS, async (params) => {
    return await AdminForumRepository.updateForumStatus(params);
  }),

  deleteAdminForum: createAction(ModuleEvents.DELETE_FORUM, async (params) => {
    return  await AdminForumRepository.deleteForum(params);
    
  }),

  deleteAdminForumReply: createAction(ModuleEvents.DELETE_FORUM_REPLY, async (params, forumId) => {
    const data = await AdminForumRepository.deleteForumReply(params);  
    return {...data, forumId}
  }),

  getAdminForumWithThreads: createAction(ModuleEvents.GET_FORUM_WITH_THREADS, async (params) => {
    return await AdminForumRepository.getAdminForumWithThreads(params);
  }),

  joinForum: createAction(ModuleEvents.JOIN_FORUM, async (params) => {
    return await ForumRepository.onJoinForum(params);
  }),

  deleteAdminForumParticipent: createAction(ModuleEvents.DELETE_FORUM_PARTICIPENTS, async (params) => {
    return  await AdminForumRepository.deleteAdminForumParticipent(params);
    
  }),

  deleteStudentForumReply: createAction(ModuleEvents.DELETE_FORUM_REPLY_STUDENT, async (replyId, forumId) => {
    const data =  await ForumRepository.deleteForumReply(replyId);
    return {...data, forumId}
  }),

  createAdminForum: createAction(ModuleEvents.CREATE_ADMIN_FORUM, async (param) => {
    console.log(param,'paraaaammsssssddfdfdfsdf')
    return await AdminForumRepository.createAdminForum(param);
  }),

};









import { createAction } from '../../core/AppUtils';
import { AdminNewsletterRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_NEWSLETTER_CONTENTLIST: "GET_NEWSLETTER_CONTENTLIST",
  GET_NEWSLETTER_HISTORY: "GET_NEWSLETTER_HISTORY",
  CREATE_NEWSLETTER_CONTENT: "CREATE_NEWSLETTER_CONTENT",
  CREATE_NEWSLETTER: "CREATE_NEWSLETTER",
  NEWSLETTER_SHOWCONTENT:"NEWSLETTER_SHOWCONTENT",
  UPDATE_NEWSLETTER_CONTENT: 'UPDATE_NEWSLETTER_CONTENT',
  UPDATE_NEWSLETTER: 'UPDATE_NEWSLETTER',
  UPDATE_NEWSLETTER_STATUS: 'UPDATE_NEWSLETTER_STATUS',
  DELETE_NEWSLETTER_CONTENT: 'DELETE_NEWSLETTER_CONTENT',
  DELETE_NEWSLETTER: 'DELETE_NEWSLETTER',
};

export default {
  // for getting all Newsletter list
  getNewsletterContentList: createAction(ModuleEvents.GET_NEWSLETTER_CONTENTLIST, async (params) => {
    return await AdminNewsletterRepository.getNewsletterContentList(params);
  }),

  getNewsletterHistory: createAction(ModuleEvents.GET_NEWSLETTER_HISTORY, async (params) => {
    return await AdminNewsletterRepository.getNewsletterHistory(params);
  }),

  createNewsletterContent: createAction(ModuleEvents.CREATE_NEWSLETTER_CONTENT, async (param) => {
    return await AdminNewsletterRepository.createNewsletterContent(param);
  }),

  createNewsletter: createAction(ModuleEvents.CREATE_NEWSLETTER, async (param) => {
    console.log(param,'createeee parammsssss')
    return await AdminNewsletterRepository.createNewsletter(param);
  }),

  showNewsletterContent: createAction(ModuleEvents.NEWSLETTER_SHOWCONTENT, async (param) => {
    return await AdminNewsletterRepository.showNewsletterContent(param);
  }),

  updateNewsletterStatus:createAction(ModuleEvents.UPDATE_NEWSLETTER_STATUS, async (param) => {
    console.log(param,'newsle teeeeee paramssssss')
    return await AdminNewsletterRepository.updateNewsletterStatus(param);
  }),
  
  updateNewsletterContent:createAction(ModuleEvents.UPDATE_NEWSLETTER_CONTENT, async (param) => {
    return await AdminNewsletterRepository.updateNewsletterContent(param);
  }),

  updateNewsletter:createAction(ModuleEvents.UPDATE_NEWSLETTER, async (param) => {
    return await AdminNewsletterRepository.updateNewsletter(param);
  }),

  deleteNewsletterContent:createAction(ModuleEvents.DELETE_NEWSLETTER_CONTENT, async (param) => {
    return await AdminNewsletterRepository.deleteNewsletterContent(param);
  }),

  deleteNewsletter:createAction(ModuleEvents.DELETE_NEWSLETTER, async (param) => {
    return await AdminNewsletterRepository.deleteNewsletter(param);
  }),


  

};









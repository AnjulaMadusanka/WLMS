import { createAction } from '../../core/AppUtils';
import {  DocumentRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_DOCUMENTLIST: "GET_DOCUMENTLIST",
  ADD_DOCUMENT:"ADD_DOCUMET",
  DELETE_DOCUMENT:"DELETE_DOCUMENT",
  DOCUMENT_STATUS_UPDATE:"DOCUMENT_STATUS_UPDATE"

};

export default {
  // for getting documents by course
  getDocumentList: createAction(ModuleEvents.GET_DOCUMENTLIST, async (params) => {
    return await DocumentRepository.getDocumentList(params);
  }),

  addDocument: createAction(ModuleEvents.ADD_DOCUMENT, async (params) => {
    console.log(params,'documet paramsss')
    return await DocumentRepository.addDocument(params);
  }),

  deleteDocument: createAction(ModuleEvents.DELETE_DOCUMENT, async (params) => {
    return await DocumentRepository.deleteDocument(params);
  }),

  updateDocumentStatus:createAction(ModuleEvents.DOCUMENT_STATUS_UPDATE, async (params) => {
    return await DocumentRepository.updateDocumentStatus(params);
  }),




};









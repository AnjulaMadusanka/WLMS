import { add } from 'lodash';
import { createAction } from '../../core/AppUtils';
import {  QuizeRepository, WebinarRepository} from '../../core/repository';



export const ModuleEvents = {
  GET_WEBINAR_LIST: "GET_WEBINAR_LIST",
  GET_CATEGORY_LIST:"GET_CATEGORY_LIST",
  ADD_CATEGORY:"ADD_CATEGORY",
  GET_SUBJECT_LIST:"GET_SUBJECT_LIST",
  ADD_SUBJECT:"ADD_SUBJECT",
  EDIT_CATEGORY:"EDIT_CATEGORY",
  DELETE_CATEGORY:"DELETE_CATEGORY",
  EDIT_SUBJECT:"EDIT_SUBJECT",
  ADD_QUESTION:"ADD_QUESTION",
  GET_QUESTIONS:"GET_QUESTIONS",
  DELETE_SUBJECT:"DELETE_SUBJECT",
  EDIT_QUESTION:"EDIT_QUESTION",
  DELETE_QUESTION:"DELETE_QUESTION",

};

export default {
  getWebinar:createAction(ModuleEvents.GET_WEBINAR_LIST, async (params) => {
    return await WebinarRepository.getWebinar(params)
  }),
  getCategoryList:createAction(ModuleEvents.GET_CATEGORY_LIST, async () => {
    return await QuizeRepository.getCategoryList()
  }),
  addCategory:createAction(ModuleEvents.ADD_CATEGORY, async (params) => {
    return await QuizeRepository.addCategory(params)
  }),
  getSubjectList:createAction(ModuleEvents.GET_SUBJECT_LIST, async () => {
    return await QuizeRepository.getSubjectList()
  }),
  addSubject:createAction(ModuleEvents.ADD_SUBJECT, async (params) => {
    return await QuizeRepository.addSubject(params)
  }),
  editCategory:createAction(ModuleEvents.EDIT_CATEGORY, async (params) => {
    return await QuizeRepository.editCategory(params)
  }),
  deleteCategory:createAction(ModuleEvents.DELETE_CATEGORY, async (params) => {
    return await QuizeRepository.deleteCategory(params)
  }),
  editSubject:createAction(ModuleEvents.EDIT_SUBJECT, async (params) => {
    return await QuizeRepository.editSubject(params)
  }),
  deleteSubject:createAction(ModuleEvents.DELETE_SUBJECT, async (params) => {
    return await QuizeRepository.deleteSubject(params)
  }),
  addQuestion:createAction(ModuleEvents.ADD_QUESTION, async (params,quizId) => {
    const data = await QuizeRepository.addQuestion(params,quizId);
    return { ...data,quizId } 
  }),
  getQuestions:createAction(ModuleEvents.GET_QUESTIONS, async (params) => {
    return await QuizeRepository.getQuestions(params)
  }),
  editQuestion:createAction(ModuleEvents.EDIT_QUESTION, async (params) => {
    return await QuizeRepository.editQuestion(params)
  }),
  deleteQuestion:createAction(ModuleEvents.DELETE_QUESTION, async (params) => {
    return await QuizeRepository.deleteQuestion(params)
  }),



};
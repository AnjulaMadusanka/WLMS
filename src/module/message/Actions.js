import { createAction } from '../../core/AppUtils';
import { CommonRepository, MessageRepository } from '../../core/repository';

export const ModuleEvents = {
  GET_ALL_CHAT_ROOMS: 'GET_ALL_CHAT_ROOMS',
  GET_CHAT_ROOM: 'GET_CHAT_ROOM',
  SEND_MESSAGE: 'SEND_MESSAGE',
  DELETE_MESSAGE:"DELETE_MESSAGE"
};

export default {
  // to admin get all chat rooms
  getAllMessages: createAction(ModuleEvents.GET_ALL_CHAT_ROOMS, async () => {
    return await MessageRepository.getAllChatList();
  }),

  // common for both user type to get chatRoomData
  getChatRoomData: createAction(ModuleEvents.GET_CHAT_ROOM, async (userId) => {
    return await MessageRepository.getChatRoomByUserId(userId);
  }),
  // send message
  sendMessage: createAction(ModuleEvents.SEND_MESSAGE, async (params) => {
    return await MessageRepository.onCreateMessage(params);
  }),

  // delete Message
  deleteMessage: createAction(ModuleEvents.DELETE_MESSAGE, async (messageId, userId) => {
    const data = await CommonRepository.deleteMessage(messageId);
    return { ...data, userId}
    
  }),
 
};

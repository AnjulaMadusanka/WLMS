import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
  messageList: [],
  messageRoomList: [],
  recipent:{}
});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ModuleEvents.GET_ALL_CHAT_ROOMS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', []);
        return state.set('messageRoomList', data);
      }
      return state
    }

    case ModuleEvents.GET_CHAT_ROOM: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const chat = _.get(payload, 'data.chat', []);
        const user = _.get(payload, 'data.user', {});
        return state.set('messageList', chat).set('recipent',user);
      }
      return state
    }
  }


  return state;
};

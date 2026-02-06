import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
 fetchForumsWithThreadsList:[],
 fetchForumById:{},
 fetchForumParticipentsList:[],
 editForumName:{},
 editForumStatus:{},
 removeForum:{},
 removeForumReply:{},
 getForumsList:[],
// todo keep this space
  forumList: [],
  selectedForum: {},
  selectedForumReplyList:[],
  selectedForum:{}

});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {
    
    case ModuleEvents.GET_FORUM_WITH_THREADS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('fetchForumsWithThreadsList', data);
      }
      return state
    }


    case ModuleEvents.GET_ADMIN_FORUM_BY_ID: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('fetchForumById', data);
      }
      return state
    }

    case ModuleEvents.GET_FORUM_PARTICIPENTS: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('fetchForumParticipentsList', data);
      }
      return state
    }


    // case ModuleEvents.UPDATE_FORUM_NAME: {
    //   if (payload && !payload.error && payload.status && payload.status_code == 1) {
    //     const data = _.get(payload, 'data', {});
    //     return state.set('editForumName', data);
    //   }
    //   return state
    // }

    // case ModuleEvents.UPDATE_FORUM_STATUS: {
    //   if (payload && !payload.error && payload.status && payload.status_code == 1) {
    //     const data = _.get(payload, 'data', {});
    //     return state.set('editForumStatus', data);
    //   }
    //   return state
    // }

    // case ModuleEvents.DELETE_FORUM: {
    //   if (payload && !payload.error && payload.status && payload.status_code == 1) {
    //     const data = _.get(payload, 'data', {});
    //     return state.set('removeForum', data);
    //   }
    //   return state
    // }

    // case ModuleEvents.DELETE_FORUM_REPLY: {
    //   if (payload && !payload.error && payload.status && payload.status_code == 1) {
    //     const data = _.get(payload, 'data', {});
    //     return state.set('removeForumReply', data);
    //   }
    //   return state
    // }

    case ModuleEvents.GET_FORUM_LIST: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('forumList', _.get(payload, 'data', []));
      }
      return state;
    }
    case ModuleEvents.GET_FORUM_BY_ID: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('selectedForum', _.get(payload, 'data[0]', {})).set('selectedForumReplyList',_.get(payload,'data[0].forum_replies',[]));
      }
      return state;
    }
  }
  return state;
};

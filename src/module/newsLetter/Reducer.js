import { Map } from 'immutable';
import _ from 'lodash';
import { ModuleEvents } from './Actions';
//import { ModuleEvents as SigninEvent } from "../signin/Actions";

const InitialState = Map({
 fetchForumsWithThreadsList:[],
 fetchForumById:{},
 fetchForumParticipentsList:[],
 updateContent:{},
 editForumStatus:{},
 removeNewsletter:{},
 removeForumReply:{},
 getForumsList:[],
// todo keep this space
  newsletterList: [],
  selectedForum: {},
  showNewsLetter:[],
  selectedForumReplyList:[],
  selectedForum:{},
  newsLetterHistory:[]

});



export const Reducer = (state = InitialState, action) => {
  const { payload, type } = action;
  switch (type) {

   case ModuleEvents.UPDATE_NEWSLETTER_CONTENT: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('updateContent', data);
      }
      return state
    }


    case ModuleEvents.DELETE_NEWSLETTER_CONTENT: {
      if (payload && !payload.error && payload.status && payload.status_code == 1) {
        const data = _.get(payload, 'data', {});
        return state.set('removeNewsletter', data);
      }
      return state
    }
    case ModuleEvents.GET_NEWSLETTER_CONTENTLIST: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('newsletterList', _.get(payload, 'data', []));
      }
      return state;
    }

    case ModuleEvents.NEWSLETTER_SHOWCONTENT: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('showNewsLetter', _.get(payload, 'data', []));
      }
      return state;
    }

    case ModuleEvents.GET_NEWSLETTER_HISTORY: {
      if (payload && !payload.error && payload.status_code && payload.status_code == 1) {
        return state.set('newsLetterHistory', _.get(payload, 'data', []));
      }
      return state;
    }
  }
  return state;
};

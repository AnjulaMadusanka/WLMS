// import _ from 'lodash'
// import {AllHandlers} from '../modules/Handlers';
// import { NetworkError } from '../models/index';
// import {appHistory} from '../modules/StoreCreator';

// /**
//  * bind the handlers
//  */
// export const actionMiddleware = args => {
//   return ({dispatch, getState}) => next => action => {
//     const handlers = AllHandlers[action.type];
  
//     const {payload: data, error, type} = action;

//     if (error) {
//       if (data instanceof NetworkError) {
//         //dispatch(Actions.common.networkError(action));
//       } else {
//         if (error.code) {
//           // logger.error(`Unhandled probable network error in ${type} : ${JSON.stringify(error)} `)
//         } else {
//           // logger.warn(`Unhandled error in ${type} : ${JSON.stringify(error)} `)
//         }
//       }
//     }


//     const nextAction = next(action);

//     _.forEach(handlers, handler => {
//       handler({dispatch, payload: action.payload, appState: getState(), error, pathname: appHistory.location.pathname});
//     });

//     return nextAction;
//   };
// };

// export default actionMiddleware;

import _ from 'lodash';
import {AllHandlers} from '../modules/Handlers';
import {Actions} from '../modules/Actions';
import {createLogger} from '../AppUtils';
import { NetworkError } from '../models';

const logger = createLogger('[Action]');

/**
 * bind the handlers
 */
export const actionMiddleware = (args) => {
  return ({dispatch, getState}) => (next) => (action) => {
    const handlers = AllHandlers[action.type];
    const {payload: data, error, type} = action;

    if (error) {
      if (data instanceof NetworkError) {
        dispatch(Actions.common.networkError(action));
      } else {
        if (error.code) {
        } else {
        }
      }
    }

    const nextResult = next(action);

    _.forEach(handlers, (handler) => {
      handler({dispatch, payload: action.payload, appState: getState(), error});
    });

    return nextResult;
    //return next(action);
  };
};

export default actionMiddleware;

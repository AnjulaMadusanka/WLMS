
//import InitApp from './InitApp';
import React from 'react';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { createBrowserHistory, createMemoryHistory} from 'history';
import { syncHistory, routeReducer } from 'redux-simple-router';
import Reducers from '../modules/Reducers';
import actionMiddleware from '../middleware/ActionMiddleware';
import PromiseMiddleware from '../middleware/PromiseMiddleware';
import logger from 'redux-logger';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

const isServer = typeof window === 'undefined' || typeof document === 'undefined';

 const appHistory = isServer ? createMemoryHistory() : createBrowserHistory()
//  createBrowserHistory({
//   forceRefresh: false,      // Set true to force full page refreshes
//   keyLength: 2,             // The length of location.key
// });



const reduxRouterMiddleware = syncHistory(appHistory);
const rootReducer = combineReducers(
  {
    ...Reducers,
  });

const routeMiddleware = routerMiddleware(appHistory)

let enhancer = compose(
  applyMiddleware(
    PromiseMiddleware,
    logger,
    actionMiddleware(),
    //reduxRouterMiddleware,
    routeMiddleware,
  ));

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code

} else {
  // production code
  enhancer = compose(
    applyMiddleware(
      PromiseMiddleware,
      actionMiddleware(),
      //reduxRouterMiddleware,
      routeMiddleware,
    ));
  
}

const store = createStore(rootReducer, {}, enhancer);

//InitApp(store);

export { appHistory, store };
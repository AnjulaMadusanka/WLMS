import React from 'react';
import _ from 'lodash';

const syncer = store => async next => async action => {
  //await action.payload();
  await next(action)
}
import React from 'react';
import _ from 'lodash';
import { ModuleSet } from './ModuleSet';

export const Handlers = _(ModuleSet)
  .keyBy(module => module)
  .mapValues((module) => {
    try {
      // eslint-disable-next-line global-require
      const moduleHandler = require('../../module/' + module + '/Handler');
      return moduleHandler.default;
    } catch (e) {
       console.warn(e);
      return { default: {} };
    }
  })
  .value();

export const AllHandlers = _(Handlers)
  .transform((result, handler) => {
    _.mapKeys(handler, (fn, key) => {
      if (key === 'default') {
        return;
      }
      result[key] = result[key] ? _.concat(result[key], fn) : [fn];
    })
    return result;
  }, {}).value();

export default Handlers;

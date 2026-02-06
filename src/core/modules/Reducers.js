import React from 'react';
import _ from 'lodash';
import { ModuleSet } from './ModuleSet';

const Reducers = _(ModuleSet)
  .keyBy(module => module)
  .mapValues(module => {
    return require(`../../module/${module}/Reducer`);
  })
  .mapValues(module => module.Reducer)
  .value();

export default Reducers;
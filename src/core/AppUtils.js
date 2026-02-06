import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const isServer = typeof window === 'undefined' || typeof document === 'undefined';

const createAction = (type, action, meta) => {
  return (...args) => ({ type, payload: action.apply(null, args), meta })
};

const Logger = (module, file) => ({
  log: (...args) => {},
  warn: (...args) => {},
  error: (...args) => {},
});

const createLogger = (module = 'default', level = 'debug') => ({
  log: (...args) => {
    // getLogger.log([`${module}`, ...args].join(' '));
  },
  info: (...args) => {
    // getLogger.info([`${module}`, ...args].join(' '));
  },
  warn: (...args) => {
    // getLogger.warn([`${module}`, ...args].join(' '));
  },
  error: (...args) => {
    // getLogger.error([`${module}`, ...args].join(' '));
  },
});


export {
  _,
  createAction,
  isServer,
  connect,
  React,
  ReactDOM,
  Logger,
  createLogger
};
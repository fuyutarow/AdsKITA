// import createPersistedState from 'use-persisted-state';
import { isDevelopment } from 'plugins/env';

export const debug = isDevelopment
  ? console.log
  : (...data: Array<any>) => { };

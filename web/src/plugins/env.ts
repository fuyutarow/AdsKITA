import { version as v } from '../../package.json';

export const version = v;
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isStaging = window.location.hostname === 'adskita-alpha.now.sh';

export const notifyAutoClose = 2000;


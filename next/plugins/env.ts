import { version as v } from '../package.json';

export const version = v;
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isStaging = false
// export const isStaging = [
//   'adskita-alpha.now.sh',
//   'adskita-db70b.web.app',
//   'adskita-db70b.firebaseapp.com',
// ].includes(window.location.hostname);

export const notifyAutoClose = 2000;


import * as functions from 'firebase-functions';
import * as request from 'request';

const message = `
Dear my friend
Hello, world!
from cloud functions
`;

const noticeWithWebhook = (data: any) => {
  request.post({
    uri: 'https://discordapp.com/api/webhooks/719532446021845024/ObUTUpsgwONAU_hulbolVSZQjtjj88yC5OI7nfZKJjUHkUFPos9TTc4d40XLGTRo_loH/slack',
    headers: { 'Content-type': 'application/json' },
    json: { 'text': message },
    ...data,
  });
};

export const notice = functions.https.onCall((data, context) => {
  noticeWithWebhook(data);
  return { data: 'Ok' };
});

export * as domainMonitor from './domainMonitor';
export { stripe } from './stripe';

import * as functions from 'firebase-functions';
const request = require('request');
import Stripe from 'stripe';
import { stripe } from './plugins/stripe';

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

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

export const accountsRetrieve = functions.https.onCall(async (data, context) => {
  const args = data as {
    id: string,
    params?: Stripe.AccountRetrieveParams | undefined,
    options?: Stripe.RequestOptions | undefined
  };
  return await stripe.accounts.retrieve(args.id, args.params, args.options);
});

const functions = require('firebase-functions');
const request = require('request');
const stripe = require('stripe')('sk_test_51GubZYKt5tBkaxlgquO4GyiD0pV9D2hOkJHwI9qLQlK67mutow7A8sSoLu3pRug7pcveRFp2Vl7lLF4JzZ1sSJch006uTzY6yx');

const notice = (message) => {
  const data = {
    uri: 'https://discordapp.com/api/webhooks/719532446021845024/ObUTUpsgwONAU_hulbolVSZQjtjj88yC5OI7nfZKJjUHkUFPos9TTc4d40XLGTRo_loH/slack',
    headers: { 'Content-type': 'application/json' },
    json: { 'text': message },
  };
  request.post(data);
};

exports.noticeme = functions.https.onCall((data, context) => {
  notice(data.message);
  return { data: 'Ok' };
});

exports.giveme = functions.https.onCall(async (data, context) => {
  if (data.message) {
    notice(data.message);
  }

  const result = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: 'jpy',
    description: 'ゲームチケット',
    metadata: { username: data.username, tranId: '11111' },
  });

  return { data: result };
});

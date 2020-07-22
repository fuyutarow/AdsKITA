import Stripe from 'stripe';

export const config = {
  ca: 'ca_HfaNc9U8GWsiXv6FPEGfb4SRsgjaHYyE',
  publicKey: 'pk_test_51H6EpFL2CNVURAeAMUWXtJwqjTK9EX42CNyp4AkniQSV76XUpYLhQ4J0PMjTJSDmv8JoEPwI9mu156yFUqQ0HgMH00pVHcAF6g',
  secretKey: 'sk_test_51H6EpFL2CNVURAeAwVdwQq66zEQZ3YWpscxDtIVcLzNCfRpJPwIGh3xgMRXWDP6tCjQj5PjnkDRbQr06FHPKSpIC007MpVo92T',
};

// export const stripe: Stripe = require('stripe')(
export const stripe = new Stripe(
  config.secretKey,
  {
    apiVersion: '2020-03-02',
  },
);


(async () => {
  const acc = await stripe.accounts.retrieve(
    'acct_1H6EpFL2CNVURAeA',
  );
  console.log(acc);
})();

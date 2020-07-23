import Stripe from 'stripe';
import {
  StripeCardElement,
  StripeError,
  PaymentMethod,
  PaymentIntent,
} from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import React from 'react';

import CardSection from './CardSection';

const CheckoutForm: React.FC<{
  clientSecret: string;
}> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement: StripeCardElement = elements.getElement(CardElement)!;

    const { paymentIntent, error }: {
      paymentIntent?: PaymentIntent | undefined;
      error?: StripeError | undefined;
    } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(error.message);
    } else if (paymentIntent) {
      // The payment has been processed!
      if (paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
};

export default CheckoutForm;

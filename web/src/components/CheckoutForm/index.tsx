import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  StripeCardElement,
  StripeError,
  PaymentMethod,
  PaymentIntent,
} from '@stripe/stripe-js';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
// import {
//   Alert,
// } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';

import CardSection from 'components/CardSection';

import { db, functions } from 'plugins/firebase';
import style from 'style.module.css';
import { Ticket } from 'models';

const giveme = functions.httpsCallable('giveme');

const CheckoutForm: React.FC<{
  ticket: Ticket;
  onPaymentSuccess: any;
  toPaymentSuccess: string;
}> = ({ ticket, onPaymentSuccess, toPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);
  const [stripeError, setStripeError] = useState<StripeError | null>(null);
  const [clickEnable, setClickEnable] = useState(true);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    setStripeError(null);
    setPaymentIntent(null);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement: StripeCardElement = elements.getElement(CardElement)!;

    const res = await giveme({
      amount: ticket.price,
      username: billingDetails.name,
    });
    console.log(res.data.data);
    const clientSecret: string = res.data.data.client_secret;

    const { paymentIntent, error }: {
      // paymentIntent: PaymentIntent | null;
      // error: StripeError | null;
      paymentIntent?: PaymentIntent;
      error?: StripeError;
    } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      },
    );

    if (error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(error.message);
      setStripeError(error);
    } else if (paymentIntent) {
      // The payment has been processed!
      if (paymentIntent.status === 'succeeded') {
        setPaymentIntent(paymentIntent);
        console.log(paymentIntent);
        db.collection('paymentIntents').doc(paymentIntent.id).set(paymentIntent);
        onPaymentSuccess();
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} >
          <TextField
            error={billingDetails.name === ''}
            id="filled-error"
            label="FULL NAME"
            defaultValue="Hello World"
            variant="filled"
            value={billingDetails.name}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} >
          <p>
            <CardSection />
          </p>
        </Grid>
        <Grid item xs={12} >
          {
            paymentIntent
              ? null
              : (
                <Button
                  type="submit"
                  disabled={!stripe}
                  variant="contained"
                  color="secondary"
                  onClick={e => {
                    setClickEnable(false);
                  }}
                >
                  購入
                </Button>
              )
          }
          {
            stripeError
              ? (
                <Alert severity="error">{stripeError.message}</Alert>
              )
              : null
          }
          {
            paymentIntent
              ? (
                <>
                  <Alert severity="success">決済が完了しました</Alert>
                  <Link to={toPaymentSuccess} >
                    <Button
                      variant="contained"
                    >チケット情報をみる
                    </Button>
                  </Link>
                </>
              )
              : null
          }
        </Grid>
      </form>
    </Grid>
  );
};

export default CheckoutForm;

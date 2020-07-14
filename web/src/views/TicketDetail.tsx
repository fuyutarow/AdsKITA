import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  Typography,
} from '@material-ui/core';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { db, functions } from 'plugins/firebase';
import { Ticket, TicketStatus } from 'models';
import { AuthContext, AuthProvider, AuthContextProps } from 'contexts/auth';
import CheckoutForm from 'components/CheckoutForm';

import { formatNumber } from 'utils';
import AppFooter from 'components/AppFooter';

const apiKey = process.env.REACT_APP_STRIPE_APIKEY as string;
console.log(apiKey);
const stripePromise = loadStripe(apiKey);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
    },
  ],
};

const PleaseLoginButton = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        購入
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ログインして購入しよう
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Link to="/login">
              <Button variant="contained">ログイン</Button>
            </Link>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

const CheckoutButton: React.FC<{ ticket: Ticket; auth: AuthContextProps }> = ({ ticket, auth }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPaymentSuccess = () => {
    if (auth) {
      db.collection('tickets').doc(ticket.id).update({
        status: TicketStatus.soldOut,
        purchasedUser: auth.currentUser,
      });
      db.collection('users').doc(auth.currentUser.id)
        .collection('purchased').doc(ticket.id)
        .set(ticket);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        購入
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          このチケットを購入します
        </DialogTitle>
        <DialogContent>
          <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <CheckoutForm
              ticket={ticket}
              onPaymentSuccess={onPaymentSuccess}
              toPaymentSuccess={`/tickets/${ticket.id}`}
            // toPaymentSuccess={`/u/${auth.currentUser.id}/purchased/${ticket.id}`}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    </>
  );
};

const PurchaseButton: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const auth = useContext(AuthContext);

  return (
    !!auth && auth.currentUser.id !== ticket.providerUser.id
      ? <CheckoutButton ticket={ticket} auth={auth} />
      : auth
        ? (
          <>
            <Button
              disabled
              variant="contained"
              color="secondary"
              onClick={e => {
                alert('購入モーダル');
              }}
            >
              購入
            </Button>
            <div>
              出品者は購入できません
            </div>
          </>
        )
        : <PleaseLoginButton />
  );
};

const TicketView: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const ticketStatusDisplay = (): string | null => {
    if (ticket.status === TicketStatus.onSale) {
      return 'on sale';
    } else if (ticket.status === TicketStatus.soldOut) {
      return 'sold out';
    } else {
      return null;
    }
  };

  const PriceBox = () => <Box>{`${ticket.price} 円`}</Box>;

  // @ts-ignore
  const contentIsShow = (): boolean => {
    if (ticket.status === TicketStatus.soldOut) {
      // @ts-ignore
      const b: boolean = !!auth && (ticket.purchaserUser.id === auth.currentUser.id);
      return b;
    }
  };
  // console.log(ticket.providerUser.id === auth?.currentUser.id);
  // ticket.providerUser.id === auth?.currentUser.id);
  // console.log(ticket.providerUser.id);
  // console.log(auth?.currentUser.id);
  // console.log(contentIsShow);

  return (
    <Card className={classes.root}>
      <CardContent>
        {
          ticket.status === TicketStatus.soldOut
            ? <Chip label="売切れ" />
            : <Chip label="出品中" />
        }
        <Avatar alt="Remy Sharp" src={ticket.providerUser.photoURL || ''} />
        <Typography >
          {ticket.providerUser.displayName}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {ticket.id}
        </Typography>
        <Typography variant="h5" component="h2">
          {ticket.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {formatNumber(ticket.price)} 円
        </Typography>
        <Typography variant="body2" component="p">
          {ticket.description}
        </Typography>
      </CardContent>
      <CardContent>
        {
          contentIsShow
            ? <div>購入おめでとう</div>
            : <PurchaseButton ticket={ticket} />
        }
      </CardContent>
    </Card>
  );
};

export default () => {
  const { ticketId } = useParams();
  const classes = useStyles();
  const [ticket, setTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const listener = db.collection('tickets').doc(ticketId)
      .onSnapshot(doc => {
        const ticket = doc.data() as Ticket;
        setTicket(ticket);
      });
    return () => listener();
  }, [ticketId]);

  return (
    <>
      <Container maxWidth="sm" disableGutters>
        {
          ticket
            ? <TicketView ticket={ticket} />
            : (
              <div>
                <div>{ticketId}</div>
              </div>
            )
        }
      </ Container>
      <AppFooter />
    </>
  );
};

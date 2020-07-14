import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  Fab,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Paper,
  TextField,
} from '@material-ui/core';

import { db } from 'plugins/firebase';
import { Ticket, TicketStatus, NewTicket, UserInfo } from 'models';
import { AuthContext, AuthProvider, AuthContextProps } from 'contexts/auth';
import AppFooter from 'components/AppFooter';

import { v4 as uuid } from 'uuid';

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
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=" 円"
    />
  );
}

export default () => {
  const auth = useContext(AuthContext);

  return auth
    ? (
      <NewTicketEditor auth={auth}/>
    )
    : (
      <div>
      ログインしてチケットを出品しよう
      </div>
    );

};

const NewTicketEditor: React.FC<{ auth: AuthContextProps}> = ({ auth }) => {
  const history = useHistory();
  const currentUser = auth.currentUser;

  const newTicket = (): NewTicket => {
    return {
      id: uuid(),
      providerUser: currentUser,
      title: '',
      description: '',
      status: TicketStatus.onSale,
      price: null,
    };
  };

  const { ticketId } = useParams();
  const classes = useStyles();
  const [ticket, setTicket] = useState<NewTicket>(newTicket());

  const validation = {
    title(): boolean {
      return ticket.title !== '';
    },

    price(): boolean {
      return ticket.price !== null && ticket.price >= 0;
    },

    description(): boolean {
      return ticket.description !== '';
    },

    ticket (): boolean {
      return this.title() && this.price() && this.description();
    },
  };

  return (
    <>
      <Container maxWidth="sm" disableGutters>
        <Paper>
          <Box>
            <div>出品者</div>
            {
              ticket.providerUser
                ? (
                  <Box>
                    <Box>
                      {ticket.providerUser.displayName}
                    </Box>
                    <Avatar alt="Remy Sharp" src={ticket.providerUser.photoURL || ''} />
                  </Box>
                )
                : null
            }
          </Box>
          <Box>
            <TextField
              label="タイトル"
              rows="4"
              value={ticket.title}
              error={!validation.title()}
              onChange={e => {
                setTicket({
                  ...ticket,
                  title: e.target.value,
                });
              }}
            />
          </Box>
          <Box>
            <TextField
              id="price"
              label="価格"
              name="numberformat"
              InputProps={{
                inputComponent: NumberFormatCustom as any,
              }}
              value={ticket.price}
              error={!validation.price()}
              onChange={e => {
                setTicket({
                  ...ticket,
                  price: Number(e.target.value),
                });
              }}
            />
          </Box>
          <Box>
            <TextField
              id="description"
              label="説明"
              multiline
              rows="4"
              value={ticket.description}
              error={ticket.description === ''}
              onChange={e => {
                setTicket({
                  ...ticket,
                  description: e.target.value,
                });
              }}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              disabled={!validation.ticket()}
              onClick={e => {
                const newTicket = ticket as Ticket;
                db.collection('tickets').doc(ticket.id).set(newTicket);
                history.push(`/tickets/${ticket.id}`);
              }}
            >
          出品
            </Button>
          </Box>
        </Paper>
      </Container>
      <AppFooter />
    </>
  );
};

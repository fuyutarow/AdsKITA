import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { firestore } from 'firebase';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Fab,
  Grid,
  Typography,
  Theme,
  ThemeProvider,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { db } from 'plugins/firebase';
import { AuthContext, AuthProvider } from 'contexts/auth';
import TicketCard from 'components/TicketCard';
import AppFooter from 'components/AppFooter';

import { Ticket, TicketStatus } from 'models';

import { v4 as uuid } from 'uuid';

export default () => {
  const authContext = useContext(AuthContext);
  // const history = useHistory();
  const [tickets, setTickets] = useState<Array<Ticket>>([]);

  useEffect(() => {
    const listener = db.collection('tickets')
    // .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const tickets: Array<Ticket> = querySnapshot.docs.map(doc => {
          const ticket = doc.data() as Ticket;
          return ticket;
        });
        setTickets(tickets);
      });
    return () => listener();

  }, []);

  return (
    <>
      <Container maxWidth="sm" disableGutters>
        <Grid container spacing={3}>
          {
            tickets.map(ticket => {
              return (
                <Grid item xs={12} justify="center">
                  <TicketCard
                    ticket={ticket}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </Container>
      <AppFooter to="/tickets/new" fab={{
        color: 'secondary',
        icon: <AddIcon />,
        label: 'Add',
      }}/>
    </>
  );
};

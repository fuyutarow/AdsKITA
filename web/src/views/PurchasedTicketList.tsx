import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { firestore } from 'firebase';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { db } from 'plugins/firebase';
import { AuthContext, AuthProvider } from 'contexts/auth';
import TicketCard from 'components/TicketCard';

import { Ticket, TicketStatus } from 'models';

import { v4 as uuid } from 'uuid';

export default () => {
  const currentUser = useContext(AuthContext)!.currentUser;
  const history = useHistory();
  const [tickets, setTickets] = useState<Array<Ticket>>([]);

  useEffect(() => {
    const listener = db.collection('users').doc(currentUser.id).collection('purchased')
    // .orderBy('createdAt', 'asc')
      .onSnapshot(querySnapshot => {
        const tickets: Array<Ticket> = querySnapshot.docs.map(doc => {
          const ticket = doc.data() as Ticket;
          return ticket;
        });
        setTickets(tickets);
      });
    return () => listener();

  }, [currentUser.id]);

  return (
    <>
      {
        tickets.map(ticket => {
          return (
            <TicketCard
              ticket={ticket}
            />
          );
        })
      }
      <Link to="/tickets/new">
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};

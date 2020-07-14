import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@material-ui/core';

import { Ticket, TicketStatus } from 'models';
import TicketDetail from 'views/TicketDetail';
import NumberFormat from 'react-number-format';
import { formatNumber } from 'utils';

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
  goRight: {
    marginLeft: 'auto',
  },
});

export default ({ ticket }: { ticket: Ticket }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {
          ticket.status === TicketStatus.soldOut
            ? <Chip label="売切れ" />
            : null
        }
        <Typography color="textSecondary" gutterBottom>
          {ticket.id}
        </Typography>
        <Link to={`/tickets/${ticket.id}`}>
          <Typography variant="h5" component="h2">
            {ticket.title}
          </Typography>
        </Link>
        <Typography variant="body2" component="p">
          {ticket.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Avatar alt="Remy Sharp" src={ticket.providerUser.photoURL || ''} />
          <Typography >
            {ticket.providerUser.displayName}
          </Typography>
        </IconButton>
        <div className={classes.goRight}>
          <Typography variant="h6">
            {formatNumber(ticket.price)} 円
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

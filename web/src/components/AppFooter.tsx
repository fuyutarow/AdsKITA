import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import {
  AppBar,
  Button,
  Container,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  ThemeProvider,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
    'no-underline': {
      'text-decoration': 'none',
    },
  }),
);

const AppFooter: React.FC<{
  to?: any;
  fab?: {
    color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
    icon: JSX.Element;
    label: 'Add';
  };
}> = ({ to, fab }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton> */}
        <Link to="/tickets" className={classes['no-underline']}>
          <Button>
            <Typography variant="h6">
              チケット一覧
            </Typography>
          </Button>
        </Link>
        {
          fab
            ? to
              ? (
                <Link to="/tickets/new">
                  <Fab aria-label={fab.label} className={classes.fabButton} color={fab.color}>
                    {fab.icon}
                  </Fab>
                </Link>
              )
              : (
                <Fab aria-label={fab.label} className={classes.fabButton} color={fab.color}>
                  {fab.icon}
                </Fab>
              )
            : null
        }
        {/* <div className={classes.grow} /> */}
        {/* <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton edge="end" color="inherit">
          <MoreIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default AppFooter;

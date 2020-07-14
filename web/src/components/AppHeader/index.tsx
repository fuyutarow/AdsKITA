import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Theme,
  ThemeProvider,
  Typography,
  Avatar,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

import { version } from 'plugins/env';
import { AuthContext, AuthProvider } from 'contexts/auth';
// import style from 'style.module.css';

const useStyles = makeStyles({
  goRight: {
    marginLeft: 'auto',
  },
  logo: {
    height: '40px',
  },
  login: {
    'text-decoration': 'none',
  },
});

const AuthAvator: React.FC = () => {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return auth
    ? (
      <div>
        <div
          onClick={handleMenu}
        >
          {
            auth.currentUser.photoURL
              ? (
                <Avatar
                  src={auth.currentUser.photoURL}
                  onClick={handleMenu}
                />
              )
              : <PersonIcon fontSize="large" />
          }
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => auth.signOut()}>ログアウト</MenuItem>
        </Menu>
      </div>
    )
    : (
      <Link to="/login" className={classes.login}>
        <Button>
          <Typography variant="h6">
            ログイン
          </Typography>
        </Button>
      </Link>
    );
};

export default () => {
  const classes = useStyles();

  return (
    <AppBar
      color="default"
      position="static"
    >
      <Toolbar>
        <Link to="/tickets">
          <img src="/icon.png" className={classes.logo} alt="logo" />
        </Link>
        <span style={{ padding: '0 10px 0 10px' }}>{`v${version}`}</span>
        {/* <Button>
            <Typography variant="h6" >
              チケットを探す
            </Typography>
          </Button> */}
        <div className={classes.goRight}>
          <AuthAvator />
        </div>
      </Toolbar>
    </AppBar >
  );
};

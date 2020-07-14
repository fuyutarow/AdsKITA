import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthProvider } from 'contexts/auth';
import TicketList from 'views/TicketList';
import About from 'views/About';
import NotFound from 'views/NotFound';
import TicketDetail from 'views/TicketDetail';
import NewTicket from 'views/NewTicket';
import PurchasedTicketList from 'views/PurchasedTicketList';
import ProductHeroLayout from 'views/ProductHeroLayout';

import Login from 'components/Login';
import Logout from 'components/Logout';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import {
  Button,
  Container,
  Typography,
  Theme,
  ThemeProvider,
} from '@material-ui/core';

import {
  withStyles,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

import style from './style.module.css';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default () => (
  <div className={style.App} >
    <div className={style['App-header']} >
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Typography color="inherit" align="center" variant="h2" >
             集え，ゲーマー
          </Typography>
          <Typography color="inherit" align="center" variant="h5">
              技をならえ，技をおしえろ
          </Typography>
          <Link to="/tickets">
            <Button
              variant='contained'
            >
              はじめる
            </Button>
          </Link>
        </Container>
      </ThemeProvider>
    </div>
  </div>
);

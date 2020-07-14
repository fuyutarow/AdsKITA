import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthProvider } from 'contexts/auth';
import Home from 'views/Home';
import TicketList from 'views/TicketList';
import SwipeList from 'views/SwipeList';
import About from 'views/About';
import NotFound from 'views/NotFound';
import TicketDetail from 'views/TicketDetail';
import NewTicket from 'views/NewTicket';
import PurchasedTicketList from 'views/PurchasedTicketList';
import ProductHeroLayout from 'views/ProductHeroLayout';
import AppFooter from 'components/AppFooter';
import Lab from 'views/Lab';
import AdView from 'views/AdView';

import LoginView from 'views/LoginView';
import Logout from 'components/Logout';
import AppHeader from 'components/AppHeader';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export const routes = {
  home: {
    exact: true,
    path: '/',
    component: Home,
  },
  ticketNew: {
    path: '/tickets/new',
    component: NewTicket,
  },
  ticketDetail: {
    path: '/tickets/:ticketId',
    component: TicketDetail,
  },
  purchasedTicketList: {
    path: '/u/:userId/purchased',
    component: PurchasedTicketList,
  },
  ticketList: {
    exact: true,
    path: '/tickets',
    component: TicketList,
  },
  login: {
    path: '/login',
    component: LoginView,
  },
  lab: {
    exact: true,
    path: '/lab',
    component: Lab,
  },
  ads: {
    path: '/ads/:id',
    component: AdView,
  },
  about: {
    path: '/about',
    component: About,
  },
  notFound: {
    path: '*',
    component: NotFound,
  },
};

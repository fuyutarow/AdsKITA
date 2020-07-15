import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthProvider } from 'contexts/auth';
import Home from 'views/Home';
import TicketList from 'views/TicketList';
import SwipeList from 'views/SwipeList';
import About from 'views/About';
import NotFound from 'views/NotFound';
import NewFlyer from 'Flyer/new';
import FlyerDetail from 'Flyer/detail';
import PreviewFlyer from 'Flyer/published';
import RequestDetail from 'Request/detail';
import PublishedFlyer from 'Request/published';
import PurchasedTicketList from 'views/PurchasedTicketList';
import ProductHeroLayout from 'views/ProductHeroLayout';
import AppFooter from 'components/AppFooter';
import Lab from 'views/Lab';

import LoginView from 'views/LoginView'; import Logout from 'components/Logout';
import AppHeader from 'components/AppHeader';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

export const routes = {
  home: {
    exact: true,
    path: '/',
    component: Home,
  },
  purchasedTicketList: {
    path: '/u/:userId/purchased',
    component: PurchasedTicketList,
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
  flyerNew: {
    path: '/flyers/new',
    component: NewFlyer,
  },
  flyerList: {
    exact: true,
    path: '/flyers/',
    component: TicketList,
  },
  flyerDetail: {
    path: '/flyers/:flyerId',
    component: FlyerDetail,
  },
  pubs: {
    path: '/pubs/:id',
    component: PublishedFlyer,
  },
  preview: {
    path: '/preview/:id',
    component: PreviewFlyer,
  },
  requestDetail: {
    path: '/requests/:id',
    component: RequestDetail,
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

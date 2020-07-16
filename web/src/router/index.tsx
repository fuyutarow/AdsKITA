import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthProvider } from 'contexts/auth';
import Home from 'views/Home';
import About from 'views/About';
import NotFound from 'views/NotFound';
import NewFlyer from 'Flyer/new';
import FlyerDetail from 'Flyer/detail';
import PreviewFlyer from 'Flyer/published';
import RequestList from 'Request/list';
import RequestDetail from 'Request/detail';
import RequestListWithSpace from 'Request/ListWithSpace';
import RequestDetailWithSpace from 'Request/DetailWithSpace';
import SpaceList from 'Space/List';
import SpacePub from 'Space/Pub';
import PublishedFlyer from 'Request/published';
import AppFooter from 'components/AppFooter';
import Lab from 'views/Lab';
import LabLink from 'views/Lab/link';
import Redirect from 'redirect';

import LoginView from 'views/LoginView'; import Logout from 'components/Logout';
import AppHeader from 'components/AppHeader';

export const routes = {
  home: {
    exact: true,
    path: '/',
    component: Home,
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
  lablink: {
    path: '/lab/link',
    component: LabLink,
  },
  flyerNew: {
    path: '/flyers/new',
    component: NewFlyer,
  },
  // flyerList: {
  //   exact: true,
  //   path: '/flyers/',
  // },
  flyerDetail: {
    path: '/flyers/:flyerId',
    component: FlyerDetail,
  },
  pubs: {
    path: '/pubs/:id',
    component: PublishedFlyer,
  },
  redirect: {
    exact: true,
    path: '/redirect',
    component: Redirect,
  },
  preview: {
    path: '/preview/:id',
    component: PreviewFlyer,
  },
  requestList: {
    exact: true,
    path: '/requests',
    component: RequestList,
  },
  requestDetail: {
    path: '/requests/:id',
    component: RequestDetail,
  },
  spaceList: {
    exact: true,
    path: '/spaces',
    component: SpaceList,
  },
  spacePub: {
    exact: true,
    path: '/spaces/:spaceId/pub',
    component: SpacePub,
  },
  requestListWithSpace: {
    exact: true,
    path: '/spaces/:spaceId/requets',
    component: RequestListWithSpace,
  },
  requestDetailWithSpace: {
    path: '/spaces/:spaceId/requets/:pubId',
    component: RequestDetailWithSpace,
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

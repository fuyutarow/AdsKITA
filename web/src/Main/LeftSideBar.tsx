import { v4 as uuid } from 'uuid';

import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link, Router } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Avatar from '@material-ui/core/Avatar';
import DeckIcon from '@material-ui/icons/Deck';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import DomainIcon from '@material-ui/icons/Domain';
import AuthAvatarPlate from './AuthAvatarPlate';

import { css } from 'emotion';

import { debugToast } from 'plugins/debug';
import { version, isDevelopment } from 'plugins/env';
import { brandColors } from 'plugins/brand';
import { AuthContext } from 'contexts/auth';
import { routes } from 'router';

import './style.css';
import style from './style.module.css';

import { logo, icons } from 'plugins/brand';

const drawerWidth = 240;

const iconStyle = { fontSize: '45px', color: brandColors.khaki };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: brandColors.ground,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
    },
    version: {

    },
    bottomArea: {
      position: 'fixed',
      top: 'auto',
      bottom: 0,
      width: '240px',
      backgroundColor: brandColors.ground,
      zIndex: 99,
      // paddingTop: 20,
    },
  }),
);

const LogoTitle = () => {
  const history = useHistory();

  return (
    <Link to={routes.home.path}>
      <ListItem>
        <ListItemIcon>
          <img src={icons[192]} height="36px" style={{
            position: 'relative',
            left: 3,
            top: 5,
          }} />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="h2">
            <span style={{
              color: brandColors.orange,
              fontWeight: 700,
              fontSize: 42,
              position: 'relative',
              left: -10,
            }}>
              AdsKITA
            </span>
          </Typography>
        </ListItemText>
      </ListItem>
      <div style={{
        color: brandColors.orange,
        textAlign: 'center',
        position: 'relative',
        top: -20,
      }}>
        <Typography variant="body2">
          v{version}
        </Typography>
      </div>
    </Link>
  );
};

const Tiles = () => {
  const history = useHistory();

  return (
    <ListItem>
      <ListItemIcon>
        <ViewModuleIcon style={iconStyle} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">
          <span style={{
            color: brandColors.khaki,
            fontWeight: 800,
          }}>
            一覧
          </span>
        </Typography>
      </ListItemText>
    </ListItem>
  );
};

const PlateButton: React.FC<{
  value: string;
  icon: React.ReactNode;
  to?: any | undefined;
}> = ({ value, icon, to }) => {
  const history = useHistory();

  const C = () => (
    <ListItem>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">
          <span style={{
            color: brandColors.khaki,
            fontWeight: 800,
          }}>
            {value}
          </span>
        </Typography>
      </ListItemText>
    </ListItem>
  );

  return to
    ? <Link to={to}><C /></Link>
    : <C />;
};

const PoliciesBlock = () => {
  const policies = [
    { to: routes.policy.path, name: 'プライバシーポリシー' },
    { to: routes.law.path, name: '特定商取引法に基づく表記' },
    { to: routes.contact.path, name: 'お問い合わせ' },
  ];

  return (
    <div style={{
      padding: '8px 0 8px 32px',
    }}>
      {policies.map(({ to, name }) => (
        <div>
          <Link to={to}>
            <span style={{
              color: brandColors.khaki,
              fontSize: 14,
            }}>
              {name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

const LeftSideBar: React.FC<{
  variant: 'permanent';
} | {
  variant?: undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const classes = useStyles();

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (props.variant) return;
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      props.setOpen(open);
    };

  return (
    <SwipeableDrawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      variant={props.variant}
      anchor='left'
      open={props.variant ? true : props.open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(false)}
    >
      <List>
        <LogoTitle />
      </List>
      <Divider />
      <List>
        <PlateButton {...{
          value: '広告を依頼',
          icon: <AddCircleIcon style={iconStyle} />,
          to: routes.flyerNew.path,
        }} />
        <PlateButton {...{
          value: '出稿中',
          icon: <ViewModuleIcon style={iconStyle} />,
          to: routes.requestList.path,
        }} />
      </List>
      <Divider />
      <List>
        <PlateButton {...{
          value: '広告を受ける',
          icon: <DomainIcon style={iconStyle} />,
          to: routes.spaceList.path,
        }} />
      </List>
      <Divider />
      <div className={classes.bottomArea}>
        <PoliciesBlock />
        <Divider />
        <List >
          <AuthAvatarPlate />
        </List>
      </div>
    </SwipeableDrawer >
  );
};

export default LeftSideBar;

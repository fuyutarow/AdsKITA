import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
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
import style from './style.module.css';

import { debugToast } from 'plugins/debug';
import { useBreakpoint } from 'plugins/breakpoint';
import { version, isDevelopment } from 'plugins/env';
import { brandColors, logo, } from 'plugins/brand';
import { AuthContext } from 'contexts/auth';

// import './style.css';

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
  const breakpoint = useBreakpoint();
  const router = useRouter();

  const ImgLogo = () => (['L', 'M'].includes(breakpoint))
    ? (
      <img {...{
        src: logo,
        width: 240 - 16 * 2,
        style: {
          marginTop: 8,
          marginLeft: 16,
        },
      }} />
    )
    : (
      <div style={{
        textAlign: 'center',
      }}>
        <img {...{
          src: logo,
          height: 36,
        }} />
      </div >
    );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(#F1C5D3, ${brandColors.ground})`,
        padding: '10px 0 10px 0',
      }}
      onClick={e => {
        router.push({
          pathname: '/',
        });
      }}
    >
      <div>
        <ImgLogo />
      </div>
      <div style={{
        color: brandColors.red,
        textAlign: 'center',
        position: 'relative',
        // top: -20,
      }}>
        <Typography variant="body2">
          v{version}
        </Typography>
      </div>
    </div>
  );
};

const Tiles = () => {

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
  to?: string | undefined;
}> = ({ value, icon, to }) => {
  const router = useRouter();

  const Main = () => (
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
    ? (
      <div onClick={e => {
        router.push({
          pathname: to,
          query: { from: 'home' },
        });
      }}>
        <Main />
      </div>
    )
    : <Main />;
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
      {/* <List> */}
      <LogoTitle />
      {/* </List> */}
      <Divider />
      <List>
        <PlateButton {...{
          value: 'ドメイン',
          icon: <AddCircleIcon style={iconStyle} />,
          to: '/domains',
        }} />
        <PlateButton {...{
          value: 'Youtube',
          icon: <ViewModuleIcon style={iconStyle} />,
          to: '/youtube',
        }} />
      </List>
      {/* <Divider />
      <div className={classes.bottomArea}>
        <Divider />
        <List >
          <AuthAvatarPlate />
        </List>
      </div> */}
    </SwipeableDrawer>
  );
};

export default LeftSideBar;

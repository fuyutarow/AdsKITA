import { v4 as uuid } from 'uuid';

import React, { useState, useContext } from 'react';
import { Switch, Route, useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import DomainIcon from '@material-ui/icons/Domain';
import { css } from 'emotion';

import { isDevelopment } from 'plugins/env';
import { useBreakpoint } from 'plugins/breakpoint';
import { brandColors } from 'plugins/brand';
import { routes } from 'router';
import { AuthContext, AuthProvider } from 'contexts/auth';

import LeftSideBar from './LeftSideBar';
import style from './style.module.css';

const drawerWidth = 240;
const iconStyle = { width: '45px', color: brandColors.khaki };

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
      'background-color': '#58E2E6',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    contentL: {
      flexGrow: 1,
      padding: '30px 12px 60px 12px',
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
      position: 'relative',
    },
    contentMS: {
      flexGrow: 1,
      padding: '30px 5px 60px 5px',
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
      position: 'relative',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: brandColors.ground,
      'min-height': '100vh',
      position: 'relative',
    },
    bottomNav: {
      position: 'fixed',
      width: '100%',
      bottom: 0,
      fontSize: iconStyle.width,
      color: brandColors.khaki,
      backgroundColor: brandColors.ground,
    },
  }),
);

export default () => {
  const classes = useStyles();
  const breakpoint = useBreakpoint();
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const BottomNav = () => {
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          label="me"
          icon={
            auth ? <Avatar src={auth.user.photoURL as string} />
              : <Avatar />
          }
          onClick={e => { setOpenLeft(true); }}
        />
        <BottomNavigationAction
          label="offer"
          icon={<AddCircleIcon className={css`font-size: 45px !important`} />}
          onClick={e => { history.push(routes.flyerNew.path); }}
        />
        <BottomNavigationAction
          label="requests"
          icon={<ViewModuleIcon className={css`font-size: 45px !important`} />}
          onClick={e => { history.push(routes.requestList.path); }}
        />
        <BottomNavigationAction
          label="take"
          icon={<DomainIcon className={css`font-size: 45px !important`} />}
          onClick={e => { history.push(routes.spaceList.path); }}
        />
      </BottomNavigation>
    );
  };

  if (['L', 'M'].includes(breakpoint)) {
    return (
      <div className={classes.root}>
        <LeftSideBar variant='permanent' />
        <main className={classes.contentL}>
          <Switch>
            {Object.values(routes).map(route => <Route {...route} />)}
          </Switch>
        </main>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <LeftSideBar open={openLeft} setOpen={setOpenLeft} />
        <main
          className={classes.contentMS}
          onClick={e => {
            setOpenLeft(false);
            setOpenRight(false);
          }}
        >
          <Switch>
            {Object.values(routes).map(route => <Route {...route} />)}
          </Switch>
        </main>
        <BottomNav />
      </div>
    );
  }
};

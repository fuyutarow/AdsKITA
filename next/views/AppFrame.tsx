import Head from 'next/head';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import Link, { Url } from 'next/link';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';

import { useBreakpoint } from 'plugins/breakpoint';
import { MetaHead } from 'headers';
import { OGP } from 'models/ogp';
import { logo, icons, brandColors } from 'plugins/brand';
import LeftSideBar from 'components/LeftSideBar';

const drawerWidth = 240;
const iconStyle = { width: '45px', color: brandColors.khaki };
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    root: {
      display: 'flex',
    },
    appBar: {
      // width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: brandColors.ground,
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
    contentL: {
      flexGrow: 1,
      padding: '30px 12px 60px 12px',
      backgroundColor: brandColors.ground,
      minHeight: '100vh',
      position: 'relative',
    },
    contentMS: {
      flexGrow: 1,
      padding: 5,
      backgroundColor: brandColors.ground,
      minHeight: '100vh',
      position: 'relative',
      margin: 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: brandColors.ground,
      minHeight: '100vh',
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

const Desktop: NextPage<{
  ogp?: OGP | undefined
}> = ({ ogp, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MetaHead {...{ ogp }} />
      <LeftSideBar variant='permanent' />
      <main className={classes.contentL}>
        {children}
      </main>
    </div>
  );
};

const Mobile: NextPage<{
  ogp?: OGP | undefined
}> = ({ ogp, children }) => {
  const classes = useStyles();
  const [openLeft, setOpenLeft] = useState(false);

  return (
    <div>
      <LeftSideBar open={openLeft} setOpen={setOpenLeft} />
      <AppBar {...{
        position: 'fixed',
        className: classes.appBar,
      }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={e => {
            setOpenLeft(true);
          }}>
            <MenuIcon />
          </IconButton>
          <img {...{
            src: logo,
            height: 36,
          }} />
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <main className={classes.contentMS}>
        {children}
      </main>
    </div>
  );
};

const Page: NextPage<{
  ogp?: OGP | undefined
}> = ({ ogp, children }) => {
  const breakpoint = useBreakpoint();

  if (['L', 'M'].includes(breakpoint)) {
    return <Desktop {...{ ogp, children }} />;
  } else {
    return <Mobile {...{ ogp, children }} />;
  }
};

export default Page;

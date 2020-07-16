import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Link, useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { css } from 'emotion';

import { routes } from 'router';
import { AuthContext } from 'contexts/auth';
import style from './style.module.css';

export default () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!auth) return;
    const currentUser = auth.user;
  }, [auth]);

  return auth
    ? (
      <div>
        <div onClick={handleMenu} >
          {
            auth.user.photoURL
              ? (
                <ListItem>
                  <ListItemIcon>
                    <div style={{ position: 'relative', left: 3 }}>
                      <Avatar
                        src={auth.user.photoURL as string}
                      />
                    </div>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h6">
                      <span className={style['User-name']}>
                        {auth.user.displayName}
                      </span>
                    </Typography>
                  </ListItemText>
                </ListItem>
              )
              : <Avatar />
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
      </div >
    )
    : (
      <Link to={{ pathname: routes.login.path }}>
        <ListItem>
          <ListItemIcon>
            <Avatar />
          </ListItemIcon>
          <ListItemText>ログイン</ListItemText>
        </ListItem>
      </Link>
    );
};

import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
} from '@material-ui/core';

import Login from 'components/Login';

export default () => {
  return (
    <>
      <Typography variant="h5" component="h2">
      ようこそSaiirilab Appsへ
      </Typography>
      <Login />
    </>
  );
};

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'contexts/auth';

import { routes } from 'router';

export default () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(
    () => {
      if (auth) {
        history.push(routes.requestList.path);
      } else {
        history.push(routes.login.path);
      }
    },
    [auth, history],
  );

  return null;

};

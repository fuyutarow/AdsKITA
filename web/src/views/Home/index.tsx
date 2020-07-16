import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { routes } from 'router';

export default () => {
  const history = useHistory();

  useEffect(() => {
    history.push(routes.requestList.path);
  }, [history]);

  return null;

};

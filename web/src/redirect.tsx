
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
  const location = useLocation();

  useEffect(
    () => {
      if (location.state) {
        // @ts-ignore
        window.parent.location.href = location.state.toURL;
      }
    },
    [location.state],
  );

  return null;
};

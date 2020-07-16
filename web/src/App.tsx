import React from 'react';
import { BrowserRouter, Switch, Route, Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from 'contexts/auth';
import Main from 'Main';
import { routes } from 'router';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route {...routes.pubs} />
          <Main />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;

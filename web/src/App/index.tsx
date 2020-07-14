import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import { AuthContext, AuthProvider } from 'contexts/auth';
import { routes } from 'router';

import AppHeader from 'components/AppHeader';

const Counter = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={onClick}>
        noticeme
      </button>
    </div>
  );
};

const NotLoginView = () => {
  return (
    <div className="App">
      <div className="App-header">
        <img src="/icons/192x192.png" className="App-logo" alt="logo" />
        <Counter />
        <div> wellcome, gameticket</div>
        {/* <Login /> */}
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppHeader />
      <Switch>
        {Object.values(routes).map(route => <Route {...route} />)}
      </Switch>
    </BrowserRouter>
  </AuthProvider>
);

export default App;

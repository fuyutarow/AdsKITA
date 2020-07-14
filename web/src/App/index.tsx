import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthProvider } from 'contexts/auth';
import TicketList from 'views/TicketList';
import SwipeList from 'views/SwipeList';
import About from 'views/About';
import NotFound from 'views/NotFound';
import TicketDetail from 'views/TicketDetail';
import NewTicket from 'views/NewTicket';
import PurchasedTicketList from 'views/PurchasedTicketList';
import ProductHeroLayout from 'views/ProductHeroLayout';
import AppFooter from 'components/AppFooter';

import LoginView from 'views/LoginView';
import Logout from 'components/Logout';
import AppHeader from 'components/AppHeader';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Theme,
  ThemeProvider,
} from '@material-ui/core';

import {
  withStyles,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';

// @ts-ignore
// export default withStyles(styles)(ProductHero);

import style from './style.module.css';

import Home from 'views/Home';

// const ProductHero: React.FC<any> = (props) => {
//   const { classes } = props;

//   return (
//     <ProductHeroLayout backgroundClassName={classes.background}>
//       <Typography color="inherit" align="center" variant="h2" className={classes.h5}>
//         強いゲーマと一緒にプレイ
//       </Typography>
//       <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
//         技をならえ，技をおしえろ
//       </Typography>
//       <Button
//         color="secondary"
//         variant="contained"
//         size="large"
//         // className={classes.button}
//         component="a"
//         href="/premium-themes/onepirate/sign-up/"
//       >
//         Register
//       </Button>
//       <Typography variant="body2" color="inherit"
//       // className={classes.more}
//       >
//         Discover the experience
//       </Typography>
//     </ProductHeroLayout>
//   );
// };

import { css } from 'emotion';
import AddIcon from '@material-ui/icons/Add';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

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

// const LoginView = () => {
//   const currentUser = useContext(AuthContext)!.currentUser;

//   return (
//     <BrowserRouter>
//        <ink to="/">
//         <img src="/icons/192x192.png" alt="logo" width="50" />
//         Link>
//        <ink to="/tickets"><button>/tickets</button></Link>
//       <Link to={`/u/${currentUser.id}/purchased`}><button>/purcahsed</button></Link>
//       <Link to="/about"><button>/about</button></Link>
//         witch>
//         {/* 上からマッチ */}
//         <Route path='/tickets/new' component={NewTicket} />
//           oute path='/tickets/:ticketId' component={TicketDetail} />
//         <Route path='/u/:userId/purchased' component={PurchasedTicketList} />
//          <oute path='/tickets' component={TicketList} />
//         <Route path='/about' component={About} />
//           oute path='*' component={NotFound} />
//        <Switch>
//     </BrowserRouter>
//   );
// };

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

const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const styles = (theme: Theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

const App = () => (
  <div className={style.App}>
    <AuthProvider>
      <BrowserRouter>
        <AppHeader />
        <Switch>

          {/* 上からマッチ */}
          <Route path='/tickets/new' component={NewTicket} />
          <Route path='/tickets/:ticketId' component={TicketDetail} />
          <Route path='/u/:userId/purchased' component={PurchasedTicketList} />
          <Route path='/tickets' component={TicketList} />
          {/* <Route path='/tickets' component={SwipeList} /> */}
          <Route path='/login' component={LoginView} />
          <Route path='/about' component={About} />
          <Route path='/dev' component={AppFooter} />
          <Route exact path='/' component={Home} />
          <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;

{/* <AuthProvider>
  <AuthContext.Consumer>
    {
      authContext => authContext ? (
        <LoginView />
      ) : (
        <NotLoginView />
      )
    }
  </AuthContext.Consumer>
</AuthProvider> */}

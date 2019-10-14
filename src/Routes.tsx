import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

const Routes: React.FC = () => 
    <BrowserRouter>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Register} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  ;

export default Routes;

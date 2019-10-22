import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import ManageDevice from './pages/ManageDevice';

function Router() {

  return (
    <HashRouter>
      <div className="route">
        <h1>Device Manager</h1>
        <Switch>

          <Redirect exact from="/" to="manageDevice" />
          <Route exact path="/manageDevice/:categories?" component={ManageDevice} />

          <Route exact path="/home" component={Home} />

        </Switch>
      </div>
    </HashRouter>
  );
}

export default Router;
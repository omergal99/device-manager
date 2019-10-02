import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';

class Router extends Component {

  render() {
    return (
      <HashRouter>
          <div className="route">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
      </HashRouter>
    );
  }
}

export default Router;
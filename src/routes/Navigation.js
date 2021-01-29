// @packages
import React from 'react'
import { map } from 'lodash';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// @scripts
import routes from './routes';

const Navigation = () => (
  <Router>
    <Switch>
      {map(routes, (route, index) => (
        <Route
          exact={route.exact}
          key={index}
          path={route.path}
          render={(props) => (
            <route.layout>
              <route.component { ...props } />
            </route.layout>
          )}
        />
      ))}
    </Switch>
  </Router>
)

export default Navigation;
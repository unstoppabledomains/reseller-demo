import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ResellerDemo from './Pages/ResellerDemo/ResellerDemo';
import DomainNameResolutionDemo from './Pages/DomainNameResolutionDemo/DomainNameResolutionDemo';

const App = () => {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/reseller-demo" />}
        />
        <Route path="/reseller-demo" exact component={ResellerDemo} />
        <Route
          path="/domain-name-resolution"
          exact
          component={DomainNameResolutionDemo}
        />
      </Switch>
    </HashRouter>
  );
};

export default App;

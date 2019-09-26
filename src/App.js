import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ResellerDemo from './Pages/ResellerDemo/ResellerDemo';
import DomainNameResolutionDemo from './Pages/DomainNameResolutionDemo/DomainNameResolutionDemo';
import DomainNameResolutionDemoV2 from './Pages/DomainNameResolutionDemoV2/DomainNameResolutionDemoV2';

const App = () => {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/domain-name-reloution" />}
        />
        <Route path="/reseller-demo" exact component={ResellerDemo} />
        <Route
          path="/domain-name-reloution"
          exact
          component={DomainNameResolutionDemo}
        />
        <Route
          path="/domain-name-reloution-v2"
          exact
          component={DomainNameResolutionDemoV2}
        />
      </Switch>
    </HashRouter>
  );
};

export default App;

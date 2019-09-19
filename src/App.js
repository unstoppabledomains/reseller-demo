import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ResellerDemo from './Pages/ResellerDemo/ResellerDemo';
import DomainNameResolutionDemo from './Pages/DomainNameResolutionDemo/DomainNameResolutionDemo';
import DomainNameResolutionDemoV2 from './Pages/DomainNameResolutionDemoV2/DomainNameResolutionDemoV2';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Redirect to="/reseller-demo" />}
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
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { history } from './history';
// import Wallet from './Pages/WalletFront/Wallet';
import { withStyles } from '@material-ui/styles';
import styles from './styles/app.styles';
import ResellerDemo from './Pages/ResellerDemo/ResellerDemo';
import DomainNameResolutionDemo from './Pages/DomainNameResolutionDemo/DomainNameResolutionDemo';

const App = ({ classes }) => {
  return (
    <div className={classes.root}>
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/" exact component={ResellerDemo} />
          <Route path="/reseller-demo" exact component={ResellerDemo} />
          <Route
            path="/domain-name-reloution"
            exact
            component={DomainNameResolutionDemo}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default withStyles(styles)(App);

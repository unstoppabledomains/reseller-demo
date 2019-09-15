import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './history';
// import Wallet from './Pages/WalletFront/Wallet';
import Search from './Pages/Search/Search';
import Email from './Pages/Email/Email';
import Checkout from './Pages/Checkout/Checkout';
import Finish from './Pages/Finish/Finish';
import Send from './Pages/Send';
import Header from './Pages/Layout/Header';
import { withStyles } from '@material-ui/styles';

import styles from './styles/app.styles';

const App = ({ classes }) => {
	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.layout}>
				<Router history={history} basename="/">
					<Switch>
						<Route path="/" exact component={Search} />
						<Route path="/reseller-demo/" exact component={Search} />
						<Route path="/email" exact component={Email} />
						<Route path="/checkout" exact component={Checkout} />
						<Route path="/finish" exact component={Finish} />
						<Route path="/send" exact component={Send} />
					</Switch>
				</Router>
			</div>
		</div>
	);
};

export default withStyles(styles)(App);

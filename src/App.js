import React from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import history from './history';
import Wallet from './Pages/WalletFront/Wallet';
import Search from './Pages/Search/Search';
import Email from './Pages/Email/Email';
import Checkout from './Pages/Checkout/Checkout';
import Finish from './Pages/Finish/Finish';




const App = () => {
	return (
		<div className="App">
			<div className="container-fluid" id="tall">
				<div className="row justify-content-md-center">
					<h1>Resseler buy demo</h1>
				</div>
				<Router history={history} basename='/'>
					<Switch>
						<Route path="/landing" exact component={Wallet} />
						<Route path="/" exact component={Search} />
						<Route path="/email" exact component={Email} />
						<Route path="/checkout" exact component={Checkout} />
						<Route path="/finish" exact component={Finish} />
						{/* <Route path="/search" exact component={LookUp} />
	<Route path="/second-step" exact component={SecondStep} />
	<Route path="/checkout" exact component={Checkout} />
	<Route path="/congratulations" exact component={Congratulations} /> */}
					</Switch>
				</Router>
			</div>
		</div>
	)
}

export default App

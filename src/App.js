import React from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import history from './history';

import './styles/global.css';
import Wallet from './components/Wallet';
import LookUp from './components/LookUp';
import SecondStep from './components/SecondStep';
import Checkout from './components/Checkout';
import Congratulations from './components/Congratulations/Congratulations';




const App = () => {

	return (
		<>
			<h1 style={{
				textAlign: "center",
				backgroundColor: "var(--main-bg-color)",
				margin: 0,
				fontSize: '6em',
				color: 'white'
			}}>Resseler buy demo</h1>
			<div className="App">
				<Router history={history} basename='/'>
					<Switch>
						<Route path="/" exact component={Wallet} />
						<Route path="/search" exact component={LookUp} />
						<Route path="/second-step" exact component={SecondStep} />
						<Route path="/checkout" exact component={Checkout} />
						<Route path="/congratulations" exact component={Congratulations} />
					</Switch>
				</Router>

			</div>
		</>
	)
}

export default App
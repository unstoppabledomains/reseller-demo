import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import StripeCheckoutForm from './StripeCheckoutForm';
import { StripeProvider, Elements } from 'react-stripe-elements';
import config from '../../config';

import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

const Checkout = () => {
  return <div>checkout</div>;
};

// const Checkout = (props) => {

// 	const { state } = props.location;
// 	const [transactionResponse, setTransactionResponse] = useState();
// 	const [redirect, setRedirect] = useState(false);
// 	const [errors, setErrors] = useState(false);
// 	const [paymentMethod, setPaymentMethod] = useState('none');
// 	const [coinbaseToken, setCoinbaseToken] = useState('');
// 	const [showNavigation, setShowNavigation] = useState(false);
// 	const [userOwner, setUserOwner] = useState('');

// 	if (!state) return <Redirect to="/" />

// 	console.log('state = ', state);

// 	const _redirectToFinish = (e) => {
// 		setRedirect(false);
// 		return props.history.push({ pathname: '/finish', state: { ...props.location.state, ...transactionResponse } })
// 	};

// 	// this is the format of resolution for a certain domain.
// 	const _mockWalletResolution = () => ({
// 		"crypto": {
// 			"ZIL": {
// 				"address": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"
// 			},
// 			"ETH": {
// 				"address": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"
// 			}
// 		}
// 	});

// 	const _finalizeTransaction = (res) => {
// 		setTransactionResponse(res);
// 		if (!res.errors)
// 			setRedirect(true);
// 		else
// 			setErrors(res.errors);
// 		return res;
// 	}

// 	const buy = (url, data) => {
// 		return fetch(url, {
// 			method: "POST",
// 			body: JSON.stringify(data),
// 			headers: {
// 				"Authentication": `Bearer ${config.token}`,
// 				"Content-Type": "application/json"
// 			},
// 		}).then(res => res.json()).then(_finalizeTransaction);
// 	}

// 	const _saveToLocal = (data) => localStorage.setItem('own_domain', JSON.stringify(data));

// 	const _handleUDPayment = ({ token }, setSpinner) => {
// 		console.log('_handleUPPayment ', { token });
// 		const { domain: { name }, email, owner } = state;
// 		const apiurl = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders`;
// 		const body = {
// 			order: {
// 				payment: {
// 					type: "stripe",
// 					tokenId: token.id
// 				},
// 				domains:
// 					[{
// 						name,
// 						owner: userOwner !== '' ? userOwner : owner,
// 						resolution: _mockWalletResolution()
// 					}]
// 			}
// 		};
// 		console.log(apiurl);
// 		console.log(body);
// 		buy(apiurl, body, setSpinner).then((res) => {
// 			if (res && !res.errors) {
// 				_saveToLocal({ ...body.order, config: { email, orderNumber: res.order.orderNumber } });
// 			}
// 			setSpinner(false)
// 		});
// 	}

// 	const requestCoinbaseToken = async () => {
// 		const { domain: { name }, email, owner } = state;
// 		const apiURL = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders`;

// 		const body = {
// 			"order": {
// 				"payment": {
// 					"type": "coinbase"
// 				},
// 				"domains": [
// 					{
// 						"name": name,
// 						"owner": userOwner !== '' ? userOwner : owner,
// 						"resolution": {
// 							..._mockWalletResolution()
// 						}
// 					}
// 				]
// 			}
// 		}

// 		const response = await fetch(apiURL, {
// 			method: 'POST', headers: {
// 				"Authentication": `Bearer ${config.token}`,
// 				"Content-Type": "application/json"
// 			}, body: JSON.stringify(body)
// 		}).then(resp => resp.json());

// 		console.log(response);
// 		setCoinbaseToken(response.order.payment.tokenId);

// 		//Autoclick
// 		const coinbaseButton = document.querySelector('.coinbase-button');
// 		if (coinbaseButton)
// 			coinbaseButton.click();

// 	}

// 	const _renderSpinner = () => <div className="loader">Searching...</div>;

// 	const _renderCoinbaseFlow = () => {
// 		if (coinbaseToken === '') {
// 			requestCoinbaseToken();
// 			return _renderSpinner();
// 		}
// 		console.log(coinbaseToken);
// 		return (
// 			<div className="card" id="list-field">
// 				<div className="card-header">
// 					<p className="card-title">Coinbase payment flow</p>
// 				</div>
// 				<div className="card-body">
// 					<CoinbaseCommerceButton
// 						className="coinbase-button"
// 						styled={false}

// 						chargeId={coinbaseToken}
// 						onChargeSuccess={(messageData) => console.log('charge success ', messageData)}
// 						onChargeFailure={(messageData) => console.log('charge failure ', messageData)}
// 					/>
// 				</div>
// 			</div>
// 		);

// 	}

// 	const _renderStripeFlow = () => {
// 		const { location: { state: { testNameSpace } } } = props;
// 		return (<>
// 			<div className="card" id="list-field">
// 				<div className="card-header">
// 					<p className="card-title">Stripe Payment flow</p>
// 				</div>
// 				<div className="card-body">
// 					<StripeProvider apiKey={testNameSpace ? config.stripeKey : config.stripeKeyLiveDomain}>
// 						<Elements>
// 							<StripeCheckoutForm domain={state.domain} funcs={
// 								{ _handleUDPayment }
// 							} test={testNameSpace} />
// 						</Elements>
// 					</StripeProvider >
// 				</div>
// 			</div>
// 			{errors ?
// 				<div className="card" id="list-field">
// 					<div className="card-header">
// 						<p className="card-title">Something went wrong</p>
// 					</div>
// 					<div className="card-body">
// 						{errors.map(error => <p className="card-text text-danger" key={error.code}>{error.message}</p>)}
// 					</div>
// 				</div>
// 				: null}
// 		</>);
// 	}

// 	const _renderPaymentMethod = () => {

// 		const navigationPanel = () => (
// 			<div className="d-flex align-content-center">
// 				<button className="btn btn-block btn-primary"
// 					onClick={() => setPaymentMethod('stripe')}>
// 					Stripe
// 				</button>
// 				<button className="btn btn-block btn-primary"
// 					onClick={() => setPaymentMethod('coinbase')}>
// 					Coinbase
// 				</button>
// 			</div>
// 		);

// 		if (paymentMethod === 'coinbase')
// 			return <>
// 				{navigationPanel()}
// 				{_renderCoinbaseFlow()}

// 			</>
// 		if (paymentMethod === 'stripe')
// 			return <>
// 				{navigationPanel()}
// 				{_renderStripeFlow()}
// 			</>

// 		if (state.testNameSpace === false)
// 			return (
// 				<>
// 					{showNavigation ? navigationPanel() : null}
// 					<div className="d-flex align-content-center">
// 						<div className="card">
// 							<div className="card-header">
// 								<p className="card-title">
// 									Configutration
// 							</p>
// 							</div>
// 							<div className="card-body">
// 								<p className="card-text">Because you are buying a live domain UD need to know your wallet address you wish to be referenced with {state.domain.name}</p>
// 								<form onSubmit={(e) => e.preventDefault()}>
// 									<div className="form-group">
// 										<label for="exampleInputEmail1">Owner address</label>
// 										{showNavigation && userOwner !== '' ?
// 											<h4 className="card-title">{userOwner}</h4>
// 											:
// 											<input
// 												type="text" className="form-control"
// 												value={userOwner}
// 												onChange={(e) => setUserOwner(e.target.value)}
// 											/>
// 										}
// 										<small id="emailHelp" className="form-text text-muted">Can be either eth or zil address</small>
// 									</div>
// 									{showNavigation ?
// 										<button type="submit" className="btn btn-warning btn-block" onClick={() => {
// 											setShowNavigation(false);
// 										}}>Edit </button>
// 										:
// 										<button type="submit" className="btn btn-primary btn-block" onClick={() => {
// 											if (userOwner !== '')
// 												setShowNavigation(true);
// 										}}>Submit</button>
// 									}
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 				</>
// 			);

// 		return navigationPanel();

// 	}

// 	const _renderAppScreen = () => {

// 		return (
// 			<div className="container-fluid">
// 				<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
// 					<CardHeader title="Payment flow" />
// 					<div className="card-body">
// 						{_renderPaymentMethod()}

// 					</div>

// 					<AppFooter />
// 				</div>
// 			</div >
// 		)
// 	}

// 	return redirect ? _redirectToFinish() : (
// 		<>
// 			<div className="row justify-content-md-center flex-nowrap mt-5">
// 				<div className="col-lg-fluid">
// 					<div className="container">
// 						{_renderAppScreen()}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

export default Checkout;
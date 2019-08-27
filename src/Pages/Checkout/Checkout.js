import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import StripeCheckoutForm from './StripeCheckoutForm'
import { StripeProvider, Elements } from 'react-stripe-elements';
import config from '../../config'

const Checkout = (props) => {

	const { state } = props.location;
	const [transactionResponse, setTransactionResponse] = useState();
	const [redirect, setRedirect] = useState(false);
	const [errors, setErrors] = useState(false);


	if (!state) return <Redirect to="/" />

	const _redirectToFinish = (e) => {
		setRedirect(false);
		return props.history.push({ pathname: '/finish', state: { ...props.location.state, ...transactionResponse } })
	};


	const _mockWalletResolution = () => ({
		"crypto": {
			"ZIL": {
				"address": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"
			},
			"ETH": {
				"address": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf"
			}
		}
	});

	const _finalizeTransaction = (res) => {
		setTransactionResponse(res);
		const temp = JSON.parse(localStorage.getItem('own_domain'));
		console.log('temp from finalizing transiction!!! ', temp);
		console.log('res = ', res);
		if (temp) {
			temp.config.orderNumber = res.order.orderNumber;
			localStorage.setItem('own_domain', JSON.stringify(temp));
		}
		if (!res.errors)
			setRedirect(true);
		else
			setErrors(res.errors);
	}

	const buy = (url, data) => {
		return fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Authentication": `Bearer ${config.token}`,
				"Content-Type": "application/json"
			},
		}).then(res => res.json()).then(_finalizeTransaction);
	}

	const _saveToLocal = (data) => localStorage.setItem('own_domain', JSON.stringify(data));

	const _handleUDPayment = ({ token }) => {
		const { domain: { name }, email, owner } = state;
		const apiurl = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders`;
		const body = {
			order: {
				payment: {
					type: "stripe",
					tokenId: token.id
				},
				domains:
					[{
						name,
						owner,
						resolution: _mockWalletResolution()
					}]
			}
		};
		_saveToLocal({ ...body.order, config: { email, } });
		buy(apiurl, body);
	}

	const _renderAppScreen = () => {
		return (
			<div className="container-fluid">
				<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
					<CardHeader title="Payment flow" />
					<div className="card-body">
						<div className="card" id="list-field">
							<div className="card-header">
								<p className="card-title">Payment Flow Credit Card Mock</p>
							</div>
							<div className="card-body">
								<StripeProvider apiKey={config.stripeKey}>
									<Elements>
										<StripeCheckoutForm domain={state.domain} funcs={
											{ _handleUDPayment }
										} />
									</Elements>
								</StripeProvider >
							</div>
						</div>
						{errors ?
							<div className="card" id="list-field">
								<div className="card-header">
									<p className="card-title">Something went wrong</p>
								</div>
								<div className="card-body">
									{errors.map(error => <p className="card-text text-danger" key={error.code}>{error.message}</p>)}
								</div>
							</div>
							: null}
					</div>
					<AppFooter />
				</div>
			</div >
		)
	}



	return redirect ? _redirectToFinish() : (
		<>
			<div className="row justify-content-md-center flex-nowrap mt-5">
				<div className="col-lg-fluid">
					<div className="container">
						{_renderAppScreen()}
					</div>
				</div>
			</div>
		</>
	);
}



export default Checkout

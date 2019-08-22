import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import keys from '../../config';

const Checkout = (props) => {

	const { state } = props.location;
	const [creditCard, setCreditCard] = useState('4815821033352416');
	const [transactionResponse, setTransactionResponse] = useState();
	const [redirect, setRedirect] = useState(false)

	if (!state) return <Redirect to="/" />

	const { domain: { name }, owner, email } = state;

	const _renderHints = () => {
		return (
			<div className="container-fluid">
				<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
					<div className="card-body">
						<h5 className="card-title">Hints</h5>
					</div>
				</div>
			</div >
		);
	}


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
		console.log('res = ', res);
		if (!res.errors)
			setRedirect(true);
	}

	const buy = (url, data) => {
		console.log('post data = ', data);
		return fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Authentication": `Bearer ${keys.token}`,
				"Content-Type": "application/json"
			},
		}).then(res => res.json()).then(_finalizeTransaction);
	}

	const _handlePayment = (e) => {
		const apiurl = `https://unstoppabledomains.com/api/v1/resellers/udtesting/users/${email}/orders`;
		const body = {

			order: {
				domains:
					[{
						name,
						owner,
						resolution: _mockWalletResolution()
					}]
			}
		};
		buy(apiurl, body);
	}



	const _renderAppScreen = () => {
		return (
			<div className="container-fluid">
				<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
					<CardHeader title="Payment flow" />
					<div className="card-body">
						<div className="card">
							<div className="card-header">
								<p className="card-title">Payment Flow Credit Card Mock</p>
							</div>
							<div className="card-body">
								<form>
									<div className="form-row mt-5">
										<label htmlFor="creditCard" className="align-self-start">Credit card number</label>
										<input
											id="creditCard" type="text"
											value={creditCard} className="form-control"
											onChange={e => setCreditCard(e.target.value)}
										/>
									</div>
									<div className="form-row mt-5 justify-content-md-center">
										<button onClick={_handlePayment} className="btn btn-primary btn-lg mt-5">Buy {name}</button>
									</div>
								</form>
							</div>
						</div>
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

import React, { useState } from 'react'
import Footer from '../Layout/Footer';
import { Redirect } from 'react-router-dom';
import Header from '../Layout/Header';
import keys from '../../config';
import errorsData from '../../config/errors.json';
import ReactJson from 'react-json-view';

const Checkout = (props) => {


	const [_redirect, setRedirect] = useState(false);
	const [payment, setPayment] = useState({
		credit: '4815821033352410',
		zip: '94087',
		experation: '04/21',
	})

	const [transactionResponse, setTransactionResponse] = useState();


	const { location: { state: { domain, email, owner, wallets } } } = props;


	const _renderErrors = (errors) => {


		const clearErrorMsg = (e) => setTransactionResponse(null);

		return errors.map(error =>
			<div className="error" key={error.code} >
				<div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
					<span>
						{errorsData[error.code]}
					</span>
				</div>
				<div style={{ marginBottom: '20px', width: '100%' }}>
					<button className="PrimaryButton" onClick={clearErrorMsg}>Back</button>
				</div>
			</div>
		)
	}


	const _renderCheckout = () => (
		<>
			<div className="Card special">
				<div>
					<span className="Title">{domain.name}</span>
					<span className="Title">${domain.reselling.price}</span>
				</div>
			</div>
			<span className="Title">Credit card payment process</span>
			<div className="payment">
				<div style={{
					display: "flex",
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					{!transactionResponse ? _renderForm() : transactionResponse.errors ?
						_renderErrors(transactionResponse.errors) : _renderForm()}
				</div>
			</div>
		</>
	)

	const _renderForm = () => (
		<form>
			<input type="text" name="credit" value={payment.credit} onChange={e => setPayment({ ...payment, credit: e.target.value })} />
			<input type="text" name="experation" value={payment.experation} onChange={e => setPayment({ ...payment, experation: e.target.value })} />
			<input type="text" name="zip" value={payment.zip} onChange={e => setPayment({ ...payment, zip: e.target.value })} />
		</form>
	)


	const _finalizeTransaction = (res) => {
		setTransactionResponse(res);
		console.log('res = ', res);
		if (!res.errors)
			setRedirect(true);
	}


	const buy = (url, data) => {
		return fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Authentication": `Bearer ${keys.token}`,
				"Content-Type": "application/json"
			},
		}).then(res => res.json()).then(_finalizeTransaction);
	}

	const _placeOrder = (e) => {
		const apiurl = `https://unstoppabledomains.com/api/v1/resellers/udtesting/users/${email}/orders`;
		const body = {
			order: {
				domains:
					[{
						name: domain.name,
						owner: owner,
						resolution: wallets.resolution
					}]
			}
		};
		buy(apiurl, body);
	}

	const _renderLeftHints = () => {
		const baseURL = 'https://unstoppabledomains.com/api/v1';
		return (
			<div className="Card">
				<h1>API calls</h1>
				<div className="Card">
					<h5>BaseURL:</h5>
					<p style={{ fontSize: '1.0em' }}>{baseURL}</p>
				</div>
				<div className="Card center">
					<div className="apiexample">
						<span>/resellers/</span>
						<span className="accent">resseler-id</span>
						<span>/users</span>
						<span className="accent">/email</span>
						<span>/orders</span>
					</div>
					<div className="points">
						<ul>
							<li>Method: POST</li>
							<li>Body:
								<ReactJson src={
									{
										order: {
											domains:
												[{
													name: domain.name,
													owner: owner,
													resolution: wallets.resolution
												}]
										}
									}

								}
									collapsed={true}
									displayDataTypes={false}
									indentWidth={1}
									collapseStringsAfterLength={10}
									displayObjectSize={false}
								/>

							</li>
							<li>Response:
							<ReactJson src={
									{
										"order": {
											"orderNumber": "-Lm5LBQq-AlW_kNtK6QW",
											"subtotal": 10,
											"items": [
												{
													"type": "ZNS_DOMAIN",
													"name": "reseller-test-udtesting-26213.zil",
													"test": true,
													"blockchain": {
														"mined": false
													}
												}
											]
										}
									}
								}
									collapsed={true}
									displayDataTypes={false}
									indentWidth={1}
									collapseStringsAfterLength={10}
									displayObjectSize={false}
								/>
							</li>
							<li>Errors:
								<ReactJson src={{
									"errors": [
										{
											"code": "DOMAIN_NAME_INVALID",
											"message": "Domain name is invalid"
										}
									]
								}}
									collapsed={true}
									displayDataTypes={false}
									indentWidth={1}
									collapseStringsAfterLength={20}
									displayObjectSize={false}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	const _renderRightHints = () => (<div className="Card">
		<h1>We Trust you</h1>
		<div className="Card">
			<p>
				We don't charge your customers instead we store which reseller sold which domain to charge them later
				So you could have a possibility to customize your payment process.
				You can take cryptocoins, credit cards or even cash.
					</p>
		</div>
		<h1>Implement your own payment flow</h1>
		<div className="Card">

			<p>Basically it is your job to implement the payment flow.
				Feel free to do as you wish just don't forget to use our api call at the end of the process to finalize the transaction
			</p>
		</div>

	</div>);







	return (
		_redirect ? <Redirect to={{ pathname: '/congratulations', state: { ...transactionResponse, email } }} /> :
			<>
				<div className="Hints">
					{_renderLeftHints()}
				</div>
				< div className="Wallet" >
					<Header title="Checkout" step="3 / 3" {...props} />
					<div className="Checkout">
						{_renderCheckout()}
					</div>
					<div className="Action-space">
						<div>
							<div className="payment">
								<button className="PrimaryButton" onClick={_placeOrder}>PLACE ORDER</button>
							</div>
						</div>
					</div>
					<Footer />
				</div >
				<div className="Hints">
					{_renderRightHints()}
				</div>
			</>
	)
}

export default Checkout

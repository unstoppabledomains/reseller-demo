import React, { useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements';

const StripeCheckoutForm = (props) => {

	const [name, setName] = useState('Sam');

	const handleSubmit = (ev) => {
		ev.preventDefault();
		if (props.stripe) {
			props.stripe
				.createToken({ name })
				.then((payload) => {
					console.log('[token]', payload);
					if (!payload.error)
						props.funcs._handleUDPayment(payload);
				});
			// What should i do with the stripe token? 
			// Probably i should just send it to our backend
			// Which endpoint? 
		} else {
			console.log("Stripe.js hasn't loaded yet.");
		}
	};

	return (
		<>
			<h1 className="card-title">Pay with credit card</h1>
			<form onSubmit={handleSubmit}
				className="form-group mt-3 p3 d-flex flex-column align-items-center">
				<div className="col-8 d-flex justify-content-md-center flex-column">
					<label >Name
						<input
							type="text"
							className="input-group my-1 p-2 border border-dark shadow"
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</label>
					<label>
						Card details
						<CardElement className="p-2 border border-dark"
						/>
					</label>
					<button className="btn btn-primary border border-dark shadow" onClick={handleSubmit}>Pay</button>
				</div>

			</form>

		</>

	)
}

export default injectStripe(StripeCheckoutForm);

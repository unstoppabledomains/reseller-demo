import React, { useState } from 'react'
import Footer from '../Layout/Footer';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';

const SecondStep = (props) => {

	const [email, setEmail] = useState('');
	const [valid, setValid] = useState(false);

	const { location: { state: { domain, owner, wallets } } } = props;

	const checkEmail = (email) => (/.+@.+\..+/.test(email));



	const _renderLeftHints = () => {
		return (
			<div className="Card">
				<h1>Email is required</h1>
				<div className="Card">
					<p>We need email of buyer.
						So later you could have a possibility to customize your marketing startegy.
					Check if user is owning a domain or not is possible because of this data</p>
				</div>
			</div>
		);
	}

	const _renderRightHints = () => (<div className="Card">
		<h1>Use already stored email</h1>
		<div className="Card">

			<p>Not the best idea to ask your user an email during the purchase process.
				You should use the one that is stored on your end instead of asking
			</p>
		</div>

	</div>);





	const _renderBody = () => (
		<div className="Secondstep">
			<div className="Card special">
				<div>
					<span className="Title">{domain.name}</span>
					<span className="Title">${domain.reselling.price}</span>
				</div>
			</div>
			<div>
				<input
					type="text"
					className="InputField"
					placeholder="Enter you email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setValid(checkEmail(e.target.value));
					}}
				/>
				<div style={{ marginTop: '10px' }}>
					{valid ?
						<Link to={{
							pathname: "/checkout",
							state: {
								email,
								domain,
								owner,
								wallets,
							}
						}}
						>
							<button className="PrimaryButton" style={{ width: '100%' }}>Next</button>
						</Link>
						: <button className="PrimaryButton" style={{ width: '100%' }} disabled>Next</button>
					}
				</div>
			</div>
		</div >
	);


	return (
		<>
			<div className="Hints">
				{_renderLeftHints()}
			</div>
			<div className="Wallet">
				<Header title="Enter email" step="2 / 3" {...props} />
				{_renderBody()}
				<div className="Action-space">
					<span className="Title">Learn more about .zil domains</span>
				</div>
				<Footer />
			</div >
			<div className="Hints">
				{_renderRightHints()}
			</div>
		</>
	)
}

export default SecondStep

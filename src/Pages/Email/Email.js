import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';

function Email(props) {

	const [email, setEmail] = useState('example@example.com');

	const checkEmail = (email) => !(/.+@.+\..+/.test(email));
	const [isValid, setIsValid] = useState(checkEmail(''));

	const _handleFormSubmit = () => {
		if (isValid)
			return props.history.push({
				pathname: '/checkout',
				state: {
					...props.location.state,
					email
				}
			});
	}

	const _renderAppScreen = () => (
		<div className="container-fluid">
			<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
				<CardHeader title="Enter email" />
				<div className="card-body" id="big">
					<div className="card">
						<div className="card-header">
							<div className="row justify-content-between">
								<div className="col-9">
									<h5 className="card-title">{props.location.state.domain.name}</h5>
								</div>
								<div className="col-3 d-flex justify-content-end">
									<h5 className="card-title">$ {props.location.state.domain.reselling.price}</h5>
								</div>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<form className="form-inline justify-content-md-center" onSubmit={_handleFormSubmit}>
								<p className="card-text">Please provide an email address</p>
								<input
									type="text"
									placeholder="Email"
									className="form-control-lg col-11"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										setIsValid(!checkEmail(e.target.value));
									}}
								/>
							</form>
						</div>
					</div>
					<div className="d-flex justify-content-md-center">
						<button
							type="submit" className="btn btn-primary col-6"
							onClick={_handleFormSubmit}
							disabled={!isValid}
							id="margin-top">Next


						</button>

					</div>
				</div>
				<AppFooter />
			</div>
		</div >
	)


	const _renderRightHints = () => (
		<div className="container-fluid">
			<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
				<div className="card-body">
					<h5 className="card-title">Hints</h5>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">Add new wallet</h5>
						</div>
						<div className="card-body">
							<p className="card-text">For testing purporses you can create a mock wallet by pressing plus button on top</p>
						</div>
					</div>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">Clean the list</h5>
						</div>
						<div className="card-body">
							<p className="card-text">You can erase all wallets created earlier by pressing reset button</p>
						</div>
					</div>

				</div>
			</div>
		</div >
	)






	if (!props.location.state) return <Redirect to="/" />

	return (
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
export default Email

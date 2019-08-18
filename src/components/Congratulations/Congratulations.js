import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { IconContext } from 'react-icons';

import Footer from '../Layout/Footer';
import { MdThumbUp } from 'react-icons/md';
import keys from '../../config';

const Congratulations = (props) => {


	const [isMined, setIsMined] = useState(false);
	console.log('congratulations got ', props);

	const { location: { state } } = props;
	useEffect(() => {
		if (!state) return <Redirect to="/" />;
		const { order: { orderNumber }, email } = state;
		async function _fetchBlockchainStatus() {
			if (isMined === true) return;
			const url = `https://unstoppabledomains.com/api/v1/resellers/udtesting/users/${email}/orders/${orderNumber}`
			const resp = await fetch(url, {
				method: "GET",
				headers: {
					"Authentication": `Bearer ${keys.token}`,
					"Content-Type": "application/json"
				}
			});
			const payload = await resp.json();
			if (resp.status === 200)
				setIsMined(payload.order.items[0].blockchain.status === 'MINED');
		}


		const interval = setInterval(_fetchBlockchainStatus, 5000);
		return () => clearInterval(interval);

	}, [isMined, setIsMined, state]);
	if (!state) return <Redirect to="/" />;
	const { order: { items, orderNumber }, email } = state;


	const _renderheader = () => (
		<div />
	);

	const _renderLinearSpinner = () => (
		<div className="spinner">
			<div className="bounce1"></div>
			<div className="bounce2"></div>
			<div className="bounce3"></div>
		</div>
	);

	const _renderResolution = () => {
		const { location: { state } } = props;
		if (!state) return null;
		console.log(state);
		const { request: { name, owner, resolution: { crypto } } } = state;
		console.log(crypto);
		const resolves = Object.keys(crypto).map((resKey, index) => <p key={index}>{resKey} => {crypto[resKey].address}</p>)
		return <div>{resolves}</div>

	}

	const _renderBody = () => (
		<div className="Card" id="fill">
			<div className="icon">
				<IconContext.Provider value={{
					style: {
						verticalAlign: 'middle',
						fontSize: '15em',
						padding: '0 0 0 10px',
						fontWeight: 'normal'
					}
				}}>
					<MdThumbUp />
				</IconContext.Provider>
			</div>
			<div className="text">
				<h1>Congratulations!</h1>
				<span> You own </span>
				{items.map(item => <span key={item.name}>{item.name}</span>)}
				<div>
					<p>Resolves to :</p>
					{isMined ?
						_renderResolution() : _renderLinearSpinner()}
				</div>
			</div>

			<Link to={{
				pathname: '/', state: {
					url: `https://unstoppabledomains.com/api/v1/resellers/udtesting/users/${email}/orders/${orderNumber}`,
					other: { ...props.location.state },
				}
			}}>
				<button className="PrimaryButton">Go back</button>
			</Link>
		</div>
	)


	return (
		<>
			{!props.location.state ? <Redirect to="/" /> : null}
			<div className="Wallet" style={{ background: "var(--wallet-lightbg-color) !important" }}>
				{_renderheader()}
				{_renderBody()}
				<div />
				<Footer />
			</div>

		</>
	)
}

export default Congratulations

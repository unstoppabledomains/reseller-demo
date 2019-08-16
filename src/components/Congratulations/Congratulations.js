import React, { useState, useEffect } from 'react';

import { IconContext } from 'react-icons';

import Footer from '../Layout/Footer';
import { MdThumbUp } from 'react-icons/md';
import keys from '../../config';

const Congratulations = (props) => {

	const { location: { state: { order: { items, subtotal, orderNumber }, email } } } = props;
	const [status, setStatus] = useState();
	const [isMined, setIsMined] = useState(false);
	console.log('congratulations got ', { items, subtotal, orderNumber, email });






	useEffect(() => {
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
			if (resp.status === 200) {
				setStatus(payload.order.items[0].blockchain.status);
				setIsMined(payload.order.items[0].blockchain.status === 'MINED');
			}
		}

		const interval = setInterval(_fetchBlockchainStatus, 5000);
		return () => clearInterval(interval);

	}, [email, orderNumber, setStatus, isMined, setIsMined]);

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

	const _renderBody = () => (
		<div>
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
				<div className="row">
					<p>Blockchain transaction status:</p>
					{isMined ? <span>Mined</span> : _renderLinearSpinner()}
				</div>
			</div>
			<button className="PrimaryButton">Link Wallets to your domain</button>
		</div>
	)


	return (
		<>
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

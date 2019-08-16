import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import WalletList from './WalletList';
import Footer from '../Layout/Footer';
import ReactJson from 'react-json-view';
import iconData from '../../styles/icons';

const Wallet = () => {

	let storedWallets = window.localStorage.getItem('wallets');
	if (!storedWallets) storedWallets =
		JSON.stringify([{
			name: "JohnnyCoin",
			shortcut: "JHC",
			address: "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf",
			price: "24.32",
			diff: "+5.90%"
		}]);

	const [wallets, setWallets] = useState(JSON.parse(storedWallets).map(wallet => ({ ...wallet, icon: iconData['default'] })));
	const [buyButton, setBuyButton] = useState(wallets.some(wallet => wallet.shortcut === 'ETH' || wallet.shortcut === 'ZIL'));
	const _checkBuyButton = (wallets) => setBuyButton(wallets.some(wallet => wallet.shortcut === 'ETH' || wallet.shortcut === 'ZIL'));

	const getOwner = () => {
		if (wallets.some(wallet => wallet.shortcut === 'ZIL')) {
			return wallets.find(wallet => wallet.shortcut === 'ZIL').address;

		} else if (wallets.some(wallet => wallet.shortcut === 'ETH'))
			return wallets.find(wallet => wallet.shortcut).address;
	};

	const owner = getOwner();

	const _getWallets = () => {

		const walletsToSend = {};

		wallets.forEach(wallet => {
			if (wallet.shortcut === 'ZIL' || wallet.shortcut === 'ETH')
				walletsToSend[wallet.shortcut] = { "address": wallet.address };
		})

		return {
			"resolution": {
				"crypto": walletsToSend
			}
		};
	}



	const _renderLeftHints = () => {
		return (
			<div className="Card">
				<h1>Create ZIL wallet</h1>
				<p>You need to have a ZIL or ETH wallet in your list to  buy a domain</p>
				<div className="Card">
					<ul style={{ paddingLeft: '15px' }}>
						<li>Click on the add new wallet button at the top</li>
						<li>Fill the form</li>
						<li>Don't change the address</li>
						<li>Submit is on the left</li>
					</ul>
				</div>
				<div className="Card">
					<p>If you want to clean the list press the reset button near the add new wallet</p>
				</div>
			</div>
		);
	}

	const _renderRightHints = () => (<div className="Card">
		<h1>Manage your wallets</h1>
		<div className="Card">
			<h5>Add new wallet</h5>
			<p>For testing purporses you can create a mock wallet by pressing plus button on top</p>
		</div>
		<div className="Card">
			<h5>Clean the list</h5>
			<p>You can erase all wallets created earlier by pressing reset button</p>
		</div>
	</div>);


	return (
		<>
			<div className="Hints">
				{_renderLeftHints()}
			</div>
			<div className="Wallet">
				<div />
				<WalletList wallets={wallets} setWallets={setWallets} check={_checkBuyButton} />
				<div className="Action-place">

					<div>
						{buyButton ?
							<Link to={
								{
									pathname: "/search",
									state: {
										owner,
										wallets: _getWallets()
									}
								}
							}><button className="PrimaryButton">BUY .ZIL DOMAINS</button></Link>
							: <h3>No ZIL or ETH wallet. Please add them to continue</h3>

						}
					</div>
				</div>
				<Footer />
			</div>
			<div className="Hints">
				{_renderRightHints()}
			</div>
		</>
	)
}

export default Wallet

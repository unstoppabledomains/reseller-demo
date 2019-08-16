import React, { useState } from 'react'
import WalletListField from './WalletListField';
import iconData from '../../styles/icons';

const WalletList = ({ wallets, setWallets, check }) => {
	const [showModal, setShowModal] = useState(false);
	const [name, setName] = useState('');
	const [shortcut, setShortcut] = useState('');
	const [address, setAddress] = useState('0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf');



	const _addNewWallet = (e) => {
		e.preventDefault();
		const update = [...wallets, { name, shortcut, address, diff: '-', icon: iconData['default'], price: 5 }]
		setWallets(update);
		window.localStorage.setItem('wallets', JSON.stringify(update));
		check(update);
		setShowModal(false);
	}



	const _renderDialog = () =>
		(
			<div className="modal">
				<div className="modal-inner">
					<span>Here is your form to add new wallet</span>
					<form onSubmit={() => _addNewWallet()}>
						<input type="text" name="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
						<input type="text" name="shortcut" placeholder="shortcut" value={shortcut} onChange={(e) => setShortcut(e.target.value)} />
						<input type="text" name="address" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
						<div className="buttonDecisionSpot">
							<button onClick={() => setShowModal(false)}>Cancel</button>
							<button onClick={_addNewWallet} type="submit">submit</button>
						</div>
					</form>
				</div>
			</div >
		)


	const _reset = () => {
		window.localStorage.clear();
		window.location.reload();
	}

	return (
		<div className="WalletList">
			{showModal ? _renderDialog() :
				<>
					<div className="TopPanel">
						<span className="Title">Wallets</span>
						<button onClick={() => setShowModal(true)}>Add new wallet</button>
						<button onClick={() => _reset()}>Reset</button>
					</div>
					<div className="list">
						{wallets.map((data, index) => <WalletListField {...data} key={index} />)}
					</div>
					<hr />
				</>
			}

		</div>
	)
}

export default WalletList

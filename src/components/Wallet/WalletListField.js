import React from 'react'


const WalletListField = ({ name, shortcut, price, diff, icon: Icon }) => {
	return (
		<div className="WalletListField">
			<div className="icon">{Icon ? <Icon /> : ''}</div>
			<div className="description">
				<span>{name}</span>
				<span>{shortcut}</span>
			</div>
			<div className="graph"></div>
			<div className="price">
				<span>$ {price}</span>
				<span>{diff}</span>
			</div>
		</div>
	)
}

export default WalletListField

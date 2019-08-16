import React from 'react'
import { withRouter } from 'react-router';
import { MdHome, MdFolderOpen, MdCrop, MdDehaze } from 'react-icons/md';

const Footer = (props) => {
	return (
		<div className="footer">
			<MdHome onClick={() => props.history.push('/')} />
			<MdFolderOpen />
			<MdCrop />
			<MdDehaze />
		</div>
	)
}

export default withRouter(Footer)

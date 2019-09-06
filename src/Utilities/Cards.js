import React from 'react';
import { MdHome, MdFolderOpen, MdCrop, MdDehaze } from 'react-icons/md';

const CardHeader = ({ title, secondLine }) => (
	<div className="card-header main-bg d-flex justify-content-between">
		<h5 className="card-title">{title}</h5>
		{secondLine ? secondLine() : null}
	</div>
);

const AppFooter = () => (
	<div className="card-footer d-flex justify-content-around" id="FooterIcons">
		<MdHome />
		<MdFolderOpen />
		<MdCrop />
		<MdDehaze />
	</div>
)


export {
	CardHeader,
	AppFooter
}
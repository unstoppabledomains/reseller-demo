import React from 'react';
import { MdHome, MdFolderOpen, MdCrop, MdDehaze } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CardHeader = ({ title, secondLine }) => (
	<div className="card-header main-bg">
		<h5 className="card-title">{title}</h5>
		{secondLine ? secondLine() : null}
	</div>
);

const AppFooter = () => (
	<div className="card-footer d-flex justify-content-around" id="FooterIcons">
		<Link to="/reseller-demo/"><MdHome /></Link>
		<MdFolderOpen />
		<MdCrop />
		<MdDehaze />
	</div>
)


export {
	CardHeader,
	AppFooter
}
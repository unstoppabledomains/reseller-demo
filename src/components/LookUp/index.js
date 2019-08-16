import React from 'react'
import Search from './Search';
import Footer from '../Layout/Footer';

import Header from '../Layout/Header';
import ReactJson from 'react-json-view';

const endpointData = [
	{
		url: 'api/v1/resellers/?udtesting?/domains/?domain-name?.zil'
	}
]



const LookUp = (props) => {


	const _renderLeftHints = () => {
		const baseURL = 'https://unstoppabledomains.com/api/v1';

		return (
			<div className="Card">
				<h1>API calls</h1>
				<div className="Card">
					<h5>BaseURL:</h5>
					<p style={{ fontSize: '1.0em' }}>{baseURL}</p>
				</div>
				<div className="Card center">
					<div className="apiexample">
						<span>/resellers/</span>
						<span className="accent">resseler-id</span>
						<span>/domains</span>
						<span className="accent">/domain-name</span>
						<span>.zil</span>
					</div>
					<div className="points">
						<ul>
							<li>Method: GET</li>
							<li>Response:
							<ReactJson src={
									{
										domain: {
											"name": "bogdantest.zil",
											"owner": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf",
											"reselling": null,
											"auction": null
										}
									}
								}
									collapsed={true}
									displayDataTypes={false}
									indentWidth={1}
									collapseStringsAfterLength={10}
									displayObjectSize={false}
								/>
							</li>
							<li>Errors:
								<ReactJson src={{
									"errors": [
										{
											"code": "DOMAIN_NAME_INVALID",
											"message": "Domain name is invalid"
										}
									]
								}}
									collapsed={true}
									displayDataTypes={false}
									indentWidth={1}
									collapseStringsAfterLength={20}
									displayObjectSize={false}
								/>

							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	const _renderRightHints = () => (<div className="Card">
		<h1>Domain Pattern</h1>
		<div className="Card">
			<h5>Test domain name space</h5>
			<p style={{ fontSize: '1.0em' }}>For testing purporses please use folowing name conventions</p>
			<code>[reseller-test-udtesting]-[any number].zil</code>
			<p style={{ fontSize: '1.0em' }}>Ex.</p>
			<code>reseller-test-udtesting-85328.zil</code>
		</div>
	</div>);

	return (
		<>
			<div className="Hints">
				{_renderLeftHints()}
			</div>
			<div className="Wallet">
				<Header text="Buy .zil domains" step="1 / 3" {...props} />
				<Search owner={props.location.state.owner} wallets={props.location.state.wallets} />
				<div className="Action-space">
					<span className="Title">Learn more about .zil domains</span>
				</div>
				<Footer />
			</div>
			<div className="Hints">
				{_renderRightHints()}
			</div>
		</>
	)
}

export default LookUp

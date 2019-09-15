import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import config from '../../config';
import ReactJson from 'react-json-view';

const renderArrowDown = () => <div className="arrow-bounce bigger">
	<img width="40" height="40" alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yODUsMTEuMjg0TDE2LDE5LjU3MWwtOC4yODUtOC4yODhjLTAuMzk1LTAuMzk1LTEuMDM0LTAuMzk1LTEuNDI5LDAgIGMtMC4zOTQsMC4zOTUtMC4zOTQsMS4wMzUsMCwxLjQzbDguOTk5LDkuMDAybDAsMGwwLDBjMC4zOTQsMC4zOTUsMS4wMzQsMC4zOTUsMS40MjgsMGw4Ljk5OS05LjAwMiAgYzAuMzk0LTAuMzk1LDAuMzk0LTEuMDM2LDAtMS40MzFDMjUuMzE5LDEwLjg4OSwyNC42NzksMTAuODg5LDI0LjI4NSwxMS4yODR6IiBmaWxsPSIjMTIxMzEzIiBpZD0iRXhwYW5kX01vcmUiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4=" />
</div>

const baseURL = 'https://unstoppabledomains.com/api/v1/resellers';

const Search = (props) => {
	const [userInput, setUserInput] = useState(`reseller-test-${config.reseller}-${Math.floor(Math.random() * 502562)}.zil`);
	const [results, setResults] = useState(null);
	const [spinner, setSpinner] = useState(false);
	const [ownDomains, setOwnDomains] = useState(JSON.parse(localStorage.getItem('own_domain')));
	const [isMined, setIsMined] = useState(false);

	useEffect(() => {
		if (!ownDomains || ownDomains.mined) return;
		const { orderNumber, email } = ownDomains.config;

		async function _fetchBlockchainStatus() {
			const url = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders/${orderNumber}`
			try {
				const resp = await fetch(url, {
					method: "GET",
					headers: {
						"Authentication": `Bearer ${config.token}`,
						"Content-Type": "application/json"
					}
				});
				const payload = await resp.json();
				if (resp.status === 200) {
					const mineResult = payload.order.items[0].blockchain.status === 'MINED';
					setIsMined(mineResult);
					setOwnDomains({ ...ownDomains, mined: mineResult });
					localStorage.setItem('own_domain', JSON.stringify({ ...ownDomains, mined: mineResult }));
				}
			} catch (err) { console.error(err) }
		}
		const interval = setInterval(_fetchBlockchainStatus, 5000);
		return () => clearInterval(interval);
	}, [isMined, ownDomains]);

	const owner = "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf";
	const _renderHints = () => (
		<div >
			<div className="card" style={{ width: "40rem", minHeight: "40rem" }}>
				<div className="card-body">
					<h5 className="card-title">Hints</h5>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">ZIL or ETH address required</h5>
						</div>
						<div className="card-body">
							<p className="card-text">You need to have a ZIL or ETH wallet in your list to  buy a domain</p>
						</div>
					</div>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">Reseller ID</h5>
						</div>
						<div className="card-body">
							<h5 className="card-title">Get your id and API token from UD team</h5>
							<p className="card-text">You will need to use your API ID instead of hardcoded udtesting in examples above. You can the API ID and token from UD integration team</p>
						</div>
					</div>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">Base URL</h5>
						</div>
						<div className="card-body">
							<p className="card-text">
								{baseURL}
							</p>
						</div>
					</div>
					<div className="card" id="list-field">
						<div className="card-header">
							<h5 className="card-title">API Calls</h5>
						</div>
						<div className="card-body">
							<div className="card" id="list-field">
								<div className="card-header">
									<p className="card-text">
										/resellers/<code>reseller-id</code>/domains<code>/domain-name</code>.zil
									</p>
								</div>
								<div className="card-body">
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
					</div>
				</div>
			</div>
		</div >
	)

	const fetchDomain = (url) => {
		return fetch(url, {
			headers: {
				Authentication: `Bearer ${config.token}`,
			},
		}).then(res => res.json()).then(answer => {
			const regextTestpattern = /[reseller-test-udtesting-]+\d+[.zil]+/;
			return ({ ...answer, testNameSpace: regextTestpattern.test(answer.domain.name) });
		});
	}

	const _handleFormSubmit = async (e) => {
		e.preventDefault();
		setResults(null);
		const regexTLDpattern = /[.]\w{3}$/;

		const domain = !regexTLDpattern.test(userInput) ? `${userInput}.zil` : userInput;
		setSpinner(true);
		const result = await fetchDomain(`${baseURL}/${config.reseller}/domains/${domain}`)
		setResults({ ...result });
		setSpinner(false);
	}

	const _renderErrors = () => (
		<div className="card" id="big">
			<div className="card-header">
				<h5 className="card-title">Error</h5>
			</div>
			<div className="card-body">
				{results.errors.map((error, index) => <p className="card-text" key={index}>{error.message}</p>)}
			</div>
		</div>
	)

	const _renderResolution = (addresses) =>
		Object.keys(addresses).map((coin, index) => <p className="card-text" key={index}>{coin} => {addresses[coin]}</p>)

	const _renderResult = () => {

		if (results.errors != null)
			return _renderErrors();

		const { domain } = results;
		console.log(results);
		if (domain && domain.resolve) {
			return (
				<div className="card" id="big">
					<div className="card-header">
						<h5 className="card-title">{domain.name} is already taken </h5>
					</div>
					<div className="card-body">
						<h6 className="card-subtitle">It resolves to:</h6>
						{_renderResolution(domain.resolve.addresses)}
					</div>
				</div>
			)
		}



		if (domain && !domain.reselling) {
			return (
				<div className="card" id="big">
					<div className="card-header">
						<h5 className="card-title">{domain.name}</h5>
					</div>
					<div className="card-body">
						<h6 className="card-subtitle">Domain is not available</h6>
					</div>
				</div>
			);
		}
		console.log({
			state: {
				// ...props.location.state,
				...results,
				owner
			}
		});
		return (
			<div className="card" id="big">
				<div className="card-header">
					<div className="row">
						<div className="col-9">
							<h5 className="card-title">{domain.name}</h5>
							<h6 className="card-subtitle text-success">Domain is available</h6>
							<h6 className="card-subtitle mt-1 text-danger">{!results.testNameSpace ? 'THIS IS A LIVE DOMAIN, YOU WILL BE CHARGED AT THE END' : null}</h6>
						</div>
						<div className="col-3 d-flex justify-content-end">
							<h5 className="card-title">$ {domain.reselling && domain.reselling.price}</h5>
						</div>
					</div>
				</div>
				<div className="card-body d-flex justify-content-md-center">
					<Link to={{
						pathname: "/email",
						state: {
							...props.location.state,
							...results,
							owner
						}
					}} style={{ width: '50%' }} >
						<button type="button" className="btn btn-primary btn-md" style={{ width: '100%' }}>BUY</button>
					</Link>
				</div>
			</div>

		);
	}

	const _renderSpinner = () => <div className="loader">Searching...</div>;


	const _renderOwnerShipStatus = () => {
		const _renderProgressBar = () => (
			<div className="progress">
				<div className="progress-bar" role="progressbar" style={{ width: "50%" }}
					aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
			</div>
		);

		return (
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{ownDomains.domains[0].name}</h5>
					<p className="card-text">Blockchain status: {ownDomains.mined ? 'MINED' : 'MINING...'} </p>
					{
						ownDomains.mined ? <button
							className="btn btn-primary btn-md"
							onClick={() => {
								setOwnDomains(null);
								return localStorage.clear();
							}
							}
						>Forget about it</button> : _renderProgressBar()
					}
				</div>
			</div>
		);
	}


	const _renderSendButton = () => (
		<button
			className="btn btn-md btn-primary"
			onClick={(e) => {
				return (props.history.push('/send'));
			}}
		>
			Send</button>
	);

	const _renderAppScreen = () => {
		return (
			<div className="container-fluid">
				<div className="card" style={{ width: "45rem", minHeight: "40rem" }}>
					<CardHeader title="Buy .ZIL domain" secondLine={_renderSendButton} />
					<div className="card-body d-flex flex-column justify-content-between">
						<div className="card-fluid">
							<form className="form-inline " onSubmit={_handleFormSubmit}>
								<div className="form-group col-sm-12" id="my-form">
									<div className="container-fluid d-flex justify-content-md-center">
										<input
											type="text"
											placeholder="Choose your domain name, wisely"
											className="form-control-lg col-11"
											value={userInput}
											onChange={(e) => setUserInput(e.target.value)}
										/>
										<button type="submit" className="btn btn-primary btn-lg m-0 ml-1">Search</button>
									</div>
									<small id="passwordHelpBlock" className="form-text text-muted">
										*For this demo use this domain namespace <code>reseller-test-{config.reseller}-[random number].zil</code>
									</small>
								</div>
							</form>
						</div>
						{spinner ? _renderSpinner() : null}
						{results ? _renderResult() : null}
						{ownDomains ? _renderOwnerShipStatus() :
							<div className="row justify-content-md-center">
								<h4 className="card-subtitle">Learn more about .ZIL domain</h4>
							</div>
						}
					</div>
					<AppFooter />
				</div>
			</div >
		)
	}

	return (
		<>
			<div className="row justify-content-md-center flex-nowrap mt-5">
				<div className="col-lg-fluid">
					<div className="container">
						{_renderAppScreen()}
					</div>
				</div>

			</div>
			<div className="row justify-content-md-center flex-nowrap mt-5 mb-5">
				<div className="col-lg-fluid">
					{renderArrowDown()}
				</div>
			</div>
			<div className="row justify-content-md-center flex-nowrap mt-5">
				<div className="col-lg-fluid">
					<div className="container">
						{_renderHints()}
					</div>
				</div>
			</div>
		</>
	)
}

export default Search

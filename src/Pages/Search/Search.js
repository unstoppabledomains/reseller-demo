import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import {
	Paper,
	Typography,
	Divider,
	Input,
	Button,
	Grid
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LiveIcon from '@material-ui/icons/NewReleases';
import InputBase from '@material-ui/core/InputBase';
import { Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/search.styles';
import config from '../../config';
import ReactJson from 'react-json-view';
import Pointer from '../../Utilities/Pointer';

const renderArrowDown = () => (
	<div className="arrow-bounce bigger">
		<img
			width="40"
			height="40"
			alt=""
			src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yODUsMTEuMjg0TDE2LDE5LjU3MWwtOC4yODUtOC4yODhjLTAuMzk1LTAuMzk1LTEuMDM0LTAuMzk1LTEuNDI5LDAgIGMtMC4zOTQsMC4zOTUtMC4zOTQsMS4wMzUsMCwxLjQzbDguOTk5LDkuMDAybDAsMGwwLDBjMC4zOTQsMC4zOTUsMS4wMzQsMC4zOTUsMS40MjgsMGw4Ljk5OS05LjAwMiAgYzAuMzk0LTAuMzk1LDAuMzk0LTEuMDM2LDAtMS40MzFDMjUuMzE5LDEwLjg4OSwyNC42NzksMTAuODg5LDI0LjI4NSwxMS4yODR6IiBmaWxsPSIjMTIxMzEzIiBpZD0iRXhwYW5kX01vcmUiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4="
		/>
	</div>
);

const baseURL = 'https://unstoppabledomains.com/api/v1/resellers';

const Search = ({
	classes,
	history,
	step,
	handleNextStep,
	handlePrevstep,
	domainName,
	showPointer,
	setEmailProps
}) => {
	const [userInput, setUserInput] = useState(domainName);
	const [results, setResults] = useState(null);
	const [spinner, setSpinner] = useState(false);
	const [ownDomains, setOwnDomains] = useState(
		JSON.parse(localStorage.getItem('own_domain'))
	);
	const [isMined, setIsMined] = useState(false);

	useEffect(() => {
		setUserInput(domainName);
	}, [domainName]);

	useEffect(() => {
		if (!ownDomains || ownDomains.mined) return;
		const { orderNumber, email } = ownDomains.config;

		async function _fetchBlockchainStatus() {
			const url = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders/${orderNumber}`;
			try {
				const resp = await fetch(url, {
					method: 'GET',
					headers: {
						Authentication: `Bearer ${config.token}`,
						'Content-Type': 'application/json'
					}
				});
				const payload = await resp.json();
				if (resp.status === 200) {
					const mineResult =
						payload.order.items[0].blockchain.status === 'MINED';
					setIsMined(mineResult);
					setOwnDomains({ ...ownDomains, mined: mineResult });
					localStorage.setItem(
						'own_domain',
						JSON.stringify({ ...ownDomains, mined: mineResult })
					);
				}
			} catch (err) {
				console.error(err);
			}
		}
		const interval = setInterval(_fetchBlockchainStatus, 5000);
		return () => clearInterval(interval);
	}, [isMined, ownDomains]);

	const handleBuyDomain = () => {
		setEmailProps({
			// ...location.state,
			...results,
			owner
		});
		handleNextStep();
	};

	const owner = '0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf';

	const formatDomainName = domain => {
		const split = domain.split('.');
		return (
			<>
				<b>{split[0]}</b>.{split[1]}
			</>
		);
	};

	const fetchDomain = url => {
		return fetch(url, {
			headers: {
				Authentication: `Bearer ${config.token}`
			}
		})
			.then(res => res.json())
			.then(answer => {
				const regextTestpattern = /[reseller-test-udtesting-]+\d+[.zil]+/;
				return {
					...answer,
					testNameSpace: regextTestpattern.test(answer.domain.name)
				};
			});
	};

	const _handleFormSubmit = async e => {
		e.preventDefault();
		setResults(null);
		const regexTLDpattern = /[.]\w{3}$/;

		const domain = !regexTLDpattern.test(userInput)
			? `${userInput}.zil`
			: userInput;
		setSpinner(true);
		const result = await fetchDomain(
			`${baseURL}/${config.reseller}/domains/${domain}`
		);
		setResults({ ...result });
		console.log({ domain, result });
		setSpinner(false);
	};

	const _renderErrors = () => (
		<>
			<div className={classes.result}>
				<div className={classes.row}>
					<Typography variant="body1">{formatDomainName(userInput)}</Typography>
				</div>
			</div>
		</>
	);

	const _renderErrors_old = () => (
		<div className="card" id="big">
			<div className="card-header">
				<h5 className="card-title">Error</h5>
			</div>
			<div className="card-body">
				{results.errors.map((error, index) => (
					<p className="card-text" key={index}>
						{error.message}
					</p>
				))}
			</div>
		</div>
	);

	const _renderResolution = addresses =>
		Object.keys(addresses).map((coin, index) => (
			<p className="card-text" key={index}>
				{coin} => {addresses[coin]}
			</p>
		));

	const _renderResult = () => {
		if (results.errors != null) return _renderErrors();

		const { domain } = results;

		const _renderNotAvailableView = () => <div className={classes.notAvailable}>
			<div className={classes.row}>
				<Typography variant="body1">
					{formatDomainName(domain.name)}
				</Typography>
			</div>
			<Typography variant="body1" color="textSecondary">Domain is not available</Typography>
		</div>;

		console.log(results);
		if (domain && !domain.reselling) {
			return _renderNotAvailableView();
		}
		if (step === 0) handleNextStep();
		return (
			<>
				<div className={classes.result}>
					<div className={classes.row}>
						<Typography variant="body1">
							{formatDomainName(domain.name)}
						</Typography>
						<Typography
							variant="body1"
							color="primary"
							className={classes.bold}
						>
							${domain.reselling && domain.reselling.price}.00
            </Typography>
					</div>
					<Typography variant="body2" className={`${classes.label}`}>
						Domain is available
          </Typography>
					{!domain.reselling.test ? (
						<>
							<Divider />
							<div className={`${classes.row} ${classes.warningMargin}`}>
								<LiveIcon color="error" />
								<Typography variant="body1" color="error" className={`${classes.warningLabel}`}>
									THIS IS A LIVE DOMAIN, YOU WILL BE CHARGED AT THE END
								</Typography>
							</div>
						</>
					) : null}
					<Button
						variant="contained"
						color="primary"
						className={`${classes.button} ${classes.bold} ${classes.wideButton}`}
						classes={{ label: classes.buttonLabel, root: classes.noOutline }}
						onClick={() => handleBuyDomain()}
					>
						BUY DOMAIN
          </Button>
					{step === 1 && showPointer ? (
						<div style={{ position: 'fixed', transform: 'translateX(208px)' }}>
							<Pointer />
						</div>
					) : null}
				</div>
			</>
		);
	};

	const _renderSpinner = () => <div className="loader">Searching...</div>;

	const _renderOwnerShipStatus = () => {
		const _renderProgressBar = () => (
			<div className="progress">
				<div
					className="progress-bar"
					role="progressbar"
					style={{ width: '50%' }}
					aria-valuenow="50"
					aria-valuemin="0"
					aria-valuemax="100"
				>
					50%
        </div>
			</div>
		);

		return (
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{ownDomains.domains[0].name}</h5>
					<p className="card-text">
						Blockchain status: {ownDomains.mined ? 'MINED' : 'MINING...'}{' '}
					</p>
					{ownDomains.mined ? (
						<button
							className="btn btn-primary btn-md"
							onClick={() => {
								setOwnDomains(null);
								return localStorage.clear();
							}}
						>
							Forget about it
            </button>
					) : (
							_renderProgressBar()
						)}
				</div>
			</div>
		);
	};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h5" className={classes.bold}>
				Buy .ZIL domain
      </Typography>
			<Typography variant="subtitle1" className={classes.text}>
				Find .zil Domain
      </Typography>
			<div className={classes.inputContainer}>
				{step === 0 && showPointer ? (
					<div style={{ position: 'fixed', transform: 'translateX(-40px)' }}>
						<Pointer />
					</div>
				) : null}
				<InputBase
					fullWidth
					className={classes.input}
					value={userInput}
					onChange={e => setUserInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' ? _handleFormSubmit(e) : null}
				/>
				<Button
					variant="contained"
					color="primary"
					className={`${classes.button} ${classes.bold}`}
					classes={{ label: classes.buttonLabel }}
					onClick={_handleFormSubmit}
					disabled={!userInput}
				>
					<SearchIcon />
					Search
        </Button>
			</div>
			{spinner ?
				<div className={classes.center}>
					<CircularProgress />
				</div>
				: null}
			{results ? _renderResult() : null}
		</Paper>
	);
};

export default withStyles(styles)(Search);

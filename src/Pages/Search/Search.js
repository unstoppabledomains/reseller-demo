import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import LiveIcon from '@material-ui/icons/NewReleases';
import InputBase from '@material-ui/core/InputBase';
import { Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/search.styles';
import config from '../../config';
import Pointer from '../../Utilities/Pointer';


const baseURL = 'https://unstoppabledomains.com/api/v1/resellers';

const Search = ({
	classes,
	history,
	step,
	owner,
	setOwner,
	handleNextStep,
	handlePrevstep,
	domainName,
	showPointer,
	setEmailProps,
	setDomainResults
}) => {
	const [userInput, setUserInput] = useState(domainName);
	const [results, setResults] = useState(null);
	const [spinner, setSpinner] = useState(false);
	const [ownDomains, setOwnDomains] = useState(
		JSON.parse(localStorage.getItem('own_domain'))
	);
	const [isMined, setIsMined] = useState(false);
	console.log({ ownDomains });
	useEffect(() => {
		if (results && results.domain.reselling && !results.domain.reselling.test)
			setOwner('');
	}, [results, setOwner])

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
			.then(res => res.json());
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
		setDomainResults({ ...result });
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

	const _renderResult = () => {
		if (results.errors != null) return _renderErrors();

		const { domain } = results;

		const _renderNotAvailableView = () => (
			<div className={classes.notAvailable}>
				<div className={classes.row}>
					<Typography variant="body1">
						{formatDomainName(domain.name)}
					</Typography>
				</div>
				<Typography variant="body1" color="textSecondary">
					Domain is not available
        </Typography>
			</div>
		);

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
								<Typography
									variant="body1"
									color="error"
									className={`${classes.warningLabel}`}
								>
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
					onKeyDown={e => (e.key === 'Enter' ? _handleFormSubmit(e) : null)}
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
			{spinner ? (
				<div className={classes.center}>
					<CircularProgress />
				</div>
			) : null}
			{results ? _renderResult() : null}
			{ownDomains ?
				<div className={classes.storageDiv}>
					<Typography variant="h5" className={`${classes.bold}`}>Order status:</Typography>
					<div className={classes.row}>
						<Typography variant="body1">{ownDomains.domains[0].name}:</Typography>
						{isMined ? <Typography variant="h5" className={classes.bold}>Mined</Typography> :
							<LinearProgress className={classes.linearProgress} />}
					</div>
				</div>
				: null}
		</Paper>
	);
};

export default withStyles(styles)(Search);

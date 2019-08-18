import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import keys from '../../config';
import errors from '../../config/errors.json';


const baseURL = 'https://unstoppabledomains.com/api/v1/resellers'


const fetchDomain = (url) => {
	return fetch(url, {
		headers: {
			Authentication: `Bearer ${keys.token}`
		},
	}).then(res => res.json())
}

const Search = (props) => {
	const [userInput, setUserInput] = useState('');
	const [results, setResults] = useState(null);
	const [spinner, setSpinner] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const regexTLDpattern = /[.]\w{3}$/;
		const domain = !regexTLDpattern.test(userInput) ? `${userInput}.zil` : userInput;
		setSpinner(true);
		const result = await fetchDomain(`${baseURL}/${keys.reseller}/domains/${domain}`);
		console.log(`${baseURL}/${keys.reseller}/domains/${domain}`);
		setResults({ ...result });
		setSpinner(false);
	};

	const _renderSearchBar = () => {

		return (<form onSubmit={e => handleSubmit(e)}>
			<input
				type="text"
				name="domain"
				value={userInput}
				className="InputField"
				style={{ width: '85%' }}
				onChange={(e) => setUserInput(e.target.value)}
				placeholder="Search domain"
			/>
			<div onClick={e => handleSubmit(e)}>
				<MdSearch />
			</div>
		</form>)
	}

	const _renderErrors = (results) => {
		const name = results.domain.name;
		if (results.error) {
			return results.errors.map((error, index) => <h1 key={index}>{errors[error.code]}</h1>)
		} else
			return (
				<>
					<h1>{name}</h1>
					<p>Domain is invalid or already taken</p>
				</>
			);
	}

	const _renderResults = () => (
		<div className="Results">
			<span className="Title" >Results</span>
			<div className="Card" style={{ alignSelf: 'center' }}>
				<div className="description">
					{results && results.domain && results.domain.reselling ?
						<>
							<div className="left">
								<h1>{results.domain.name}</h1>
								<h4>Domain is available</h4>
							</div>
							<div className="right">
								<h1>${results.domain.reselling.price}</h1>
							</div>
						</>
						: _renderErrors(results)
					}
				</div>
				{results && results.domain && results.domain.reselling ?
					<div className="Action-buy">
						<div>
							<Link to={{
								pathname: "/second-step",
								state: {
									domain: results.domain,
									owner: props && props.owner,
									wallets: props && props.wallets,
								}
							}}><button className="PrimaryButton" disabled={results.errors && results.errors.length() < 1}>BUY</button></Link>
						</div>

					</div>
					: null
				}
			</div>
		</div>
	)


	const _spinner = () => <div className="loader">Searching...</div>

	return (

		<div className="Search">
			<div className="Card">
				{_renderSearchBar()}
			</div>
			{spinner ? _spinner() : null}
			{!results || spinner ? null : _renderResults()}
		</div >
	)

}

export default Search

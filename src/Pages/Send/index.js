import React, { useState, useEffect } from 'react';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import { Link } from 'react-router-dom';
import Namicorn from 'namicorn';
import config from '../../config';

const namicorn = new Namicorn();

const Send = props => {
  const owner = '0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf';
  const [selectedTicker, setTicker] = useState('BTC');
  const [userInput, setUserInput] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState('');
  const [canResell, setCanResell] = useState(false);
  const [resellErrors, setResellErrors] = useState();

  useEffect(() => {
    _resolve(userInput);
    // return () => {};
    // eslint-disable-next-line
  }, [userInput, selectedTicker]);

  const _renderBack = () => {
    return (
      <button
        className="btn btn-md btn-primary"
        onClick={e => props.history.push('/')}
      >
        Back
      </button>
    );
  };

  const _generateCurrencyList = () => {
    const currency = ['BTC', 'ETH', 'ZIL', 'LLC', 'SUV'];

    return currency.map((ticker, index) => (
      <button
        className="dropdown-item"
        key={index}
        onClick={e => {
          setTicker(ticker);
        }}
      >
        {ticker}
      </button>
    ));
  };

  const _handleSubmit = e => {
    e.preventDefault();
    _resolve(userInput);
    console.log('Sending money.... Pff, gone!');
  };

  const _checkForErrors = domain => {
    return (
      domain.indexOf('.') > 0 &&
      /^((?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}\.)*(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/.test(
        domain
      )
    );
  };

  const _resolve = async domain => {
    if (!domain) setResolvedAddress('');
    if (_checkForErrors(domain)) {
      const resolution = await namicorn.resolve(domain);
      console.log({ resolution });
      if (resolution.meta.owner) {
        console.log({ selectedTicker });

        const address = resolution.addresses[selectedTicker];
        console.log(address ? address : 'NOT_FOUND');
        setResolvedAddress(address ? address : 'NOT_FOUND');
      } else {
        const canBuy = await _collectState();
        console.log('canBuy = ', canBuy);
        if (canBuy && canBuy.domain && canBuy.domain.reselling)
          setCanResell(canBuy);
        else setCanResell(false);
        if (canBuy && canBuy.errors) setResellErrors(canBuy.errors);
        else setResellErrors(null);

        setResolvedAddress('NO_OWNER');
      }
    } else {
      setResolvedAddress('INVALID_DOMAIN');
    }
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
        console.log('answer = ', answer);
        if (answer && answer.domain)
          return {
            ...answer,
            testNameSpace: regextTestpattern.test(answer.domain.name)
          };

        return answer;
      });
  };

  const _resolveDomain = async e => await _resolve(e.target.value);

  const _collectState = () => {
    const baseURL = 'https://unstoppabledomains.com/api/v1/resellers';
    const apiurl = `${baseURL}/${config.reseller}/domains/${userInput}`;
    return fetchDomain(apiurl);
  };

  const _renderHint = () => {
    if (!resolvedAddress)
      return <small>*Specify correct address or .zil domain</small>;
    if (resolvedAddress === 'NOT_FOUND')
      return (
        <small className="text-danger">
          No {selectedTicker} address is registered under this domain
        </small>
      );
    if (resolvedAddress === 'NO_OWNER')
      return (
        <>
          {resellErrors ? (
            resellErrors.map((error, index) => (
              <small key={index} className="text-danger">
                {error.message}
              </small>
            ))
          ) : (
            <small className="text-warning">
              Domain is not taken
              {canResell ? (
                <Link
                  to={{
                    pathname: '/email',
                    state: {
                      ...canResell,
                      owner
                    }
                  }}
                >
                  <button className="linklike">(buy this domain)</button>
                </Link>
              ) : (
                ' and it is unavailable at the moment'
              )}
            </small>
          )}
        </>
      );
    if (resolvedAddress === 'INVALID_DOMAIN')
      return (
        <small className="text-danger">Domain is invalid or unavailable</small>
      );
    return (
      <small className="text-success">
        Resolved Address: {resolvedAddress}
      </small>
    );
  };

  const _renderAppScreen = () => (
    <div className="container-fluid">
      <div className="card" style={{ width: '45rem', minHeight: '40rem' }}>
        <CardHeader title="Wallets" secondLine={_renderBack} />
        <div className="card-body">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <div className="row justify-content-between p-3">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Choose the currency
                  </button>
                  <div className="dropdown-menu">{_generateCurrencyList()}</div>
                  <h1 className="">{selectedTicker}</h1>
                </div>
              </div>
              <form onSubmit={_handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="reciever"
                    placeholder="To"
                    onBlur={_resolveDomain}
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                  />
                  {_renderHint()}
                </div>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        $
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="reciever"
                      placeholder="Amount"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    rows="6"
                    className="form-control"
                    id="reciever"
                    placeholder="Message (Optional)"
                  />
                </div>
                <Link to="/">
                  <button className="btn btn-primary btn-block" type="submit">
                    Send
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );

  return (
    <>
      <div className="row justify-content-md-center flex-nowrap mt-5">
        <div className="col-lg-fluid">
          <div className="container">{_renderAppScreen()}</div>
        </div>
      </div>
    </>
  );
};

export default Send;

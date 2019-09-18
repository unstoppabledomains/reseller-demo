import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import keys from '../../../config';
import { CardHeader, AppFooter } from '../../../Utilities/Cards';

const Finish = props => {
  const { state: propstate } = props.location;

  const [isMined, setIsMined] = useState(false);
  useEffect(() => {
    if (!propstate) return;
    const {
      order: { orderNumber },
      email
    } = propstate;
    async function _fetchBlockchainStatus() {
      if (isMined === true) return;
      const url = `https://unstoppabledomains.com/api/v1/resellers/${keys.reseller}/users/${email}/orders/${orderNumber}`;
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Authentication: `Bearer ${keys.token}`,
          'Content-Type': 'application/json'
        }
      });
      const payload = await resp.json();
      if (resp.status === 200) {
        const mineResult = payload.order.items[0].blockchain.status === 'MINED';
        setIsMined(mineResult);
        const storage = JSON.parse(localStorage.getItem('own_domain'));
        storage.mined = mineResult;
        localStorage.setItem('own_domain', JSON.stringify(storage));
      }
    }
    const interval = setInterval(_fetchBlockchainStatus, 5000);
    return () => clearInterval(interval);
  }, [isMined, setIsMined, propstate]);

  const _renderCongratulationScreen = () => (
    <div className="card d-flex align-items-md-center">
      <img
        src="https://www.freeiconspng.com/uploads/youtube-like-png-14.png"
        className="card-img-top col-6"
        alt="Ok"
      />
      <div className="card-body">
        <h3 className="card-title">Congratulations!</h3>
        <h5 className="card-subtitle text-center">You own</h5>
        {propstate.order.items.map(item => (
          <span key={item.name}>{item.name}</span>
        ))}
      </div>
    </div>
  );

  const _renderSpinner = () => <div className="loader">Searching...</div>;

  const _renderStatusCheck = () => (
    <div className="card d-flex align-items-md-center">
      <div className="card-body">
        <h1 className="card-title">Order status:</h1>
        <p className="card-text">
          Blockchain transaction requires some time. You can go back to homepage
          the transaction is not going to be lost.
        </p>
        {_renderSpinner()}
      </div>
    </div>
  );

  const _renderAppScreen = () => {
    return (
      <div className="container-fluid">
        <div className="card" style={{ width: '45rem', minHeight: '40rem' }}>
          <CardHeader title="Status Check" />
          <div className="card-body" id="list-field">
            {isMined ? _renderCongratulationScreen() : _renderStatusCheck()}
          </div>
          <div className="row justify-content-md-center align-items-end">
            <Link to="/">
              <button className="btn btn-success btn-lg">Homepage</button>
            </Link>
          </div>
          <AppFooter />
        </div>
      </div>
    );
  };

  if (!propstate) return <Redirect to="/" />;

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

export default Finish;

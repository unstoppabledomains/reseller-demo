import React, { useState } from 'react';
import config from '../../../config';
import styles from '../../../styles/stripe.styles';
import withStyles from '@material-ui/styles/withStyles';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

const Coinbase = ({ classes, email, domainObject, ownerPublicKey, setStep }) => {
  const [coinbaseToken, setCoinbaseToken] = useState('');
  const requestCoinbaseToken = async () => {
    const apiURL = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders`;
    const body = {
      order: {
        payment: {
          type: 'coinbase'
        },
        domains: [
          {
            name: domainObject.domain.name,
            owner: {
              type: 'ETH',
              owner: ownerPublicKey
            }
          }
        ]
      }
    };
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        Authentication: `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json());
    setCoinbaseToken(response.order.payment.tokenId);
    const coinbaseButton = document.querySelector('#coinbase-button');
    if (coinbaseButton) coinbaseButton.click();
  };

  if (coinbaseToken === '') {
    requestCoinbaseToken();
  }

  const handlePaymentSuccess = messageData => {
    console.log('charge success => ', messageData);
    setStep(5);
  };

  const handlePaymentFailure = messageData => {
    console.log('charge failure => ', messageData);
    // Em no clue what we should do here.
  };

  return (
    <>
      <div className={classes.coinbaseContainer} id="coinbaseParrent">
        <CoinbaseCommerceButton
          id="coinbase-button"
          className={classes.coinbaseButton}
          styled={false}
          chargeId={coinbaseToken}
          onChargeSuccess={handlePaymentSuccess}
          onChargeFailure={handlePaymentFailure}
          onModalClosed={() => setStep(3)}
        />
      </div>
      <style jsx="true" global="true">{`
        .coinbase-commerce-iframe-container {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: inherit !important;
          position: inherit !important;
          width: inherit !important;
        }

        .coinbase-commerce-iframe {
          top: 96px !important;
          height: 642px !important;
          width: 100% !important;
        }
      `}</style>
    </>
  );
};

export default withStyles(styles)(Coinbase);

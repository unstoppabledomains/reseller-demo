import React, { useState } from 'react';
import config from '../../../config';
import styles from '../../../styles/stripe.styles';
import withStyles from '@material-ui/styles/withStyles';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';

const Coinbase = ({ classes, email, domainObject, ownerAddress, setStep, setTransactionResponse }) => {
  const [coinbaseToken, setCoinbaseToken] = useState('');
  const [errors, setErrors] = useState()




  const _finalizeTransaction = res => {
    setTransactionResponse(res);
    if (res.errors) {
      setErrors(res.errors[0].message);
    }
    return res;
  };


  const _saveToLocal = data =>
  localStorage.setItem('own_domain', JSON.stringify(data))


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
             address: ownerAddress
            }
          }
        ]
      }
    };
    console.log({body});
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Authentication': `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
    .then(_finalizeTransaction)
    .then((res) => {
      console.log('Res === ', res);
      if (res && !res.errors) {
        _saveToLocal({
          ...body.order,
          config: { email, orderNumber: res.order.orderNumber }
        });
      }
      return res;
    });
    console.log({response});
    if (!response.errors)  {
      setCoinbaseToken(response.order.payment.tokenId);
      const coinbaseButton = document.querySelector('#coinbase-button');
      if (coinbaseButton) coinbaseButton.click();
    }
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
    setStep(2);
    // Em no clue what we should do here.
  };

  return (
    <>
     {errors ? (
        <div className={classes.coinbaseError}>
          <Typography color="error" className={classes.errorMessage}>
            {errors}
          </Typography>
          <Button color="primary" onClick={() => setStep(2)}>Try again</Button>
        </div>
      ) : null}
      <div className={classes.coinbaseContainer} id="coinbaseParrent">
        <CoinbaseCommerceButton
          id="coinbase-button"
          className={classes.coinbaseButton}
          styled={false}
          chargeId={coinbaseToken}
          onChargeSuccess={handlePaymentSuccess}
          onChargeFailure={handlePaymentFailure}
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

import React, { useState } from 'react';
import StripeCheckoutForm from './StripeCheckoutForm';
import { StripeProvider, Elements } from 'react-stripe-elements';
import config from '../../../config';
import styles from '../../../styles/stripe.styles';
import withStyles from '@material-ui/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Pointer from '../../../Utilities/Pointer';

const Stripe = ({
  domainObject,
  classes,
  setStep,
  step,
  showPointer,
  email,
  ownerPublicKey,
  setTransactionResponse
}) => {
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState();

  const _finalizeTransaction = res => {
    setTransactionResponse(res);
    if (!res.errors) {
      setStep(5);
    } else {
      setErrors(res.errors[0].message);
    }
    return res;
  };

  const buy = (url, data) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authentication: `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      // .then(res => {console.log({res}); return res;})
      .then(_finalizeTransaction);
  };

  const _saveToLocal = data =>
    localStorage.setItem('own_domain', JSON.stringify(data));

  const _handleUDPayment = ({ token }, setSpinner) => {
    const {
      domain: { name }
    } = domainObject;
    const apiurl = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders`;
    const body = {
      order: {
        payment: {
          type: 'stripe',
          tokenId: token.id
        },
        domains: [
          {
            name,
            owner: {
              type: 'ETH',
              publicKey: ownerPublicKey
            }
          }
        ]
      }
    };
    console.log({body});
    buy(apiurl, body, setSpinner).then(res => {
      if (res && !res.errors) {
        _saveToLocal({
          ...body.order,
          config: { email, orderNumber: res.order.orderNumber }
        });
      }
      setSpinner(false);
    });
  };

  const testNameSpace =
    domainObject.domain &&
    domainObject.domain.reselling &&
    domainObject.domain.reselling.test;

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerDiv}>
        <Typography variant="h5" className={classes.bold}>
          Pay with credit card
        </Typography>
        <Button
          color="primary"
          className={classes.searchButton}
          onClick={() => {
            setStep(0);
          }}
        >
          <SearchIcon className={classes.searchIcon} />
          Search new
        </Button>
      </div>
      <div className={classes.domainDiv}>
        <div>
          <Typography className={classes.bold}>
            {domainObject.domain.name.split('.')[0]}
            <span className={classes.extension}>
              .{domainObject.domain.name.split('.')[1]}
            </span>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Domain is available
          </Typography>
        </div>

        <Typography color="primary" className={classes.bold}>
          ${domainObject.domain.reselling.price}.00
        </Typography>
      </div>
      {errors ? (
        <div className={classes.errorDiv}>
          <Typography color="error" className={classes.errorMessage}>
            {errors}
          </Typography>
        </div>
      ) : null}
      <Typography className={classes.lessBold}>Name</Typography>
      <div className={classes.inputDiv}>
        {step === 2 && showPointer ? (
          <div style={{ position: 'fixed', transform: 'translateX(-40px)' }}>
            <Pointer />
          </div>
        ) : null}
        <InputBase
          placeholder="Your Full Name"
          className={classes.input}
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <StripeProvider
          apiKey={testNameSpace ? config.stripeKey : config.stripeKeyLiveDomain}
        >
          <Elements>
            <StripeCheckoutForm
              handlePayment={_handleUDPayment}
              setErrors={setErrors}
            />
          </Elements>
        </StripeProvider>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Stripe);

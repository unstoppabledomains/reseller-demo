import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { withStyles } from '@material-ui/core';
import styles from '../../styles/stripe.styles';
import Button from '@material-ui/core/Button';

const StripeCheckoutForm = ({ domain, funcs, test, stripe, classes }) => {
  const [name, setName] = useState('Sam');
  const [spinner, setSpinner] = useState(false);
  const [errors, setErrors] = useState();

  const handleSubmit = ev => {
    ev.preventDefault();
    if (stripe) {
      setSpinner(true);
      stripe.createToken({ name }).then(payload => {
        console.log('[token]', payload);
        if (!payload.error) {
          setErrors(null);
          funcs._handleUDPayment(payload, setSpinner);
        } else {
          setErrors({ ...payload.error });
          setSpinner(false);
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  const _renderSpinner = () => <div className="loader">Searching...</div>;

  const _renderErrors = () => (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Something went wrong</h3>
      </div>
      <div className="card-body">
        <p className="card-text">{errors.message}</p>
      </div>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.stripeForm}>
        <label>
          Card details
          <CardElement className="p-2 border border-dark" />
        </label>
        <Button
          // onClick={() => handleSubmit()}
          color="primary"
          variant="contained"
          className={classes.button}
          // disabled={!email}
        >
          Pay
        </Button>
      </form>
      {errors ? _renderErrors() : null}
    </>
  );
};

export default withStyles(styles)(injectStripe(StripeCheckoutForm));

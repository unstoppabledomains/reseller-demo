import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import styles from '../../../styles/stripe.styles';
import Button from '@material-ui/core/Button';
import ProtectedIcon from '@material-ui/icons/VerifiedUser';

const StripeCheckoutForm = ({
  // domain,
  handlePayment,
  // test,
  stripe,
  classes,
  userName,
  setErrors
}) => {
  const [spinner, setSpinner] = useState(false);
  // const [errors, setErrors] = useState();

  const handleSubmit = ev => {
    ev.preventDefault();
    if (stripe) {
      setSpinner(true);
      stripe.createToken({ userName }).then(payload => {
        console.log('[token]', payload);
        if (!payload.error) {
          setErrors(null);
          handlePayment(payload, setSpinner);
        } else {
          setErrors(payload.error.message);
          console.log('ERRROR', payload.error.message);

          setSpinner(false);
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  // const _renderSpinner = () => <div className="loader">Searching...</div>;

  // const _renderErrors = () => (
  //   <div className="card">
  //     <div className="card-header">
  //       <h3 className="card-title">Something went wrong</h3>
  //     </div>
  //     <div className="card-body">
  //       <p className="card-text">{errors.message}</p>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.stripeForm}>
        <Typography className={classes.lessBold}>Card details</Typography>
        <CardElement
          className={classes.stripeField}
          style={{ base: { fontSize: '16px' } }}
        />
        <div className={classes.stripeLogoDiv}>
          <ProtectedIcon className={classes.protectedIcon} />
          <Typography className={classes.stripeText}>
            Secured Checkout Powered by
          </Typography>
          <img src="/images/stripe-logo.svg" alt="stripe-logo" />
        </div>
        {spinner ? (
          <div className={classes.loadingDiv}>
            <CircularProgress />
          </div>
        ) : (
          <Button
            // onClick={() => handleSubmit()}
            color="primary"
            variant="contained"
            className={classes.button}
            type="submit"
          >
            Pay
          </Button>
        )}
      </form>
    </>
  );
};

export default withStyles(styles)(injectStripe(StripeCheckoutForm));

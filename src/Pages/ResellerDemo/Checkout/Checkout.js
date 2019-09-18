import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import styles from '../../../styles/checkout.styles';
import PaymentIcon from '@material-ui/icons/Payment';
import ProtectedIcon from '@material-ui/icons/VerifiedUser';

const Checkout = ({ classes, setPaymentMethod, setStep }) => {
  const handleChoosePayment = method => {
    setPaymentMethod(method === 'Credit Card' ? 0 : 1);
    setStep(4);
  };
  const renderPaymentMethod = (icon, method, bottomIcons) => {
    return (
      <Grid item className={classes.gridItem}>
        <Card className={classes.card}>
          <CardActionArea
            className={classes.cardActionArea}
            onClick={() => handleChoosePayment(method)}
          >
            <CardContent className={classes.cardIcon}>
              {icon}
              <Typography variant="h6" color="primary">
                <b>{method}</b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={classes.smallIconsDiv}>{bottomIcons}</div>
      </Grid>
    );
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.bold} align="center">
        Choose payment method
      </Typography>
      <Grid container direction="row" justify="center">
        {renderPaymentMethod(
          <PaymentIcon className={classes.iconMedium} />,
          'Credit Card',
          <React.Fragment>
            <ProtectedIcon className={classes.protectedIcon} />
            <Typography className={classes.stripeText}>Secured by</Typography>
            <img src="/images/stripe-logo.svg" alt="stripe-logo" />
          </React.Fragment>
        )}
        {renderPaymentMethod(
          <div className={classes.mainIconDiv}>
            <img src="/images/crypto-icon.svg" alt="icon" />
          </div>,
          'Crypto',
          <React.Fragment>
            <img
              src="/images/bitcoin-logo.svg"
              alt="icon"
              className={classes.smallIcon}
            />
            <img
              src="/images/bitcoin-cash-logo.svg"
              className={classes.smallIcon}
              alt="icon"
            />
            <img
              src="/images/ethereum-logo.svg"
              className={classes.smallIcon}
              alt="icon"
            />
            <img
              src="/images/usd-coin-logo.svg"
              className={classes.smallIcon}
              alt="icon"
            />
            <img
              src="/images/litecoin-logo.svg"
              className={classes.smallIcon}
              alt="icon"
            />
          </React.Fragment>
        )}
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(Checkout);

import React from 'react';
import Pointer from '../../Utilities/Pointer';
import {
  Paper,
  withStyles,
  Typography,
  Button,
  InputBase
} from '@material-ui/core';
import styles from '../../styles/email.styles';
import SearchIcon from '@material-ui/icons/Search';

const Email = ({
  classes,
  emailProps,
  email,
  setEmail,
  step,
  showPointer,
  setStep
}) => {
  // const checkEmail = email => !/.+@.+\..+/.test(email);

  const handleSubmit = () => {
    console.log('submitting form');
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerDiv}>
        <Typography variant="h5" className={classes.bold}>
          Enter Email
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
            {emailProps.domain.name}
            <span className={classes.extension}>.zil</span>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Domain is available
          </Typography>
        </div>
        <Typography color="primary" className={classes.bold}>
          $ {emailProps.domain.reselling.price}.00
        </Typography>
      </div>
      <Typography className={classes.lessBold}>
        Please provide an email address
      </Typography>
      <div className={classes.inputDiv}>
        {step === 2 && showPointer ? (
          <div style={{ position: 'fixed', transform: 'translateX(-40px)' }}>
            <Pointer />
          </div>
        ) : null}
        <InputBase
          placeholder="Your Email"
          className={classes.input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleSubmit()}
        color="primary"
        variant="contained"
        className={classes.button}
        disabled={!email}
      >
        Next
      </Button>
    </Paper>
  );
};
export default withStyles(styles)(Email);

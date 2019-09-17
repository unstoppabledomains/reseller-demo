import React, { useState } from 'react';
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
  const [emailError, setEmailError] = useState('');
  const isEmailValid = e => {
    // eslint-disable-next-line
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e
    );
  };

  const handleSubmit = () => {
    console.log('submitting form');
    if (isEmailValid(email)) {
      setStep(3);
    } else {
      setEmailError('Incorrect email');
    }
  };

  const handleEmailChange = e => {
    if (emailError) {
      setEmailError('');
    }
    setEmail(e.target.value);
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
            {emailProps.domain.name.split('.')[0]}
            <span className={classes.extension}>
              .{emailProps.domain.name.split('.')[1]}
            </span>
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
          onChange={handleEmailChange}
          onKeyDown={e => (e.key === 'Enter' ? handleSubmit() : null)}
        />
      </div>
      {emailError ? (
        <div className={classes.errorDiv}>
          <Typography color="error" className={classes.errorMessage}>
            {emailError}
          </Typography>
        </div>
      ) : null}
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

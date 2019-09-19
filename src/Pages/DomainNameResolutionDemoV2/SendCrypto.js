import React, { useState } from 'react';
import {
  withStyles,
  Paper,
  Typography,
  InputBase,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Button,
  InputAdornment
} from '@material-ui/core';
import styles from '../../styles/sendcrypto.styles';
import UserIcon from '@material-ui/icons/AccountCircle';
import GlobeIcon from '@material-ui/icons/Language';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DollarIcon from '@material-ui/icons/MonetizationOnRounded';
import Pointer from '../../Utilities/Pointer';

const SendCrypto = ({
  classes,
  domainName,
  setDomainName,
  step,
  setStep,
  showPointer,
  availableWallets,
  cryptoCurrency,
  setCryptoCurrency,
  cryptoAmount,
  setCryptoAmount,
  dollarAmount,
  setDollarAmount,
  error
}) => {
  const [message, setMessage] = useState('');

  const handleExchange = e => {
    setCryptoAmount(Number(e.target.value));
    setDollarAmount((Number(e.target.value) * 23.42).toFixed(2));
  };

  const handleSendPayment = () => {
    setStep(4);
  };

  console.log({ availableWallets });

  if (step === 0) {
    return <div>Choose crypto</div>;
  }

  if (step === 4) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.finalHeader}>
          {cryptoCurrency} has been sent to
        </Typography>
        <div className={classes.sendToDiv}>
          <div className={classes.nameDiv}>
            <UserIcon className={classes.userIcon} />
            <Typography variant="subtitle1">{domainName}</Typography>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.nameDiv}>
            <WalletIcon className={classes.userIcon} />
            <Typography variant="subtitle1" className={classes.lessBold}>
              {cryptoCurrency}:&nbsp;
            </Typography>
            <Typography variant="subtitle1" className={classes.trancatedText}>
              {availableWallets[cryptoCurrency]}
            </Typography>
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.bold}>
        Send Crypto
      </Typography>
      <div className={classes.inputDiv}>
        <div>
          <Typography variant="subtitle1" className={classes.label}>
            Enter .zil Domain
          </Typography>
          <div>
            {step === 0 && showPointer ? (
              <div
                style={{ position: 'fixed', transform: 'translateX(-40px)' }}
              >
                <Pointer />
              </div>
            ) : null}
            <InputBase
              className={classes.input}
              value={domainName}
              onChange={e => setDomainName(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <GlobeIcon color="disabled" />
                </InputAdornment>
              }
            />
          </div>
        </div>
        <div>
          <Typography variant="subtitle1" className={classes.label}>
            Select Crypto
          </Typography>
          <FormControl
            variant="outlined"
            classes={{ root: classes.formControl }}
          >
            {step === 1 && showPointer ? (
              <div
                style={{ position: 'fixed', transform: 'translateX(221px)' }}
              >
                <Pointer />
              </div>
            ) : null}
            <Select
              value={cryptoCurrency}
              onChange={e => setCryptoCurrency(e.target.value)}
              inputProps={{
                name: 'age',
                id: 'outlined-age-simple'
              }}
              input={
                <InputBase className={classes.input} style={{ width: 212 }} />
              }
              disabled={
                !availableWallets || !Object.keys(availableWallets).length
              }
            >
              {availableWallets && Object.keys(availableWallets).length
                ? Object.keys(availableWallets).map(wallet => (
                    <MenuItem
                      key={wallet}
                      classes={{ root: classes.menuItem }}
                      value={wallet}
                    >
                      {wallet}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </div>
      </div>
      {error ? (
        <div className={classes.errorDiv}>
          <Typography color="error" className={classes.errorMessage}>
            {error}
          </Typography>
        </div>
      ) : null}
      {domainName && cryptoCurrency ? (
        <>
          <Typography variant="subtitle1" className={classes.label}>
            Send to:
          </Typography>
          <div className={classes.sendToDiv}>
            <div className={classes.nameDiv}>
              <UserIcon className={classes.userIcon} />
              <Typography variant="subtitle1">{domainName}</Typography>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.nameDiv}>
              <WalletIcon className={classes.userIcon} />
              <Typography variant="subtitle1" className={classes.lessBold}>
                {cryptoCurrency}:&nbsp;
              </Typography>
              <Typography variant="subtitle1" className={classes.trancatedText}>
                {availableWallets[cryptoCurrency]}
              </Typography>
            </div>
          </div>
        </>
      ) : null}

      <div className={classes.labelsDiv}>
        <Typography variant="subtitle1" className={classes.label}>
          {cryptoCurrency ? cryptoCurrency : 'BTC'} Amount
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.label}
          style={{ marginLeft: 100 }}
        >
          Dollar amount
        </Typography>
      </div>
      <div className={classes.exchangeDiv}>
        <div>
          {step === 2 && showPointer ? (
            <div style={{ position: 'fixed', transform: 'translateX(-40px)' }}>
              <Pointer />
            </div>
          ) : null}
          <InputBase
            className={classes.input}
            style={{ width: 138 }}
            value={cryptoAmount}
            onChange={e => handleExchange(e)}
            disabled={!cryptoCurrency}
            startAdornment={
              <InputAdornment position="start">
                <img src="/images/crypto.svg" alt="crypto" />
              </InputAdornment>
            }
          />
        </div>
        <Typography color="textSecondary">=</Typography>
        <div>
          <InputBase
            className={classes.input}
            style={{ width: 138 }}
            value={dollarAmount}
            disabled={!cryptoCurrency}
            startAdornment={
              <InputAdornment position="start">
                <DollarIcon color="disabled" />
              </InputAdornment>
            }
          />
        </div>
        <div className={classes.exchangeRate}>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.textExchange}
          >
            Current average price:
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.textExchange}
          >
            $10,191.20
          </Typography>
        </div>
      </div>
      <Typography variant="subtitle1" className={classes.label}>
        Message
      </Typography>
      <InputBase
        className={classes.input}
        style={{ width: '100%' }}
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Optional message or description"
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        disabled={!cryptoAmount}
        onClick={() => handleSendPayment()}
      >
        Send payment
      </Button>
      {step === 3 && showPointer ? (
        <div
          style={{
            position: 'fixed',
            transform: 'translateX(224px) translateY(-16px)'
          }}
        >
          <Pointer />
        </div>
      ) : null}
    </Paper>
  );
};

export default withStyles(styles)(SendCrypto);

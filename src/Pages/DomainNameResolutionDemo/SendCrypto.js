import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/styles/withStyles';
import styles from '../../styles/sendcrypto.styles';
import UserIcon from '@material-ui/icons/AccountCircle';
import GlobeIcon from '@material-ui/icons/Language';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DollarIcon from '@material-ui/icons/MonetizationOnRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  error,
  spinner
}) => {
  const [message, setMessage] = useState('');

  const ethPrice = 220.72;
  const btcPrice = 10191.2;

  const handleExchange = e => {
    const mult = cryptoCurrency === 'BTC' ? btcPrice : ethPrice;
    if (
      /^([0-9]+)\.?([0-9]*)$/.test(e.target.value) ||
      /(^([0-9]+)\.?([0-9]*)$)/.test(e.target.value) ||
      !e.target.value
    ) {
      setCryptoAmount(e.target.value);
      if (e.target.value === '') {
        setDollarAmount('');
      } else setDollarAmount((parseFloat(e.target.value) * mult).toFixed(2));
    }
  };

  const handleSendPayment = () => {
    setStep(4);
  };

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
              disabled={!availableWallets}
            >
              <MenuItem classes={{ root: classes.menuItem }} value="BTC">
                Bitcoin
              </MenuItem>
              <MenuItem classes={{ root: classes.menuItem }} value="ETH">
                Ethereum
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {spinner ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : null}
      {error ? (
        <div className={classes.errorDiv}>
          <Typography color="error" className={classes.errorMessage}>
            {error}
          </Typography>
        </div>
      ) : null}
      {domainName && cryptoCurrency && availableWallets[cryptoCurrency] ? (
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
          {cryptoCurrency ? cryptoCurrency : 'BTC'} amount
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
            disabled={!cryptoCurrency || !!error}
            startAdornment={
              <InputAdornment position="start">
                <img src="images/crypto.svg" alt="crypto" />
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
            disabled={!cryptoCurrency || !!error}
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
            ${cryptoCurrency === 'BTC' ? btcPrice : ethPrice}
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
        disabled={!cryptoAmount || !!error}
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

import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header';
import withStyles from '@material-ui/styles/withStyles';
import styles from '../../styles/app.styles';
import SendCrypto from './SendCrypto';
import Namicorn, { ResolutionError } from 'namicorn';

const namicorn = new Namicorn();

const DomainNameResotionDemo = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);
  const [domainName, setDomainName] = useState('');
  // const [resolvedAddress, setResolvedAddress] = useState('');
  const [availableWallet, setAvailableWallet] = useState();
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [error, setError] = useState('');
  const [spinner, setSpinner] = useState(false);


  useEffect(() => {
    if (domainName && step !== 1) setStep(1);
    if (cryptoAmount) setCryptoAmount('');
    if (dollarAmount) setDollarAmount('');
    if (error) setError('');
    if (availableWallet) setAvailableWallet('');
    if (domainName) resolve(domainName);
    // eslint-disable-next-line
  }, [domainName]);

  useEffect(() => {
    if (step === 0) {
      if (cryptoAmount) setCryptoAmount('');
      if (dollarAmount) setDollarAmount('');
      if (error) setError('');
      if (availableWallet) setAvailableWallet('');
      if (domainName) setDomainName('');
      if (cryptoCurrency) setCryptoCurrency('');
    }
    // eslint-disable-next-line
  }, [step]);

  useEffect(() => {
    if (cryptoAmount) setStep(3);
  }, [cryptoAmount]);

  const handlePointer = () => {
    setPointer(!pointer);
  };

  const checkForErrors = domain => {
    return (
      domain.indexOf('.') > 0 &&
      /^((?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}\.)*(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/.test(
        domain
      )
    );
  };


  const resolve = async domain => {
    try {
      setSpinner(true);
      if (!checkForErrors(domain)) {
        setError('Invalid domain');
        return;
      }
      const address = await namicorn.addressOrThrow(domain, cryptoCurrency);
      setAvailableWallet(address);
    } catch(e) {
      if (e instanceof ResolutionError) {
        setError(e.message);
      } else {
        setError('Server error, please try again later');
      }
    } finally {
      setSpinner(false);
    }
  };

  return (
    <div className={classes.root}>
      <Header
        history={history}
        handlePointer={handlePointer}
        pointer={pointer}
        step={step}
        setDomainName={setDomainName}
        setStep={setStep}
      />
      <div className={classes.layout}>
        <SendCrypto
          domainName={domainName}
          setDomainName={setDomainName}
          step={step}
          setStep={setStep}
          showPointer={pointer}
          availableWallet={availableWallet}
          cryptoCurrency={cryptoCurrency}
          setCryptoCurrency={setCryptoCurrency}
          setCryptoAmount={setCryptoAmount}
          cryptoAmount={cryptoAmount}
          dollarAmount={dollarAmount}
          setDollarAmount={setDollarAmount}
          error={error}
          spinner={spinner}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(DomainNameResotionDemo);

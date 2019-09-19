import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/app.styles';
import SendCrypto from './SendCrypto';
import Namicorn from 'namicorn';

const namicorn = new Namicorn();

const DomainNameResotionDemo = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);
  const [domainName, setDomainName] = useState('');
  // const [resolvedAddress, setResolvedAddress] = useState('');
  const [availableWallets, setAvailableWallets] = useState();
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (step !== 0) setStep(0);
    if (cryptoCurrency) setCryptoCurrency('');
    if (cryptoAmount) setCryptoAmount(0);
    if (dollarAmount) setDollarAmount(0);
    if (error) setError('');
    if (domainName) resolve(domainName);
    // eslint-disable-next-line
  }, [domainName]);

  useEffect(() => {
    if (cryptoCurrency) setStep(2);
  }, [cryptoCurrency]);

  useEffect(() => {
    if (cryptoAmount) setStep(3);
  }, [cryptoAmount]);

  useEffect(() => {
    if (availableWallets) setStep(1);
  }, [availableWallets]);

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
    if (checkForErrors(domain)) {
      try {
        const resolution = await namicorn.resolve(domain);
        if (resolution.meta.owner) {
          if (!Object.keys(resolution.addresses).length) {
            setError('Domain has no wallets connected to it');
          } else {
            setAvailableWallets(resolution.addresses);
          }
        } else {
          setError('Domain has no owner');
        }
      } catch (e) {
        setError('Server error, please try again later');
      }
    } else {
      setError('Invalid domain');
    }
  };

  console.log('step', step);

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
          availableWallets={availableWallets}
          cryptoCurrency={cryptoCurrency}
          setCryptoCurrency={setCryptoCurrency}
          setCryptoAmount={setCryptoAmount}
          cryptoAmount={cryptoAmount}
          dollarAmount={dollarAmount}
          setDollarAmount={setDollarAmount}
          error={error}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(DomainNameResotionDemo);

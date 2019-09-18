import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import { withStyles } from '@material-ui/styles';
// import config from '../../config';
import styles from '../../styles/app.styles';
import SendCrypto from './SendCrypto';
import Namicorn from 'namicorn';

const namicorn = new Namicorn();

const DomainNameResotionDemo = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);
  const [domainName, setDomainName] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState('');
  // const [canResell, setCanResell] = useState(false);
  // const [selectedTicker, setTicker] = useState('BTC');
  // const [resellErrors, setResellErrors] = useState();
  const [availableWallets, setAvailableWallets] = useState();
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);

  useEffect(() => {
    if (step !== 0) setStep(0);
    if (cryptoCurrency) setCryptoCurrency('');
    if (cryptoAmount) setCryptoAmount(0);
    if (dollarAmount) setDollarAmount(0);
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
    console.log(resolvedAddress);
    if (
      resolvedAddress &&
      resolvedAddress !== 'INVALID_DOMAIN' &&
      resolvedAddress !== 'NO_OWNER'
    )
      setStep(1);
  }, [resolvedAddress]);

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

  // const fetchDomain = url => {
  //   return fetch(url, {
  //     headers: {
  //       Authentication: `Bearer ${config.token}`
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(answer => {
  //       const regextTestpattern = /[reseller-test-udtesting-]+\d+[.zil]+/;
  //       console.log('answer = ', answer);
  //       if (answer && answer.domain)
  //         return {
  //           ...answer,
  //           testNameSpace: regextTestpattern.test(answer.domain.name)
  //         };

  //       return answer;
  //     });
  // };

  // const collectState = () => {
  //   const baseURL = 'https://unstoppabledomains.com/api/v1/resellers';
  //   const apiurl = `${baseURL}/${config.reseller}/domains/${domainName}`;
  //   return fetchDomain(apiurl);
  // };

  const resolve = async domain => {
    if (!domain) setResolvedAddress('');
    if (checkForErrors(domain)) {
      const resolution = await namicorn.resolve(domain);
      if (resolution.meta.owner) {
        setResolvedAddress(resolution.meta.owner);
        setAvailableWallets(resolution.addresses);
      } else {
        setResolvedAddress('NO_OWNER');
      }
    } else {
      setResolvedAddress('INVALID_DOMAIN');
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
      />
      <div className={classes.layout}>
        <SendCrypto
          domainName={domainName}
          setDomainName={setDomainName}
          step={step}
          setStep={setStep}
          showPointer={pointer}
          resolvedAddress={resolvedAddress}
          availableWallets={availableWallets}
          cryptoCurrency={cryptoCurrency}
          setCryptoCurrency={setCryptoCurrency}
          setCryptoAmount={setCryptoAmount}
          cryptoAmount={cryptoAmount}
          dollarAmount={dollarAmount}
          setDollarAmount={setDollarAmount}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(DomainNameResotionDemo);

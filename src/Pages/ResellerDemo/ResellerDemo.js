import React, { useEffect, useState } from 'react';
import Search from './Search/Search';
import Email from './Email/Email';
import Checkout from './Checkout/Checkout';
import Header from './Layout/Header';
import { withStyles } from '@material-ui/styles';
import config from '../../config';
import styles from '../../styles/app.styles';
import Stripe from './Checkout/Stripe';
import Congratulations from './Finish/Congratulations';

const App = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);
  const [domainName, setDomainName] = useState('');
  const [emailProps, setEmailProps] = useState({});
  const [email, setEmail] = useState('');
  const [owner, setOwner] = useState(
    '0xe7474D07fD2FA286e7e0aa23cd107F8379085037'
  );
  const [transactionResponse, setTransactionResponse] = useState();

  const [domainResults, setDomainResults] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(0);

  useEffect(() => {
    if (step === 0) {
      setEmail('');
      setOwner('0xe7474D07fD2FA286e7e0aa23cd107F8379085037');
      setDomainResults('');
      setDomainName('');
      setEmailProps('');
    }
  }, [step]);

  const handlePointer = () => {
    setPointer(!pointer);
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step) setStep(step - 1);
  };

  const randomizeDomain = () => {
    setDomainName(
      `reseller-test-${config.reseller}-${Math.floor(
        Math.random() * 502562
      )}.zil`
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Search
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            domainName={domainName}
            step={step}
            owner={owner}
            setOwner={setOwner}
            showPointer={pointer}
            setEmailProps={setEmailProps}
            setDomainResults={setDomainResults}
          />
        );
      case 1:
        return (
          <Search
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            step={step}
            domainName={domainName}
            owner={owner}
            setOwner={setOwner}
            showPointer={pointer}
            setEmailProps={setEmailProps}
            setDomainResults={setDomainResults}
          />
        );
      case 2:
        return (
          <Email
            handleNextStep={handleNextStep}
            emailProps={emailProps}
            email={email}
            owner={owner}
            setOwner={setOwner}
            setEmail={setEmail}
            step={step}
            showPointer={pointer}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <Checkout setPaymentMethod={setPaymentMethod} setStep={setStep} />
        );
      case 4:
        if (paymentMethod === 0)
          return (
            <Stripe
              domainObject={emailProps}
              step={step}
              showPointer={pointer}
              setStep={setStep}
              email={email}
              owner={owner}
              setTransactionResponse={setTransactionResponse}
            />
          );
        else return null;
      case 5:
        return (
          <Congratulations
            setStep={setStep}
            email={email}
            transactionResponse={transactionResponse}
          />
        );
      default:
        break;
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
        randomizeDomain={randomizeDomain}
        setEmail={setEmail}
        isDomainLive={
          domainResults.domain && domainResults.domain.reselling
            ? !domainResults.domain.reselling.test
            : false
        }
      />
      <div className={classes.layout}>{renderStep()}</div>
    </div>
  );
};

export default withStyles(styles)(App);

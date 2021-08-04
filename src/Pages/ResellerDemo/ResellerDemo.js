import React, { useEffect, useState } from "react";
import Search from "./Search/Search";
import Email from "./Email/Email";
import Checkout from "./Checkout/Checkout";
import Header from "../Layout/Header";
import Coinbase from "./Checkout/Coinbase";
import withStyles from "@material-ui/styles/withStyles";
import config from "../../config";
import styles from "../../styles/app.styles";
import Stripe from "./Checkout/Stripe";
import Congratulations from "./Finish/Congratulations";

const ResellerDemo = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);
  const [domainName, setDomainName] = useState("");
  const [emailProps, setEmailProps] = useState({});
  const [email, setEmail] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [transactionResponse, setTransactionResponse] = useState();

  const [domainResults, setDomainResults] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);

  useEffect(() => {
    if (step === 0) {
      setEmail("");
      setOwnerAddress("");
      setDomainResults("");
      setDomainName("");
      setEmailProps("");
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
    const tlds = ['.crypto', '.coin', '.x', '.wallet', '.bitcoin', '.nft', '.dao', '.888'];

    setDomainName(
      `reseller-test-${config.reseller}-${Math.floor(
        Math.random() * 502562
      )}${tlds[Math.floor(Math.random() * tlds.length)]}`
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
            ownerAddress={ownerAddress}
            setOwnerAddress={setOwnerAddress}
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
            ownerAddress={ownerAddress}
            setOwnerAddress={setOwnerAddress}
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
            ownerAddress={ownerAddress}
            setOwnerAddress={setOwnerAddress}
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
              ownerAddress={ownerAddress}
              setTransactionResponse={setTransactionResponse}
            />
          );
        else
          return (
            <Coinbase
              domainObject={emailProps}
              email={email}
              ownerAddress={ownerAddress}
              setStep={setStep}
              setTransactionResponse={setTransactionResponse}
            />
          );
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

  return (
    <div className={classes.root}>
      <Header
        setStep={setStep}
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
        setDomainName={setDomainName}
      />
      <div className={classes.layout}>{renderStep()}</div>
    </div>
  );
};

export default withStyles(styles)(ResellerDemo);

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './history';
// import Wallet from './Pages/WalletFront/Wallet';
import Search from './Pages/Search/Search';
import Email from './Pages/Email/Email';
import Checkout from './Pages/Checkout/Checkout';
import Finish from './Pages/Finish/Finish';
import Send from './Pages/Send';
import Header from './Pages/Layout/Header';
import { withStyles } from '@material-ui/styles';
import config from './config';
import styles from './styles/app.styles';

const App = ({ classes }) => {
  const [step, setStep] = React.useState(0);
  const [pointer, setPointer] = React.useState(true);
  const [domainName, setDomainName] = React.useState('');
  const [emailProps, setEmailProps] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [domainResults, setDomainResults] = React.useState('');

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
            setEmail={setEmail}
            step={step}
            showPointer={pointer}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <Checkout
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      default:
        break;
    }
  };
  console.log(domainResults);

  console.log('step', step);
  return (
    <div className={classes.root}>
      <Header
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
      <div className={classes.layout}>
        {renderStep()}
        {/* <Router history={history} basename="/">
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/reseller-demo/" exact component={Search} />
            <Route path="/email" exact component={Email} /> 2 step
            <Route path="/checkout" exact component={Checkout} /> 3 step
            <Route path="/finish" exact component={Finish} />
            <Route path="/send" exact component={Send} />
          </Switch>
        </Router> */}
      </div>
    </div>
  );
};

export default withStyles(styles)(App);

import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import { withStyles } from '@material-ui/styles';
import config from '../../config';
import styles from '../../styles/app.styles';
import SendCrypto from './SendCrypto';

const App = ({ classes, history }) => {
  const [step, setStep] = useState(0);
  const [pointer, setPointer] = useState(true);

  const handlePointer = () => {
    setPointer(!pointer);
  };

  console.log('step', step);

  return (
    <div className={classes.root}>
      <Header
        history={history}
        handlePointer={handlePointer}
        pointer={pointer}
        step={step}
      />
      <div className={classes.layout}>
        <SendCrypto />
      </div>
    </div>
  );
};

export default withStyles(styles)(App);

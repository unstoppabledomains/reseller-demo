import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import Pointer from '../../Utilities/Pointer';
import { CardHeader, AppFooter } from '../../Utilities/Cards';
import {
  Paper,
  withStyles,
  Typography,
  Button,
  InputBase
} from '@material-ui/core';
import styles from '../../styles/email.styles';
import SearchIcon from '@material-ui/icons/Search';
import { SettingsEthernetSharp } from '@material-ui/icons';

const Email = ({
  // props,
  classes,
  emailProps,
  email,
  setEmail,
  step,
  showPointer,
  handlePrevStep,
  setStep
}) => {
  // const [email, setEmail] = useState('example@example.com');
  // console.log('EMAILPROPS', props);
  const checkEmail = email => !/.+@.+\..+/.test(email);
  const [isValid, setIsValid] = useState(checkEmail(''));

  const handleSubmit = () => {
    console.log('submitting form');

    // if (isValid)
    // return props.history.push({
    //   pathname: '/checkout',
    //   state: {
    //     ...props.emailProps,
    //     email
    //   }
    // });
  };

  // const _renderAppScreen = () => (
  // <div className="container-fluid">
  //   <div className="card" style={{ width: '45rem', minHeight: '40rem' }}>
  //     <CardHeader title="Enter email" />
  //     <div className="card-body" id="big">
  //       <div className="card">
  //         <div className="card-header">
  //           <div className="row justify-content-between">
  //             <div className="col-9">
  //               <h5 className="card-title">{props.emailProps.domain.name}</h5>
  //             </div>
  //             <div className="col-3 d-flex justify-content-end">
  //               <h5 className="card-title">
  //                 $ {props.emailProps.domain.reselling.price}
  //               </h5>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="card">
  //         <div className="card-body">
  //           <form
  //             className="form-inline justify-content-md-center"
  //             onSubmit={_handleFormSubmit}
  //           >
  //             <p className="card-text">Please provide an email address</p>
  //             <input
  //               type="text"
  //               placeholder="Email"
  //               className="form-control-lg col-11"
  //               value={email}
  //               onChange={e => {
  //                 setEmail(e.target.value);
  //                 setIsValid(!checkEmail(e.target.value));
  //               }}
  //             />
  //           </form>
  //         </div>
  //       </div>
  //       <div className="d-flex justify-content-md-center">
  //         <button
  //           type="submit"
  //           className="btn btn-primary col-6"
  //           onClick={_handleFormSubmit}
  //           disabled={!isValid}
  //           id="margin-top"
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //     <AppFooter />
  //   </div>
  // </div>
  // );

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
            {emailProps.domain.name}
            <span className={classes.extension}>.zil</span>
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
          onChange={e => setEmail(e.target.value)}
        />
      </div>
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

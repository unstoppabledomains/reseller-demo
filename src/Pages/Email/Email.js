import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { CardHeader, AppFooter } from '../../Utilities/Cards';

function Email(props) {
  const [email, setEmail] = useState('example@example.com');
  console.log('EMAILPROPS', props);
  const checkEmail = email => !/.+@.+\..+/.test(email);
  const [isValid, setIsValid] = useState(checkEmail(''));

  const _handleFormSubmit = () => {
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

  const _renderAppScreen = () => (
    <div className="container-fluid">
      <div className="card" style={{ width: '45rem', minHeight: '40rem' }}>
        <CardHeader title="Enter email" />
        <div className="card-body" id="big">
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between">
                <div className="col-9">
                  <h5 className="card-title">{props.emailProps.domain.name}</h5>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  <h5 className="card-title">
                    $ {props.emailProps.domain.reselling.price}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form
                className="form-inline justify-content-md-center"
                onSubmit={_handleFormSubmit}
              >
                <p className="card-text">Please provide an email address</p>
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control-lg col-11"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    setIsValid(!checkEmail(e.target.value));
                  }}
                />
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-md-center">
            <button
              type="submit"
              className="btn btn-primary col-6"
              onClick={_handleFormSubmit}
              disabled={!isValid}
              id="margin-top"
            >
              Next
            </button>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );

  // if (!props.emailProps) return <Redirect to="/" />;

  return (
    <>
      <div className="row justify-content-md-center flex-nowrap mt-5">
        <div className="col-lg-fluid">
          <div className="container">{_renderAppScreen()}</div>
        </div>
      </div>
    </>
  );
}
export default Email;

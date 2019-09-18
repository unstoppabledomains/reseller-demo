import React, { useState } from 'react';
import config from '../../../config';
import styles from '../../../styles/stripe.styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import LiveIcon from '@material-ui/icons/NewReleases';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';




const Coinbase = ({
    classes,
    email,
    domainObject,
    owner,
    setStep
}) => {

    const [coinbaseToken, setCoinbaseToken] = useState('');
    console.log({domainObject, email, owner});
    const requestCoinbaseToken = async () => {
        const apiURL = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders`;
        const body = {
            "order": {
                "payment": {
                    "type": "coinbase"
                },
                "domains": [
                    {
                        "name": domainObject.domain.name,
                        "owner": owner,

                    }
                ]
            }
        };
        const response = await fetch(apiURL, {
            method: 'POST', headers: {
                "Authentication": `Bearer ${config.token}`,
                "Content-Type": "application/json"
            }, body: JSON.stringify(body)
        }).then(resp => resp.json());
        console.log(response);
        setCoinbaseToken(response.order.payment.tokenId);
        //Autoclick
        const coinbaseButton = document.querySelector('#coinbase-button');
        if (coinbaseButton)
            coinbaseButton.click();
    }

    if (coinbaseToken === '') {
        requestCoinbaseToken();
    }


    const handlePaymentSuccess = (messageData) => {
        console.log('charge success => ', messageData);
        setStep(5);
    }


    const handlePaymentFailure = (messageData) => {
        console.log('charge failure => ', messageData);
        // Em no clue what we should do here. 
    }

    return (
        <>
    <div className={classes.coinbaseContainer} id="coinbaseParrent">
        <CoinbaseCommerceButton
            id="coinbase-button"
            className={classes.coinbaseButton}
            styled={false}
            chargeId={coinbaseToken}
            onChargeSuccess={handlePaymentSuccess}
            onChargeFailure={handlePaymentFailure}
        />
    </div>
            <style jsx global>{`
            .coinbase-commerce-iframe-container {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              height: inherit !important;
              position: inherit !important;
              width: inherit !important;
            }
  
            .coinbase-commerce-iframe {
                top: 96px !important;
              height: 642px !important;
              width: 100% !important;
            }
          `}</style>
          </>
    );
}

export default withStyles(styles)(Coinbase);
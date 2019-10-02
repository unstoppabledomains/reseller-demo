import React, {useState} from 'react'

import withStyles from '@material-ui/styles/withStyles';
import styles from '../../../styles/coinbase.styles';
import Paper  from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';

const CoinbaseFrame = ({classes, token}) => {

    console.log(`token = ${token}`);
    const [coinabaseApiResponse, setCoinbaseApiResponse] = useState();



    const fetchCoinbase = async (token) => {
        if (!token) return null;
        const url = `https://api.commerce.coinbase.com/charges/${token}`;
        const response = await fetch(url)
        const answer = await response.json();
        console.log({response, answer});
        if (!answer.error)
            setCoinbaseApiResponse(answer.data);
        else 
            console.error('error type = ', answer.error.type,'\nerror message =', answer.error.message);
    }


    if (!coinabaseApiResponse) {
        console.log('fetching with token', token);
        fetchCoinbase(token); 
        return <CircularProgress />
    }


    const _renderHeader = () => {
        return <div className={classes.header}>
        <div className={classes.priceBox}>
            <Typography 
                variant="h5"
                color="primary"
                align="center"
            >
                {coinabaseApiResponse.pricing.local.amount}
            </Typography>
            <Typography 
                variant="subtitle1"
                color="textSecondary"
                align="center"
            >
                {coinabaseApiResponse.pricing.local.currency}
            </Typography>
        </div>
        <div className={classes.description}>
                <Typography variant="h5">{coinabaseApiResponse.name}</Typography>
                <Typography variant="h6">{coinabaseApiResponse.description}</Typography>
        </div>
    </div>;
    }

    const _transformCodeForName = (code) => {
        switch(code) {
            case 'bitcoin': {
                console.log(' this is Bitcoin');
                return 'Bitcoin';
            }
            case 'bitcoincash': {
                console.log(' this is Bitcoin Cash');
                return 'Bitcoin Cash';
            }
            case 'litecoin': {
                console.log(' this is Litecoin');
                return 'Litecoin';
            }
            case 'ethereum': {
                console.log(' this is Ethereum');
                return 'Ethereum';
            }
            case 'usdc': {
                console.log(' this is USD coin');
                return 'USD coin';
            }
            default: 
                return null;
        }
    }


    const _renderListTile = (name) => {
        return (
            <div className={classes.listTile}>
               <Typography variant="body1">{name}</Typography>
               <KeyboardArrowRight />
            </div>
        );
    }


    const _renderList = () => {
        const {addresses} = coinabaseApiResponse;
        const list = [];

        for (let coinCode in addresses) {
            if (addresses.hasOwnProperty(coinCode)) {
                console.log(`${coinCode} => ${addresses[coinCode]}`);
                list.push(_renderListTile(_transformCodeForName(coinCode)));
            }
        }

        return list;
    }


    return (
        <Paper className={classes.paper}>
            {_renderHeader()}
            <div className={classes.body}>
                <Typography variant="body1" weight="bold" >Select a cryptocurrency</Typography>
                {_renderList()}
            </div>
        </Paper>
    )
}

export default withStyles(styles)(CoinbaseFrame);

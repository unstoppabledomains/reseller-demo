import React, {useState} from 'react'

import withStyles from '@material-ui/styles/withStyles';
import styles from '../../../styles/coinbase.styles';
import Paper  from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';
import { CircularProgress, Button } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';

const convertSymbolToCoinbase = (symbol) => {
    console.log(symbol);
    const map = {
        'BTC': 'bitcoin',
        'BTH': 'bitcoincash',
        'ETH': 'ethereum',
        'LTC': 'litecoin',
        'USDC': 'usdc',
    }
    return map[symbol];
}

const CoinbaseFrame = ({classes, token}) => {

    console.log(`token = ${token}`);
    const [coinabaseApiResponse, setCoinbaseApiResponse] = useState();
    const [selectedCoin, setSelectedCoin] = useState();

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
                return ['Bitcoin', 'BTC'];
            }
            case 'bitcoincash': {
                console.log(' this is Bitcoin Cash');
                return ['Bitcoin Cash', 'BTH'];
            }
            case 'litecoin': {
                console.log(' this is Litecoin');
                return ['Litecoin', 'LTC'];
            }
            case 'ethereum': {
                console.log(' this is Ethereum');
                return ['Ethereum', 'ETH'];
            }
            case 'usdc': {
                console.log(' this is USD coin');
                return ['USD coin', 'USDC'];
            }
            default: 
                return null;
        }
    }


    const _renderListTile = ([name, iconcode]) => {
        const Icons = {
            'BTC': () => <img className={classes.icon} src="data:image/png;base64,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" alt="Bitcoin"></img>,
            'BTH': () => <img className={classes.icon} src="data:image/png;base64,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" alt="Bitcoin Cash"></img>,
            'ETH': () => <img className={classes.icon} src="data:image/png;base64,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" alt="Ethereum"></img>,
            'LTC': () => <img className={classes.icon} src="data:image/png;base64,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" alt="Litecoin"></img>,
            'USDC': () => <img className={classes.icon} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1IDMwQTE1IDE1IDAgMSAwIDE1IC4wMDIgMTUgMTUgMCAwIDAgMTUgMzB6IiBmaWxsPSIjMTY1MkYwIi8+PHBhdGggZD0iTTE5LjExIDE3LjM4NGMwLTIuMTg3LTEuMzMyLTIuOTI1LTMuOTA3LTMuMjc4LTEuOTAzLS4yNzUtMi4yNjktLjcyMi0yLjI2OS0xLjYxIDAtLjg4Ny42NDQtMS40NCAxLjg3NS0xLjQ0IDEuMTIyIDAgMS43Ny4zOSAyLjAzNSAxLjI5NGEuNDc4LjQ3OCAwIDAgMCAuNDUzLjM0N2guOTg0YS40MzkuNDM5IDAgMCAwIC40NC0uNTFjLS4zMTItMS40MjgtMS4yNzQtMi4yODctMi43ODQtMi41NTZWOC4xMjVhLjQ2OS40NjkgMCAwIDAtLjQ2OC0uNDY5aC0uOTM4YS40NjkuNDY5IDAgMCAwLS40NjkuNDY5djEuNDUzYy0xLjg3NC4yNjMtMy4wNTkgMS41LTMuMDU5IDMuMDg4IDAgMi4wNTMgMS4yNSAyLjg1IDMuODYzIDMuMjAzIDEuNzc4LjI5IDIuMjg0LjY3NSAyLjI4NCAxLjY4NCAwIDEuMDEtLjg2IDEuNjg4LTIuMDcyIDEuNjg4LTEuNjM0IDAtMi4xODctLjcxNi0yLjM3Mi0xLjY0NGEuNDc1LjQ3NSAwIDAgMC0uNDYtLjM4MmgtMS4wNjhhLjQzNi40MzYgMCAwIDAtLjQzNC41MWMuMjcyIDEuNTYyIDEuMjc1IDIuNzA2IDMuMzE5IDIuOTgxdjEuNDgxYS40NjkuNDY5IDAgMCAwIC40NjguNDdoLjkzOGEuNDY5LjQ2OSAwIDAgMCAuNDY5LS40N3YtMS40OGMxLjkzNy0uMzA3IDMuMTcxLTEuNjQ1IDMuMTcxLTMuMzIzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMS43ODQgMjMuOTYyYTkuMzc1IDkuMzc1IDAgMCAxIDAtMTcuNjEyLjY3Ni42NzYgMCAwIDAgLjQwMy0uNTkxdi0uODc1YS40NDMuNDQzIDAgMCAwLS42MjQtLjQ0NyAxMS4yNSAxMS4yNSAwIDAgMCAwIDIxLjQzOC40NDMuNDQzIDAgMCAwIC42MjQtLjQ0N3YtLjg3NWEuNjc2LjY3NiAwIDAgMC0uNDAzLS41OXpNMTguNDM3IDQuNDM3YS40NDQuNDQ0IDAgMCAwLS42MjUuNDQ3di44NzVhLjY3NC42NzQgMCAwIDAgLjQwMy41OSA5LjM3NiA5LjM3NiAwIDAgMSAwIDE3LjYxMy42MjUuNjI1IDAgMCAwLS40MDMuNTl2Ljg3NmEuNDQ0LjQ0NCAwIDAgMCAuNjI1LjQ0NyAxMS4yNSAxMS4yNSAwIDAgMCAwLTIxLjQzOHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4K" alt="USD Coin"></img>
        }
        
        return (
            <div className={classes.listTile} onClick={() => setSelectedCoin(iconcode)} key={name}>
                <div className={classes.listTileLeading}>
                    {Icons[iconcode]()}
                    <Typography variant="body1">{name}</Typography>
               </div>
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


    const _renderMenu = () => (
        <>
            <Typography variant="body1" className={classes.listTileText} >Select a cryptocurrency</Typography>
            {_renderList()}
            <Typography>{selectedCoin}</Typography>
        </>
    );
    
     
    const _renderAddressView = () => {
        console.log({coinabaseApiResponse, code: convertSymbolToCoinbase(selectedCoin)});
        const amount = coinabaseApiResponse.pricing[convertSymbolToCoinbase(selectedCoin)].amount;
        const usdPrice = coinabaseApiResponse.pricing.local.amount;
        const address = coinabaseApiResponse.addresses[convertSymbolToCoinbase(selectedCoin)];
        const title = convertSymbolToCoinbase(selectedCoin);
        console.log(title);
        return (<>
            <Typography variant="body1" className={classes.listTileText} >To pay send {selectedCoin} to the address below </Typography>
            <div className={classes.block}>
                <Typography variant="body1">Amount</Typography>
                <div className={classes.amountBox}>
                    <div className={classes.amountBoxLeading}>
                    <Typography variant="body2">{amount}</Typography>
                    <Typography variant="body2">{selectedCoin}</Typography>
                    </div>
                    <Typography variant="body2" color="primary">({usdPrice} USD)</Typography>
                </div>
            </div>
            <div className={classes.block}>
                <Typography variant="body1">{_transformCodeForName(title)[0]} address</Typography>
                <div className={classes.amountBox}>
                   <Typography variant="body2" color="primary">{address}</Typography>
                </div>
            </div>
            <Button color="primary" onClick={() => setSelectedCoin(null)}>Back</Button>
        </>);
    };


    return (
        <Paper className={classes.paper}>
            {_renderHeader()}
            <div className={classes.body}>
            {!selectedCoin ? _renderMenu() : _renderAddressView()}
               
            </div>
        </Paper>
    )
}

export default withStyles(styles)(CoinbaseFrame);

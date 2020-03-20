import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/styles/withStyles";
import styles from "../../../styles/congratulations.styles";
import config from "../../../config";
import defaultResolution from "../../../config/defaultResolution";

const Congratulations = ({ classes, email, transactionResponse, setStep }) => {
  const {
    order: { orderNumber }
  } = transactionResponse;
  const [isMined, setIsMined] = useState(false);
  const [txHash, setTxHash] = useState("");
  useEffect(() => {
    if (isMined) return;
    async function _fetchBlockchainStatus() {
      if (isMined === true) return;
      const url = `https://unstoppabledomains.com/api/v1/resellers/${config.reseller}/users/${email}/orders/${orderNumber}`;
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authentication: `Bearer ${config.token}`,
          "Content-Type": "application/json"
        }
      });
      const payload = await resp.json();
      if (resp.status === 200) {
        console.log({ payload });

        const mineResult = payload.order.items[0].blockchain.status === "MINED";
        setTxHash(payload.order.items[0].blockchain.txHash);
        setIsMined(mineResult);
        const storage = JSON.parse(localStorage.getItem("own_domain"));
        storage.mined = mineResult;
        localStorage.setItem("own_domain", JSON.stringify(storage));
      }
    }
    const interval = setInterval(_fetchBlockchainStatus, 5000);
    return () => clearInterval(interval);
  }, [isMined, orderNumber, email]);

  const handleRedirect = e => {
    return setStep(1);
  };

  const renderAddrInfo = () => {
    const renderWalletsAddr = () => {
      const result = [];

      for (const [ticker, addr] of Object.entries(defaultResolution)) {
        result.push(
          <div className={classes.row2} key={ticker}>
            <Typography variant="body1" className={classes.ticker}>
              {ticker}:
            </Typography>
            <Typography variant="body1" className={classes.addr}>
              {addr}
            </Typography>
          </div>
        );
      }
      return result;
    };

    return (
      <>
        <Typography
          variant="h6"
          className={`${classes.bold} ${classes.AddrTitle}`}
        >
          These addresses in your wallet have been linked to your name.
        </Typography>
        {renderWalletsAddr()}
      </>
    );
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.headerDiv}>
        <Typography variant="h3" color="primary" className={classes.headerText}>
          Congratulations!
        </Typography>
      </div>
      <Divider />
      {renderAddrInfo()}
      <div className={classes.mainDiv}>
        <div className={classes.row}>
          <Typography variant="h5" className={`${classes.bold}`}>
            Order status:
          </Typography>
          {isMined ? (
            <Typography variant="h5" className={classes.bold}>
              Mined
            </Typography>
          ) : (
            <div>
              <Typography variant="h5">Pending</Typography>
            </div>
          )}
        </div>
        <div className={classes.row}>
          {txHash ? (
            <>
              <Typography
                variant="h5"
                className={`${classes.bold}`}
                style={{ width: "100%" }}
              >
                Tx Hash:{" "}
              </Typography>
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ wordBreak: "break-all" }}
              >
                {txHash}
              </a>
            </>
          ) : null}
        </div>
        {isMined ? null : <LinearProgress className={classes.linearProgress} />}
        <Typography variant="body1" className={classes.statusText}>
          Blockchain transaction requires some time. You can go back to homepage
          the transaction is not going to be lost.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={`${classes.button}`}
          classes={{ label: classes.buttonLabel }}
          onClick={handleRedirect}
        >
          Homepage
        </Button>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Congratulations);

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LiveIcon from '@material-ui/icons/NewReleases';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/congratulations.styles';

const Congratulations = ({ classes }) => {
	return (
		<Paper className={classes.paper}>
			<div className={classes.headerDiv}>
				<Typography variant="h3" color="primary" className={classes.headerText}>
					Congratulations!
				</Typography>
			</div>
			<Typography variant="h5" className={classes.bold}>Order status:</Typography>
			<Typography variant="body1"
				className={classes.mainText}
			>
				Blockchain transaction requires some time. You can go back to homepage the transaction is not going to be lost.
			</Typography>
			<Button variant="contained"
				color="primary"
				className={`${classes.button}`}
				classes={{ label: classes.buttonLabel }}>Homepage</Button>
		</Paper >
	);
};

export default withStyles(styles)(Congratulations);

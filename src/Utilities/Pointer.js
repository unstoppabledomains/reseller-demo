import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/pointer.styles';

const Pointer = ({ classes }) => {
  return (
    <div className={classes.circle1}>
      <div className={classes.circle2}>
        <div className={classes.circle3}></div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Pointer);

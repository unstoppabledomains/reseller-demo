import React from 'react';
import { Paper, Typography, Divider, Checkbox } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const SideBar = ({ classes }) => {
  const [showPointer, setShowPointer] = React.useState(true);
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.bold}>
          Reseller Domain Purchase
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          This demo shows how to buy a domain from your wallet
        </Typography>
        <Divider />
        <Checkbox
          checked={showPointer}
          onChange={() => setShowPointer(!showPointer)}
          color="primary"
          icon={<CheckBoxOutlineBlankIcon className={classes.checkbox} />}
          checkedIcon={<CheckBoxIcon className={classes.checkbox} />}
        />
      </Paper>
    </div>
  );
};

export default SideBar;

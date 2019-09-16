import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppsIcon from '@material-ui/icons/Apps';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckIcon from '@material-ui/icons/Check';
import styles from '../../styles/dropDownMenu.styles';

const menuItems = ['Version 1', 'Version 2'];

const DropDownMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { classes, handleVersionChange, version } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = index => {
    handleVersionChange(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        color="primary"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.sortButton}
      >
        <AppsIcon className={classes.leftIconSortMenu} />
        <span className={classes.buttonText}>Select Demo {version + 1}</span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ zIndex: 1302 }}
      >
        {menuItems.map((text, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSort(index)}
            className={classes.menuItem}
          >
            {index === version ? (
              <CheckIcon className={classes.leftIconSortMenu} />
            ) : null}
            {text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(DropDownMenu);

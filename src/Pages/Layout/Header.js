import React from 'react';
import styles from '../../styles/header.styles';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  ClickAwayListener
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import DocsIcon from '@material-ui/icons/ChromeReaderMode';
import SideBar from './SideBar';

const Header = ({ classes }) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logoDiv}>
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <div onClick={handleDrawer} className={classes.drawerTrigger}>
            <Typography color="textSecondary" className={classes.buttonText}>
              {open ? (
                <>
                  <ArrowLeftIcon />
                  Hide Instructions
                </>
              ) : (
                <>
                  <ArrowRightIcon />
                  Show Instructions
                </>
              )}
            </Typography>
          </div>
          <Link
            href="https://unstoppabledomains.github.io/unstoppabledocs/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <DocsIcon className={classes.docsIcon} /> Read Demo Documentation
          </Link>
        </Toolbar>
      </AppBar>
      {/* <ClickAwayListener onClickAway={handleDrawer}> */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <SideBar classes={classes} />
      </Drawer>
      {/* </ClickAwayListener> */}
    </>
  );
};

export default withStyles(styles)(Header);

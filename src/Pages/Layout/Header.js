import React from 'react';
import styles from '../../styles/header.styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
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
            <img src="/images/logo.png" alt="logo" />
          </div>
          <div onClick={handleDrawer} className={classes.drawerTrigger}>
            <Typography color="textSecondary">
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
          <a href="/" className={classes.link}>
            <DocsIcon className={classes.docsIcon} /> Read Demo Documentation
          </a>
        </Toolbar>
      </AppBar>
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
    </>
  );
};

export default withStyles(styles)(Header);

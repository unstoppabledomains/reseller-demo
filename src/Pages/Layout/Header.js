import React from 'react';
import styles from '../../styles/header.styles';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import DocsIcon from '@material-ui/icons/ChromeReaderMode';
import SideBar from './SideBar';
import DropDownMenu from './DropDownMenu';

const Header = ({
  classes,
  handlePointer,
  pointer,
  step,
  randomizeDomain,
  setEmail,
  isDomainLive
}) => {
  const [open, setOpen] = React.useState(true);
  const [version, setVersion] = React.useState(0);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleVersionChange = version => {
    setVersion(version);
  };

  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.leftSide}>
            <div className={classes.logoDiv}>
              <img src="/images/logo.svg" alt="logo" />
            </div>
            <div onClick={handleDrawer} className={classes.drawerTrigger}>
              <Typography
                color="textSecondary"
                className={`${classes.buttonTextToggle} ${classes.sideBarToggleDiv}`}
              >
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
          </div>
          <div className={classes.leftSide}>
            <DropDownMenu
              version={version}
              handleVersionChange={handleVersionChange}
            />
            <img src="/images/github.svg" alt="github" />
          </div>
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
        <SideBar
          classes={classes}
          pointer={pointer}
          handlePointer={handlePointer}
          step={step}
          randomizeDomain={randomizeDomain}
          setEmail={setEmail}
          isDomainLive={isDomainLive}
        />
      </Drawer>
    </>
  );
};

export default withStyles(styles)(Header);

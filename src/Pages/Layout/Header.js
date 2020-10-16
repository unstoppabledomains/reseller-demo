import React from 'react';
import styles from '../../styles/header.styles';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
  isDomainLive,
  history,
  setStep,
  setDomainName
}) => {
  const index =
    history.location.pathname === '/reseller-demo'
      ? 0
      : history.location.pathname === '/domain-name-reloution'
      ? 1
      : history.location.pathname === '/domain-name-reloution-v2'
      ? 2
      : 0;
  const [open, setOpen] = React.useState(true);
  const [version, setVersion] = React.useState(index);

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
            <div
              className={classes.logoDiv}
              onClick={() => {
                setDomainName('');
                setStep(0);
              }}
            >
              <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="logo" />
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
              history={history}
            />
            <img src={process.env.PUBLIC_URL + "/images/github.svg"} alt="github" />
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
          setDomainName={setDomainName}
          history={history}
        />
      </Drawer>
    </>
  );
};

export default withStyles(styles)(Header);

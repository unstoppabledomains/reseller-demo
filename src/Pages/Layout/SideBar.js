import React from 'react';
import { Paper, Typography, Divider, Checkbox, Link } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const SideBar = ({ classes }) => {
  const [showPointer, setShowPointer] = React.useState(true);
  const [activeCard, setActiveCard] = React.useState(2);
  const selectedElement = React.useRef(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    console.log(selectedElement.current.clientHeight);
    setHeight({
      height: selectedElement.current.clientHeight,
      cardNumber: activeCard
    });
  }, [selectedElement, activeCard]);

  const randomize = () => {
    console.log('randomize clicked');
  };

  const setExampleEmail = () => {
    console.log('example email clicked');
  };
  const setCCNumber = () => {
    console.log('credit card number clicked');
  };

  const randomizeLink = (
    <Typography
      color="primary"
      onClick={() => randomize()}
      className={classes.buttonText}
    >
      Randomize
    </Typography>
  );
  const emailExampleLink = (
    <Typography
      color="primary"
      onClick={() => setExampleEmail()}
      className={classes.buttonText}
    >
      example@example.com
    </Typography>
  );

  const cCNumberLink = (
    <Typography
      color="primary"
      onClick={() => setCCNumber()}
      className={classes.buttonText}
    >
      4242 4242 4242 4242
    </Typography>
  );

  const renderCard = (header, text, element) => (
    <div className={classes.card}>
      {Number(header[0]) === activeCard && height.cardNumber === activeCard ? (
        <div className={classes.selected} style={{ height: height.height }} />
      ) : null}
      <Paper
        className={classes.paper}
        ref={Number(header[0]) === activeCard ? selectedElement : null}
      >
        <div>
          <Typography
            variant="h6"
            className={classes.bold}
            onClick={() => setActiveCard(Number(header[0]))}
          >
            {header}
          </Typography>
          <Typography className={classes.text}>
            {text}
            {element ? element : null}
          </Typography>
        </div>
      </Paper>
    </div>
  );

  return (
    <div className={classes.sideBarRoot}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.bold}>
          Reseller Domain Purchase
        </Typography>
        <Typography className={classes.text}>
          This demo shows how to buy a domain from your wallet
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.checkboxDiv}>
          <Checkbox
            checked={showPointer}
            onChange={() => setShowPointer(!showPointer)}
            color="primary"
            className={classes.checkboxWrapper}
            icon={<CheckBoxOutlineBlankIcon className={classes.checkbox} />}
            checkedIcon={<CheckBoxIcon className={classes.checkbox} />}
          />
          <Typography variant="subtitle1" className={classes.bold}>
            Show guiding pointer
          </Typography>
        </div>
      </Paper>
      {renderCard(
        '1. Find a domain',
        'For this demo use this domain namespace reseller-test-udtesting-[random number].zil',
        randomizeLink
      )}
      {renderCard(
        '2. Buy a Domain',
        'Press “Buy Domain” button if domain is avaliable'
      )}
      {renderCard('3. Enter Email', 'Use any email or just', emailExampleLink)}
      {renderCard(
        '4. Pay with credit card',
        'Use any future date and this card number for tests',
        cCNumberLink
      )}
      <div className={classes.helpDiv}>
        <Typography variant="h5" className={classes.bold}>
          Need Help?
        </Typography>
        <Typography variant="body2" className={classes.text}>
          <Link
            href="mailto:support@unstoppabledomains.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Please contact
          </Link>{' '}
          our development team
        </Typography>
      </div>
    </div>
  );
};

export default SideBar;

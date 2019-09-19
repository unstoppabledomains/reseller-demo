import React from 'react';
import { Paper, Typography, Divider, Checkbox, Link } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const SideBar = ({
  classes,
  pointer,
  handlePointer,
  step,
  randomizeDomain,
  setEmail,
  isDomainLive,
  setDomainName,
  history
}) => {
  const selectedElement = React.useRef(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight({
      height: selectedElement.current
        ? selectedElement.current.clientHeight
        : 0,
      cardNumber: step
    });
  }, [selectedElement, step]);

  const randomizeLink = (
    <span onClick={() => randomizeDomain()} className={classes.buttonText}>
      <br />
      Randomize
    </span>
  );
  const emailExampleLink = (
    <span
      onClick={() => setEmail('example@example.com')}
      className={classes.buttonText}
    >
      example@example.com
    </span>
  );

  const domainsLinks = (
    <>
      <span
        onClick={() => setDomainName('unstoppable.zil')}
        className={classes.buttonText}
      >
        <br />
        unstoppable.zil
      </span>
      <span
        onClick={() => setDomainName('tyranids.zil')}
        className={classes.buttonText}
      >
        <br />
        tyranids.zil
      </span>
      <span
        onClick={() => setDomainName('loveiseverywhere.zil')}
        className={classes.buttonText}
      >
        <br />
        loveiseverywhere.zil
      </span>
    </>
  );

  const cCNumberLink = (
    <span className={classes.coloredText}>4242 4242 4242 4242</span>
  );

  const renderCard = (header, text, element) => (
    <div className={classes.card}>
      {Number(header[0]) === step + 1 && height.cardNumber === step ? (
        <div className={classes.selected} style={{ height: height.height }} />
      ) : null}
      <Paper
        className={classes.paper}
        ref={Number(header[0]) === step + 1 ? selectedElement : null}
      >
        <div>
          <Typography variant="h6" className={classes.bold}>
            {header}
          </Typography>
          <Typography className={classes.text}>
            {text} {element ? element : null}
          </Typography>
          {isDomainLive && header[0] === '2' ? (
            <Typography color="error">
              THIS IS A LIVE DOMAIN, YOU WILL BE CHARGED AT THE END
            </Typography>
          ) : null}
        </div>
      </Paper>
    </div>
  );

  if (history.location.pathname === '/reseller-demo') {
    return (
      <>
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
              checked={pointer}
              onChange={() => handlePointer()}
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
        {renderCard(
          '3. Enter Email',
          'Use any email or just',
          emailExampleLink
        )}
        {renderCard(
          '4. Choose payment method',
          'Use can pay with credit card or crypto',
          null
        )}
        {renderCard(
          '5. Pay with credit card',
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
      </>
    );
  } else if (history.location.pathname === '/domain-name-reloution') {
    return (
      <>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.bold}>
            Domain Name Resolution example
          </Typography>
          <Typography className={classes.text}>
            This demo shows how domain names can replace long wallet addresses
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.checkboxDiv}>
            <Checkbox
              checked={pointer}
              onChange={() => handlePointer()}
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
        {renderCard('1. Type Domain', 'Try out these names:', domainsLinks)}
        {renderCard(
          '2. Select cryptocurency',
          'Choose cryptocurency you want to send (Bitcoin or Ethreum).'
        )}
        {renderCard(
          '3. Choose amount',
          'Type how many crypto or dollars you want to send'
        )}
        {renderCard('4. Send Crypto', 'Press “Request Payment” to finish')}
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
      </>
    );
  } else if (history.location.pathname === '/domain-name-reloution-v2') {
    return (
      <>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.bold}>
            Domain Name Resolution example
          </Typography>
          <Typography className={classes.text}>
            This demo shows how domain names can replace long wallet addresses
          </Typography>
          <Divider className={classes.divider} />
          <div className={classes.checkboxDiv}>
            <Checkbox
              checked={pointer}
              onChange={() => handlePointer()}
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
          '1. Select cryptocurency',
          'Choose cryptocurency you want to send (Bitcoin or Ethreum).'
        )}
        {renderCard('2. Type Domain', 'Try out these names:', domainsLinks)}

        {renderCard(
          '3. Choose amount',
          'Type how many crypto or dollars you want to send'
        )}
        {renderCard('4. Send Crypto', 'Press “Request Payment” to finish')}
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
      </>
    );
  }
};

export default SideBar;

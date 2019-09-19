// import React, { useState, useEffect, useRef } from 'react';
// import { Paper, Typography, Divider, Checkbox, Link } from '@material-ui/core';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';

// const SideBar = ({ classes, pointer, handlePointer, step, setDomainName }) => {
//   const selectedElement = useRef(0);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     setHeight({
//       height: selectedElement.current
//         ? selectedElement.current.clientHeight
//         : 0,
//       cardNumber: step
//     });
//   }, [selectedElement, step]);

//   const domainsLinks = (
//     <>
//       <span
//         onClick={() => setDomainName('unstoppable.zil')}
//         className={classes.buttonText}
//       >
//         <br />
//         unstoppable.zil
//       </span>
//       <span
//         onClick={() => setDomainName('tyranids.zil')}
//         className={classes.buttonText}
//       >
//         <br />
//         tyranids.zil
//       </span>
//       <span
//         onClick={() => setDomainName('loveiseverywhere.zil')}
//         className={classes.buttonText}
//       >
//         <br />
//         loveiseverywhere.zil
//       </span>
//     </>
//   );

//   const renderCard = (header, text, element) => (
//     <div className={classes.card}>
//       {Number(header[0]) === step + 1 && height.cardNumber === step ? (
//         <div className={classes.selected} style={{ height: height.height }} />
//       ) : null}
//       <Paper
//         className={classes.paper}
//         ref={Number(header[0]) === step + 1 ? selectedElement : null}
//       >
//         <div>
//           <Typography variant="h6" className={classes.bold}>
//             {header}
//           </Typography>
//           <Typography className={classes.text}>
//             {text} {element ? element : null}
//           </Typography>
//         </div>
//       </Paper>
//     </div>
//   );

//   return (
//     <>
//       <Paper className={classes.paper}>
//         <Typography variant="h5" className={classes.bold}>
//           Domain Name Resolution example
//         </Typography>
//         <Typography className={classes.text}>
//           This demo shows how domain names can replace long wallet addresses
//         </Typography>
//         <Divider className={classes.divider} />
//         <div className={classes.checkboxDiv}>
//           <Checkbox
//             checked={pointer}
//             onChange={() => handlePointer()}
//             color="primary"
//             className={classes.checkboxWrapper}
//             icon={<CheckBoxOutlineBlankIcon className={classes.checkbox} />}
//             checkedIcon={<CheckBoxIcon className={classes.checkbox} />}
//           />
//           <Typography variant="subtitle1" className={classes.bold}>
//             Show guiding pointer
//           </Typography>
//         </div>
//       </Paper>
//       {renderCard('1. Type Domain', 'Try out these names:', domainsLinks)}
//       {renderCard(
//         '2. Select cryptocurency',
//         'Choose cryptocurency you want to send (Bitcoin or Ethreum).'
//       )}
//       {renderCard(
//         '3. Choose amount',
//         'Type how many crypto or dollars you want to send'
//       )}
//       {renderCard('4. Send Crypto', 'Press “Request Payment” to finish')}
//       <div className={classes.helpDiv}>
//         <Typography variant="h5" className={classes.bold}>
//           Need Help?
//         </Typography>
//         <Typography variant="body2" className={classes.text}>
//           <Link
//             href="mailto:support@unstoppabledomains.com"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Please contact
//           </Link>{' '}
//           our development team
//         </Typography>
//       </div>
//     </>
//   );
// };

// export default SideBar;

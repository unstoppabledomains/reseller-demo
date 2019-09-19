import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  paper: {
    minWidth: 528,
    width: 528,
    padding: theme.spacing(3)
  },
  bold: {
    fontWeight: 'bold'
  },
  lessBold: {
    fontWeight: 600
  },
  button: {
    width: '100%',
    height: 60,
    fontWeight: 'bold',
    marginTop: theme.spacing(3)
  },
  label: {
    fontWeight: 600,
    fontSize: 16,
    marginTop: theme.spacing(3)
  },
  input: {
    width: 252,
    height: 40,
    padding: theme.spacing(1),
    borderRadius: 6,
    border: 'solid 1px rgba(0, 0, 0, 0.2)'
  },
  inputDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuItem: {
    minHeight: 40
  },
  sendToDiv: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: theme.palette.iceBlue,
    padding: theme.spacing(2)
  },
  userIcon: {
    color: '#96a0d1',
    marginRight: theme.spacing(1)
  },
  nameDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5)
  },
  dividerCrypto: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  exchangeDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exchangeRate: {
    display: 'flex',
    flexDirection: 'column'
  },
  textExchange: {
    lineHeight: 1
  },
  labelsDiv: {
    display: 'flex'
  },
  trancatedText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  errorDiv: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#fff1f1',
    padding: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  errorMessage: {
    fontWeight: 600
  },
  finalHeader: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3)
  },
  chooseCryptoDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer'
  },
  insideCryptoDiv: {
    display: 'flex',
    alignItems: 'center'
  },
  cryptoIcon: {
    marginRight: theme.spacing(2)
  },
  inputDemo2: {
    height: 40,
    padding: theme.spacing(1),
    borderRadius: 6,
    border: 'solid 1px rgba(0, 0, 0, 0.2)',
    width: '100%'
  }
}));

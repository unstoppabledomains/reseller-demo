import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  // check for unused styles

  paper: {
    minWidth: 528,
    padding: theme.spacing(3)
  },
  headerDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  bold: {
    fontWeight: 800
  },
  searchButton: {
    textTransform: 'none',
    fontSize: 16,
    fontWeight: 'bold'
  },
  searchIcon: {
    marginRight: theme.spacing(1)
  },
  domainDiv: {
    backgroundColor: theme.palette.iceBlue,
    padding: theme.spacing(2),
    borderRadius: 6,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-between'
  },
  extension: {
    fontWeight: 300
  },
  lessBold: {
    fontWeight: 500
  },
  input: {
    height: 40,
    borderRadius: 6,
    border: 'solid 1px rgba(0, 0, 0, 0.2)',
    width: '100%',
    padding: theme.spacing(1)
  },
  button: {
    width: '100%',
    height: 60,
    fontWeight: 'bold',
    marginTop: theme.spacing(3)
  },
  inputDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  errorDiv: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#fff1f1',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  errorMessage: {
    fontWeight: 600
  },
  stripeLogoDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  protectedIcon: {
    color: '#6772e5'
  },
  stripeText: {
    color: '#6772e5',
    fontWeight: 600,
    fontSize: 14,
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1)
  },
  stripeForm: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  stripeField: {
    height: 40,
    borderRadius: 6,
    border: 'solid 1px rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(1)
  },
  loadingDiv: {
    width: '100%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3)
  },
  coinbaseContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: -theme.spacing(3.5),
    }
  },
  coinbaseButton: {
    display: 'none'
  }
}));

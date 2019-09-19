import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  paper: {
    minWidth: 528,
    padding: theme.spacing(3)
  },
  bold: {
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 600,
    fontSize: 16,
    marginTop: theme.spacing(3)
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    height: 40,
    padding: theme.spacing(1),
    borderRadius: 6,
    border: 'solid 1px rgba(0, 0, 0, 0.2)'
  },
  button: {
    minWidth: 131,
    height: 40,
    marginLeft: theme.spacing(1),
    display: 'flex',
    '&:focus': {
      outline: 'none'
    }
  },
  buttonLabel: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    background: '#e6f6ff',
    padding: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  notAvailable: {
    background: 'rgba(123, 122, 156, 0.08)',
    padding: theme.spacing(2),
    marginTop: theme.spacing(3)
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  warningMargin: {
    marginTop: theme.spacing(1.5),
    width: 420
  },
  warningLabel: {
    marginLeft: theme.spacing(1)
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(1.5)
  },
  label: {
    color: '#7782a0'
  },
  wideButton: {
    width: '100%',
    height: 60,
    marginTop: theme.spacing(1.75),
    marginLeft: 0
  },
  noOutline: {
    outline: 'none'
  },
  storageDiv: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    width: '100%'
  },
  linearProgress: {
    marginTop: theme.spacing(1),
    height: 2,
    width: '100%'
  }
}));

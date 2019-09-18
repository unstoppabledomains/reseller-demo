import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  paper: {
    width: 528,
    padding: theme.spacing(3)
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(1.875),
    paddingBottom: theme.spacing(1.875)
  },
  headerText: {
    fontSize: 40
  },
  statusText: {
    marginTop: theme.spacing(3)
  },
  row: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%'
  },
  linearProgress: {
    marginTop: theme.spacing(1),
    height: 2
  },
  bold: {
    fontWeight: 'bold'
  },
  mainDiv: {
    marginTop: theme.spacing(3)
  },
  button: {
    width: '100%',
    height: 60,
    fontWeight: 'bold',
    marginTop: theme.spacing(3)
  }
}));

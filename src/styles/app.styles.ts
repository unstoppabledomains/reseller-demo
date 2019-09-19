import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: 'relative'
  },
  layout: {
    marginTop: theme.spacing(12),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}));

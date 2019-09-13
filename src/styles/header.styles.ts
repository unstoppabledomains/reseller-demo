import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    zIndex: 1301,
    position: 'fixed',
    height: 72
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    height: 72,
    // justifyContent: 'space-between',
    padding: `0 ${theme.spacing(3)}px`
  },
  logoDiv: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerTrigger: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 151
  },
  drawerPaper: {
    paddingTop: 72
  },
  link: {
    display: 'flex',
    alignItems: 'center'
  },
  docsIcon: {
    marginRight: theme.spacing(1)
  }
}));

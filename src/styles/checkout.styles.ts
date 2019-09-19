import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  paper: {
    minWidth: 528,
    padding: theme.spacing(3)
  },
  bold: {
    fontWeight: 800
  },
  gridItem: {
    padding: theme.spacing(1)
  },
  card: {
    minWidth: '180px',
    height: '184px',
    textAlign: 'center',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.iceBlue,
    color: theme.palette.primary.main
  },
  cardActionArea: {
    height: '100%'
  },
  cardIcon: {
    padding: 0
  },
  smallIconsDiv: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stripeText: {
    color: '#6772e5',
    fontWeight: 600,
    fontSize: 14,
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  protectedIcon: {
    color: '#6772e5'
  },
  iconMedium: {
    fontSize: '9em'
  },
  mainIconDiv: {
    width: '99px',
    height: '99px',
    display: 'flex',
    alignItems: 'middle',
    justifyContent: 'center',
    margin: 'auto'
  },
  smallIcon: {
    margin: `0 ${theme.spacing(0.5)}px`
  },
}));

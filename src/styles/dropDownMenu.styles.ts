import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  root: {
    marginRight: theme.spacing(2)
  },
  leftIconSortMenu: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      margin: 0
    }
  },
  buttonText: {
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  sortButton: {
    '&:focus': {
      outline: 'none'
    },
    minWidth: 140,
    [theme.breakpoints.down('xs')]: {
      minWidth: 0
    }
  },
  menuItem: {
    minWidth: 140
  }
}));

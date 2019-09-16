import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
  circle1: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(100, 214, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle2: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(100, 214, 255, 0.3)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle3: {
    width: 12,
    height: 12,
    backgroundColor: '#21c4ff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

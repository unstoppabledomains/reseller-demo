import { createStyles } from '@material-ui/core/styles';
import { relative } from 'path';

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
	row: {
		display: 'inline-flex',
		justifyContent: 'flex-start',
		position: 'relative',
		width: '100%'
	},
	linearProgress: {
		width: '65%',
		position: 'absolute',
		bottom: 13,
		right: 3,
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
	},

}));

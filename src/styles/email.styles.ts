import { createStyles } from '@material-ui/core/styles';

export default createStyles((theme: any) => ({
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
		margin: `${theme.spacing(2)}px 0`,
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
		alignItems: 'center'
	},
	errorDiv: {
		width: '100%',
		borderRadius: 6,
		backgroundColor: '#fff1f1',
		padding: theme.spacing(2),
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	errorMessage: {
		fontWeight: 600
	}
}));

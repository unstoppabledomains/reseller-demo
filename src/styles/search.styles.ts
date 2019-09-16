import { createStyles } from '@material-ui/core/styles';



export default createStyles((theme: any) => ({
	paper: {
		minWidth: 528,

		padding: theme.spacing(3),

	},
	bold: {
		fontWeight: 'bold',
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
	},
	buttonLabel: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	}

}));
import { createStyles } from '@material-ui/core/styles';



export default createStyles((theme: any) => ({
	paper: {
		minWidth: 528,

		padding: theme.spacing(3),

	},
	bold: {
		fontWeight: 'bold',
		margin: `${theme.spacing(3)}px 0`
	},
	text: {
		margin: `${theme.spacing(2)}px 0`,
		fontWeight: 600,
		fontSize: '16px'
	}

}));
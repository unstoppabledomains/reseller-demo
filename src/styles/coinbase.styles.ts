import { createStyles } from '@material-ui/core/styles';
import { borderRadius } from '@material-ui/system';

export default createStyles((theme: any) => ({
    paper: {
        minWidth: 528,
        
    },
    header: {
        padding: theme.spacing(3),
        width: '100%',
        backgroundColor: 'rgb(22,36,50)',
        display: 'flex',
        justifyContent: 'space-around'

    },
    priceBox: {
        padding: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        maxWidth: 80,
    },
    description: {
        color: 'white',
    },
    body: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    listTile: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        border: '1px solid grey',
        margin: theme.spacing(1),
    },
    listTileText: {
        fontWeight: 'bold !important'
    }

}));

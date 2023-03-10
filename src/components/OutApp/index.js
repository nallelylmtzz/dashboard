import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from '@mui/material';

import Btn from '../Btn/index'

const OutApp = (props) => {

    const { open } = props;

    return (
        <Dialog open={open}>
            <DialogTitle>Cerrar ventana</DialogTitle>
            <DialogContent style={{ paddingTop: 10 }} >
                <Grid container spacing={2} >
                    <Grid item md={12} >
                    ¿Deseas mantener tus datos ingresados?
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Btn success={true} />
                <Btn success={false}  />

            </DialogActions>
        </Dialog>
    );
};

export default OutApp;

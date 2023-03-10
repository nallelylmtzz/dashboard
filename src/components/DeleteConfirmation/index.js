import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { withStyles } from '@material-ui/core/styles';



const BtnSuccess = withStyles((theme) => ({
  root: {
    borderRadius: '8px',
    backgroundColor: '#5ca0f1',
    textTransform: 'none',
    padding: '5px 10px',
    color: '#ffffff',
    fontWeight: 400,
    boxShadow: 'inset 0 0 6px #00000012, 0 2px 6px #00000021',
    '&:hover': {
      background: '#5ca0f1',
    },
    '&:disabled': {
      opacity: 0.9,
      backgroundColor: '#5ca0f1',
    },
  },
  label: {
    fontSize: 12,
  }
}))(Button);

const BtnCancel = withStyles((theme) => ({
  root: {
    borderRadius: '8px',
    backgroundColor: '#f15c5c',
    textTransform: 'none',
    padding: '5px 10px',
    color: '#ffffff',
    fontWeight: 400,
    boxShadow: 'inset 0 0 6px #00000012, 0 2px 6px #00000021',
    '&:hover': {
      background: '#f15c5c',
    },
    '&:disabled': {
      opacity: 0.9,
      backgroundColor: '#f15c5c',
    },
  },
  label: {
    fontSize: 12,
  }
}))(Button);

const deleteConfirmation = (props) => {

  const { open, onClose, deleteComponent, serieId } = props;
 
  const confirmation = () => {
    deleteComponent();
    onClose();
  }

  return (
    <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
      <DialogTitle>Eliminar</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} >

            <Grid item md={12} >
                <Typography>¿Deseas eliminar el gráfico {serieId}?</Typography>
            </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <BtnCancel onClick={onClose} variant="contained" color="secondary" >Cancelar</BtnCancel>
        <BtnSuccess onClick={confirmation} variant="contained" color="primary" >Eliminar</BtnSuccess>
      </DialogActions>
    </Dialog>
  );
};

export default deleteConfirmation;

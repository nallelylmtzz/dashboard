import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

import tablero from '../../img/tablero.png'

const Dashboard = (props) => {

    const {open} = props;

  return (
    <Dialog  open={open}>
    <DialogTitle>¡Bienvenido!</DialogTitle>
   <DialogContent style={{textAlign:"center"}} >
    <Typography>Podrás agregar componentes a tu dashboard como tablas o graficas a su vez editarlas, eliminarlas, reordenarlas, personalizar los tipos de datos y color en graficas. </Typography>
    <img src={tablero} width={200} />
   </DialogContent>
  </Dialog>
  );
};

export default Dashboard;

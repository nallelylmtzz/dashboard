import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from "@mui/material";


const DataTable = (props) => {

  const { config } = props
  
  return (
    <>
     <Box mt={2} mb={2} >
      <Typography variant="h6" >{config.title}</Typography>
      <Typography variant="h6" >{config.idSerie}</Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Dato</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {config.datos ? config.datos.map((row, i) => (
              <TableRow hover  key={i}>
                <TableCell >
                  {row.fecha}
                </TableCell>
                <TableCell >
                  {row.dato}
                </TableCell>
              </TableRow>
            )) :
            <TableRow hover>
            <TableCell >
              Sin datos
            </TableCell>
          </TableRow>
            }
            <TableRow>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
     </>
  );
};

export default DataTable;

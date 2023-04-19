import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  DialogActions,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { IComentarios } from "./ISoliciudes";
import { queriesSolicitud } from "./queriesSolicitudes";
import { useEffect } from "react";

export const DialogSolicitudesUsuarios = ({
  open,
  handleClose,
  comentarios,
}:{
  open: boolean;
  handleClose: Function;
  comentarios: Array<IComentarios>;
}) => {

  useEffect(() => {
    console.log('comentario', comentarios);
  }, [])

  
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),

  ];
  
return (
 
    <Dialog
      open={open}
      onClose={() => handleClose()}
    >
      <DialogTitle>{"Comentarios"}</DialogTitle>
      <DialogContent>
        <Grid>
          {comentarios?.map((dato, index) => (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          ))}
        </Grid>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  
);}

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
  TableBody,
  Tooltip,
} from "@mui/material";
import { IComentarios } from "./ISoliciudes";
import { queriesSolicitud } from "./queriesSolicitudes";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";



export const DialogSolicitudesUsuarios = ({
  open,
  handleClose,
  comentarios,
}: {
  open: boolean;
  handleClose: Function;
  comentarios: Array<IComentarios>;
}) => {
  useEffect(() => {
    console.log("comentario", comentarios);
  }, []);

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

  const [alignComentarios, setAlignComentarios] = useState<string>("center")

  const alinearComentarios = (dato:string) => {
      setAlignComentarios("normal");
     return dato
  }

  return (
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={() => handleClose()}>
     
      <DialogContent>
        <Grid>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 550}}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ bgcolor:"#AF8C55" }}>
                <TableRow>
                  <TableCell sx={{fontWeight:"bold", color:"white"}} align="center">Usuario&nbsp;(s)</TableCell>
                  <TableCell sx={{fontWeight:"bold", color:"white"}} align="center">Comentario&nbsp;(s)</TableCell>
                  <TableCell sx={{fontWeight:"bold", color:"white"}} align="center">Fecha de creacion</TableCell>
                </TableRow>
              </TableHead>
              

              <TableBody >
                {comentarios.length !== 0 ? (
                  comentarios?.map((dato) => (
                    <StyledTableRow
                      key={dato.Id}
                      sx={{
                        maxWidth: 300,
                      }}
                    >
                      <StyledTableCell align="center">
                        <Typography 
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "normal",
                          width: 150,
                          fontSize: 14
                        }}>
                          {dato.NombreCreador.toUpperCase()}
                        </Typography>
                        
                      </StyledTableCell>

                      <StyledTableCell sx={{ overflow: "auto" }} align="justify">
                        <Tooltip title={dato.Comentario}>
                          <Typography
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "normal",
                              width: 500,
                              fontSize: 14
                            }}
                          >
                            {dato.Comentario.toUpperCase()}
                            {/* {pruebaComentario.toUpperCase()} */}
                          </Typography>
                        </Tooltip>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography 
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "normal",
                          fontSize: 15
                        }}>
                          {dato.FechaDeCreacion.split("T")[0]}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>  
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center"></TableCell>

                    <TableCell align="center">
                      <Typography 
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "normal",
                        width: 500,
                        fontSize: 14
                      }}
                      >
                        Sin comentarios
                      </Typography>
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
  );
};

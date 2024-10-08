/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/CustomComponents";
import { IEstatus } from "../../../components/Interfaces/Notificaciones/INotificaciones";
import { getEstatus } from "../../../components/LateralMenu/APINotificaciones";

export const Destinatarios = ({
  open,
  handleClose,
  IdNotificacion,
}: {
  open: boolean;
  handleClose: Function;
  IdNotificacion: string;
}) => {
  const [status, setStatus] = useState<Array<IEstatus>>([]);

  useEffect(() => {
    getEstatus(setStatus, IdNotificacion);
  }, [open === true]);

  return (
    <Dialog fullWidth maxWidth={"sm"} open={open} onClose={() => handleClose()}>
      |
      <DialogTitle>
        <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"bold"}>
          Estatus
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          gap={"20px"}
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
            <TableHead sx={{ bgcolor: "#AF8C55" }}>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", color: "white" }}
                  align="center"
                >
                  Usuario&nbsp;(s)
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "white" }}
                  align="center"
                >
                  Estatus
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status?.map((estado) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row" align="center">
                    {estado.Usuario.toString()}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="center">
                    {estado.Leido.toString() === "0" ? "No Leido" : "Leido"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

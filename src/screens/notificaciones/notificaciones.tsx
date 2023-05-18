import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Typography,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { StyledTableCell, StyledTableRow } from "../../components/CustomComponents";
import { getHistorialNotificaciones } from "../../components/LateralMenu/APINotificaciones";
import { IHistorial, } from "../../components/Interfaces/Notificaciones/INotificaciones";
import InfoIcon from '@mui/icons-material/Info';
import { Destinatarios } from "../Notificaciones/Dialog/InfoAdicional";
import { AñadirNotificaciones } from "../Notificaciones/Dialog/AñadirNotificaciones";
import { queries } from "../../queries";

export function Notificaciones() {
  //Declaraciones
  
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const heads = [
    {
      id: "Titulo",
      label: "Titulo",
    },
    {
      id: "Mensaje",
      label: "Mensaje",
    },
    {
      id: "FechaCreacion",
      label: "Fecha Envio",
    },
    {
      id: "hora",
      label: "Hora de envio",
    },
    {
      id: "CreadoPor",
      label: "Informacion Adicional",
    },
  ];

  const [historial, setHistorial] = useState<Array<IHistorial>>([]);
  const [estatus, setEstatus] = useState<Array<IHistorial>>([]);
  const [cantNoti, setCantNoti] = useState<number>();
  const [idNoti, setIdNoti] = useState<string>('');

  const [openDialog, setOpenDialog] = useState(false);
  const openDialogNotificaciones = () => {
    setOpenDialog(!openDialog);
  };

  const [openDestinatarios, setOpenDestinatarios] = useState(false);
  const openDialogDestinatarios = () => {
    setOpenDestinatarios(!openDestinatarios);
  };

  useEffect(() => {
    // getNotificaciones(setNotificaciones, setCantNoti);

    getHistorialNotificaciones(setHistorial);
  }, [openDialog]);

  return (
    <Grid
      container
      direction="column"
      rowSpacing={{ xs: 6, sm: 2, md: 4, xl: 3 }}
    >
      <Grid item width={"100%"}>
        {query.isMobile ? <LateralMenuMobile /> : <LateralMenu />}
      </Grid>

      <Grid item xl={10} xs={12} lg={12} sm={12}>
        <Grid item xl={12} display="flex" justifyContent="Center">
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              height: 50,
              color: "#AF8C55",
            }}
          >
            Historial de Notificaciones
          </Typography>
        </Grid>

           {/* <Grid
          item
          xl={4}
          lg={3}
          md={3}
          xs={3}
          sm={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            color="info"
            variant="contained"
            size="large"
            endIcon={<AddCommentIcon />}
            sx={QueriesNotificaciones.boton}
            onClick={() => {
              openDialogNotificaciones();
            }}
          >
            Añadir Notificacion
          </Button>
        </Grid> */}

        <Grid item sx={queries.tablaNotificaciones}>
          <Paper sx={{ height: "100%" }}>
            <TableContainer sx={{ maxHeight: "100%" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  {heads.map((head) => (
                    <StyledTableCell
                      key={head.id}
                      align="center"
                      sx={{ height: "10vh" }}
                    >
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {historial?.map((noti, index) => (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" align="center">
                        {noti.Titulo}
                      </StyledTableCell>

                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ textAlign: "justify", width: "30%" }}
                      >
                        {noti.Mensaje}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row" align="center">
                        {noti.Fecha}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row" align="center">
                        {noti.Hora}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row" align="center">
                        <IconButton
                          onClick={() => { setIdNoti(noti.Id); openDialogDestinatarios() }}
                        >
                          <InfoIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <Destinatarios
                  open={openDestinatarios}
                  handleClose={openDialogDestinatarios}
                  IdNotificacion={idNoti}
                />
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {openDialog ? (
          <AñadirNotificaciones
            open={openDialog}
            handleClose={openDialogNotificaciones}
          />
        ) : null}
      </Grid>
    </Grid >
  );
}
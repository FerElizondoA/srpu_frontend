import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import {
  StyledTableCell,
  StyledTableRow,
} from "../../components/CustomComponents";
import { IHistorial } from "../../components/Interfaces/Notificaciones/INotificaciones";
import { getHistorialNotificaciones } from "../../components/LateralMenu/APINotificaciones";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { LateralMenuMobile } from "../../components/LateralMenu/LateralMenuMobile";
import { queries } from "../../queries";
import { AñadirNotificaciones } from "../Notificaciones/Dialog/AñadirNotificaciones";
import { BarraFiltros } from "../../generics/BarraFiltros";

export function Notificaciones() {

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
  ];

  const [historial, setHistorial] = useState<Array<IHistorial>>([]);
  const [historialFilter, setHistorialFilter] = useState<Array<IHistorial>>([]);

  // const [busqueda, setBusqueda] = useState("");
  // const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  // const [fechaFin, setFechaFin] = useState<Date | null>(null);

  // const [idNoti, setIdNoti] = useState<string>("");

  const [openDialog, setOpenDialog] = useState(false);
  const openDialogNotificaciones = () => {
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    // getNotificaciones(setNotificaciones, setCantNoti);
    getHistorialNotificaciones(setHistorial);
  }, [openDialog]);

  useEffect(() => {
    setHistorialFilter(historial);
  }, [historial]);

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

              fontFamily: "MontserratBold",
              "@media (max-width: 600px)": {
                fontSize: "1.5rem",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                fontSize: "1.5ch",
              },
            }}
          >
            Historial de Notificaciones
          </Typography>
        </Grid>
        <BarraFiltros Lista={historial} setStateFiltered={setHistorialFilter}/>

        <Grid item sx={queries.tablaNotificaciones}>
          <Paper sx={{ height: "100%", width: "100%" }}>
            <TableContainer
              sx={{
                maxHeight: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#AF8C55",
                  outline: "1px solid slategrey",
                  borderRadius: 1,
                },
              }}
            >
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
                  {historialFilter?.map((noti, index) => (
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
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

                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {noti.Fecha}
                      </StyledTableCell>

                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {noti.Hora}
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
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
    </Grid>
  );
}

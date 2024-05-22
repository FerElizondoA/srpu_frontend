import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Grid,
  InputBase,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
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
    // {
    //   id: "CreadoPor",
    //   label: "Informacion Adicional",
    // },
  ];

  const [historial, setHistorial] = useState<Array<IHistorial>>([]);
  const [filterHistorial, setFilterHistorial] = useState<Array<IHistorial>>([]);

  const [busqueda,setBusqueda]=useState('');

  // const [idNoti, setIdNoti] = useState<string>("");

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

  useEffect(() => {
    // getNotificaciones(setNotificaciones, setCantNoti);
    setFilterHistorial(historial);
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
                fontSize: "1rem",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                fontSize: "1.5ch",
              },
            }}
          >
            Historial de Notificaciones
          </Typography>
        </Grid>
        {/* //////////////////////////////////////////////////////////////////////////// */}
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <Grid
            item
            xs={10}
            sm={5}
            md={5}
            lg={5}
            xl={5}
            display="center"
            justifyContent="center"
            alignItems={"center"}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                height: ["100%", "50%", "50%", "50%", "50%"],
                width: "100%",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar"
                value={
                  ""
                  // busqueda
                }
                onChange={(e) => {
                  // setBusqueda(e.target.value);
                  if (e.target.value === "") {
                    // setDatosFiltrados(datos);
                  }
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    // filtrarDatos();
                    ev.preventDefault();
                    return false;
                  }
                }}
              />
              {/* <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={
                  () => {}
                  // filtrarDatos()
                }
              >
                <SearchIcon />
              </IconButton> */}
            </Paper>
          </Grid>

          <Grid item xs={5} sm={2} md={2} lg={2} xl={2} mb={{ xs: 3 }}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha de la Inicial
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                // disabled={tipoMecanismoVehiculoPago === "Instrucción Irrevocable"}
                sx={{
                  width: "100%",
                }}
                value={
                  ""
                  // datosGenerales.fechaInstruccion
                }
                onChange={(v) => {
                  // setDatosGenerales({
                  //   ...datosGenerales,
                  //   fechaInstruccion: v,
                  // });
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={5} sm={2} md={2} lg={2} xl={2} mb={{ xs: 3 }}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fecha de la Final
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                // disabled={tipoMecanismoVehiculoPago === "Instrucción Irrevocable"}
                sx={{
                  width: "100%",
                }}
                value={
                  ""
                  // datosGenerales.fechaInstruccion
                }
                onChange={(v) => {
                  // setDatosGenerales({
                  //   ...datosGenerales,
                  //   fechaInstruccion: v,
                  // });
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={1} md={1} lg={1} xl={1} sx={{display:'flex', alignItems:'center',justifyContent:'center'}}>
            <Button
              sx={{...queries.buttonContinuar,minWidth:'60%'}}
              onClick={() => {
                // handler(false);
              }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>

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
                  {filterHistorial?.map((noti, index) => (
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

                      {/* <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <IconButton
                          onClick={() => {
                            setIdNoti(noti.Id);
                            openDialogDestinatarios();
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      </StyledTableCell> */}
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

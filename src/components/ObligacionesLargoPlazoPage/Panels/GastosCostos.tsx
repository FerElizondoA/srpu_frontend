import { useEffect, useState } from "react";
import {
  TextField,
  InputLabel,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Grid,
  Tooltip,
  Typography,
  TableRow,
  Button,
  Paper,
  createTheme,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { queries } from "../../../queries";
import CheckIcon from "@mui/icons-material/Check";
import validator from "validator";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import CloseIcon from "@mui/icons-material/Close";

interface Head {
  label: string;
}

const headsGC: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la inversión",
  },
  {
    label: "Descripcion",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Monto",
  },
  {
    label: "Accion",
  },
];

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});

export function GastoCostos() {
  //CATALOGO
  const catalogoDestinos: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoDestinos
  );

  // Datos tabla Gastos costos

  const generalGCDestino: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.generalGastosCostos.destino);

  const generalGCDetalleInversion: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.generalGastosCostos.detalleInversion);

  const generalGCClaveInscripcionFinanciamiento: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.claveInscripcionFinanciamiento
  );

  const generalGCDescripcion: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.descripcion
  );

  const generalGCMonto: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.monto
  );

  //TABLA GASTOS Y COSTOS

  const changeGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGeneralGastosCostos
  );

  const tablaGastosCostos: any = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  const removeGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.removeGeneralGastosCostos
  );

  // Gastos y costos

  const GCGastosAdicionales: string = useLargoPlazoStore(
    (state) => state.GastosCostos.gastosAdicionales
  );

  const GCSaldoVigente: number = useLargoPlazoStore(
    (state) => state.GastosCostos.saldoVigente
  );

  const GCMontoGastosAdicionales: number = useLargoPlazoStore(
    (state) => state.GastosCostos.montoGastosAdicionales
  );

  const addGeneralGastosCostos: Function = useLargoPlazoStore(
    (state) => state.addGeneralGastosCostos
  );

  const changeGastosCostos: Function = useLargoPlazoStore(
    (state) => state.changeGastosCostos
  );

  const addDocumento: Function = useLargoPlazoStore(
    (state) => state.addDocumento
  );

  const removeDocumento: Function = useLargoPlazoStore(
    (state) => state.removeDocumento
  );

  const detalleInversion: { archivo: File; nombreArchivo: string } =
    useLargoPlazoStore((state) => state.detalleInversion);

  const addRows = () => {
    let tab = {
      destino: generalGCDestino.Descripcion,
      detalleInversion: generalGCDetalleInversion.Descripcion,
      claveInscripcionFinanciamiento: generalGCClaveInscripcionFinanciamiento,
      descripcion: generalGCDescripcion,
      monto: generalGCMonto,
    };
    addGeneralGastosCostos(tab);
  };

  useEffect(() => {
    changeGeneralGastosCostos({
      destino: generalGCDestino,
      detalleInversion: generalGCDetalleInversion,
      claveInscripcionFinanciamiento: generalGCClaveInscripcionFinanciamiento,
      descripcion: generalGCDescripcion,
      monto: generalGCMonto,
    });

    changeGastosCostos({
      gastosAdicionales: GCGastosAdicionales,
      saldoVigente: GCSaldoVigente,
      montoGastosAdicionales: GCMontoGastosAdicionales,
      //Archivo
    });
  }, [
    generalGCDestino,
    generalGCMonto,
    GCGastosAdicionales,
    generalGCDetalleInversion,
  ]);

  function cargarArchivo(event: any) {
    let file = event.target.files[0];
    if (file !== undefined) {
      addDocumento(file, file.name);
    }
  }

  return (
    <Grid
      item
      container
      sx={{
        ...queries.contenedorInformacionGeneral,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoDestinos}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalGCDestino.Id || "",
              Descripcion: generalGCDestino.Descripcion || "",
            }}
            onChange={(event, text) => {
              changeGeneralGastosCostos({
                destino: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                detalleInversion: generalGCDetalleInversion,
                claveInscripcionFinanciamiento:
                  generalGCClaveInscripcionFinanciamiento,
                descripcion: generalGCDescripcion,
                monto: generalGCMonto,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id || value.Descripcion === ""
            }
          />
        </Grid>

        <Grid item lg={3}>
          <InputLabel
            sx={{
              ...queries.medium_text,
              "@media (min-width: 1485px)": {
                fontSize: "1.69ch",
              },
              "@media (min-width: 1870px)": {
                fontSize: "2ch",
              },
            }}
          >
            Clave de Inscripción del Financiamiento a Refinar
          </InputLabel>

          <TextField
            fullWidth
            value={generalGCClaveInscripcionFinanciamiento}
            onChange={(v) => {
              changeGeneralGastosCostos({
                destino: generalGCDestino,
                detalleInversion: generalGCDetalleInversion,
                claveInscripcionFinanciamiento: v.target.value,
                descripcion: generalGCDescripcion,
                monto: generalGCMonto,
              });
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            variant="standard"
          />
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Gastos Adicionales</InputLabel>
          <TextField
            fullWidth
            value={GCGastosAdicionales}
            onChange={(v) => {
              changeGastosCostos({
                gastosAdicionales: v.target.value,
                saldoVigente: GCSaldoVigente,
                montoGastosAdicionales: GCMontoGastosAdicionales,
              });
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Detalle de la Inversión
          </InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoDestinos}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={{
              Id: generalGCDetalleInversion.Id || "",
              Descripcion: generalGCDetalleInversion.Descripcion || "",
            }}
            onChange={(event, text) => {
              changeGeneralGastosCostos({
                destino: generalGCDestino,
                detalleInversion: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                claveInscripcionFinanciamiento:
                  generalGCClaveInscripcionFinanciamiento,
                descripcion: generalGCDescripcion,
                monto: generalGCMonto,
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Id === value.Id || value.Descripcion === ""
            }
          />
        </Grid>

        {/* AQUI VA DESCRIPCION */}
        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Descripción</InputLabel>
          <TextField
            value={generalGCDescripcion}
            onChange={(v) =>
              changeGeneralGastosCostos({
                destino: generalGCDestino,
                detalleInversion: generalGCDetalleInversion,
                claveInscripcionFinanciamiento:
                  generalGCClaveInscripcionFinanciamiento,
                descripcion: v.target.value,
                monto: generalGCMonto,
              })
            }
            fullWidth
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            variant="standard"
          />
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Gastos Adicionales
          </InputLabel>
          <TextField
            fullWidth
            placeholder="0"
            value={
              GCMontoGastosAdicionales <= 0
                ? ""
                : GCMontoGastosAdicionales.toString()
            }
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeGastosCostos({
                  gastosAdicionales: GCGastosAdicionales,
                  saldoVigente: GCSaldoVigente,
                  montoGastosAdicionales: v.target.value,
                });
              } else if (v.target.value === "") {
                changeGastosCostos({
                  gastosAdicionales: GCGastosAdicionales,
                  saldoVigente: GCSaldoVigente,
                  montoGastosAdicionales: 0,
                });
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid item display={"flex"} justifyContent={"space-evenly"}>
        <Grid item lg={3} width={"100%"}>
          <InputLabel
            sx={{
              ...queries.medium_text,
              "@media (min-width: 1485px)": {
                fontSize: "1.65ch",
              },
              "@media (min-width: 1870px)": {
                fontSize: "2ch",
              },
            }}
          >
            Adjuntar detalle de la inversión pública productiva
          </InputLabel>

          <Grid mt={1} display={"flex"} justifyContent={"center"}>
            <Grid sx={{ position: "relative" }}>
              <Typography
                position={"absolute"}
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  fontSize: "80%",
                  color: "#15212f",
                  border:
                    detalleInversion.nombreArchivo !==
                    "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"
                      ? "2px dotted #af8c55"
                      : "2x dotted black",
                }}
              >
                {detalleInversion.nombreArchivo ||
                  "ARRASTRE O DE CLIC AQUÍ PARA SELECCIONAR ARCHIVO"}
              </Typography>
              <input
                type="file"
                accept="application/pdf"
                onChange={(v) => {
                  cargarArchivo(v);
                }}
                style={{
                  opacity: 0,
                  width: "100%",
                  height: "3vh",
                  cursor: "pointer",
                }}
              />
            </Grid>

            <Grid display={"flex"} justifyContent={"end"}>
              <Tooltip title={"Remover Archivo"}>
                <Button onClick={() => removeDocumento()}>
                  <CloseIcon />
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={3}>
          <InputLabel sx={queries.medium_text}>Monto</InputLabel>
          <TextField
            fullWidth
            placeholder="0"
            value={generalGCMonto <= 0 ? "" : generalGCMonto.toString()}
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  claveInscripcionFinanciamiento:
                    generalGCClaveInscripcionFinanciamiento,
                  descripcion: generalGCDescripcion,
                  monto: v.target.value,
                });
              } else if (v.target.value === "") {
                changeGeneralGastosCostos({
                  destino: generalGCDestino,
                  detalleInversion: generalGCDetalleInversion,
                  claveInscripcionFinanciamiento:
                    generalGCClaveInscripcionFinanciamiento,
                  descripcion: generalGCDescripcion,
                  monto: 0,
                });
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>

        <Grid item lg={3}>
          <InputLabel disabled sx={queries.medium_text}>
            Saldo Vigente
          </InputLabel>
          <TextField
            fullWidth
            value={GCSaldoVigente <= 0 ? "" : GCSaldoVigente.toString()}
            onChange={(v) => {
              if (validator.isNumeric(v.target.value)) {
                changeGastosCostos({
                  gastosAdicionales: GCGastosAdicionales,
                  saldoVigente: v.target.value,
                  montoGastosAdicionales: GCMontoGastosAdicionales,
                });
              } else if (v.target.value === "") {
                changeGastosCostos({
                  gastosAdicionales: GCGastosAdicionales,
                  saldoVigente: 0,
                  montoGastosAdicionales: GCMontoGastosAdicionales,
                });
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
            }}
            InputProps={{
              style: {
                fontFamily: "MontserratMedium",
              },
              startAdornment: <AttachMoneyIcon />,
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid width={"94%"} display={"flex"} justifyContent={"flex-end"}>
        <ThemeProvider theme={theme}>
          <Button
            sx={queries.buttonContinuar}
            variant="outlined"
            disabled={
              /^[\s]*$/.test(generalGCDestino.Descripcion) ||
              /^[\s]*$/.test(generalGCDetalleInversion.Descripcion) ||
              /^[\s]*$/.test(generalGCDescripcion) ||
              /^[\s]*$/.test(generalGCClaveInscripcionFinanciamiento) ||
              generalGCMonto < 1
            }
            onClick={() => {
              changeGeneralGastosCostos({
                destino: { Id: "", Descripcion: "" },
                detalleInversion: { Id: "", Descripcion: "" },
                claveInscripcionFinanciamiento: "",
                descripcion: "",
                monto: 0,
              });

              addRows();
            }}
          >
            <CheckIcon fontSize="small" />
            AGREGAR
          </Button>
        </ThemeProvider>
      </Grid>

      <Grid height={"50%"} display={"flex"} justifyContent={"space-evenly"}>
        <Paper sx={{ width: "88%", overflow: "clip" }}>
          <TableContainer
            sx={{
              maxHeight: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".3vw",
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
                <TableRow>
                  {headsGC.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      {head.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaGastosCostos.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.destino}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.detalleInversion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.descripcion}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.claveInscripcionFinanciamiento}
                      </StyledTableCell>

                      <StyledTableCell align="center" component="th">
                        {row.monto}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => removeGeneralGastosCostos(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

import * as React from "react";

import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  InputLabel,
  RadioGroup,
  Radio,
  FormControl,
  InputAdornment,
  Autocomplete,
  Typography,
  Checkbox,
  Tooltip,
  IconButton,
  TableRow,
  Divider,
  Box,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import { queries } from "../../../queries";

import {
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useCortoPlazoStore } from "../../../store/main";

import { format } from "date-fns";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Borrar",
  },
  {
    label: "Tipo de Comisión",
  },
  {
    label: "Fecha de Primer Pago",
  },
  {
    label: "Periocidad de Pago",
  },
  {
    label: "Porcentaje",
  },
  {
    label: "Monto",
  },
  {
    label: "IVA",
  },
];

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada"
          }
        }
      }
    }
  }
});

export function ComisionesTasaEfectiva() {
  // GET CATALOGOS
  const getTiposComision: Function = useCortoPlazoStore(
    (state) => state.getTiposComision
  );

  // CATALOGOS
  const catalogoPeriocidadDePago: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoPeriocidadDePago
  );
  const catalogoDiasEjercicio: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoDiasEjercicio
  );
  const catalogoTiposComision: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTiposComision
  );

  // TASA EFECTIVA
  const tasaEfectivaDiasEjercicio: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.tasaEfectiva.diasEjercicio);
  const tasaEfectivaTasaEfectiva: string = useCortoPlazoStore(
    (state) => state.tasaEfectiva.tasaEfectiva
  );
  const changeTasaEfectiva: Function = useCortoPlazoStore(
    (state) => state.changeTasaEfectiva
  );

  // COMISIONES
  const comisionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.comision.fechaContratacion
  );
  const comisionTipoComision: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.comision.tipoDeComision);
  const comisionPeriodicidadPago: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.comision.periodicidadDePago);
  const comisionPorcentajeFijo: boolean = useCortoPlazoStore(
    (state) => state.comision.porcentajeFijo
  );
  const comisionMontoFijo: boolean = useCortoPlazoStore(
    (state) => state.comision.montoFijo
  );
  const comisionPorcentaje: string = useCortoPlazoStore(
    (state) => state.comision.porcentaje
  );
  const comisionMonto: string = useCortoPlazoStore(
    (state) => state.comision.monto
  );
  const comisionIva: string = useCortoPlazoStore((state) => state.comision.iva);

  // TABLA COMISIONES
  const tablaComisiones: any = useCortoPlazoStore(
    (state) => state.tablaComisiones
  );
  const addComision: Function = useCortoPlazoStore(
    (state) => state.addComision
  );
  const changeComision: Function = useCortoPlazoStore(
    (state) => state.changeComision
  );
  const removeComision: Function = useCortoPlazoStore(
    (state) => state.removeComision
  );

  React.useEffect(() => {
    getTiposComision();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRows = () => {
    let tab = {
      fechaContratacion: comisionFechaContratacion,
      tipoDeComision: comisionTipoComision.Descripcion,
      periodicidadDePago: comisionPeriodicidadPago.Descripcion,
      monto: comisionMonto || "N/A",
      porcentaje: comisionPorcentaje || "N/A",
      iva: comisionIva,
    };
    addComision(tab);
  };

  const [radioValue, setRadioValue] = React.useState("Porcentaje Fijo");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    changePercentageOrAmount();
  };

  const changePercentageOrAmount = () => {
    if (radioValue !== "Porcentaje Fijo") {
      changeComision({
        fechaContratacion: comisionFechaContratacion,
        tipoDeComision: comisionTipoComision,
        periodicidadDePago: comisionPeriodicidadPago,
        porcentajeFijo: false,
        montoFijo: true,
        porcentaje: comisionPorcentaje,
        monto: comisionMonto,
        iva: comisionIva,
      });
    } else {
      changeComision({
        fechaContratacion: comisionFechaContratacion,
        tipoDeComision: comisionTipoComision,
        periodicidadDePago: comisionPeriodicidadPago,
        porcentajeFijo: true,
        montoFijo: false,
        porcentaje: comisionPorcentaje,
        monto: comisionMonto,
        iva: comisionIva,
      });
    }
  };

  const reset = () => {
    changeComision({
      fechaContratacion: new Date().toString(),
      tipoDeComision: { Id: "", Descripcion: "" },
      periodicidadDePago: { Id: "", Descripcion: "" },
      porcentajeFijo: true,
      montoFijo: false,
      porcentaje: "",
      monto: "",
      iva: "NO",
    });
  };

  return (

    <Grid container width={"100%"} height={"115%"} flexDirection="column" justifyContent={"space-evenly"} >

      <Grid item>
        <Divider>
          <Typography color={"#af8c55 "} fontWeight={"bold"}>TASA EFECTIVA</Typography>
        </Divider>
      </Grid>

      <Box>
        <Grid display={"flex"} justifyContent={"space-evenly"}>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Días del Ejercicio</InputLabel>
            <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
              fullWidth
              options={catalogoDiasEjercicio}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={tasaEfectivaDiasEjercicio}
              onChange={(event, text) =>
                changeTasaEfectiva({
                  diasEjercicio: text || {
                    Id: "",
                    Descripcion: "",
                  },
                  tasaEfectiva: tasaEfectivaTasaEfectiva,
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Tasa Efectiva</InputLabel>
            <TextField
              value={tasaEfectivaTasaEfectiva}
              onChange={(v) =>
                changeTasaEfectiva({
                  diasEjercicio: tasaEfectivaDiasEjercicio,
                  tasaEfectiva: v.target.value,
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
        </Grid>
      </Box>

      <Grid item>
        <Divider>
          <Typography color={"#af8c55 "} fontWeight={"bold"}>COMISIONES</Typography>
        </Divider>
      </Grid>

      <Grid item container justifyContent={"space-evenly"}>
        <Grid item >
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(comisionFechaContratacion)}
              onChange={(date) => {
                changeComision({
                  fechaContratacion: date?.toString(),
                  tipoDeComision: comisionTipoComision,
                  periodicidadDePago: comisionPeriodicidadPago,
                  porcentajeFijo: comisionPorcentajeFijo,
                  montoFijo: comisionMontoFijo,
                  porcentaje: comisionPorcentaje,
                  monto: comisionMonto,
                  iva: comisionIva,
                });
              }}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={2}>
          <InputLabel sx={queries.medium_text}>Tipo de Comisión</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            fullWidth
            options={catalogoTiposComision}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={comisionTipoComision}
            onChange={(event, v) => {
              changeComision({
                fechaContratacion: comisionFechaContratacion,
                tipoDeComision: {
                  Id: v?.Id || "",
                  Descripcion: v?.Descripcion || "",
                },
                periodicidadDePago: comisionPeriodicidadPago,
                porcentajeFijo: comisionPorcentajeFijo,
                montoFijo: comisionMontoFijo,
                porcentaje: comisionPorcentaje,
                monto: comisionMonto,
                iva: comisionIva,
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
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>
        <Grid item >
          <InputLabel sx={queries.medium_text}>Periocidad de Pago</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            fullWidth
            options={catalogoPeriocidadDePago}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Descripcion}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            value={comisionPeriodicidadPago}
            onChange={(event, text) =>
              changeComision({
                fechaContratacion: comisionFechaContratacion,
                tipoDeComision: comisionTipoComision,
                periodicidadDePago: {
                  Id: text?.Id || "",
                  Descripcion: text?.Descripcion || "",
                },
                porcentajeFijo: comisionPorcentajeFijo,
                montoFijo: comisionMontoFijo,
                porcentaje: comisionPorcentaje,
                monto: comisionMonto,
                iva: comisionIva,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.Descripcion === value.Descripcion ||
              value.Descripcion === ""
            }
          />
        </Grid>
        <Grid item>
          <FormControl>
            <RadioGroup
              defaultValue="Porcentaje Fijo"
              value={radioValue}
              onChange={handleChange}
            >
              <Grid container>
                <Grid item>
                  <FormControlLabel
                    value="Porcentaje Fijo"
                    control={<Radio />}
                    label="Porcentaje Fijo"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    value="Monto Fijo"
                    control={<Radio />}
                    label="Monto Fijo"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid item container justifyContent={"space-evenly"} >
        <Grid item>
          {radioValue === "Porcentaje Fijo" ? (
            <InputLabel sx={queries.medium_text}>Porcentaje</InputLabel>
          ) : (
            <InputLabel sx={queries.medium_text}>Monto</InputLabel>
          )}
          <TextField
            fullWidth
            value={
              radioValue === "Porcentaje Fijo"
                ? comisionPorcentaje
                : comisionMonto
            }
            onChange={(v) => {
              radioValue === "Porcentaje Fijo"
                ? changeComision({
                  fechaContratacion: comisionFechaContratacion,
                  tipoDeComision: comisionTipoComision,
                  periodicidadDePago: comisionPeriodicidadPago,
                  porcentajeFijo: comisionPorcentajeFijo,
                  montoFijo: comisionMontoFijo,
                  porcentaje: v.target.value,
                  monto: "",
                  iva: comisionIva,
                })
                : changeComision({
                  fechaContratacion: comisionFechaContratacion,
                  tipoDeComision: comisionTipoComision,
                  periodicidadDePago: comisionPeriodicidadPago,
                  porcentajeFijo: comisionPorcentajeFijo,
                  montoFijo: comisionMontoFijo,
                  porcentaje: "",
                  monto: v.target.value,
                  iva: comisionIva,
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
              startAdornment: (
                <>
                  {radioValue === "Porcentaje Fijo" ? (
                    <></>
                  ) : (
                    <InputAdornment position="start">$</InputAdornment>
                  )}
                </>
              ),
              endAdornment: (
                <>
                  {radioValue === "Porcentaje Fijo" ? (
                    <InputAdornment position="end">%</InputAdornment>
                  ) : (
                    <></>
                  )}
                </>
              ),
            }}
            variant="standard"
          />
        </Grid>

        <Grid item>
          <FormControlLabel
            label="Causa IVA"
            control={
              <Checkbox
                checked={comisionIva === 'SI'}
                onChange={(v) => {
                  changeComision({
                    fechaContratacion: comisionFechaContratacion,
                    tipoDeComision: comisionTipoComision,
                    periodicidadDePago: comisionPeriodicidadPago,
                    porcentajeFijo: comisionPorcentajeFijo,
                    montoFijo: comisionMontoFijo,
                    porcentaje: comisionPorcentaje,
                    monto: comisionMonto,
                    iva: v.target.checked ? "SI" : "NO",
                  });
                }}
              />
            }
          ></FormControlLabel>
        </Grid>

        <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <ThemeProvider theme={theme}>
            <Button
              sx={queries.buttonContinuar}
              disabled={
                comisionFechaContratacion === "" ||
                comisionTipoComision.Descripcion === "" ||
                comisionPeriodicidadPago.Descripcion === "" ||
                (radioValue === "Porcentaje Fijo" && comisionPorcentaje === "") || (radioValue === 'Monto Fijo' && comisionMonto === "")
              }
              variant="outlined"
              onClick={() => {
                addRows();
                reset();
              }}
            >
              <CheckIcon fontSize="medium" />AGREGAR
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid container sx={queries.tablaDisposicionPagosCapital} >
        <Paper sx={{ height: "100%", width: "88%", overflow: "auto" }}>
          <TableContainer sx={{
            maxHeight: "100%", overflow: "auto",
            "&::-webkit-scrollbar": {
              width: ".5vw",
              mt: 1,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#AF8C55",
              outline: "1px solid slategrey",
              borderRadius: 1,
            },
          }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaComisiones.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() =>
                              removeComision(index)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tipoDeComision}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {format(new Date(row.fechaContratacion), "dd/MM/yyyy")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.periodicidadDePago}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.porcentaje > 0
                          ? row.porcentaje.toString() + "%"
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.monto > 0 ? "$" + row.monto.toString() : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.iva}
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

/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import validator from "validator";

import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import es from "date-fns/locale/es";
import { queries } from "../../../queries";

import { StyledTableCell, StyledTableRow } from "../../CustomComponents";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

import { format } from "date-fns";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { moneyMask } from "./InformacionGeneral";
import {
  IComisiones,
  ITasaEfectiva,
} from "../../../store/CreditoCortoPlazo/tasa_efectiva";

const heads: readonly {
  label: string;
}[] = [
  {
    label: "Borrar",
  },
  {
    label: "Tipo de Comisión",
  },
  {
    label: "Fecha de Comisión",
  },
  {
    label: "Periodicidad de Pago",
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
  const tasaEfectiva: ITasaEfectiva = useCortoPlazoStore(
    (state) => state.tasaEfectiva
  );
  const setTasaEfectiva: Function = useCortoPlazoStore(
    (state) => state.setTasaEfectiva
  );

  // COMISIONES
  const comision: IComisiones = useCortoPlazoStore((state) => state.comision);
  const setComision: Function = useCortoPlazoStore(
    (state) => state.setComision
  );

  // TABLA COMISIONES
  const tablaComisiones: IComisiones[] = useCortoPlazoStore(
    (state) => state.tablaComisiones
  );
  const addComision: Function = useCortoPlazoStore(
    (state) => state.addComision
  );
  const setTablaComisiones: Function = useCortoPlazoStore(
    (state) => state.setTablaComisiones
  );
  const removeComision: Function = useCortoPlazoStore(
    (state) => state.removeComision
  );
  const noAplica: boolean = useCortoPlazoStore((state) => state.noAplica);
  const setNoAplica: Function = useCortoPlazoStore(
    (state) => state.setNoAplica
  );

  React.useEffect(() => {
    catalogoTiposComision.length <= 0 && getTiposComision();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [radioValue, setRadioValue] = React.useState("Porcentaje Fijo");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  // React.useEffect(() => {
  //   if (noAplica === false) {
  //     setTablaComisiones([]);
  //   } else {
  //     if (radioValue === "Porcentaje Fijo") {
  //       setTablaComisiones([
  //         {
  //           fechaComision: "N/A",
  //           tipoDeComision: "N/A",
  //           periodicidadPago: "N/A",
  //           porcentaje: "N/A",
  //           monto: "N/A",
  //           iva: "N/A",
  //         },
  //       ]);
  //     } else {
  //       setTablaComisiones([{ ...comision, porcentaje: "N/A" }]);
  //     }
  //   }
  // }, [noAplica]);

  React.useEffect(() => {
    if (noAplica === false) {
    } else {
      setTablaComisiones([
        {
          fechaComision: "N/A",
          tipoDeComision: "N/A",
          periodicidadPago: "N/A",
          porcentaje: "N/A",
          monto: "N/A",
          iva: "N/A",
        },
      ]);
    }
  }, [noAplica]);

  React.useEffect(() => {
    if (radioValue === "Porcentaje Fijo") {
      setComision({ ...comision, porcentaje: "", monto: "N/A" });
    } else {
      setComision({ ...comision, porcentaje: "N/A", monto: "$ 0.00" });
    }
  }, [radioValue]);

  return (
    <Grid
      container
      width={"100%"}
      flexDirection="column"
      justifyContent={"space-evenly"}
      sx={{
        height: "62rem",
        "@media (min-width: 480px)": {
          height: "70rem",
        },

        "@media (min-width: 768px)": {
          height: "58rem",
        },

        "@media (min-width: 1140px)": {
          height: "38rem",
        },

        "@media (min-width: 1400px)": {
          height: "38rem",
        },

        "@media (min-width: 1870px)": {
          height: "50rem",
        },
      }}
    >
      <Grid item>
        <Divider>
          <Typography color={"#af8c55 "} fontWeight={"bold"}>
            TASA EFECTIVA
          </Typography>
        </Divider>
      </Grid>

      <Grid
        container
        width={"100%"}
        display={"flex"}
        justifyContent={"space-evenly"}
      >
        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Días del Ejercicio</InputLabel>
          <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
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
            value={tasaEfectiva.diasEjercicio}
            onChange={(event, text) =>
              setTasaEfectiva({
                ...tasaEfectiva,
                diasEjercicio: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
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

        <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
          <InputLabel sx={queries.medium_text}>Tasa Efectiva</InputLabel>
          <TextField
            fullWidth
            value={tasaEfectiva.tasaEfectiva}
            onChange={(v) => {
              const expRegular = /^\d*\.?\d*$/;

              if (expRegular.test(v.target.value) || v.target.value === "") {
                setTasaEfectiva({
                  ...tasaEfectiva,
                  tasaEfectiva: v.target.value,
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
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            variant="standard"
          />
        </Grid>
      </Grid>

      <Grid item>
        <Divider>
          <Typography color={"#af8c55 "} fontWeight={"bold"}>
            COMISIONES
          </Typography>
        </Divider>
      </Grid>

      <Grid container justifyContent={"space-evenly"}>
        <Grid item xs={10} sm={2} md={1} lg={1} xl={1}>
          <FormControlLabel
            label="No Aplica"
            control={
              <Checkbox
                checked={noAplica}
                onChange={(v) => {
                  setNoAplica();
                  setTablaComisiones([]);
                }}
              />
            }
          ></FormControlLabel>
        </Grid>
        <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Fecha de Comisión</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              sx={{ width: "100%" }}
              disabled={noAplica}
              value={new Date(comision.fechaComision)}
              onChange={(date) => {
                setComision({
                  ...comision,
                  fechaComision: date?.toString(),
                });
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Tipo de Comisión</InputLabel>
          <Autocomplete
            disabled={noAplica}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
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
            value={comision.tipoDeComision}
            onChange={(event, text) => {
              setComision({
                ...comision,
                tipoDeComision: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
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
        <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
          <InputLabel sx={queries.medium_text}>Periodicidad de Pago</InputLabel>
          <Autocomplete
            disabled={noAplica}
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
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
            value={comision.periodicidadDePago}
            onChange={(event, text) =>
              setComision({
                ...comision,
                periodicidadDePago: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
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
      </Grid>

      <Grid container justifyContent={"space-evenly"}>
        <Grid
          item
          xs={10}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FormControl>
            <RadioGroup
              defaultValue="Porcentaje Fijo"
              value={radioValue}
              onChange={handleChange}
            >
              <Grid container>
                <Grid item>
                  <FormControlLabel
                    disabled={noAplica}
                    value="Porcentaje Fijo"
                    control={<Radio />}
                    label="Porcentaje Fijo"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    disabled={noAplica}
                    value="Monto Fijo"
                    control={<Radio />}
                    label="Monto Fijo"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
          {radioValue === "Porcentaje Fijo" ? (
            <InputLabel sx={queries.medium_text}>Porcentaje</InputLabel>
          ) : (
            <InputLabel sx={queries.medium_text}>Monto</InputLabel>
          )}
          <TextField
            disabled={noAplica}
            fullWidth
            value={
              radioValue === "Porcentaje Fijo"
                ? comision.porcentaje
                : parseFloat(comision.monto) <= 0
                ? ""
                : moneyMask(comision.monto)
            }
            onChange={(v) => {
              if (
                !noAplica &&
                (validator.isNumeric(v.target.value.replace(/\D/g, "")) ||
                  v.target.value === "") &&
                parseInt(v.target.value.replace(/\D/g, "")) <
                  9999999999999999 &&
                radioValue === "Porcentaje Fijo"
              ) {
                setComision({
                  ...comision,
                  porcentaje: v.target.value,
                  monto: moneyMask("0"),
                });
              } else {
                setComision({
                  ...comision,
                  porcentaje: "",
                  monto: moneyMask(
                    v.target.value.toString() === ""
                      ? "0"
                      : v.target.value.toString()
                  ),
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

        <Grid
          item
          xs={10}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FormControlLabel
            label="Causa IVA"
            control={
              <Checkbox
                disabled={noAplica}
                checked={comision.iva}
                onChange={(v) => {
                  setComision({ ...comision, iva: v.target.checked });
                }}
              />
            }
          ></FormControlLabel>
        </Grid>

        <Grid
          item
          xs={10}
          sm={3}
          md={3}
          lg={2}
          xl={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <ThemeProvider theme={buttonTheme}>
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                mt: 2,
                mb: 2,
                width: "15vh",

                "&&:hover": {
                  backgroundColor: "rgba(47, 47, 47, 0.4)",
                  color: "#000",
                },

                borderRadius: "0.8vh",
                textTransform: "capitalize",
                fontSize: "100%",
                "@media (min-width: 480px)": {
                  fontSize: "90%",
                },
              }}
              disabled={
                comision.fechaComision === "" ||
                comision.tipoDeComision.Descripcion === "" ||
                comision.periodicidadDePago.Descripcion === "" ||
                (radioValue === "Porcentaje Fijo" &&
                  comision.porcentaje === "") ||
                (radioValue === "Monto Fijo" && comision.monto === "")
              }
              variant="outlined"
              onClick={() => {
                addComision(comision);
              }}
            >
              Agregar
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"} height={"40%"}>
        <Paper sx={{ width: "88%", overflow: "auto", height: "100%" }}>
          <TableContainer
            sx={{
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
                height: ".5vh",
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
                  {heads.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tablaComisiones.map((row: IComisiones, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {!noAplica && (
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => removeComision(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.tipoDeComision?.Descripcion || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row?.fechaComision !== "N/A"
                          ? format(new Date(row?.fechaComision), "dd/MM/yyyy")
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.periodicidadDePago?.Descripcion || "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.porcentaje}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.monto.toString()}
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

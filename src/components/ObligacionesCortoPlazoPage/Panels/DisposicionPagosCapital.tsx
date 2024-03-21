/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
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
  useMediaQuery,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { addDays } from "date-fns";

import { format } from "date-fns";
import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import {
  IDisposicion,
  IPagosDeCapital,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { moneyMask } from "./InformacionGeneral";
//import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

const heads: readonly {
  label: string;
}[] = [
  {
    label: "Borrar",
  },
  {
    label: "Fecha de Primer Pago",
  },
  {
    label: "Tasa Interes",
  },
  {
    label: "Periodicidad de Pago",
  },
  {
    label: "Tasa de Referencia",
  },
  {
    label: "Sobretasa",
  },
  {
    label: "Dias del Ejercicio",
  },
];

const headsDisposicion: readonly {
  label: string;
}[] = [
  {
    label: "Borrar",
  },
  {
    label: "Fecha de Disposición",
  },
  {
    label: `Importe de disposición`,
  },
];

export function DisposicionPagosCapital() {
  // GET CATALOGOS
  const getPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.getPeriocidadPago
  );
  const getTasaReferencia: Function = useCortoPlazoStore(
    (state) => state.getTasaReferencia
  );
  const getDiasEjercicio: Function = useCortoPlazoStore(
    (state) => state.getDiasEjercicio
  );

  // CATALOGOS
  const catalogoPeriocidadDePago: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoPeriocidadDePago
  );
  const catalogoTasaReferencia: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTasaReferencia
  );
  const catalogoDiasEjercicio: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoDiasEjercicio
  );

  // PAGOS DE CAPITAL
  const pagosDeCapital: IPagosDeCapital = useCortoPlazoStore(
    (state) => state.pagosDeCapital
  );
  const setPagosDeCapital: Function = useCortoPlazoStore(
    (state) => state.setPagosDeCapital
  );

  // DISPOSICION
  const disposicion: IDisposicion = useCortoPlazoStore(
    (state) => state.disposicion
  );
  const setDisposicion: Function = useCortoPlazoStore(
    (state) => state.setDisposicion
  );
  const monto: number = useCortoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  // TABLA Disposicion
  const tablaDisposicion: IDisposicion[] = useCortoPlazoStore(
    (state) => state.tablaDisposicion
  );
  const addDisposicion: Function = useCortoPlazoStore(
    (state) => state.addDisposicion
  );
  const setTablaDisposicion: Function = useCortoPlazoStore(
    (state) => state.setTablaDisposicion
  );
  const removeDisposicion: Function = useCortoPlazoStore(
    (state) => state.removeDisposicion
  );

  // TASA DE INTERES
  const tasaDeInteres: ITasaInteres = useCortoPlazoStore(
    (state) => state.tasaDeInteres
  );
  const setTasaInteres: Function = useCortoPlazoStore(
    (state) => state.setTasaInteres
  );

  //TABLA Tasa de intereses
  const tablaTasaInteres: ITasaInteres[] = useCortoPlazoStore(
    (state) => state.tablaTasaInteres
  );
  const addTasaInteres: Function = useCortoPlazoStore(
    (state) => state.addTasaInteres
  );
  const setTablaTasaInteres: Function = useCortoPlazoStore(
    (state) => state.setTablaTasaInteres
  );
  const removeTasaInteres: Function = useCortoPlazoStore(
    (state) => state.removeTasaInteres
  );

  const fechaContratacion: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  const tasasParciales: boolean = useCortoPlazoStore(
    (state) => state.tasasParciales
  );
  const disposicionesParciales: boolean = useCortoPlazoStore(
    (state) => state.disposicionesParciales
  );

  const setTasasParciales: Function = useCortoPlazoStore(
    (state) => state.setTasasParciales
  );
  const setDisposicionesParciales: Function = useCortoPlazoStore(
    (state) => state.setDisposicionesParciales
  );

  useEffect(() => {
    catalogoPeriocidadDePago.length <= 0 && getPeriocidadPago();
    catalogoTasaReferencia.length <= 0 && getTasaReferencia();
    catalogoDiasEjercicio.length <= 0 && getDiasEjercicio();
  }, []);

  const radioValue: number = useCortoPlazoStore((state) => state.radioValue);
  const setRadioValue: Function = useCortoPlazoStore(
    (state) => state.setRadioValue
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(parseInt((event.target as HTMLInputElement).value));

    if ((event.target as HTMLInputElement).value === "1") {
      setTasaInteres({
        ...tasaDeInteres,
        tasaReferencia: "N/A",
        sobreTasa: "N/A",
        tasaFija: "",
      });
    } else {
      setTasaInteres({
        ...tasaDeInteres,
        tasaFija: "N/A",
        tasaReferencia: { Id: "", Descripcion: "" },
        sobreTasa: "",
      });
    }
  };

  useEffect(() => {
    if (tasasParciales === false) {
      // setTasaInteres({ ...tasaDeInteres, tasaFija: "" });
      setTablaTasaInteres([tasaDeInteres]);
    }
  }, [tasasParciales, tasaDeInteres]);

  useEffect(() => {
    if (disposicionesParciales === false) {
      setDisposicion({ ...disposicion, importe: moneyMask(monto.toString()) });
      setTablaDisposicion([
        {
          fechaDisposicion: disposicion.fechaDisposicion,
          importe: moneyMask(monto.toString()),
        },
      ]);
    }
  }, [monto, disposicionesParciales]);

  const [restante, setRestante] = useState(0);

  useEffect(() => {
    let loc = 0.0;
    tablaDisposicion.map((value: any, index: number) => {
      loc += parseFloat(
        value.importe.toString().replaceAll("$", "").replaceAll(",", "")
      );
    });

    let res = 0.0;
    res =
      parseFloat(monto.toString().replaceAll("$", "").replaceAll(",", "")) -
      parseFloat(loc.toFixed(2));
    setRestante(res);
  }, [tablaDisposicion]);

  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 599px)"),
  };

  return (
    <Grid
      container
      sx={{
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
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={
        query.isMobile === false
          ? disposicionesParciales === false && tasasParciales === false
            ? "32rem"
            : disposicionesParciales === true && tasasParciales === false
            ? "44rem"
            : disposicionesParciales === false && tasasParciales === true
            ? "44rem"
            : disposicionesParciales === true && tasasParciales === true
            ? "60rem"
            : "36rem"
          : query.isMobile === true
          ? disposicionesParciales === false && tasasParciales === false
            ? "50rem"
            : disposicionesParciales === true && tasasParciales === false
            ? "65rem"
            : disposicionesParciales === false && tasasParciales === true
            ? "65rem"
            : disposicionesParciales === true && tasasParciales === true
            ? "85rem"
            : "52rem"
          : "36rem"
      }
    >
      <Grid item container mt={2} direction="column">
        <Grid item>
          <Divider>
            <Typography color={"#af8c55 "} fontWeight={"bold"}>
              PAGOS DE CAPITAL
            </Typography>
          </Divider>
        </Grid>

        <Grid container display={"flex"} justifyContent={"space-evenly"}>
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3} sx={{ width: "100%" }}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Primer Pago
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                minDate={new Date(fechaContratacion)}
                maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
                sx={{ width: "100%" }}
                value={new Date(pagosDeCapital.fechaPrimerPago)}
                onChange={(date) =>
                  setPagosDeCapital({
                    ...pagosDeCapital,
                    fechaPrimerPago: format(date!, "MM/dd/yyyy"),
                  })
                }
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Periodicidad de Pago
            </InputLabel>
            <Autocomplete
              disableClearable
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
              value={pagosDeCapital.periodicidadDePago}
              onChange={(event, text) =>
                setPagosDeCapital({
                  ...pagosDeCapital,
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Número de Pagos</InputLabel>
            <TextField
              placeholder="0"
              value={
                pagosDeCapital.numeroDePago <= 0
                  ? ""
                  : pagosDeCapital.numeroDePago.toString()
              }
              onChange={(v) => {
                setPagosDeCapital({
                  ...pagosDeCapital,
                  numeroDePago: v.target.value || 1,
                });
              }}
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
      </Grid>

      <Grid container direction="column" width={"100%"}>
        <Grid item width={"100%"}>
          <Divider>
            <Typography color={"#af8c55 "} fontWeight={"bold"}>
              DISPOSICIÓN
            </Typography>
          </Divider>

          <Grid
            container
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            width={"100%"}
          >
            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
              <FormControlLabel
                label="Disposiciones Parciales"
                control={
                  <Checkbox
                    checked={disposicionesParciales}
                    onChange={(v) => {
                      setDisposicionesParciales();
                    }}
                  />
                }
              ></FormControlLabel>
            </Grid>
            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>
                Fecha de Disposición
              </InputLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={es}
              >
                <DesktopDatePicker
                  sx={{ width: "100%" }}
                  value={new Date(disposicion.fechaDisposicion)}
                  onChange={(date) => {
                    setDisposicion({
                      ...disposicion,
                      fechaDisposicion: format(date!, "MM/dd/yyyy"),
                    });
                  }}
                  minDate={new Date(fechaContratacion)}
                  maxDate={new Date(addDays(new Date(), 365))}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>Importe</InputLabel>

              <TextField
                disabled={!disposicionesParciales}
                helperText={
                  disposicionesParciales
                    ? "Monto Original Contratado: " +
                      monto +
                      "; Monto restante: " +
                      restante.toFixed(2)
                    : ""
                }
                value={disposicion.importe}
                onChange={(v) => {
                  if (
                    validator.isNumeric(v.target.value.replace(/\D/g, "")) &&
                    disposicionesParciales &&
                    parseFloat(v.target.value.replace(/\D/g, "")) <
                      9999999999999999 &&
                    parseFloat(v.target.value.replace(/\D/g, "")) <=
                      restante * 101
                  ) {
                    setDisposicion({
                      ...disposicion,
                      importe: moneyMask(v.target.value),
                    });
                  } else if (v.target.value === "") {
                    setDisposicion({ ...disposicion, importe: moneyMask("0") });
                  }
                }}
                error={
                  parseFloat(
                    disposicion.importe.toString().replace(/\D/g, "")
                  ) > parseFloat(monto.toString().replace(/\D/g, ""))
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
          {disposicionesParciales && (
            <Grid
              container
              flexDirection={"column"}
              alignItems={"center"}
              width={"100%"}
            >
              <ThemeProvider theme={buttonTheme}>
                <Button
                  sx={{
                    ...queries.buttonContinuarSolicitudInscripcion,
                    mt: 2,
                    mb: 2,
                    width: "15vh",
                  }}
                  disabled={
                    parseFloat(
                      disposicion.importe.toString().replace(/\D/g, "")
                    ) === 0 ||
                    parseFloat(
                      disposicion.importe.toString().replace(/\D/g, "")
                    ) >
                      restante * 101
                  }
                  variant="outlined"
                  onClick={() => {
                    setDisposicion({ ...disposicion, importe: moneyMask("0") });
                    addDisposicion(disposicion);
                  }}
                >
                  Agregar
                </Button>
              </ThemeProvider>

              <Grid
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                height={"12rem"}
              >
                <Paper sx={{ width: "88%", height: "100%" }}>
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
                          {headsDisposicion.map((head, index) => (
                            <StyledTableCell align="center" key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tablaDisposicion.map(
                          (row: IDisposicion, index: number) => {
                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell align="center">
                                  <Tooltip title="Eliminar">
                                    <IconButton
                                      type="button"
                                      onClick={() => {
                                        removeDisposicion(index);
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th">
                                  {row.fechaDisposicion}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th">
                                  {row.importe}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item>
          <Divider>
            <Typography color={"#af8c55 "} fontWeight={"bold"}>
              TASA DE INTERÉS
            </Typography>
          </Divider>
        </Grid>

        <Grid
          container
          flexDirection={"column"}
          justifyContent={"space-evenly"}
        >
          <Grid
            item
            container
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl>
              <RadioGroup
                defaultValue={1}
                value={radioValue}
                onChange={handleChange}
              >
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Tasa Fija"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Tasa Variable"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
            <Grid item>
              <FormControlLabel
                label="Agregar Tasas"
                control={
                  <Checkbox
                    checked={tasasParciales}
                    onChange={(v) => {
                      setTablaTasaInteres([]);
                      setTasasParciales();
                    }}
                  />
                }
              ></FormControlLabel>
            </Grid>
          </Grid>

          <Grid container display={"flex"} justifyContent={"center"} mb={2}>
            {radioValue === 1 ? (
              <Grid item container display="flex" justifyContent="space-evenly">
                <Grid
                  item
                  xs={10}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  display={"block"}
                >
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={es}
                  >
                    <DesktopDatePicker
                      sx={{ width: "100%" }}
                      value={new Date(tasaDeInteres.fechaPrimerPago)}
                      onChange={(date) => {
                        setTasaInteres({
                          ...tasaDeInteres,
                          fechaPrimerPago: format(date!, "MM/dd/yyyy"),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>Tasa Fija</InputLabel>

                  <TextField
                    placeholder="0"
                    value={tasaDeInteres.tasaFija}
                    onChange={(v) => {
                      setTasaInteres({
                        ...tasaDeInteres,
                        tasaFija: v.target.value,
                      });
                    }}
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
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Días del Ejercicio
                  </InputLabel>
                  <Autocomplete
                    disableClearable
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
                    value={tasaDeInteres.diasEjercicio}
                    onChange={(event, text) =>
                      setTasaInteres({
                        ...tasaDeInteres,
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
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Periodicidad de Pago
                  </InputLabel>
                  <Autocomplete
                    disableClearable
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
                    value={tasaDeInteres.periocidadPago}
                    onChange={(event, text) =>
                      setTasaInteres({
                        ...tasaDeInteres,
                        periocidadPago: {
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
            ) : (
              <Grid
                container
                sx={{
                  justifyContent: "space-evenly",
                  display: "flex",
                }}
              >
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={es}
                  >
                    <DesktopDatePicker
                      value={new Date(tasaDeInteres.fechaPrimerPago)}
                      onChange={(date) =>
                        setTasaInteres({
                          ...tasaDeInteres,
                          fechaPrimerPago: format(date!, "MM/dd/yyyy"),
                        })
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Periodicidad de Pago
                  </InputLabel>
                  <Autocomplete
                    disableClearable
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
                    value={tasaDeInteres.periocidadPago}
                    onChange={(event, text) =>
                      setTasaInteres({
                        ...tasaDeInteres,
                        periocidadPago: {
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

                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Tasa de Referencia
                  </InputLabel>
                  <Autocomplete
                    disableClearable
                    clearText="Borrar"
                    noOptionsText="Sin opciones"
                    closeText="Cerrar"
                    openText="Abrir"
                    fullWidth
                    options={catalogoTasaReferencia}
                    getOptionLabel={(option) => option.Descripcion}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.Descripcion}>
                          <Typography>{option.Descripcion}</Typography>
                        </li>
                      );
                    }}
                    value={tasaDeInteres.tasaReferencia}
                    onChange={(event, text) =>
                      setTasaInteres({
                        ...tasaDeInteres,
                        tasaReferencia: {
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

                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>Sobretasa</InputLabel>
                  <TextField
                    //type="number"
                    value={tasaDeInteres.sobreTasa}
                    onChange={(v) => {
                      const expRegular = /^\d*\.?\d*$/;

                      if (
                        expRegular.test(v.target.value) ||
                        v.target.value === ""
                      ) {
                        setTasaInteres({
                          ...tasaDeInteres,
                          sobreTasa: v.target.value || "",
                        });
                      }
                    }}
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
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Días del Ejercicio
                  </InputLabel>
                  <Autocomplete
                    disableClearable
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
                    value={tasaDeInteres.diasEjercicio}
                    onChange={(event, text) =>
                      setTasaInteres({
                        ...tasaDeInteres,
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
              </Grid>
            )}
            {tasasParciales && (
              <Grid
                container
                // sx={queries.tablaDisposicionPagosCapital}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <ThemeProvider theme={buttonTheme}>
                  <Button
                    sx={{
                      ...queries.buttonContinuarSolicitudInscripcion,
                      mt: 2,
                      mb: 2,
                      width: "15vh",
                    }}
                    disabled={
                      tasaDeInteres.fechaPrimerPago === "" ||
                      tasaDeInteres.diasEjercicio.Descripcion === "" ||
                      tasaDeInteres.periocidadPago.Descripcion === "" ||
                      (radioValue === 1 &&
                        tasaDeInteres.tasaFija.toString() === "") ||
                      (radioValue === 2 &&
                        tasaDeInteres.tasaReferencia.toString() === "") ||
                      (radioValue === 2 &&
                        tasaDeInteres.sobreTasa.toString() === "")
                    }
                    variant="outlined"
                    onClick={() => {
                      addTasaInteres(tasaDeInteres);
                    }}
                  >
                    Agregar
                  </Button>
                </ThemeProvider>

                <Grid
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  height={"14rem"}
                >
                  <Paper sx={{ width: "88%", height: "100%" }}>
                    <TableContainer
                      sx={{
                        height: "100%",
                        overflow: "auto",
                        "&::-webkit-scrollbar": {
                          width: ".3vw",
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
                          {tablaTasaInteres.map(
                            (row: ITasaInteres, index: number) => {
                              return (
                                <StyledTableRow key={index}>
                                  <StyledTableCell align="center">
                                    <Tooltip title="Eliminar">
                                      <IconButton
                                        type="button"
                                        onClick={() => {
                                          removeTasaInteres(index);
                                        }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
                                    {row.fechaPrimerPago}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
                                    {row.tasaFija}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.periocidadPago.Descripcion}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.tasaReferencia.Descripcion || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.sobreTasa}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row.diasEjercicio.Descripcion}
                                  </StyledTableCell>
                                </StyledTableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

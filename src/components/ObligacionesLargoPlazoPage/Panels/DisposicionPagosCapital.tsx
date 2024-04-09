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
import { addDays, lightFormat } from "date-fns";

import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
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

  // DISPOSICION
  const disposicionFechaDisposicion: string = useLargoPlazoStore(
    (state) => state.disposicion.fechaDisposicion
  );
  const disposicionImporte: number = useLargoPlazoStore(
    (state) => state.disposicion.importe
  );
  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  // TABLA Disposicion
  let tablaDisposicion: any = useLargoPlazoStore(
    (state) => state.tablaDisposicion
  );
  const addDisposicion: Function = useLargoPlazoStore(
    (state) => state.addDisposicion
  );
  const changeDisposicion: Function = useLargoPlazoStore(
    (state) => state.changeDisposicion
  );
  const removeDisposicion: Function = useLargoPlazoStore(
    (state) => state.removeDisposicion
  );

  // PAGOS DE CAPITAL
  const capitalFechaPrimerPago: string = useLargoPlazoStore(
    (state) => state.pagosDeCapital.fechaPrimerPago
  );
  const capitalPeriocidadPago: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.pagosDeCapital.periodicidadDePago);
  const capitalNumeroPago: number = useLargoPlazoStore(
    (state) => state.pagosDeCapital.numeroDePago
  );
  const changeCapital: Function = useLargoPlazoStore(
    (state) => state.changeCapital
  );

  // TASA DE INTERES
  const tasaInteresTasaFija: boolean = useLargoPlazoStore(
    (state) => state.tasaInteres.tasaFija
  );
  const tasaInteresTasaVariable: boolean = useLargoPlazoStore(
    (state) => state.tasaInteres.tasaVariable
  );
  const tasaInteresTasa: number = useLargoPlazoStore(
    (state) => state.tasaInteres.tasa
  );
  const tasaInteresFechaPrimerPago: string = useLargoPlazoStore(
    (state) => state.tasaInteres.fechaPrimerPago
  );
  const tasaInteresDiasEjercicio: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.tasaInteres.diasEjercicio);
  const tasaInteresPeriocidadPago: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.tasaInteres.periocidadPago);
  const tasaInteresTasaReferencia: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.tasaInteres.tasaReferencia);
  const tasaInteresSobreTasa: string = useLargoPlazoStore(
    (state) => state.tasaInteres.sobreTasa
  );

  // TABLA TASA DE INTERES
  let tablaTasaInteres: any = useLargoPlazoStore(
    (state) => state.tablaTasaInteres
  );
  const addTasaInteres: Function = useLargoPlazoStore(
    (state) => state.addTasaInteres
  );
  const changeTasaInteres: Function = useLargoPlazoStore(
    (state) => state.changeTasaInteres
  );
  const removeTasaInteres: Function = useLargoPlazoStore(
    (state) => state.removeTasaInteres
  );
  const fechaContratacion: string = useLargoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  const cleanTasaInteres: Function = useLargoPlazoStore(
    (state) => state.cleanTasaInteres
  );

  const setDisposicionesParciales: Function = useLargoPlazoStore(
    (state) => state.setDisposicionesParciales
  );

  const disposicionesParciales: boolean = useLargoPlazoStore(
    (state) => state.disposicionesParciales
  );

  const setTasasParciales: Function = useLargoPlazoStore(
    (state) => state.setTasasParciales
  );

  const tasasParciales: boolean = useLargoPlazoStore(
    (state) => state.tasasParciales
  );

  useEffect(() => {
    getPeriocidadPago();
    getTasaReferencia();
    getDiasEjercicio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRows = () => {
    let tab = {
      tasaFija: tasaInteresTasaFija,
      tasaVariable: tasaInteresTasaVariable,
      tasa: tasaInteresTasa || "N/A",
      fechaPrimerPago: tasaInteresFechaPrimerPago,
      diasEjercicio: tasaInteresDiasEjercicio.Descripcion || "N/A",
      periocidadPago: tasaInteresPeriocidadPago.Descripcion || "N/A",
      tasaReferencia: tasaInteresTasaReferencia.Descripcion || "N/A",
      sobreTasa: tasaInteresSobreTasa || "N/A",
    };
    addTasaInteres(tab);
  };

  const addRowsDisposicion = () => {
    let tab = {
      fechaDisposicion: disposicionFechaDisposicion,
      importe: disposicionImporte,
    };
    addDisposicion(tab);
  };

  const [radioValue, setRadioValue] = useState("Tasa Fija");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    if (tasasParciales === false) {
      cleanTasaInteres();
    }
    changeTasa();
  };

  const changeTasa = () => {
    if (radioValue !== "Tasa Fija") {
      changeTasaInteres({
        tasaFija: true,
        tasaVariable: false,
        tasa: tasaInteresTasa,
        fechaPrimerPago: tasaInteresFechaPrimerPago,
        diasEjercicio: tasaInteresDiasEjercicio,
        periocidadPago: tasaInteresPeriocidadPago,
        tasaReferencia: tasaInteresTasaReferencia,
        sobreTasa: tasaInteresSobreTasa,
      });
    } else {
      changeTasaInteres({
        tasaFija: false,
        tasaVariable: true,
        tasa: tasaInteresTasa,
        fechaPrimerPago: tasaInteresFechaPrimerPago,
        diasEjercicio: tasaInteresDiasEjercicio,
        periocidadPago: tasaInteresPeriocidadPago,
        tasaReferencia: tasaInteresTasaReferencia,
        sobreTasa: tasaInteresSobreTasa,
      });
    }
  };

  const reset = () => {
    changeTasaInteres({
      tasaFija: false,
      tasaVariable: false,
      tasa: "",
      fechaPrimerPago: new Date().toString(),
      diasEjercicio: { Id: "", Descripcion: "" },
      periocidadPago: { Id: "", Descripcion: "" },
      tasaReferencia: { Id: "", Descripcion: "" },
      sobreTasa: "",
    });
  };

  useEffect(() => {
    if (tasasParciales === false) {
      cleanTasaInteres();
    }
  }, [monto, tasasParciales]);

  useEffect(() => {
    if (
      !(
        tasaInteresFechaPrimerPago === "" ||
        tasaInteresDiasEjercicio.Descripcion === "" ||
        tasaInteresPeriocidadPago.Descripcion === "" ||
        (radioValue === "Tasa Fija" && tasaInteresTasa.toString() === "") ||
        (radioValue === "Tasa Variable" &&
          tasaInteresTasaReferencia.toString() === "") ||
        (radioValue === "Tasa Variable" && tasaInteresSobreTasa === "")
      ) &&
      tasasParciales === false
    ) {
      addRows();
    } else if (
      (tasaInteresFechaPrimerPago === "" ||
        tasaInteresDiasEjercicio.Descripcion === "" ||
        tasaInteresPeriocidadPago.Descripcion === "" ||
        (radioValue === "Tasa Fija" && tasaInteresTasa.toString() === "") ||
        (radioValue === "Tasa Variable" &&
          tasaInteresTasaReferencia.toString() === "") ||
        (radioValue === "Tasa Variable" && tasaInteresSobreTasa === "")) &&
      tasasParciales === false
    ) {
      cleanTasaInteres();
    }
  }, [
    tasaInteresFechaPrimerPago,
    tasaInteresDiasEjercicio.Descripcion,
    tasaInteresPeriocidadPago.Descripcion,
    radioValue,
    tasaInteresTasa,
    tasaInteresTasaReferencia,
    tasaInteresSobreTasa,
  ]);

  useEffect(() => {
    if (disposicionesParciales === false) {
      changeDisposicion(
        disposicionFechaDisposicion,
        moneyMask(monto.toString())
      );
    }
  }, [monto, disposicionesParciales]);

  const updateDisposicion: Function = useLargoPlazoStore(
    (state) => state.updateDisposicion
  );

  useEffect(() => {
    if (disposicionesParciales === false) {
      let tab = {
        fechaDisposicion: disposicionFechaDisposicion,
        importe: disposicionImporte,
      };
      updateDisposicion([tab]);
    }
  }, [disposicionFechaDisposicion, disposicionImporte, disposicionesParciales]);

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
                sx={{ width: "100%" }}
                value={new Date(capitalFechaPrimerPago)}
                onChange={(date) =>
                  changeCapital(
                    date?.toString(),
                    capitalPeriocidadPago,
                    capitalNumeroPago
                  )
                }
                minDate={new Date(disposicionFechaDisposicion)}
                maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Periodicidad de Pago
            </InputLabel>
            <Autocomplete
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
              value={capitalPeriocidadPago}
              onChange={(event, text) =>
                changeCapital(
                  capitalFechaPrimerPago,
                  {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  capitalNumeroPago
                )
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
              value={capitalNumeroPago <= 0 ? "" : capitalNumeroPago.toString()}
              onChange={(v) => {
                if (validator.isNumeric(v.target.value)) {
                  changeCapital(
                    capitalFechaPrimerPago,
                    capitalPeriocidadPago,
                    v.target.value
                  );
                } else if (v.target.value === "") {
                  changeCapital(
                    capitalFechaPrimerPago,
                    capitalPeriocidadPago,
                    0
                  );
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
                      setDisposicionesParciales(!disposicionesParciales);
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
                  // disabled={!disposicionesParciales}
                  value={new Date(disposicionFechaDisposicion)}
                  onChange={(date) => {
                    changeDisposicion(
                      date?.toString(),
                      moneyMask(disposicionImporte.toString())
                    );
                  }}
                  minDate={new Date(fechaContratacion)}
                  maxDate={new Date(addDays(new Date(), 365))}
                // slots={{
                //   textField: DateInput,
                // }}
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
                value={
                  disposicionImporte <= 0
                    ? ""
                    : moneyMask(disposicionImporte.toString())
                }
                onChange={(v) => {
                  if (
                    validator.isNumeric(v.target.value.replace(/\D/g, "")) &&
                    disposicionesParciales &&
                    parseInt(v.target.value.replace(/\D/g, "")) <
                    9999999999999999 &&
                    parseInt(v.target.value.replace(/\D/g, "")) <=
                    restante * 100
                  ) {
                    changeDisposicion(
                      disposicionFechaDisposicion,
                      moneyMask(v.target.value)
                    );
                  } else if (v.target.value === "") {
                    changeDisposicion(
                      disposicionFechaDisposicion,
                      moneyMask("0")
                    );
                  }
                }}
                error={
                  parseInt(disposicionImporte.toString().replace(/\D/g, "")) >
                  parseInt(monto.toString().replace(/\D/g, ""))
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
                  // startAdornment: <AttachMoneyIcon />,
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
                    disposicionFechaDisposicion === "" ||
                    parseInt(
                      disposicionImporte.toString().replace(/\D/g, "")
                    ) === 0 ||
                    parseInt(disposicionImporte.toString().replace(/\D/g, "")) >
                    restante * 100
                  }
                  variant="outlined"
                  onClick={() => {
                    addRowsDisposicion();
                    changeDisposicion(
                      disposicionFechaDisposicion,
                      moneyMask("0")
                    );
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
                        {tablaDisposicion.map((row: any, index: number) => {
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
                                {lightFormat(
                                  new Date(row.fechaDisposicion),
                                  "dd-MM-yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center" component="th">
                                {row.importe}
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
                defaultValue="Tasa Fija"
                value={radioValue}
                onChange={handleChange}
              >
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      value="Tasa Fija"
                      control={<Radio />}
                      label="Tasa Fija"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="Tasa Variable"
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
                      setTasasParciales(!tasasParciales);
                    }}
                  />
                }
              ></FormControlLabel>
            </Grid>
          </Grid>

          <Grid container display={"flex"} justifyContent={"center"} mb={2}>
            {radioValue === "Tasa Fija" ? (
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
                      value={new Date(tasaInteresFechaPrimerPago)}
                      onChange={(date) =>
                        changeTasaInteres({
                          tasaFija: tasaInteresTasaFija,
                          tasaVariable: tasaInteresTasaVariable,
                          tasa: tasaInteresTasa,
                          fechaPrimerPago: date?.toString(),
                          diasEjercicio: tasaInteresDiasEjercicio,
                          periocidadPago: tasaInteresPeriocidadPago,
                          tasaReferencia: { Id: "", Descripcion: "" },
                          sobreTasa: "",
                        })
                      }
                      // slots={{
                      //   textField: DateInput,
                      // }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>Tasa Fija</InputLabel>

                  <TextField
                    placeholder="0"
                    value={
                      tasaInteresTasa <= 0 ? "" : tasaInteresTasa.toString()
                    }
                    onChange={(v) => {
                      if (validator.isNumeric(v.target.value)) {
                        changeTasaInteres({
                          tasaFija: tasaInteresTasaFija,
                          tasaVariable: tasaInteresTasaVariable,
                          tasa: v.target.value,
                          fechaPrimerPago: tasaInteresFechaPrimerPago,
                          diasEjercicio: tasaInteresDiasEjercicio,
                          periocidadPago: tasaInteresPeriocidadPago,
                          tasaReferencia: { Id: "", Descripcion: "" },
                          sobreTasa: "",
                        });
                      } else if (v.target.value === "") {
                        changeTasaInteres({
                          tasaFija: 0,
                          tasaVariable: tasaInteresTasaVariable,
                          tasa: v.target.value,
                          fechaPrimerPago: tasaInteresFechaPrimerPago,
                          diasEjercicio: tasaInteresDiasEjercicio,
                          periocidadPago: tasaInteresPeriocidadPago,
                          tasaReferencia: { Id: "", Descripcion: "" },
                          sobreTasa: "",
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
                    }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Días del Ejercicio
                  </InputLabel>
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
                    value={tasaInteresDiasEjercicio}
                    onChange={(event, text) =>
                      changeTasaInteres({
                        tasaFija: tasaInteresTasaFija,
                        tasaVariable: tasaInteresTasaVariable,
                        tasa: tasaInteresTasa,
                        fechaPrimerPago: tasaInteresFechaPrimerPago,
                        diasEjercicio: {
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                        },
                        periocidadPago: tasaInteresPeriocidadPago,
                        tasaReferencia: { Id: "", Descripcion: "" },
                        sobreTasa: "",
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
                    value={tasaInteresPeriocidadPago}
                    onChange={(event, text) =>
                      changeTasaInteres({
                        tasaFija: tasaInteresTasaFija,
                        tasaVariable: tasaInteresTasaVariable,
                        tasa: tasaInteresTasa,
                        fechaPrimerPago: tasaInteresFechaPrimerPago,
                        diasEjercicio: tasaInteresDiasEjercicio,
                        periocidadPago: {
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                        },
                        tasaReferencia: { Id: "", Descripcion: "" },
                        sobreTasa: "",
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
                     sx={{ width: "100%" }}
                      value={new Date(tasaInteresFechaPrimerPago)}
                      onChange={(date) =>
                        changeTasaInteres({
                          tasaFija: tasaInteresTasaFija,
                          tasaVariable: tasaInteresTasaVariable,
                          tasa: "",
                          fechaPrimerPago: date?.toString(),
                          diasEjercicio: tasaInteresDiasEjercicio,
                          periocidadPago: tasaInteresPeriocidadPago,
                          tasaReferencia: tasaInteresTasaReferencia,
                          sobreTasa: tasaInteresSobreTasa,
                        })
                      }
                    // slots={{
                    //   textField: DateInput,
                    // }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid xs={10} sm={2} md={2} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Periodicidad de Pago
                  </InputLabel>
                  <Autocomplete
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
                    value={tasaInteresPeriocidadPago}
                    onChange={(event, text) =>
                      changeTasaInteres({
                        tasaFija: tasaInteresTasaFija,
                        tasaVariable: tasaInteresTasaVariable,
                        tasa: "",
                        fechaPrimerPago: tasaInteresFechaPrimerPago,
                        diasEjercicio: tasaInteresDiasEjercicio,
                        periocidadPago: {
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                        },
                        tasaReferencia: tasaInteresTasaReferencia,
                        sobreTasa: tasaInteresSobreTasa,
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
                    value={tasaInteresTasaReferencia}
                    onChange={(event, text) =>
                      changeTasaInteres({
                        tasaFija: tasaInteresTasaFija,
                        tasaVariable: tasaInteresTasaVariable,
                        tasa: "",
                        fechaPrimerPago: tasaInteresFechaPrimerPago,
                        diasEjercicio: tasaInteresDiasEjercicio,
                        periocidadPago: tasaInteresPeriocidadPago,
                        tasaReferencia: {
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                        },
                        sobreTasa: tasaInteresSobreTasa,
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
                    value={tasaInteresSobreTasa}
                    onChange={(text) => {
                      const expRegular = /^\d*\.?\d*$/;

                      if (
                        expRegular.test(text.target.value) ||
                        text.target.value === ""
                      ) {
                        changeTasaInteres({
                          tasaFija: tasaInteresTasaFija,
                          tasaVariable: tasaInteresTasaVariable,
                          tasa: "",
                          fechaPrimerPago: tasaInteresFechaPrimerPago,
                          diasEjercicio: tasaInteresDiasEjercicio,
                          periocidadPago: tasaInteresPeriocidadPago,
                          tasaReferencia: tasaInteresTasaReferencia,
                          sobreTasa: text.target.value || "",
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
                    value={tasaInteresDiasEjercicio}
                    onChange={(event, text) =>
                      changeTasaInteres({
                        tasaFija: tasaInteresTasaFija,
                        tasaVariable: tasaInteresTasaVariable,
                        tasa: "",
                        fechaPrimerPago: tasaInteresFechaPrimerPago,
                        diasEjercicio: {
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                        },
                        periocidadPago: tasaInteresPeriocidadPago,
                        tasaReferencia: tasaInteresTasaReferencia,
                        sobreTasa: tasaInteresSobreTasa,
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
                      tasaInteresFechaPrimerPago === "" ||
                      tasaInteresDiasEjercicio.Descripcion === "" ||
                      tasaInteresPeriocidadPago.Descripcion === "" ||
                      (radioValue === "Tasa Fija" &&
                        tasaInteresTasa.toString() === "") ||
                      (radioValue === "Tasa Variable" &&
                        tasaInteresTasaReferencia.toString() === "") ||
                      (radioValue === "Tasa Variable" &&
                        tasaInteresSobreTasa === "")
                    }
                    variant="outlined"
                    onClick={() => {
                      addRows();
                      reset();
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
                          {tablaTasaInteres.map((row: any, index: number) => {
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
                                <StyledTableCell align="center" component="th">
                                  {lightFormat(
                                    new Date(row.fechaPrimerPago),
                                    "dd-MM-yyyy"
                                  )}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th">
                                  {row.tasa}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.periocidadPago}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.tasaReferencia}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.sobreTasa}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {row.diasEjercicio}
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
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

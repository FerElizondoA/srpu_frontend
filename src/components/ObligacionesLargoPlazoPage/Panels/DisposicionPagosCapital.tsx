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
import { addDays, parse } from "date-fns";
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { format, differenceInDays, differenceInMonths } from "date-fns";
import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import {
  IDisposicion,
  IPagosDeCapital,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { moneyMask } from "../../ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import { useReestructuraStore } from "../../../store/Reestructura/main";
//import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

const heads: readonly {
  label: string;
}[] = [
    {
      label: "Borrar",
    },
    {
      label: "Fecha de Disposición"
    },
    {
      label: "Fecha Indicativa"
    },
    {
      label: "Importe de Disposición",
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
      label: "Detalle Periocidad de Pago",
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
  const getPeriocidadPago: Function = useLargoPlazoStore(
    (state) => state.getPeriocidadPago
  );
  const getTasaReferencia: Function = useLargoPlazoStore(
    (state) => state.getTasaReferencia
  );
  const getDiasEjercicio: Function = useLargoPlazoStore(
    (state) => state.getDiasEjercicio
  );

  // CATALOGOS
  const catalogoPeriocidadDePago: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoPeriocidadDePago
  );
  const catalogoTasaReferencia: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoTasaReferencia
  );
  const catalogoDiasEjercicio: Array<ICatalogo> = useLargoPlazoStore(
    (state) => state.catalogoDiasEjercicio
  );

  // PAGOS DE CAPITAL
  const pagosDeCapital: IPagosDeCapital = useLargoPlazoStore(
    (state) => state.pagosDeCapital
  );
  const setPagosDeCapital: Function = useLargoPlazoStore(
    (state) => state.setPagosDeCapital
  );

  // DISPOSICION
  const disposicion: IDisposicion = useLargoPlazoStore(
    (state) => state.disposicion
  );
  const setDisposicion: Function = useLargoPlazoStore(
    (state) => state.setDisposicion
  );
  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  // TABLA Disposicion
  const tablaDisposicion: IDisposicion[] = useLargoPlazoStore(
    (state) => state.tablaDisposicion
  );
  const addDisposicion: Function = useLargoPlazoStore(
    (state) => state.addDisposicion
  );
  const setTablaDisposicion: Function = useLargoPlazoStore(
    (state) => state.setTablaDisposicion
  );
  const removeDisposicion: Function = useLargoPlazoStore(
    (state) => state.removeDisposicion
  );

  // TASA DE INTERES
  const tasaDeInteres: ITasaInteres = useLargoPlazoStore(
    (state) => state.tasaDeInteres
  );
  const setTasaInteres: Function = useLargoPlazoStore(
    (state) => state.setTasaInteres
  );

  //TABLA Tasa de intereses
  const tablaTasaInteres: ITasaInteres[] = useLargoPlazoStore(
    (state) => state.tablaTasaInteres
  );
  const addTasaInteres: Function = useLargoPlazoStore(
    (state) => state.addTasaInteres
  );
  const setTablaTasaInteres: Function = useLargoPlazoStore(
    (state) => state.setTablaTasaInteres
  );
  const removeTasaInteres: Function = useLargoPlazoStore(
    (state) => state.removeTasaInteres
  );

  const fechaContratacion: string = useLargoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  const cleanDisposicion: Function = useLargoPlazoStore(
    (state) => state.cleanDisposicion
  );

  const cleanTasaInteres: Function = useLargoPlazoStore(
    (state) => state.cleanTasaInteres
  );

  const fechaVencimiento: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );

  const tasasParciales: boolean = useLargoPlazoStore(
    (state) => state.tasasParciales
  );
  const disposicionesParciales: boolean = useLargoPlazoStore(
    (state) => state.disposicionesParciales
  );

  const setTasasParciales: Function = useLargoPlazoStore(
    (state) => state.setTasasParciales
  );
  const setDisposicionesParciales: Function = useLargoPlazoStore(
    (state) => state.setDisposicionesParciales
  );

  useEffect(() => {
    catalogoPeriocidadDePago.length <= 0 && getPeriocidadPago();
    catalogoTasaReferencia.length <= 0 && getTasaReferencia();
    catalogoDiasEjercicio.length <= 0 && getDiasEjercicio();
  }, []);

  const radioValue: number = useLargoPlazoStore((state) => state.radioValue);
  const setRadioValue: Function = useLargoPlazoStore(
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

  const obtenerMaxPagos = () => {
    if (!pagosDeCapital.fechaPrimerPago || !fechaVencimiento) {
      return 0;
    }
    const fechaPrimerPagoDate = parse(
      pagosDeCapital.fechaPrimerPago,
      "MM/dd/yyyy",
      new Date()
    );
    const fechaVencimientoDate = new Date(fechaVencimiento);
    const mesesDisponibles = differenceInMonths(fechaVencimientoDate, fechaPrimerPagoDate) + 1;
    switch (pagosDeCapital.periodicidadDePago.Descripcion) {
      case "Pago único": return 1;
      case "Mensual": return mesesDisponibles;
      case "Trimestral": return Math.floor((mesesDisponibles - 1) / 3) + 1;
      case "Cuatrimestral": return Math.floor((mesesDisponibles - 1) / 4) + 1;
      case "Semestral": return Math.floor((mesesDisponibles - 1) / 6) + 1;
      case "Anual": return Math.floor((mesesDisponibles - 1) / 12) + 1;
      default: return 0;
    }
  };

  const [restante, setRestante] = useState(0);

  const parseMoney = (v: string | number): number => {
    if (typeof v === "number") return v;
    const num = Number(String(v).replace(/[$,]/g, ""));
    return Number.isFinite(num) ? num : 0;
  };

  const toCents = (n: number) => Math.round(n * 100);

  useEffect(() => {
    const totalImporteCents = tablaTasaInteres.reduce((acc, it) => {
      const importePesos = parseMoney(it.importe);
      return acc + toCents(importePesos);
    }, 0);

    const montoCents = toCents(parseMoney(monto));
    const nuevoRestanteCents = montoCents - totalImporteCents;

    setRestante(nuevoRestanteCents / 100);
  }, [tablaTasaInteres, monto]);

  const validacionBotonAgregar = (valorFormateado: string) => {
    const valorNumerico = valorFormateado.replace(/[^\d.-]/g, "");
    return (parseFloat(valorNumerico));
  };

  const heredarInteres = (registro: ITasaInteres) => {
    if (registro.tasaFija !== "N/A") {
      setRadioValue(1);
      setTasaInteres({
        ...tasaDeInteres,
        fechaPrimerPago: registro.fechaPrimerPago,
        tasaFija: registro.tasaFija,
        diasEjercicio: {
          Id: registro.diasEjercicio.Id,
          Descripcion: registro.diasEjercicio.Descripcion,
        },
        periocidadPago: {
          Id: registro.periocidadPago.Id,
          Descripcion: registro.periocidadPago.Descripcion,
          detallePeriodicidadPago: registro.periocidadPago.detallePeriodicidadPago,
        },
        tasaReferencia: { Id: "", Descripcion: "" },
        sobreTasa: "N/A",
      });
    } else {
      setRadioValue(2);
      setTasaInteres({
        ...tasaDeInteres,
        fechaPrimerPago: registro.fechaPrimerPago,
        periocidadPago: {
          Id: registro.periocidadPago.Id,
          Descripcion: registro.periocidadPago.Descripcion,
          detallePeriodicidadPago: registro.periocidadPago.detallePeriodicidadPago,
        },
        tasaReferencia: {
          Id: registro.tasaReferencia.Id,
          Descripcion: registro.tasaReferencia.Descripcion,
        },
        sobreTasa: registro.sobreTasa,
        diasEjercicio: {
          Id: registro.diasEjercicio.Id,
          Descripcion: registro.diasEjercicio.Descripcion,
        },
        tasaFija: "",
      });
    }
  };

  useEffect(() => {
    const primerPago = new Date(pagosDeCapital.fechaPrimerPago);
    const vencimiento = new Date(fechaVencimiento);

    if (primerPago > vencimiento) {
      setPagosDeCapital((prev: any) => ({
        ...prev,
        fechaPrimerPago: format(vencimiento, "MM/dd/yyyy"),
      }));
    }
  }, [fechaVencimiento]);

  useEffect(() => {
    if (
      !pagosDeCapital.fechaPrimerPago ||
      !fechaVencimiento
    ) {
      return;
    }

    const fechaPrimerPagoActual =
      parse(
        pagosDeCapital.fechaPrimerPago,
        "MM/dd/yyyy",
        new Date()
      );

    const fechaVencimientoDate =
      new Date(fechaVencimiento);

    if (
      fechaPrimerPagoActual >
      fechaVencimientoDate
    ) {
      setPagosDeCapital({
        ...pagosDeCapital,
        fechaPrimerPago: format(
          fechaVencimientoDate,
          "MM/dd/yyyy"
        ),
      });
    }
  }, [
    fechaVencimiento,
    pagosDeCapital.fechaPrimerPago,
  ]);

  useEffect(() => {
    if (disposicionesParciales === false) {
      setTasaInteres((prev: any) => ({
        ...prev,
        importe: moneyMask(monto.toString()),
      }));
      setTablaTasaInteres([
        {
          Disposiciones: {
            fechaDisposicion: tasaDeInteres.Disposiciones?.fechaDisposicion,
            fechaIndicativa: tasaDeInteres.Disposiciones?.fechaIndicativa
          },
          importe: moneyMask(monto.toString()),
        },
      ]);
    }
  }, [monto, disposicionesParciales === false]);



  const query = {
    isMobile: useMediaQuery("(min-width: 0px) and (max-width: 599px)"),
  };

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

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
    >
      <Grid container mt={2} direction="column"
        height={{
          xs: pagosDeCapital.periodicidadDePago?.Descripcion ===
            "Perfil Especifico" ? "30rem" : "20rem",
          sm: pagosDeCapital.periodicidadDePago?.Descripcion ===
            "Perfil Especifico" ? "15rem" : "10rem",
          md: pagosDeCapital.periodicidadDePago?.Descripcion ===
            "Perfil Especifico" ? "15rem" : "10rem",
          lg: pagosDeCapital.periodicidadDePago?.Descripcion ===
            "Perfil Especifico" ? "15rem" : "10rem",
          xl: pagosDeCapital.periodicidadDePago?.Descripcion ===
            "Perfil Especifico" ? "15rem" : "10rem"
        }}
      >
        <Grid item>
          <Divider sx={{ marginBottom: 2 }}>
            <Typography color={"#af8c55 "} fontWeight={"bold"}>
              PAGOS DE CAPITAL
            </Typography>
          </Divider>
        </Grid>

        <Grid container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={2} md={2} lg={2} xl={2}
            mb={{ xs: 3, sm: 0 }}
            sx={{ width: "100%" }}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Primer Pago
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={es}
            >
              <DesktopDatePicker
                sx={{ width: "100%" }}
                minDate={new Date(fechaContratacion)}
                maxDate={new Date(fechaVencimiento)}
                value={new Date(pagosDeCapital.fechaPrimerPago)}
                onChange={(date) => {
                  if (!date) return;
                  const fechaContratacionDate = new Date(fechaContratacion);
                  const fechaVencimientoDate = new Date(fechaVencimiento);
                  let fechaFinal = date;
                  if (date < fechaContratacionDate) { fechaFinal = fechaContratacionDate; }
                  if (date > fechaVencimientoDate) { fechaFinal = fechaVencimientoDate; }
                  setPagosDeCapital({
                    ...pagosDeCapital,
                    fechaPrimerPago: format(fechaFinal, "MM/dd/yyyy"),
                  });
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={10} sm={2} md={2} lg={2} xl={2}
            mb={{ xs: 3, sm: 0 }}>
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
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                    detallePeriodicidadPago: "",
                  },
                  numeroDePago: 0,
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
            {pagosDeCapital.periodicidadDePago?.Descripcion ===
              "Perfil Especifico" && (
                <Grid>
                  <InputLabel sx={{ ...queries.medium_text, mb: 2 }}>
                    Detalle de la Periodicidad
                  </InputLabel>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={2}
                    variant="outlined"
                    value={
                      pagosDeCapital.periodicidadDePago
                        ?.detallePeriodicidadPago || ""
                    }
                    helperText={`${pagosDeCapital.periodicidadDePago
                      ?.detallePeriodicidadPago?.length || 0
                      } / 500 caracteres`}
                    onChange={(e) => {
                      let valor = e.target.value;
                      valor = valor
                        .replace(/[<>]/g, "")
                        .replace(/script/gi, "")
                        .replace(/javascript:/gi, "");
                      if (valor.length > 500) {
                        valor = valor.substring(0, 500);
                      }
                      setPagosDeCapital({
                        ...pagosDeCapital,
                        periodicidadDePago: {
                          ...pagosDeCapital.periodicidadDePago,
                          detallePeriodicidadPago: valor,
                        },
                      });
                    }}
                  />
                </Grid>
              )}
          </Grid>

          <Grid item xs={10} sm={2} md={2} lg={2} xl={2}
            mb={{ xs: 3, sm: 0 }}>
            <InputLabel sx={{ ...queries.medium_text }}>
              <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                Número de Pagos
              </Grid>
            </InputLabel>
            <TextField
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              helperText={
                pagosDeCapital.periodicidadDePago?.Descripcion === "Perfil Especifico"
                  ? "La cantidad de pagos será determinada conforme al detalle capturado."
                  : `Máximo permitido: ${obtenerMaxPagos()}`
              }
              placeholder="0"
              value={
                pagosDeCapital.numeroDePago <= 0
                  ? ""
                  : pagosDeCapital.numeroDePago.toString()
              }
              onChange={(v) => {
                const valor = Number(v.target.value);
                const esPerfilEspecifico =
                  pagosDeCapital.periodicidadDePago?.Descripcion === "Perfil Especifico";
                if (esPerfilEspecifico || valor <= obtenerMaxPagos() || v.target.value === "") {
                  setPagosDeCapital({
                    ...pagosDeCapital,
                    numeroDePago: v.target.value,
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
            <FormControlLabel
              label="Periodo de Gracia"
              control={
                <Checkbox
                  checked={pagosDeCapital.periodoGracia}
                  onChange={(v) => {
                    setPagosDeCapital({
                      ...pagosDeCapital,
                      periodoGracia: !pagosDeCapital.periodoGracia,
                    });
                  }}
                />
              }
            ></FormControlLabel>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="column" width={"100%"} alignItems={"center"}
        height={{
          xs: "16rem",
          sm: "16rem",
          md: "16rem",
          lg: "9rem",
          xl: "9rem"
        }}
      >
        <Grid item width={"100%"} alignItems={"center"}>
          <Divider sx={{ marginBottom: 2 }}>
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
            <Grid item xs={10} sm={2} md={2} lg={2} xl={2}
              display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}
              mb={{ xs: 3 }}
            >
              <FormControlLabel
                label="Disposiciones Parciales"
                control={
                  <Checkbox
                    checked={disposicionesParciales}
                    onChange={(v) => {
                      setDisposicionesParciales();
                      setTablaTasaInteres([])
                      if (disposicionesParciales === false) {
                        removeDisposicion(0)
                      }
                    }}
                  />
                }
              ></FormControlLabel>
            </Grid>
            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}
              mb={{ xs: 3 }}
            >
              <InputLabel sx={queries.medium_text}>
                Fecha de Disposición
              </InputLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={es}
              >
                <DesktopDatePicker
                  sx={{ width: "100%" }}
                  value={new Date(tasaDeInteres.Disposiciones.fechaDisposicion)}
                  onChange={(date) => {
                    setTasaInteres({
                      ...tasaDeInteres,
                      Disposiciones: {
                        fechaDisposicion: format(date!, "MM/dd/yyyy"),
                      }
                    });
                  }}
                  minDate={new Date(fechaContratacion)}
                  maxDate={new Date(fechaVencimiento)}
                />
              </LocalizationProvider>
              <Grid>
                <FormControlLabel
                  label="Fecha Indicativa"
                  control={
                    <Checkbox
                      checked={tasaDeInteres.Disposiciones?.fechaIndicativa ?? false}
                      onChange={() => {
                        const nuevaFechaIndicativa =
                          !(tasaDeInteres.Disposiciones?.fechaIndicativa ?? false);
                        setTasaInteres({
                          ...tasaDeInteres,
                          Disposiciones: {
                            ...(tasaDeInteres.Disposiciones ?? {}),
                            fechaIndicativa: nuevaFechaIndicativa,
                          },
                        });
                      }}
                    />
                  }
                ></FormControlLabel>
              </Grid>
            </Grid>

            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}
              mb={{ xs: 3 }}
            >
              <InputLabel sx={queries.medium_text}>Importe</InputLabel>

              <Grid justifyContent={"space-between"}>
                {validacionBotonAgregar(
                  tasaDeInteres?.importe.toString()
                ) >
                  restante && disposicionesParciales ? <InputLabel>
                  <Typography sx={{
                    fontSize: ".7rem",
                    fontFamily: "MontserratMedium",
                    color: "red"
                  }}>
                    *favor de ingresar un numero menor*
                  </Typography>
                </InputLabel> : null}



                <Grid display={"flex"} justifyContent={"space-between"}>
                  <TextField
                    disabled={!disposicionesParciales}
                    helperText={
                      (disposicionesParciales
                        ? `Monto Original Contratado: ${moneyMask(String(monto))}; 
                        Monto restante: ${moneyMask(String(restante * 100))}`
                        : ""
                      )
                    }
                    value={moneyMask(String(tasaDeInteres.importe))}
                    onChange={(v) => {
                      const valornuevo = v.target.value;
                      console.log("valorNuevo", valornuevo);

                      setTasaInteres({ ...tasaDeInteres, importe: moneyMask(valornuevo) });
                      //setDisposicion({ ...disposicion, importe: moneyMask(valornuevo) });
                    }}
                    error={
                      disposicionesParciales === false ? false :
                        validacionBotonAgregar(
                          tasaDeInteres.importe.toString()
                        ) >
                        restante
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item>
          <Divider sx={{ marginBottom: 2 }}>
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
            {/* <Grid item>
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
            </Grid> */}
          </Grid>

          <Grid container display={"flex"} justifyContent={"center"} mb={2}>
            {radioValue === 1 ? (
              <Grid item container display="flex" justifyContent="space-evenly">
                <Grid
                  item
                  xs={10}
                  sm={5} md={5}
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
                      minDate={new Date(fechaContratacion)}
                      maxDate={new Date(fechaVencimiento)}
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>Tasa Fija</InputLabel>
                  <TextField
                    type="text"
                    placeholder="0"
                    value={tasaDeInteres.tasaFija}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        setTasaInteres({
                          ...tasaDeInteres,
                          tasaFija: value,
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
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
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                          detallePeriodicidadPago:
                            text?.Descripcion === "Perfil Especifico"
                              ? tasaDeInteres.periocidadPago.detallePeriodicidadPago
                              : 0,
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
                  {
                    tasaDeInteres.periocidadPago?.Descripcion === "Perfil Especifico" && (
                      <Grid item>
                        <InputLabel sx={queries.medium_text}>
                          Detalle de Periodicidad
                        </InputLabel>
                        <TextField
                          placeholder="0"
                          value={
                            tasaDeInteres.periocidadPago.detallePeriodicidadPago || ""
                          }
                          onChange={(v) => {
                            const valor = v.target.value;
                            const soloNumeros = /^\d*$/;
                            if (soloNumeros.test(valor) && valor.length <= 5) {
                              setTasaInteres({
                                ...tasaDeInteres,
                                periocidadPago: {
                                  ...tasaDeInteres.periocidadPago,
                                  detallePeriodicidadPago:
                                    valor === "" ? 0 : Number(valor),
                                },
                              });
                            }
                          }}
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 5,
                          }}
                          sx={{
                            "& input[type=number]": {
                              MozAppearance: "textfield",
                            },
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                          }}
                        />
                      </Grid>
                    )
                  }
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={es}
                  >
                    <DesktopDatePicker
                      sx={{ width: "100%" }}
                      minDate={new Date(fechaContratacion)}
                      maxDate={new Date(fechaVencimiento)}
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
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
                          Id: text?.Id || "",
                          Descripcion: text?.Descripcion || "",
                          detallePeriodicidadPago:
                            text?.Descripcion === "Perfil Especifico"
                              ? tasaDeInteres.periocidadPago.detallePeriodicidadPago
                              : 0,
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
                  {
                    tasaDeInteres.periocidadPago?.Descripcion === "Perfil Especifico" && (
                      <Grid item>
                        <InputLabel sx={queries.medium_text}>
                          Detalle de Periodicidad
                        </InputLabel>
                        <TextField
                          placeholder="0"
                          value={
                            tasaDeInteres.periocidadPago.detallePeriodicidadPago || ""
                          }
                          onChange={(v) => {
                            const valor = v.target.value;
                            const soloNumeros = /^\d*$/;
                            if (soloNumeros.test(valor) && valor.length <= 5) {
                              setTasaInteres({
                                ...tasaDeInteres,
                                periocidadPago: {
                                  ...tasaDeInteres.periocidadPago,
                                  detallePeriodicidadPago:
                                    valor === "" ? 0 : Number(valor),
                                },
                              });
                            }
                          }}
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                            maxLength: 5,
                          }}
                          sx={{
                            "& input[type=number]": {
                              MozAppearance: "textfield",
                            },
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                          }}
                        />
                      </Grid>
                    )
                  }
                </Grid>

                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
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

                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
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

                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}>
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
            {disposicionesParciales && (
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
                        tasaDeInteres.sobreTasa.toString() === "") ||
                      validacionBotonAgregar(
                        tasaDeInteres?.importe?.toString()
                      ) === 0 ||
                      validacionBotonAgregar(
                        tasaDeInteres?.importe?.toString()
                      ) > restante
                    }
                    variant="outlined"
                    onClick={() => {
                      addTasaInteres(tasaDeInteres);
                      cleanTasaInteres();
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
                                    <Grid display={"flex"} justifyContent={"space-evenly"}>
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
                                      <Tooltip title="Heredar Interés">
                                        <IconButton
                                          onClick={() => heredarInteres(row)}
                                        >
                                          <BorderColorIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                  </StyledTableCell>
                                  <StyledTableCell align="center" component="th">
                                    {row?.Disposiciones?.fechaDisposicion}
                                  </StyledTableCell>
                                  <StyledTableCell align="center" component="th">
                                    {row?.Disposiciones?.fechaIndicativa === true ? "Aplica" : "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell align="center" component="th">
                                    {row?.importe}
                                  </StyledTableCell>
                                  <StyledTableCell align="center" component="th">
                                    {row?.fechaPrimerPago}
                                  </StyledTableCell>
                                  <StyledTableCell align="center" component="th">
                                    {row?.tasaFija}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.periocidadPago?.Descripcion}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.periocidadPago?.Descripcion === "Perfil Especifico" ? row?.periocidadPago?.detallePeriodicidadPago : "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.tasaReferencia?.Descripcion || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.sobreTasa || "N/A"}
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    {row?.diasEjercicio?.Descripcion}
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

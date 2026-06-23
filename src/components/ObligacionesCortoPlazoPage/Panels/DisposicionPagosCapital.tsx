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
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { addDays, parse } from "date-fns";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { format, differenceInDays, differenceInMonths } from "date-fns";
import es from "date-fns/locale/es";
import { useEffect, useMemo, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import {
  IDisposicion,
  IPagosDeCapital,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { moneyMask } from "./InformacionGeneral";
import { log } from "console";
//import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

const heads: readonly {
  label: string;
}[] = [
    {
      label: "Borrar",
    },
    //NUEVOS INICIO
    {
      label: "Fecha de Disposición"
    },
    {
      label: "Fecha Indicativa"
    },
    {
      label: "Importe de Disposición",
    },
    //NUEVOS FIN
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

  const cleanDisposicion: Function = useCortoPlazoStore(
    (state) => state.cleanDisposicion
  );

  const cleanTablaTasaInteres: Function = useCortoPlazoStore(
    (state) => state.cleanTablaTasaInteres
  );
  const cleanTasaInteres: Function = useCortoPlazoStore(
    (state) => state.cleanTasaInteres
  );

  const fechaVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );

  const fechaVencimientoDate = new Date(fechaVencimiento);
  const fechaPrimerPagoDate = parse(
    pagosDeCapital.fechaPrimerPago,
    "MM/dd/yyyy",
    new Date()
  );

  const mesesDisponibles =
    differenceInMonths(
      fechaVencimientoDate,
      fechaPrimerPagoDate
    ) + 1;

  const obtenerMaxPagos = () => {
    if (
      !pagosDeCapital.fechaPrimerPago ||
      !fechaVencimiento
    ) {
      return 0;
    }

    const fechaPrimerPagoDate = parse(
      pagosDeCapital.fechaPrimerPago,
      "MM/dd/yyyy",
      new Date()
    );

    const fechaVencimientoDate = new Date(
      fechaVencimiento
    );

    const mesesDisponibles =
      differenceInMonths(
        fechaVencimientoDate,
        fechaPrimerPagoDate
      ) + 1;

    switch (pagosDeCapital.periodicidadDePago.Descripcion) {
      case "Pago único":
        return 1;

      case "Mensual":
        return mesesDisponibles;

      case "Trimestral":
        return Math.floor((mesesDisponibles - 1) / 3) + 1;

      case "Cuatrimestral":
        return Math.floor((mesesDisponibles - 1) / 4) + 1;

      case "Semestral":
        return Math.floor((mesesDisponibles - 1) / 6) + 1;

      case "Anual":
        return Math.floor((mesesDisponibles - 1) / 12) + 1;

      default:
        return 0;
    }
  };

  // const moneyMask = (value: string) => {
  //   const floatValue = parseFloat(value).toFixed(2); // Aseguramos siempre dos decimales
  //   return floatValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Formateamos el número con comas
  // };

  const diasDisponibles =
    differenceInDays(
      new Date(fechaVencimiento),
      new Date(pagosDeCapital.fechaPrimerPago)
    ) + 1;

  // const obtenerMaxPagos = () => {
  //   if (
  //     !pagosDeCapital.fechaPrimerPago ||
  //     !fechaVencimiento
  //   ) {
  //     return 0;
  //   }

  //   const fechaPrimerPagoDate = new Date(
  //     pagosDeCapital.fechaPrimerPago
  //   );

  //   const fechaVencimientoDate = new Date(
  //     fechaVencimiento
  //   );

  //   const diasDisponibles = differenceInDays(
  //     fechaVencimientoDate,
  //     fechaPrimerPagoDate
  //   ) + 1;

  //   switch (pagosDeCapital.periodicidadDePago.Descripcion) {
  //     case "Pago único":
  //       return 1;

  //     case "Mensual":
  //       return Math.floor(diasDisponibles / 30) + 1;

  //     case "Trimestral":
  //       return Math.floor(diasDisponibles / 90);

  //     case "Cuatrimestral":
  //       return Math.floor(diasDisponibles / 120);

  //     case "Semestral":
  //       return Math.floor(diasDisponibles / 180);

  //     case "Anual":
  //       return Math.floor(diasDisponibles / 365);

  //     default:
  //       return 0;
  //   }
  // };


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




  const [restante, setRestante] = useState(0); // en pesos

  const parseMoney = (v: string | number): number => {
    if (typeof v === "number") return v;
    // quita $ y comas en una sola pasada
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

    setRestante(nuevoRestanteCents / 100); // guardas en pesos
  }, [tablaTasaInteres, monto]);


  const validacionBotonAgregar = (valorFormateado: string) => {
    // Remueve cualquier carácter que no sea número o punto decimal
    const valorNumerico = valorFormateado.replace(/[^\d.-]/g, "");
    return (parseFloat(valorNumerico)); // Convierte la cadena a número flotante
  };

  const heredarInteres = (registro: ITasaInteres) => {

    // Es tasa fija
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

        tasaReferencia: {
          Id: "",
          Descripcion: "",
        },

        sobreTasa: "",
      });

    } else {

      // Es tasa variable
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

  // useEffect(() => {
  //   console.log("Días disponibles:", diasDisponibles);
  //   console.log("Fecha Primer Pago:", pagosDeCapital.fechaPrimerPago);
  //   console.log("Fecha Vencimiento:", fechaVencimiento);
  //   console.log("Fecha de contratacion", fechaContratacion);

  //   const fechaPrimerPagoDate = new Date(pagosDeCapital.fechaPrimerPago);
  //   const fechaVencimientoDate = new Date(fechaVencimiento);

  //   console.log("Primer Pago Date:", fechaPrimerPagoDate);
  //   console.log("Vencimiento Date:", fechaVencimientoDate);
  // }, [pagosDeCapital.fechaPrimerPago, fechaVencimiento, pagosDeCapital.periodicidadDePago]);


  useEffect(() => {
    console.log("Primer Pago:", fechaPrimerPagoDate);
    console.log("Vencimiento:", fechaVencimientoDate);
    console.log("Meses disponibles:", mesesDisponibles);
    console.log("Máximo pagos:", obtenerMaxPagos());
  }, [pagosDeCapital.fechaPrimerPago, fechaVencimiento, pagosDeCapital.periodicidadDePago])

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
      // setTasaInteres({ ...tasaDeInteres, tasaFija: "" });
      setTablaTasaInteres([tasaDeInteres]);
    }
    console.log("TABLA", tasaDeInteres)
  }, [disposicionesParciales, tasaDeInteres]);


  useEffect(() => {
    if (disposicionesParciales === false) {
      // setDisposicion({ ...disposicion, importe: moneyMask(monto.toString()) });

      // setTablaDisposicion([
      //   {
      //     fechaDisposicion: disposicion.fechaDisposicion,
      //     importe: moneyMask(monto.toString()),
      //   },])

      // setTasaInteres({ ...tasaDeInteres, importe: moneyMask(monto.toString()) });
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
  }, [monto, disposicionesParciales]);

  useEffect(() => {
    setTasaInteres({
      ...tasaDeInteres,
      Disposiciones: {
        ...(tasaDeInteres.Disposiciones ?? {}),
        fechaIndicativa: false,
      },
    });
  }, [disposicionesParciales === true])



  // useEffect(() => {


  //   setPagosDeCapital({
  //     ...pagosDeCapital,
  //     numeroDePago: 0,
  //   });
  // }, [pagosDeCapital.periodicidadDePago])

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

    // height={
    //   query.isMobile === false
    //     ? disposicionesParciales === false && tasasParciales === false
    //       ? "32rem"
    //       : disposicionesParciales === true && tasasParciales === false
    //         ? "50rem"
    //         : disposicionesParciales === false && tasasParciales === true
    //           ? "50rem"
    //           : disposicionesParciales === true && tasasParciales === true
    //             ? "62rem"
    //             : "36rem"
    //     : query.isMobile === true
    //       ? disposicionesParciales === false && tasasParciales === false
    //         ? "50rem"
    //         : disposicionesParciales === true && tasasParciales === false
    //           ? "65rem"
    //           : disposicionesParciales === false && tasasParciales === true
    //             ? "65rem"
    //             : disposicionesParciales === true && tasasParciales === true
    //               ? "85rem"
    //               : "52rem"
    //       : "36rem"
    // }
    >
      <Grid container mt={2} direction="column"
        height={{
          xs: "20rem",
          sm: "10rem",
          md: "10rem",
          lg: "10rem",
          xl: "10rem"
        }}
      >
        <Grid item >
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
            mb={{
              xs: 3,
              sm: 0,
              // md: ,
              // lg: ,
              // xl:  /* */
            }}
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

                  const fechaContratacionDate =
                    new Date(fechaContratacion);

                  const fechaVencimientoDate =
                    new Date(fechaVencimiento);

                  let fechaFinal = date;

                  if (date < fechaContratacionDate) {
                    fechaFinal = fechaContratacionDate;
                  }

                  if (date > fechaVencimientoDate) {
                    fechaFinal = fechaVencimientoDate;
                  }

                  setPagosDeCapital({
                    ...pagosDeCapital,
                    fechaPrimerPago: format(
                      fechaFinal,
                      "MM/dd/yyyy"
                    ),
                  });
                }}
              // onChange={(date) => {
              //   if (!date) return;

              //   const vencimiento = new Date(fechaVencimiento);

              //   if (date > vencimiento) {
              //     date = vencimiento;
              //   }

              //   setPagosDeCapital({
              //     ...pagosDeCapital,
              //     fechaPrimerPago: format(date, "MM/dd/yyyy"),
              //   });
              // }}
              // onChange={(date) =>

              //   setPagosDeCapital({
              //     ...pagosDeCapital,
              //     fechaPrimerPago: format(date!, "MM/dd/yyyy"),
              //   })
              // }
              />
              {/* <DesktopDatePicker
                // minDate={new Date(fechaContratacion)}
                // maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
                minDate={new Date(fechaVencimiento)}
                maxDate={new Date(addDays(new Date(fechaVencimiento), 365))}
                sx={{ width: "100%" }}
                value={new Date(pagosDeCapital.fechaPrimerPago)}
                onChange={(date) => {

                  setPagosDeCapital({
                    ...pagosDeCapital,
                    fechaPrimerPago: format(date!, "MM/dd/yyyy"),
                  })
                }
                }
              /> */}
            </LocalizationProvider>
          </Grid>

          <Grid item xs={10} sm={2} md={2} lg={2} xl={2}
            mb={{
              xs: 3,
              sm: 0,
              // md: ,
              // lg: ,
              // xl:  /* */
            }}
          >
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
                  numeroDePago: 0
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
            <InputLabel sx={{ ...queries.medium_text }}>
              <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                Número de Pagos
              </Grid>
            </InputLabel>
            <TextField
              helperText={`Máximo permitido: ${obtenerMaxPagos()}`}
              placeholder="0"
              value={
                pagosDeCapital.numeroDePago <= 0
                  ? ""
                  : pagosDeCapital.numeroDePago.toString()
              }
              // onChange={(v) => {
              //   setPagosDeCapital({
              //     ...pagosDeCapital,
              //     numeroDePago: v.target.value,
              //   });
              // }}
              onChange={(v) => {
                const valor = Number(v.target.value);

                if (valor <= obtenerMaxPagos() || v.target.value === "") {
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
            {/* <InputLabel
              sx={{
                ...queries.medium_text,
                color: "#AF8C55",
              }}
            >
              <Typography color="red" fontSize={"0.8rem"}>
                Máximo permitido: {obtenerMaxPagos()}
              </Typography>
            </InputLabel> */}
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

                    // if (disposicionesParciales === false) {
                    //   removeDisposicion(0)
                    // }
                  }}
                />
              }
            ></FormControlLabel>
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction="column" width={"100%"} alignItems={"center"}
        //height={disposicionesParciales === false ? "16rem": "35rem"}
        height={{
          xs: "16rem",
          sm: "16rem",
          md: "16rem",
          lg: "9rem",
          xl: "9rem"  /* */
        }}
      // height={ disposicionesParciales === false ? 2 : 3 }

      >
        <Grid item width={"100%"} alignItems={"center"}>
          <Divider sx={{ marginBottom: 2 }}>
            <Typography color={"#af8c55 "} fontWeight={"bold"} >
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
              mb={{
                xs: 3,
                // sm: ,
                // md: ,
                // lg: ,
                // xl:  /* */
              }}
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
              mb={{
                xs: 3,
                // sm: ,
                // md: ,
                // lg: ,
                // xl:  /* */
              }}
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
                    // setDisposicion({
                    //   ...disposicion,
                    //   fechaDisposicion: format(date!, "MM/dd/yyyy"),
                    // });
                  }}
                  minDate={new Date(fechaContratacion)}

                  maxDate={new Date(fechaVencimiento)}

                // maxDate={new Date(addDays(new Date(), 365))}
                />
              </LocalizationProvider>

              <Grid>
                {/* Te quedaste aqui */}
                <FormControlLabel
                  label="Fecha Indicativa"
                  //disabled={disposicionesParciales === true}
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
              mb={{
                xs: 3,
              }}
            >

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
                    value={tasaDeInteres.importe}
                    onChange={(v) => {
                      const valornuevo = v.target.value;
                      console.log("valorNuevo", valornuevo);

                      setTasaInteres({ ...tasaDeInteres, importe: moneyMask(valornuevo) });
                      //setDisposicion({ ...disposicion, importe: moneyMask(valornuevo) });
                    }}
                    error={
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

          {/* {disposicionesParciales && (

            <Grid
              container
              flexDirection={"column"}
              alignItems={"center"}
              width={"100%"}
            >

              <ThemeProvider theme={buttonTheme}>
                <Tooltip title={validacionBotonAgregar(
                  tasaDeInteres.importe.toString()
                ) >
                  restante ? "Favor de ingresar un numero menor" : ""}>
                  <Button
                    sx={{
                      ...queries.buttonContinuarSolicitudInscripcion,
                      mt: 2,
                      mb: 2,
                      width: "15vh",
                    }}
                    disabled={
                      validacionBotonAgregar(
                        tasaDeInteres.importe.toString()
                      ) === 0 ||
                      validacionBotonAgregar(
                        tasaDeInteres.importe.toString()
                      ) >
                      restante
                    }
                    variant="outlined"
                    onClick={() => {
                      setDisposicion({ ...disposicion, importe: moneyMask("0") });
                      addDisposicion(disposicion);
                    }}
                  >
                    Agregar
                  </Button>
                </Tooltip>
              </ThemeProvider>


              <Grid
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                height={"13rem"}
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


          )} */}
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item mt={3}>
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
            mb={{
              xs: 3,
              // sm: ,
              // md: ,
              // lg: ,
              // xl:  /* */
            }}
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

          <Grid container display={"flex"} justifyContent={"center"} mb={1}>
            {radioValue === 1 ? (
              <Grid item container display="flex" justifyContent="space-evenly">
                <Grid
                  item
                  xs={10}
                  sm={5} md={5}
                  lg={2}
                  xl={2}
                  display={"block"}
                  mb={{
                    xs: 3,
                    // sm: ,
                    // md: ,
                    // lg: ,
                    // xl:  /* */
                  }}
                >
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={es}
                  >
                    <DesktopDatePicker
                      // minDate={new Date(fechaContratacion)}
                      // maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
                      minDate={new Date(fechaContratacion)}
                      maxDate={new Date(fechaVencimiento)}
                      sx={{ width: "100%" }}
                      value={new Date(tasaDeInteres.fechaPrimerPago)}
                      slotProps={{
                        popper: {
                          placement: "top-start",
                        },
                      }}
                      onChange={(date) => {
                        setTasaInteres({
                          ...tasaDeInteres,
                          fechaPrimerPago: format(date!, "MM/dd/yyyy"),
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}
                  mb={{
                    xs: 3,
                    // sm: ,
                    // md: ,
                    // lg: ,
                    // xl:  /* */
                  }}
                >
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}
                  mb={{
                    xs: 3,
                    // sm: ,
                    // md: ,
                    // lg: ,
                    // xl:  /* */
                  }}
                >
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2}
                  mb={{
                    xs: 3,
                    // sm: ,
                    // md: ,
                    // lg: ,
                    // xl:  /* */
                  }}
                >
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
                    // onChange={(event, text) =>
                    //   setTasaInteres({
                    //     ...tasaDeInteres,
                    //     periocidadPago: {
                    //       Id: text?.Id,
                    //       Descripcion: text?.Descripcion,
                    //     },
                    //   })
                    // }
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
                      <Grid item >
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

                            if (
                              soloNumeros.test(valor) &&
                              valor.length <= 5
                            ) {
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
                <Grid item xs={10} sm={5} md={5} lg={2} xl={2} width={"100%"}>
                  <InputLabel sx={queries.medium_text}>
                    Fecha de Primer Pago
                  </InputLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={es}
                  >
                    <DesktopDatePicker
                      sx={{ width: "100%" }}
                      // minDate={new Date(fechaContratacion)}
                      // maxDate={new Date(addDays(new Date(fechaContratacion), 365))}
                      minDate={new Date(fechaContratacion)}
                      maxDate={new Date(fechaVencimiento)}
                      slotProps={{
                        popper: {
                          placement: "top-start",
                        },
                      }}
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
                    // onChange={(event, text) =>
                    //   setTasaInteres({
                    //     ...tasaDeInteres,
                    //     periocidadPago: {
                    //       Id: text?.Id,
                    //       Descripcion: text?.Descripcion,
                    //     },
                    //   })
                    // }
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
                      <Grid item >
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

                            if (
                              soloNumeros.test(valor) &&
                              valor.length <= 5
                            ) {
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
                          // onChange={(v) => {
                          //   const valor = v.target.value;

                          //   const soloNumeros = /^\d*$/;

                          //   if (soloNumeros.test(valor)) {
                          //     setTasaInteres({
                          //       ...tasaDeInteres,
                          //       periocidadPago: {
                          //         ...tasaDeInteres.periocidadPago,
                          //         detallePeriodicidadPago:
                          //           valor === "" ? 0 : Number(valor),
                          //       },
                          //     });
                          //   }
                          // }}
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
                      mb: 2,
                      width: "15vh",
                    }}
                    disabled={
                      tasaDeInteres?.fechaPrimerPago === "" ||
                      tasaDeInteres?.diasEjercicio?.Descripcion === "" ||
                      tasaDeInteres?.periocidadPago?.Descripcion === "" ||
                      (radioValue === 1 &&
                        tasaDeInteres?.tasaFija?.toString() === "") ||
                      (radioValue === 2 &&
                        tasaDeInteres?.tasaReferencia?.toString() === "") ||
                      (radioValue === 2 &&
                        tasaDeInteres?.sobreTasa?.toString() === "") ||

                      validacionBotonAgregar(
                        tasaDeInteres?.importe?.toString()
                      ) === 0 ||
                      validacionBotonAgregar(
                        tasaDeInteres?.importe?.toString()
                      ) >
                      restante
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
                  height={"16rem"}
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

                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
                                    {row?.Disposiciones?.fechaDisposicion}
                                  </StyledTableCell>

                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
                                    {row?.Disposiciones?.fechaIndicativa === true ? "Aplica" : "N/A"}
                                  </StyledTableCell>

                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
                                    {row?.importe}
                                  </StyledTableCell>


                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
                                    {row?.fechaPrimerPago}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    align="center"
                                    component="th"
                                  >
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
                                    {row?.sobreTasa}
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

import { useEffect, useState } from "react";
import {
  Grid,
  Divider,
  TextField,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  InputLabel,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Radio,
  Tooltip,
  IconButton,
  TableRow,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
} from "@mui/material";
import validator from 'validator';
import CheckIcon from '@mui/icons-material/Check';
import { queries } from "../../../queries";
import DeleteIcon from "@mui/icons-material/Delete";
import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  ConfirmButton,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { lightFormat } from "date-fns";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
//import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

interface Head {
  label: string;
}

const heads: readonly Head[] = [
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
    label: "Periocidad de Pago",
  },
  {
    label: "Tasa de Referencia",
  },
  {
    label: "Sobre Tasa",
  },
  {
    label: "Dias del Ejercicio",
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
  const disposicionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.disposicion.fechaDisposicion
  );
  const disposicionImporte: number = useCortoPlazoStore(
    (state) => state.disposicion.importe
  );
  const changeDisposicion: Function = useCortoPlazoStore(
    (state) => state.changeDisposicion
  );

  // PAGOS DE CAPITAL
  const capitalFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.pagosDeCapital.fechaPrimerPago
  );
  const capitalPeriocidadPago: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.pagosDeCapital.periodicidadDePago);
  const capitalNumeroPago: number = useCortoPlazoStore(
    (state) => state.pagosDeCapital.numeroDePago
  );
  const changeCapital: Function = useCortoPlazoStore(
    (state) => state.changeCapital
  );

  // TASA DE INTERES
  const tasaInteresTasaFija: boolean = useCortoPlazoStore(
    (state) => state.tasaInteres.tasaFija
  );
  const tasaInteresTasaVariable: boolean = useCortoPlazoStore(
    (state) => state.tasaInteres.tasaVariable
  );
  const tasaInteresTasa: number = useCortoPlazoStore(
    (state) => state.tasaInteres.tasa
  );
  const tasaInteresFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.tasaInteres.fechaPrimerPago
  );
  const tasaInteresDiasEjercicio: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.tasaInteres.diasEjercicio);
  const tasaInteresPeriocidadPago: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.tasaInteres.periocidadPago);
  const tasaInteresTasaReferencia: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.tasaInteres.tasaReferencia);
  const tasaInteresSobreTasa: string = useCortoPlazoStore(
    (state) => state.tasaInteres.sobreTasa
  );

  // TABLA TASA DE INTERES
  let tablaTasaInteres: any = useCortoPlazoStore(
    (state) => state.tablaTasaInteres
  );
  const addTasaInteres: Function = useCortoPlazoStore(
    (state) => state.addTasaInteres
  );
  const changeTasaInteres: Function = useCortoPlazoStore(
    (state) => state.changeTasaInteres
  );
  const removeTasaInteres: Function = useCortoPlazoStore(
    (state) => state.removeTasaInteres
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

  const [radioValue, setRadioValue] = useState("Tasa Fija");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
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

  return (
    <Grid container display="flex" justifyContent={"space-evenly"} height={"110%"} >
      <Grid item container>
        <Grid item lg={6} flexDirection="column" height={"100%"} justifyContent={"space-evenly"} >
          <Grid item>
            <Divider>
              <Typography color={"#af8c55 "} fontWeight={"bold"}>DISPOSICIÓN</Typography>
            </Divider>
          </Grid>

          <Grid item display={"flex"} justifyContent={"space-evenly"}>
            <Grid item lg={4}>
              <InputLabel sx={queries.medium_text}>
                Fecha de disposición
              </InputLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enGB}
              >
                <DatePicker
                  value={new Date(disposicionFechaContratacion)}
                  onChange={(date) =>
                    changeDisposicion(date?.toString(), disposicionImporte)
                  }
                  slots={{
                    textField: DateInput,
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item lg={4}>
              <InputLabel sx={queries.medium_text}>Importe</InputLabel>

              <TextField
                placeholder="0"
                value={disposicionImporte<=0?'':disposicionImporte.toString()}
                onChange={(v) =>{
                  if (validator.isNumeric(v.target.value)) {
                  changeDisposicion(disposicionFechaContratacion, v.target.value)
                  }else if(v.target.value===''){
                    changeDisposicion(disposicionFechaContratacion, 0)
                  }
                }
                  
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
                  startAdornment: (
                    <AttachMoneyIcon/>
                  ),
                }}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" lg={6} >
          <Grid item>
            <Divider>
              <Typography color={"#af8c55 "} fontWeight={"bold"}>PAGOS DE CAPITAL</Typography>
            </Divider>
          </Grid>
          <Grid item display={"flex"} justifyContent={"space-evenly"} >
            <Grid lg={4}>
              <InputLabel sx={queries.medium_text}>
                Fecha de Primer Pago
              </InputLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={enGB}
              >
                <DatePicker
                  value={new Date(capitalFechaPrimerPago)}
                  onChange={(date) =>
                    changeCapital(
                      date?.toString(),
                      capitalPeriocidadPago,
                      capitalNumeroPago
                    )
                  }
                  slots={{
                    textField: DateInput,
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item lg={3}>
              <InputLabel sx={queries.medium_text}>
                Periocidad de Pago
              </InputLabel>
              <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText = "Cerrar"
            openText = "Abrir"
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

            <Grid item lg={3}>
              <InputLabel sx={queries.medium_text}>Número de Pago</InputLabel>
              <TextField
                placeholder="0"
                value={capitalNumeroPago<=0?'':capitalNumeroPago.toString()}
                onChange={(v) =>{
                  if (validator.isNumeric(v.target.value)) {
                    changeCapital(
                      capitalFechaPrimerPago,
                      capitalPeriocidadPago,
                      v.target.value
                    )
                  } else if (v.target.value === '') {
                    changeCapital(
                      capitalFechaPrimerPago,
                      capitalPeriocidadPago,
                      0
                    )
                  }
                }
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
      <Grid item width={"100%"} >
        <Grid item  >
          <Grid item>

            <Divider>
              <Typography color={"#af8c55 "} fontWeight={"bold"}> TASA DE INTERÉS</Typography>
            </Divider>
          </Grid>

          <Grid item display={"block"} flexDirection={"column"} justifyContent={"space-evenly"}>
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
            </Grid>

            <Grid item container display={"flex"} justifyContent={"space-between"}>
              {radioValue === "Tasa Fija" ? (
                <Grid
                  item
                  container
                  display="flex"
                  justifyContent="space-evenly"


                >
                  <Grid item lg={2} display={"block"}>
                    <InputLabel sx={queries.medium_text}>
                      Fecha de Primer Pago
                    </InputLabel>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={enGB}
                    >
                      <DatePicker
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
                        slots={{
                          textField: DateInput,
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid lg={2} item>
                    <InputLabel sx={queries.medium_text}>
                      Tasa Fija
                    </InputLabel>

                    <TextField
                      value={tasaInteresTasa}
                      onChange={(v) => {
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

                  <Grid item lg={2}>
                    <InputLabel sx={queries.medium_text}>
                      Días del Ejercicio
                    </InputLabel>
                    <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText = "Cerrar"
            openText = "Abrir"
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

                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      Periocidad de Pago
                    </InputLabel>
                    <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText = "Cerrar"
            openText = "Abrir"
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
                  item
                  container
                  sx={{
                    justifyContent: "space-evenly",
                    display: "flex",

                  }}
                >
                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      Fecha de Primer Pago
                    </InputLabel>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={enGB}
                    >
                      <DatePicker
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
                        slots={{
                          textField: DateInput,
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid>
                    <InputLabel sx={queries.medium_text}>
                      Periocidad de Pago
                    </InputLabel>
                    <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText = "Cerrar"
            openText = "Abrir"
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

                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      Tasa de Referencia
                    </InputLabel>
                    <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText = "Cerrar"
            openText = "Abrir"
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

                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      Sobre Tasa
                    </InputLabel>
                    <TextField
                      value={tasaInteresSobreTasa}
                      onChange={(text) =>
                        changeTasaInteres({
                          tasaFija: tasaInteresTasaFija,
                          tasaVariable: tasaInteresTasaVariable,
                          tasa: "",
                          fechaPrimerPago: tasaInteresFechaPrimerPago,
                          diasEjercicio: tasaInteresDiasEjercicio,
                          periocidadPago: tasaInteresPeriocidadPago,
                          tasaReferencia: tasaInteresTasaReferencia,
                          sobreTasa: text.target.value || "",
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

                  <Grid item>
                    <InputLabel sx={queries.medium_text}>
                      Días del Ejercicio
                    </InputLabel>
                    <Autocomplete
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText = "Cerrar"
            openText = "Abrir"
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


            </Grid>

          </Grid>

        </Grid>

      </Grid>

      <Grid >
        <ThemeProvider theme={theme}>
          <Button
            sx={queries.buttonContinuar}
            disabled={
              tasaInteresFechaPrimerPago === "" ||
              tasaInteresDiasEjercicio.Descripcion === "" ||
              tasaInteresPeriocidadPago.Descripcion === "" ||
              (radioValue === "Tasa Fija" && tasaInteresTasa.toString() === "") ||
              (radioValue === "Tasa Variable" && tasaInteresTasaReferencia.toString() === "") ||
              (radioValue === "Tasa Variable" && tasaInteresSobreTasa === "")
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
      </Grid>

      <Grid container sx={queries.tablaDisposicionPagosCapital}>
        <Paper sx={{ height: "100%", width: "88%" }}>
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
          }} >
            <Table stickyHeader aria-label="sticky table">
              <TableHead  >
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
                      <StyledTableCell align="center" component="th" >
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
    </Grid >
  );
}

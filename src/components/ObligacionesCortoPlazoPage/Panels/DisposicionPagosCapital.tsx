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
  InputAdornment,
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Typography,
  Radio,
  Tooltip,
  IconButton,
  TableRow,
} from "@mui/material";

import { queries } from "../../../queries";
import DeleteIcon from "@mui/icons-material/Delete";
import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";

import {
  ConfirmButton,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";

import { useCortoPlazoStore } from "../../../store/main";
import { lightFormat } from "date-fns";
import { ICatalogo } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

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
    <Grid container direction="column">
      <Grid item container>
        <Grid item container direction="column" lg={6} padding={2}>
          <Grid item>
            <Divider>DISPOSICIÓN</Divider>
          </Grid>

          <Grid item container mt={5}>
            <Grid item ml={15} lg={4}>
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
            <Grid item ml={10} lg={4}>
              <InputLabel sx={queries.medium_text}>Importe</InputLabel>
              <TextField
                value={disposicionImporte}
                onChange={(text) =>
                  /^[0-9,.]*$/.test(text.target.value)
                    ? changeDisposicion(
                        disposicionFechaContratacion,
                        text.target.value
                      )
                    : null
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
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" lg={6} padding={2}>
          <Grid item>
            <Divider>PAGOS DE CAPITAL</Divider>
          </Grid>
          <Grid item container mt={5}>
            <Grid item lg={3} ml={5}>
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

            <Grid item ml={10} lg={3}>
              <InputLabel sx={queries.medium_text}>
                Periocidad de Pago
              </InputLabel>
              <Autocomplete
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

            <Grid item ml={10} lg={3}>
              <InputLabel sx={queries.medium_text}>Número de Pago</InputLabel>
              <TextField
                value={capitalNumeroPago}
                onChange={(c) =>
                  changeCapital(
                    capitalFechaPrimerPago,
                    capitalPeriocidadPago,
                    c.target.value
                  )
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
      <Grid item container>
        <Grid item container direction="column">
          <Grid item mt={5} padding={2}>
            <Divider>TASA DE INTERÉS</Divider>
          </Grid>

          <Grid item container spacing={5}>
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

            <Grid item container mt={5} spacing={5}>
              <Grid
                item
                container
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {radioValue === "Tasa Fija" ? (
                  <Grid
                    item
                    container
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    spacing={5}
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
                    <Grid item>
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

                    <Grid item>
                      <InputLabel sx={queries.medium_text}>
                        Días del Ejercicio
                      </InputLabel>
                      <Autocomplete
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
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                    spacing={5}
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
                    <Grid item>
                      <InputLabel sx={queries.medium_text}>
                        Periocidad de Pago
                      </InputLabel>
                      <Autocomplete
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

            <Grid item ml={window.innerWidth / 50 + 6}>
              <TableContainer sx={{ maxHeight: "400px" }}>
                <Table>
                  <TableHead sx={{ maxHeight: "200px" }}>
                    <TableRow>
                      {heads.map((head, index) => (
                        <StyledTableCell key={index}>
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
                          <StyledTableCell component="th" scope="row">
                            {lightFormat(
                              new Date(row.fechaPrimerPago),
                              "dd-MM-yyyy"
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
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
              <Grid>
                <ConfirmButton
                  disabled={
                    tasaInteresDiasEjercicio.Descripcion === "" ||
                    tasaInteresPeriocidadPago.Descripcion === ""
                  }
                  variant="outlined"
                  onClick={() => {
                    addRows();
                    reset();
                  }}
                >
                  AGREGAR
                </ConfirmButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

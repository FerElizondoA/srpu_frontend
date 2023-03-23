import * as React from "react";
import {
  Grid,
  Checkbox,
  Divider,
  TextField,
  Table,
  TableBody,
  TableSortLabel,
  TableContainer,
  TableHead,
  InputLabel,
  InputAdornment,
  Autocomplete
} from "@mui/material";

import { queries } from "../../../queries";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateInput } from "../../CustomComponents";

import {
  ConfirmButton,
  DeleteButton,
  StyledTableCell,
  StyledTableRow,
  hashFunctionCYRB53,
} from "../../CustomComponents";

import { TasaInteres } from "../../../store/pagos_capital";
import { useCortoPlazoStore } from "../../../store/main";
import { lightFormat } from "date-fns";

interface Head {
    label: string;
}

const heads: readonly Head[] = [
    {
        label: "Selección"
    },
    {
        label: "Fecha de Primer Pago"
    },
    {
        label: "Tasa Fija"
    },
    {
        label: "Periocidad de Pago"
    },
    {
        label: "Tasa de Referencia"
    },
    {
        label: "Sobre Tasa"
    },
    {
        label: "Dias del Ejercicio"
    },
]

export function DisposicionPagosCapital(){

    const disposicionFechaContratacion: string = useCortoPlazoStore(state => state.disposicionFechaContratacion);
    const changeDisposicionFechaContratacion: Function = useCortoPlazoStore(state => state.changeDisposicionFechaContratacion);
    const disposicionImporte: number = useCortoPlazoStore(state => state.disposicionImporte);
    const changeDisposicionImporte: Function = useCortoPlazoStore(state => state.changeDisposicionImporte);
    const capitalFechaPrimerPago: string = useCortoPlazoStore(state => state.capitalFechaPrimerPago);
    const changeCapitalFechaPrimerPago: Function = useCortoPlazoStore(state => state.changeCapitalFechaPrimerPago);
    const capitalPeriocidadPago: string = useCortoPlazoStore(state => state.capitalPeriocidadPago);
    const changeCapitalPeriocidadPago: Function = useCortoPlazoStore(state => state.changeCapitalPeriocidadPago);
    const periocidadDePagoCatalog: string[] = useCortoPlazoStore(state => state.periocidadDePagoCatalog);
    const capitalNumeroPago: number = useCortoPlazoStore(state => state.capitalNumeroPago);
    const changeCapitalNumeroPago: Function = useCortoPlazoStore(state => state.changeCapitalNumeroPago);
    const tasaFechaPrimerPago: string = useCortoPlazoStore(state => state.tasaFechaPrimerPago);
    const changeTasaFechaPrimerPago: Function = useCortoPlazoStore(state => state.changeTasaFechaPrimerPago);
    const tasaPeriocidadPago: string = useCortoPlazoStore(state => state.tasaPeriocidadPago);
    const changeTasaPeriocidadPago: Function = useCortoPlazoStore(state => state.changeTasaPeriocidadPago);
    const tasaReferenciaCatalog: string[] = useCortoPlazoStore(state => state.tasaReferenciaCatalog);
    const tasaReferencia: string = useCortoPlazoStore(state => state.tasaReferencia);
    const changeTasaReferencia: Function = useCortoPlazoStore(state => state.changeTasaReferencia);
    const sobreTasa: string = useCortoPlazoStore(state => state.sobreTasa);
    const changeSobreTasa: Function = useCortoPlazoStore(state => state.changeSobreTasa);
    const tasaDiasEjercicio: string = useCortoPlazoStore(state => state.tasaDiasEjercicio);
    const changeTasaDiasEjercicio: Function = useCortoPlazoStore(state => state.changeTasaDiasEjercicio);
    const diasEjercicioCatalog: string[] = useCortoPlazoStore(state => state.diasEjercicioCatalog);
    const tasaInteresTable: TasaInteres[] = useCortoPlazoStore(state => state.tasaInteresTable);
    const addTasaInteres: Function = useCortoPlazoStore(state => state.addTasaInteres);
    const removeTasaInteres: Function = useCortoPlazoStore(state => state.removeTasaInteres);
    const fetchPeriocidadPago: Function = useCortoPlazoStore(state => state.fetchPeriocidadPago);
    const fetchTasaReferencia: Function = useCortoPlazoStore(state => state.fetchTasaReferencia);
    const fetchDiasEjercicio: Function = useCortoPlazoStore(state => state.fetchDiasEjercicio);

    const [selected, setSelected] = React.useState<readonly number[]>([]);

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly number[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        console.log("selectedIndex === 0 !")
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        console.log("selectedIndex === selected.length -1 !")
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        console.log("selectedIndex === selected.length > 0 !")
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
      console.log(newSelected);
    };

    React.useEffect(() => {
      fetchPeriocidadPago();
      fetchTasaReferencia();
      fetchDiasEjercicio();
    }, [])

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const addRows = () => {
      const TI: TasaInteres = {
        id: hashFunctionCYRB53(new Date().getTime().toString()),
        fechaPrimerPago: tasaFechaPrimerPago,
        tasaFija: "No",
        periocidadPago: tasaPeriocidadPago,
        tasaReferencia: tasaReferencia,
        sobreTasa: sobreTasa,
        diasEjercicio: tasaDiasEjercicio
      }
      addTasaInteres(TI);
    }

    const deleteRows = () => {
      console.log("selected: ", selected)
      selected.forEach((it) => {
        removeTasaInteres(it);
      })
    }

    return (
      <Grid container direction="column">
        <Grid item container>
          <Grid item container direction="column" lg={6} padding={2}>
            <Grid item>
              <Divider sx={queries.medium_text}>DISPOSICIÓN</Divider>
            </Grid>
            <Grid item container mt={5}>
              <Grid item ml={15} lg={4}>
                <InputLabel sx={queries.medium_text}>
                  Fecha de Contratación
                </InputLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={enGB}
                >
                  <DatePicker
                    value={new Date(disposicionFechaContratacion)}
                    onChange={(date) =>
                      changeDisposicionFechaContratacion(date?.toString())
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
                    changeDisposicionImporte(text.target.value)
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
              <Divider sx={queries.medium_text}>PAGOS DE CAPITAL</Divider>
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
                      changeCapitalFechaPrimerPago(date?.toString())
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
                  value={capitalPeriocidadPago}
                  onChange={(event: any, text: string | null) =>
                    changeCapitalPeriocidadPago(text)
                  }
                  options={periocidadDePagoCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item ml={10} lg={3}>
                <InputLabel sx={queries.medium_text}>Número de Pago</InputLabel>
                <TextField
                  value={capitalNumeroPago}
                  onChange={(text) =>
                    changeCapitalNumeroPago(text.target.value)
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
              <Divider sx={queries.medium_text}>TASA DE INTERÉS</Divider>
            </Grid>
            <Grid item container mt={2} spacing={5}>
              <Grid item ml={window.innerWidth / 50 + 12}>
                <InputLabel sx={queries.medium_text}>
                  Fecha de Primer Pago
                </InputLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={enGB}
                >
                  <DatePicker
                    value={new Date(tasaFechaPrimerPago)}
                    onChange={(date) =>
                      changeTasaFechaPrimerPago(date?.toString())
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
                  value={tasaPeriocidadPago}
                  onChange={(event: any, text: string | null) =>
                    changeTasaPeriocidadPago(text)
                  }
                  options={periocidadDePagoCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <InputLabel sx={queries.medium_text}>
                  Tasa de Referencia
                </InputLabel>
                <Autocomplete
                  fullWidth
                  value={tasaReferencia}
                  onChange={(event: any, text: string | null) =>
                    changeTasaReferencia(text)
                  }
                  options={tasaReferenciaCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <InputLabel sx={queries.medium_text}>Sobre Tasa</InputLabel>
                <TextField
                  value={sobreTasa}
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
                  value={tasaDiasEjercicio}
                  onChange={(event: any, text: string | null) =>
                    changeTasaDiasEjercicio(text)
                  }
                  options={diasEjercicioCatalog}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={queries.medium_text}
                    />
                  )}
                />
              </Grid>

              <Grid item ml={window.innerWidth / 50 + 6}>
                <TableContainer sx={{ maxHeight: "400px" }}>
                  <Table>
                    <TableHead sx={{ maxHeight: "200px" }}>
                      {heads.map((head) => (
                        <StyledTableCell>
                          <TableSortLabel>{head.label}</TableSortLabel>
                        </StyledTableCell>
                      ))}
                    </TableHead>
                    <TableBody>
                      {tasaInteresTable.map((row, index) => {
                        const isItemSelected = isSelected(index);
                        return (
                          <StyledTableRow>
                            <StyledTableCell padding="checkbox">
                              <Checkbox
                                onClick={(event) => handleClick(event, index)}
                                checked={isItemSelected}
                              />
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {lightFormat(
                                new Date(row.fechaPrimerPago),
                                "dd-MM-yyyy"
                              )}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tasaFija}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.periocidadPago}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.tasaReferencia}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.sobreTasa + "%"}
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
                <Grid container>
                  <Grid item md={6} lg={6}>
                    <ConfirmButton variant="outlined" onClick={() => addRows()}>
                      AGREGAR
                    </ConfirmButton>
                  </Grid>
                  <Grid item md={6} lg={6}>
                    <DeleteButton variant="outlined" onClick={() => deleteRows()}>
                      ELIMINAR
                    </DeleteButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}
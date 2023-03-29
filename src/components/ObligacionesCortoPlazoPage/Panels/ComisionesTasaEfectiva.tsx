import * as React from "react"

import {
  Grid,
  Checkbox,
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
  FormControlLabel,
  InputAdornment,
  Autocomplete
} from "@mui/material";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateInput } from "../../CustomComponents";

import { queries } from "../../../queries";

import {
  StyledTableCell,
  StyledTableRow,
  hashFunctionCYRB53,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";
import { useCortoPlazoStore } from "../../../store/main";
import { TasaEfectiva } from "../../../store/tasa_efectiva";

import { format } from "date-fns";

interface Head {
    label: string;
}

const heads: readonly Head[] = [
    {
        label: "Selección"
    },
    {
        label: "Tipo de Comisión"
    },
    {
        label: "Fecha de Primer Pago"
    },
    {
        label: "Periocidad de Pago"
    },
    {
        label: "Porcentaje"
    },
    {
        label: "Monto"
    },
    {
        label: "IVA"
    },
]

export function ComisionesTasaEfectiva(){

    const [radioValue, setRadioValue] = React.useState("fixedPercentage");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRadioValue((event.target as HTMLInputElement).value);
      changePercentageOrAmount();
    };

    const changePercentageOrAmount = () => {
      if(radioValue !== "fixedPercentage"){
        console.log("Amount is now 0!");
        changeHasPorcentaje(true);
        changeEfectivaMontoFijo(0);
        changeHasMonto(false);
      }else{
        console.log("Porcentaje is now 0!");
        changeHasPorcentaje(false);
        changeEfectivaPorcentajeFijo(0);
        changeHasMonto(true);
      }
    }

    const efectivaFechaContratacion: string = useCortoPlazoStore(state => state.efectivaFechaContratacion);
    const changeEfectivaFechaContratacion: Function = useCortoPlazoStore(state => state.changeEfectivaFechaContratacion);
    const tipoComision: string = useCortoPlazoStore(state => state.tipoComision);
    const changeTipoComision: Function = useCortoPlazoStore(state => state.changeTipoComision);
    const efectivaPeriocidadPago: string = useCortoPlazoStore(state => state.efectivaPeriocidadPago);
    const changeEfectivaPeriocidadPago: Function = useCortoPlazoStore(state => state.changeEfectivaPeriocidadPago);
    const hasPorcentaje: boolean = useCortoPlazoStore(state => state.hasPorcentaje);
    const changeHasPorcentaje: Function = useCortoPlazoStore(state => state.changeHasPorcentaje);
    const hasMonto: boolean = useCortoPlazoStore(state => state.hasMonto);
    const changeHasMonto: Function = useCortoPlazoStore(state => state.changeHasMonto);
    const efectivaPorcentajeFijo: number = useCortoPlazoStore(state => state.efectivaPorcentajeFijo);
    const changeEfectivaPorcentajeFijo: Function = useCortoPlazoStore(state => state.changeEfectivaPorcentajeFijo);
    const efectivaMontoFijo: number = useCortoPlazoStore(state => state.efectivaMontoFijo);
    const changeEfectivaMontoFijo: Function = useCortoPlazoStore(state => state.changeEfectivaMontoFijo);
    const efectivaDiasEjercicio: string = useCortoPlazoStore(state => state.efectivaDiasEjercicio);
    const changeEfectivaDiasEjercicio: Function = useCortoPlazoStore(state => state.changeEfectivaDiasEjercicio);
    const tasaEfectiva: string = useCortoPlazoStore(state => state.tasaEfectiva);
    const changeTasaEfectiva: Function = useCortoPlazoStore(state => state.changeTasaEfectiva);
    const hasIVA: boolean = useCortoPlazoStore(state => state.hasIVA);
    const changeHasIVA: Function = useCortoPlazoStore(state => state.changeHasIVA);
    const tiposComisionCatalog: string[] = useCortoPlazoStore(state => state.tiposComisionCatalog);
    const periocidadDePagoCatalog: string[] = useCortoPlazoStore(state => state.periocidadDePagoCatalog);
    const diasEjercicioCatalog: string[] = useCortoPlazoStore(state => state.diasEjercicioCatalog);
    const addTasaEfectiva: Function = useCortoPlazoStore(state => state.addTasaEfectiva);
    const removeTasaEfectiva: Function = useCortoPlazoStore(state => state.removeTasaEfectiva);
    const tasaEfectivaTable: TasaEfectiva[] = useCortoPlazoStore(state => state.tasaEfectivaTable);
    const fetchTiposComision: Function = useCortoPlazoStore(state => state.fetchTiposComision);

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

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const addRows = () => {
      const TE: TasaEfectiva = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      tipoComision: tipoComision,
      fechaPrimerPago: efectivaFechaContratacion,
      periocidadPago: efectivaPeriocidadPago,
      monto: efectivaMontoFijo,
      porcentaje: efectivaPorcentajeFijo,
      hasIVA: hasIVA
      }
      addTasaEfectiva(TE);
    }

    const deleteRows = () => {
      console.log("selected: ", selected)
      selected.forEach((it) => {
        removeTasaEfectiva(it);
      })
    }

    React.useEffect(() => {
      fetchTiposComision();
      changePercentageOrAmount();
    }, [])

    return (
      <Grid container direction="column">
        <Grid item container mt={2} spacing={5}>
          <Grid item ml={window.innerWidth / 50 + 20}>
            <InputLabel sx={queries.medium_text}>
              Fecha de Contratación
            </InputLabel>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enGB}
            >
              <DatePicker
                value={new Date(efectivaFechaContratacion)}
                onChange={(date) =>
                  changeEfectivaFechaContratacion(date?.toString())
                }
                slots={{
                  textField: DateInput,
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <InputLabel sx={queries.medium_text}>Tipo de Comisión</InputLabel>
            <Autocomplete
              fullWidth
              value={tipoComision}
              onChange={(event: any, text: string | null) =>
                changeTipoComision(text)
              }
              options={tiposComisionCatalog}
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
            <InputLabel sx={queries.medium_text}>Periocidad de Pago</InputLabel>
            <Autocomplete
              fullWidth
              value={efectivaPeriocidadPago}
              onChange={(event: any, text: string | null) =>
                changeEfectivaPeriocidadPago(text)
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
            <FormControl>
              <RadioGroup
                defaultValue="fixedPercentage"
                value={radioValue}
                onChange={handleChange}
              >
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      value="fixedPercentage"
                      control={<Radio />}
                      label="Porcentaje Fijo"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="fixedAmount"
                      control={<Radio />}
                      label="Monto Fijo"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item container mt={5} spacing={5}>
          <Grid item ml={window.innerWidth / 50 + 20}>
            {radioValue === "fixedPercentage" ? (
              <InputLabel sx={queries.medium_text}>Porcentaje</InputLabel>
            ) : (
              <InputLabel sx={queries.medium_text}>Monto</InputLabel>
            )}
            <TextField
              fullWidth
              value={
                radioValue === "fixedPercentage"
                  ? efectivaPorcentajeFijo
                  : efectivaMontoFijo
              }
              onChange={(text) => {
                radioValue === "fixedPercentage"
                  ? changeEfectivaPorcentajeFijo(text.target.value)
                  : changeEfectivaMontoFijo(text.target.value);
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
                    {radioValue === "fixedPercentage" ? (
                      <></>
                    ) : (
                      <InputAdornment position="start">$</InputAdornment>
                    )}
                  </>
                ),
                endAdornment: (
                  <>
                    {radioValue === "fixedPercentage" ? (
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
            <InputLabel sx={queries.medium_text}>Días del Ejercicio</InputLabel>
            <Autocomplete
              fullWidth
              value={efectivaDiasEjercicio}
              onChange={(event: any, text: string | null) =>
                changeEfectivaDiasEjercicio(text)
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
          <Grid item>
            <InputLabel sx={queries.medium_text}>Tasa Efectiva</InputLabel>
            <TextField
              value={tasaEfectiva}
              onChange={(text) => changeTasaEfectiva(text.target.value)}
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
            <FormControlLabel
              label="Causa IVA"
              control={<Checkbox onChange={(_) => changeHasIVA(!hasIVA)} />}
            ></FormControlLabel>
          </Grid>

          <Grid item ml={window.innerWidth / 50 + 10}>
            <TableContainer sx={{ maxHeight: "400px" }}>
              <Table>
                <TableHead>
                  {heads.map((head) => (
                    <StyledTableCell>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {tasaEfectivaTable.map((row, index) => {
                    const isItemSelected = isSelected(index);
                    return (
                      <StyledTableRow>
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, index)}
                            checked={isItemSelected}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tipoComision}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {format(new Date(row.fechaPrimerPago), "dd/MM/yyyy")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.periocidadPago}
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
                          {row.hasIVA ? "SI" : "NO"}
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
    );
}
import { useEffect, useState } from "react";
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
  Autocomplete,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { queries } from "../../../queries";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
import { CondicionFinanciera } from "../../../store/condicion_financiera";

interface Head {
  label: string;
 
}

const heads: readonly Head[] = [
  {
    label: "Selección",
  },
  {
    label: "Fecha de Primer Pago",
  },
  {
    label: "Tasa Fija",
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
  const disposicionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.disposicionFechaContratacion
  );
  const changeDisposicionFechaContratacion: Function = useCortoPlazoStore(
    (state) => state.changeDisposicionFechaContratacion
  );
  const disposicionImporte: number = useCortoPlazoStore(
    (state) => state.disposicionImporte
  );
  const changeDisposicionImporte: Function = useCortoPlazoStore(
    (state) => state.changeDisposicionImporte
  );
  const capitalFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.capitalFechaPrimerPago
  );
  const changeCapitalFechaPrimerPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalFechaPrimerPago
  );
  const capitalPeriocidadPago: string = useCortoPlazoStore(
    (state) => state.capitalPeriocidadPago
  );
  const changeCapitalPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalPeriocidadPago
  );

  const periocidadDePagoMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.periocidadDePagoMap
  );
  const capitalNumeroPago: number = useCortoPlazoStore(
    (state) => state.capitalNumeroPago
  );
  const changeCapitalNumeroPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalNumeroPago
  );
  const tasaFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.tasaFechaPrimerPago
  );
  const changeTasaFechaPrimerPago: Function = useCortoPlazoStore(
    (state) => state.changeTasaFechaPrimerPago
  );

  const tasaPeriocidadPago: string = useCortoPlazoStore(
    (state) => state.tasaPeriocidadPago
  );
  const changeTasaPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.changeTasaPeriocidadPago
  );
  
  const tasaReferenciaMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.tasaReferenciaMap
  );
  //////////////////////////////////////////////////////////////////

  const [tasaReferencia, setTasaReferencia] = useCortoPlazoStore((state) => [
    state.tasaReferencia,
    state.setTasaReferencia,
  ]);

  // const tasaReferencia: string = useCortoPlazoStore(
  //   (state) => state.tasaReferencia
  // );

  const changeTasaReferencia: Function = useCortoPlazoStore(
    (state) => state.changeTasaReferencia
  );
  /////////////////////////////////////////////////////////////////////
  const sobreTasa: string = useCortoPlazoStore((state) => state.sobreTasa);
  const changeSobreTasa: Function = useCortoPlazoStore(
    (state) => state.changeSobreTasa
  );
  const tasaDiasEjercicio: string = useCortoPlazoStore(
    (state) => state.tasaDiasEjercicio
  );
  const changeTasaDiasEjercicio: Function = useCortoPlazoStore(
    (state) => state.changeTasaDiasEjercicio
  );
  const diasEjercicioMap: Map<string | null, string> = useCortoPlazoStore(
    (state) => state.diasEjercicioMap
  );
  const tasaInteresTable: TasaInteres[] = useCortoPlazoStore(
    (state) => state.tasaInteresTable
  );
  const addTasaInteres: Function = useCortoPlazoStore(
    (state) => state.addTasaInteres
  );
  const removeTasaInteres: Function = useCortoPlazoStore(
    (state) => state.removeTasaInteres
  );
  const fetchPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.fetchPeriocidadPago
  );
  const fetchTasaReferencia: Function = useCortoPlazoStore(
    (state) => state.fetchTasaReferencia
  );
  const fetchDiasEjercicio: Function = useCortoPlazoStore(
    (state) => state.fetchDiasEjercicio
  );

  const tasaFija: string = useCortoPlazoStore((state) => state.tasaFija);
  const changeTasaFija: Function = useCortoPlazoStore(
    (state) => state.changeTasaFija
  );

  const [selected, setSelected] = useState<readonly number[]>([]);

  
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  useEffect(() => {
    fetchPeriocidadPago();
    fetchTasaReferencia();
    fetchDiasEjercicio();
  }, []);

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  

  const addRows = () => {
    const TI: TasaInteres = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      fechaPrimerPago: tasaFechaPrimerPago,
      tasaFija: tasaFija,
      periocidadPago: tasaPeriocidadPago,
      tasaReferencia: tasaReferencia,
      sobreTasa: sobreTasa,
      diasEjercicio: tasaDiasEjercicio,
    };
    addTasaInteres(TI);
  };

  const deleteRows = () => {
    selected.forEach((it) => {
      removeTasaInteres(it);
    });
  };
  /////////////////////////////////////////////////////

  const [radioValue, setRadioValue] = useState("fixedPercentage");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    changeTasa();
  };

  const changeTasa = () => {
    if (radioValue !== "fixedPercentage") {
      changeHasTasaFija(true);
      changeEfectivaTasaFija(0);
      changeHasTasaVariable(false);
      // tasaReferencia = "NA",
      // sobreTasa = "NA"
      //changeSobreTasa("NA");
      //useCortoPlazoStore.setState({tasaReferencia: "NA"});
    } else {
      changeHasTasaFija(false);
      changeEfectivaTasaVariable(0);
      changeHasTasaVariable(true);

      //changeSobreTasa("NA");
    }
  };
  const changeHasTasaFija: Function = useCortoPlazoStore(
    (state) => state.changeHasTasaFija
  );
  const changeHasTasaVariable: Function = useCortoPlazoStore(
    (state) => state.changeHasTasaVariable
  );

  const changeEfectivaTasaFija: Function = useCortoPlazoStore(
    (state) => state.changeEfectivaTasaFija
  );
  const changeEfectivaTasaVariable: Function = useCortoPlazoStore(
    (state) => state.changeEfectivaTasaVariable
  );

  
  
  //////////////////////////////////////////////////////

  const reset = () => {
    //useCortoPlazoStore.setState({ tasaReferencia: "" });
    //useCortoPlazoStore.setState({ tasaFija: "" });
    //useCortoPlazoStore.setState({ sobreTasa: "" });
    useCortoPlazoStore.setState({ tasaDiasEjercicio: "" });
    useCortoPlazoStore.setState({ tasaPeriocidadPago: "" });

    // fechaPrimerPago: tasaFechaPrimerPago,
    //   tasaFija: tasaFija,
    //   periocidadPago: tasaPeriocidadPago,
    //   tasaReferencia: tasaReferencia,
    //   sobreTasa: sobreTasa,
    //   diasEjercicio: tasaDiasEjercicio,
  };

  
  useEffect(() => {
    if (radioValue === "fixedPercentage") {
      useCortoPlazoStore.setState({ tasaReferencia: "NA" });
      useCortoPlazoStore.setState({ sobreTasa: "NA" });
      useCortoPlazoStore.setState({ tasaFija: "" });
      useCortoPlazoStore.setState({ tasaDiasEjercicio: "" });
      useCortoPlazoStore.setState({ tasaPeriocidadPago: "" });
    } else {
      useCortoPlazoStore.setState({ tasaFija: "NA" });
      useCortoPlazoStore.setState({ tasaReferencia: "" });
      useCortoPlazoStore.setState({ sobreTasa: "" });
      useCortoPlazoStore.setState({ tasaDiasEjercicio: "" });
      useCortoPlazoStore.setState({ tasaPeriocidadPago: "" });
      
    }
  }, [radioValue]);

  //const reset
  //useCortoPlazoStore.setState({  tasaInteresTable: tasaInteresTable })
  ////////////////////////////////////////////////////////
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
                Fecha de disposición
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
                  /^[0-9,.]*$/.test(text.target.value)
                    ? changeDisposicionImporte(text.target.value)
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
                  changeCapitalPeriocidadPago(periocidadDePagoMap.get(text), text)
                }
                options={Array.from(periocidadDePagoMap.keys())}
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
                onChange={(text) => changeCapitalNumeroPago(text.target.value)}
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
                  defaultValue="fixedPercentage"
                  value={radioValue}
                  onChange={handleChange}
                >
                  <Grid container>
                    <Grid item>
                      <FormControlLabel
                        value="fixedPercentage"
                        control={<Radio />}
                        label="Tasa Fija"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        value="fixedAmount"
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
                {radioValue === "fixedPercentage" ? (
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
                        Tasa Fija
                      </InputLabel>

                      <TextField
                        value={tasaFija}
                        onChange={(text) => {
                          changeTasaFija(text.target.value);
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
                        value={tasaDiasEjercicio}
                        onChange={(event: any, text: string | null) =>
                          changeTasaDiasEjercicio(text)
                        }
                        options={Array.from(diasEjercicioMap.keys())}
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
                        Periocidad de Pago
                      </InputLabel>
                      <Autocomplete
                        fullWidth
                        value={tasaPeriocidadPago}
                        onChange={(event: any, text: string | null) =>
                          changeTasaPeriocidadPago(text)
                        }
                        options={Array.from(periocidadDePagoMap.keys())}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            sx={queries.medium_text}
                          />
                        )}
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
                        Periocidad de Pago
                      </InputLabel>
                      <Autocomplete
                        fullWidth
                        value={tasaPeriocidadPago}
                        onChange={(event: any, text: string | null) =>
                          changeTasaPeriocidadPago(text)
                        }
                        options={Array.from(periocidadDePagoMap.keys())}
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
                        options={Array.from(tasaReferenciaMap.keys())}
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
                        Sobre Tasa
                      </InputLabel>
                      <TextField
                        value={sobreTasa}
                        onChange={(text) => changeSobreTasa(text.target.value)}
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
                        options={Array.from(diasEjercicioMap.keys())}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            sx={queries.medium_text}
                          />
                        )}
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
              <Grid container>
                <Grid item md={6} lg={6}>
                  <ConfirmButton
                    variant="outlined"
                    onClick={() => {
                      addRows();
                      reset();
                    }}
                  >
                    AGREGAR
                  </ConfirmButton>
                </Grid>
                <Grid item md={6} lg={6}>
                  <DeleteButton
                    variant="outlined"
                    onClick={() => {
                      deleteRows();
                    }}
                  >
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

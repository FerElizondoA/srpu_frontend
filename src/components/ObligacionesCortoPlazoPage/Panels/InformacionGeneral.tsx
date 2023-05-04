import * as React from "react";
import {
  TextField,
  InputLabel,
  InputAdornment,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Grid,
  IconButton,
  Tooltip
} from "@mui/material";

import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  hashFunctionCYRB53,
} from "../../CustomComponents";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateInput } from "../../CustomComponents";
import { subDays, addDays } from "date-fns/esm";
import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/main";
import { differenceInDays, startOfDay } from "date-fns";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";
import DeleteIcon from '@mui/icons-material/Delete';

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Acción",
  },
  {
    label: "Obligado solidario / aval",
  },
  {
    label: "Tipo de ente público obligado",
  },
  {
    label: "Ente público obligado",
  },
];

export function InformacionGeneral() {

  const institucion: string = useCortoPlazoStore(state => state.institucion);
  const changeInstitucion: Function = useCortoPlazoStore(state => state.changeInstitucion);
  const institucionMap: Map<string | null, string> = useCortoPlazoStore(state => state.institucionMap);
  const fetchInstituciones: Function = useCortoPlazoStore(state => state.fetchInstituciones);
  const destino: string = useCortoPlazoStore(state => state.destino);
  const changeDestino: Function = useCortoPlazoStore(state => state.changeDestino);
  const destinoMap: Map<string | null, string> = useCortoPlazoStore(state => state.destinoMap);
  const fetchDestinos: Function = useCortoPlazoStore(state => state.fetchDestinos);
  const fechaContratacion: string = useCortoPlazoStore(state => state.fechaContratacion);
  const changeFechaContratacion: Function = useCortoPlazoStore(state => state.changeFechaContratacion);
  const plazoDias: number = useCortoPlazoStore(state => state.plazoDias);
  const changePlazoDias: Function = useCortoPlazoStore(state => state.changePlazoDias);
  const montoOriginal: number = useCortoPlazoStore(state => state.montoOriginal);
  const changeMontoOriginal: Function = useCortoPlazoStore(state => state.changeMontoOriginal);
  const fechaVencimiento: string = useCortoPlazoStore(state => state.fechaVencimiento);
  const changeFechaVencimiento: Function = useCortoPlazoStore(state => state.changeFechaVencimiento);
  const denominacion: string = useCortoPlazoStore(state => state.denominacion);
  const changeDenominacion: Function = useCortoPlazoStore(state => state.changeDenominacion);
  const obligadoSolidarioAval: string = useCortoPlazoStore(state => state.obligadoSolidarioAval);
  const changeObligadoSolidarioAval: Function = useCortoPlazoStore(state => state.changeObligadoSolidarioAval);
  const obligadoSolidarioAvalMap: Map<string | null, string> = useCortoPlazoStore(state => state.obligadoSolidarioAvalMap);
  const fetchObligadoSolidarioAval: Function = useCortoPlazoStore(state => state.fetchObligadoSolidarioAval);
  const tipoEntePublicoObligado: string = useCortoPlazoStore(state => state.tipoEntePublicoObligado);
  const changeTipoEntePublicoObligado: Function = useCortoPlazoStore(state => state.changeTipoEntePublicoObligado);
  const tipoEntePublicoObligadoMap: Map<string | null, string> = useCortoPlazoStore(state => state.tipoEntePublicoObligadoMap);
  const fetchTipoEntePublicoObligado: Function = useCortoPlazoStore(state => state.fetchTipoEntePublicoObligado);
  const entePublicoObligado: string = useCortoPlazoStore(state => state.entePublicoObligado);
  const changeEntePublicoObligado: Function = useCortoPlazoStore(state => state.changeEntePublicoObligado);
  const obligadoSolidarioAvalTable: ObligadoSolidarioAval[] = useCortoPlazoStore(state => state.obligadoSolidarioAvalTable);
  const addObligadoSolidarioAval: Function = useCortoPlazoStore(state => state.addObligadoSolidarioAval);
  const updateObligadoSolidarioAvalTable: Function = useCortoPlazoStore(state => state.updateObligadoSolidarioAvalTable);
  const organismosMap: Map<string | null, string>  = useCortoPlazoStore(state => state.organismosMap);

  const addRows = () => {
    const OSA: ObligadoSolidarioAval = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      obligadoSolidario: obligadoSolidarioAval,
      entePublicoObligado: entePublicoObligado,
      tipoEntePublicoObligado: tipoEntePublicoObligado,
    };
    addObligadoSolidarioAval(OSA);
  };

  React.useEffect(() => {
    if (
      differenceInDays(
        startOfDay(new Date(fechaVencimiento)),
        startOfDay(new Date(fechaContratacion))
      ) > 0
    ) {
      changePlazoDias(
        differenceInDays(
          startOfDay(new Date(fechaVencimiento)),
          startOfDay(new Date(fechaContratacion))
        )
      );
    } else {
      changeFechaVencimiento(addDays(new Date(fechaContratacion), 1));
      changePlazoDias(
        differenceInDays(
          startOfDay(new Date(fechaVencimiento)),
          startOfDay(new Date(fechaContratacion))
        )
      );
    }
  }, [fechaContratacion, fechaVencimiento]);

  return (
    <Grid container>
      <Grid
        item
        container
        mt={5}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={5}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Fecha de Contratación
          </InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(fechaContratacion)}
              onChange={(date) => changeFechaContratacion(date?.toString())}
              minDate={new Date(subDays(new Date(), 365))}
              maxDate={new Date()}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Plazo (Días)</InputLabel>
          <TextField
            fullWidth
            variant="standard"
            value={plazoDias || 0}
            sx={queries.medium_text}
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
            disabled
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Monto Original Contratado
          </InputLabel>
          <TextField
            fullWidth
            value={montoOriginal}
            onChange={(text) =>
              /^[0-9,.]*$/.test(text.target.value)
                ? changeMontoOriginal(text.target.value)
                : null
            }
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

      <Grid
        item
        container
        mt={2}
        ml={{ xs: 5, sm: 10, md: 7, lg: window.innerWidth / 50 }}
        spacing={5}
      >
        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Fecha de Vencimiento</InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(fechaVencimiento)}
              onChange={(date) => changeFechaVencimiento(date?.toString())}
              minDate={new Date(addDays(new Date(fechaContratacion), 1))}
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Destino</InputLabel>
          <Autocomplete
            fullWidth
            value={destino || ''}
            onChange={(event: any, text: string | null) =>
              changeDestino(destinoMap.get(text), text)
            }
            options={Array.from(destinoMap.keys())}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
          <TextField
            fullWidth
            value={denominacion || ''}
            onChange={(text) => changeDenominacion(text.target.value)}
            variant="standard"
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
          />
        </Grid>
      </Grid>

      <Grid item container mt={2} ml={window.innerWidth / 50 - 13} spacing={5}>
        <Grid item lg={8.5} ml={window.outerWidth / 150}>
          <InputLabel sx={queries.medium_text}>
            Institución Financiera
          </InputLabel>
          <Autocomplete
            fullWidth
            value={institucion || ''}
            onChange={(event: any, text: string | null) =>
              changeInstitucion(institucionMap.get(text), text)
            }
            options={Array.from(institucionMap.keys())}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        mt={{ xs: 10, sm: 2, md: 5, lg: 2 }}
        ml={38}
        spacing={5}
      >
        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Obligado Solidario / Aval
          </InputLabel>
          <Autocomplete
            fullWidth
            value={obligadoSolidarioAval || ''}
            options={Array.from(obligadoSolidarioAvalMap.keys())}
            onChange={(event: any, text: string | null) =>
              changeObligadoSolidarioAval(
                obligadoSolidarioAvalMap.get(text),
                text
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Tipo de ente público obligado
          </InputLabel>
          <Autocomplete
            disabled={
              obligadoSolidarioAval.includes("No aplica") ||
              /^[\s]*$/.test(obligadoSolidarioAval)
            }
            fullWidth
            value={tipoEntePublicoObligado || ''}
            options={Array.from(tipoEntePublicoObligadoMap.keys())}
            onChange={(event: any, text: string | null) =>
              changeTipoEntePublicoObligado(
                tipoEntePublicoObligadoMap.get(text),
                text
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Ente público obligado
          </InputLabel>
          <Autocomplete
            disabled={
              obligadoSolidarioAval.includes("No aplica") ||
              /^[\s]*$/.test(tipoEntePublicoObligado)
            }
            fullWidth
            value={entePublicoObligado || ''}
            onChange={(event: any, text: string | null) =>
              changeEntePublicoObligado(text)
            }
            options={Array.from(organismosMap.keys())}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
            isOptionEqualToValue={(option, value) => option === value}
          />
        </Grid>

        <Grid item container>
          <Grid item lg={9}>
            <TableContainer sx={{ maxHeight: "200px" }}>
              <Table stickyHeader>
                <TableHead>
                  {heads.map((head, index) => (
                    <StyledTableCell key={index}>
                      {/* <TableSortLabel> */}
                      {head.label}
                      {/* </TableSortLabel> */}
                    </StyledTableCell>
                  ))}
                </TableHead>

                <TableBody>
                  {obligadoSolidarioAval.includes("No aplica") ? (
                    <StyledTableRow>
                      <StyledTableCell />
                      <StyledTableCell />
                      <StyledTableCell>No aplica</StyledTableCell>
                      <StyledTableCell />
                    </StyledTableRow>
                  ) : (
                    obligadoSolidarioAvalTable.map((row, index) => {
                      return (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell align="left">
                            <Tooltip title="Eliminar">
                              <IconButton
                                type="button"
                                onClick={() => updateObligadoSolidarioAvalTable(obligadoSolidarioAvalTable.filter(
                                  item => item.id !== row.id
                                ))}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.obligadoSolidario}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            {row.tipoEntePublicoObligado}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            {row.entePublicoObligado}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
              <Grid item>
                <ConfirmButton
                  disabled={
                    obligadoSolidarioAval.includes("No aplica") ||
                    /^[\s]*$/.test(obligadoSolidarioAval) ||
                    /^[\s]*$/.test(tipoEntePublicoObligado)
                  }
                  variant="outlined"
                  onClick={() => addRows()}
                >
                  AGREGAR
                </ConfirmButton>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

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
  TableSortLabel,
  Checkbox,
  Grid,
} from "@mui/material";

import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
  hashFunctionCYRB53,
} from "../../CustomComponents";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateInput } from "../../CustomComponents";
import { subDays, addDays } from "date-fns/esm";
import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/main";
import { differenceInDays, startOfDay } from "date-fns";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";

interface Head {
  label: string;
}

const heads: readonly Head[] = [
  {
    label: "Selección",
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
  const institucionCatalog: string[] = useCortoPlazoStore(state => state.institucionCatalog);
  const fetchInstituciones: Function = useCortoPlazoStore(state => state.fetchInstituciones);
  const destino: string = useCortoPlazoStore(state => state.destino);
  const changeDestino: Function = useCortoPlazoStore(state => state.changeDestino);
  const destinoCatalog: string[] = useCortoPlazoStore(state => state.destinoCatalog);
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
  const obligadoSolidarioAvalCatalog: string[] = useCortoPlazoStore(state => state.obligadoSolidarioAvalCatalog);
  const fetchObligadoSolidarioAval: Function = useCortoPlazoStore(state => state.fetchObligadoSolidarioAval);
  const tipoEntePublicoObligado: string = useCortoPlazoStore(state => state.tipoEntePublicoObligado);
  const changeTipoEntePublicoObligado: Function = useCortoPlazoStore(state => state.changeTipoEntePublicoObligado);
  const tipoEntePublicoObligadoCatalog: string[] = useCortoPlazoStore(state => state.tipoEntePublicoObligadoCatalog);
  const fetchTipoEntePublicoObligado: Function = useCortoPlazoStore(state => state.fetchTipoEntePublicoObligado);
  const entePublicoObligado: string = useCortoPlazoStore(state => state.entePublicoObligado);
  const changeEntePublicoObligado: Function = useCortoPlazoStore(state => state.changeEntePublicoObligado);
  const obligadoSolidarioAvalTable: ObligadoSolidarioAval[] = useCortoPlazoStore(state => state.obligadoSolidarioAvalTable);
  const addObligadoSolidarioAval: Function = useCortoPlazoStore(state => state.addObligadoSolidarioAval);
  const removeObligadoSolidarioAval: Function = useCortoPlazoStore(state => state.removeObligadoSolidarioAval);

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
    const OSA: ObligadoSolidarioAval = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      obligadoSolidario: obligadoSolidarioAval,
      entePublicoObligado: entePublicoObligado,
      tipoEntePublicoObligado: tipoEntePublicoObligado
    }
    addObligadoSolidarioAval(OSA);
  }

  const deleteRows = () => {
    console.log("selected: ", selected)
    selected.forEach((it) => {
      removeObligadoSolidarioAval(it);
    })
  }

  React.useEffect(() => {
    fetchDestinos();
    fetchInstituciones();
    fetchObligadoSolidarioAval();
    fetchTipoEntePublicoObligado();
  }, []);

  React.useEffect(() => {
    if(differenceInDays(startOfDay(new Date(fechaVencimiento)), startOfDay(new Date(fechaContratacion))) > 0)
    {
      changePlazoDias(differenceInDays(startOfDay(new Date(fechaVencimiento)), startOfDay(new Date(fechaContratacion))));
    }else{
      changeFechaVencimiento(addDays(new Date(fechaContratacion),1));
      changePlazoDias(differenceInDays(startOfDay(new Date(fechaVencimiento)), startOfDay(new Date(fechaContratacion))));
    }
    
    
  }, [fechaContratacion, fechaVencimiento])
  
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
            value={plazoDias||0}
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
            onChange={(text) => changeMontoOriginal(text.target.value)}
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
            value={destino}
            onChange={(event: any, text: string | null) => changeDestino(text)}
            options={destinoCatalog}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
          />
        </Grid>

        <Grid item xs={3.5} md={3.5} lg={3}>
          <InputLabel sx={queries.medium_text}>Denominación</InputLabel>
          <TextField
            fullWidth
            value={denominacion}
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
            value={institucion}
            onChange={(event: any, text: string | null) =>
              changeInstitucion(text)
            }
            options={institucionCatalog}
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
            value={obligadoSolidarioAval}
            options={obligadoSolidarioAvalCatalog}
            onChange={(event: any, text: string | null) =>
              changeObligadoSolidarioAval(text)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Tipo de ente público obligado
          </InputLabel>
          <Autocomplete
            fullWidth
            value={tipoEntePublicoObligado}
            options={tipoEntePublicoObligadoCatalog}
            onChange={(event: any, text: string | null) =>
              changeTipoEntePublicoObligado(text)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                sx={queries.medium_text}
              />
            )}
          />
        </Grid>

        <Grid item xs={3} md={3} lg={3}>
          <InputLabel sx={queries.medium_text}>
            Ente público obligado
          </InputLabel>
          <TextField
            fullWidth
            value={entePublicoObligado}
            onChange={(text) => changeEntePublicoObligado(text.target.value)}
            variant="standard"
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
          />
        </Grid>

        <Grid item container>
          <Grid item lg={9}>
            <TableContainer sx={{ maxHeight: "200px" }}>
              <Table stickyHeader>
                <TableHead>
                  {heads.map((head) => (
                    <StyledTableCell>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {obligadoSolidarioAvalTable.map((row, index) => {
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
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={6} lg={4.5} mt={1}>
            <ConfirmButton variant="outlined" onClick={() => addRows()}>AGREGAR</ConfirmButton>
          </Grid>
          <Grid item md={6} lg={4.5} mt={1}>
            <DeleteButton variant="outlined" onClick={() => deleteRows()}>ELIMINAR</DeleteButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
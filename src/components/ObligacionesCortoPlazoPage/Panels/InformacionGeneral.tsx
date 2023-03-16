import * as React from "react";
import {
  Grid,
  TextField,
  InputLabel,
  InputAdornment,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableSortLabel,
  Checkbox
} from "@mui/material";

import {
  StyledTableCell,
  StyledTableRow,
  ConfirmButton,
  DeleteButton,
} from "../../CustomComponents";

import enGB from "date-fns/locale/en-GB";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateInput } from "../../CustomComponents";
import { subDays, addDays } from "date-fns/esm";
import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/main";
import { differenceInDays } from "date-fns";

type DataObligadoSalarial = {
  id: string;
  isSelected: boolean;
  obligadoSolidario: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
}

interface Head {
  id: keyof DataObligadoSalarial;
  isNumeric: boolean;
  label: string;
}

const heads: readonly Head[] = [
  {
    id: "isSelected",
    isNumeric: false,
    label: "Selección",
  },
  {
    id: "obligadoSolidario",
    isNumeric: false,
    label: "Obligado solidario / aval",
  },
  {
    id: "tipoEntePublicoObligado",
    isNumeric: false,
    label: "Tipo de ente público obligado",
  },
  {
    id: "entePublicoObligado",
    isNumeric: false,
    label: "Ente público obligado",
  },
];

function createDummyData(
  isSelected: boolean,
  id: string,
  obligadoSolidario: string,
  tipoEntePublicoObligado: string,
  entePublicoObligado: string
) {
  return {
    isSelected,
    id,
    obligadoSolidario,
    tipoEntePublicoObligado,
    entePublicoObligado,
  };
}



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


//const rows = [
//  createDummyData("1", "ley federal", "Municipio", "Monterrey"),
//  createDummyData("2", "opc1", "opc2", "opc3"),
//  createDummyData("3", "ley federal", "Municipio", "Monterrey"),
//  createDummyData("4", "opc1", "opc2", "opc3"),
//];
  const [rows, setRows] = React.useState<DataObligadoSalarial[]>([]);
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleClick = (event: React.MouseEvent<unknown>, name: string, index: number) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const addRows = () => {
    setRows([createDummyData(false,"1", "ley federal", "Municipio", "Monterrey")]);
  }

  const deleteRows = () => {
    //console.log(selected)
    //selected.forEach((it) => {
    //  console.log(rows[selected.indexOf(it)]);
    //  rows.pop();
    //})
    setRows([])
  }

  React.useEffect(() => {
    fetchDestinos();
    fetchInstituciones();
    fetchObligadoSolidarioAval();
    fetchTipoEntePublicoObligado();
    changePlazoDias(differenceInDays(new Date(fechaVencimiento), new Date(fechaContratacion)) + 1)
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
            value={plazoDias}
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
                    <StyledTableCell key={head.id}>
                      <TableSortLabel>{head.label}</TableSortLabel>
                    </StyledTableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <StyledTableRow>
                        <StyledTableCell padding="checkbox">
                          <Checkbox 
                          onClick={(event) => handleClick(event, row.id, index)}
                          checked={isItemSelected}
                          />
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.entePublicoObligado.toString()}
                        </StyledTableCell>
                        <StyledTableCell component="th">
                          {row.obligadoSolidario.toString()}
                        </StyledTableCell>
                        <StyledTableCell component="th">
                          {row.tipoEntePublicoObligado.toString()}
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
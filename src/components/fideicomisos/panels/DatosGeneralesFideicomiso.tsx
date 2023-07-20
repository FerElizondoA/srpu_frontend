/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enGB from "date-fns/locale/en-GB";
import { useEffect } from "react";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { queries } from "../../../queries";
import { Fideicomisario } from "../../../store/Fideicomiso/fideicomiso";
import { useCortoPlazoStore } from "../../../store/main";
import { ICatalogo } from "../../../screens/Config/Catalogos";

interface HeadLabels {
  label: string;
}

export function DatoGeneralesFideicomiso() {
  // DATOS GENERALES
  const numeroFideicomiso: string = useCortoPlazoStore(
    (state) => state.generalFideicomiso.numeroFideicomiso
  );
  const tipoFideicomiso: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.generalFideicomiso.tipoFideicomiso);
  const fechaFideicomiso: string = useCortoPlazoStore(
    (state) => state.generalFideicomiso.fechaFideicomiso
  );
  const fiudiciario: { Id: string; Descripcion: string } = useCortoPlazoStore(
    (state) => state.generalFideicomiso.fiudiciario
  );

  // FIDEICOMISARIO
  const fideicomisario: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.fideicomisario.fideicomisario);
  const ordenFideicomisario: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.fideicomisario.ordenFideicomisario);

  const tablaFideicomisario: Fideicomisario[] = useCortoPlazoStore(
    (state) => state.tablaFideicomisario
  );

  // TABLA FIDEICOMISARIO
  const setGeneralFideicomiso: Function = useCortoPlazoStore(
    (state) => state.setGeneralFideicomiso
  );

  const setFideicomisario: Function = useCortoPlazoStore(
    (state) => state.setFideicomisario
  );

  const addFideicomisario: Function = useCortoPlazoStore(
    (state) => state.addFideicomisario
  );

  const removeFideicomisario: Function = useCortoPlazoStore(
    (state) => state.removeFideicomisario
  );

  const cleanFideicomisario: Function = useCortoPlazoStore(
    (state) => state.cleanFideicomisario
  );

  const catalogoTiposDeFideicomiso: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoTiposDeFideicomiso
  );

  const getTiposFideicomiso: Function = useCortoPlazoStore(
    (state) => state.getTiposFideicomiso
  );

  const catalogoFiudiciarios: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoFiudiciarios
  );

  const getFiudiciarios: Function = useCortoPlazoStore(
    (state) => state.getFiudiciarios
  );

  const catalogoFideicomisarios: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoFideicomisarios
  );

  const getFideicomisarios: Function = useCortoPlazoStore(
    (state) => state.getFideicomisarios
  );

  const catalogoOrdenesFideicomisario: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoOrdenesFideicomisario
  );

  const getOrdenesFideicomisario: Function = useCortoPlazoStore(
    (state) => state.getOrdenesFideicomisario
  );

  useEffect(() => {
    getTiposFideicomiso();
    getFiudiciarios();
    getFideicomisarios();
    getOrdenesFideicomisario();
  }, []);

  const headsFideicomisario: HeadLabels[] = [
    {
      label: " ",
    },
    {
      label: "Fideicomisario",
    },
    {
      label: "Orden Fideicomisario",
    },
  ];

  return (
    <Grid container display="flex" direction={"column"} height={"85vh"}>
      <Grid
        item
        display={"grid"}
        gridTemplateColumns={"repeat(2, 1fr)"}
        justifyItems={"center"}
        height={"25%"}
      >
        <Grid item lg={5} width={"100%"}>
          <InputLabel sx={queries.medium_text}>
            Numero del fideicomiso
          </InputLabel>
          <TextField
            fullWidth
            type="number"
            value={numeroFideicomiso}
            onChange={(v) =>
              setGeneralFideicomiso({
                numeroFideicomiso: v.target.value,
                tipoFideicomiso: tipoFideicomiso,
                fechaFideicomiso: fechaFideicomiso,
                fiudiciario: fiudiciario,
              })
            }
          />
        </Grid>
        <Grid item lg={5} width={"100%"}>
          <InputLabel sx={queries.medium_text}>Tipo de fideicomiso</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFideicomiso}
            value={tipoFideicomiso}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              setGeneralFideicomiso({
                numeroFideicomiso: numeroFideicomiso,
                tipoFideicomiso: {
                  Id: text?.Id,
                  Descripcion: text?.Descripcion,
                },
                fechaFideicomiso: fechaFideicomiso,
                fiudiciario: fiudiciario,
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
        <Grid item lg={5} width={"100%"}>
          <InputLabel sx={queries.medium_text}>Fecha de Fideicomiso</InputLabel>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={enGB}
          >
            <DatePicker
              value={new Date(fechaFideicomiso)}
              onChange={(date) =>
                setGeneralFideicomiso({
                  numeroFideicomiso: numeroFideicomiso,
                  tipoFideicomiso: tipoFideicomiso,
                  fechaFideicomiso: date,
                  fiudiciario: fiudiciario,
                })
              }
              slots={{
                textField: DateInput,
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={5} width={"100%"}>
          <InputLabel sx={queries.medium_text}>Fiudiciario</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            options={catalogoFiudiciarios}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            // value={numeroFideicomiso}
            onChange={(event, text) =>
              setGeneralFideicomiso({
                numeroFideicomiso: numeroFideicomiso,
                tipoFideicomiso: tipoFideicomiso,
                fechaFideicomiso: fechaFideicomiso,
                fiudiciario: { Id: text?.Id, Descripcion: text?.Descripcion },
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

      <Divider>
        <Typography sx={{ ...queries.bold_text, color: "#af8c55 " }}>
          FIDEICOMISARIO
        </Typography>
      </Divider>

      <Grid
        item
        container
        display={"grid"}
        justifyItems={"center"}
        height={"30%"}
      >
        <Grid
          width={"100%"}
          display={"flex"}
          justifyItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Grid item lg={3}>
            <InputLabel sx={queries.medium_text}>Fideicomisario</InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoFideicomisarios}
              value={fideicomisario}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setFideicomisario({
                  fideicomisario: text,
                  ordenFideicomisario: ordenFideicomisario,
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

          <Grid item lg={3}>
            <InputLabel sx={queries.medium_text}>
              Orden fideicomisario
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoOrdenesFideicomisario}
              value={ordenFideicomisario}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setFideicomisario({
                  fideicomisario: fideicomisario,
                  ordenFideicomisario: text,
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

        <ThemeProvider theme={ButtonTheme}>
          <Button
            sx={{
              ...queries.buttonContinuarSolicitudInscripcion,
              width: "15vh",
            }}
            disabled={
              fideicomisario.Descripcion === "" ||
              ordenFideicomisario.Descripcion === ""
            }
            onClick={() => {
              addFideicomisario({
                fideicomisario: fideicomisario,
                ordenFideicomisario: ordenFideicomisario,
              });
              cleanFideicomisario();
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>
        <Paper sx={{ width: "88%" }}>
          <TableContainer
            sx={{
              maxHeight: "50vh",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: ".5vw",
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
                  {headsFideicomisario.map((head, index) => (
                    <StyledTableCell align="center" key={index}>
                      <Typography>{head.label}</Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaFideicomisario.map((row: any, index: number) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        <Tooltip title="Eliminar">
                          <IconButton
                            type="button"
                            onClick={() => removeFideicomisario(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.fideicomisario.Descripcion}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.ordenFideicomisario.Descripcion}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

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
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import es from "date-fns/locale/es";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ICatalogo } from "../../../screens/Config/Catalogos";
import { IDatosFideicomiso } from "../../../screens/fuenteDePago/Fideicomisos";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import {
  IDatosGeneralesFideicomiso,
  IFideicomisario,
} from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";

interface HeadLabels {
  label: string;
}

export function DatoGeneralesFideicomiso() {
  // DATOS GENERALES
  const datosGenerales: IDatosGeneralesFideicomiso = useFideicomisoStore(
    (state) => state.datosGenerales
  );
  const setDatosGenerales: Function = useFideicomisoStore(
    (state) => state.setDatosGenerales
  );

  // FIDEICOMISARIO
  const fideicomisario: { Id: string; Descripcion: string } =
    useFideicomisoStore((state) => state.fideicomisario.fideicomisario);

  const ordenFideicomisario: { Id: string; Descripcion: string } =
    useFideicomisoStore((state) => state.fideicomisario.ordenFideicomisario);

  const tablaFideicomisario: IFideicomisario[] = useFideicomisoStore(
    (state) => state.tablaFideicomisario
  );

  const [error, setError] = useState(false);

  const setFideicomisario: Function = useFideicomisoStore(
    (state) => state.setFideicomisario
  );

  const addFideicomisario: Function = useFideicomisoStore(
    (state) => state.addFideicomisario
  );

  const removeFideicomisario: Function = useFideicomisoStore(
    (state) => state.removeFideicomisario
  );

  const cleanFideicomisario: Function = useFideicomisoStore(
    (state) => state.cleanFideicomisario
  );

  const catalogoTiposDeFideicomiso: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFideicomiso
  );

  const catalogoInstituciones = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const catalogoOrdenesFideicomisario: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoOrdenesFideicomisario
  );

  const headsFideicomisario: HeadLabels[] = [
    {
      label: "Acciones",
    },
    {
      label: "Fideicomisario",
    },
    {
      label: "Orden Fideicomisario",
    },
  ];

  useEffect(() => {
    setDatosGenerales({
      numeroFideicomiso: datosGenerales.numeroFideicomiso,
      tipoFideicomiso: datosGenerales.tipoFideicomiso,
      fechaFideicomiso: datosGenerales.fechaFideicomiso,
      fiduciario: datosGenerales.fiduciario,
    });
  }, []);

  const tablaFideicomisos: IDatosFideicomiso[] = useFideicomisoStore(
    (state) => state.tablaFideicomisos
  );

  return (
    <Grid
      container
      flexDirection="column"
      justifyContent={"space-evenly"}
      sx={{
        height: "46rem",
        "@media (min-width: 480px)": {
          height: "60rem",
        },

        "@media (min-width: 768px)": {
          height: "60rem",
        },

        "@media (min-width: 1140px)": {
          height: "60rem",
        },

        "@media (min-width: 1400px)": {
          height: "37rem",
        },

        "@media (min-width: 1870px)": {
          height: "51rem",
        },
      }}
    >
      <Grid container display={"flex"} justifyContent={"space-evenly"}>
        <Grid item xs={10} sm={4} md={5} lg={5} xl={5} mb={{ xs: 2, sm: 0 }}>
          <InputLabel sx={queries.medium_text}>
            Número del Fideicomiso
          </InputLabel>
          <TextField
            fullWidth
            variant="standard"
            type="number"
            value={datosGenerales.numeroFideicomiso}
            onChange={(v) => {
              tablaFideicomisos.filter(
                (_) => _.NumeroFideicomiso === v.target.value
              ).length > 0
                ? setError(true)
                : setError(false);
              setDatosGenerales({
                numeroFideicomiso: /^[a-zA-Z0-9 ()$_,.-]*$/.test(v.target.value)
                  ? v.target.value
                  : datosGenerales.numeroFideicomiso,
                tipoFideicomiso: datosGenerales.tipoFideicomiso,
                fechaFideicomiso: datosGenerales.fechaFideicomiso,
                fiduciario: datosGenerales.fiduciario,
              });
            }}
            error={error}
            helperText={error && "Número de Registro ya Existente"}
          />
        </Grid>

        <Grid item xs={10} sm={4} md={5} lg={5} xl={5} mb={{ xs: 2, sm: 0 }}>
          <InputLabel sx={queries.medium_text}>Tipo de Fideicomiso</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            options={catalogoTiposDeFideicomiso}
            value={datosGenerales.tipoFideicomiso}
            getOptionLabel={(option) => option.Descripcion}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.Id}>
                  <Typography>{option.Descripcion}</Typography>
                </li>
              );
            }}
            onChange={(event, text) =>
              setDatosGenerales({
                ...datosGenerales,
                tipoFideicomiso: {
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

      <Grid container display={"flex"} justifyContent={"space-evenly"}>
        <Grid item xs={10} sm={4} md={5} lg={5} xl={5} mb={{ xs: 2, sm: 0 }}>
          <InputLabel sx={{ ...queries.medium_text }}>
            Fecha del Fideicomiso
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DesktopDatePicker
              sx={{ width: "100%" }}
              value={datosGenerales.fechaFideicomiso}
              onChange={(v) => {
                setDatosGenerales({
                  ...datosGenerales,
                  fechaFideicomiso: v,
                });
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={10} sm={4} md={5} lg={5} xl={5} mb={{ xs: 2, sm: 0 }}>
          <InputLabel sx={queries.medium_text}>Fiduciario</InputLabel>
          <Autocomplete
            disableClearable
            clearText="Borrar"
            noOptionsText="Sin opciones"
            closeText="Cerrar"
            openText="Abrir"
            fullWidth
            value={datosGenerales.fiduciario}
            options={catalogoInstituciones}
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
              setDatosGenerales({
                numeroFideicomiso: datosGenerales.numeroFideicomiso,
                tipoFideicomiso: datosGenerales.tipoFideicomiso,
                fechaFideicomiso: datosGenerales.fechaFideicomiso,
                fiduciario: {
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

      <Divider>
        <Typography
          sx={{ ...queries.bold_text, color: "#af8c55 ", marginTop: "1rem" }}
        >
          FIDEICOMISARIO
        </Typography>
      </Divider>

      <Grid item container display={"flex"} justifyContent={"center"} mt={2}>
        <Grid
          container
          width={"100%"}
          display={"flex"}
          justifyItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Grid item xs={10} sm={4} md={5} lg={5} xl={5} mb={{ xs: 2, sm: 0 }}>
            <InputLabel sx={queries.medium_text}>Fideicomisario</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoInstituciones}
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

          <Grid item xs={10} sm={4} md={5} lg={5} xl={5} mb={{ xs: 2, sm: 0 }}>
            <InputLabel sx={queries.medium_text}>
              Orden fideicomisario
            </InputLabel>
            <Autocomplete
              disableClearable
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

        <Grid mt={{ xs: 0, sm: 2 }}>
          <ThemeProvider theme={buttonTheme}>
            <Button
              sx={{
                ...queries.buttonContinuarSolicitudInscripcion,
                width: "15vh",
                marginBottom: "1rem",
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
        </Grid>

        <Grid
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          sx={{
            height: "18rem",
            "@media (min-width: 480px)": {
              height: "30",
            },

            "@media (min-width: 768px)": {
              height: "30rem",
            },

            "@media (min-width: 1140px)": {
              height: "30rem",
            },

            "@media (min-width: 1400px)": {
              height: "15rem",
            },

            "@media (min-width: 1870px)": {
              height: "22rem",
            },
          }}
        >
          <Paper sx={{ width: "90%", height: "100%" }}>
            <TableContainer
              sx={{
                height: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: ".5vw",
                  height: "1vh",
                  mt: 1,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#AF8C55",
                  outline: "1px solid slategrey",
                  borderRadius: 1,
                },
              }}
            >
              <Table stickyHeader>
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
    </Grid>
  );
}

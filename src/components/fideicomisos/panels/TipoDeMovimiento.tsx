/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { ThemeProvider } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { TipoMovimiento } from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IEntePublico } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

export interface HeadLabels {
  label: string;
}

export function TipoDeMovimiento() {
  const tipoMovimiento: TipoMovimiento = useFideicomisoStore(
    (state) => state.tipoDeMovimiento
  );

  const setTipoDeMovimiento: Function = useFideicomisoStore(
    (state) => state.setTipoDeMovimiento
  );

  const catalogoTipoEntePublicoObligado: ICatalogo[] = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );
  const catalogoTiposDeFuente: ICatalogo[] = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const getTiposDeFuente: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const catalogoFondosOIngresos: IFondoOIngreso[] = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const getFondosOIngresos: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );

  const catalogoOrganismos: IEntePublico[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const addTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.addTipoMovimiento
  );

  const cleanTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.cleanTipoMovimiento
  );

  const removeTipoMovimiento: Function = useFideicomisoStore(
    (state) => state.removeTipoMovimiento
  );

  const tablaTipoMovimiento: TipoMovimiento[] = useFideicomisoStore(
    (state) => state.tablaTipoMovimiento
  );

  useEffect(() => {
    getTipoEntePublicoObligado();
    getTiposDeFuente();
    getFondosOIngresos();
    getOrganismos();
  }, []);

  useEffect(() => {
    cleanTipoMovimiento();
  }, [addTipoMovimiento]);

  const heads: HeadLabels[] = [
    {
      label: "Acciones",
    },
    {
      label: "Tipo de movimiento",
    },
    {
      label: "Tipo de fideicomitente",
    },
    {
      label: "Municipio",
    },
    {
      label: "Tipo de fuente",
    },
    {
      label: "Fondo o ingreso",
    },
  ];

  return (
    <>
      <Grid
        container
        flexDirection="column"
        sx={{
          justifyContent: "space-evenly",
          height: "50rem",
          "@media (min-width: 480px)": {
            height: "55rem",
          },

          "@media (min-width: 768px)": {
            height: "55rem",
          },

          "@media (min-width: 1140px)": {
            height: "50rem",
          },

          "@media (min-width: 1400px)": {
            height: "40rem",
          },

          "@media (min-width: 1870px)": {
            height: "53rem",
          },
        }}
      >
        <Grid container display={"flex"} justifyContent={"space-evenly"}>
          {/* <Grid item xs={10} sm={3} md={3} lg={3} xl={3}> */}
          <InputLabel sx={queries.medium_text}>
            Alta de fideicomitente
          </InputLabel>
          {/* </Grid> */}

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de fideicomitente
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTipoEntePublicoObligado}
              value={tipoMovimiento.tipoFideicomitente}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoDeMovimiento({
                  tipo: "Alta de fideicomitente",
                  tipoFideicomitente: {
                    Id: text?.Id,
                    Descripcion: text?.Descripcion,
                  },
                  tipoFuente: tipoMovimiento.tipoFuente,
                  fondoOIngreso: tipoMovimiento.fondoOIngreso,
                  entidad: tipoMovimiento.entidad,
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Municipio</InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoOrganismos.filter(
                (_, i) => _.Tipo?.toLowerCase() === "municipio"
              )}
              value={tipoMovimiento.entidad}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoDeMovimiento({
                  tipo: "Alta de fideicomitente",
                  tipoFideicomitente: tipoMovimiento.tipoFideicomitente,
                  tipoFuente: tipoMovimiento.tipoFuente,
                  fondoOIngreso: tipoMovimiento.fondoOIngreso,
                  entidad: {
                    Id: text?.Id,
                    Descripcion: text?.Descripcion,
                  },
                })
              }
              disableClearable
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
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Tipo de fuente</InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTiposDeFuente}
              value={tipoMovimiento.tipoFuente}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoDeMovimiento({
                  tipo: "Alta de fideicomitente",
                  tipoFideicomitente: tipoMovimiento.tipoFideicomitente,
                  tipoFuente: {
                    Id: text?.Id,
                    Descripcion: text?.Descripcion,
                  },
                  fondoOIngreso: {
                    Id: "",
                    Descripcion: "",
                  },
                  entidad: tipoMovimiento.entidad,
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

          <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
            <InputLabel sx={queries.medium_text}>Fondo o ingreso</InputLabel>
            <Autocomplete
              disabled={tipoMovimiento.tipoFuente.Id === ""}
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoFondosOIngresos.filter(
                (td) => td.TipoDeFuente === tipoMovimiento.tipoFuente.Id
              )}
              value={tipoMovimiento.fondoOIngreso}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoDeMovimiento({
                  tipo: "Alta de fideicomitente",
                  tipoFideicomitente: tipoMovimiento.tipoFideicomitente,
                  tipoFuente: tipoMovimiento.tipoFuente,
                  fondoOIngreso: {
                    Id: text?.Id,
                    Descripcion: text?.Descripcion,
                  },
                  entidad: tipoMovimiento.entidad,
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

          <Grid
            item
            xs={10}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            display={"flex"}
            justifyContent={"center"}
          >
            <ThemeProvider theme={ButtonTheme}>
              <Button
                sx={{
                  ...queries.buttonContinuarSolicitudInscripcion,
                  width: "15vh",
                }}
                disabled={
                  tipoMovimiento.tipoFideicomitente.Descripcion === "" ||
                  tipoMovimiento.entidad.Descripcion === "" ||
                  tipoMovimiento.tipoFuente.Descripcion === "" ||
                  tipoMovimiento.fondoOIngreso.Descripcion === ""
                }
                onClick={() => {
                  addTipoMovimiento({
                    tipo: "Alta de fideicomitente",
                    tipoFideicomitente: tipoMovimiento.tipoFideicomitente,
                    entidad: tipoMovimiento.entidad,
                    tipoFuente: tipoMovimiento.tipoFuente,
                    fondoOIngreso: tipoMovimiento.fondoOIngreso,
                  });
                }}
              >
                Agregar
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>

        <Grid
          container
          flexDirection={"column"}
          alignItems={"center"}
          height={"60%"}
          mt={2}
          sx={{
            height: "45%",
            "@media (min-width: 480px)": {
              height: "60%",
            },

            "@media (min-width: 768px)": {
              height: "60%",
            },

            "@media (min-width: 1140px)": {
              height: "60%",
            },

            "@media (min-width: 1400px)": {
              height: "60%",
            },

            "@media (min-width: 1870px)": {
              height: "60%",
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
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {heads.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <Typography>{head.label}</Typography>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablaTipoMovimiento.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() => removeTipoMovimiento(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tipo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tipoFideicomitente.Descripcion}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.entidad.Descripcion}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.tipoFuente.Descripcion}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.fondoOIngreso.Descripcion}
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
    </>
  );
}

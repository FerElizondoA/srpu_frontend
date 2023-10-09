import {
  AppBar,
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Slide,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { queries } from "../../../queries";
import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";
import { TipoMovimientoInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import DeleteIcon from "@mui/icons-material/Delete";
import validator from "validator";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            background: "#f3f3f3",
            color: "#dadada",
          },
        },
      },
    },
  },
});

interface rowsPrueba {
  label: string;
  id: string;
}

interface HeadLabels {
  label: string;
}

export function TipoDeMovimientoIntrucciones() {
  
  const headsLabels: HeadLabels[] = [
    {
      label: "Alta deudor",
    },
    {
      label: "Tipo ente público",
    },
    {
      label: "Entidad Federativa",
    },
    {
      label: "Tipo de fuente",
    },
    {
      label: "Fondo o ingreso",
    },
    {
      label: "Acciones",
    },
  ];


  //TIPO DE MOVIMIENTO
  const tipoEntePublico: { Id: string; Descripcion: string } = useInstruccionesStore(
      (state) => state.tipoMovimientoInstrucciones.tipoEntePublico
    );

  const altaDeudor: string = useInstruccionesStore(
    (state) => state.tipoMovimientoInstrucciones.altaDeudor
  );

  const entidadFederativa: { Id: string; Descripcion: string } =
    useInstruccionesStore(
      (state) => state.tipoMovimientoInstrucciones.entidadFederativa
    );

  const tipoFuente: { Id: string; Descripcion: string } = useInstruccionesStore(
    (state) => state.tipoMovimientoInstrucciones.tipoFuente
  );

  const fondoIngreso: { Id: string; Descripcion: string } =
    useInstruccionesStore(
      (state) => state.tipoMovimientoInstrucciones.fondoIngreso
    );

  //TABLA

  const tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[] =
    useInstruccionesStore((state) => state.tablaTipoMovimientoInstrucciones);

  //CATALOGOS
  const catalogoTiposDeFuente: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );


  const catalogoOrganismos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const getOrganismosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const getInstitucionesInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );

  const getTipoEntePublicoObligadoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const getFondosOIngresosInstrucciones: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );

  //FUNCTION

  const addTipoMovimientoInstrucciones: Function = useInstruccionesStore(
    (state) => state.addTipoMovimientoInstrucciones
  );

  const removeTipoMovimientoInstrucciones: Function = useInstruccionesStore(
    (state) => state.removeTipoMovimientoInstrucciones
  );

  const setTipoMovimientoInstrucciones: Function = useInstruccionesStore(
    (state) => state.setTipoMovimientoInstrucciones
  );

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

  return (
    <Grid>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        sx={{
          height: "20rem",
          "@media (min-width: 480px)": {
            height: "55rem",
          },

          "@media (min-width: 768px)": {
            height: "65rem",
          },

          "@media (min-width: 1140px)": {
            height: "50rem",
          },

          "@media (min-width: 1400px)": {
            height: "15rem",
          },

          "@media (min-width: 1870px)": {
            height: "24rem",
          },
        }}
      >
        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={3} display={"flex"} justifyContent={"center"}>
            <FormControlLabel
              label="Alta deudor"
              control={
                <Checkbox
                  checked={altaDeudor === "SI"}
                  onChange={(v) => {
                    setTipoMovimientoInstrucciones({
                      altaDeudor: v.target.checked ? "SI" : "NO",
                      tipoEntePublico: tipoEntePublico,
                      entidadFederativa: entidadFederativa,
                      tipoFuente: tipoFuente,
                      fondoIngreso: fondoIngreso,
                    });
                  }}
                />
              }
            ></FormControlLabel>
          </Grid>

          <Grid item xs={10} sm={3}>
            <InputLabel sx={queries.medium_text}>
              Tipo de ente público obligado
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              // disabled={
              //   tipoEntePublico.Descripcion === "No aplica" ||
              //   /^[\s]*$/.test(tipoEntePublico.Descripcion)
              // }
              fullWidth
              options={catalogoTipoEntePublicoObligado}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Descripcion}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={{
                Id: tipoEntePublico.Id || "",
                Descripcion: tipoEntePublico.Descripcion || "",
              }}
              onChange={(event, text) =>
                setTipoMovimientoInstrucciones({
                  altaDeudor: altaDeudor,
                  tipoEntePublico: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  entidadFederativa: entidadFederativa,
                  tipoFuente: tipoFuente,
                  fondoIngreso: fondoIngreso,
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

          <Grid item xs={10} sm={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Entidad Federativa
            </InputLabel>
            <Autocomplete
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              options={catalogoOrganismos}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={{
                Id: entidadFederativa.Id || "",
                Descripcion: entidadFederativa.Descripcion || "",
              }}
              onChange={(event, text) => {
                setTipoMovimientoInstrucciones({
                  altaDeudor: altaDeudor,
                  tipoEntePublico: tipoEntePublico,
                  entidadFederativa: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  tipoFuente: tipoFuente,
                  fondoIngreso: fondoIngreso,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  sx={queries.medium_text}
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.Id === value.Id || value.Descripcion === ""
              }
            />
          </Grid>
        </Grid>

        <Grid
          container
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Grid item xs={10} sm={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Tipo de fuente
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTiposDeFuente}
              value={{
                Id: tipoFuente.Id || "",
                Descripcion: tipoFuente.Descripcion || "",
              }}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoMovimientoInstrucciones({
                  altaDeudor: altaDeudor,
                  tipoEntePublico: tipoEntePublico,
                  entidadFederativa: entidadFederativa,
                  tipoFuente: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },
                  fondoIngreso: fondoIngreso,
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

          <Grid item xs={10} sm={3}>
            <InputLabel sx={{ ...queries.medium_text }}>
              Fondo o ingreso
            </InputLabel>
            <Autocomplete
              disableClearable
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoFondosOIngresos}
              value={{
                Id: fondoIngreso.Id || "",
                Descripcion: fondoIngreso.Descripcion || "",
              }}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) =>
                setTipoMovimientoInstrucciones({
                  altaDeudor: altaDeudor,
                  tipoEntePublico: tipoEntePublico,
                  entidadFederativa: entidadFederativa,
                  tipoFuente: tipoFuente,
                  fondoIngreso: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
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

          <Grid
            mt={2}
            sm={3}
            width={"20%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ThemeProvider theme={ButtonTheme}>
              <Button
                sx={{ ...queries.buttonContinuar, width: "15vh" }}
                disabled={
                  tipoEntePublico.Descripcion === "" ||
                  entidadFederativa.Descripcion === "" ||
                  tipoFuente.Descripcion === "" ||
                  fondoIngreso.Descripcion === ""
                }
                onClick={() => {
                  addTipoMovimientoInstrucciones({
                    altaDeudor: altaDeudor,
                    tipoEntePublico: tipoEntePublico.Descripcion,
                    entidadFederativa: entidadFederativa.Descripcion,
                    tipoFuente: tipoFuente.Descripcion,
                    fondoIngreso: fondoIngreso.Descripcion,
                  });
                }}
              >
                Agregar
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Grid>

      <Grid mt={5} mb={2} display={"flex"} justifyContent={"center"}>
        <Paper sx={{ width: "90%", height: "40vh" }}>
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
                  {headsLabels.map((head, index) => (
                    <StyledTableCell align="center">
                      <Typography>{head.label}</Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {tablaTipoMovimientoInstrucciones.map(
                  (row: any, index: number) => {
                    return (
                      <StyledTableRow>
                        <StyledTableCell align="center">
                          {row.altaDeudor}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.tipoEntePublico}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.entidadFederativa}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.tipoFuente}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row.fondoIngreso}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              type="button"
                              onClick={() =>
                                removeTipoMovimientoInstrucciones(index)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

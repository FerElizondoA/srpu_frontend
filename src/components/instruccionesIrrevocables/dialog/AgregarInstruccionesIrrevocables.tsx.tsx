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
  id: string
}


interface HeadLabels {
  label: string;

}

export function AgregarInstruccionesIrrevocables({
  handler,
  openState,
  accion,
}: {
  handler: Function;
  openState: boolean;
  accion: string;
}) {

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


  const rowsPrueba: rowsPrueba[] = [
    {
      label: "Prueba 1",
      id: "0"
    },
    {
      label: "Prueba 2",
      id: "1"
    },
    {
      label: "Prueba 3",
      id: "2"
    },
    {
      label: "Prueba 4",
      id: "3"
    },
    {
      label: "Prueba 5",
      id: "4"
    },
    {
      label: "Prueba 6",
      id: "5"
    },
  ];
  const [tabIndex, setTabIndex] = useState(0);




  //DATOS GENERALES
  const numeroCuenta: string = useCortoPlazoStore(
    (state) => state.generalInstrucciones.numeroCuenta
  );

  const cuentaCLABE: string = useCortoPlazoStore(
    (state) => state.generalInstrucciones.cuentaCLABE
  );

  const banco: { Id: string, Descripcion: string } = useCortoPlazoStore(
    (state) => state.generalInstrucciones.banco
  );

  //TIPO DE MOVIMIENTO
  const tipoEntePublico: { Id: string, Descripcion: string } = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.tipoEntePublico
  );

  const altaDeudor: string = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.altaDeudor
  );

  const entidadFederativa: { Id: string, Descripcion: string } = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.entidadFederativa
  );

  const tipoFuente: { Id: string, Descripcion: string } = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.tipoFuente
  );

  const fondoIngreso: { Id: string, Descripcion: string } = useCortoPlazoStore(
    (state) => state.tipoMovimientoInstrucciones.fondoIngreso
  );

  //TABLA

  const tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[] = useCortoPlazoStore(
    (state) => state.tablaTipoMovimientoInstrucciones
  );


  //CATALOGOS
  const catalogoTiposDeFuente: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoFondosOIngresos
  );

  const catalogoTipoEntePublicoObligado: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoTipoEntePublicoObligado
  );

  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  const catalogoMunicipiosUOrganismos: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoMunicipiosUOrganismos
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTiposDeFuenteInstrucciones
  );

  const getMunicipiosUOrganismosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getMunicipiosUOrganismosInstrucciones
  );

  const getInstitucionesInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getInstitucionesInstrucciones
  );


  const getTipoEntePublicoObligadoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligadoInstrucciones
  );

  const getFondosOIngresosInstrucciones: Function = useCortoPlazoStore(
    (state) => state.getFondosOIngresosInstrucciones
  );

  //FUNCTION
  const setGeneralInstruccion: Function = useCortoPlazoStore(
    (state) => state.setGeneralInstruccion
  );

  const addTipoMovimientoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.addTipoMovimientoInstrucciones
  );

  const removeTipoMovimientoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.removeTipoMovimientoInstrucciones
  );

  const cleanTipoMovimientoInstruccion: Function = useCortoPlazoStore(
    (state) => state.cleanTipoMovimientoInstruccion
  );

  const editarInstruccion: Function = useCortoPlazoStore(
    (state) => state.editarInstruccion
  );

  const changeIdInstruccion: Function = useCortoPlazoStore(
    (state) => state.changeIdInstruccion
  );

  const setTipoMovimientoInstrucciones: Function = useCortoPlazoStore(
    (state) => state.setTipoMovimientoInstrucciones
  )


  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getMunicipiosUOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, [])



  return (
    <>
      <Dialog fullScreen open={openState} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  //limpiaFideicomiso();
                  handler(false);
                  //reset();
                }}
                sx={{ color: "white" }}
              >
                <GridCloseIcon />
              </IconButton>
            </Tooltip>

            <Grid container>
              <Grid item>
                <Typography sx={queries.bold_text}>
                  {accion} Instrucción Irrevocable
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <ThemeProvider theme={theme}>
                <Button
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (accion === "Agregar") {
                      //createFideicomiso();
                      handler(false);
                      // reset();
                    } else if (accion === "Editar") {
                      // updateRow(indexA);
                      // modificarFideicomiso();
                      handler(false);
                      // reset();
                    }
                    setTabIndex(0);
                  }}
                >
                  <Typography
                    sx={{ ...queries.medium_text, fontSize: ".8rem" }}
                  >
                    {accion} Instrucción
                  </Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid container flexDirection={"column"} justifyContent={"space-evenly"} height={"36rem"}>

          <Grid display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

            <Grid width={"25%"}>
              <InputLabel sx={{ ...queries.medium_text }}>
                Numero de cuenta
              </InputLabel>
              <TextField
                fullWidth
                variant="standard"
                value={numeroCuenta}
                onChange={(v) => {
                  if (validator.isNumeric(v.target.value) || v.target.value === "") {
                    setGeneralInstruccion({
                      numeroCuenta: v.target.value,
                      cuentaCLABE: cuentaCLABE,
                      banco: banco
                    })
                  }
                }}
              />
            </Grid>


            <Grid width={"25%"}>
              <InputLabel sx={{ ...queries.medium_text }}>
                Cuenta CLABE
              </InputLabel>
              <TextField
                fullWidth
                variant="standard"
                value={cuentaCLABE}
                onChange={(v) => {
                  if (validator.isNumeric(v.target.value) || v.target.value === "") {
                    setGeneralInstruccion({
                      numeroCuenta: numeroCuenta,
                      cuentaCLABE: v.target.value,
                      banco: banco
                    })
                  }
                }}
              />
            </Grid>


            <Grid width={"25%"}>
              <InputLabel sx={{ ...queries.medium_text }}>
                Banco
              </InputLabel>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={catalogoInstituciones}
                getOptionLabel={(option) => option.Descripcion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{option.Descripcion}</Typography>
                    </li>
                  );
                }}
                value={{
                  Id: banco.Id || "",
                  Descripcion: banco.Descripcion || "",
                }}
                onChange={(event, text) =>
                  setGeneralInstruccion({
                    numeroCuenta: numeroCuenta,
                    cuentaCLABE: cuentaCLABE,
                    banco: {
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
                  option.Id === value.Id || value.Descripcion === ""
                }
              />
            </Grid>
          </Grid>

          <Divider >
            <Typography sx={{
              textTransform: "uppercase",
              color: "#af8c55 ",
              fontSize: "2ch",
              fontFamily: "MontserratBold",
              "@media (max-width: 600px)": {
                // XS (extra small) screen
                fontSize: "0.7rem",
              },
              "@media (min-width: 601px) and (max-width: 900px)": {
                // SM (small) screen
                fontSize: "1.5ch",
              },
            }}>
              Tipo de Movimiento
            </Typography>
          </Divider>

          <Grid display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

            <Grid item width={"25%"}
              display={"flex"}
              justifyContent={"center"}
            >
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

            <Grid width={"25%"}>
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

            <Grid width={"25%"}>
              <InputLabel sx={{ ...queries.medium_text }}>
                Entidad Federativa
              </InputLabel>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={catalogoMunicipiosUOrganismos}

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
                  })
                }
                }
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


        </Grid>

        <Grid display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} >

          <Grid width={"25%"}>
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


          <Grid width={"25%"}>
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


          <Grid width={"25%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>

            <ThemeProvider theme={ButtonTheme}>
              <Button sx={{ ...queries.buttonContinuar, width: "15vh" }}
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
                  })
                }}
              >
                Agregar
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>

        <Grid mt={2} height={"20rem"} display={"flex"} justifyContent={"center"}
          sx={{
            "@media (min-width: 480px)": {
              width: "100%"
            },

            "@media (min-width: 768px)": {
              width: "100%"
            },

            "@media (min-width: 1140px)": {
              width: "100%"
            },

            "@media (min-width: 1400px)": {
              width: "100%"
            },

            "@media (min-width: 1870px)": {
              width: "100%"
            },
          }}
        >
          <Paper sx={{ width: "90%", height: "100%" }}>
            <TableContainer sx={{ width: "100%", height: "100%" }} >
              <Table stickyHeader>
                <TableHead>

                  <TableRow>
                    {headsLabels.map((head, index) => (
                      <StyledTableCell align="center">
                        <Typography>
                          {head.label}
                        </Typography>
                      </StyledTableCell>
                    ))}

                  </TableRow>
                </TableHead>

                <TableBody>
                  {tablaTipoMovimientoInstrucciones.map((row: any, index: number) => {

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
                              onClick={() => removeTipoMovimientoInstrucciones(index)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Dialog>
    </>
  );
}

import DeleteIcon from "@mui/icons-material/Delete";
import {
  AppBar,
  Autocomplete,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Slide,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { GridCloseIcon } from "@mui/x-data-grid";
import { forwardRef, useEffect, useState } from "react";
import validator from "validator";
import { queries } from "../../../queries";
import { modulos } from "../../../screens/Config/Configuracion";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { TipoMovimientoInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import {
  DialogCatalogos,
  IDialog,
} from "../../Config/dialogCatalogos/DialogCatalogos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IEntePublico } from "../../Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";

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

  //DATOS GENERALES
  const numeroCuenta: string = useInstruccionesStore(
    (state) => state.generalInstrucciones.numeroCuenta
  );

  const cuentaCLABE: string = useInstruccionesStore(
    (state) => state.generalInstrucciones.cuentaCLABE
  );

  const banco: { Id: string; Descripcion: string } = useInstruccionesStore(
    (state) => state.generalInstrucciones.banco
  );

  //TIPO DE MOVIMIENTO
  const tipoEntePublico: { Id: string; Descripcion: string } =
    useInstruccionesStore(
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

  const catalogoInstituciones: Array<ICatalogo> = useCortoPlazoStore(
    (state) => state.catalogoInstituciones
  );

  //GET
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );

  const getMunicipiosUOrganismosInstrucciones: Function = useCortoPlazoStore(
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
  const setGeneralInstruccion: Function = useInstruccionesStore(
    (state) => state.setGeneralInstruccion
  );

  const addTipoMovimientoInstrucciones: Function = useInstruccionesStore(
    (state) => state.addTipoMovimientoInstrucciones
  );

  const removeTipoMovimientoInstrucciones: Function = useInstruccionesStore(
    (state) => state.removeTipoMovimientoInstrucciones
  );

  const cleanTipoMovimientoInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanTipoMovimientoInstruccion
  );

  const editarInstruccion: Function = useInstruccionesStore(
    (state) => state.editarInstruccion
  );

  const changeIdInstruccion: Function = useInstruccionesStore(
    (state) => state.changeIdInstruccion
  );

  const setTipoMovimientoInstrucciones: Function = useInstruccionesStore(
    (state) => state.setTipoMovimientoInstrucciones
  );

  const catalogoOrganismos: IEntePublico[] = useCortoPlazoStore(
    (state) => state.catalogoOrganismos
  );

  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );

  const createInstruccion: Function = useInstruccionesStore(
    (state) => state.createInstruccion
  );

  const [edit, setEdit] = useState<IDialog>({
    Crud: "crea",
    Id: 6,
    IdDesc: "",
    Descripcion: "",
    Tipo: { Id: "", Descripcion: "" },
    OCP: 0,
    OLP: 0,
    Modulo: "institucionesFinancieras",
    TipoEntePublico: "",
  });

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getMunicipiosUOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
    getOrganismos();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getInstitucionesInstrucciones();
  }, [openDialog]);

  const modificaInstruccion: Function = useInstruccionesStore(
    (state) => state.modificaInstruccion
  );

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
                      createInstruccion();
                      handler(false);
                    } else if (accion === "Editar") {
                      modificaInstruccion();
                      handler(false);
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "1.3ch",
                      fontFamily: "MontserratMedium",
                      "@media (min-width: 480px)": {
                        fontSize: "1.5ch",
                      },
                    }}
                  >
                    {accion} Instrucción
                  </Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid
          container
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          sx={{
            height: "70rem",
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
              height: "40rem",
            },

            "@media (min-width: 1870px)": {
              height: "53rem",
            },
          }}
        >
          <Divider
            sx={{
              height: "1rem",
            }}
          >
            <Typography
              sx={{
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
              }}
            >
              Cuenta destino
            </Typography>
          </Divider>
          <Grid
            container
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <Grid item xs={10} sm={3}>
              <InputLabel sx={{ ...queries.medium_text }}>
                Numero de cuenta
              </InputLabel>
              <TextField
                fullWidth
                variant="standard"
                value={numeroCuenta}
                onChange={(v) => {
                  if (
                    validator.isNumeric(v.target.value) ||
                    v.target.value === ""
                  ) {
                    setGeneralInstruccion({
                      numeroCuenta: v.target.value,
                      cuentaCLABE: cuentaCLABE,
                      banco: banco,
                    });
                  }
                }}
              />
            </Grid>

            <Grid item xs={10} sm={3}>
              <InputLabel sx={{ ...queries.medium_text }}>
                Cuenta CLABE
              </InputLabel>
              <TextField
                fullWidth
                variant="standard"
                value={cuentaCLABE}
                onChange={(v) => {
                  if (
                    validator.isNumeric(v.target.value) ||
                    v.target.value === ""
                  ) {
                    setGeneralInstruccion({
                      numeroCuenta: numeroCuenta,
                      cuentaCLABE: v.target.value,
                      banco: banco,
                    });
                  }
                }}
              />
            </Grid>

            <Grid item xs={10} sm={3}>
              <InputLabel sx={{ ...queries.medium_text }}>Banco</InputLabel>
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
            <Button
              sx={queries.buttonContinuar}
              onClick={() => {
                setEdit((edit) => ({
                  ...edit,
                  ...{ Crud: "crea" },
                  ...{ Descripcion: "" },
                }));
                setOpenDialog(true);
              }}
            >
              Otro
            </Button>
          </Grid>

          <Divider
            sx={{
              height: "1rem",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                color: "#af8c55 ",
                fontSize: "2ch",
                fontFamily: "MontserratBold",
                "@media (max-width: 600px)": {
                  fontSize: "0.7rem",
                },
                "@media (min-width: 601px) and (max-width: 900px)": {
                  fontSize: "1.5ch",
                },
              }}
            >
              Tipo de Movimiento
            </Typography>
          </Divider>

          <Grid
            container
            display={"flex"}
            justifyContent={"space-evenly"}
            width={"100%"}
            alignItems={"center"}
          >
            <InputLabel>Alta de deudor</InputLabel>

            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>
                Tipo de ente público obligado
              </InputLabel>
              <Autocomplete
                disableClearable
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                options={catalogoTipoEntePublicoObligado}
                value={tipoEntePublico}
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

            <Grid item xs={10} sm={3} md={3} lg={3} xl={3}>
              <InputLabel sx={queries.medium_text}>Entidad</InputLabel>
              <Autocomplete
                disabled={tipoEntePublico.Id === ""}
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                options={catalogoOrganismos.filter(
                  (_, i) => _.IdTipoEntePublico === tipoEntePublico.Id
                )}
                value={entidadFederativa}
                getOptionLabel={(option) => option.Descripcion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{option.Descripcion}</Typography>
                    </li>
                  );
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
              item
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
                      <StyledTableCell align="center" key={index}>
                        <Typography>{head.label}</Typography>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tablaTipoMovimientoInstrucciones.map(
                    (row: any, index: number) => {
                      return (
                        <StyledTableRow key={index}>
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
        <DialogCatalogos
          modulos={modulos}
          edit={edit}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      </Dialog>
    </>
  );
}

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
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
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { TipoMovimientoInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ICatalogo, IFondoOIngreso } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
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

interface rowsPrueba {
  label: string;
  id: string;
}

interface HeadLabels {
  label: string;
}

export function TipoDeMovimientoIntrucciones() {
  // const headsLabels: HeadLabels[] = [
  //   {
  //     label: "Id",
  //   },
  //   {
  //     label: "Tipo de mandante",
  //   },
  //   {
  //     label: "Mandatario",
  //   },
  //   {
  //     label: "Fuente de pago",
  //   },
  //   {
  //     label: "% del ingreso o fondo correspondiente al mandatario",
  //   },
  //   {
  //     label:
  //       "% de asignación del fondo o ingreso correspondiente al mandatario",
  //   },
  //   {
  //     label:
  //       "% afectado al mandato del ingreso o fondo correspondiente al mandatario",
  //   },
  //   {
  //     label:
  //       "% acumulado de afectación del mandatario a los mecanismos de pago/100",
  //   },
  //   {
  //     label: "",
  //   },
  // ];
  const headsLabels: HeadLabels[] = [
    {
      label: "Id",
    },
    {
      label: "Tipo de ente público obligado",
    },
    {
      label: "Entidad Federativa",
    },
    {
      label: "Fuente de pago",
    },
    {
      label: "% del ingreso o fondo correspondiente al gobierno del estado",
    },
    {
      label: "% del ingreso o fondo correspondiente a los municipios",
    },
    {
      label: "% del ingreso correspondiente al organismo",
    },
    {
      label: "% de asignación del fondo o ingreso correspondiente al municipio",
    },
    {
      label:
        "% afectado al mandato del ingreso o fondo correspondiente al gobierno del estado",
    },
    {
      label: "% de afectacion del gobierno del estado /100 del fondo o ingreso",
    },
    {
      label:
        "% acumulado de afectacion del gobierno del estado a los mecanismos de pago /100",
    },
    {
      label:
        "% afectado al mandato del ingreso o fondo correspondiente al municipio",
    },
    {
      label:
        "% acumulado de afectación del municipio a los mecanismos de pago /% asignado al municipio",
    },
    {
      label: "% afectado al mandato del ingreso correspondiente al organismo",
    },
    {
      label:
        "% acumulado de afectación del organismo a los mecanismos de pago /100 del ingreso",
    },
    {
      label: "Eliminar",
    },
  ];

  //TIPO DE MOVIMIENTO
  // const tipoEntePublico: { Id: string; Descripcion: string } =
  //   useInstruccionesStore(
  //     (state) => state.tipoMovimientoInstruccion.tipoEntePublicoObligado
  //   );

  // const altaDeudor: string = useInstruccionesStore(
  //   (state) => state.tipoMovimientoInstruccion.altaDeudor
  // );

  const tipoMovimientoInstruccion: TipoMovimientoInstrucciones =
    useInstruccionesStore(
      (state) => state.tipoMovimientoInstruccion
    );

  // const tipoFuente: { Id: string; Descripcion: string } = useInstruccionesStore(
  //   (state) => state.tipoMovimientoInstruccion.tipoFuente
  // );

  // const fondoIngreso: { Id: string; Descripcion: string } =
  //   useInstruccionesStore(
  //     (state) => state.tipoMovimientoInstruccion.fondoIngreso
  //   );

  //TABLA

  const tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[] =
    useInstruccionesStore((state) => state.tablaTipoMovimientoInstrucciones);

  //CATALOGOS
  const catalogoTiposDeFuente: Array<ICatalogo> = useFideicomisoStore(
    (state) => state.catalogoTiposDeFuente
  );

  const catalogoFondosOIngresos: Array<IFondoOIngreso> = useFideicomisoStore(
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


  const addPorcentaje: Function = useInstruccionesStore(
    (state) => state.addPorcentaje
  );


  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

  useEffect(() => {
    console.log(tablaTipoMovimientoInstrucciones)
    console.log(JSON.stringify(tablaTipoMovimientoInstrucciones))

  }, [tipoMovimientoInstruccion.fondoIngresoMunicipios]);

  useEffect(() => {
    console.log("float",parseFloat(tipoMovimientoInstruccion.fondoIngresoMunicipios))
    
  }, [tablaTipoMovimientoInstrucciones]);


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
            height: "9rem",
          },

          "@media (min-width: 1870px)": {
            height: "22rem",
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
                  checked={tipoMovimientoInstruccion.altaDeudor === "SI"}
                  onChange={(v) => {
                    setTipoMovimientoInstrucciones({
                      ...tipoMovimientoInstruccion,
                      altaDeudor: v.target.checked ? "SI" : "NO",
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
                Id: tipoMovimientoInstruccion.tipoEntePublicoObligado.Id || "",
                Descripcion: tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion || "",
              }}
              onChange={(event, text) =>
                setTipoMovimientoInstrucciones({
                  ...tipoMovimientoInstruccion,
                  tipoEntePublicoObligado: {
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
                Id: tipoMovimientoInstruccion.entidadFederativa.Id || "",
                Descripcion: tipoMovimientoInstruccion.entidadFederativa.Descripcion || "",
              }}
              onChange={(event, text) => {
                setTipoMovimientoInstrucciones({
                  ...tipoMovimientoInstruccion,
                  entidadFederativa: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  },

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
                Id: tipoMovimientoInstruccion.tipoFuente.Id || "",
                Descripcion: tipoMovimientoInstruccion.tipoFuente.Descripcion || "",
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
                  ...tipoMovimientoInstruccion,
                  tipoFuente: {
                    Id: text?.Id || "",
                    Descripcion: text?.Descripcion || "",
                  }
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
              disabled={tipoMovimientoInstruccion.tipoFuente?.Id === ""}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoFondosOIngresos.filter(
                (td) => td.TipoDeFuente === tipoMovimientoInstruccion.tipoFuente?.Id
              )}
              value={tipoMovimientoInstruccion.fondoIngreso}
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
                  ...tipoMovimientoInstruccion,
                  id: `${
                    tipoMovimientoInstruccion.tipoFuente?.Descripcion
                  }/${text.Descripcion.split(" ")
                    .map((word) =>
                      word.charAt(0) === word.charAt(0).toUpperCase()
                        ? word.charAt(0)
                        : ""
                    )
                    .join("")}/${tablaTipoMovimientoInstrucciones?.length + 1}`,
                  fondoIngreso: {
                    Id: text.Id,
                    Descripcion: text.Descripcion,
                    TipoDeFuente: text.TipoDeFuente,
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
                  tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion === "" ||
                  tipoMovimientoInstruccion.entidadFederativa.Descripcion === "" ||
                  tipoMovimientoInstruccion.tipoFuente.Descripcion === "" ||
                  tipoMovimientoInstruccion.fondoIngreso.Descripcion === ""
                }
                onClick={() => {
                  addTipoMovimientoInstrucciones({
                    id: tipoMovimientoInstruccion.id,
                    tipoEntePublicoObligado:tipoMovimientoInstruccion.tipoEntePublicoObligado,
                    altaDeudor: tipoMovimientoInstruccion.altaDeudor,
                    entidadFederativa: tipoMovimientoInstruccion.entidadFederativa,
                    mandatario: tipoMovimientoInstruccion.mandatario,
                    tipoFuente: tipoMovimientoInstruccion.tipoFuente,
                    fondoIngreso: tipoMovimientoInstruccion.fondoIngreso,
                    fondoIngresoGobiernoEstatal:

                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "gobierno estatal"
                        ? tipoMovimientoInstruccion.tipoFuente.Descripcion.toLowerCase() ===
                          "participaciones"
                          ? "80.00"
                          : "100.00"
                        : "",
                    fondoIngresoMunicipios:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "municipios"
                        ? tipoMovimientoInstruccion.tipoFuente.Descripcion.toLowerCase() ===
                          "participaciones"
                          ? "20.00"
                          : "0.00"
                        : "20.00", //REVISAR PORQUE SE PASA PARA ACA LA CONDICION
                    fondoIngresoAsignadoMunicipio:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "municipios"
                        ? "5.00"
                        : "",
                    ingresoOrganismo:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "municipios" ||
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "gobierno estatal"
                        ? "0.00"
                        : "",
                    fondoIngresoAfectadoXGobiernoEstatal:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "gobierno estatal"
                        ? ""
                        : "",
                    afectacionGobiernoEstatalEntre100:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "gobierno estatal"
                        ? "0.00"
                        : "",
                    acumuladoAfectacionGobiernoEstatalEntre100:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "gobierno estatal"
                        ? "80.00"
                        : "",
                    fondoIngresoAfectadoXMunicipio:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "municipios"
                        ? ""
                        : "",
                    acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                      "municipios"
                        ? "0.00"
                        : "",
                    ingresoAfectadoXOrganismo:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "municipios" ||
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "gobierno estatal"
                        ? ""
                        : "",
                    acumuladoAfectacionOrganismoEntre100:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "municipios" ||
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "gobierno estatal"
                        ? "0.00"
                        : "",
                  });
                  console.log(tablaTipoMovimientoInstrucciones)
                  console.log(JSON.stringify(tablaTipoMovimientoInstrucciones))
                }}        
              >
                Agregar
              </Button>
            </ThemeProvider>
          </Grid>

          {/* <Grid
   
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ThemeProvider theme={ButtonTheme}>
              <Button
                sx={{ ...queries.buttonContinuar }}
 
                onClick={() => {
                  console.log(tipoMovimientoInstruccion.fondoIngresoMunicipios)
                }}        
              >
                PRUEBA
              </Button>
            </ThemeProvider>
          </Grid> */}

        </Grid>
      </Grid>

      <Grid mt={5} mb={2} display={"flex"} justifyContent={"center"}>
        <Paper sx={{ width: "100%", height: "25rem" }}>
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
                    <StyledTableCell align="center" >
                      <Typography sx={{ fontSize: "0.7rem", width:"110px" }}>{head.label}</Typography>
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
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.id}
                          </Typography>
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row.altaDeudor}
                          </Typography>
                        </StyledTableCell> */}

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.tipoEntePublicoObligado.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.entidadFederativa.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                          {row?.tipoFuente.Descripcion}
                          </Typography>
                        </StyledTableCell>

                        {/* <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngreso}
                          </Typography>
                        </StyledTableCell> */}

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoGobiernoEstatal}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoMunicipios}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.fondoIngresoAsignadoMunicipio}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.ingresoOrganismo}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "gobierno estatal" && (
                            <TextField
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              label="Asigne porcentaje"
                              size="small"
                              value={row?.fondoIngresoAfectadoXGobiernoEstatal}
                              onChange={(v) => {
                                
                                setTipoMovimientoInstrucciones({
                                   ...tipoMovimientoInstruccion,
                                   fondoIngresoAfectadoXGobiernoEstatal: v.target.value
                                 })


                                if (Number(v.target.value) <= parseFloat(row.fondoIngresoMunicipios)) {
                                  addPorcentaje(index, row, {
                                    columna:
                                      "fondoIngresoAfectadoXGobiernoEstatal",
                                    porcentaje: v.target.value,
                                  });
                                }

                                
                              }}
                            />
                          )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.afectacionGobiernoEstatalEntre100}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "municipios" && (
                            <TextField
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXMunicipio}
                              onChange={(v) => {
                                if (Number(v.target.value) <= 100.0) {
                                  addPorcentaje(index, row, {
                                    columna: "fondoIngresoAfectadoXMunicipio",
                                    porcentaje: v.target.value,
                                  });
                                }
                              }}
                            />
                          )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {
                              row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                            }
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                            "gobierno estatal" &&
                            row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                              "municipios" && (
                              <TextField
                                inputProps={{
                                  sx: {
                                    fontSize: "0.7rem",
                                  },
                                }}
                                size="small"
                                value={row?.ingresoAfectadoXOrganismo}
                                onChange={(v) => {
                                  if (Number(v.target.value) <= 100.0) {
                                    addPorcentaje(index, row, {
                                      columna: "ingresoAfectadoXOrganismo",
                                      porcentaje: v.target.value,
                                    });
                                  }
                                }}
                              />
                            )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {row?.acumuladoAfectacionOrganismoEntre100}
                          </Typography>
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

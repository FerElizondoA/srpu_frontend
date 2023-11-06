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

  const tipoMovimientoInstruccion: TipoMovimientoInstrucciones =
    useInstruccionesStore(
      (state) => state.tipoMovimientoInstruccion
    );

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

  //CLEAN

  const cleanInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanInstruccion
  )
  const cleanTipoMovimientoInstruccion : Function = useInstruccionesStore(
    (state) => state.cleanTipoMovimientoInstruccion
  )


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
            height: "22rem",
          },

          "@media (min-width: 768px)": {
            height: "20rem",
          },

          "@media (min-width: 1140px)": {
            height: "22rem",
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
              value={tipoMovimientoInstruccion.tipoEntePublicoObligado}
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
              disabled={
                tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion ===
                  "No aplica" ||
                /^[\s]*$/.test(
                  tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion
                )
              }
              options={catalogoOrganismos.filter(
                (td: any) => 
                td.IdTipoEntePublico === 
                tipoMovimientoInstruccion.tipoEntePublicoObligado.Id
              )}
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={tipoMovimientoInstruccion.entidadFederativa}
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
              value={tipoMovimientoInstruccion.tipoFuente}
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
                  id: `${tipoMovimientoInstruccion.tipoFuente?.Descripcion
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
                    tipoEntePublicoObligado: tipoMovimientoInstruccion.tipoEntePublicoObligado,
                    altaDeudor: tipoMovimientoInstruccion.altaDeudor,
                    entidadFederativa: tipoMovimientoInstruccion.entidadFederativa,
                    //mandatario: tipoMovimientoInstruccion.mandatario,
                    tipoFuente: tipoMovimientoInstruccion.tipoFuente,
                    fondoIngreso: tipoMovimientoInstruccion.fondoIngreso,
                    fondoIngresoGobiernoEstatal:
                         tipoMovimientoInstruccion.tipoFuente.Descripcion.toLowerCase() ===
                          "participaciones"
                          ? "80.00"
                          : "100.00",

                    fondoIngresoMunicipios:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                        "municipios"
                        ? tipoMovimientoInstruccion.tipoFuente.Descripcion.toLowerCase() ===
                          "participaciones"
                          ? "20.00"
                          : "0.00"
                        : "0.00",

                    fondoIngresoAsignadoMunicipio:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                        "municipio"
                      ? "100.00"
                      : "0.00",
                    ingresoOrganismo:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "municipios" &&
                        tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "gobierno estatal"
                        ? "0.00"
                        : "0.00",
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
                        ? "0.00"
                        : "",
                    fondoIngresoAfectadoXMunicipio:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                        "municipios"
                        ? "0"
                        : "0",
                    acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
                      tablaTipoMovimientoInstrucciones
                        .reduce((accumulator, object) => {
                          return (
                            accumulator +
                            Number(object.fondoIngresoAfectadoXMunicipio)
                          );
                        }, 0)
                        .toString(),
                    ingresoAfectadoXOrganismo:
                      tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "municipios" ||
                        tipoMovimientoInstruccion.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                        "gobierno estatal"
                        ? ""
                        : "",
                    acumuladoAfectacionOrganismoEntre100:
                      tablaTipoMovimientoInstrucciones
                        .reduce((accumulator, object) => {
                          return (
                            (accumulator +
                              Number(object.ingresoAfectadoXOrganismo)) /
                            100
                          );
                        }, 0)
                        .toString(),
                  });
                  cleanTipoMovimientoInstruccion();
                }}
              >
                Agregar
              </Button>
            </ThemeProvider>
          </Grid>
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
                      <Typography sx={{ fontSize: "0.7rem", width: "110px" }}>{head.label}</Typography>
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
                                size="small"
                                value={row?.fondoIngresoAfectadoXGobiernoEstatal}

                                onChange={(v) => {
                                  let auxArray = [...tablaTipoMovimientoInstrucciones];
                                  if (Number(v.target.value) <= 100) {
                                    auxArray[
                                      index
                                    ].fondoIngresoAfectadoXGobiernoEstatal = v.target.value;
                                  addPorcentaje(auxArray)
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
                            "municipio" && (
                            <TextField
                              type="number"
                              inputProps={{
                                sx: {
                                  fontSize: "0.7rem",
                                },
                              }}
                              size="small"
                              value={row?.fondoIngresoAfectadoXMunicipio}
                              onChange={(v) => {
                                let auxArray = [...tablaTipoMovimientoInstrucciones];
                                if (
                                  Number(v.target.value) <= 100 &&
                                  Number(row?.fondoIngresoMunicipios) > 0 &&
                                  Number(row?.fondoIngresoAsignadoMunicipio) > 0
                                ) {
                                  auxArray[
                                    index
                                  ].fondoIngresoAfectadoXMunicipio =
                                    v.target.value;

                                  auxArray.forEach((item) => {
                                    item.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                      tablaTipoMovimientoInstrucciones
                                        .reduce((accumulator, object) => {
                                          return (
                                            accumulator +
                                            Number(
                                              object.fondoIngresoAfectadoXMunicipio
                                            )
                                          );
                                        }, 0)
                                        .toString();
                                  });

                                  addPorcentaje(auxArray);
                                }
                              }}
                            />
                            )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                            "municipio" && (
                            <Typography sx={{ fontSize: "0.7rem" }}>
                              {(
                                Number(
                                  row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                                ) / Number(row?.fondoIngresoAsignadoMunicipio)
                              ).toFixed(6)}
                            </Typography>
                          )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                            "gobierno estatal" &&
                            row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                              "municipio" && (
                              <TextField
                                type="number"
                                inputProps={{
                                  sx: {
                                    fontSize: "0.7rem",
                                  },
                                }}
                                size="small"
                                value={row?.ingresoAfectadoXOrganismo}
                                onChange={(v) => {
                                  let auxArray = [...tablaTipoMovimientoInstrucciones];
                                  if (
                                    Number(v.target.value) <= 100 &&
                                    Number(row?.ingresoOrganismo) > 0
                                  ) {
                                    auxArray[index].ingresoAfectadoXOrganismo =
                                      v.target.value;

                                    auxArray.forEach((item) => {
                                      item.acumuladoAfectacionOrganismoEntre100 =
                                      tablaTipoMovimientoInstrucciones
                                          .reduce((accumulator, object) => {
                                            return (
                                              accumulator +
                                              Number(
                                                object.ingresoAfectadoXOrganismo
                                              )
                                            );
                                          }, 0)
                                          .toString();
                                    });

                                    addPorcentaje(auxArray);
                                  }
                                }}
                              />
                            )}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        <Typography sx={{ fontSize: "0.7rem" }}>
                            {(
                              Number(
                                row?.acumuladoAfectacionOrganismoEntre100
                              ) / 100
                            ).toFixed(6)}
                          </Typography>
                        </StyledTableCell>


                        <StyledTableCell align="center">
                          <Tooltip title="Eliminar">
                          <IconButton
                              type="button"
                              onClick={() => {
                                let auxArray = [...tablaTipoMovimientoInstrucciones];

                                auxArray.forEach((item) => {
                                  item.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                  tablaTipoMovimientoInstrucciones
                                      .reduce((accumulator, object) => {
                                        return (
                                          accumulator +
                                          Number(
                                            object.fondoIngresoAfectadoXMunicipio
                                          )
                                        );
                                      }, 0)
                                      .toString();
                                });
                                auxArray.forEach((item) => {
                                  item.acumuladoAfectacionOrganismoEntre100 =
                                    tablaTipoMovimientoInstrucciones
                                      .reduce((accumulator, object) => {
                                        return (
                                          accumulator +
                                          Number(
                                            object.ingresoAfectadoXOrganismo
                                          )
                                        );
                                      }, 0)
                                      .toString();
                                });

                                addPorcentaje(auxArray);
                                removeTipoMovimientoInstrucciones(index);
                              }}
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

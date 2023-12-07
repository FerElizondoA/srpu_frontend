/* eslint-disable react-hooks/exhaustive-deps */
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
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
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import {
  Beneficiario,
  TipoMovimientoInstrucciones,
} from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  ICatalogo,
  IFondoOIngreso,
} from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ButtonTheme } from "../../ObligacionesCortoPlazoPage/Panels/DisposicionPagosCapital";

interface HeadLabels {
  label: string;
}

export function TipoDeMovimientoIntrucciones() {
  const headsLabels: HeadLabels[] = [
    {
      label: "Id",
    },
    {
      label: "Tipo de ente público obligado",
    },
    {
      label: "Organismo/Municipio Mandante",
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
    useInstruccionesStore((state) => state.tipoMovimientoInstruccion);

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

  const getTiposBeneficiarios: Function = useInstruccionesStore(
    (state) => state.getTiposBeneficiarios
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

  const cleanTipoMovimientoInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanTipoMovimientoInstruccion
  );

  const setCamposBeneficiario: Function = useInstruccionesStore(
    (state) => state.setCamposBeneficiario
  );

  const CamposBeneficiario: Beneficiario = useInstruccionesStore(
    (state) => state.CamposBeneficiario
  );

  const IdRegistroTabla: TipoMovimientoInstrucciones = useInstruccionesStore(
    (state) => state.IdRegistroTabla
  );

  const setIdResgistroTabla: Function = useInstruccionesStore(
    (state) => state.setIdResgistroTabla
  );

  function botonAgregarInstruccion() {
    return (
      <>
        <ThemeProvider theme={ButtonTheme}>
          <Button
            sx={{
              ...queries.buttonContinuar,
              width: "12rem",
              height: "2.5rem",
            }}
            disabled={
              movimiento === "DEUDOR"
                ? tipoMovimientoInstruccion.tipoEntePublicoObligado
                    .Descripcion === "" ||
                  tipoMovimientoInstruccion.entidadFederativa.Descripcion ===
                    "" ||
                  tipoMovimientoInstruccion.tipoFuente.Descripcion === "" ||
                  tipoMovimientoInstruccion.fondoIngreso.Descripcion === ""
                : movimiento === "BENEFICIARIO"
                ? IdRegistroTabla.id === "" ||
                  IdRegistroTabla.tipoEntePublicoObligado.Descripcion === "" ||
                  IdRegistroTabla.entidadFederativa.Descripcion === "" ||
                  IdRegistroTabla.tipoFuente.Descripcion === "" ||
                  IdRegistroTabla.fondoIngreso.Descripcion === "" ||
                  CamposBeneficiario.organismoMunicipioMandate.Descripcion ===
                    "" ||
                  CamposBeneficiario.tipoBeneficiario.Descripcion === ""
                : false
            }
            onClick={() => {
              if (movimiento === "DEUDOR") {
                addTipoMovimientoInstrucciones({
                  id: tipoMovimientoInstruccion.id,
                  tipoEntePublicoObligado:
                    tipoMovimientoInstruccion.tipoEntePublicoObligado,
                  altaDeudor: tipoMovimientoInstruccion.altaDeudor,
                  entidadFederativa:
                    tipoMovimientoInstruccion.entidadFederativa,
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
              } else if (movimiento === "BENEFICIARIO") {
                addTipoMovimientoInstrucciones({
                  id: IdRegistroTabla.id,
                  tipoEntePublicoObligado:
                    IdRegistroTabla.tipoEntePublicoObligado,
                  altaDeudor: IdRegistroTabla.altaDeudor,
                  entidadFederativa: IdRegistroTabla.entidadFederativa,
                  //mandatario: tipoMovimientoInstruccion.mandatario,
                  tipoFuente: IdRegistroTabla.tipoFuente,
                  fondoIngreso: IdRegistroTabla.fondoIngreso,
                  fondoIngresoGobiernoEstatal:
                    IdRegistroTabla.tipoFuente.Descripcion.toLowerCase() ===
                    "participaciones"
                      ? "80.00"
                      : "100.00",

                  fondoIngresoMunicipios:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "municipios"
                      ? IdRegistroTabla.tipoFuente.Descripcion.toLowerCase() ===
                        "participaciones"
                        ? "20.00"
                        : "0.00"
                      : "0.00",

                  fondoIngresoAsignadoMunicipio:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "municipio"
                      ? "100.00"
                      : "0.00",
                  ingresoOrganismo:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "municipios" &&
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "gobierno estatal"
                      ? "0.00"
                      : "0.00",
                  fondoIngresoAfectadoXGobiernoEstatal:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? ""
                      : "",
                  afectacionGobiernoEstatalEntre100:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? "0.00"
                      : "",
                  acumuladoAfectacionGobiernoEstatalEntre100:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                    "gobierno estatal"
                      ? "0.00"
                      : "",
                  fondoIngresoAfectadoXMunicipio:
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
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
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                      "municipios" ||
                    IdRegistroTabla.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
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
              }
            }}
          >
            Agregar
          </Button>
        </ThemeProvider>
      </>
    );
  }

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
    getTiposBeneficiarios();
  }, []);

  // useEffect(() => {
  //   if(movimiento === "BENEFICIARIO" ){
  //     setIdResgistroTabla({
  //       ...IdRegistroTabla,
  //       entidadFederativa: {
  //         Id:  "",
  //         Descripcion:  "",
  //       },
  //     })
  //   }

  // }, [IdRegistroTabla.entidadFederativa]);

  const [movimiento, setMovimiento] = useState("DEUDOR");

  useEffect(() => {
    cleanTipoMovimientoInstruccion();
  }, [movimiento]);

  return (
    <Grid>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        sx={{
          height: "30rem",
          "@media (min-width: 480px)": {
            height: "30rem",
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
          <Grid
            item
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 2, sm: 5, md: 0 }
                : { xs: 0, sm: 0 }
            }
            xs={10}
            sm={movimiento === "DEUDOR" ? 3 : 5}
            md={movimiento === "DEUDOR" ? 3 : 5}
            lg={movimiento === "DEUDOR" ? 3 : 3.5}
            xl={movimiento === "DEUDOR" ? 3 : 3}
          >
            <FormControl>
              <RadioGroup
                value={movimiento}
                onChange={(v) => {
                  setMovimiento(v.target.value);
                }}
              >
                <Grid container>
                  <Grid item>
                    <FormControlLabel
                      sx={{ ...queries.medium_text }}
                      value="DEUDOR"
                      control={<Radio />}
                      label="Alta de deudor"
                    />
                  </Grid>

                  {tablaTipoMovimientoInstrucciones.length > 0 ? (
                    <Grid item>
                      <FormControlLabel
                        sx={{ ...queries.medium_text }}
                        value="BENEFICIARIO"
                        control={<Radio />}
                        label="Alta de beneficiario"
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>

          {movimiento === "BENEFICIARIO" ? (
            <Grid
              xs={10}
              sm={5}
              md={5}
              lg={2}
              xl={2}
              mb={
                movimiento === "BENEFICIARIO"
                  ? { xs: 2, sm: 4, md: 4, lg: 0 }
                  : { xs: 0, sm: 0 }
              }
            >
              <InputLabel sx={queries.medium_text}>Id</InputLabel>
              <Autocomplete
                clearText="Borrar"
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={tablaTipoMovimientoInstrucciones}
                getOptionLabel={(option) => option.id}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      <Typography>{option.id}</Typography>
                    </li>
                  );
                }}
                value={IdRegistroTabla}
                onChange={(event, text) =>
                  setIdResgistroTabla({
                    ...IdRegistroTabla,
                    id: text?.id || "",
                    altaDeudor: text?.altaDeudor || "",
                    tipoEntePublicoObligado: {
                      Id: text?.tipoEntePublicoObligado.Id || "",
                      Descripcion:
                        text?.tipoEntePublicoObligado.Descripcion || "",
                    },
                    entidadFederativa: {
                      Id: text?.entidadFederativa.Id || "",
                      Descripcion: text?.entidadFederativa.Descripcion || "",
                    },
                    //mandatario: { Id: "", Descripcion: "" },
                    tipoFuente: {
                      Id: text?.tipoFuente.Id || "",
                      Descripcion: text?.tipoFuente.Descripcion || "",
                    },
                    fondoIngreso: {
                      Id: text?.fondoIngreso.Id || "",
                      Descripcion: text?.fondoIngreso.Descripcion || "",
                    },
                    fondoIngresoGobiernoEstatal: text?.id || "",
                    fondoIngresoMunicipios: text?.id || "",
                    fondoIngresoAsignadoMunicipio: "",
                    ingresoOrganismo: text?.id || "",
                    fondoIngresoAfectadoXGobiernoEstatal: text?.id || "",
                    afectacionGobiernoEstatalEntre100: text?.id || "",
                    acumuladoAfectacionGobiernoEstatalEntre100: text?.id || "",
                    fondoIngresoAfectadoXMunicipio: text?.id || "",
                    acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
                      text?.id || "",
                    ingresoAfectadoXOrganismo: text?.id || "",
                    acumuladoAfectacionOrganismoEntre100: text?.id || "",
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
                  option.id === value.id || value.id === ""
                }
              />
            </Grid>
          ) : null}

          <Grid
            item
            xs={10}
            sm={movimiento === "DEUDOR" ? 3 : 5}
            md={movimiento === "DEUDOR" ? 3 : 5}
            lg={movimiento === "DEUDOR" ? 3 : 2}
            xl={movimiento === "DEUDOR" ? 3 : 2}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 2, sm: 0, md: 0 }
                : { xs: 4, sm: 0 }
            }
            // mb={{xs:2, sm:0}}
          >
            <InputLabel sx={queries.medium_text}>
              Tipo de Ente Público Obligado
            </InputLabel>
            <Autocomplete
              disabled={
                movimiento === "BENEFICIARIO" && IdRegistroTabla.id === ""
                  ? true
                  : false
              }
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
              value={
                movimiento === "DEUDOR"
                  ? tipoMovimientoInstruccion.tipoEntePublicoObligado
                  : IdRegistroTabla.tipoEntePublicoObligado
              }
              onChange={(event, text) => {
                movimiento === "DEUDOR"
                  ? setTipoMovimientoInstrucciones({
                      ...tipoMovimientoInstruccion,
                      tipoEntePublicoObligado: {
                        Id: text?.Id || "",
                        Descripcion: text?.Descripcion || "",
                      },
                    })
                  : setIdResgistroTabla({
                      ...IdRegistroTabla,
                      tipoEntePublicoObligado: {
                        Id: text?.Id || "",
                        Descripcion: text?.Descripcion || "",
                      },
                      entidadFederativa: {
                        Id: "",
                        Descripcion: "",
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
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>

          <Grid
            item
            xs={10}
            sm={movimiento === "DEUDOR" ? 3 : 5}
            md={movimiento === "DEUDOR" ? 3 : 5}
            lg={movimiento === "DEUDOR" ? 3 : 2}
            xl={movimiento === "DEUDOR" ? 3 : 3}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 0, sm: 0, md: 0 }
                : { xs: 0 }
            }
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Organismo/Municipio Mandante
            </InputLabel>
            <Autocomplete
              //disabled={movimiento=== "DEUDOR" ? false : true}
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              fullWidth
              disabled={
                movimiento === "DEUDOR"
                  ? tipoMovimientoInstruccion.tipoEntePublicoObligado
                      .Descripcion === "No Aplica" ||
                    /^[\s]*$/.test(
                      tipoMovimientoInstruccion.tipoEntePublicoObligado
                        .Descripcion
                    )
                  : movimiento === "BENEFICIARIO" && IdRegistroTabla.id === ""
                  ? true
                  : false
              }
              options={
                movimiento === "DEUDOR"
                  ? catalogoOrganismos.filter(
                      (td: any) =>
                        td.IdTipoEntePublico ===
                        tipoMovimientoInstruccion.tipoEntePublicoObligado.Id
                    )
                  : catalogoOrganismos.filter(
                      (td: any) =>
                        td.IdTipoEntePublico ===
                        IdRegistroTabla.tipoEntePublicoObligado.Id
                    )
              }
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              value={
                movimiento === "DEUDOR"
                  ? tipoMovimientoInstruccion.entidadFederativa
                  : IdRegistroTabla.entidadFederativa
              }
              //value={tipoMovimientoInstruccion.entidadFederativa}
              onChange={(event, text) => {
                movimiento === "DEUDOR"
                  ? setTipoMovimientoInstrucciones({
                      ...tipoMovimientoInstruccion,
                      entidadFederativa: {
                        Id: text?.Id || "",
                        Descripcion: text?.Descripcion || "",
                      },
                    })
                  : setIdResgistroTabla({
                      ...IdRegistroTabla,
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
          <Grid
            item
            xs={10}
            sm={movimiento === "DEUDOR" ? 3 : 5}
            md={movimiento === "DEUDOR" ? 3 : 5}
            lg={movimiento === "DEUDOR" ? 3 : 3}
            xl={movimiento === "DEUDOR" ? 3 : 3}
            mb={
              movimiento === "BENEFICIARIO"
                ? { xs: 3, sm: 0 }
                : { xs: 4, sm: 0 }
            }
            // mb={{xs:2, sm:0}}
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Tipo de fuente
            </InputLabel>
            <Autocomplete
              disableClearable
              disabled={
                movimiento === "BENEFICIARIO" && IdRegistroTabla.id === ""
                  ? true
                  : false
              }
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={catalogoTiposDeFuente}
              value={
                movimiento === "DEUDOR"
                  ? tipoMovimientoInstruccion.tipoFuente
                  : IdRegistroTabla.tipoFuente
              }
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) => {
                movimiento === "DEUDOR"
                  ? setTipoMovimientoInstrucciones({
                      ...tipoMovimientoInstruccion,
                      tipoFuente: {
                        Id: text?.Id || "",
                        Descripcion: text?.Descripcion || "",
                      },
                    })
                  : setIdResgistroTabla({
                      ...IdRegistroTabla,
                      tipoFuente: {
                        Id: text?.Id || "",
                        Descripcion: text?.Descripcion || "",
                      },
                      fondoIngreso: {
                        Id: "",
                        Descripcion: "",
                        TipoDeFuente: "",
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
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>

          <Grid
            item
            xs={10}
            sm={movimiento === "DEUDOR" ? 3 : 5}
            md={movimiento === "DEUDOR" ? 3 : 5}
            lg={movimiento === "DEUDOR" ? 3 : 3}
            xl={movimiento === "DEUDOR" ? 3 : 3}
          >
            <InputLabel sx={{ ...queries.medium_text }}>
              Fondo o ingreso
            </InputLabel>
            <Autocomplete
              disableClearable
              disabled={
                movimiento === "BENEFICIARIO" && IdRegistroTabla.id === ""
                  ? true
                  : movimiento === "DEUDOR" &&
                    tipoMovimientoInstruccion.tipoFuente.Descripcion === ""
                  ? true
                  : false
              }
              clearText="Borrar"
              noOptionsText="Sin opciones"
              closeText="Cerrar"
              openText="Abrir"
              options={
                movimiento === "DEUDOR"
                  ? catalogoFondosOIngresos.filter(
                      (td) =>
                        td.TipoDeFuente ===
                        tipoMovimientoInstruccion.tipoFuente?.Id
                    )
                  : catalogoFondosOIngresos.filter(
                      (td) => td.TipoDeFuente === IdRegistroTabla.tipoFuente?.Id
                    )
              }
              value={
                movimiento === "DEUDOR"
                  ? tipoMovimientoInstruccion.fondoIngreso
                  : IdRegistroTabla.fondoIngreso
              }
              getOptionLabel={(option) => option.Descripcion}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.Id}>
                    <Typography>{option.Descripcion}</Typography>
                  </li>
                );
              }}
              onChange={(event, text) => {
                movimiento === "DEUDOR"
                  ? setTipoMovimientoInstrucciones({
                      ...tipoMovimientoInstruccion,
                      id: `${
                        tipoMovimientoInstruccion.tipoFuente?.Descripcion
                      }/${text.Descripcion.split(" ")
                        .map((word) =>
                          word.charAt(0) === word.charAt(0).toUpperCase()
                            ? word.charAt(0)
                            : ""
                        )
                        .join("")}/${
                        tablaTipoMovimientoInstrucciones?.length + 1
                      }`,
                      fondoIngreso: {
                        Id: text.Id,
                        Descripcion: text.Descripcion,
                        TipoDeFuente: text.TipoDeFuente,
                      },
                    })
                  : setIdResgistroTabla({
                      ...IdRegistroTabla,
                      fondoIngreso: {
                        Id: text.Id,
                        Descripcion: text.Descripcion,
                        TipoDeFuente: text.TipoDeFuente,
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
                option.Descripcion === value.Descripcion ||
                value.Descripcion === ""
              }
            />
          </Grid>

          <Grid
            mt={2}
            width={"20%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sm={movimiento === "DEUDOR" ? 3 : 5}
            md={movimiento === "DEUDOR" ? 3 : 5}
            lg={movimiento === "DEUDOR" ? 3 : 3}
            xl={movimiento === "DEUDOR" ? 3 : 3}
          >
            {movimiento === "DEUDOR" ? botonAgregarInstruccion() : null}
          </Grid>
        </Grid>
      </Grid>

      {movimiento === "BENEFICIARIO" ? (
        <Grid
          container
          // flexDirection={"column"}
          // //display={"flex"}
          // height={"10rem"}
          // justifyContent={"space-between"}

          // justifyContent={{
          //   xs:"",
          //   sm:"",
          //   md:"",
          //   lg:"s",
          //   xl:"space-between",
          // }}
        >
          <Grid width={"100%"} mb={2}>
            <Divider sx={{ ...queries.bold_text, textTransform: "uppercase" }}>
              Beneficiario
            </Divider>
          </Grid>

          <Grid container display={"flex"} justifyContent={"space-evenly"}>
            <Grid
              mb={
                movimiento === "BENEFICIARIO"
                  ? { xs: 3, sm: 3, md: 0 }
                  : { xs: 4, sm: 0 }
              }
              xs={10}
              sm={5}
              md={5}
              lg={3}
              xl={3}
            >
              <InputLabel sx={{ ...queries.medium_text }}>
                Tipo de beneficiario
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
                value={CamposBeneficiario.tipoBeneficiario}
                onChange={(v, text) =>
                  setCamposBeneficiario({
                    tipoBeneficiario: {
                      Id: text?.Id || "",
                      Descripcion: text?.Descripcion || "",
                    },
                    entidadFederativa: CamposBeneficiario.entidadFederativa,
                    organismoMunicipioMandate:
                      CamposBeneficiario.organismoMunicipioMandate,
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
              xs={10}
              sm={5}
              md={5}
              lg={3}
              xl={3}
              mb={
                movimiento === "BENEFICIARIO"
                  ? { xs: 5, sm: 5, md: 5 }
                  : { xs: 4, sm: 0 }
              }
            >
              <InputLabel sx={{ ...queries.medium_text }}>
                Organismo/Municipio Mandante
              </InputLabel>

              <Autocomplete
                clearText="Borrar"
                disabled={
                  CamposBeneficiario.tipoBeneficiario.Descripcion === ""
                }
                noOptionsText="Sin opciones"
                closeText="Cerrar"
                openText="Abrir"
                fullWidth
                options={catalogoOrganismos.filter(
                  (td: any) =>
                    td.IdTipoEntePublico ===
                    CamposBeneficiario.tipoBeneficiario.Id
                )}
                value={CamposBeneficiario.organismoMunicipioMandate}
                getOptionLabel={(option) => option.Descripcion}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.Id}>
                      <Typography>{option.Descripcion}</Typography>
                    </li>
                  );
                }}
                onChange={(v, text) =>
                  setCamposBeneficiario({
                    tipoBeneficiario: CamposBeneficiario.tipoBeneficiario,
                    entidadFederativa: CamposBeneficiario.entidadFederativa,
                    organismoMunicipioMandate: {
                      Id: text?.Id || "",
                      Descripcion: text?.Descripcion || "",
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

            <Grid
              height="4rem"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              xs={10}
              sm={5}
              md={3}
              lg={3}
              xl={3}
            >
              {botonAgregarInstruccion()}
            </Grid>
          </Grid>
        </Grid>
      ) : null}

      <Grid container mt={3} mb={2} display={"flex"} justifyContent={"center"}>
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
                    <StyledTableCell align="center">
                      <Typography sx={{ fontSize: "0.7rem", width: "110px" }}>
                        {head.label}
                      </Typography>
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
                                let auxArray = [
                                  ...tablaTipoMovimientoInstrucciones,
                                ];
                                if (Number(v.target.value) <= 100) {
                                  auxArray[
                                    index
                                  ].fondoIngresoAfectadoXGobiernoEstatal =
                                    v.target.value;
                                  addPorcentaje(auxArray);
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
                                let auxArray = [
                                  ...tablaTipoMovimientoInstrucciones,
                                ];
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
                                  let auxArray = [
                                    ...tablaTipoMovimientoInstrucciones,
                                  ];
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
                                let auxArray = [
                                  ...tablaTipoMovimientoInstrucciones,
                                ];

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

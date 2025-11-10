/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import {
  DialogTransition,
  buttonTheme,
} from "../../mandatos/dialog/AgregarMandatos";
import { DatosGeneralesIntrucciones } from "../panels/DatosGeneralesIntrucciones";
import { SoporteDocumentalInstrucciones } from "../panels/SoporteDocumentalInstrucciones";
import { TipoDeMovimientoIntrucciones } from "../panels/TipoDeMovimientoIntrucciones";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IDatosGeneralesInstrucciones, IDeudorInstrucciones, ISoporteDocumentalInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { listFileFuentesPago } from "../../APIS/pathDocSol/APISDocumentos";
import { IDataAsignacionTipoMoviSolicitudes } from "../../../screens/fuenteDePago/Fideicomisos";
import Swal from "sweetalert2";
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOff';
import { IPorcentajeAcumulados } from "../../../store/Fideicomiso/fideicomiso";


export function AgregarInstruccionesIrrevocables({
  deshabilidarCamposSCLP,
  handler,
  openState,
  getMecanismosVehiculosPago,
  DataAsignacionTipoMoviSolicitudes,
}: {
  deshabilidarCamposSCLP?: boolean;
  handler: Function;
  openState: boolean;
  getMecanismosVehiculosPago: Function;
  DataAsignacionTipoMoviSolicitudes: IDataAsignacionTipoMoviSolicitudes[],

}) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  const IdInstruccion: string = useInstruccionesStore(
    (state) => state.idInstruccion
  );

  const createInstruccion: Function = useInstruccionesStore(
    (state) => state.createInstruccion
  );

  const modificaInstruccion: Function = useInstruccionesStore(
    (state) => state.modificaInstruccion
  );

  const [loading, setLoading] = useState(false);

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );
  const getOrganismos: Function = useCortoPlazoStore(
    (state) => state.getOrganismos
  );
  const getTiposDeFuente: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );
  const getInstituciones: Function = useCortoPlazoStore(
    (state) => state.getInstituciones
  );
  const getFondosOIngresos: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );

  const banco: string = useInstruccionesStore(
    (state) => state.datosGenerales.banco.Descripcion
  );

  const numeroCuenta: string = useInstruccionesStore(
    (state) => state.datosGenerales.numeroCuenta
  );

  const fechaInstruccion: Date = useInstruccionesStore(
    (state) => state.datosGenerales.fechaInstruccion
  );

  const cuentaCLABE: string = useInstruccionesStore(
    (state) => state.datosGenerales.cuentaCLABE
  );

  const tablaTipoMovimiento: IDeudorInstrucciones[] = useInstruccionesStore(
    (state) => state.tablaTipoMovimiento
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );


  const idInstruccion: string = useInstruccionesStore(
    (state) => state.idInstruccion
  );

  const modificaAsignacionOriginalTipoSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaAsignacionOriginalTipoSolicitud
  );

  const cleanPorcentajesAcumulados: Function = useFideicomisoStore(
    (state) => state.cleanPorcentajesAcumulados
  );
  const arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.arregloPorcetajesAcumuladosRegistros
  );
  const [erroresPorcentajeAcumulado, setErroresPorcentajesAcumulados] = useState<Array<string>>([])
  const [openDialogPorcentajeAcumulado, setOpenPorcentajeAcumulado] = useState(false)

  const [validacionDialogAsignarFuente, setValidacionDialogAsignarFuente] = useState({
    openDialog: false,
    registroPrevio: "",
    message: "",
    montoOriginal: 0,
    montoUtilizado: 0,
    nombreEntePublicoObligado: "",
    nombreFondoOIngreso: "",
  });

  const tablaSoporteDocumentalInstrucciones: ISoporteDocumentalInstrucciones[] =
    useInstruccionesStore((state) => state.tablaSoporteDocumentalInstruccion);

  useEffect(() => {
    getTiposDeFuente();
    getOrganismos();
    getInstituciones();
    getTipoEntePublicoObligado();
    getFondosOIngresos();
  }, []);



  return (
    <Dialog fullScreen open={openState} TransitionComponent={DialogTransition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar >
          <Tooltip title="Volver">
            <IconButton
              edge="start"
              onClick={() => {
                handler(false);
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                {/* {IdInstruccion === "" ? "Agregar" : "Editar"}  */}
                {tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instrucción Irrevocable" ? ""
                  : IdInstruccion === "" ? "Agregar" : "Editar"} Instrucción Irrevocable
              </Typography>
            </Grid>
          </Grid>

          <Grid item width={"4rem"}>
            <ThemeProvider theme={buttonTheme}>
              <Button
                // disabled={tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instrucción Irrevocable"}
                disabled={
                  (tablaTipoMovimiento.length <= 0 ||
                    numeroCuenta === "" ||
                    parseInt(numeroCuenta) === 0 ||
                    cuentaCLABE === "" ||
                    parseInt(cuentaCLABE) === 0 ||
                    banco === "" ||
                    tablaSoporteDocumentalInstrucciones.length <= 0) ||

                  (tipoMecanismoVehiculoPago === "Mandato" ||  //Para fuente de pago->vehiculo de pago
                    tipoMecanismoVehiculoPago === "Instrucción Irrevocable")
                  // municipio === null
                }
                sx={{
                  backgroundColor: "#15212f",
                  color: "white",
                  "&&:hover": {
                    backgroundColor: "rgba(47, 47, 47, 0.4)",
                    color: "#000",
                  },
                  //fontSize: "90%",
                  borderRadius: "0.8vh",
                  textTransform: "capitalize",
                  fontSize: "70%",
                  "@media (min-width: 480px)": {
                    fontSize: "70%",
                  },

                  "@media (min-width: 768px)": {
                    fontSize: "80%",
                  }
                }}
                onClick={() => {

                  if (IdInstruccion === "") {
                    setLoading(true);
                    createInstruccion(() => {
                      setLoading(false);
                      handler(false);
                      getMecanismosVehiculosPago && getMecanismosVehiculosPago("Instruccion Irrevocable", () => { })
                    });

                  } else if (IdInstruccion !== "" && DataAsignacionTipoMoviSolicitudes.length > 0) {


                    // setLoading(true);
                    // modificaInstruccion(() => {
                    //   setLoading(false);
                    //   handler(false);
                    //   getMecanismosVehiculosPago && getMecanismosVehiculosPago("Instruccion Irrevocable", () => { })
                    // });

                    let errorEncontrado = false;
                    let mensajeError = "";

                    tablaTipoMovimiento.forEach((nuevo, index) => {
                      // console.log("nuevo.fideicomitente.Id :", nuevo.fideicomitente.Id);
                      // console.log("nuevo.fondoIngreso.Id :", nuevo.fondoIngreso.Id);
                      // console.log("nuevo.id :", nuevo.id);
                      // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdEntePublicoObligado :`, DataAsignacionTipoMoviSolicitudes[index].IdEntePublicoObligado);
                      // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdFondoIngreso :`, DataAsignacionTipoMoviSolicitudes[index].IdFondoIngreso);
                      // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].TipoMoviRelacionado :`, DataAsignacionTipoMoviSolicitudes[index].TipoMovRelacionado);
                      const coincidencia = DataAsignacionTipoMoviSolicitudes.find(
                        (asig) =>
                          asig.IdEntePublicoObligado === nuevo.entePublicoObligado.Id &&
                          asig.IdFondoIngreso === nuevo.fondoIngreso.Id &&
                          asig.TipoMovRelacionado === nuevo.id
                      );

                      if (coincidencia) {
                        console.log("coincidencia encontrada1 :", coincidencia);
                        const usadoIngreso = coincidencia.PorcentajeUtilizadoIngreso;
                        const orignalIngreso = Number(coincidencia.PorcentajeOriginalIngreso) || 0;

                        const usadoEquivalencia = coincidencia.PorcentajeUtilizadoEquivalencia;
                        const orignalEquivalencia = Number(coincidencia.PorcentajeOriginalEquivalencia) || 0;


                        const nuevoIngreso = nuevo.AfectadoTotalIngreso;
                        const nuevaEquivalencia = nuevo.EquivalenciaCorrespondienteMunicipios ?? 0;

                        if (nuevoIngreso < usadoIngreso) {
                           errorEncontrado = true;
                          //mensajeError += `\nEl porcentaje de ingreso (${nuevoIngreso}%) no puede ser menor que el utilizado (${usadoIngreso}%) para ${nuevo.mandatario.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "Asignacion",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: orignalIngreso,
                            montoUtilizado: usadoIngreso,
                            nombreEntePublicoObligado: nuevo.entePublicoObligado.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });

                        }

                        if (nuevaEquivalencia < usadoEquivalencia) {
                          errorEncontrado = true;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "Asignacion",
                            message: "EquivalenciaCorrespondienteMunicipios",
                            montoOriginal: orignalEquivalencia,
                            montoUtilizado: usadoEquivalencia,
                            nombreEntePublicoObligado: nuevo.entePublicoObligado.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                          //mensajeError += `\nEl porcentaje de equivalencia (${nuevaEquivalencia}%) no puede ser menor que el utilizado (${usadoEquivalencia}%) para ${nuevo.mandatario.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                        }
                      }

                      const acumulado = arregloPorcetajesAcumuladosRegistros.find(
                        (acc) =>
                          acc.IdFondoOIngreso === nuevo.fondoIngreso.Id &&
                          acc.IdEntePublicoObligado === nuevo.entePublicoObligado.Id
                      );

                      if (acumulado) {
                        const acumuladoIngreso = Number(acumulado.AfectadoTotalIngreso) || 0;
                        const acumuladoEquivalencia = Number(acumulado.EquivalenciaCorrespondienteMunicipios) || 0;

                        const nuevoIngreso = Number(nuevo.AfectadoTotalIngreso) || 0;
                        const nuevaEquivalencia = Number(nuevo.EquivalenciaCorrespondienteMunicipios) || 0;

                        // 🔸 Si el acumulado + nuevo supera 100, marcar error
                        if (acumuladoIngreso + nuevoIngreso > 100) {
                           errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de ingreso acumulado (${acumuladoIngreso}%) más el nuevo (${nuevoIngreso}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: acumuladoIngreso,
                            montoUtilizado: nuevoIngreso,
                            nombreEntePublicoObligado: nuevo.entePublicoObligado.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }

                        if (acumuladoEquivalencia + nuevaEquivalencia > 100) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de equivalencia acumulado (${acumuladoEquivalencia}%) más el nuevo (${nuevaEquivalencia}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "EquivalenciaCorrespondienteMunicipios",
                            montoOriginal: acumuladoEquivalencia,
                            montoUtilizado: nuevaEquivalencia,
                            nombreEntePublicoObligado: nuevo.entePublicoObligado.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }
                      }


                    });



                    if (errorEncontrado) {
                      // Swal.fire({
                      //   confirmButtonText: "Cerrar",
                      //   confirmButtonColor: "rgb(175, 140, 85)",
                      //   //cancelButtonColor: "rgb(175, 140, 85)",
                      //   icon: "error",
                      //   title: "Porcentaje Inválido",
                      //   text: mensajeError.trim(),
                      // });
                      // // alert(mensajeError.trim());
                      // // setLoading(false);
                      return;
                    } else {
                      setLoading(true);
                      modificaAsignacionOriginalTipoSolicitud(
                        IdInstruccion,
                        tablaTipoMovimiento,
                        "Instrucción Irrevocable",
                        setLoading(true),
                        handler(true)
                      ).then(() => {
                        handler(false)
                      });
                    }
                    // ✅ Si todo está bien, proceder a modificar

                    // 🟡 SOLO APLICA PARA MODIFICAR

                    // let errorEncontrado = false;
                    // let mensajeError = "";

                    // tablaTipoMovimiento.forEach((nuevo, index) => {

                    //   // console.log("nuevo.fideicomitente.Id :", nuevo.entePublicoObligado.Id);
                    //   // console.log("nuevo.fondoIngreso.Id :", nuevo.fondoIngreso.Id);
                    //   // console.log("nuevo.id :", nuevo.id);
                    //   // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdEntePublicoObligado :`, DataAsignacionTipoMoviSolicitudes[index].IdEntePublicoObligado);
                    //   // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdFondoIngreso :`, DataAsignacionTipoMoviSolicitudes[index].IdFondoIngreso);
                    //   // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].TipoMoviRelacionado :`, DataAsignacionTipoMoviSolicitudes[index].TipoMovRelacionado);

                    //   const coincidencia = DataAsignacionTipoMoviSolicitudes.find(
                    //     (asig) =>
                    //       asig.IdEntePublicoObligado === nuevo.entePublicoObligado.Id &&
                    //       asig.IdFondoIngreso === nuevo.fondoIngreso.Id &&
                    //       asig.TipoMovRelacionado === nuevo.id
                    //   );

                    //   if (coincidencia) {
                    //     console.log("coincidencia encontrada1 :", coincidencia);
                    //     const usadoIngreso = coincidencia.PorcentajeUtilizadoIngreso;
                    //     const usadoEquivalencia = coincidencia.PorcentajeUtilizadoEquivalencia;
                    //     const nuevoIngreso = nuevo.AfectadoTotalIngreso;
                    //     const nuevaEquivalencia = nuevo.EquivalenciaCorrespondienteMunicipios ?? 0;

                    //     if (nuevoIngreso < usadoIngreso) {
                    //       errorEncontrado = true;
                    //       mensajeError += `\nEl porcentaje de ingreso (${nuevoIngreso}%) no puede ser menor que el utilizado (${usadoIngreso}%) para ${nuevo.entePublicoObligado.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                    //     }

                    //     if (nuevaEquivalencia < usadoEquivalencia) {
                    //       errorEncontrado = true;
                    //       mensajeError += `\nEl porcentaje de equivalencia (${nuevaEquivalencia}%) no puede ser menor que el utilizado (${usadoEquivalencia}%) para ${nuevo.entePublicoObligado.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                    //     }
                    //   }
                    // });

                    // if (errorEncontrado) {
                    //   Swal.fire({
                    //     confirmButtonText: "Cerrar",
                    //     confirmButtonColor: "rgb(175, 140, 85)",
                    //     //cancelButtonColor: "rgb(175, 140, 85)",
                    //     icon: "error",
                    //     title: "Porcentaje Inválido",
                    //     text: mensajeError.trim(),
                    //   });
                    //   // alert(mensajeError.trim());
                    //   // setLoading(false);
                    //   return;
                    // }
                    // // ✅ Si todo está bien, proceder a modificar
                    // setLoading(true);
                    // modificaAsignacionOriginalTipoSolicitud(
                    //   IdInstruccion,
                    //   tablaTipoMovimiento,
                    //   "Instrucción Irrevocable",
                    //   setLoading(true),
                    //   handler(true)
                    // ).then(() => {
                    //   handler(false)
                    // });
                  } else if (IdInstruccion !== "") {
                    console.log("EDITA INSTRUCCION DIRECTO")
                    setLoading(true);
                    modificaInstruccion(() => {
                      setLoading(false);
                      handler(false);
                      // getMecanismosVehiculosPago && getMecanismosVehiculosPago("Instruccion Irrevocable", () => { })
                    }).then(() => {
                      handler(false)
                    });
                  }
                  setTabIndex(0);
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.8ch",
                    fontFamily: "MontserratMedium",
                    "@media (min-width: 480px)": {
                      fontSize: "1.5ch",
                    },
                  }}
                >
                  {/* {IdInstruccion === "" ? "Agregar" : "Editar"}  */}
                  {tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instrucción Irrevocable" ? ""
                    : IdInstruccion === "" ? "Agregar" : "Editar"} Instrucción
                </Typography>
              </Button>
            </ThemeProvider>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid item>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          centered={query.isScrollable ? false : true}
          variant={query.isScrollable ? "scrollable" : "standard"}
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="datos generales" sx={{ ...queries.bold_text }}></Tab>
          <Tab label="Tipo de Movimiento" sx={{ ...queries.bold_text }}></Tab>
          <Tab label="Soporte Documental" sx={{ ...queries.bold_text }}></Tab>
        </Tabs>

        {tabIndex === 0 && <DatosGeneralesIntrucciones />}

        {tabIndex === 1 && <TipoDeMovimientoIntrucciones />}

        {tabIndex === 2 && <SoporteDocumentalInstrucciones />}
      </Grid>

      {/* <Dialog open={openDialogPorcentajeAcumulado}>
        <DialogTitle sx={queries.bold_text}>
          Fideicomitentes: Limite superado
        </DialogTitle>
        <DialogContent>

          {erroresPorcentajeAcumulado.map((e, idx) => {
            const division = e.indexOf(":");

            const markedText =
              division !== -1 ? e.substring(0, division + 1) : e;

            const restText =
              division !== -1 ? e.substring(division + 1) : "";
            return (

              <Typography color={"red"} sx={{ fontSize: ".9rem" }} key={idx}>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  * {markedText}
                </span>

                <span style={{ color: "red" }}>
                  {restText} <br /> <br />
                </span>
              </Typography>
              // <Typography key={idx} sx={{ mb: 1 }}>
              //   {e}
              // </Typography>
            );
          })}

        </DialogContent>

        <DialogActions>
          <Button
            sx={queries.buttonCancelar}
            onClick={() => {
              cleanPorcentajesAcumulados()
              setOpenPorcentajeAcumulado(false)
            }}
          >
            Cerrar
          </Button>

        </DialogActions>
      </Dialog> */}

      <Dialog open={validacionDialogAsignarFuente.openDialog}
        maxWidth='lg'
        fullWidth
        keepMounted
        onClose={() => setValidacionDialogAsignarFuente({
          ...validacionDialogAsignarFuente,
          openDialog: !validacionDialogAsignarFuente.openDialog
        })}
      >
        <DialogTitle sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <Typography sx={{
            fontSize: "1.2rem", fontWeight: "bold", fontFamily: "MontserratBold",
          }}>
            {validacionDialogAsignarFuente.registroPrevio === "Asignacion" ?
              // `\nEl porcentaje de ingreso (${nuevoIngreso}%) no puede ser menor que el utilizado (${usadoIngreso}%) para ${nuevo.fideicomitente.Descripcion}
              // con el ${nuevo.fondoIngreso.Descripcion}.`;

              validacionDialogAsignarFuente.message === "AfectadoTotalIngreso"
                ? "El porcentaje de ingreso no puede ser menor que el utilizado"
                : "El porcentaje del Porcentaje Disponible en Equivalencia Sobre Sin incluir el Monto que Corresponde a los Municipios no puede ser menor que el utilizado"
              : validacionDialogAsignarFuente.message === "AfectadoTotalIngreso"
                ? "Se Excedio el Porcentaje Afectado Sobre el Total de Ingreso"
                : "Se Excedio la Equivalencia Sobre Sin incluir el Monto que Corresponde a los Municipios"}
          </Typography>
        </DialogTitle>


        <DialogContent>
          <HighlightOffSharpIcon sx={{ width: "100%", fontSize: "5rem", color: "red", display: "flex", justifyContent: "center" }}>
          </HighlightOffSharpIcon>

          {validacionDialogAsignarFuente.registroPrevio === "Asignacion" || validacionDialogAsignarFuente.registroPrevio === "SinRegistro" ?

            <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex" }}>
              Por favor, verifica el monto ingresado o modifique el registro de la fuente de pago para aumentar el porcentaje.
              {/* El Porcentaje ingresado es menor al porcentaje utilizado en las disntintas solicitudes inscritas. */}
            </Typography >
            : validacionDialogAsignarFuente.registroPrevio === "PorcentajeAcumulado" ?
              <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex" }}>
                Se ha excedido el 100% porcentaje acumulado disponible del Ente Publico Obligado y Fondo o Ingreso seleccionado.
              </Typography>
              : null
          }

          {validacionDialogAsignarFuente.registroPrevio === "Asignacion" ?
            <Grid>
              <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex", alignItems: "end" }}>
                <br /> Para el ente publico obligado: <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.nombreEntePublicoObligado}.</strong>
              </Typography>
              <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex", alignItems: "end" }}>
                <br /> Con el fondo o Ingreso:  <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.nombreFondoOIngreso}</strong>
              </Typography>

              <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex", alignItems: "end" }}>
                  <br /> Porcentaje Original del Registro:  <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.montoOriginal}%</strong>
                </Typography>
                <Typography sx={{ ...queries.medium_text, justifyContent: "center", display: "flex", alignItems: "end" }}>
                  <br /> Porcentaje Disponible del Registro:  <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.montoOriginal - validacionDialogAsignarFuente.montoUtilizado}%</strong>
                </Typography>
              </Grid>

            </Grid>
            : validacionDialogAsignarFuente.registroPrevio === "PorcentajeAcumulado" ?
              <Grid>
                <Typography sx={{ ...queries.medium_text, justifyContent: "center", width: "100%", display: "flex", alignItems: "end" }}>
                  <br /> Para el ente publico obligado: <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.nombreEntePublicoObligado}</strong>
                </Typography>
                <Typography sx={{ ...queries.medium_text, justifyContent: "center", width: "100%", display: "flex", alignItems: "end" }}>
                  <br /> Con el fondo o ingreso: <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.nombreFondoOIngreso}</strong>
                </Typography>


                <Grid sx={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Typography sx={{ ...queries.medium_text, display: "flex", alignItems: "end" }}>
                    <br /> Porcentaje acumulado utilizado: <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.montoOriginal}%</strong>
                  </Typography>
                  <Typography sx={{ ...queries.medium_text, display: "flex", alignItems: "end" }}>
                    <br /> Porcentaje acumulado ingresado: <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.montoUtilizado}%</strong>
                  </Typography>
                </Grid>
                <Typography sx={{ ...queries.medium_text, display: "flex", justifyContent: "center" }}>
                  <br />  Favor de revisar el porcentaje ingresado.
                </Typography>
              </Grid>
              : validacionDialogAsignarFuente.registroPrevio === "SinRegistro" ?
                <Typography sx={{ ...queries.medium_text }}>
                  <br /> Porcentaje Original del Registro:  <strong>{validacionDialogAsignarFuente.montoOriginal}%</strong>
                </Typography>
                : null
          }
        </DialogContent>

        <DialogActions>
          <Grid display={"flex"} justifyContent={"space-evenly"} width={"100%"}>
            <Button sx={queries.buttonContinuar}
              onClick={() => {
                setValidacionDialogAsignarFuente({
                  ...validacionDialogAsignarFuente,
                  openDialog: !validacionDialogAsignarFuente.openDialog
                });
              }}
            >
              <Typography sx={queries.medium_text}>Aceptar</Typography>
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>


      <ThemeProvider theme={buttonTheme}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </Dialog>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppBar,
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { TransitionProps } from "@mui/material/transitions";
import { GridCloseIcon } from "@mui/x-data-grid";
import { forwardRef, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { DatosGeneralesMandato } from "../panels/DatosGeneralesMandatos";
import { SoporteDocumentalMandato } from "../panels/SoporteDocumental";
import { TipoDeMovimientoMandato } from "../panels/TipoDeMovimiento";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { listFileFuentesPago } from "../../APIS/pathDocSol/APISDocumentos";
import { IDeudorFideicomisoNew, IPorcentajeAcumulados, ISoporteDocumentalFuentePago } from "../../../store/Fideicomiso/fideicomiso";
import { IDeudorMandatoNew } from "../../../store/Mandatos/mandato";
import { IDataAsignacionTipoMoviSolicitudes } from "../../../screens/fuenteDePago/Fideicomisos";
import Swal from "sweetalert2";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOff';

export const DialogTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const buttonTheme = createTheme({
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

export function AgregarMandatos({
  handler,
  openState,
  getMecanismosVehiculosPago,
  DataAsignacionTipoMoviSolicitudes,
  setDataAsignacionTipoMoviSolicitudes,
}: {
  handler: Function;
  openState: boolean;
  getMecanismosVehiculosPago: Function;
  DataAsignacionTipoMoviSolicitudes: IDataAsignacionTipoMoviSolicitudes[];
  setDataAsignacionTipoMoviSolicitudes: Function;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1000)"),
  };

  const IdMandato: string = useMandatoStore((state) => state.idMandato);

  const createMandato: Function = useMandatoStore(
    (state) => state.createMandato
  );

  const modificaMandato: Function = useMandatoStore(
    (state) => state.modificaMandato
  );

  const getMandatos: Function = useMandatoStore((state) => state.getMandatos);


  const [loading, setLoading] = useState(false);

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );


  // const tablaTipoMovimiento: IDeudorMandatoNew[] = useMandatoStore(
  //   (state) => state.tablaTipoMovimientoMandato
  // );


  const tablaSoporteDocumentalMandato: ISoporteDocumentalFuentePago[] = useMandatoStore(
    (state) => state.tablaSoporteDocumentalMandato
  );

  //const idMandato: Function = useMandatoStore((state) => state.idMandato);

  const DetallePorcentajesAcumuladosMultiples: Function = useFideicomisoStore(
    (state) => state.DetallePorcentajesAcumuladosMultiples
  );

  const modificaAsignacionOriginalTipoSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaAsignacionOriginalTipoSolicitud
  );

  const tablaTipoMovimiento: IDeudorMandatoNew[] = useMandatoStore(
    (state) => state.tablaTipoMovimientoMandato
  );

  const cleanPorcentajesAcumulados: Function = useFideicomisoStore(
    (state) => state.cleanPorcentajesAcumulados
  );

  const arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.arregloPorcetajesAcumuladosRegistros
  );

  const TablaPruebaEditarFideicomiso: any[] = useFideicomisoStore(
    (state) => state.TablaPruebaEditarFideicomiso
  );

  const setTablaPruebaEditarFideicomiso: Function = useFideicomisoStore(
    (state) => state.setTablaPruebaEditarFideicomiso
  );

  const cleanTablaPruebaEditarFideicomiso: Function = useFideicomisoStore(
    (state) => state.cleanTablaPruebaEditarFideicomiso
  );
  const [openDialogPorcentajeAcumulado, setOpenPorcentajeAcumulado] = useState(false)
  const [erroresPorcentajeAcumulado, setErroresPorcentajesAcumulados] = useState<Array<string>>([])


  const [validacionDialogAsignarFuente, setValidacionDialogAsignarFuente] = useState({
    openDialog: false,
    registroPrevio: "",
    message: "",
    montoOriginal: 0,
    montoUtilizado: 0,
    nombreEntePublicoObligado: "",
    nombreFondoOIngreso: "",
  });


  useEffect(() => {
    if (IdMandato !== "") {
      DetallePorcentajesAcumuladosMultiples(
        tablaTipoMovimiento.map((reg) => ({
          IdEntePublicoObligado: reg.mandatario.Id,
          IdFondoOIngreso: reg.fondoIngreso.Id,
        })),
        // (datos: any) => {
        //   // Guardarlos en zustand o estado local:
        //   addArregloPorcetajesAcumuladosRegistros(datos);
        // }
      );
    }
  }, [IdMandato]);

  useEffect(() => {
    console.log("DataAsignacionTipoMoviSolicitudes: ", DataAsignacionTipoMoviSolicitudes);
    console.log("tablaTipoMovimiento: ", tablaTipoMovimiento);
  }, [DataAsignacionTipoMoviSolicitudes])


  useEffect(() => {
    getTipoEntePublicoObligado();
    console.log("TablaPruebaEditarFideicomiso: ", TablaPruebaEditarFideicomiso);
  }, []);



  useEffect(() => {
    cleanPorcentajesAcumulados()
  }, [openState === false]);

  const [arr, setArr] = useState<any>([]);


  useEffect(() => {
    if (IdMandato !== "") {
      listFileFuentesPago(process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/MANDATOS/${IdMandato}/`,
        setArr,
        tablaSoporteDocumentalMandato
      ).then(() => {
        setLoading(false);
      });
    }
    console.log("idMandato:", IdMandato);
  }, [IdMandato !== ""]);

  useEffect(() => {
    console.log("arregloPorcetajesAcumuladosRegistros actualizado:", arregloPorcetajesAcumuladosRegistros);
  }, [arregloPorcetajesAcumuladosRegistros]);

  return (
    <Dialog fullScreen open={openState} TransitionComponent={DialogTransition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          {!loading && (
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  handler(false);
                  cleanTablaPruebaEditarFideicomiso([]);
                  setDataAsignacionTipoMoviSolicitudes([]);

                }}
                sx={{ color: "white" }}
              >
                <GridCloseIcon />
              </IconButton>
            </Tooltip>
          )}

          <Grid container>
            <Typography sx={queries.bold_text}>
              {tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instruccion Irrevocable" ? ""
                : IdMandato === "" ? "Agregar" : "Editar"} Mandato
              {/* {IdMandato === "" ? "Agregar" : "Editar"}  */}
            </Typography>
          </Grid>

          <Grid item>
            <ThemeProvider theme={buttonTheme}>
              <Button
                disabled={tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instruccion Irrevocable"}
                sx={queries.buttonContinuar}
                onClick={() => {
                  if (IdMandato === "") {
                    //console.log("CREA MANDATO")
                    setLoading(true);
                    createMandato(() => {
                      setLoading(false);
                      handler(false);
                      getMecanismosVehiculosPago && getMecanismosVehiculosPago("Mandato", () => { })
                    });
                    cleanPorcentajesAcumulados();

                  } else if (IdMandato !== "" && DataAsignacionTipoMoviSolicitudes.length > 0) {
                    // 🟡 SOLO APLICA PARA MODIFICAR
                    let errorEncontrado = false;
                    let mensajeError = "";

                    tablaTipoMovimiento.forEach((nuevo, index) => {
                      console.log("nuevo.fideicomitente.Id :", nuevo.mandatario.Id);
                      console.log("nuevo.fondoIngreso.Id :", nuevo.fondoIngreso.Id);
                      console.log("nuevo.id :", nuevo.id);
                      console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdEntePublicoObligado :`, DataAsignacionTipoMoviSolicitudes[index].IdEntePublicoObligado);
                      console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdFondoIngreso :`, DataAsignacionTipoMoviSolicitudes[index].IdFondoIngreso);
                      console.log(`DataAsignacionTipoMoviSolicitudes[${index}].TipoMoviRelacionado :`, DataAsignacionTipoMoviSolicitudes[index].TipoMovRelacionado);
                      const coincidencia = DataAsignacionTipoMoviSolicitudes.find(
                        (asig) =>
                          asig.IdEntePublicoObligado === nuevo.mandatario.Id &&
                          asig.IdFondoIngreso === nuevo.fondoIngreso.Id &&
                          asig.TipoMovRelacionado === nuevo.id
                      );

                      if (coincidencia) {
                        console.log("coincidencia encontrada1 :", coincidencia);
                        const usadoIngreso = Number(coincidencia.PorcentajeUtilizadoIngreso) || 0;
                        const orignalIngreso = Number(coincidencia.PorcentajeOriginalIngreso) || 0;

                        const usadoEquivalencia = Number(coincidencia.PorcentajeUtilizadoEquivalencia) || 0;
                        const orignalEquivalencia = Number(coincidencia.PorcentajeOriginalEquivalencia) || 0;

                        const nuevoIngreso = Number(nuevo.AfectadoTotalIngreso) || 0;
                        const nuevaEquivalencia = Number(nuevo.EquivalenciaCorrespondienteMunicipios) || 0;




                        if (nuevoIngreso < usadoIngreso) {
                          errorEncontrado = true;
                          //mensajeError += `\nEl porcentaje de ingreso (${nuevoIngreso}%) no puede ser menor que el utilizado (${usadoIngreso}%) para ${nuevo.mandatario.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "Asignacion",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: orignalIngreso,
                            montoUtilizado: usadoIngreso,
                            nombreEntePublicoObligado: nuevo.mandatario.Descripcion,
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
                            nombreEntePublicoObligado: nuevo.mandatario.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                          //mensajeError += `\nEl porcentaje de equivalencia (${nuevaEquivalencia}%) no puede ser menor que el utilizado (${usadoEquivalencia}%) para ${nuevo.mandatario.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                        }
                      }
                      console.log("arregloPorcetajesAcumuladosRegistros x1000:", arregloPorcetajesAcumuladosRegistros);

                      const acumulado = arregloPorcetajesAcumuladosRegistros.find(
                        (acc) =>
                          acc.IdFondoOIngreso === nuevo.fondoIngreso.Id &&
                          acc.IdEntePublicoObligado === nuevo.mandatario.Id
                      );

                      console.log("acumulado encontrado :", acumulado);
                      console.log("TablaPruebaEditarFideicomiso :", TablaPruebaEditarFideicomiso);
                      if (acumulado) {


                        // 🔹 Validación 3: contra porcentajes acumulados (nueva)
                        const registroOriginal = TablaPruebaEditarFideicomiso.flat().find(
                          (acc) =>
                            acc.mandatario.Id === nuevo.mandatario.Id &&
                            acc.fondoIngreso.Id === nuevo.fondoIngreso.Id
                        );

                        const ROIngreso = Number(registroOriginal?.AfectadoTotalIngreso) || 0;
                        const ROEquivalencia = Number(registroOriginal?.EquivalenciaCorrespondienteMunicipios) || 0;

                        const acumuladoIngreso = Number(acumulado.AfectadoTotalIngreso) || 0;
                        const acumuladoEquivalencia = Number(acumulado.EquivalenciaCorrespondienteMunicipios) || 0;

                        const nuevoIngreso = Number(nuevo.AfectadoTotalIngreso) || 0;
                        const nuevaEquivalencia = Number(nuevo.EquivalenciaCorrespondienteMunicipios) || 0;

                        console.log("acumuladoIngreso: ", acumuladoIngreso);
                        console.log("nuevoIngreso: ", nuevoIngreso);
                        console.log("ROIngreso: ", ROIngreso);

                        // 🔸 Si el acumulado + nuevo supera 100, marcar error
                        if (acumuladoIngreso + (nuevoIngreso - ROIngreso) > 100) {
                          // 30 + (80-0) == 30+80 = 110 > 100 se pasa y salta error registro nuevo
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de ingreso acumulado (${acumuladoIngreso}%) más el nuevo (${nuevoIngreso}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: acumuladoIngreso,
                            montoUtilizado: nuevoIngreso,
                            nombreEntePublicoObligado: nuevo.mandatario.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }

                        if (acumuladoEquivalencia + (nuevaEquivalencia - ROEquivalencia) > 100) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de equivalencia acumulado (${acumuladoEquivalencia}%) más el nuevo (${nuevaEquivalencia}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "EquivalenciaCorrespondienteMunicipios",
                            montoOriginal: acumuladoEquivalencia,
                            montoUtilizado: nuevaEquivalencia,
                            nombreEntePublicoObligado: nuevo.mandatario.Descripcion,
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
                      // alert(mensajeError.trim());
                      // setLoading(false);
                      return;
                    } else {
                      // ✅ Si todo está bien, proceder a modificar
                      setLoading(true);
                      modificaAsignacionOriginalTipoSolicitud(
                        IdMandato,
                        tablaTipoMovimiento,
                        "Mandato",
                        setLoading(true),
                        handler(true)
                      ).then(() => {
                        handler(false)
                        setDataAsignacionTipoMoviSolicitudes([]);
                      });
                    }

                  }
                  // else if (IdMandato !== "") {
                  //   console.log("EDITA MANDATO DIRECTO")
                  //   modificaMandato(() => {
                  //     setLoading(false);
                  //     handler(false);
                  //     getMecanismosVehiculosPago && getMecanismosVehiculosPago("Mandato", () => { })
                  //   }).then(() => {
                  //     handler(false)
                  //     setDataAsignacionTipoMoviSolicitudes([]);
                  //     cleanPorcentajesAcumulados();
                  //   });

                  // }
                  setTabIndex(0);
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
                  {tipoMecanismoVehiculoPago === "Mandato" || tipoMecanismoVehiculoPago === "Instruccion Irrevocable" ? ""
                    : IdMandato === "" ? "Agregar" : "Editar"} Mandato
                  {/* {IdMandato === "" ? "Agregar" : "Editar"} Mandato */}
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
          <Tab label="Datos Generales" sx={{ ...queries.bold_text }}></Tab>
          <Tab label="Tipo de Movimiento" sx={{ ...queries.bold_text }}></Tab>
          <Tab label="Soporte Documental" sx={queries.bold_text}></Tab>
        </Tabs>

        {tabIndex === 0 && <DatosGeneralesMandato />}

        {tabIndex === 1 && <TipoDeMovimientoMandato />}

        {tabIndex === 2 && <SoporteDocumentalMandato DocumentosBaseDatos={arr} />}
      </Grid>


      <Dialog open={openDialogPorcentajeAcumulado}>
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
      </Dialog>

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

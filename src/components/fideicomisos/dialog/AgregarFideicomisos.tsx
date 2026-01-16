/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
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
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import {
  DialogTransition,
  buttonTheme,
} from "../../mandatos/dialog/AgregarMandatos";
import { DatoGeneralesFideicomiso } from "../panels/DatosGeneralesFideicomiso";
import { SoporteDocumentalFideicomiso } from "../panels/SoporteDocumental";
import { TipoDeMovimientoFideicomiso } from "../panels/TipoDeMovimiento";
import { IDatosGeneralesFideicomiso, IDeudorFideicomiso, IDeudorFideicomisoNew, IFideicomisario, IPorcentajeAcumulados, ISoporteDocumentalFuentePago } from "../../../store/Fideicomiso/fideicomiso";
import Swal from "sweetalert2";
import { IDataAsignacionTipoMoviSolicitudes } from "../../../screens/fuenteDePago/Fideicomisos";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOff';
import { set } from "date-fns";

export interface IValidacionPorcentajesAcumulados {
  NombreEntePublico: string,
  NombreFondoOIngreso: string,
  AfectadoTotalIngreso: number;
  EquivalenciaCorrespondienteMunicipios: number;
}


export function AgregarFideicomisos({
  handler,
  openState,
  getMecanismosVehiculosPago,
  DataAsignacionTipoMoviSolicitudes,
  setDataAsignacionTipoMoviSolicitudes

}: {
  handler: Function;
  openState: boolean;
  getMecanismosVehiculosPago: Function,
  DataAsignacionTipoMoviSolicitudes: IDataAsignacionTipoMoviSolicitudes[],
  setDataAsignacionTipoMoviSolicitudes: Function;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const [openDialogPorcentajeAcumulado, setOpenPorcentajeAcumulado] = useState(false)

  const [ValidacionPorcentajesAcumulados, setValidacionPorcentajesAcumulados] = useState<Array<IValidacionPorcentajesAcumulados>>([])


  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 700px)"),
  };

  const idFideicomiso: string = useFideicomisoStore(
    (state) => state.idFideicomiso
  );

  const createFideicomiso: Function = useFideicomisoStore(
    (state) => state.createFideicomiso
  );

  const createPorcentajesAcumulados: Function = useFideicomisoStore(
    (state) => state.createPorcentajesAcumulados
  );

  const modificaPorcentajesAcumulados: Function = useFideicomisoStore(
    (state) => state.modificaPorcentajesAcumulados
  );



  const modificarFideicomiso: Function = useFideicomisoStore(
    (state) => state.modificaFideicomiso
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
  const getFondosOIngresos: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );
  const getOrdenesFideicomisario: Function = useFideicomisoStore(
    (state) => state.getOrdenesFideicomisario
  );

  const tablaTipoMovimiento: IDeudorFideicomiso[] = useFideicomisoStore(
    (state) => state.tablaTipoMovimientoFideicomiso
  );

  const tablaFideicomisario: IFideicomisario[] = useFideicomisoStore(
    (state) => state.tablaFideicomisario
  );

  const datosGenerales: IDatosGeneralesFideicomiso = useFideicomisoStore(
    (state) => state.datosGenerales
  );

  const tablaTipoMovimientoFideicomisoNew: IDeudorFideicomisoNew[] = useFideicomisoStore(
    (state) => state.tablaTipoMovimientoFideicomisoNew
  );

  const tablaSoporteDocumentalFideicomiso: ISoporteDocumentalFuentePago[] =
    useFideicomisoStore((state) => state.tablaSoporteDocumentalFideicomiso);



  const arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.arregloPorcetajesAcumuladosRegistros
  );


  const DetallePorcentajesAcumuladosMultiples: Function = useFideicomisoStore(
    (state) => state.DetallePorcentajesAcumuladosMultiples
  );

  const TablaPruebaEditarFideicomiso: IDeudorFideicomisoNew[] = useFideicomisoStore(
    (state) => state.TablaPruebaEditarFideicomiso
  );

  const cleanPorcentajesAcumulados: Function = useFideicomisoStore(
    (state) => state.cleanPorcentajesAcumulados
  );


  const modificaAsignacionOriginalTipoSolicitud: Function = useLargoPlazoStore(
    (state) => state.modificaAsignacionOriginalTipoSolicitud
  );

  const setTablaPruebaEditarFideicomiso: Function = useFideicomisoStore(
    (state) => state.setTablaPruebaEditarFideicomiso
  );
  const cleanTablaPruebaEditarFideicomiso: Function = useFideicomisoStore(
    (state) => state.cleanTablaPruebaEditarFideicomiso
  );

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
    getOrganismos();
    getTipoEntePublicoObligado();
    getOrdenesFideicomisario();
    getTiposDeFuente();
    getFondosOIngresos();
    console.log("TablaPruebaEditarFideicomiso: ", TablaPruebaEditarFideicomiso);
  }, []);

  useEffect(() => {
    console.log("DataAsignacionTipoMoviSolicitudes: ", DataAsignacionTipoMoviSolicitudes);
    console.log("tablaTipoMovimientoFideicomisoNew: ", tablaTipoMovimientoFideicomisoNew);
  }, [DataAsignacionTipoMoviSolicitudes])



  useEffect(() => {
    if (idFideicomiso !== "") {
      DetallePorcentajesAcumuladosMultiples(
        tablaTipoMovimientoFideicomisoNew.map((reg) => ({
          IdEntePublicoObligado: reg.fideicomitente.Id,
          IdFondoOIngreso: reg.fondoIngreso.Id,
        })),
        // (datos: any) => {
        //   // Guardarlos en zustand o estado local:
        //   addArregloPorcetajesAcumuladosRegistros(datos);
        // }
      );
    }
  }, [idFideicomiso]);

  const porcentajeAcumuladoRegistros: IPorcentajeAcumulados = useFideicomisoStore(
    (state) => state.porcentajeAcumuladoRegistros
  );


  useEffect(() => {
    cleanPorcentajesAcumulados()
  }, [openState === false]);

  useEffect(() => {
    console.log("arregloPorcetajesAcumuladosRegistros actualizado:", arregloPorcetajesAcumuladosRegistros);
  }, [arregloPorcetajesAcumuladosRegistros]);


  return (
    <Dialog fullScreen open={openState} TransitionComponent={DialogTransition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Tooltip title="Volver">
            <IconButton
              edge="start"
              onClick={() => {
                cleanTablaPruebaEditarFideicomiso([]);
                setDataAsignacionTipoMoviSolicitudes([]);
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
                {idFideicomiso === "" ? "Agregar" : "Editar"} Fideicomiso
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            {/* <Button sx={{ color: "black" }}
              onClick={() => {
                console.log("arregloPorcetajesAcumuladosRegistros", arregloPorcetajesAcumuladosRegistros)
              }}
            >Prueba de arreglo</Button> */}
            <ThemeProvider theme={buttonTheme}>
              <Button
                disabled={
                  tablaTipoMovimientoFideicomisoNew.length <= 0 ||
                  tablaFideicomisario.length <= 0 ||
                  datosGenerales.numeroFideicomiso === "" ||
                  datosGenerales.tipoFideicomiso.Descripcion === "" ||
                  datosGenerales.fiduciario.Descripcion === "" ||
                  tablaSoporteDocumentalFideicomiso.length <= 0
                }
                sx={queries.buttonContinuar}
                onClick={() => {
                  if (idFideicomiso === "" && arregloPorcetajesAcumuladosRegistros.length > 0) {
                    let errorEncontrado = false;
                    let mensajeError = "";

                    tablaTipoMovimientoFideicomisoNew.forEach((nuevo) => {

                      // 🔹 Validación 2: contra porcentajes acumulados (nueva)
                      const acumulado = arregloPorcetajesAcumuladosRegistros.find(
                        (acc) =>
                          acc.IdFondoOIngreso === nuevo.fondoIngreso.Id &&
                          acc.IdEntePublicoObligado === nuevo.fideicomitente.Id
                      );

                      console.log("acumulado encontrado :", acumulado);

                      if (acumulado) {

                        // 🔹 Validación 3: contra porcentajes acumulados (nueva)
                        const registroOriginal = TablaPruebaEditarFideicomiso.flat().find(
                          (acc) =>
                            acc.fideicomitente.Id === nuevo.fideicomitente.Id &&
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


                        //console.log("ROEquivalencia: ", ROEquivalencia);



                        // 🔸 Si el acumulado + nuevo supera 100, marcar error

                        //acumuladoIngreso (El porcentaje acumulado que tiene este ente plublico con el fondo o ingreso) 90
                        //nuevoIngreso (lo que ingresa el usuario) Ejemplo 15 que son 5% mas 
                        //registro original (El que originalmente tenia el tipo de movimiento) 10

                        //nuevoIngreso - registro original (15 - 10 = 5) 
                        // acumuladoIngreso + (nuevoIngreso - registro original) <= 100

                        //nuevoIngreso - registro original (20 - 10 = 10) 
                        //90 + (20-10) = 100 ok
                        // acumuladoIngreso + (nuevoIngreso - registro original) <= 100

                        // 15 - 10 === 5 + 90 <= 100 = 95 no hay error

                        // if (acumuladoIngreso + nuevoIngreso > 100) {

                        if (acumuladoIngreso + (nuevoIngreso - ROIngreso) > 100) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de ingreso acumulado (${acumuladoIngreso}%) más el nuevo (${nuevoIngreso}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: acumuladoIngreso,
                            montoUtilizado: nuevoIngreso,
                            nombreEntePublicoObligado: nuevo.fideicomitente.Descripcion,
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
                            nombreEntePublicoObligado: nuevo.fideicomitente.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }
                      }
                    });

                    if (errorEncontrado) {

                      return;
                    } else {
                      // ✅ Si todo pasa las validaciones:
                      setLoading(true);
                      createFideicomiso(() => {
                        setLoading(false);
                        handler(false);
                        getMecanismosVehiculosPago &&
                          getMecanismosVehiculosPago("Fideicomisos", () => { });
                      });
                      cleanPorcentajesAcumulados();
                      setDataAsignacionTipoMoviSolicitudes([]);
                    }
                    // CREAR FIDEICOMISO (sin validaciones)
                    // setLoading(true);
                    // createFideicomiso(() => {
                    //   setLoading(false);
                    //   handler(false);
                    //   getMecanismosVehiculosPago &&
                    //     getMecanismosVehiculosPago("Fideicomisos", () => { });
                    // });
                    // cleanPorcentajesAcumulados();
                  } else if (idFideicomiso === "") {
                    setLoading(true);
                    createFideicomiso(() => {
                      setLoading(false);
                      handler(false);
                      getMecanismosVehiculosPago &&
                        getMecanismosVehiculosPago("Fideicomisos", () => { });
                    });
                    cleanPorcentajesAcumulados();
                    setDataAsignacionTipoMoviSolicitudes([]);
                  }
                  //DE AQUI VIENE EL ERROR
                  else if (idFideicomiso !== "" && (DataAsignacionTipoMoviSolicitudes.length > 0 || arregloPorcetajesAcumuladosRegistros.length > 0)) {
                    let errorEncontrado = false;
                    let mensajeError = "";

                    tablaTipoMovimientoFideicomisoNew.forEach((nuevo) => {
                      // 🔹 Validación 1: contra asignaciones de solicitudes (ya existente)
                      const coincidencia = DataAsignacionTipoMoviSolicitudes.find(
                        (asig) =>
                          asig.IdEntePublicoObligado === nuevo.fideicomitente.Id &&
                          asig.IdFondoIngreso === nuevo.fondoIngreso.Id &&
                          asig.TipoMovRelacionado === nuevo.id
                      );

                      const usadoIngreso = Number(coincidencia?.PorcentajeUtilizadoIngreso) || 0;
                      const orignalIngreso = Number(coincidencia?.PorcentajeOriginalIngreso) || 0;

                      const usadoEquivalencia = Number(coincidencia?.PorcentajeUtilizadoEquivalencia) || 0;
                      const orignalEquivalencia = Number(coincidencia?.PorcentajeOriginalEquivalencia) || 0;

                      const nuevoIngreso = Number(nuevo.AfectadoTotalIngreso) || 0;
                      const nuevaEquivalencia = Number(nuevo.EquivalenciaCorrespondienteMunicipios) || 0;

                      if (coincidencia) {

                        console.log("usadoIngreso: ", usadoIngreso);

                        //50 < 60 == SALTA ERROR
                        //60 < 50 == NO SALTA ERROR


                        if (nuevoIngreso < usadoIngreso) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de ingreso (${nuevoIngreso}%) no puede ser menor que el utilizado (${usadoIngreso}%) para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;

                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "Asignacion",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: orignalIngreso,
                            montoUtilizado: usadoIngreso,
                            nombreEntePublicoObligado: nuevo.fideicomitente.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });

                        }

                        if (nuevaEquivalencia < usadoEquivalencia) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de equivalencia (${nuevaEquivalencia}%) no puede ser menor que el utilizado (${usadoEquivalencia}%) para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "Asignacion",
                            message: "EquivalenciaCorrespondienteMunicipios",
                            montoOriginal: orignalEquivalencia,
                            montoUtilizado: usadoEquivalencia,
                            nombreEntePublicoObligado: nuevo.fideicomitente.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }
                      }

                      // 🔹 Validación 2: contra porcentajes acumulados (nueva)
                      const acumulado = arregloPorcetajesAcumuladosRegistros.find(
                        (acc) =>
                          acc.IdFondoOIngreso === nuevo.fondoIngreso.Id &&
                          acc.IdEntePublicoObligado === nuevo.fideicomitente.Id
                      );
                      console.log("acumulado encontrado EDITAR :", acumulado);

                      if (acumulado) {

                        // 🔹 Validación 3: contra porcentajes acumulados (nueva)
                        const registroOriginal = TablaPruebaEditarFideicomiso.flat().find(
                          (acc) =>
                            acc.fideicomitente.Id === nuevo.fideicomitente.Id &&
                            acc.fondoIngreso.Id === nuevo.fondoIngreso.Id
                        );

                        const ROIngreso = Number(registroOriginal?.AfectadoTotalIngreso) || 0;
                        const ROEquivalencia = Number(registroOriginal?.EquivalenciaCorrespondienteMunicipios) || 0;

                        const acumuladoIngreso = Number(acumulado.AfectadoTotalIngreso) || 0;
                        const acumuladoEquivalencia = Number(acumulado.EquivalenciaCorrespondienteMunicipios) || 0;

                        const nuevoIngreso = Number(nuevo.AfectadoTotalIngreso) || 0;
                        const nuevaEquivalencia = Number(nuevo.EquivalenciaCorrespondienteMunicipios) || 0;




                        //console.log("ROEquivalencia: ", ROEquivalencia);
                        // 🔸 Si el acumulado + nuevo supera 100, marcar error

                        //acumuladoIngreso (El porcentaje acumulado que tiene este ente plublico con el fondo o ingreso) 90
                        //nuevoIngreso (lo que ingresa el usuario) Ejemplo 15 que son 5% mas 
                        //registro original (El que originalmente tenia el tipo de movimiento) 10

                        //nuevoIngreso - registro original (15 - 10 = 5) 
                        // acumuladoIngreso + (nuevoIngreso - registro original) <= 100

                        //nuevoIngreso - registro original (20 - 10 = 10) 
                        //90 + (20-10) = 100 ok
                        // acumuladoIngreso + (nuevoIngreso - registro original) <= 100
                        // 15 - 10 === 5 + 90 <= 100 = 95 no hay error
                        // if (acumuladoIngreso + nuevoIngreso > 100) {
                        console.log("usadoIngreso: ", usadoIngreso);
                        console.log("acumuladoIngreso: ", acumuladoIngreso);
                        console.log("nuevoIngreso: ", nuevoIngreso);
                        console.log("ROIngreso: ", ROIngreso);

                        //    acumuladoIngreso   +   nuevoIngreso - ROIngreso(Eliminado) + UTILIZADO

                        //30          +          90      -  0 // REGISTRO NUEVO ESTO ESTA BIEN *****
                        //30         +          90      -  0  === // REGISTRO EDITABLE SIN ASIGNACION NO ESTA BIEN 
                        //30         +          90      -  10 === // REGISTRO EDITABLE CON ASIGNACION UTILIZADO ESTO ESTA BIEN *****  

                        // 50  +    60    - 0  === 110 SALTARA ERROR, REGISTRO EDITABLE SIN ASIGNACION 
                        // 50  +    60    - 30 === 80 REGISTRO EDITABLE CON ASIGNACION UTILIZADO DONDE TIENE PORCENTAJE ACUMULADO EN ESA FUENTE DE PAGO

                        // 60 - 100 = 40 + 50 - 30 === 60
                        //30 - 100 = 70 + 90 - 30 = 130
                        //Antes ROIngreso(Registro Original Ingreso)
                        if (acumuladoIngreso + (nuevoIngreso - usadoIngreso) > 100) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de ingreso acumulado (${acumuladoIngreso}%) más el nuevo (${nuevoIngreso}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "AfectadoTotalIngreso",
                            montoOriginal: acumuladoIngreso,
                            montoUtilizado: nuevoIngreso,
                            nombreEntePublicoObligado: nuevo.fideicomitente.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }
                        //Antes ROEquivalencia(Registro Original Equivalencia)
                        if (acumuladoEquivalencia + (nuevaEquivalencia - usadoEquivalencia) > 100) {
                          errorEncontrado = true;
                          // mensajeError += `\nEl porcentaje de equivalencia acumulado (${acumuladoEquivalencia}%) más el nuevo (${nuevaEquivalencia}%) supera el 100% permitido para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
                          setValidacionDialogAsignarFuente({
                            openDialog: true,
                            registroPrevio: "PorcentajeAcumulado",
                            message: "EquivalenciaCorrespondienteMunicipios",
                            montoOriginal: acumuladoEquivalencia,
                            montoUtilizado: nuevaEquivalencia,
                            nombreEntePublicoObligado: nuevo.fideicomitente.Descripcion,
                            nombreFondoOIngreso: nuevo.fondoIngreso.Descripcion,
                          });
                        }
                      }
                    });

                    if (errorEncontrado) {
                      // Swal.fire({
                      //   confirmButtonText: "Cerrar",
                      //   confirmButtonColor: "rgb(175, 140, 85)",
                      //   icon: "error",
                      //   title: "Porcentaje inválido",
                      //   text: mensajeError.trim(),
                      // });
                      return;
                    } else {
                      // ✅ Si todo pasa las validaciones:
                      setLoading(true);
                      modificaAsignacionOriginalTipoSolicitud(
                        idFideicomiso,
                        tablaTipoMovimientoFideicomisoNew,
                        "Fideicomiso",
                        setLoading(true),
                        handler(true)
                      ).then(() => {
                        handler(false);
                      });
                      cleanPorcentajesAcumulados();
                      setDataAsignacionTipoMoviSolicitudes([]);
                    }


                  } else if (idFideicomiso !== "") {
                    modificarFideicomiso(
                      setLoading(false),
                      handler(false),
                      getMecanismosVehiculosPago && getMecanismosVehiculosPago("Fideicomisos", () => { })
                    )
                  }
                  setTabIndex(0);
                }}


              // }else if (idFideicomiso !== "" && DataAsignacionTipoMoviSolicitudes.length > 0) {
              //   // 🟡 SOLO APLICA PARA MODIFICAR
              //   let errorEncontrado = false;
              //   let mensajeError = "";

              //   tablaTipoMovimientoFideicomisoNew.forEach((nuevo, index) => {
              //     // console.log("nuevo.fideicomitente.Id :", nuevo.fideicomitente.Id);
              //     // console.log("nuevo.fondoIngreso.Id :", nuevo.fondoIngreso.Id);
              //     // console.log("nuevo.id :", nuevo.id);
              //     // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdEntePublicoObligado :`, DataAsignacionTipoMoviSolicitudes[index].IdEntePublicoObligado);
              //     // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].IdFondoIngreso :`, DataAsignacionTipoMoviSolicitudes[index].IdFondoIngreso);
              //     // console.log(`DataAsignacionTipoMoviSolicitudes[${index}].TipoMoviRelacionado :`, DataAsignacionTipoMoviSolicitudes[index].TipoMovRelacionado);
              //     const coincidencia = DataAsignacionTipoMoviSolicitudes.find(
              //       (asig) =>
              //         asig.IdEntePublicoObligado === nuevo.fideicomitente.Id &&
              //         asig.IdFondoIngreso === nuevo.fondoIngreso.Id &&
              //         asig.TipoMovRelacionado === nuevo.id
              //     );

              //     console.log("coincidencia encontrada :", coincidencia);

              //     if (coincidencia !== undefined) {
              //       console.log("coincidencia encontrada1 :", coincidencia);
              //       const usadoIngreso = coincidencia.PorcentajeUtilizadoIngreso;
              //       const usadoEquivalencia = coincidencia.PorcentajeUtilizadoEquivalencia;
              //       const nuevoIngreso = nuevo.AfectadoTotalIngreso;
              //       const nuevaEquivalencia = nuevo.EquivalenciaCorrespondienteMunicipios ?? 0;

              //       if (nuevoIngreso < usadoIngreso) {
              //         errorEncontrado = true;
              //         mensajeError += `\nEl porcentaje de ingreso (${nuevoIngreso}%) no puede ser menor que el utilizado (${usadoIngreso}%) para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
              //       }

              //       if (nuevaEquivalencia < usadoEquivalencia) {
              //         errorEncontrado = true;
              //         mensajeError += `\nEl porcentaje de equivalencia (${nuevaEquivalencia}%) no puede ser menor que el utilizado (${usadoEquivalencia}%) para ${nuevo.fideicomitente.Descripcion} con el ${nuevo.fondoIngreso.Descripcion}.`;
              //       }
              //     }
              //   });

              //   if (errorEncontrado = true) {
              //     Swal.fire({
              //       confirmButtonText: "Cerrar",
              //       confirmButtonColor: "rgb(175, 140, 85)",
              //       //cancelButtonColor: "rgb(175, 140, 85)",
              //       icon: "error",
              //       title: "Porcentaje Inválido",
              //       text: mensajeError.trim(),
              //     });
              //     // alert(mensajeError.trim());
              //    // setLoading(false);
              //     return;
              //   } 
              //   // ✅ Si todo está bien, proceder a modificar
              //   setLoading(true);
              //   modificaAsignacionOriginalTipoSolicitud(
              //     idFideicomiso,
              //     tablaTipoMovimientoFideicomisoNew,
              //     "Fideicomiso",
              //     setLoading(true),
              //     handler(true)
              //   ).then(() => {
              //      handler(false)
              //   });
              //   cleanPorcentajesAcumulados();
              // } 

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
                  {idFideicomiso === "" ? "Agregar" : "Editar"} Fideicomiso
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
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{ width: "100%", fontSize: ".8rem" }}
        >
          <Tab label="Datos Generales" sx={queries.bold_text}></Tab>
          <Tab label="Tipo de Movimiento" sx={queries.bold_text}></Tab>
          <Tab label="Soporte Documental" sx={queries.bold_text}></Tab>
        </Tabs>

        {tabIndex === 0 && <DatoGeneralesFideicomiso />}

        {tabIndex === 1 && <TipoDeMovimientoFideicomiso />}

        {tabIndex === 2 && <SoporteDocumentalFideicomiso />}
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
                    <br /> Porcentaje ingresado: <strong style={{ marginLeft: ".5rem" }}>{validacionDialogAsignarFuente.montoUtilizado}%</strong>
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

      {/* <ThemeProvider theme={buttonTheme}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider> */}
    </Dialog>
  );
}

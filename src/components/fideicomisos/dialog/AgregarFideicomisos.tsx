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
import { IDatosGeneralesFideicomiso, IDeudorFideicomiso, IDeudorFideicomisoNew, IFideicomisario, IPorcentajeAcumulados, ISoporteDocumentalFideicomiso } from "../../../store/Fideicomiso/fideicomiso";
import Swal from "sweetalert2";


export function AgregarFideicomisos({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  const [openDialogPorcentajeAcumulado, setOpenPorcentajeAcumulado] = useState(false)


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

  const tablaSoporteDocumentalFideicomiso: ISoporteDocumentalFideicomiso[] =
    useFideicomisoStore((state) => state.tablaSoporteDocumentalFideicomiso);



  const arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.arregloPorcetajesAcumuladosRegistros
  );


  const addArregloPorcetajesAcumuladosRegistros: Function = useFideicomisoStore(
    (state) => state.addArregloPorcetajesAcumuladosRegistros
  );

  const DetallePorcentajesAcumuladosMultiples: Function = useFideicomisoStore(
    (state) => state.DetallePorcentajesAcumuladosMultiples
  );

  const TablaPruebaEditarFideicomiso: IPorcentajeAcumulados[] = useFideicomisoStore(
    (state) => state.TablaPruebaEditarFideicomiso
  );

  const cleanPorcentajesAcumulados: Function = useFideicomisoStore(
    (state) => state.cleanPorcentajesAcumulados
  );





  const [erroresPorcentajeAcumulado, setErroresPorcentajesAcumulados] = useState<Array<string>>([])

  const manejarFlujoDeEnvio = (errores: string[]) => {
    // ✅ SOLO AQUÍ evaluamos si hay errores, después de haber recorrido todos
    console.log(" CreacionFideicomisos errores", errores)

    if (errores.length === 0) {
      if (idFideicomiso === "") {
        console.log("✅ Todos los registros son válidos. Procediendo a guardar...");
        createPorcentajesAcumulados(handler());
      } else {
        console.log("✅ Todos los registros son válidos. Procediendo a modificar...");
        modificaPorcentajesAcumulados(handler());
      }
    } else {
      console.warn("❌ Errores encontrados:");
      errores.forEach(e => console.warn(e));

      setOpenPorcentajeAcumulado(true)
      alert("No se puede guardar. Hay entes con porcentajes que superan el 100%. Revisa la consola.");
    }
  }

  const validarPorcentajesAlEditar = (
    registrosEditados: IDeudorFideicomisoNew[],
    porcentajesBaseOriginal: IPorcentajeAcumulados[],
    acumuladosDesdeBD: IPorcentajeAcumulados[] // estos son los actuales en la BD
  ) => {
    console.log("validarPorcentajesAlEditar registrosEditados", registrosEditados)
    console.log("validarPorcentajesAlEditar porcentajesBaseOriginal", porcentajesBaseOriginal)
    console.log("validarPorcentajesAlEditar acumuladosDesdeBD", acumuladosDesdeBD)

    const limpiarNumero = (valor: string | number | undefined): number => {
      if (valor === undefined || valor === null) return 0;

      // Elimina espacios, comillas, ceros iniciales innecesarios
      const limpio = valor.toString().trim().replace(/[^\d.-]/g, "");

      const numero = parseFloat(limpio);
      return isNaN(numero) ? 0 : numero;
    };

    const errores: string[] = [];

    const combinacionesUnicas = registrosEditados.reduce((acc: string[], reg) => {
      const clave = `${reg.fideicomitente.Id}|||${reg.fondoIngreso.Id}`;
      if (!acc.includes(clave)) acc.push(clave);
      return acc;
    }, []);

    combinacionesUnicas.forEach((clave) => {
      const [enteId, fondoId] = clave.split("|||");

      const original = porcentajesBaseOriginal.find(
        (r) => r.IdEntePublicoObligado === enteId && r.IdFondoOIngreso === fondoId
      );


      const actualBD = acumuladosDesdeBD.find(
        (r) => r.IdEntePublicoObligado === enteId && r.IdFondoOIngreso === fondoId
      );

      const editadosCoincidentes = registrosEditados.filter(
        (r) => r.fideicomitente.Id === enteId && r.fondoIngreso.Id === fondoId
      );

      const nuevoAfectado = editadosCoincidentes.reduce(
        (acc, r) => acc + limpiarNumero(r.AfectadoTotalIngreso),
        0
      );

      const nuevoEquivalente = editadosCoincidentes.reduce(
        (acc, r) => acc + limpiarNumero(r.EquivalenciaCorrespondienteMunicipios),
        0
      );

      const originalAfectado = limpiarNumero(original?.AfectadoTotalIngreso);
      const originalEquivalente = limpiarNumero(original?.EquivalenciaCorrespondienteMunicipios);

      const totalBD_Afectado = limpiarNumero(actualBD?.AfectadoTotalIngreso);
      const totalBD_Equivalente = limpiarNumero(actualBD?.EquivalenciaCorrespondienteMunicipios);

      const totalAfectadoFinal = totalBD_Afectado - originalAfectado + nuevoAfectado;
      const totalEquivalenteFinal = totalBD_Equivalente - originalEquivalente + nuevoEquivalente;

      console.log("➡ total final Afectado:", totalAfectadoFinal);
      console.log("➡ total final Equivalente:", totalEquivalenteFinal);

      if (totalAfectadoFinal > 100) {
        errores.push(
          `La combinación Ente '${editadosCoincidentes[0].fideicomitente.Descripcion}' y Fondo '${editadosCoincidentes[0].fondoIngreso.Descripcion}' supera el 100% en AfectadoTotalIngreso (${totalAfectadoFinal.toFixed(2)}%).`
        );
      }

      if (totalEquivalenteFinal > 100) {
        errores.push(
          `La combinación Ente '${editadosCoincidentes[0].fideicomitente.Descripcion}' y Fondo '${editadosCoincidentes[0].fondoIngreso.Descripcion}' supera el 100% en EquivalenciaCorrespondienteMunicipios (${totalEquivalenteFinal.toFixed(2)}%).`
        );
      }
    });



    //return manejarFlujoDeEnvio(errores);
    ;
  };



  // const validarPorcentajesAlEditar = (
  //   registrosEditados: IDeudorFideicomisoNew[],
  //   porcentajesBaseOriginal: IPorcentajeAcumulados[],
  //   arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[] // Los traídos del SP múltiple
  // ) => {
  //   const limpiarNumero = (valor: string | number | undefined): number => {
  //     return Number((valor ?? "0").toString().trim());
  //   };

  //   const errores: string[] = [];

  //   const combinacionesUnicas = registrosEditados.reduce((acc: string[], reg) => {
  //     const clave = `${reg.fideicomitente.Id}|||${reg.fondoIngreso.Id}`;
  //     if (!acc.includes(clave)) acc.push(clave);
  //     return acc;
  //   }, []);

  //   combinacionesUnicas.forEach((clave) => {
  //     const [enteId, fondoId] = clave.split("|||");

  //     const original = porcentajesBaseOriginal.find(
  //       (r) =>
  //         r.IdEntePublicoObligado === enteId &&
  //         r.IdFondoOIngreso === fondoId
  //     );

  //     const editadosCoincidentes = registrosEditados.filter(
  //       (r) =>
  //         r.fideicomitente.Id === enteId &&
  //         r.fondoIngreso.Id === fondoId
  //     );

  //     const acumuladoEnBase = arregloPorcetajesAcumuladosRegistros.find(
  //       (b) =>
  //         b.IdEntePublicoObligado === enteId &&
  //         b.IdFondoOIngreso === fondoId
  //     );

  //     const nuevoAfectado = editadosCoincidentes.reduce(
  //       (acc, r) => acc + limpiarNumero(r.AfectadoTotalIngreso),
  //       0
  //     );

  //     const nuevoEquivalente = editadosCoincidentes.reduce(
  //       (acc, r) => acc + limpiarNumero(r.EquivalenciaCorrespondienteMunicipios),
  //       0
  //     );

  //     const originalAfectado = limpiarNumero(original?.AfectadoTotalIngreso);
  //     const originalEquivalente = limpiarNumero(original?.EquivalenciaCorrespondienteMunicipios);

  //     const acumuladoAfectadoBase = limpiarNumero(acumuladoEnBase?.AfectadoTotalIngreso);
  //     const acumuladoEquivalenteBase = limpiarNumero(acumuladoEnBase?.EquivalenciaCorrespondienteMunicipios);

  //     const totalAfectadoFinal = acumuladoAfectadoBase - originalAfectado + nuevoAfectado;
  //     const totalEquivalenteFinal = acumuladoEquivalenteBase - originalEquivalente + nuevoEquivalente;

  //     console.log("➡ COMBINACIÓN:", clave);
  //     console.log("➡ Afectado - base:", acumuladoAfectadoBase, "| original:", originalAfectado, "| nuevo:", nuevoAfectado, "| totalFinal:", totalAfectadoFinal);
  //     console.log("➡ Equivalente - base:", acumuladoEquivalenteBase, "| original:", originalEquivalente, "| nuevo:", nuevoEquivalente, "| totalFinal:", totalEquivalenteFinal);

  //     if (totalAfectadoFinal > 100) {
  //       errores.push(
  //         `La combinación Ente '${editadosCoincidentes[0].fideicomitente.Descripcion}' y Fondo '${editadosCoincidentes[0].fondoIngreso.Descripcion}' supera el 100% en AfectadoTotalIngreso (${totalAfectadoFinal}%).`
  //       );
  //     }

  //     if (totalEquivalenteFinal > 100) {
  //       errores.push(
  //         `La combinación Ente '${editadosCoincidentes[0].fideicomitente.Descripcion}' y Fondo '${editadosCoincidentes[0].fondoIngreso.Descripcion}' supera el 100% en EquivalenciaCorrespondienteMunicipios (${totalEquivalenteFinal}%).`
  //       );
  //     }
  //   });

  //   console.log("❗Errores encontrados al editar:", errores);
  //   setErroresPorcentajesAcumulados(errores);
  //   return manejarFlujoDeEnvio(errores)

  // };

  const validarPorcentajesAntesDeGuardar = (
    nuevosRegistros: IDeudorFideicomisoNew[],
    arregloBase: IPorcentajeAcumulados[]
  ) => {
    const limpiarNumero = (valor: string | number | undefined): number => {
      return Number((valor ?? "0").toString().trim());
    };

    const errores: string[] = [];

    // Usamos un separador seguro para evitar cortar los UUIDs
    const combinacionesUnicas = nuevosRegistros.reduce((acc: string[], reg) => {
      const clave = `${reg.fideicomitente.Id}|||${reg.fondoIngreso.Id}`;
      if (!acc.includes(clave)) acc.push(clave);
      return acc;
    }, []);

    combinacionesUnicas.forEach((clave) => {
      const [enteId, fondoId] = clave.split("|||");

      const existente = arregloBase.find(
        (base) =>
          base.IdEntePublicoObligado === enteId &&
          base.IdFondoOIngreso === fondoId
      );

      const registrosNuevosCoincidentes = nuevosRegistros.filter(
        (nuevo) =>
          nuevo.fideicomitente.Id === enteId &&
          nuevo.fondoIngreso.Id === fondoId
      );

      const sumaAfectadoTotalNuevos = registrosNuevosCoincidentes.reduce(
        (acc, r) => acc + limpiarNumero(r.AfectadoTotalIngreso),
        0
      );

      const sumaEquivalenciaNuevos = registrosNuevosCoincidentes.reduce(
        (acc, r) => acc + limpiarNumero(r.EquivalenciaCorrespondienteMunicipios),
        0
      );

      const sumaTotalAfectado =
        limpiarNumero(existente?.AfectadoTotalIngreso) +
        sumaAfectadoTotalNuevos;

      const sumaTotalEquivalente =
        limpiarNumero(existente?.EquivalenciaCorrespondienteMunicipios) +
        sumaEquivalenciaNuevos;

      console.log("➡ EXISTENTE encontrado:", existente);
      console.log("➡ sumaTotalAfectado:", sumaTotalAfectado);
      console.log("➡ sumaTotalEquivalente:", sumaTotalEquivalente);

      if (sumaTotalAfectado > 100) {
        errores.push(
          `La combinación Ente '${registrosNuevosCoincidentes[0].fideicomitente.Descripcion}' y Fondo '${registrosNuevosCoincidentes[0].fondoIngreso.Descripcion}' supera el 100% en AfectadoTotalIngreso (${sumaTotalAfectado}%).`
        );
      }

      if (sumaTotalEquivalente > 100) {
        errores.push(
          `La combinación Ente '${registrosNuevosCoincidentes[0].fideicomitente.Descripcion}' y Fondo '${registrosNuevosCoincidentes[0].fondoIngreso.Descripcion}' supera el 100% en EquivalenciaCorrespondienteMunicipios (${sumaTotalEquivalente}%).`
        );
      }
    });

    console.log("Errores encontrados:", errores);

    setErroresPorcentajesAcumulados(errores);
    return manejarFlujoDeEnvio(errores); // descomenta si quieres cortar flujo aquí
  };

  const buttonAgregarNew = () => {

    console.log("buttonAgregarNew arregloPorcetajesAcumuladosRegistros", arregloPorcetajesAcumuladosRegistros)
    console.log("buttonAgregarNew tablaTipoMovimientoFideicomisoNew", tablaTipoMovimientoFideicomisoNew)
    console.log("buttonAgregarNew TablaPruebaEditarFideicomiso", TablaPruebaEditarFideicomiso)

    if (tablaTipoMovimientoFideicomisoNew.length > 0 && arregloPorcetajesAcumuladosRegistros.length > 0) {

      if (idFideicomiso === "") {
        validarPorcentajesAntesDeGuardar(tablaTipoMovimientoFideicomisoNew,
          arregloPorcetajesAcumuladosRegistros)
      } else if (idFideicomiso !== "") {
        validarPorcentajesAlEditar(
          tablaTipoMovimientoFideicomisoNew,
          TablaPruebaEditarFideicomiso,
          arregloPorcetajesAcumuladosRegistros // total en la base
        );
      }
    }
    setTabIndex(1);
  }


  useEffect(() => {
    getOrganismos();
    getTipoEntePublicoObligado();
    getOrdenesFideicomisario();
    getTiposDeFuente();
    getFondosOIngresos();
    console.log("TablaPruebaEditarFideicomiso: ", TablaPruebaEditarFideicomiso);
  }, []);


  useEffect(() => {

    console.log("IdFideicomiso1: ", idFideicomiso);
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
    console.log("arregloPorcetajesAcumuladosRegistros: ",
      arregloPorcetajesAcumuladosRegistros);
  }, [idFideicomiso]);

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
                  buttonAgregarNew()

                  // if (IdFideicomiso === "") {
                  //   //createFideicomiso(handler())
                  //   createPorcentajesAcumulados(handler())

                  //   // setLoading(true);
                  //   // createFideicomiso(() => {
                  //   //  // setLoading(false);
                  //   //   handler(false);
                  //   // });
                  // } else if (IdFideicomiso !== "") {
                  //   modificarFideicomiso();
                  //   // setLoading(true);
                  //   // modificarFideicomiso(() => {
                  //   //  // setLoading(false);
                  //   //   handler(false);
                  //   // });
                  // }
                  // setTabIndex(0);
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
              setOpenPorcentajeAcumulado(false)
            }}
          >
            Cerrar
          </Button>

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

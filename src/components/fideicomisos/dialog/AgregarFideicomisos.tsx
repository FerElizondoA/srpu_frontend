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


export function AgregarFideicomisos({
  handler,
  openState,
  getMecanismosVehiculosPago,
}: {
  handler: Function;
  openState: boolean;
  getMecanismosVehiculosPago: Function
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

  const tablaSoporteDocumentalFideicomiso: ISoporteDocumentalFuentePago[] =
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


  useEffect(() => {
    getOrganismos();
    getTipoEntePublicoObligado();
    getOrdenesFideicomisario();
    getTiposDeFuente();
    getFondosOIngresos();
    //console.log("TablaPruebaEditarFideicomiso: ", TablaPruebaEditarFideicomiso);
  }, []);


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

  useEffect(() => {
    cleanPorcentajesAcumulados()
  }, [openState === false]);

  // useEffect(() => {
  //   console.log("arregloPorcetajesAcumuladosRegistros actualizado:", arregloPorcetajesAcumuladosRegistros);
  // }, [arregloPorcetajesAcumuladosRegistros]);


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
                  // buttonAgregarNew()

                  if (idFideicomiso === "") {
                    //createFideicomiso(handler())
                    //createPorcentajesAcumulados(handler())
                    setLoading(true);
                    createFideicomiso(() => {
                      setLoading(false);
                      handler(false);
                      getMecanismosVehiculosPago && getMecanismosVehiculosPago("Fideicomisos", () => { })

                    });
                  } else if (idFideicomiso !== "") {
                    //modificarFideicomiso();
                    setLoading(true);
                    modificarFideicomiso(() => {
                      setLoading(false);
                      handler(false);
                      getMecanismosVehiculosPago && getMecanismosVehiculosPago("Fideicomisos", () => { })

                    });
                  }
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

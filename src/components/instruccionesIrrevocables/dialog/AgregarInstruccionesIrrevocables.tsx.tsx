/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppBar,
  Button,
  Dialog,
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
import { TransitionProps } from "@mui/material/transitions";
import { GridCloseIcon } from "@mui/x-data-grid";
import { forwardRef, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { DatosGeneralesIntrucciones } from "../panels/DatosGeneralesIntrucciones";
import { TipoDeMovimientoIntrucciones } from "../panels/TipoDeMovimientoIntrucciones";
import { TipoMovimientoInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { SoporteDocumentalInstrucciones } from "../panels/SoporteDocumentalInstrucciones";

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

export function AgregarInstruccionesIrrevocables({
  handler,
  openState,
  accion,
}: {
  handler: Function;
  openState: boolean;
  accion: string;
}) {
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  const [tabIndex, setTabIndex] = useState(0);

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

  const createInstruccion: Function = useInstruccionesStore(
    (state) => state.createInstruccion
  );

  //TIPO DE MOVIMIENTO
  const tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[] =
    useInstruccionesStore((state) => state.tablaTipoMovimientoInstrucciones);

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

  const municipio: { Id: string; Descripcion: string } = useInstruccionesStore(
    (state) => state.generalInstrucciones.municipio
  );

  // const setGeneralInstruccion: Function = useInstruccionesStore(
  //   (state) => state.setGeneralInstruccion
  // );

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getMunicipiosUOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

  const modificaInstruccion: Function = useInstruccionesStore(
    (state) => state.modificaInstruccion
  );

  // const addTipoMovimientoInstrucciones: Function = useInstruccionesStore(
  //   (state) => state.addTipoMovimientoInstrucciones
  // );

  // const setTipoMovimientoInstrucciones: Function = useInstruccionesStore(
  //   (state) => state.setTipoMovimientoInstrucciones
  // );

  const cleanInstruccion: Function = useInstruccionesStore(
    (state) => state.cleanInstruccion
  );

  // const limpiaInstruccion = () => {
  //   setGeneralInstruccion({
  //     numeroCuenta: "",
  //     cuentaCLABE: "",
  //     banco: { Id: "", Descripcion: "" },
  //     mecanismo: "",
  //     municipio: { Id: "", Descripcion: "" },
  //   })

  //   addTipoMovimientoInstrucciones([])

  //   setTipoMovimientoInstrucciones({
  //     altaDeudor: "NO",
  //     tipoEntePublico: { Id: "", Descripcion: "" },
  //     entidadFederativa: { Id: "", Descripcion: "" },
  //     tipoFuente: { Id: "", Descripcion: "" },
  //     fondoIngreso: { Id: "", Descripcion: "" },
  //   });

  // }

  return (
    <>
      <Dialog fullScreen open={openState} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  cleanInstruccion();
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
                  disabled={
                    tablaTipoMovimientoInstrucciones.length <= 0 ||
                    numeroCuenta === "" ||
                    parseInt(numeroCuenta) === 0 ||
                    cuentaCLABE === "" ||
                    parseInt(cuentaCLABE) === 0 ||
                    banco === null ||
                    municipio === null
                  }
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (accion === "Agregar") {
                      createInstruccion();
                      handler(false);
                    } else if (accion === "Editar") {
                      modificaInstruccion();
                      handler(false);
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
                    {accion} Instrucción
                  </Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid item container direction="column">
          <Grid item width={"100%"}>
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
              <Tab label="Soporte Documental" sx={{...queries.bold_text}}></Tab>
            </Tabs>

            {tabIndex === 0 && <DatosGeneralesIntrucciones />}

            {tabIndex === 1 && <TipoDeMovimientoIntrucciones />}
            
            {tabIndex === 2 && <SoporteDocumentalInstrucciones/>}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
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

export function AgregarInstruccionesIrrevocables({
  handler,
  openState,
}: {
  handler: Function;
  openState: boolean;
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

  useEffect(() => {
    getTiposDeFuenteInstrucciones();
    getMunicipiosUOrganismosInstrucciones();
    getInstitucionesInstrucciones();
    getTipoEntePublicoObligadoInstrucciones();
    getFondosOIngresosInstrucciones();
  }, []);

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
                {IdInstruccion === "" ? "Agregar" : "Editar"} Instrucción
                Irrevocable
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <ThemeProvider theme={buttonTheme}>
              <Button
                // disabled={
                //   tablaTipoMovimientoInstrucciones.length <= 0 ||
                //   numeroCuenta === "" ||
                //   parseInt(numeroCuenta) === 0 ||
                //   cuentaCLABE === "" ||
                //   parseInt(cuentaCLABE) === 0 ||
                //   banco.Descripcion === "" ||
                //   tablaSoporteDocumentalInstrucciones.length <= 0
                //   // municipio === null
                // }
                sx={queries.buttonContinuar}
                onClick={() => {
                  console.log("falta restricciones");

                  if (IdInstruccion === "") {
                    setLoading(true);
                    createInstruccion(() => {
                      setLoading(false);
                      handler(false);
                    });
                  } else if (IdInstruccion === "") {
                    setLoading(true);
                    modificaInstruccion(() => {
                      setLoading(false);
                      handler(false);
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
                  {IdInstruccion === "" ? "Agregar" : "Editar"} Instrucción
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

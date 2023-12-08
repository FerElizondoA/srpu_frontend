/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Backdrop,
  Button,
  Dialog,
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

export function AgregarFideicomisos({
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
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1000)"),
  };

  const IdFideicomiso: string = useFideicomisoStore(
    (state) => state.idFideicomiso
  );

  const createFideicomiso: Function = useFideicomisoStore(
    (state) => state.createFideicomiso
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
  const getTiposDeFuenteInstrucciones: Function = useFideicomisoStore(
    (state) => state.getTiposDeFuente
  );
  const getFondosOIngresosInstrucciones: Function = useFideicomisoStore(
    (state) => state.getFondosOIngresos
  );
  const getOrdenesFideicomisario: Function = useFideicomisoStore(
    (state) => state.getOrdenesFideicomisario
  );

  useEffect(() => {
    getOrganismos();
    getTipoEntePublicoObligado();
    getOrdenesFideicomisario();
    getTiposDeFuenteInstrucciones();
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
                {IdFideicomiso === "" ? "Agregar" : "Editar"} Fideicomiso
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <ThemeProvider theme={buttonTheme}>
              <Button
                // disabled={
                //   generalFideicomiso.numeroFideicomiso === "" ||
                //   generalFideicomiso.fechaFideicomiso === "" ||
                //   tablaFideicomisario.length < 0 ||
                //   tablaTipoMovimiento.length < 0 ||
                //   tablaSoporteDocumental.length < 0
                // }
                sx={queries.buttonContinuar}
                onClick={() => {
                  console.log("falta restricciones");

                  if (IdFideicomiso === "") {
                    setLoading(true);
                    createFideicomiso(() => {
                      setLoading(false);
                      handler(false);
                    });
                  } else if (IdFideicomiso !== "") {
                    setLoading(true);
                    modificarFideicomiso(() => {
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
                  {IdFideicomiso === "" ? "Agregar" : "Editar"} Fideicomiso
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
          <Tab label="Datos Generales" sx={queries.bold_text}></Tab>
          <Tab label="Tipo de Movimiento" sx={queries.bold_text}></Tab>
          <Tab label="Soporte Documental" sx={queries.bold_text}></Tab>
        </Tabs>

        {tabIndex === 0 && <DatoGeneralesFideicomiso />}

        {tabIndex === 1 && <TipoDeMovimientoFideicomiso />}

        {tabIndex === 2 && <SoporteDocumentalFideicomiso />}
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

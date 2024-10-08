/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppBar,
  Backdrop,
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

  const IdMandato: string = useMandatoStore((state) => state.idMandato);

  const createMandato: Function = useMandatoStore(
    (state) => state.createMandato
  );

  const modificaMandato: Function = useMandatoStore(
    (state) => state.modificaMandato
  );

  const [loading, setLoading] = useState(false);

  const getTipoEntePublicoObligado: Function = useCortoPlazoStore(
    (state) => state.getTipoEntePublicoObligado
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  useEffect(() => {
    getTipoEntePublicoObligado();
  }, []);

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
                    setLoading(true);
                    createMandato(() => {
                      setLoading(false);
                      handler(false);
                    });
                  } else if (IdMandato !== "") {
                    setLoading(true);
                    modificaMandato(() => {
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

        {tabIndex === 2 && <SoporteDocumentalMandato />}
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

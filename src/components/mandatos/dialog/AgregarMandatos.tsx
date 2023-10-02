import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { queries } from "../../../queries";
import { TipoDeMovimiento } from "../panels/TipoDeMovimiento";
import { SoporteDocumental } from "../panels/SoporteDocumental";
import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import {
  SoporteDocumentalMandato,
  TipoMovimientoMandato,
} from "../../../store/Mandatos/mandato";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { DatosGeneralesMandatos } from "../panels/DatosGeneralesMandatos";

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

export function AgregarMandatos({
  handler,
  openState,
  accion,
}: {
  handler: Function;
  openState: boolean;
  accion: string;
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const changeIdMandato: Function = useMandatoStore(
    (state) => state.changeIdMandato
  );

  const editarMandato: Function = useMandatoStore(
    (state) => state.editarMandato
  );

  const modificaMandato: Function = useMandatoStore(
    (state) => state.modificaMandato
  );

  const setTipoMovimientoMandato: Function = useMandatoStore(
    (state) => state.setTipoMovimientoMandato
  );

  const setSoporteDocumentalMandato: Function = useMandatoStore(
    (state) => state.setSoporteDocumentalMandato
  );

  const tablaTipoMovimientoMandato: TipoMovimientoMandato[] =
  useMandatoStore((state) => state.tablaTipoMovimientoMandato);
  const tablaSoporteDocumentalMandato: SoporteDocumentalMandato[] =
  useMandatoStore((state) => state.tablaSoporteDocumentalMandato);

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  const createMandato: Function = useMandatoStore(
    (state) => state.createMandato
  );

  const limpiaMandato = () => {
    changeIdMandato("");

    setTipoMovimientoMandato({
      altaDeudor: "",
      tipoEntePublicoObligado: { Id: "", Descripcion: "" },
      mandatario: { Id: "", Descripcion: "" },
      tipoFuente: { Id: "", Descripcion: "" },
      fondoIngreso: { Id: "", Descripcion: "" },
      fechaMandato: new Date().toString(),
    });

    setSoporteDocumentalMandato({
      tipo: "",
      fechaArchivo: new Date().toString(),
      archivo: new File([], ""),
      nombreArchivo: "",
    });

    editarMandato([], []);
  };

  return (
    <>
      <Dialog fullScreen open={openState} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  limpiaMandato();
                  handler(false);
                }}
                sx={{ color: "white" }}
              >
                <GridCloseIcon />
              </IconButton>
            </Tooltip>

            <Grid container>
              <Typography sx={queries.bold_text}>{accion} Mandato</Typography>
            </Grid>

            <Grid item>
              <ThemeProvider theme={theme}>
                <Button
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (accion === "Agregar") {
                      createMandato();
                      handler(false);
                    } else if (accion === "Editar") {
                      modificaMandato();
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
                    {accion} mandato
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
              <Tab label="Soporte Documental" sx={queries.bold_text}></Tab>
            </Tabs>

            {tabIndex === 0 && <DatosGeneralesMandatos />}
          
            {tabIndex === 1 && <TipoDeMovimiento />}

            {tabIndex === 2 && <SoporteDocumental />}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

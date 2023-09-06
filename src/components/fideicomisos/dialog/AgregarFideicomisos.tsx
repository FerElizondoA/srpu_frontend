import CloseIcon from "@mui/icons-material/Close";
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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useEffect, useState } from "react";
import { queries } from "../../../queries";
import { DatoGeneralesFideicomiso } from "../panels/DatosGeneralesFideicomiso";
import { TipoDeMovimiento } from "../panels/TipoDeMovimiento";
import { SDocumental } from "../panels/SoporteDocumental";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

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

export function AgregarFideicomisos({
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

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1200)"),
  };

  const createFideicomiso: Function = useCortoPlazoStore(
    (state) => state.createFideicomiso
  );

  const modificarFideicomiso: Function = useCortoPlazoStore(
    (state) => state.modificarFideicomiso
  );

  const setGeneralFideicomiso: Function = useCortoPlazoStore(
    (state) => state.setGeneralFideicomiso
  );

  const editarSolicitud: Function = useCortoPlazoStore(
    (state) => state.editarFideicomiso
  );

  const changeIdFideicomiso: Function = useCortoPlazoStore(
    (state) => state.changeIdFideicomiso
  );

  const idFideicomiso: string = useCortoPlazoStore(
    (state) => state.idFideicomiso
  );

  const getFideicomisos: Function = useCortoPlazoStore(
    (state) => state.getFideicomisos
  );

  useEffect(() => {
    getFideicomisos();
  }, []);

  const limpiaFideicomiso = () => {
    changeIdFideicomiso("");

    setGeneralFideicomiso({
      numeroFideicomiso: "",
      tipoFideicomiso: { Id: "", Descripcion: "" },
      fechaFideicomiso: "",
      fiudiciario: { Id: "", Descripcion: "" },
    });

    editarSolicitud([], [], []);
  };

  return (
    <Dialog fullScreen open={openState} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Tooltip title="Volver">
            <IconButton
              edge="start"
              onClick={() => {
                limpiaFideicomiso();
                handler(false);
                //reset();
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>

          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                {accion} Fideicomiso
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <ThemeProvider theme={theme}>
              <Button
                sx={queries.buttonContinuar}
                onClick={() => {
                  if (accion === "Agregar") {
                    createFideicomiso();
                    handler(false);
                    // reset();
                  } else if (accion === "Editar") {
                    // updateRow(indexA);
                    modificarFideicomiso();
                    handler(false);
                    // reset();
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
                    // "@media (min-width: 601px) and (max-width: 900px)": {
                    //   // SM (small) screen
                    //   fontSize: "1.5ch",
                    // }
                  }}
                >
                  {accion} fideicomiso
                </Typography>
              </Button>
            </ThemeProvider>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid item container direction="column">
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

          {tabIndex === 1 && <TipoDeMovimiento />}

          {tabIndex === 2 && <SDocumental />}
        </Grid>
      </Grid>
    </Dialog>
  );
}

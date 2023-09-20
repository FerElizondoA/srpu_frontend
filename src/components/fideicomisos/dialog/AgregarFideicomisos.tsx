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
import { forwardRef, useState } from "react";
import { queries } from "../../../queries";
import {
  Fideicomisario,
  GeneralFideicomiso,
  SoporteDocumental,
  TipoMovimiento,
} from "../../../store/Fideicomiso/fideicomiso";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { DatoGeneralesFideicomiso } from "../panels/DatosGeneralesFideicomiso";
import { SDocumental } from "../panels/SoporteDocumental";
import { TipoDeMovimiento } from "../panels/TipoDeMovimiento";

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
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1000)"),
  };

  const createFideicomiso: Function = useFideicomisoStore(
    (state) => state.createFideicomiso
  );

  const modificarFideicomiso: Function = useFideicomisoStore(
    (state) => state.modificarFideicomiso
  );

  const setGeneralFideicomiso: Function = useFideicomisoStore(
    (state) => state.setGeneralFideicomiso
  );

  const editarSolicitud: Function = useFideicomisoStore(
    (state) => state.editarFideicomiso
  );

  const changeIdFideicomiso: Function = useFideicomisoStore(
    (state) => state.changeIdFideicomiso
  );

  const generalFideicomiso: GeneralFideicomiso = useFideicomisoStore(
    (state) => state.generalFideicomiso
  );

  const tablaFideicomisario: Fideicomisario[] = useFideicomisoStore(
    (state) => state.tablaFideicomisario
  );

  const tablaTipoMovimiento: TipoMovimiento[] = useFideicomisoStore(
    (state) => state.tablaTipoMovimiento
  );

  const tablaSoporteDocumental: SoporteDocumental[] = useFideicomisoStore(
    (state) => state.tablaSoporteDocumental
  );

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
                disabled={
                  generalFideicomiso.fiudiciario.Id === "" ||
                  generalFideicomiso.numeroFideicomiso === "" ||
                  generalFideicomiso.tipoFideicomiso.Id === "" ||
                  generalFideicomiso.fechaFideicomiso === "" ||
                  tablaFideicomisario.length < 0 ||
                  tablaTipoMovimiento.length < 0 ||
                  tablaSoporteDocumental.length < 0
                }
                sx={queries.buttonContinuar}
                onClick={() => {
                  if (accion === "Agregar") {
                    createFideicomiso();
                    handler(false);
                  } else if (accion === "Editar") {
                    modificarFideicomiso();
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
                  {accion} fideicomiso
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

        {tabIndex === 1 && <TipoDeMovimiento />}

        {tabIndex === 2 && <SDocumental />}
      </Grid>
    </Dialog>
  );
}

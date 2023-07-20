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
import { DatoGeneralesFideicomiso } from "../panels/DatosGeneralesFideicomiso";
import { TipoDeMovimiento } from "../panels/TipoDeMovimiento";
import { SDocumental } from "../panels/SoporteDocumental";
import { useCortoPlazoStore } from "../../../store/main";

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

  const setGeneralFideicomiso: Function = useCortoPlazoStore(
    (state) => state.setGeneralFideicomiso
  );

  const cleanFideicomisario: Function = useCortoPlazoStore(
    (state) => state.cleanFideicomisario
  );

  const createFideicomiso: Function = useCortoPlazoStore(
    (state) => state.createFideicomiso
  );

  const reset = () => {
    setGeneralFideicomiso({
      numeroFideicomiso: "",
      tipoFideicomiso: "",
      fechaFideicomiso: { Id: "", Descripcion: "" },
      fiudiciario: { Id: "", Descripcion: "" },
    });
    cleanFideicomisario();
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
                      handler(false);
                      // reset();
                    }

                    setTabIndex(0);
                  }}
                >
                  <Typography sx={{ ...queries.medium_text, fontSize: "1rem" }}>
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
    </>
  );
}

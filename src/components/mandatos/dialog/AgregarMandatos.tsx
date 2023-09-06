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
import { GridCloseIcon } from "@mui/x-data-grid";
import { queries } from "../../../queries";
import { TipoDeMovimiento } from "../panels/TipoDeMovimiento";
import { SoporteDocumental } from "../panels/SoporteDocumental";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";

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

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
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
                  //limpiaFideicomiso();
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
                  {accion} Mandato
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <ThemeProvider theme={theme}>
                <Button
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (accion === "Agregar") {
                      //createFideicomiso();
                      handler(false);
                      // reset();
                    } else if (accion === "Editar") {
                      // updateRow(indexA);
                      // modificarFideicomiso();
                      handler(false);
                      // reset();
                    }

                    setTabIndex(0);
                  }}
                >
                  <Typography sx={{ ...queries.medium_text, fontSize: "1rem" }}>
                    {accion} mandato
                  </Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Toolbar>
        </AppBar>

        <Grid item container direction="column" >
          <Grid item width={"100%"}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              centered={query.isScrollable ? false : true}
              variant={query.isScrollable ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab label="Tipo de Movimiento" sx={{...queries.bold_text}}></Tab>
              <Tab label="Soporte Documental" sx={queries.bold_text}></Tab>
            </Tabs>

            {tabIndex === 0 && <TipoDeMovimiento />}

            {tabIndex === 1 && <SoporteDocumental />}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

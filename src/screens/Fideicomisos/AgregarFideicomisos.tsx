import { useState, forwardRef } from "react";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Button,
  createTheme,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { queries } from "../../queries";
import { DatoGeneralesFideicomiso } from "../../components/ObligacionesLargoPlazoPage/Dialog/DatosGeneralesFideicomiso";
import { TipoDeMovimiento } from "../../components/ObligacionesLargoPlazoPage/Dialog/TipoDeMovimiento";
import { useCortoPlazoStore } from "../../store/main";

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

            <Grid item sx={{ top: 12, bottom: "auto" }}>
              <ThemeProvider theme={theme}>
                <Button sx={queries.buttonContinuar} onClick={() => {}}>
                  <Typography sx={queries.medium_text}>{accion}</Typography>
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
            </Tabs>

            {tabIndex === 0 && <DatoGeneralesFideicomiso />}

            {tabIndex === 1 && <TipoDeMovimiento />}
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

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
import { DestalleDestino } from "../Panels/DetalleDestino";
import { MontoAutorizado } from "../Panels/MontoAutorizado";
import { RegistrarNuevaAutorizacion } from "../Panels/RegistrarNuevaAutorizacion";
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  handler: Function;
  openState: boolean;
};

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

export interface IMontoAutorizado {}

export interface DetalleDestino {}

export function DialogNuevaAutorizacion(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1200)"),
  };

  // const tablaComisiones: IMontoAutorizado[] = useLargoPlazoStore(
  //   (state) => state.tabla
  // );

  return (
    <>
      <Dialog
        fullScreen
        open={props.openState}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Volver">
              <IconButton
                edge="start"
                onClick={() => {
                  props.handler(false);
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
                  Agregar nueva autorización
                </Typography>
              </Grid>
            </Grid>

            <Grid item sx={{ top: 12, bottom: "auto" }}>
              <ThemeProvider theme={theme}>
                <Button sx={queries.buttonContinuar} onClick={() => {}}>
                  <Typography sx={queries.medium_text}>Agregar</Typography>
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
              <Tab
                label="REGISTRAR NUEVA AUTORIZACIÓN DE LA LEGISLATURA LOCAL"
                sx={queries.bold_text}
              ></Tab>
              <Tab label="MONTO AUTORIZADO" sx={queries.bold_text}></Tab>
              <Tab label="DETALLE DEL DESTINO" sx={queries.bold_text}></Tab>
            </Tabs>

            {tabIndex === 0 && <RegistrarNuevaAutorizacion />}

            {tabIndex === 1 && <MontoAutorizado />}

            {tabIndex === 2 && <DestalleDestino />}
          </Grid>

          <Grid item sx={{ top: 12, bottom: "auto" }}>
            <ThemeProvider theme={theme}>
              {/* <Button
                  disabled={
                    tablaComisiones.length === 0 ||
                    tablaTasaInteres.length === 0
                  }
                  sx={queries.buttonContinuar}
                  onClick={() => {
                    if (tablaComisiones.length === 0) {
                      setDialogValidacion("Comisiones/TasaEfectiva");
                      setOpenDialogConfirm(!openDialogConfirm);
                    } else if (tablaTasaInteres.length === 0) {
                      setDialogValidacion("Disposición/Pagos de Capital");
                      setOpenDialogConfirm(!openDialogConfirm);
                    } else {
                      if (props.accion === "Agregar") {
                        addRow();
                        props.handler(false);
                        reset();
                      } else if (props.accion === "Editar") {
                        updateRow(props.indexA);
                        props.handler(false);
                        reset();
                      }
                    }
                  }}
                >
                  <Typography sx={queries.medium_text}>
                    {props.accion}
                  </Typography>
                </Button> */}
            </ThemeProvider>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

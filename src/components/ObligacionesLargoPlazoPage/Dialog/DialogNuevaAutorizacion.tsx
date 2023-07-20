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
  Divider,
  TextField,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { queries } from "../../../queries";
import { DatoGeneralesFideicomiso } from "./DatosGeneralesFideicomiso";
import { TipoDeMovimiento } from "./TipoDeMovimiento";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { addDays } from "date-fns";
import {
  DateInput,
  StyledTableCell,
  StyledTableRow,
} from "../../CustomComponents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { RegistrarNuevaAutorizacion } from "../Panels/RegistrarNuevaAutorizacion";
import { MontoAutorizado } from "../Panels/MontoAutorizado";
import { DestalleDestino } from "../Panels/DetalleDestino";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
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

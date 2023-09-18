import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useState } from "react";
import { queries } from "../../../queries";

import { hashFunctionCYRB53 } from "../../CustomComponents";

import {
  CondicionFinanciera,
  Disposicion,
  IComisiones,
  TasaInteres,
} from "../../../store/CreditoCortoPlazo/condicion_financiera";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { DisposicionPagosCapital } from "../Panels/DisposicionPagosCapital";
import { ComisionesTasaEfectiva } from "../Panels/ComisionesTasaEfectiva";

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
  accion: string;
  indexA: number;
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

export function AgregarCondicionFinanciera(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  // DISPOSICION

  const tablaDisposicion: Disposicion[] = useLargoPlazoStore(
    (state) => state.tablaDisposicion
  );

  // PAGOS DE CAPITAL
  const capitalFechaPrimerPago: string = useLargoPlazoStore(
    (state) => state.pagosDeCapital.fechaPrimerPago
  );
  const capitalPeriocidadPago: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.pagosDeCapital.periodicidadDePago);

  const capitalNumeroPago: number = useLargoPlazoStore(
    (state) => state.pagosDeCapital.numeroDePago
  );

  // TASA DE INTERES
  const tablaTasaInteres: TasaInteres[] = useLargoPlazoStore(
    (state) => state.tablaTasaInteres
  );

  // TASA EFECTIVA
  const tasaEfectivaDiasEjercicio: { Id: string; Descripcion: string } =
    useLargoPlazoStore((state) => state.tasaEfectiva.diasEjercicio);

  const tasaEfectivaTasaEfectiva: string = useLargoPlazoStore(
    (state) => state.tasaEfectiva.tasaEfectiva
  );
  const changeTasaEfectiva: Function = useLargoPlazoStore(
    (state) => state.changeTasaEfectiva
  );

  // COMISIONES
  const tablaComisiones: IComisiones[] = useLargoPlazoStore(
    (state) => state.tablaComisiones
  );

  // CLEAN
  const changeCapital: Function = useLargoPlazoStore(
    (state) => state.changeCapital
  );
  const changeDisposicion: Function = useLargoPlazoStore(
    (state) => state.changeDisposicion
  );
  const cleanTasaInteres: Function = useLargoPlazoStore(
    (state) => state.cleanTasaInteres
  );
  const cleanComision: Function = useLargoPlazoStore(
    (state) => state.cleanComision
  );
  const cleanDisposicion: Function = useLargoPlazoStore(
    (state) => state.cleanDisposicion
  );

  // CONDICION FINANCIERA
  const addCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const upDataCondicionFinanciera: Function = useLargoPlazoStore(
    (state) => state.upDataCondicionFinanciera
  );
  const changeTasaInteres: Function = useLargoPlazoStore(
    (state) => state.changeTasaInteres
  );

  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  const addRow = () => {
    const CF: CondicionFinanciera = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      disposicion: tablaDisposicion,
      pagosDeCapital: {
        fechaPrimerPago: capitalFechaPrimerPago,
        periodicidadDePago: capitalPeriocidadPago.Descripcion,
        numeroDePago: capitalNumeroPago,
      },
      tasaInteres: tablaTasaInteres,
      comisiones: tablaComisiones,
      tasaEfectiva: tasaEfectivaTasaEfectiva,
      diasEjercicio: tasaEfectivaDiasEjercicio.Descripcion,
    };
    addCondicionFinanciera(CF);
  };

  const updateRow = (indexA: number) => {
    const CF: CondicionFinanciera = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      disposicion: tablaDisposicion,
      pagosDeCapital: {
        fechaPrimerPago: capitalFechaPrimerPago,
        periodicidadDePago: capitalPeriocidadPago.Descripcion,
        numeroDePago: capitalNumeroPago,
      },
      tasaInteres: tablaTasaInteres,
      comisiones: tablaComisiones,
      tasaEfectiva: tasaEfectivaTasaEfectiva,
      diasEjercicio: tasaEfectivaDiasEjercicio.Descripcion,
    };
    upDataCondicionFinanciera(CF, indexA);
  };

  const reset = () => {
    changeDisposicion(new Date().toString(), 0);
    changeCapital(new Date().toString(), { Id: "", Descripcion: "" }, "");
    changeTasaInteres({
      tasaFija: false,
      tasaVariable: false,
      tasa: "",
      fechaPrimerPago: new Date().toString(),
      diasEjercicio: { Id: "", Descripcion: "" },
      periocidadPago: { Id: "", Descripcion: "" },
      tasaReferencia: { Id: "", Descripcion: "" },
      sobreTasa: "",
      tasaEfectiva: "",
    });
    changeTasaEfectiva({
      diasEjercicio: { Id: "", Descripcion: "" },
      tasaEfectiva: "",
    });
    cleanTasaInteres();
    cleanComision();
    cleanDisposicion(monto);
  };

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [dialogValidacion, setDialogValidacion] = useState("");

  return (
    <>
      <Dialog
        fullScreen
        open={props.openState}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative"}}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => {
                props.handler(false);
                setTabIndex(0);
                reset();
              }}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
            <Grid container>
              <Grid item>
                <Typography sx={queries.bold_text}>
                  {props.accion} Condición Financiera
                </Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ top: 12, bottom: "auto" }}>
              <ThemeProvider theme={theme}>
                <Button
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
                    setTabIndex(0);
                  }}
                >
                  <Typography sx={queries.medium_text}>
                    {props.accion}
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
              <Tab
                label="Disposición/Pagos de Capital"
                sx={queries.bold_text}
              ></Tab>
              <Tab
                label="Comisiones/Tasa Efectiva"
                sx={queries.bold_text}
              ></Tab>
            </Tabs>

            {tabIndex === 0 && <DisposicionPagosCapital />}

            {tabIndex === 1 && <ComisionesTasaEfectiva />}
          </Grid>
        </Grid>
      </Dialog>

      <Dialog
        open={openDialogConfirm}
        onClose={() => {
          setOpenDialogConfirm(!openDialogConfirm);
        }}
      >
        <DialogTitle sx={queries.bold_text}>ADVERTENCIA</DialogTitle>
        <DialogContent>
          <DialogContentText sx={queries.text}>
            {tablaComisiones.length === 0 && tablaTasaInteres.length === 0
              ? 'No se puede realizar la accion de agregar condición financiera por falta datos en: "Disposición/Pagos de Capital" y en "Comisiones/TasaEfectiva '
              : "No se puede realizar la accion de agregar condición financiera por falta datos en: " +
                dialogValidacion}
          </DialogContentText>
          <DialogActions>
            <Button
              sx={queries.buttonCancelar}
              onClick={() => setOpenDialogConfirm(!openDialogConfirm)}
            >
              <Typography sx={queries.medium_text}>Cerrar</Typography>
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

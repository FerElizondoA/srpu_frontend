/* eslint-disable react-hooks/exhaustive-deps */
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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useEffect, useState } from "react";
import { queries } from "../../../queries";

import {
  IDisposicion,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import { IComisiones } from "../../../store/CreditoCortoPlazo/tasa_efectiva";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { buttonTheme } from "../../mandatos/dialog/AgregarMandatos";
import { ComisionesTasaEfectiva } from "../Panels/ComisionesTasaEfectiva";
import { DisposicionPagosCapital } from "../Panels/DisposicionPagosCapital";

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

export function AgregarCondicionFinanciera(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 600px)"),
  };

  // DISPOSICION

  const tablaDisposicion: IDisposicion[] = useLargoPlazoStore(
    (state) => state.tablaDisposicion
  );

  // TASA DE INTERES
  const tablaTasaInteres: ITasaInteres[] = useLargoPlazoStore(
    (state) => state.tablaTasaInteres
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
  const changeTasaInteres: Function = useLargoPlazoStore(
    (state) => state.changeTasaInteres
  );

  const monto: number = useLargoPlazoStore(
    (state) => state.informacionGeneral.monto
  );

  // const addRow = () => {
  //   const CF: ICondicionFinanciera = {
  //     disposicion: tablaDisposicion,
  //     pagosDeCapital: {
  //       fechaPrimerPago: capitalFechaPrimerPago,
  //       periodicidadDePago: capitalPeriocidadPago.Descripcion,
  //       numeroDePago: capitalNumeroPago,
  //     },
  //     tasaInteres: tablaTasaInteres,
  //     comisiones: tablaComisiones,
  //     tasaEfectiva: tasaEfectivaTasaEfectiva,
  //     diasEjercicio: tasaEfectivaDiasEjercicio.Descripcion,
  //   };
  //   addCondicionFinanciera(CF);
  // };

  // const updateRow = (indexA: number) => {
  //   const CF: ICondicionFinanciera = {
  //     disposicion: tablaDisposicion,
  //     pagosDeCapital: {
  //       fechaPrimerPago: capitalFechaPrimerPago,
  //       periodicidadDePago: capitalPeriocidadPago.Descripcion,
  //       numeroDePago: capitalNumeroPago,
  //     },
  //     tasaInteres: tablaTasaInteres,
  //     comisiones: tablaComisiones,
  //     tasaEfectiva: tasaEfectivaTasaEfectiva,
  //     diasEjercicio: tasaEfectivaDiasEjercicio.Descripcion,
  //   };
  //   upDataCondicionFinanciera(CF, indexA);
  // };

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

  const setDisposicionesParciales: Function = useLargoPlazoStore(
    (state) => state.setDisposicionesParciales
  );

  useEffect(() => {
    if (tablaDisposicion.length > 1) {
      setDisposicionesParciales(true);
    } else {
      setDisposicionesParciales(false);
    }
  }, [props.openState]);

  return (
    <>
      <Dialog
        fullScreen
        open={props.openState}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
              <ThemeProvider theme={buttonTheme}>
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
                        // addRow();
                        props.handler(false);
                        reset();
                      } else if (props.accion === "Editar") {
                        // updateRow(props.indexA);
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

        <Grid container direction="column">
          <Grid item width={"100%"}>
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

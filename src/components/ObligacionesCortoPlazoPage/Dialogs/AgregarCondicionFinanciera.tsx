/* eslint-disable react-hooks/exhaustive-deps */
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
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useState } from "react";
import { queries } from "../../../queries";

import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";

import {
  IDisposicion,
  IPagosDeCapital,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import {
  IComisiones,
  ITasaEfectiva,
} from "../../../store/CreditoCortoPlazo/tasa_efectiva";
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

  // PAGOS DE CAPITAL
  const pagosDeCapital: IPagosDeCapital = useCortoPlazoStore(
    (state) => state.pagosDeCapital
  );

  // DISPOSICION
  const tablaDisposicion: IDisposicion[] = useCortoPlazoStore(
    (state) => state.tablaDisposicion
  );

  // TASA DE INTERES
  const tablaTasaInteres: ITasaInteres[] = useCortoPlazoStore(
    (state) => state.tablaTasaInteres
  );

  // TASA EFECTIVA
  const tasaEfectiva: ITasaEfectiva = useCortoPlazoStore(
    (state) => state.tasaEfectiva
  );

  // COMISIONES
  const tablaComisiones: IComisiones[] = useCortoPlazoStore(
    (state) => state.tablaComisiones
  );

  // CONDICION FINANCIERA
  const addCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const updateCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.updateCondicionFinanciera
  );
  const cleanCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.cleanCondicionFinanciera
  );

  return (
    <Dialog fullScreen open={props.openState} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => {
              props.handler(false);
              cleanCondicionFinanciera();
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
                  tablaTasaInteres.length === 0 ||
                  pagosDeCapital.numeroDePago === 0 ||
                  pagosDeCapital.numeroDePago <= 0  ||
                  pagosDeCapital.periodicidadDePago.Descripcion === ""              
                }
                sx={queries.buttonContinuar}
                onClick={() => {
                  // setTabIndex(0);
                  if (props.accion === "Agregar") {
                    addCondicionFinanciera({
                      pagosDeCapital: pagosDeCapital,
                      disposicion: tablaDisposicion,
                      tasaInteres: tablaTasaInteres,

                      tasaEfectiva: tasaEfectiva,
                      comisiones: tablaComisiones,
                    });
                    props.handler(false);
                    cleanCondicionFinanciera();
                  } else if (props.accion === "Editar") {
                    updateCondicionFinanciera({
                      pagosDeCapital: pagosDeCapital,
                      disposicion: tablaDisposicion,
                      tasaInteres: tablaTasaInteres,
                      tasaEfectiva: tasaEfectiva,
                      comisiones: tablaComisiones,
                    });
                    props.handler(false);
                    cleanCondicionFinanciera();
                  }
                }}
              >
                <Typography sx={queries.medium_text}>{props.accion}</Typography>
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
            <Tab label="Comisiones/Tasa Efectiva" sx={queries.bold_text}></Tab>
          </Tabs>

          {tabIndex === 0 && <DisposicionPagosCapital />}

          {tabIndex === 1 && <ComisionesTasaEfectiva />}
        </Grid>
      </Grid>
    </Dialog>
  );
}

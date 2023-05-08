import { useState, forwardRef, useEffect } from "react";
import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Divider,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useCortoPlazoStore } from "../../../store/main";

import { hashFunctionCYRB53 } from "../../CustomComponents";

import {
  CondicionFinanciera,
  IComisiones,
  TasaInteres,
} from "../../../store/condicion_financiera";
import { DisposicionPagosCapital } from "../panels/DisposicionPagosCapital";
import { ComisionesTasaEfectiva } from "../panels/ComisionesTasaEfectiva";

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
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  // DISPOSICION
  const disposicionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.disposicion.fechaDisposicion
  );
  const disposicionImporte: number = useCortoPlazoStore(
    (state) => state.disposicion.importe
  );

  // PAGOS DE CAPITAL
  const capitalFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.pagosDeCapital.fechaPrimerPago
  );
  const capitalPeriocidadPago: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.pagosDeCapital.periodicidadDePago);
  const capitalNumeroPago: number = useCortoPlazoStore(
    (state) => state.pagosDeCapital.numeroDePago
  );

  // TASA DE INTERES
  const tablaTasaInteres: TasaInteres[] = useCortoPlazoStore(
    (state) => state.tablaTasaInteres
  );

  // TASA EFECTIVA
  const tasaEfectivaDiasEjercicio: { Id: string; Descripcion: string } =
    useCortoPlazoStore((state) => state.tasaEfectiva.diasEjercicio);
  const tasaEfectivaTasaEfectiva: string = useCortoPlazoStore(
    (state) => state.tasaEfectiva.tasaEfectiva
  );

  // COMISIONES
  const tablaComisiones: IComisiones[] = useCortoPlazoStore(
    (state) => state.tablaComisiones
  );

  // CLEAN
  const changeCapital: Function = useCortoPlazoStore(
    (state) => state.changeCapital
  );
  const changeDisposicion: Function = useCortoPlazoStore(
    (state) => state.changeDisposicion
  );
  const cleanTasaInteres: Function = useCortoPlazoStore(
    (state) => state.cleanTasaInteres
  );
  const cleanComision: Function = useCortoPlazoStore(
    (state) => state.cleanComision
  );

  // CONDICION FINANCIERA
  const addCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.addCondicionFinanciera
  );
  const upDataCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.upDataCondicionFinanciera
  );
  const changeTasaInteres: Function = useCortoPlazoStore(
    (state) => state.changeTasaInteres
  );

  const addRow = () => {
    const CF: CondicionFinanciera = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      disposicion: {
        fechaDisposicion: disposicionFechaContratacion,
        importe: disposicionImporte,
      },
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
      disposicion: {
        fechaDisposicion: disposicionFechaContratacion,
        importe: disposicionImporte,
      },
      pagosDeCapital: {
        fechaPrimerPago: capitalFechaPrimerPago,
        periodicidadDePago: capitalPeriocidadPago.Descripcion,
        numeroDePago: capitalNumeroPago,
      },
      tasaInteres: tablaTasaInteres,
      comisiones: tablaComisiones,
      tasaEfectiva: "",
      diasEjercicio: "",
    };

    upDataCondicionFinanciera(CF, indexA);
  };

  const reset = () => {
    changeDisposicion(new Date().toString(), "");
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
    });
    cleanTasaInteres();
    cleanComision();
  };

  return (
    <Dialog fullScreen open={props.openState} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => {
              props.handler(false);
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
          <Grid
            item
            position="fixed"
            sx={{ top: 12, bottom: "auto", left: window.innerWidth - 300 }}
          >
            <Button
              sx={{
                backgroundColor: "white",
                ":hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => {
                if (props.accion === "Agregar") {
                  addRow();
                  props.handler(false);
                  reset();
                } else if (props.accion === "Editar") {
                  updateRow(props.indexA);
                  props.handler(false);
                  reset();
                }
              }}
            >
              <CheckIcon sx={{ mr: 1 }} />
              <Typography sx={queries.medium_text}>{props.accion}</Typography>
            </Button>
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
            <Tab label="Disposición/Pagos de Capital" sx={queries.text}></Tab>
            <Tab label="Comisiones/Tasa Efectiva" sx={queries.text}></Tab>
          </Tabs>

          {tabIndex === 0 && <DisposicionPagosCapital />}

          {tabIndex === 1 && <ComisionesTasaEfectiva />}
        </Grid>
      </Grid>
    </Dialog>
  );
}

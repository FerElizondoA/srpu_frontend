import * as React from "react";

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
    Button
  } from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';

import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CondicionesGenerales } from "../Panels/CondicionesGenerales";
import { DisposicionPagosCapital } from "../Panels/DisposicionPagosCapital";
import { ComisionesTasaEfectiva } from "../Panels/ComisionesTasaEfectiva";
import { useCortoPlazoStore } from "../../../store/main";

import { hashFunctionCYRB53 } from "../../CustomComponents";

import { CondicionFinanciera } from "../../../store/condicion_financiera";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    handler: Function,
    openState: boolean
}

export function AgregarCondicionFinanciera(props: Props){

  const [tabIndex, setTabIndex] = React.useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  }

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

    const disposicionFechaContratacion: string = useCortoPlazoStore(state => state.disposicionFechaContratacion);
    const disposicionImporte: number = useCortoPlazoStore(state => state.disposicionImporte);
    const capitalFechaPrimerPago: string = useCortoPlazoStore(state => state.capitalFechaPrimerPago);
    const capitalPeriocidadPago: string = useCortoPlazoStore(state => state.capitalPeriocidadPago);
    const tasaFechaPrimerPago: string = useCortoPlazoStore(state => state.tasaFechaPrimerPago);
    const tipoComision: string = useCortoPlazoStore(state => state.tipoComision);
    const tasaReferencia: string = useCortoPlazoStore(state => state.tasaReferencia);
    //const condicionFinancieraTable: CondicionFinanciera[] = useCortoPlazoStore.getState().condicionFinancieraTable;
    const addCondicionFinanciera: Function = useCortoPlazoStore(state => state.addCondicionFinanciera);
    //const removeCondicionFinanciera: Function = useCortoPlazoStore.getState().removeCondicionFinanciera;

    const addRow = () => {
      const CF: CondicionFinanciera = {
        id: hashFunctionCYRB53(new Date().getTime().toString()),
        fechaDisposicion: disposicionFechaContratacion,
        importeDisposicion: disposicionImporte.toString(),
        fechaPrimerPagoCapital: capitalFechaPrimerPago,
        periocidadPagoCapital: capitalPeriocidadPago,
        fechaPrimerPagoInteres: tasaFechaPrimerPago,
        tasaInteres: tasaReferencia,
        comisiones: tipoComision
      }
      addCondicionFinanciera(CF);
    }

  return (
    <Dialog fullScreen open={props.openState} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => props.handler(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                Agregar Condición Financiera
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            position="fixed"
            sx={{ top: 12, bottom: "auto", left: window.innerWidth - 300 }}
            >
            <Button sx={{backgroundColor: "white", ":hover": {
              backgroundColor: "white"
            }}} onClick={() => {addRow(); props.handler(false)}}>
              <CheckIcon sx={{ mr: 1 }} />
              <Typography sx={queries.medium_text}>FINALIZAR</Typography>
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
            <Tab label="Condiciones Generales" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
            <Tab label="Disposición/Pagos de Capital" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
            <Tab label="Comisiones/Tasa Efectiva" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
          </Tabs>
          {tabIndex === 0 && <CondicionesGenerales />}

          {tabIndex === 2 && <DisposicionPagosCapital />}

          {tabIndex === 4 && <ComisionesTasaEfectiva />}
        </Grid>
      </Grid>
    </Dialog>
  );
}
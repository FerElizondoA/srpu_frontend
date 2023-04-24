import{useEffect, useState, forwardRef} from "react";
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
import DeleteIcon from '@mui/icons-material/Delete';
import { queries } from "../../../queries";
import useMediaQuery from "@mui/material/useMediaQuery";


import { useCortoPlazoStore } from "../../../store/main";

import { hashFunctionCYRB53 } from "../../CustomComponents";

import { CondicionFinanciera } from "../../../store/condicion_financiera";
import { TasaInteres } from "../../../store/pagos_capital";
import { TasaEfectiva } from "../../../store/tasa_efectiva";
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




export function AgregarCondicionFinanciera(props: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const query = {
    isScrollable: useMediaQuery("(min-width: 0px) and (max-width: 1189px)"),
  };

  const disposicionFechaContratacion: string = useCortoPlazoStore(
    (state) => state.disposicionFechaContratacion
  );

  const changeDisposicionFechaContratacion: Function = useCortoPlazoStore(
    (state) => state.changeDisposicionFechaContratacion
  )

  const disposicionImporte: number = useCortoPlazoStore(
    (state) => state.disposicionImporte
  );

  const changeDisposicionImporte: Function = useCortoPlazoStore(
    (state) => state.changeDisposicionImporte
  )

  const capitalFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.capitalFechaPrimerPago
  );

  const changeCapitalFechaPrimerPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalFechaPrimerPago
  )

  const capitalPeriocidadPago: string = useCortoPlazoStore(
    (state) => state.capitalPeriocidadPago
  );

  const changeCapitalPeriocidadPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalPeriocidadPago
  )

  const tasaFechaPrimerPago: string = useCortoPlazoStore(
    (state) => state.tasaFechaPrimerPago
  );

  const changeTasaFechaPrimerPago: Function = useCortoPlazoStore(
    (state) => state.changeTasaFechaPrimerPago
  )

  const tipoComision: string = useCortoPlazoStore(
    (state) => state.tipoComision
  );

  const changeTipoComision: Function = useCortoPlazoStore(
    (state) => state.changeTipoComision
  )
  
  const tasaReferencia: string = useCortoPlazoStore(
    (state) => state.tasaReferencia
  );

  const changeTasaReferencia: Function = useCortoPlazoStore(
    (state) => state.changeTasaReferencia
  )

  const capitalNumeroPago: number = useCortoPlazoStore(
    (state) => state.capitalNumeroPago
  );

  const changeCapitalNumeroPago: Function = useCortoPlazoStore(
    (state) => state.changeCapitalNumeroPago
  )

  const tasaInteresTable: TasaInteres[] = useCortoPlazoStore(
    (state) => state.tasaInteresTable
  );
  const tasaEfectivaTable: TasaEfectiva[] = useCortoPlazoStore(
    (state) => state.tasaEfectivaTable
  );

  const condicionFinancieraTable: CondicionFinanciera[] = useCortoPlazoStore(
    (state) => state.condicionFinancieraTable
  );

  const addCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.addCondicionFinanciera
  );

  const upDataCondicionFinanciera: Function = useCortoPlazoStore(
    (state) => state.upDataCondicionFinanciera
  )

  
  const addRow = () => {
      const CF: CondicionFinanciera = {


        id: hashFunctionCYRB53(new Date().getTime().toString()),
        fechaDisposicion: disposicionFechaContratacion,
        importeDisposicion: disposicionImporte.toString(),
        fechaPrimerPagoCapital: capitalFechaPrimerPago,
        periocidadPagoCapital: capitalPeriocidadPago,
        fechaPrimerPagoInteres: tasaFechaPrimerPago,
        tasaInteres: tasaReferencia,
        comisiones: tipoComision,
        numeroPagoCapital: capitalNumeroPago,
        tasasInteres: tasaInteresTable,
        tasasEfectivas: tasaEfectivaTable,
      };
      addCondicionFinanciera(CF);
    //}
  };

  const updateRow = (indexA: number) =>{
    const CF: CondicionFinanciera = {
      id: hashFunctionCYRB53(new Date().getTime().toString()),
      fechaDisposicion: disposicionFechaContratacion,
      importeDisposicion: disposicionImporte.toString(),
      fechaPrimerPagoCapital: capitalFechaPrimerPago,
      periocidadPagoCapital: capitalPeriocidadPago,
      fechaPrimerPagoInteres: tasaFechaPrimerPago,
      tasaInteres: tasaReferencia,
      comisiones: tipoComision,
      numeroPagoCapital: capitalNumeroPago,
      tasasInteres: tasaInteresTable,
      tasasEfectivas: tasaEfectivaTable,
    };

    upDataCondicionFinanciera(CF, indexA)
  }
  
  const reset = () => {
    useCortoPlazoStore.setState({
      disposicionFechaContratacion: "",
    });
    useCortoPlazoStore.setState({
      disposicionImporte: 0,
    });

    useCortoPlazoStore.setState({
      capitalFechaPrimerPago: "",
    });

    useCortoPlazoStore.setState({
      capitalPeriocidadPago: "",
    });

    useCortoPlazoStore.setState({
      capitalNumeroPago: 0,
    });

    useCortoPlazoStore.setState({
      tasaInteresTable: [],
    });

    useCortoPlazoStore.setState({
      tasaEfectivaTable: [],
    });
  };

 

  return (
    <Dialog fullScreen open={props.openState} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => {
              props.handler(false)
             
              
              
            }}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container>
            <Grid item>
              <Typography sx={queries.bold_text}>
                Agregar Condición Financiera
              </Typography><Typography sx={queries.bold_text}>
                {props.accion}
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
                //reset()
                
                if(props.accion === "Agregar"){
                  addRow();
                  props.handler(false)
                }else if(props.accion === "Editar"){
                  updateRow(props.indexA);
                  props.handler(false)
                }
                 
              }}
            >
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
            <Tab label="Disposición/Pagos de Capital" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
            <Tab label="Comisiones/Tasa Efectiva" sx={queries.text}></Tab>
            <Divider orientation="vertical" flexItem />
          </Tabs>

          {tabIndex === 0 && <DisposicionPagosCapital />}

          {tabIndex === 2 && <ComisionesTasaEfectiva />}
        </Grid>
      </Grid>
    </Dialog>
  );
}

import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";
import { TasaInteres } from "./pagos_capital";
import { TasaEfectiva } from "./tasa_efectiva";
import { CondicionesFinancieras } from "../components/ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { log } from "console";

export type CondicionFinanciera = {
  id: number;
  fechaDisposicion: string;
  importeDisposicion: string;
  fechaPrimerPagoCapital: string;
  periocidadPagoCapital: string;
  fechaPrimerPagoInteres: string;
  tasaInteres: string;
  comisiones: string;
  numeroPagoCapital: number;
  tasasInteres: TasaInteres[];
  tasasEfectivas: TasaEfectiva[];
};

export interface CondicionFinancieraSlice {
  condicionFinancieraTable: CondicionFinanciera[];
  addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) => void;
  loadCondicionFinanciera: (condicionFinanciera: CondicionFinanciera) => void;
  upDataCondicionFinanciera: (condicionFinanciera: CondicionFinanciera,index: number) => void;
  removeCondicionFinanciera: (index: number) => void;
}

export const createCondicionFinancieraSlice: StateCreator<
  CondicionFinancieraSlice
> = (set, get) => ({
  condicionFinancieraTable: [],

  addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) =>
    set((state) => ({
      condicionFinancieraTable: [
        ...state.condicionFinancieraTable,
        newCondicionFinanciera,
      ],
    })),
/////////////////////////////////////////////////////////////////

  upDataCondicionFinanciera: (condicionFinanciera: CondicionFinanciera,index: number) =>{

    // const CondicionesFinancieras: any = {
    //   disposicionImporte: condicionFinanciera.importeDisposicion,
    //   disposicionFechaContratacion: condicionFinanciera.fechaDisposicion,
    //   capitalFechaPrimerPago: condicionFinanciera.fechaPrimerPagoCapital,
    //   capitalPeriocidadPago: condicionFinanciera.periocidadPagoCapital,
    //   capitalNumeroPago: condicionFinanciera.numeroPagoCapital,
    //   tasaInteresTable: condicionFinanciera.tasasInteres,
    //   tasaEfectivaTable: condicionFinanciera.tasasEfectivas,

    // };
    
    // set((state) => ({
    //   condicionFinancieraTable: state.condicionFinancieraTable.map((item, i) =>
    //   i === index ? condicionFinanciera : item
    // ), 
    // })),

    //et aux: any = JSON.parse(solicitud.Solicitud);
    //aux.IdSolicitud = solicitud.Id;

    //useCortoPlazoStore.setState(aux);
   
    // condicionFinancieraTable: [
    //   state.condicionFinancieraTable.map((item, index)=>{
    //      if(index===index){
    //       return condicionFinanciera
    //      }else
    //       return item;
    //     }
    //   ],
    console.log("index ", index);
    
    set((state) => {

        const nuevaTabla = [...state.condicionFinancieraTable];
        console.log("nueva tabla info ",nuevaTabla);
        
        nuevaTabla[index] = condicionFinanciera;
        console.log("nueva tabla info 2: ",nuevaTabla);
        console.log();
        
        return {
            condicionFinancieraTable: nuevaTabla
        }
    });

    
    

  },
      
      
///////////////////////////////////////////////////////////////////
   //let aux=state.
  loadCondicionFinanciera: (condicionFinanciera: CondicionFinanciera) => {
    // aqui va la logica
    const state = useCortoPlazoStore.getState();

    const CondicionesFinancieras: any = {
      condicionFinancieraTable: state.condicionFinancieraTable,
      tipoComision: condicionFinanciera.comisiones,
      //tasasEfectivas: condicionFinanciera.tasasEfectivas,
      importeDisposicion: condicionFinanciera.importeDisposicion,
      numeroPagoCapital: condicionFinanciera.numeroPagoCapital,
      capitalPeriocidadPago: state.capitalPeriocidadPago,
      tasaInteresTable: state.tasaInteresTable,
      tasaEfectivaTable: state.tasaEfectivaTable,
    };

    useCortoPlazoStore.setState({
      disposicionImporte: parseInt(condicionFinanciera.importeDisposicion),
    });
    useCortoPlazoStore.setState({
      disposicionFechaContratacion: condicionFinanciera.fechaDisposicion,
    });
    useCortoPlazoStore.setState({
      capitalFechaPrimerPago: condicionFinanciera.fechaPrimerPagoCapital,
    });
    useCortoPlazoStore.setState({
      capitalPeriocidadPago: condicionFinanciera.periocidadPagoCapital,
    });
    useCortoPlazoStore.setState({
      capitalNumeroPago: condicionFinanciera.numeroPagoCapital,
    });
    useCortoPlazoStore.setState({
      tasaInteresTable: condicionFinanciera.tasasInteres,
    });
    useCortoPlazoStore.setState({
      tasaEfectivaTable: condicionFinanciera.tasasEfectivas,
    });

    
    console.log("Condicion: ", condicionFinanciera);
    //state.disposicionImporte = importeDisposicion;
  },

  removeCondicionFinanciera: (index: number) =>
    set((state) => ({
      condicionFinancieraTable: state.condicionFinancieraTable.filter(
        (_, i) => i !== index
      ),
    })),
});

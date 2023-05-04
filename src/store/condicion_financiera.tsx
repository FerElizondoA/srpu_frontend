import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";
import { TasaInteres } from "./pagos_capital";
import { TasaEfectiva } from "./tasa_efectiva";
import { CondicionesFinancieras } from "../components/ObligacionesCortoPlazoPage/panels/CondicionesFinancieras";

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
  upDataCondicionFinanciera: (
    condicionFinanciera: CondicionFinanciera,
    index: number
  ) => void;
  removeCondicionFinanciera: (index: number) => void;
  updatecondicionFinancieraTable:(condicionFinancieraTable: CondicionFinanciera[]) => void;

}

export const createCondicionFinancieraSlice: StateCreator<
  CondicionFinancieraSlice
> = (set, get) => ({
  condicionFinancieraTable: [],
  updatecondicionFinancieraTable: (condicionFinancieraTable: CondicionFinanciera[]) => set(() => ({ condicionFinancieraTable: condicionFinancieraTable})),


  addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) =>
    set((state) => ({
      condicionFinancieraTable: [
        ...state.condicionFinancieraTable,
        newCondicionFinanciera,
      ],
    })),
  /////////////////////////////////////////////////////////////////

  upDataCondicionFinanciera: (
    condicionFinanciera: CondicionFinanciera,
    index: number
  ) => {
    set((state) => {
      const nuevaTabla = [...state.condicionFinancieraTable];

      nuevaTabla[index] = condicionFinanciera;

      return {
        condicionFinancieraTable: nuevaTabla,
      };
    });
  },

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
      tipoComision: condicionFinanciera.comisiones,
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
    //state.disposicionImporte = importeDisposicion;
  },

  removeCondicionFinanciera: (index: number) =>
    set((state) => ({
      condicionFinancieraTable: state.condicionFinancieraTable.filter(
        (_, i) => i !== index
      ),
    })),

});

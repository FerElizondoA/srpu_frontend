import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";

export interface TasaInteres {
  tasaFija: boolean;
  tasaVariable: boolean;
  tasa: string;
  fechaPrimerPago: string;
  diasEjercicio: string;
  periocidadPago: string;
  tasaReferencia: string;
  sobreTasa: string;
}

export interface IComisiones {
  fechaContratacion: string;
  tipoDeComision: string;
  periodicidadDePago: string;
  porcentajeFijo: boolean;
  montoFijo: boolean;
  porcentaje: string;
  monto: string;
  iva: boolean;
}

export type CondicionFinanciera = {
  id: number;
  disposicion: { fechaDisposicion: string; importe: number };
  pagosDeCapital: {
    fechaPrimerPago: string;
    periodicidadDePago: string;
    numeroDePago: number;
  };

  tasaInteres: TasaInteres[];
  comisiones: IComisiones[];
  tasaEfectiva: string;
  diasEjercicio: string;
};

export interface CondicionFinancieraSlice {
  tablaCondicionesFinancieras: CondicionFinanciera[];
  addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) => void;
  loadCondicionFinanciera: (condicionFinanciera: CondicionFinanciera) => void;
  upDataCondicionFinanciera: (
    condicionFinanciera: CondicionFinanciera,
    index: number
  ) => void;
  removeCondicionFinanciera: (index: number) => void;
  updatecondicionFinancieraTable: (
    tablaCondicionesFinancieras: CondicionFinanciera[]
  ) => void;
}

export const createCondicionFinancieraSlice: StateCreator<
  CondicionFinancieraSlice
> = (set, get) => ({
  tablaCondicionesFinancieras: [],
  addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) =>
    set((state) => ({
      tablaCondicionesFinancieras: [
        ...state.tablaCondicionesFinancieras,
        newCondicionFinanciera,
      ],
    })),

  loadCondicionFinanciera: (condicionFinanciera: CondicionFinanciera) => {
    useCortoPlazoStore.setState({
      disposicion: condicionFinanciera.disposicion,
    });
    useCortoPlazoStore.setState({
      pagosDeCapital: {
        fechaPrimerPago: condicionFinanciera.pagosDeCapital.fechaPrimerPago,
        periodicidadDePago: {
          Id: "0",
          Descripcion: condicionFinanciera.pagosDeCapital.periodicidadDePago,
        },
        numeroDePago: condicionFinanciera.pagosDeCapital.numeroDePago,
      },
    });
    useCortoPlazoStore.setState({
      tablaTasaInteres: condicionFinanciera.tasaInteres,
    });
    useCortoPlazoStore.setState({
      tablaComisiones: condicionFinanciera.comisiones,
    });
    useCortoPlazoStore.setState({
      tasaEfectiva: {
        diasEjercicio: {
          Id: "",
          Descripcion: condicionFinanciera.diasEjercicio,
        },
        tasaEfectiva: condicionFinanciera.tasaEfectiva,
      },
    });
  },
  upDataCondicionFinanciera: (
    condicionFinanciera: CondicionFinanciera,
    index: number
  ) => {
    set((state) => {
      const nuevaTabla = [...state.tablaCondicionesFinancieras];

      nuevaTabla[index] = condicionFinanciera;

      return {
        tablaCondicionesFinancieras: nuevaTabla,
      };
    });
  },
  removeCondicionFinanciera: (index: number) =>
    set((state) => ({
      tablaCondicionesFinancieras: state.tablaCondicionesFinancieras.filter(
        (_, i) => i !== index
      ),
    })),

  updatecondicionFinancieraTable: (
    tablaCondicionesFinancieras: CondicionFinanciera[]
  ) =>
    set(() => ({ tablaCondicionesFinancieras: tablaCondicionesFinancieras })),
});

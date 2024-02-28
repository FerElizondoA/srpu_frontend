import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";

export interface ITasaInteres {
  tasaFija: boolean;
  tasaVariable: boolean;
  tasa: string;
  fechaPrimerPago: string;
  diasEjercicio: string;
  periocidadPago: string;
  tasaReferencia: string;
  sobreTasa: string;
}

export interface IDisposicion {
  fechaDisposicion: string;
  importe: number;
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

export type ICondicionFinanciera = {
  id: number;
  disposicion: IDisposicion[];
  pagosDeCapital: {
    fechaPrimerPago: string;
    periodicidadDePago: string;
    numeroDePago: number;
  };

  tasaInteres: ITasaInteres[];
  comisiones: IComisiones[];
  tasaEfectiva: string;
  diasEjercicio: string;
};

export interface CondicionFinancieraSlice {
  tablaCondicionesFinancieras: ICondicionFinanciera[];
  addCondicionFinanciera: (
    newCondicionFinanciera: ICondicionFinanciera
  ) => void;
  loadCondicionFinanciera: (condicionFinanciera: ICondicionFinanciera) => void;
  upDataCondicionFinanciera: (
    condicionFinanciera: ICondicionFinanciera,
    index: number
  ) => void;
  removeCondicionFinanciera: (index: number) => void;
  updatecondicionFinancieraTable: (
    tablaCondicionesFinancieras: ICondicionFinanciera[]
  ) => void;
  cleanCondicionFinanciera: () => void;
}

export const createCondicionFinancieraSlice: StateCreator<
  CondicionFinancieraSlice
> = (set, get) => ({
  tablaCondicionesFinancieras: [],
  addCondicionFinanciera: (newCondicionFinanciera: ICondicionFinanciera) =>
    set((state) => ({
      tablaCondicionesFinancieras: [
        ...state.tablaCondicionesFinancieras,
        newCondicionFinanciera,
      ],
    })),

  loadCondicionFinanciera: (condicionFinanciera: ICondicionFinanciera) => {
    useCortoPlazoStore.setState({
      tablaDisposicion: condicionFinanciera.disposicion,
      disposicion: condicionFinanciera.disposicion[0]
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
    condicionFinanciera: ICondicionFinanciera,
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
    tablaCondicionesFinancieras: ICondicionFinanciera[]
  ) =>
    set(() => ({ tablaCondicionesFinancieras: tablaCondicionesFinancieras })),

  cleanCondicionFinanciera: () =>
    set(() => ({ tablaCondicionesFinancieras: [] })),
});

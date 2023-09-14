import { StateCreator } from "zustand";
import { useLargoPlazoStore } from "./main";
import {
  Disposicion,
  IComisiones,
  TasaInteres,
} from "../CreditoCortoPlazo/condicion_financiera";

export type CondicionFinancieraLP = {
  id: number;
  disposicion: Disposicion[];
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

export interface CondicionFinancieraLargoPlazoSlice {
  tablaCondicionesFinancieras: CondicionFinancieraLP[];
  addCondicionFinanciera: (
    newCondicionFinanciera: CondicionFinancieraLP
  ) => void;
  loadCondicionFinanciera: (condicionFinanciera: CondicionFinancieraLP) => void;
  upDataCondicionFinanciera: (
    condicionFinanciera: CondicionFinancieraLP,
    index: number
  ) => void;
  removeCondicionFinanciera: (index: number) => void;
  updatecondicionFinancieraTable: (
    tablaCondicionesFinancieras: CondicionFinancieraLP[]
  ) => void;
}

export const createCondicionFinancieraLargoPlazoSlice: StateCreator<
  CondicionFinancieraLargoPlazoSlice
> = (set, get) => ({
  tablaCondicionesFinancieras: [],
  addCondicionFinanciera: (newCondicionFinanciera: CondicionFinancieraLP) =>
    set((state) => ({
      tablaCondicionesFinancieras: [
        ...state.tablaCondicionesFinancieras,
        newCondicionFinanciera,
      ],
    })),

  loadCondicionFinanciera: (condicionFinanciera: CondicionFinancieraLP) => {
    useLargoPlazoStore.setState({
      tablaDisposicion: condicionFinanciera.disposicion,
    });
    useLargoPlazoStore.setState({
      pagosDeCapital: {
        fechaPrimerPago: condicionFinanciera.pagosDeCapital.fechaPrimerPago,
        periodicidadDePago: {
          Id: "0",
          Descripcion: condicionFinanciera.pagosDeCapital.periodicidadDePago,
        },
        numeroDePago: condicionFinanciera.pagosDeCapital.numeroDePago,
      },
    });
    useLargoPlazoStore.setState({
      tablaTasaInteres: condicionFinanciera.tasaInteres,
    });
    useLargoPlazoStore.setState({
      tablaComisiones: condicionFinanciera.comisiones,
    });

    useLargoPlazoStore.setState({
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
    condicionFinanciera: CondicionFinancieraLP,
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
    tablaCondicionesFinancieras: CondicionFinancieraLP[]
  ) =>
    set(() => ({ tablaCondicionesFinancieras: tablaCondicionesFinancieras })),
});

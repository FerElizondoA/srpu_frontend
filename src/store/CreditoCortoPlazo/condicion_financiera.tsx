import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";
import { IDisposicion, IPagosDeCapital, ITasaInteres } from "./pagos_capital";
import { IComisiones, ITasaEfectiva } from "./tasa_efectiva";

export interface ICondicionFinanciera {
  pagosDeCapital: IPagosDeCapital;
  disposicion: IDisposicion[];
  tasaInteres: ITasaInteres[];

  tasaEfectiva: ITasaEfectiva;
  comisiones: IComisiones[];
}

export interface CondicionFinancieraSlice {
  tablaCondicionesFinancieras: ICondicionFinanciera[];

  addCondicionFinanciera: (condicion: ICondicionFinanciera) => void;

  loadCondicionFinanciera: (condicionFinanciera: ICondicionFinanciera) => void;

  updateCondicionFinanciera: (
    condicionFinanciera: ICondicionFinanciera,
    index: number
  ) => void;

  removeCondicionFinanciera: (index: number) => void;

  cleanCondicionFinanciera: () => void;
}

export const createCondicionFinancieraSlice: StateCreator<
  CondicionFinancieraSlice
> = (set, get) => ({
  tablaCondicionesFinancieras: [],

  addCondicionFinanciera: (condicion: ICondicionFinanciera) => {
    set((state) => ({
      tablaCondicionesFinancieras: [
        ...state.tablaCondicionesFinancieras,
        condicion,
      ],
    }));
  },

  loadCondicionFinanciera: (condicionFinanciera: ICondicionFinanciera) => {
    useCortoPlazoStore.setState({
      tablaDisposicion: condicionFinanciera.disposicion,
      disposicion: condicionFinanciera.disposicion[0],
    });
    useCortoPlazoStore.setState({
      pagosDeCapital: {
        fechaPrimerPago: condicionFinanciera.pagosDeCapital.fechaPrimerPago,
        periodicidadDePago:
          condicionFinanciera.pagosDeCapital.periodicidadDePago,
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
        diasEjercicio: condicionFinanciera.tasaEfectiva.diasEjercicio,
        tasaEfectiva: condicionFinanciera.tasaEfectiva.tasaEfectiva,
      },
    });
  },

  updateCondicionFinanciera: (
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

  cleanCondicionFinanciera: () =>
    set(() => ({ tablaCondicionesFinancieras: [] })),
});

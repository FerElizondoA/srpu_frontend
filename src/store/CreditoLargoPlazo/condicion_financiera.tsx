import { StateCreator } from "zustand";
import { ICondicionFinanciera } from "../CreditoCortoPlazo/condicion_financiera";
import { useLargoPlazoStore } from "./main";

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
    useLargoPlazoStore.setState({
      tablaDisposicion: condicionFinanciera.disposicion,
    });
    useLargoPlazoStore.setState({
      pagosDeCapital: {
        fechaPrimerPago: condicionFinanciera.pagosDeCapital.fechaPrimerPago,
        periodicidadDePago:
          condicionFinanciera.pagosDeCapital.periodicidadDePago,
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
        diasEjercicio: condicionFinanciera.tasaEfectiva.diasEjercicio,
        tasaEfectiva: condicionFinanciera.tasaEfectiva.tasaEfectiva,
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
});

import { StateCreator } from "zustand";
import { format } from "date-fns";
import {
  IDisposicion,
  IPagosDeCapital,
  ITasaInteres,
} from "../CreditoCortoPlazo/pagos_capital";
import { IComisiones, ITasaEfectiva } from "../CreditoCortoPlazo/tasa_efectiva";
import { useLargoPlazoStore } from "./main";

export interface ICondicionFinanciera {
  pagosDeCapital: IPagosDeCapital;
  disposicion: IDisposicion[];
  tasaInteres: ITasaInteres[];

  tasaEfectiva: ITasaEfectiva;
  comisiones: IComisiones[];
}

export interface CondicionFinancieraSlice {
  indexRegistro: number;
  setIndexRegistro: (index: number) => void;

  tablaCondicionesFinancieras: ICondicionFinanciera[];

  addCondicionFinanciera: (condicion: ICondicionFinanciera) => void;

  loadCondicionFinanciera: (condicionFinanciera: ICondicionFinanciera) => void;

  updateCondicionFinanciera: (
    condicionFinanciera: ICondicionFinanciera
  ) => void;

  removeCondicionFinanciera: (index: number) => void;

  cleanCondicionFinanciera: () => void;
}

export const createCondicionFinancieraSlice: StateCreator<
  CondicionFinancieraSlice
> = (set, get) => ({
  indexRegistro: 0,
  setIndexRegistro: (index: number) => {
    set((state) => ({
      indexRegistro: index,
    }));
  },

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
    useLargoPlazoStore.setState({
      radioValue: 1,
      tasasParciales: condicionFinanciera.tasaInteres.length > 1,
      disposicionesParciales: condicionFinanciera.disposicion.length > 1,

      noAplica: condicionFinanciera.comisiones[0]?.monto === "N/A",

      pagosDeCapital: condicionFinanciera.pagosDeCapital,
      tablaDisposicion: condicionFinanciera.disposicion,
      tasaDeInteres:
        condicionFinanciera.tasaInteres.length === 1
          ? condicionFinanciera.tasaInteres[0]
          : {
              tasaFija: "",
              fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
              diasEjercicio: { Id: "", Descripcion: "" },
              periocidadPago: { Id: "", Descripcion: "" },
              tasaReferencia: { Id: "", Descripcion: "" },
              sobreTasa: 0,
            },
      tablaTasaInteres: condicionFinanciera.tasaInteres,

      tasaEfectiva: condicionFinanciera.tasaEfectiva,
      tablaComisiones: condicionFinanciera.comisiones,
    });
  },

  updateCondicionFinanciera: (condicionFinanciera: ICondicionFinanciera) => {
    set((state) => {
      const nuevaTabla = [...state.tablaCondicionesFinancieras];

      nuevaTabla[state.indexRegistro] = condicionFinanciera;

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

  cleanCondicionFinanciera: () => {
    useLargoPlazoStore.setState({
      radioValue: 1,
      tasasParciales: false,
      disposicionesParciales: false,

      noAplica: false,

      pagosDeCapital: {
        fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
        periodicidadDePago: { Id: "", Descripcion: "" },
        numeroDePago: 1,
      },
      disposicion: {
        fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
        importe: "$ 0.00",
      },
      tablaDisposicion: [],
      tasaDeInteres: {
        tasaFija: "",
        fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
        diasEjercicio: { Id: "", Descripcion: "" },
        periocidadPago: { Id: "", Descripcion: "" },
        tasaReferencia: { Id: "", Descripcion: "" },
        sobreTasa: 0,
      },
      tablaTasaInteres: [],

      tasaEfectiva: {
        tasaEfectiva: "",
        diasEjercicio: { Id: "", Descripcion: "" },
      },
      comision: {
        fechaComision: format(new Date(), "MM/dd/yyyy").toString(),
        tipoDeComision: { Id: "", Descripcion: "" },
        periodicidadDePago: { Id: "", Descripcion: "" },
        monto: "0",
        porcentaje: "",
        iva: false,
      },
      tablaComisiones: [],
    });
  },

  cleanTablaCondicionesFinancieras: () =>
    set(() => ({ tablaCondicionesFinancieras: [] })),
});

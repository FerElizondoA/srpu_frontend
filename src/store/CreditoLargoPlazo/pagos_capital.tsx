import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { format } from "date-fns";
import { moneyMask } from "../../components/ObligacionesCortoPlazoPage/Panels/InformacionGeneral";
import {
  IDisposicion,
  IPagosDeCapital,
  ITasaInteres,
} from "../CreditoCortoPlazo/pagos_capital";

export interface PagosCapitalSlice {
  radioValue: number;
  setRadioValue: (radioValue: number) => void;

  tasasParciales: boolean;
  setTasasParciales: () => void;

  disposicionesParciales: boolean;
  setDisposicionesParciales: () => void;

  pagosDeCapital: IPagosDeCapital;
  setPagosDeCapital: (pagosDeCapital: IPagosDeCapital) => void;

  disposicion: IDisposicion;
  setDisposicion: (disposicion: IDisposicion) => void;
  tablaDisposicion: IDisposicion[];

  tasaDeInteres: ITasaInteres;
  setTasaInteres: (tasaDeInteres: ITasaInteres | ((prev: ITasaInteres) => ITasaInteres)) => void;
  cleanTasaInteres: () => void;
  tablaTasaInteres: ITasaInteres[];

  addDisposicion: (Disposicion: IDisposicion) => void;
  setTablaDisposicion: (Disposicion: IDisposicion[]) => void;
  cleanDisposicion: (monto: string) => void;
  removeDisposicion: (index: number) => void;

  addTasaInteres: (newTasaInteres: ITasaInteres) => void;
  setTablaTasaInteres: (tasaInteresTable: ITasaInteres[]) => void;
  cleanTablaTasaInteres: (monto: string) => void;
  removeTasaInteres: (index: number) => void;

  catalogoPeriocidadDePago: ICatalogo[];
  catalogoTasaReferencia: ICatalogo[];
  catalogoDiasEjercicio: ICatalogo[];
  getPeriocidadPago: () => void;
  getTasaReferencia: () => void;
  getDiasEjercicio: () => void;
}

export const createPagosCapitalSlice: StateCreator<PagosCapitalSlice> = (
  set,
  get
) => ({
  radioValue: 1,
  setRadioValue: (radioValue: number) => {
    set((state) => ({
      radioValue: radioValue,
    }));
  },

  tasasParciales: false,
  setTasasParciales: () => {
    set((state) => ({
      tasasParciales: !state.tasasParciales,
    }));
  },

  disposicionesParciales: false,
  setDisposicionesParciales: () => {
    set((state) => ({
      disposicionesParciales: !state.disposicionesParciales,
    }));
  },

  pagosDeCapital: {
    fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
    periodicidadDePago: { Id: "", Descripcion: "", detallePeriodicidadPago: "" },
    numeroDePago: 1,
    periodoGracia: false,
  },
  setPagosDeCapital: (pagosDeCapital: IPagosDeCapital) => {
    set((state) => ({
      pagosDeCapital: pagosDeCapital,
    }));
  },
  disposicion: {
    fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
    importe: "$ 0.00",
    montoDisposición: "$ 0.00"
  },
  setDisposicion: (disposicion: IDisposicion) => {
    set((state) => ({
      disposicion: disposicion,
    }));
  },
  tablaDisposicion: [],

  tasaDeInteres: {
    // fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
    Disposiciones: {
      fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
      fechaIndicativa: false
    },
    importe: "$ 0.00",
    montoDisposición: "$ 0.00",

    tasaFija: "",
    fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
    diasEjercicio: { Id: "", Descripcion: "" },
    periocidadPago: { Id: "", Descripcion: "", detallePeriodicidadPago: 0 },
    tasaReferencia: { Id: "", Descripcion: "" },
    sobreTasa: "",
  },
  setTasaInteres: (tasa) =>
    set((state) => ({
      tasaDeInteres:
        typeof tasa === "function"
          ? tasa(state.tasaDeInteres)
          : tasa,
    })),
  tablaTasaInteres: [],

  addDisposicion: (Disposicion: IDisposicion) =>
    set((state) => ({
      tablaDisposicion: [...state.tablaDisposicion, Disposicion],
    })),

  setTablaDisposicion: (Disposicion: IDisposicion[]) =>
    set(() => ({ tablaDisposicion: Disposicion })),

  cleanDisposicion: (monto: string) =>
    set((state) => ({
      tablaDisposicion: [
        {
          fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
          importe: monto,
          montoDisposición: "$ 0.00"
        },
      ],
    })),
  removeDisposicion: (index: number) =>
    set((state) => ({
      tablaDisposicion: state.tablaDisposicion.filter((_, i) => i !== index),
    })),

  addTasaInteres: (newTasaInteres: ITasaInteres) =>
    set((state) => ({
      tablaTasaInteres: [...state.tablaTasaInteres, newTasaInteres],
    })),
  setTablaTasaInteres: (tasaInteres: ITasaInteres[]) =>
    set(() => ({ tablaTasaInteres: tasaInteres })),

  removeTasaInteres: (index: number) =>
    set((state) => ({
      tablaTasaInteres: state.tablaTasaInteres.filter((_, i) => i !== index),
    })),

  catalogoPeriocidadDePago: [],
  catalogoTasaReferencia: [],
  catalogoDiasEjercicio: [],

  getPeriocidadPago: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-periodicidadDePago", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        set((state) => ({
          catalogoPeriocidadDePago: data.data,
        }));
      });
  },
  
  cleanTasaInteres: () => {
    set((state) => ({
      tasaDeInteres: {
        Disposiciones: {
          fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
          fechaIndicativa: false
        },
        importe: "$ 0.00",
        montoDisposición: "$ 0.00",
        tasaFija: "",
        fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
        diasEjercicio: { Id: "", Descripcion: "" },
        periocidadPago: { Id: "", Descripcion: "", detallePeriodicidadPago: 0 },
        tasaReferencia: { Id: "", Descripcion: "" },
        sobreTasa: "",
      }
    }));
  },
  cleanTablaTasaInteres: (monto: string) =>
    set(() => ({
      tablaTasaInteres: [
        {
          Disposiciones: {
            fechaDisposicion: format(new Date(), "MM/dd/yyyy").toString(),
            fechaIndicativa: false,
          },
          importe: moneyMask(monto.toString()),
          montoDisposición: "$ 0.00",
          tasaFija: "",
          fechaPrimerPago: format(new Date(), "MM/dd/yyyy").toString(),
          diasEjercicio: { Id: "", Descripcion: "" },
          periocidadPago: { Id: "", Descripcion: "", detallePeriodicidadPago: 0 },
          tasaReferencia: { Id: "", Descripcion: "" },
          sobreTasa: "",
        },
      ],
    })),



  getTasaReferencia: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tasaDeReferencia", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        set((state) => ({
          catalogoTasaReferencia: data.data,
        }));
      });
  },
  getDiasEjercicio: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-diasDelEjercicio", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        set((state) => ({
          catalogoDiasEjercicio: data.data,
        }));
      });
  },
});

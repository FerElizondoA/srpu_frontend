import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { IDisposicion, ITasaInteres } from "./condicion_financiera";

export interface PagosCapitalSlice {
  disposicionesParciales: boolean;
  setDisposicionesParciales: (bol: boolean) => void;
  tasasParciales: boolean;
  setTasasParciales: (bol: boolean) => void;

  tablaDisposicion: IDisposicion[];
  disposicion: {
    fechaDisposicion: string;
    importe: number;
  };

  pagosDeCapital: {
    fechaPrimerPago: string;
    periodicidadDePago: { Id: string; Descripcion: string };
    numeroDePago: number;
  };

  tablaTasaInteres: ITasaInteres[];
  tasaInteres: {
    tasaFija: boolean;
    tasaVariable: boolean;
    tasa: number;
    fechaPrimerPago: string;
    diasEjercicio: { Id: string; Descripcion: string };
    periocidadPago: { Id: string; Descripcion: string };
    tasaReferencia: { Id: string; Descripcion: string };
    sobreTasa: string;
  };

  catalogoPeriocidadDePago: ICatalogo[];
  catalogoTasaReferencia: ICatalogo[];
  catalogoDiasEjercicio: ICatalogo[];

  changeDisposicion: (fechaDisposicion: string, importe: number) => void;

  addDisposicion: (Disposicion: IDisposicion) => void;
  updateDisposicion: (Disposicion: IDisposicion[]) => void;
  cleanDisposicion: (monto: number) => void;
  removeDisposicion: (index: number) => void;

  changeCapital: (
    fechaPrimerPago: string,
    periodicidadDePago: { Id: string; Descripcion: string },
    numeroDePago: number
  ) => void;

  changeTasaInteres: (
    tasaFija: boolean,
    tasaVariable: boolean,
    tasa: string,
    fechaPrimerPago: string,
    diasEjercicio: { Id: string; Descripcion: string },
    periocidadPago: { Id: string; Descripcion: string },
    tasaReferencia: { Id: string; Descripcion: string },
    sobreTasa: string
  ) => void;

  addTasaInteres: (newTasaInteres: ITasaInteres) => void;
  updatePagosCapitalTable: (tasaInteresTable: ITasaInteres[]) => void;
  cleanTasaInteres: () => void;
  removeTasaInteres: (index: number) => void;

  getPeriocidadPago: () => void;
  getTasaReferencia: () => void;
  getDiasEjercicio: () => void;
}

export const createPagosCapitalSlice: StateCreator<PagosCapitalSlice> = (
  set,
  get
) => ({
  disposicionesParciales: false,
  setDisposicionesParciales: (bol: boolean) =>
    set(() => ({
      disposicionesParciales: bol,
    })),
  tasasParciales: false,
  setTasasParciales: (bol: boolean) =>
    set(() => ({
      tasasParciales: bol,
    })),
  tablaDisposicion: [],
  disposicion: {
    fechaDisposicion: new Date().toString(),
    importe: 0,
  },
  pagosDeCapital: {
    fechaPrimerPago: new Date().toString(),
    periodicidadDePago: { Id: "", Descripcion: "" },
    numeroDePago: 1,
  },
  tablaTasaInteres: [],
  tasaInteres: {
    tasaFija: false,
    tasaVariable: false,
    tasa: 0,
    fechaPrimerPago: new Date().toString(),
    diasEjercicio: { Id: "", Descripcion: "" },
    periocidadPago: { Id: "", Descripcion: "" },
    tasaReferencia: { Id: "", Descripcion: "" },
    sobreTasa: "",
  },
  tasaEfectiva: "",
  diasEjercicio: { Id: "", Descripcion: "" },

  catalogoPeriocidadDePago: [],
  catalogoTasaReferencia: [],
  catalogoDiasEjercicio: [],

  changeDisposicion: (fechaDisposicion: string, importe: number) =>
    set(() => ({
      disposicion: {
        fechaDisposicion: fechaDisposicion,
        importe: importe,
      },
    })),

  addDisposicion: (Disposicion: IDisposicion) =>
    set((state) => ({
      tablaDisposicion: [...state.tablaDisposicion, Disposicion],
    })),

  updateDisposicion: (Disposicion: IDisposicion[]) =>
    set(() => ({ tablaDisposicion: Disposicion })),

  removeDisposicion: (index: number) =>
    set((state) => ({
      tablaDisposicion: state.tablaDisposicion.filter((_, i) => i !== index),
    })),

  cleanDisposicion: (monto: number) =>
    set((state) => ({
      tablaDisposicion: [
        {
          fechaDisposicion: new Date().toString(),
          importe: monto,
        },
      ],
    })),

  changeCapital: (
    fechaPrimerPago: string,
    periodicidadDePago: { Id: string; Descripcion: string },
    numeroDePago: number
  ) =>
    set(() => ({
      pagosDeCapital: {
        fechaPrimerPago: fechaPrimerPago,
        periodicidadDePago: {
          Id: periodicidadDePago.Id,
          Descripcion: periodicidadDePago.Descripcion,
        },
        numeroDePago: numeroDePago,
      },
    })),

  changeTasaInteres: (tasaInteres: any) =>
    set(() => ({
      tasaInteres: tasaInteres,
    })),

  addTasaInteres: (newTasaInteres: ITasaInteres) =>
    set((state) => ({
      tablaTasaInteres: [...state.tablaTasaInteres, newTasaInteres],
    })),

  updatePagosCapitalTable: (tasaInteres: ITasaInteres[]) =>
    set(() => ({ tablaTasaInteres: tasaInteres })),

  removeTasaInteres: (index: number) =>
    set((state) => ({
      tablaTasaInteres: state.tablaTasaInteres.filter((_, i) => i !== index),
    })),

  cleanTasaInteres: () => set((state) => ({ tablaTasaInteres: [] })),

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

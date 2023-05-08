import { StateCreator } from "zustand";
import axios from "axios";
import { IComisiones, TasaInteres } from "./condicion_financiera";
import { ICatalogo } from "../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export interface PagosCapitalSlice {
  disposicion: { fechaDisposicion: string; importe: number };

  pagosDeCapital: {
    fechaPrimerPago: string;
    periodicidadDePago: { Id: string; Descripcion: string };
    numeroDePago: number;
  };

  tablaTasaInteres: TasaInteres[];
  tasaInteres: {
    tasaFija: false;
    tasaVariable: false;
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

  changeDisposicion: (newFechaContratacion: string, newImporte: number) => void;

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

  addTasaInteres: (newTasaInteres: TasaInteres) => void;
  updatePagosCapitalTable: (tasaInteresTable: TasaInteres[]) => void;
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
  disposicion: { fechaDisposicion: new Date().toString(), importe: 0 },
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

  changeDisposicion: (newFechaContratacion: string, newImporte: number) =>
    set(() => ({
      disposicion: {
        fechaDisposicion: newFechaContratacion,
        importe: newImporte,
      },
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

  addTasaInteres: (newTasaInteres: TasaInteres) =>
    set((state) => ({
      tablaTasaInteres: [...state.tablaTasaInteres, newTasaInteres],
    })),

  updatePagosCapitalTable: (tasaInteres: TasaInteres[]) =>
    set(() => ({ tablaTasaInteres: tasaInteres })),

  removeTasaInteres: (index: number) =>
    set((state) => ({
      tablaTasaInteres: state.tablaTasaInteres.filter((_, i) => i !== index),
    })),

  cleanTasaInteres: () => set((state) => ({ tablaTasaInteres: [] })),

  getPeriocidadPago: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-periodicidadDePago",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        set((state) => ({
          catalogoPeriocidadDePago: data.data,
        }));
      });
  },

  getTasaReferencia: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-tasaDeReferencia",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        set((state) => ({
          catalogoTasaReferencia: data.data,
        }));
      });
  },
  getDiasEjercicio: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-diasDelEjercicio",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        set((state) => ({
          catalogoDiasEjercicio: data.data,
        }));
      });
  },
});

import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export interface IPagosDeCapital {
  fechaPrimerPago: string;
  periodicidadDePago: { Id: string; Descripcion: string };
  numeroDePago: number;
}
export interface IDisposicion {
  fechaDisposicion: string;
  importe: string;
}
export interface ITasaInteres {
  fechaPrimerPago: string;
  tasaFija: string;
  diasEjercicio: { Id: string; Descripcion: string };
  periocidadPago: { Id: string; Descripcion: string };
  tasaReferencia: { Id: string; Descripcion: string };
  sobreTasa: number;
}

export interface PagosCapitalSlice {
  pagosDeCapital: IPagosDeCapital;
  setPagosDeCapital: (pagosDeCapital: IPagosDeCapital) => void;

  disposicion: IDisposicion;
  setDisposicion: (disposicion: IDisposicion) => void;
  tablaDisposicion: IDisposicion[];

  tasaDeInteres: ITasaInteres;
  setTasaInteres: (tasaDeInteres: ITasaInteres) => void;
  tablaTasaInteres: ITasaInteres[];

  addDisposicion: (Disposicion: IDisposicion) => void;
  setTablaDisposicion: (Disposicion: IDisposicion[]) => void;
  cleanDisposicion: (monto: string) => void;
  removeDisposicion: (index: number) => void;

  addTasaInteres: (newTasaInteres: ITasaInteres) => void;
  setTablaTasaInteres: (tasaInteresTable: ITasaInteres[]) => void;
  cleanTasaInteres: () => void;
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
  pagosDeCapital: {
    fechaPrimerPago: new Date().toString(),
    periodicidadDePago: { Id: "", Descripcion: "" },
    numeroDePago: 1,
  },
  setPagosDeCapital: (pagosDeCapital: IPagosDeCapital) => {
    set((state) => ({
      pagosDeCapital: pagosDeCapital,
    }));
  },
  disposicion: {
    fechaDisposicion: new Date().toString(),
    importe: "$ 0.00",
  },
  setDisposicion: (disposicion: IDisposicion) => {
    set((state) => ({
      disposicion: disposicion,
    }));
  },
  tablaDisposicion: [],

  tasaDeInteres: {
    tasaFija: "",
    fechaPrimerPago: new Date().toString(),
    diasEjercicio: { Id: "", Descripcion: "" },
    periocidadPago: { Id: "", Descripcion: "" },
    tasaReferencia: { Id: "", Descripcion: "" },
    sobreTasa: 0,
  },
  setTasaInteres: (tasaDeInteres: ITasaInteres) => {
    set((state) => ({
      tasaDeInteres: tasaDeInteres,
    }));
  },
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
          fechaDisposicion: new Date().toString(),
          importe: monto,
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
  cleanTasaInteres: () => set((state) => ({ tablaTasaInteres: [] })),
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

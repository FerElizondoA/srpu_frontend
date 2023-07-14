import { StateCreator } from "zustand";

export interface GeneralAutorizacion {
  municipio: string;
  numeroAutorizacionLegislaturaLocal: string;
  fechaPublicacion: string;
  medioPublicacion: string;
  montoAutorizado: string;
  documentoSoporte: { archivo: File; nombreArchivo: string };
  acreditacionQuorum: { archivo: File; nombreArchivo: string };
}

export interface MontoAutorizado {
  destinoAutorizado: string;
  montoAutorizado: string;
}

export interface Autorizacion {
  generalAutorizacion: GeneralAutorizacion;
  montoAutorizado: MontoAutorizado[];
}

export interface AutorizacionSlice {
  generalAutorizacion: GeneralAutorizacion;
  montoAutorizado: MontoAutorizado[];

  autorizacion: Autorizacion;

  newAutorizacion: (newAutorizacion: {
    Apartado: string;
    Autorizacion: string;
  }) => void;

  cleanGeneralAutorizacion: () => void;
}

export const createAutorizacionSlice: StateCreator<AutorizacionSlice> = (
  set,
  get
) => ({
  generalAutorizacion: {
    municipio: "",
    numeroAutorizacionLegislaturaLocal: "",
    fechaPublicacion: "",
    medioPublicacion: "",
    montoAutorizado: "",
    documentoSoporte: { archivo: new File([], ""), nombreArchivo: "" },
    acreditacionQuorum: { archivo: new File([], ""), nombreArchivo: "" },
  },

  montoAutorizado: [],

  autorizacion: {
    generalAutorizacion: get().generalAutorizacion,
    montoAutorizado: get().montoAutorizado,
  },

  cleanGeneralAutorizacion: () => {
    // set((state) => ({
    //   comentarios: {},
    // }));
  },

  newAutorizacion: (newAutorizacion: {
    Apartado: string;
    Autorizacion: string;
  }) => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newAutorizacion.Apartado]: newAutorizacion.Autorizacion,
    //   },
    // }));
  },

  removeAutorizacion: (apartado: string, Tab: string) => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [apartado]: "",
    //   },
    // }));
  },

  setAutorizacions: (comentarios: any) => {
    // set((state) => ({
    //   comentarios: comentarios,
    // }));
  },
});

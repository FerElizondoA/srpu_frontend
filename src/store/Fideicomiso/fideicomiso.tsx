import { StateCreator } from "zustand";

export interface GeneralFideicomiso {
  numeroFideicomiso: string;
  tipoFideicomiso: string;
  fechaFideicomiso: string;
  fiudiciario: string;
}

export interface Fideicomisario {
  fideicomisario: string;
  ordenFideicomisario: string;
}

export interface TipoMovimiento {
  tipo: string;
  tipoFideicomitente: string;
  tipoFuente: string;
  fondoOIngreso: string;
}

export interface SoporteDocumental {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
}

export interface Fideicomiso {
  generalFideicomiso: GeneralFideicomiso;
  fideicomisario: Fideicomisario[];
  tipoMovimiento: TipoMovimiento[];
  soporteDocumental: SoporteDocumental[];
}

export interface FideicomisoSlice {
  generalFideicomiso: GeneralFideicomiso;
  fideicomisario: Fideicomisario;
  tipoMovimiento: TipoMovimiento;
  soporteDocumental: SoporteDocumental;

  tablaFideicomisario: Fideicomisario[];
  tablaTipoMovimiento: TipoMovimiento[];
  tablaSoporteDocumental: SoporteDocumental[];

  //   fideicomiso: Fideicomiso;

  setGeneralFideicomiso: (generalFideicomiso: GeneralFideicomiso) => void;
  setFideicomisario: (fideicomisario: Fideicomisario) => void;

  addFideicomisario: (fideicomisario: Fideicomisario) => void;
  addTipoMovimiento: (tipoMovimiento: TipoMovimiento) => void;
  addSoporteDocumental: (soporteDocumental: SoporteDocumental) => void;

  deleteFideicomisario: () => void;
  deleteTipoMovimiento: () => void;
  deleteSoporteDocumental: () => void;

  cleanFideicomisario: () => void;
  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;
}

export const createFideicomisoSlice: StateCreator<FideicomisoSlice> = (
  set,
  get
) => ({
  generalFideicomiso: {
    numeroFideicomiso: "",
    tipoFideicomiso: "",
    fechaFideicomiso: "",
    fiudiciario: "",
  },
  fideicomisario: { fideicomisario: "", ordenFideicomisario: "" },
  tipoMovimiento: {
    tipo: "",
    tipoFideicomitente: "",
    tipoFuente: "",
    fondoOIngreso: "",
  },
  soporteDocumental: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
  },

  tablaFideicomisario: [],
  tablaTipoMovimiento: [],
  tablaSoporteDocumental: [],

  //   fideicomiso: {
  //     generalFideicomiso: get().generalFideicomiso,
  //     fideicomisario: get().tablaFideicomisario,
  //     tipoMovimiento: get().tablaTipoMovimiento,
  //     soporteDocumental: get().tablaSoporteDocumental,
  //   },

  setGeneralFideicomiso: (generalFideicomiso: GeneralFideicomiso) => {
    set(() => ({
      generalFideicomiso: {
        numeroFideicomiso: generalFideicomiso.numeroFideicomiso,
        tipoFideicomiso: generalFideicomiso.tipoFideicomiso,
        fechaFideicomiso: generalFideicomiso.fechaFideicomiso,
        fiudiciario: generalFideicomiso.fiudiciario,
      },
    }));
  },

  setFideicomisario: (fideicomisario: Fideicomisario) => {
    set(() => ({
      fideicomisario: {
        fideicomisario: fideicomisario.fideicomisario,
        ordenFideicomisario: fideicomisario.ordenFideicomisario,
      },
    }));
  },

  addFideicomisario: (fideicomisario: Fideicomisario) => {
    set((state) => ({
      tablaFideicomisario: {
        ...state.tablaFideicomisario,
        fideicomisario,
      },
    }));
  },
  addTipoMovimiento: (tipoMovimiento: TipoMovimiento) => {
    set((state) => ({
      tablaTipoMovimiento: {
        ...state.tablaTipoMovimiento,
        tipoMovimiento,
      },
    }));
  },
  addSoporteDocumental: (soporteDocumental: SoporteDocumental) => {
    set((state) => ({
      tablaSoporteDocumental: {
        ...state.tablaSoporteDocumental,
        soporteDocumental,
      },
    }));
  },

  deleteFideicomisario: () => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newFideicomiso.Apartado]: newFideicomiso.Fideicomiso,
    //   },
    // }));
  },
  deleteTipoMovimiento: () => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newFideicomiso.Apartado]: newFideicomiso.Fideicomiso,
    //   },
    // }));
  },
  deleteSoporteDocumental: () => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newFideicomiso.Apartado]: newFideicomiso.Fideicomiso,
    //   },
    // }));
  },

  cleanFideicomisario: () => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newFideicomiso.Apartado]: newFideicomiso.Fideicomiso,
    //   },
    // }));
  },
  cleanTipoMovimiento: () => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newFideicomiso.Apartado]: newFideicomiso.Fideicomiso,
    //   },
    // }));
  },
  cleanSoporteDocumental: () => {
    // set((state) => ({
    //   comentarios: {
    //     ...state.comentarios,
    //     [newFideicomiso.Apartado]: newFideicomiso.Fideicomiso,
    //   },
    // }));
  },
});

import { StateCreator } from "zustand";
import axios from "axios";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { format } from "date-fns";

export interface ITasaEfectiva {
  tasaEfectiva: string;
  //diasEjercicio: { Id: string; Descripcion: string };
}
// export interface IComisiones {
//   fechaComision: string;
//   tipoDeComision: { Id: string; Descripcion: string, detallOtrasComisiones: "", };
//   periodicidadDePago: { Id: string; Descripcion: string, detallePerfilEspecifico: "", };
//   porcentaje: string;
//   monto: string;
//   iva: boolean;
// }

export interface IComisiones {
  fechaComision: string;

  tipoDeComision: {
    Id: string;
    Descripcion: string;
    detallOtrasComisiones: string;
  };

  periodicidadDePago: {
    Id: string;
    Descripcion: string;
    detallePerfilEspecifico: string;
  };

  porcentaje: string;
  monto: string;
  iva: boolean;
}

export interface TasaEfectivaSlice {
  noAplica: boolean;
  setNoAplica: () => void;

  tasaEfectiva: ITasaEfectiva;
  setTasaEfectiva: (tasaEfectiva: ITasaEfectiva) => void;

  comision: IComisiones;
  setComision: (comisiones: IComisiones) => void;
  cleanComisiones: () => void;
  tablaComisiones: IComisiones[];

  addComision: (newComision: IComisiones) => void;
  setTablaComisiones: (newTablaComisiones: IComisiones[]) => void;
  cleanTablaComision: () => void;
  removeComision: (index: number) => void;

  catalogoTiposComision: ICatalogo[];
  getTiposComision: () => void;
}

export const createTasaEfectivaSlice: StateCreator<TasaEfectivaSlice> = (
  set,
  get
) => ({
  noAplica: false,
  setNoAplica: () => {
    set((state) => ({
      noAplica: !state.noAplica,
    }));
  },

  tasaEfectiva: {
    tasaEfectiva: "",
    diasEjercicio: { Id: "", Descripcion: "" },
  },
  setTasaEfectiva: (tasaEfectiva: ITasaEfectiva) =>
    set(() => ({
      tasaEfectiva: tasaEfectiva,
    })),


  comision: {
    fechaComision: format(new Date(), "MM/dd/yyyy").toString(),

    tipoDeComision: {
      Id: "",
      Descripcion: "",
      detallOtrasComisiones: "",
    },

    periodicidadDePago: {
      Id: "",
      Descripcion: "",
      detallePerfilEspecifico: "",
    },
    monto: "0",
    porcentaje: "",
    iva: false,
  },


  cleanComisiones: () =>
    set((state) => ({
      comision: {
        fechaComision: format(new Date(), "MM/dd/yyyy").toString(),

        tipoDeComision: {
          Id: "",
          Descripcion: "",
          detallOtrasComisiones: "",
        },

        periodicidadDePago: {
          Id: "",
          Descripcion: "",
          detallePerfilEspecifico: "",
        },

        monto: "0",
        porcentaje: "",
        iva: false,
      },
    })),

  setComision: (comision: IComisiones) =>
    set(() => ({
      comision: comision,
    })),
  tablaComisiones: [],

  catalogoTiposComision: [],

  addComision: (newComision: IComisiones) =>
    set((state) => ({
      tablaComisiones: [...state.tablaComisiones, newComision],
    })),

  setTablaComisiones: (newTablaComisiones: IComisiones[]) =>
    set(() => ({ tablaComisiones: newTablaComisiones })),

  cleanTablaComision: () => set((state) => ({ tablaComisiones: [] })),

  removeComision: (index: number) =>
    set((state) => ({
      tablaComisiones: state.tablaComisiones.filter((_, i) => i !== index),
    })),

  getTiposComision: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tipoDeComision", {
        headers: { Authorization: localStorage.getItem("jwtToken") },
      })
      .then(({ data }) => {
        set((state) => ({ catalogoTiposComision: data.data }));
      });
  },
});

import { StateCreator } from "zustand";
import axios from "axios";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { IComisiones } from "./condicion_financiera";

export interface TasaEfectivaSlice {
  tablaComisiones: IComisiones[];
  comision: {
    fechaContratacion: string;
    tipoDeComision: { Id: string; Descripcion: string };
    periodicidadDePago: { Id: string; Descripcion: string };
    porcentajeFijo: boolean;
    montoFijo: boolean;
    porcentaje: string;
    monto: string;
    iva: string;
  };

  tasaEfectiva: {
    diasEjercicio: { Id: string; Descripcion: string };
    tasaEfectiva: string;
  };

  catalogoTiposComision: ICatalogo[];

  changeComision: (comision: any) => void;

  changeTasaEfectiva: (
    diasEjercicio: { Id: string; Descripcion: string },
    tasaEfectiva: string
  ) => void;

  addComision: (newComision: IComisiones) => void;
  updateTablaComisiones: (newTablaComisiones: IComisiones[]) => void;
  cleanComision: () => void;
  removeComision: (index: number) => void;

  getTiposComision: () => void;
}

export const createTasaEfectivaSlice: StateCreator<TasaEfectivaSlice> = (
  set,
  get
) => ({
  tablaComisiones: [],
  comision: {
    fechaContratacion: new Date().toString(),
    tipoDeComision: { Id: "", Descripcion: "" },
    periodicidadDePago: { Id: "", Descripcion: "" },
    porcentajeFijo: false,
    montoFijo: false,
    monto: "0",
    porcentaje: "",
    iva: "NO",
  },
  tasaEfectiva: {
    diasEjercicio: { Id: "", Descripcion: "" },
    tasaEfectiva: "",
  },

  catalogoTiposComision: [],

  changeComision: (comision: any) =>
    set(() => ({
      comision: comision,
    })),

  changeTasaEfectiva: (tasaEfectiva: any) =>
    set(() => ({
      tasaEfectiva: tasaEfectiva,
    })),

  addComision: (newComision: IComisiones) =>
    set((state) => ({
      tablaComisiones: [...state.tablaComisiones, newComision],
    })),

  updateTablaComisiones: (newTablaComisiones: IComisiones[]) =>
    set(() => ({ tablaComisiones: newTablaComisiones })),

  removeComision: (index: number) =>
    set((state) => ({
      tablaComisiones: state.tablaComisiones.filter((_, i) => i !== index),
    })),

  cleanComision: () => set((state) => ({ tablaComisiones: [] })),

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

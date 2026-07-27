import { StateCreator } from "zustand";
import axios from "axios";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { format } from "date-fns";
import { IComisiones, ITasaEfectiva } from "../CreditoCortoPlazo/tasa_efectiva";

export interface TasaEfectivaSlice {
  noAplica: boolean;
  setNoAplica: () => void;

  tasaEfectiva: ITasaEfectiva;
  setTasaEfectiva: (tasaEfectiva: ITasaEfectiva) => void;

  comision: IComisiones;
  setComision: (comisiones: IComisiones) => void;
  tablaComisiones: IComisiones[];

  addComision: (newComision: IComisiones) => void;
  setTablaComisiones: (newTablaComisiones: IComisiones[]) => void;
  cleanComisiones: () => void;
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
  setComision: (comision: IComisiones) =>
    set(() => ({
      comision: comision,
    })),
  tablaComisiones: [],

  catalogoTiposComision: [],



  setTablaComisiones: (newTablaComisiones: IComisiones[]) =>
    set(() => ({ tablaComisiones: newTablaComisiones })),

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

  cleanTablaComision: () => set((state) => ({ tablaComisiones: [] })),

  addComision: (newComision: IComisiones) =>
    set((state) => ({
      tablaComisiones: [...state.tablaComisiones, JSON.parse(JSON.stringify(newComision))],
    })),

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

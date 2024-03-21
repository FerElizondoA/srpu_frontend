import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import {
  IInformacionGeneral,
  IObligadoSolidarioAval,
} from "../CreditoCortoPlazo/informacion_general";
import { useLargoPlazoStore } from "./main";

export interface IGastosCostos {
  destino: { Id: string; Descripcion: string };
  detalleInversion: { Id: string; Descripcion: string };
  archivoDetalleInversion: {
    archivo: File;
    nombreArchivo: string;
  };
  claveInscripcionFinanciamiento: string;
  descripcion: string;
  monto: number;
  gastosAdicionales: string;
  montoGastosAdicionales: number;
  saldoVigente: number;
}

export interface InformacionGeneralSlice {
  informacionGeneral: IInformacionGeneral;

  generalObligadoSolidarioAval: {
    obligadoSolidario: string;
    tipoEntePublicoObligado: { Id: string; Descripcion: string };
    entePublicoObligado: { Id: string; Descripcion: string };
  };
  tablaObligadoSolidarioAval: IObligadoSolidarioAval[];

  gastosCostos: IGastosCostos;

  tablaGastosCostos: IGastosCostos[];

  changeInformacionGeneral: (informacionGeneral: any) => void;

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: IObligadoSolidarioAval
  ) => void;

  changeObligadoSolidarioAval: (
    obligadoSolidario: { Id: string; Descripcion: string },
    tipoEntePublicoObligado: { Id: string; Descripcion: string },
    entePublicoObligado: { Id: string; Descripcion: string }
  ) => void;

  cleanObligadoSolidarioAval: () => void;

  removeObligadoSolidarioAval: (index: number) => void;

  changeGastosCostos: (GastosCostos: IGastosCostos) => void;

  addGastosCostos: (GastosCostos: IGastosCostos) => void;

  cleanGastosCostos: () => void;
  cleanTablaGastosCostos: () => void;

  removeGastosCostos: (index: number) => void;

  addDocumento: (newDocumento: File, nombreArchivo: string) => void;
  removeDocumento: (index: number) => void;

  catalogoDetallesInversion: ICatalogo[];
  getDetallesInversion: () => void;
}

export const createInformacionGeneralSlice: StateCreator<
  InformacionGeneralSlice
> = (set, get) => ({
  informacionGeneral: {
    fechaContratacion: new Date().toString(),
    fechaVencimiento: new Date().toString(),
    plazo: 1,
    destino: { Id: "", Descripcion: "" },
    monto: 0,
    denominacion: "Pesos",
    institucionFinanciera: { Id: "", Descripcion: "" },
  },

  generalObligadoSolidarioAval: {
    obligadoSolidario: "NO APLICA",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "NO APLICA"
    entePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "NO APLICA"
  },
  tablaObligadoSolidarioAval: [],

  gastosCostos: {
    destino: { Id: "", Descripcion: "" },
    detalleInversion: { Id: "", Descripcion: "" },
    archivoDetalleInversion: {
      archivo: new File([], ""),
      nombreArchivo: "",
    },
    claveInscripcionFinanciamiento: "",
    descripcion: "",
    monto: 0,
    gastosAdicionales: "",
    montoGastosAdicionales: 0,
    saldoVigente: 0,
  },

  tablaGastosCostos: [],

  changeInformacionGeneral: (informacionGeneral: any) =>
    set(() => ({
      informacionGeneral: informacionGeneral,
    })),

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: IObligadoSolidarioAval
  ) =>
    set((state) => ({
      tablaObligadoSolidarioAval: [
        ...state.tablaObligadoSolidarioAval,
        newObligadoSolidarioAval,
      ],
    })),

  changeObligadoSolidarioAval: (obligadoSolidario: any) =>
    set(() => ({
      generalObligadoSolidarioAval: obligadoSolidario,
    })),

  cleanObligadoSolidarioAval: () =>
    set((state) => ({ tablaObligadoSolidarioAval: [] })),

  removeObligadoSolidarioAval: (index: number) =>
    set((state) => ({
      tablaObligadoSolidarioAval: state.tablaObligadoSolidarioAval.filter(
        (_, i) => i !== index
      ),
    })),

  changeGastosCostos: (GastosCostos: IGastosCostos) =>
    set(() => ({
      gastosCostos: GastosCostos,
    })),

  addGastosCostos: (newGeneralGastosCostos: IGastosCostos) =>
    set((state) => ({
      tablaGastosCostos: [...state.tablaGastosCostos, newGeneralGastosCostos],
    })),

  cleanGastosCostos: () =>
    set(() => ({
      gastosCostos: {
        destino: { Id: "", Descripcion: "" },
        detalleInversion: { Id: "", Descripcion: "" },
        archivoDetalleInversion: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
        claveInscripcionFinanciamiento: "",
        descripcion: "",
        monto: 0,
        gastosAdicionales: "",
        montoGastosAdicionales: 0,
        saldoVigente: 0,
      },
    })),

  cleanTablaGastosCostos: () =>
    set(() => ({
      tablaGastosCostos: [],
    })),

  removeGastosCostos: (index: number) =>
    set((state) => ({
      tablaGastosCostos: state.tablaGastosCostos.filter((_, i) => i !== index),
    })),

  addDocumento: (newDocument: File, nombreArchivo: string) => {
    let state = useLargoPlazoStore.getState();
    set(() => ({
      gastosCostos: {
        ...state.gastosCostos,
        archivoDetalleInversion: {
          archivo: newDocument,
          nombreArchivo: nombreArchivo,
        },
      },
    }));
  },

  removeDocumento: () => {
    let state = useLargoPlazoStore.getState();
    set(() => ({
      gastosCostos: {
        ...state.gastosCostos,
        archivoDetalleInversion: {
          archivo: new File([], ""),
          nombreArchivo: "",
        },
      },
    }));
  },

  catalogoDetallesInversion: [],

  getDetallesInversion: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-detalleInversion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoDetallesInversion: r,
        }));
      });
  },
});

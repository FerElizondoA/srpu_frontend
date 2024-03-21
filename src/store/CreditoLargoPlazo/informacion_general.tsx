import { StateCreator } from "zustand";
import {
  IInformacionGeneral,
  IObligadoSolidarioAval,
} from "../CreditoCortoPlazo/informacion_general";
import { useLargoPlazoStore } from "./main";
import { ICatalogo } from "../../screens/Config/Catalogos";
import axios from "axios";

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

export interface InformacionGeneralLpSlice {
  informacionGeneral: IInformacionGeneral;

  generalObligadoSolidarioAval: {
    obligadoSolidario: string;
    tipoEntePublicoObligado: { Id: string; Descripcion: string };
    entePublicoObligado: { Id: string; Descripcion: string };
  };
  tablaObligadoSolidarioAval: IObligadoSolidarioAval[];

  gastosCostos: IGastosCostos;

  tablaGastosCostos: IGastosCostos[];

  setInformacionGeneral: (informacionGeneral: any) => void;

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: IObligadoSolidarioAval
  ) => void;

  setTablaObligadoSolidarioAval: (
    obligadoSolidarioAval: IObligadoSolidarioAval[]
  ) => void;
  setTablaGastosCostos: (gastosCostos: IGastosCostos[]) => void;

  setObligadoSolidarioAval: (obligadoSolidario: any) => void;

  cleanObligadoSolidarioAval: () => void;

  removeObligadoSolidarioAval: (index: number) => void;

  setGastosCostos: (GastosCostos: IGastosCostos) => void;

  addGastosCostos: (GastosCostos: IGastosCostos) => void;

  cleanGastosCostos: () => void;
  cleanTablaGastosCostos: () => void;

  removeGastosCostos: (index: number) => void;

  addDocumentoLp: (newDocumento: File, nombreArchivo: string) => void;
  removeDocumento: (index: number) => void;

  catalogoDetallesInversion: ICatalogo[];

  getDetallesInversion: () => void;
}

export const createInformacionGeneralLpSlice: StateCreator<
  InformacionGeneralLpSlice
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

  setInformacionGeneral: (informacionGeneral: any) =>
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

  setTablaObligadoSolidarioAval: (
    obligadoSolidarioAval: IObligadoSolidarioAval[]
  ) =>
    set((state) => ({
      tablaObligadoSolidarioAval: obligadoSolidarioAval,
    })),

  setTablaGastosCostos: (gastosCostos: IGastosCostos[]) =>
    set((state) => ({
      tablaGastosCostos: gastosCostos,
    })),

  setObligadoSolidarioAval: (obligadoSolidario: any) =>
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

  setGastosCostos: (GastosCostos: IGastosCostos) =>
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

  addDocumentoLp: (newDocument: File, nombreArchivo: string) => {
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

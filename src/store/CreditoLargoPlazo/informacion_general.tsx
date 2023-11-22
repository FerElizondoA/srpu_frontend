import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export type ObligadoSolidarioAval = {
  obligadoSolidario: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
};

export type GeneralGastosCostos = {
  destino: string;
  detalleInversion: string;
  descripcion: string;
  claveInscripcionFinanciamiento: string;
  monto: number;
};

export interface InformacionGeneralLargoPlazoSlice {
  informacionGeneral: {
    fechaContratacion: string;
    fechaVencimiento: string;
    plazo: number;
    destino: { Id: string; Descripcion: string };
    monto: number;
    denominacion: string;
    institucionFinanciera: { Id: string; Descripcion: string };
  };

  tablaObligadoSolidarioAval: ObligadoSolidarioAval[];
  generalObligadoSolidarioAval: {
    obligadoSolidario: { Id: string; Descripcion: string };
    tipoEntePublicoObligado: { Id: string; Descripcion: string };
    entePublicoObligado: { Id: string; Descripcion: string };
  };

  //NUEVA TABLA CREDITO LARGO PLAZO

  archivoDetalleInversion: {
    archivo: File;
    nombreArchivo: string;
  };

  GastosCostos: {
    gastosAdicionales: string;
    saldoVigente: number;
    montoGastosAdicionales: number;
  };

  tablaGastosCostos: GeneralGastosCostos[];
  generalGastosCostos: {
    destino: { Id: string; Descripcion: string };
    detalleInversion: { Id: string; Descripcion: string };
    descripcion: string;
    claveInscripcionFinanciamiento: string;
    monto: number;
  };

  changeInformacionGeneral: (informacionGeneral: {
    fechaContratacion: string;
    fechaVencimiento: string;
    plazo: number;
    destino: { Id: string; Descripcion: string };
    monto: number;
    denominacion: string;
    institucionFinanciera: { Id: string; Descripcion: string };
  }) => void;

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: ObligadoSolidarioAval
  ) => void;

  changeObligadoSolidarioAval: (
    obligadoSolidario: { Id: string; Descripcion: string },
    tipoEntePublicoObligado: { Id: string; Descripcion: string },
    entePublicoObligado: { Id: string; Descripcion: string }
  ) => void;
  cleanObligadoSolidarioAval: () => void;
  removeObligadoSolidarioAval: (index: number) => void;

  //campo gastos costos

  changeGastosCostos: (GastosCostos: {
    gastosAdicionales: "";
    saldoVigente: 0;
    montoGastosAdicionales: 0;
  }) => void;

  //NUEVA TABLA CREDITO LARGO PLAZO
  addGeneralGastosCostos: (newGeneralGastosCostos: GeneralGastosCostos) => void;

  changeGeneralGastosCostos: (
    destino: { Id: string; Descripcion: string },
    detalleInversion: { Id: string; Descripcion: string },
    claveInscripcionFinanciamiento: string,
    descripcion: string,
    monto: number
  ) => void;
  cleanGeneralGastosCostos: () => void;
  removeGeneralGastosCostos: (index: number) => void;

  addDocumento: (newDocumento: File, nombreArchivo: string) => void;
  removeDocumento: (index: number) => void;
  //tablaDocumentos: IFileInfoGeneral[];

  catalogoDetallesInversion: ICatalogo[];

  getDetallesInversion: () => void;
}

export const createInformacionGeneralLargoPlazoSlice: StateCreator<
  InformacionGeneralLargoPlazoSlice
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

  tablaObligadoSolidarioAval: [],

  generalObligadoSolidarioAval: {
    obligadoSolidario: { Id: "", Descripcion: "" }, // Descripcion: "No Aplica"
    tipoEntePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No Aplica"
    entePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No Aplica"
  },

  //NUEVA TABLA CREDITO LARGO PLAZO

  GastosCostos: {
    gastosAdicionales: "",
    saldoVigente: 0,
    montoGastosAdicionales: 0,
  },

  archivoDetalleInversion: {
    archivo: new File([], ""),
    nombreArchivo: "",
  },

  tablaGastosCostos: [],

  generalGastosCostos: {
    destino: { Id: "", Descripcion: "" },
    detalleInversion: { Id: "", Descripcion: "" },
    descripcion: "",
    claveInscripcionFinanciamiento: "",
    monto: 0,
  },

  //tablaDocumentos: [],

  changeInformacionGeneral: (informacionGeneral: {
    fechaContratacion: string;
    fechaVencimiento: string;
    plazo: number;
    destino: { Id: string; Descripcion: string };
    monto: number;
    denominacion: string;
    institucionFinanciera: { Id: string; Descripcion: string };
  }) =>
    set(() => ({
      informacionGeneral: informacionGeneral,
      // generalGastosCostos: {
      //   destino: informacionGeneral.destino,
      //   detalleInversion: { Id: "", Descripcion: "" },
      //   descripcion: "",
      //   claveInscripcionFinanciamiento: "",
      //   monto: 0,
      // },
      // tablaGastosCostos: [],
    })),

  changeObligadoSolidarioAval: (obligadoSolidario: any) =>
    set(() => ({
      generalObligadoSolidarioAval: obligadoSolidario,
    })),

  addObligadoSolidarioAval: (newObligadoSolidarioAval: ObligadoSolidarioAval) =>
    set((state) => ({
      tablaObligadoSolidarioAval: [
        ...state.tablaObligadoSolidarioAval,
        newObligadoSolidarioAval,
      ],
    })),

  removeObligadoSolidarioAval: (index: number) =>
    set((state) => ({
      tablaObligadoSolidarioAval: state.tablaObligadoSolidarioAval.filter(
        (_, i) => i !== index
      ),
    })),

  cleanObligadoSolidarioAval: () =>
    set((state) => ({ tablaObligadoSolidarioAval: [] })),

  changeGastosCostos: (GastosCostos: {
    gastosAdicionales: string;
    saldoVigente: number;
    montoGastosAdicionales: number;
  }) =>
    set(() => ({
      GastosCostos: GastosCostos,
    })),

  // NUEVA TABLA LARGO PLAZO
  changeGeneralGastosCostos: (GastosCostos: any) =>
    set(() => ({
      generalGastosCostos: GastosCostos,
    })),

  addGeneralGastosCostos: (newGeneralGastosCostos: GeneralGastosCostos) =>
    set((state) => ({
      tablaGastosCostos: [...state.tablaGastosCostos, newGeneralGastosCostos],
    })),

  removeGeneralGastosCostos: (index: number) =>
    set((state) => ({
      tablaGastosCostos: state.tablaGastosCostos.filter((_, i) => i !== index),
    })),

  cleanGeneralGastosCostos: () =>
    set(() => ({
      tablaGastosCostos: [],
    })),

  addDocumento: (newDocument: File, nombreArchivo: string) =>
    set(() => ({
      archivoDetalleInversion: {
        archivo: newDocument,
        nombreArchivo: nombreArchivo,
      },
    })),

  removeDocumento: () =>
    set(() => ({
      archivoDetalleInversion: {
        archivo: new File([], ""),
        nombreArchivo: "",
      },
    })),

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

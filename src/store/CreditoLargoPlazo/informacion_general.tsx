import { StateCreator } from "zustand";
import axios from "axios";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IFileInfoGeneral } from "../../components/ObligacionesLargoPlazoPage/Panels/InformacionGeneral";

export type ObligadoSolidarioAval = {
  obligadoSolidario: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
};

//NUEVOOOOOO
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

  detalleInversion: {
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

  //************ */
  catalogoDestinosGastosCostos: ICatalogo[];
  catalogoInstituciones: ICatalogo[];
  catalogoDestinos: ICatalogo[];
  catalogoObligadoSolidarioAval: ICatalogo[];
  catalogoTipoEntePublicoObligado: ICatalogo[];

  changeInformacionGeneral: (
    fechaContratacion: string,
    fechaVencimiento: string,
    plazo: number,
    destino: { Id: string; Descripcion: string },
    monto: number,
    denominacion: string,
    institucionFinanciera: { Id: string; Descripcion: string }
  ) => void;

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

  changeGastosCostos: (
    gastosAdicionales: string,
    saldoVigente: number,
    montoGastosAdicionales: number
  ) => void;

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
  //getTiposDocumentos: () => void;
  tablaDocumentos: IFileInfoGeneral[];

  /************************ */

  getDestinos: () => void;
  getInstituciones: () => void;
  getTipoEntePublicoObligado: () => void;
  getObligadoSolidarioAval: () => void;
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
    obligadoSolidario: { Id: "", Descripcion: "" }, // Descripcion: "No aplica"
    tipoEntePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No aplica"
    entePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No aplica"
  },

  //NUEVA TABLA CREDITO LARGO PLAZO

  GastosCostos: {
    gastosAdicionales: "",
    saldoVigente: 0,
    montoGastosAdicionales: 0,
  },

  detalleInversion: {
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

  tablaDocumentos: [],
  //************* */

  catalogoDestinosGastosCostos: [],
  catalogoInstituciones: [],
  catalogoDestinos: [],
  catalogoObligadoSolidarioAval: [],
  catalogoTipoEntePublicoObligado: [],

  changeInformacionGeneral: (informacionGeneral: any) =>
    set(() => ({
      informacionGeneral: informacionGeneral,
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

  changeGastosCostos: (GastoCostos: any) =>
    set(() => ({
      GastosCostos: GastoCostos,
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
      detalleInversion: {
        archivo: newDocument,
        nombreArchivo: nombreArchivo,
      },
    })),

  removeDocumento: () =>
    set(() => ({
      detalleInversion: {
        archivo: new File([], ""),
        nombreArchivo: "",
      },
    })),

  // /**/*/ */

  getDestinos: async () => {
    return await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-destinos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoDestinos: r,
        }));
      });
  },
  getInstituciones: async () => {
    return await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-institucionesFinancieras",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoInstituciones: r,
        }));
      });
  },
  getTipoEntePublicoObligado: async () => {
    return await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposEntePublico",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTipoEntePublicoObligado: r,
        }));
      });
  },
  getObligadoSolidarioAval: async () => {
    return await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-obligadoSolidarioAval",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoObligadoSolidarioAval: r,
        }));
      });
  },
});

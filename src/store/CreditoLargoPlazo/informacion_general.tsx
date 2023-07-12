import { StateCreator } from "zustand";
import axios from "axios";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IFileInfoGeneral } from "../../components/ObligacionesLargoPlazoPage/Panels/InformacionGeneral";
import { useLargoPlazoStore } from "./main";

export type ObligadoSolidarioAval = {
  obligadoSolidario: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
};

//NUEVOOOOOO
export type GeneralGastosCostos = {
  destino: string,
  detalleInversion: string,
  //periodoAdministracion: string, // NO SABEMOS AUN 
  gastosAdicionales: number,
  claveInscripcionFinanciamiento: string, // NO SABEMOS AUN 
  descripcion: string,
  monto: number,
  //periodoFinanciamiento: string, //AUN NO SABEMOS
  saldoVigente: number,  //AUN NO SABEMOS
  montoGastosAdicionales: number,
};

export interface ITiposDocumentoGC {
  Id: string;
  Descripcion: string;
  Obligatorio:number;
}


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
  tablaGastosCostos: GeneralGastosCostos[],
  generalGastosCostos: {
    destino: { Id: string, Descripcion: string },
    detalleInversion: { Id: string, Descripcion: string },
    //periodoAdministracion: string, // NO SABEMOS AUN 
    gastosAdicionales: number,
    claveInscripcionFinanciamiento: string, // NO SABEMOS AUN 
    descripcion: string,
    monto: number,
    //periodoFinanciamiento: string, //AUN NO SABEMOS
    saldoVigente: number,  //AUN NO SABEMOS
    montoGastosAdicionales: number,

  },
  
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

  

  
  //NUEVA TABLA CREDITO LARGO PLAZO

  addGeneralGastosCostos: (newGeneralGastosCostos: GeneralGastosCostos) => void;
  changeGeneralGastosCostos: (
    destino: { Id: string, Descripcion: string },
    detalleInversion: { Id: string, Descripcion: string },
    //inversiónPúblicaProductiva : {},
    //periodoAdministracion: string, // NO SABEMOS AUN 
    gastosAdicionales: number,
    claveInscripcionFinanciamiento: string, // NO SABEMOS AUN 
    descripcion: string,
    monto: number,
    //periodoFinanciamiento: string, //AUN NO SABEMOS
    saldoVigente: number,  //AUN NO SABEMOS
    montoGastosAdicionales: number,
  ) => void;
  cleanGeneralGastosCostos: () => void;
  removeGeneralGastosCostos: (index: number) => void;

  addDocumento:(newDocumento: IFileInfoGeneral) =>void;
  removeDocumento: (index: number) => void;
  setTablaDocumentos: (docs: any) => any;
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
    obligadoSolidario: { Id: "", Descripcion: "" },  // Descripcion: "No aplica"
    tipoEntePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No aplica"
    entePublicoObligado: { Id: "", Descripcion: "" },  // Descripcion: "No aplica"
  },

  //NUEVA TABLA CREDITO LARGO PLAZO

  tablaGastosCostos: [],
  generalGastosCostos: {
    destino: { Id: "", Descripcion: "" },
    detalleInversion: { Id: "", Descripcion: "" },
    //periodoAdministracion: "", // NO SABEMOS AUN 
    gastosAdicionales: 0,
    claveInscripcionFinanciamiento: "", // NO SABEMOS AUN 
    descripcion: "",
    monto: 0,
    //periodoFinanciamiento: "", //AUN NO SABEMOS
    saldoVigente: 0,  //AUN NO SABEMOS
    montoGastosAdicionales: 0,
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
      tablaObligadoSolidarioAval: [...state.tablaObligadoSolidarioAval, newObligadoSolidarioAval],
    })),

  removeObligadoSolidarioAval: (index: number) =>
    set((state) => ({
      tablaObligadoSolidarioAval: state.tablaObligadoSolidarioAval.filter(
        (_, i) => i !== index
      ),
    })),

  cleanObligadoSolidarioAval: () =>
    set((state) => ({ tablaObligadoSolidarioAval: [] })),

// NUEVA TABLA LARGO PLAZO

  addGeneralGastosCostos: (newGeneralGastosCostos: GeneralGastosCostos) =>
    set((state) => ({
      tablaGastosCostos: [...state.tablaGastosCostos, newGeneralGastosCostos],
    })),

  changeGeneralGastosCostos: (GastosCostos: any) =>
    set(() => ({
      generalGastosCostos: GastosCostos,
    })),

  cleanGeneralGastosCostos: () =>
    set(() => ({
      tablaGastosCostos: []
    })),

  removeGeneralGastosCostos: (index: number) =>
    set((state) => ({
      tablaGastosCostos: state.tablaGastosCostos.filter((_, i) => i !== index),
    })),

    addDocumento:(newDocument: IFileInfoGeneral) =>
    set(() =>({
      
    })),

    removeDocumento: (index: number) =>
    set((state) => ({
      tablaDocumentos: state.tablaDocumentos.filter((_, i) => i !== index),
    })),

    setTablaDocumentos: (docs: any) => set(() => ({ tablaDocumentos: docs })),


    
// /**/*/ */

  getDestinos: async () => {
    await axios
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
    await axios
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
    await axios
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
    await axios
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
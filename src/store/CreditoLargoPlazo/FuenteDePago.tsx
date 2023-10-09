import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import axios from "axios";
import { Fideicomisario } from "../Fideicomiso/fideicomiso";

export type Mecanismo = {
  mecanismo: { Id: string; Descripcion: string };
  bonoCuponCero: { Id: string; Descripcion: string };
  clasificacionBonoCupo: { Id: string; Descripcion: string };
};

export type garantiaPago = {
  Id: string;
  Descripcion: string;
}

export type AsignarFuente = {
  clasificacion: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fuentePago: { Id: string; Descripcion: string };
  RespectoA: { Id: string; Descripcion: string };
};

export type NumeroFideicomiso = {
  Id: string;
  DescripcionFiudiciario: string;
  DescripcionTipoFideicomiso: string;
  IdFiudiciario: string;
  IdTipoFideicomiso: string;
  NumeroDeFideicomiso: number;
  TipoDeFideicomiso: string;
  FechaDeFideicomiso: string;
  Fiudiciario: string;
  Fideicomisario: string;
  TipoDeMovimiento: string;
  SoporteDocumental: string;
  FechaCreacion: string;
  CreadoPor: string;
  ModificadoPor: string;
  UltimaModificacion: string;
}

export type NumeroMandato = {
  CreadoPor: string;
  Deleted: string;
  FechaCreacion: string;
  FechaMandato: string;
  Id: string;
  Mandatario: string;
  ModificadoPor: string;
  MunicipioMandante: string;
  NumeroMandato: number;
  OrganismoMandante: string;
  SoporteDocumental: string;
  TipoMovimiento: string;
  UltimaModificacion: string;
}

export type NumeroInstruccion = {
  CLABE: string,
  CreadoPor: string,
  Deleted: string,
  DescripcionBanco: string,
  EntePublico: string,
  FechaCreacion: string,
  Id: string,
  IdBanco: string,
  MecanismoPago: string,
  NumeroCuenta: number,
  TipoMovimiento: string,
}

export interface FuenteDePagoLargoPlazoSlice {

  Mecanismo: Mecanismo;
  AsignarFuente: AsignarFuente;

  garantiaPago: { Id: string; Descripcion: string };
  tablaFideicomisarioFP: Fideicomisario[];

  editFideicomisarioFuentePago: (fideicomisario: Fideicomisario[]) => void;

  changeMecanismo: (
    mecanismo: { Id: string; Descripcion: string },
    bonoCuponCero: { Id: string; Descripcion: string },
    clasificacionBonoCupo: { Id: string; Descripcion: string },
  ) => void;

  changeAsignarFuente: (
    clasificacion: { Id: string; Descripcion: string },
    tipoFuente: { Id: string; Descripcion: string },
    fuentePago: { Id: string; Descripcion: string },
    RespectoA: { Id: string; Descripcion: string },
  ) => void;

  changeGarantiaPago: (
    garantiaPago: { Id: string; Descripcion: string },
  ) => void;

  //Fideicomiso
  numeroFideicomiso: NumeroFideicomiso[];
  getNumeroFideicomiso: () => void;

  numeroFideicomisoSelect: NumeroFideicomiso[];
  setNumeroFideicomisoSelect: (numeroFideicomisoSelect: NumeroFideicomiso[]) => void;

  //Mandato
  numeroMandato: NumeroMandato[];
  getNumeroMandato: () => void;

  numeroMandatoSelect: NumeroMandato[];
  setNumeroMandatoSelect: (numeroMandatoSelect: NumeroMandato[]) => void;

  //Intruccion Irrevocable
  numeroInstruccion: NumeroInstruccion[];
  getNumeroInstruccion: () => void;

  numeroInstruccionSelect: NumeroInstruccion[];
  setNumeroInstruccionSelect: (numeroInstruccionSelect: NumeroInstruccion[]) => void;
}



export const createFuentePagoLargoPLazoSlice: StateCreator<
  FuenteDePagoLargoPlazoSlice
> = (set, get) => ({
  Mecanismo: {
    mecanismo: { Id: "", Descripcion: "" },
    numeroFideicomiso: { Id: "", Descripcion: "" },
    bonoCuponCero: { Id: "", Descripcion: "" },
    clasificacionBonoCupo: { Id: "", Descripcion: "" },
  },

  AsignarFuente: {
    clasificacion: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fuentePago: { Id: "", Descripcion: "" },
    RespectoA: { Id: "", Descripcion: "" },
  },

  garantiaPago: { Id: "", Descripcion: "" },
  
  //Fideicomiso
  numeroFideicomisoSelect: [],
  numeroFideicomiso: [],

  //Mandato
  numeroMandato: [],
  numeroMandatoSelect: [],

  //Instruccion Irrevocable
  numeroInstruccion:[],
  numeroInstruccionSelect:[],



  tablaFideicomisarioFP: [],


  editFideicomisarioFuentePago: (fideicomisarios: Fideicomisario[]) =>
    set((state) => ({
      tablaFideicomisarioFP: fideicomisarios,
    })),

  changeMecanismo: (Mecanismo: any) =>
    set(() => ({
      Mecanismo: Mecanismo
    })),

  changeAsignarFuente: (AsignarFuente: any) =>
    set(() => ({
      AsignarFuente: AsignarFuente
    })),

  changeGarantiaPago: (garantiaPago: garantiaPago) =>
  (() => ({
    garantiaPago: garantiaPago
  })),


  //Fideicomisos
  getNumeroFideicomiso: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-fideicomiso", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          numeroFideicomiso: r,
        }));
      });
  },


  setNumeroFideicomisoSelect: (numeroFideicomisoSelect: NumeroFideicomiso[]) => {
    set(() => ({
      numeroFideicomisoSelect: numeroFideicomisoSelect
    }));
  },

  //Mandatos

  getNumeroMandato: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-mandato", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          numeroMandato: r,
        }));
      });

  },


  setNumeroMandatoSelect(numeroMandatoSelect: NumeroMandato[]) {
    set(() => ({
      numeroMandatoSelect: numeroMandatoSelect
    }))
  },

  //Intrucciones Irrevocables

  getNumeroInstruccion: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-Instrucciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          numeroInstruccion: r,
        }));
      });
  },

  setNumeroInstruccionSelect(numeroInstruccionSelect: NumeroInstruccion[]) {
    set(() => ({
      numeroInstruccionSelect: numeroInstruccionSelect
    }))
  },



});

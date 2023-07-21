import { StateCreator } from "zustand";
import { ICatalogo, IEntePublico } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import axios from "axios";

export type GeneralMontoAutorizado = {
  destinoAutorizado: string;
  montoAutorizado: number;
};

export type GeneralDetalleDestino = {
  DetalleDestino: string;
  montoAutorizado: number;
};

export interface AutorizacionLargoPlazoSlice {
  Autorizacion: {
    entidadFederativa: { Id: string, Organismo: string };
    numeroAutorizacion: number;
    fechaPublicacion: string;
    medioPublicacion: { Id: string, Descripcion: string};
    montoAutorizado: number;
  };

  documentoSoporte: {
    archivo: File,
    nombreArchivo: string,
  }

  acreditacionQuorum: {
    archivo: File,
    nombreArchivo: string,
  }
  
  tablaMontoAutorizado: GeneralMontoAutorizado[];
  generalMontoAutorizado: {
    destinoAutorizado:  { Id: string; Descripcion: string};
    montoAutorizado: number;
  };

  tablaDetalleDestino : GeneralDetalleDestino[]
  generalDetalleDestino: {
    detalleDestino:  { Id: string, Descripcion: string};
    montoAutorizado: number;
  }

  catalogoOrganismos: IEntePublico[];


  changeAutorizacion : (
    entidadFederativa: { Id: string, Organismo: string },
    numeroAutorizacion: number,
    fechaPublicacion: string,
    medioPublicacion: { Id: string, Descripcion: string},
    montoAutorizado: number,
  ) => void;

  
  getOrganismosA: () => void;

  addDocumentoSoporte:  (newDocumento: File, nombreArchivo: string) => void;
  addDocumentoQuorum:  (newDocumento: File, nombreArchivo: string) => void;

  removeDocumentoSoporte : ( newDocumento: File, nombreArchivo: string ) => void;
  removeDocumentoQuorum : ( newDocumento: File, nombreArchivo: string ) => void;


  ///MONTO AUTORIZADO ***********
  addGeneralMontoAutorizado : (
    newMontoAutorizado: GeneralMontoAutorizado
  ) => void;

  changeGeneralMontoAutorizado: (
    destinoAutorizado: { Id: string; Descripcion: string },
    montoAutorizado: number,
  ) => void;

  cleanGeneralMontoAutorizado :() => void;

  removeGeneralMontoAutorizado: (index: number) => void;

///******************** */


  ////DETALLE DEL DESTINO *************
  addGeneralDetalleDestino : (
    newDetalleDestino : GeneralDetalleDestino
  ) => void; 
  changeGeneralDetalleDestino: (
    DetalleDestino: string,
    montoAutorizado: number,
  ) => void;
  cleanDetalleDestino: () => void;
  removeDetalleDestino: (index: number) => void; 

//*************** */

}

export const createAutorizacionLargoPlazoSlice : StateCreator<
AutorizacionLargoPlazoSlice
> = (set, get) => ({
  Autorizacion: {
    entidadFederativa: {
      Id: localStorage.getItem("IdEntePublicoObligado") || "",
      Organismo: localStorage.getItem("EntePublicoObligado") || ""
    },
    numeroAutorizacion: 0,
    fechaPublicacion: new Date().toString(),
    medioPublicacion: { Id: "", Descripcion: ""},
    montoAutorizado: 0,
  },

  documentoSoporte: {
    archivo: new File([], ""),
    nombreArchivo: "",
  },

  acreditacionQuorum: {
    archivo: new File([], ""),
    nombreArchivo: "",
  },

  tablaMontoAutorizado: [],
  generalMontoAutorizado: {
    destinoAutorizado:  { Id: "", Descripcion: ""},
    montoAutorizado: 0,
  },

  tablaDetalleDestino : [],
  generalDetalleDestino: {
    detalleDestino: { Id: "", Descripcion: ""},
    montoAutorizado: 0,
  },

  catalogoOrganismos: [],


  changeAutorizacion: (Autorizacion: any) => 
  set(() =>({
    Autorizacion: Autorizacion,
  })),

  addDocumentoSoporte: (newDocumento: File, nombreArchivo: string) =>
  set(() => ({
    documentoSoporte: {
      archivo: newDocumento,
      nombreArchivo: nombreArchivo,
    },

  })),

  removeDocumentoSoporte: () =>
  set(() => ({
    documentoSoporte: {
      archivo: new File([], ""),
      nombreArchivo: "",
    },
  })),

  addDocumentoQuorum:(newDocumento: File, nombreArchivo: string) =>
  set(() => ({
    acreditacionQuorum: {
      archivo: newDocumento,
      nombreArchivo: nombreArchivo,
    },
    
  })),

  removeDocumentoQuorum : ()  =>
  set(() => ({
    acreditacionQuorum: {
      archivo: new File([], ""),
      nombreArchivo: "",
    },
  })),

  ///MONTO AUTORIZADO

  changeGeneralMontoAutorizado : ( MontoAutorizado : any) =>
  set(() => ({
    generalMontoAutorizado: MontoAutorizado
  })),

  addGeneralMontoAutorizado : (newGeneralMontoAutorizado : GeneralMontoAutorizado) =>
  set((state) => ({
    tablaMontoAutorizado : [...state.tablaMontoAutorizado, newGeneralMontoAutorizado],
  })),


  cleanGeneralMontoAutorizado : () =>
  set(() => ({
    tablaMontoAutorizado: [],
  })),

  removeGeneralMontoAutorizado : (index:number) =>
  set((state) => ({
    tablaMontoAutorizado: state.tablaMontoAutorizado.filter((_, i) => i !== index)
  })),

  ///DETALLE DESTINO

  changeGeneralDetalleDestino : (DetalleDestino: any) =>
  set(() => ({
    generalDetalleDestino: DetalleDestino
  })),

  addGeneralDetalleDestino : ( newGeneralDetalleDestino : GeneralDetalleDestino) =>
  set((state) => ({
    tablaDetalleDestino: [...state.tablaDetalleDestino, newGeneralDetalleDestino],
  })),

  cleanDetalleDestino : () =>
  set(() => ({
    tablaDetalleDestino: [],
  })),

  removeDetalleDestino : (index: number) =>
  set((state) => ({
    tablaDetalleDestino: state.tablaDetalleDestino.filter((_, i) => i !== index)
  })),


  getOrganismosA: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-entePublicoObligado",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoOrganismos: r,
        }));
      });
  },


})

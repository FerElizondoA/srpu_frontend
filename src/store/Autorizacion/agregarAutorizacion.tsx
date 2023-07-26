import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { useLargoPlazoStore } from "../CreditoLargoPlazo/main";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export type GeneralAutorizado = {
  entidad: { Id: string; Organismo: string };
  numeroAutorizacion: number;
  fechaPublicacion: string;
  medioPublicacion: { Id: string; Descripcion: string };
  montoAutorizado: number;
  documentoSoporte: { archivo: File; nombreArchivo: string };
  acreditacionQuorum: { archivo: File; nombreArchivo: string };
};

export type DestinoA = {
  destinoAutorizado: { Id: string; Descripcion: string };
  montoAutorizado: number;
};

export type DetalleDestino = {
  detalleDestino: { Id: string; Descripcion: string };
  montoAutorizado: number;
};

export type Autorizaciones = {
  Id: string;
  Entidad: { Id: string; Organismo: string };
  NumeroAutorizacion: string;
  FechaPublicacion: string;
  MedioPublicacion: { Id: string; Descripcion: string };
  MontoAutorizado: number;
  DocumentoSoporte: { archivo: File; nombreArchivo: string };
  AcreditacionQuorum: { archivo: File; nombreArchivo: string };
  DestinoAutorizado: DestinoA[];
  DetalleDestino: DetalleDestino[];
};

export interface AutorizacionLargoPlazoSlice {
  registrarAutorizacion: GeneralAutorizado;

  montoAutorizado: DestinoA;
  tablaDestinoAutorizado: DestinoA[];

  detalleDestino: DetalleDestino;
  tablaDetalleDestino: DetalleDestino[];

  catalogoMediosDePublicacion: ICatalogo[];
  catalogoDestinosAutorizados: ICatalogo[];
  catalogoDetalleDestinosAutorizados: ICatalogo[];

  setRegistrarAutorizacion: (autorizacion: any) => void;
  setDestinoAutorizado: (montoAutorizado: DestinoA) => void;
  setDetalleDestino: (detalleDestino: DetalleDestino) => void;

  setAutorizacion: (
    registrarAutorizacion: GeneralAutorizado,
    montoAutorizado: DestinoA[],
    detalleDestino: DetalleDestino[]
  ) => void;

  addDestinoAutorizado: (newDestinoAutorizado: DestinoA) => void;
  addDetalleDestino: (newDetalleDestino: DetalleDestino) => void;

  removeDestinoAutorizado: (index: number) => void;
  removeDetalleDestino: (index: number) => void;

  cleanDestinoAutorizado: () => void;
  cleanDetalleDestino: () => void;

  getMediosDePublicacion: () => void;
  getDestinosAutorizados: () => void;
  getDetalleDestinosAutorizados: () => void;

  createAutorizacion: () => void;
  savePathDocAut: (
    idAut: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;
  saveFilesAutorizacion: (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => void;

  autorizaciones: Autorizaciones[];
  getAutorizaciones: () => void;

  autorizacionSelect: Autorizaciones[];
  setAutorizacionSelect: (autorizacion: Autorizaciones[]) => void;
}

export const createAutorizacionLargoPlazoSlice: StateCreator<
  AutorizacionLargoPlazoSlice
> = (set, get) => ({
  registrarAutorizacion: {
    entidad: {
      Id: localStorage.getItem("IdEntePublicoObligado") || "",
      Organismo: localStorage.getItem("EntePublicoObligado") || "",
    },
    numeroAutorizacion: 0,
    fechaPublicacion: new Date().toString(),
    medioPublicacion: { Id: "", Descripcion: "" },
    montoAutorizado: 0,
    documentoSoporte: {
      archivo: new File([], ""),
      nombreArchivo: "",
    },
    acreditacionQuorum: {
      archivo: new File([], ""),
      nombreArchivo: "",
    },
  },
  montoAutorizado: {
    destinoAutorizado: { Id: "", Descripcion: "" },
    montoAutorizado: 0,
  },
  detalleDestino: {
    detalleDestino: { Id: "", Descripcion: "" },
    montoAutorizado: 0,
  },

  tablaDestinoAutorizado: [],
  tablaDetalleDestino: [],

  catalogoMediosDePublicacion: [],
  catalogoDestinosAutorizados: [],
  catalogoDetalleDestinosAutorizados: [],

  setRegistrarAutorizacion: (registrarAutorizacion: GeneralAutorizado) =>
    set(() => ({
      registrarAutorizacion: registrarAutorizacion,
    })),
  setDestinoAutorizado: (montoAutorizado: DestinoA) =>
    set(() => ({
      montoAutorizado: {
        destinoAutorizado: montoAutorizado.destinoAutorizado,
        montoAutorizado: montoAutorizado.montoAutorizado,
      },
    })),
  setDetalleDestino: (detalleDestino: DetalleDestino) =>
    set(() => ({
      detalleDestino: detalleDestino,
    })),

  setAutorizacion: (
    registrarAutorizacion: GeneralAutorizado,
    montoAutorizado: DestinoA[],
    detalleDestino: DetalleDestino[]
  ) =>
    set(() => ({
      registrarAutorizacion: registrarAutorizacion,
      tablaDestinoAutorizado: montoAutorizado,
      tablaDetalleDestino: detalleDestino,
    })),

  addDestinoAutorizado: (newDestinoAutorizado: DestinoA) =>
    set((state) => ({
      tablaDestinoAutorizado: [
        ...state.tablaDestinoAutorizado,
        newDestinoAutorizado,
      ],
    })),
  addDetalleDestino: (newDetalleDestino: DetalleDestino) =>
    set((state) => ({
      tablaDetalleDestino: [...state.tablaDetalleDestino, newDetalleDestino],
    })),

  removeDestinoAutorizado: (index: number) =>
    set((state) => ({
      tablaDestinoAutorizado: state.tablaDestinoAutorizado.filter(
        (_, i) => i !== index
      ),
    })),
  removeDetalleDestino: (index: number) =>
    set((state) => ({
      tablaDetalleDestino: state.tablaDetalleDestino.filter(
        (_, i) => i !== index
      ),
    })),

  cleanDestinoAutorizado: () =>
    set(() => ({
      tablaDestinoAutorizado: [],
    })),
  cleanDetalleDestino: () =>
    set(() => ({
      tablaDetalleDestino: [],
    })),

  getMediosDePublicacion: async () => {
    return await axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-mediosDePublicacion",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      set((state) => ({
        catalogoMediosDePublicacion: data.data,
      }));
    });
  },
  getDestinosAutorizados: async () => {
    return await axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-destinosAutorizados",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      set((state) => ({
        catalogoDestinosAutorizados: data.data,
      }));
    });
  },
  getDetalleDestinosAutorizados: async () => {
    return await axios({
      method: "get",
      url:
        process.env.REACT_APP_APPLICATION_BACK +
        "/api/get-detalleDestinosAutorizados",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      set((state) => ({
        catalogoDetalleDestinosAutorizados: data.data,
      }));
    });
  },

  createAutorizacion: async () => {
    const state = useLargoPlazoStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-autorizacion",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Entidad: state.registrarAutorizacion.entidad.Id,
          NumeroAutorizacion: state.registrarAutorizacion.numeroAutorizacion,
          FechaPublicacion: state.registrarAutorizacion.fechaPublicacion,
          MedioPublicacion: state.registrarAutorizacion.medioPublicacion.Id,
          MontoAutorizado: state.registrarAutorizacion.montoAutorizado,
          DocumentoSoporte: JSON.stringify(
            state.registrarAutorizacion.documentoSoporte
          ),
          AcreditacionQuorum: JSON.stringify(
            state.registrarAutorizacion.acreditacionQuorum
          ),
          DestinoAutorizado: JSON.stringify(state.tablaDestinoAutorizado),
          DetalleDestino: JSON.stringify(state.tablaDetalleDestino),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.saveFilesAutorizacion(
          data.data.Id,
          `/SRPU/AUTORIZACIONES/${data.data.Id}`,
          state.registrarAutorizacion.documentoSoporte
        );
        state.saveFilesAutorizacion(
          data.data.Id,
          `/SRPU/AUTORIZACIONES/${data.data.Id}`,
          state.registrarAutorizacion.acreditacionQuorum
        );
      });
  },

  savePathDocAut: async (
    idAut: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-addPathDocAut",
        {
          IdAutorizacion: idAut,
          Ruta: Ruta,
          NombreIdentificador: NombreIdentificador,
          NombreArchivo: NombreArchivo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {})
      .catch((e) => {});
  },
  saveFilesAutorizacion: async (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => {
    const state = useLargoPlazoStore.getState();

    return setTimeout(() => {
      const url = new File([archivo.archivo], archivo.nombreArchivo);

      let dataArray = new FormData();
      dataArray.append("ROUTE", `${ruta}`);
      dataArray.append("ADDROUTE", "true");
      dataArray.append("FILE", url);

      if (archivo.archivo.size > 0) {
        return axios
          .post(
            process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
            dataArray,
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          )
          .then(({ data }) => {
            state.savePathDocAut(
              idRegistro,
              data.RESPONSE.RUTA,
              data.RESPONSE.NOMBREIDENTIFICADOR,
              data.RESPONSE.NOMBREARCHIVO
            );
          })
          .catch((e) => {});
      } else {
        return null;
      }
    }, 1000);
  },

  autorizaciones: [],
  getAutorizaciones: async () => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/api/get-autorizaciones",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      set((state) => ({
        autorizaciones: data.data,
      }));
    });
  },

  autorizacionSelect: [],
  setAutorizacionSelect: (autorizacion: Autorizaciones[]) => {
    set((state) => ({
      autorizacionSelect: autorizacion,
    }));
  },
});

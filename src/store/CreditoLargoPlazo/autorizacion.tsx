import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { useLargoPlazoStore } from "./main";

export type IGeneralAutorizado = {
  entidad: { Id: string; Organismo: string };
  numeroAutorizacion: number;
  medioPublicacion: { Id: string; Descripcion: string };
  fechaPublicacion: string;
  montoAutorizado: number;
  documentoSoporte: { archivo: File; nombreArchivo: string };
  acreditacionQuorum: { archivo: File; nombreArchivo: string };
};

export type IMontoAutorizado = {
  destinoAutorizado: { Id: string; Descripcion: string };
  montoAutorizado: number;
};

export type IDetalleDestino = {
  detalleDestino: { Id: string; Descripcion: string };
  montoAutorizado: number;
};

export type IAutorizacion = {
  datosGenerales: IGeneralAutorizado;
  montoAutorizado: IMontoAutorizado[];
  detallesDestino: IDetalleDestino[];
};

export type IAutorizaciones = {
  Id: string;
  IdEntidad: string;
  Entidad: string;
  NumeroAutorizacion: string;
  FechaPublicacion: string;
  DescripcionMedioPublicacion: string;
  IdMedioPublicacion: string;
  MontoAutorizado: string;
  DocumentoSoporte: string;
  AcreditacionQuorum: string;
  DestinoAutorizado: string;
  DetalleDestino: string;
  CreadoPor: string;
};

export interface AutorizacionLargoPlazoSlice {
  autorizacion: IGeneralAutorizado;
  setRegistrarAutorizacion: (autorizacion: IGeneralAutorizado) => void;

  setAutorizacion: (
    autorizacion: IGeneralAutorizado,
    montoAutorizado: IMontoAutorizado[],
    detalleDestino: IDetalleDestino[]
  ) => void;

  borrarAutorizacion: (Id: string) => void;

  montoAutorizado: IMontoAutorizado;
  setMontoAutorizado: (montoAutorizado: IMontoAutorizado) => void;
  tablaMontoAutorizado: IMontoAutorizado[];
  addMontoAutorizado: (newDestinoAutorizado: IMontoAutorizado) => void;

  detalleDestino: IDetalleDestino;
  setDetalleDestino: (detalleDestino: IDetalleDestino) => void;
  tablaDetalleDestino: IDetalleDestino[];
  addDetalleDestino: (newDetalleDestino: IDetalleDestino) => void;

  catalogoMediosDePublicacion: ICatalogo[];
  catalogoDestinosAutorizados: ICatalogo[];
  catalogoDetalleDestinosAutorizados: ICatalogo[];

  removeDestinoAutorizado: (index: number) => void;
  removeDetalleDestino: (index: number) => void;

  cleanAutorizacion: () => void;

  getMediosDePublicacion: () => void;
  getDestinosAutorizados: () => void;
  getDetalleDestinosAutorizados: () => void;

  getDetalleAutorizacion: (Id: string) => void;

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

  autorizaciones: IAutorizaciones[];
  getAutorizaciones: () => void;

  autorizacionSelect: IAutorizaciones;
  setAutorizacionSelect: (autorizacion: IAutorizaciones) => void;
  modificarAutorizacion: () => void;

}

export const createAutorizacionLargoPlazoSlice: StateCreator<
  AutorizacionLargoPlazoSlice
> = (set, get) => ({
  autorizacion: {
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

  tablaMontoAutorizado: [],
  tablaDetalleDestino: [],

  tablaAutorizacion: [],

  catalogoMediosDePublicacion: [],
  catalogoDestinosAutorizados: [],
  catalogoDetalleDestinosAutorizados: [],

  setRegistrarAutorizacion: (autorizacion: IGeneralAutorizado) =>
    set(() => ({
      autorizacion: autorizacion,
    })),

  setMontoAutorizado: (montoAutorizado: IMontoAutorizado) =>
    set(() => ({
      montoAutorizado: {
        destinoAutorizado: montoAutorizado.destinoAutorizado,
        montoAutorizado: montoAutorizado.montoAutorizado,
      },
    })),
  setDetalleDestino: (detalleDestino: IDetalleDestino) =>
    set(() => ({
      detalleDestino: detalleDestino,
    })),

  setAutorizacion: (
    autorizacion: IGeneralAutorizado,
    montoAutorizado: IMontoAutorizado[],
    detalleDestino: IDetalleDestino[]
  ) =>
    set(() => ({
      autorizacion: autorizacion,
      tablaMontoAutorizado: montoAutorizado,
      tablaDetalleDestino: detalleDestino,
    })),

  addMontoAutorizado: (newDestinoAutorizado: IMontoAutorizado) =>
    set((state) => ({
      tablaMontoAutorizado: [
        ...state.tablaMontoAutorizado,
        newDestinoAutorizado,
      ],
    })),
  addDetalleDestino: (newDetalleDestino: IDetalleDestino) =>
    set((state) => ({
      tablaDetalleDestino: [...state.tablaDetalleDestino, newDetalleDestino],
    })),

  removeDestinoAutorizado: (index: number) =>
    set((state) => ({
      tablaMontoAutorizado: state.tablaMontoAutorizado.filter(
        (_, i) => i !== index
      ),
    })),
  removeDetalleDestino: (index: number) =>
    set((state) => ({
      tablaDetalleDestino: state.tablaDetalleDestino.filter(
        (_, i) => i !== index
      ),
    })),

  cleanAutorizacion: () =>
    set(() => ({
      autorizacion: {
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

      tablaMontoAutorizado: [],
      tablaDetalleDestino: [],
    })),

  getMediosDePublicacion: async () => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/get-mediosDePublicacion",
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
      url: process.env.REACT_APP_APPLICATION_BACK + "/get-destinosAutorizados",
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
        "/get-detalleDestinosAutorizados",
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

  getDetalleAutorizacion: async (Id: string) => {
    const state = useLargoPlazoStore.getState();

    return await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/detail-autorizacion",
      params: { IdDescripcion: Id },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      state.setAutorizacionSelect(data.data);
    });
  },

  createAutorizacion: async () => {
    const state = useLargoPlazoStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-autorizacion",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
          Entidad: state.autorizacion.entidad.Id,
          NumeroAutorizacion: state.autorizacion.numeroAutorizacion,
          FechaPublicacion: state.autorizacion.fechaPublicacion,
          MedioPublicacion: state.autorizacion.medioPublicacion.Id,
          MontoAutorizado: state.autorizacion.montoAutorizado,
          DocumentoSoporte: state.autorizacion.documentoSoporte,
          AcreditacionQuorum: state.autorizacion.acreditacionQuorum,
          DestinoAutorizado: JSON.stringify(state.tablaMontoAutorizado),
          DetalleDestino: JSON.stringify(state.tablaDetalleDestino),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.setAutorizacionSelect(data.data);
        state.saveFilesAutorizacion(
          data.data.Id,
          `/SRPU/AUTORIZACIONES/${data.data.Id}`,
          state.autorizacion.documentoSoporte
        );
        state.saveFilesAutorizacion(
          data.data.Id,
          `/SRPU/AUTORIZACIONES/${data.data.Id}`,
          state.autorizacion.acreditacionQuorum
        );
      })
      .catch(() => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Mensaje",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      });
  },

  modificarAutorizacion: async () => {
    const state = useLargoPlazoStore.getState();

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-autorizacion",
        {
          IdAutorizacion: state.autorizacionSelect.Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
          Entidad: state.autorizacion.entidad.Id,
          NumeroAutorizacion: state.autorizacion.numeroAutorizacion,
          FechaPublicacion: state.autorizacion.fechaPublicacion,
          MedioPublicacion: state.autorizacion.medioPublicacion.Id,
          MontoAutorizado: state.autorizacion.montoAutorizado,
          DocumentoSoporte: state.autorizacion.documentoSoporte.nombreArchivo,
          AcreditacionQuorum:
            state.autorizacion.acreditacionQuorum.nombreArchivo,
          DestinoAutorizado: JSON.stringify(state.tablaMontoAutorizado),
          DetalleDestino: JSON.stringify(state.tablaDetalleDestino),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.setAutorizacionSelect(data.result);
        state.saveFilesAutorizacion(
          data.result.Id,
          `/SRPU/AUTORIZACIONES/${data.result.Id}`,
          state.autorizacion.documentoSoporte
        );
        state.saveFilesAutorizacion(
          data.result.Id,
          `/SRPU/AUTORIZACIONES/${data.result.Id}`,
          state.autorizacion.acreditacionQuorum
        );
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "No se pudo editar la autorizacion.",
        });
      });
  },

  borrarAutorizacion: async (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    await axios
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-autorizacion", {
        data: {
          IdDescripcion: Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(function (response) {
        let state = useLargoPlazoStore.getState();
        state.autorizacionSelect = {
          Id: "",
          IdEntidad: "",
          Entidad: "",
          NumeroAutorizacion: "",
          FechaPublicacion: "",
          DescripcionMedioPublicacion: "",
          IdMedioPublicacion: "",
          MontoAutorizado: "",
          DocumentoSoporte: "",
          AcreditacionQuorum: "",
          DestinoAutorizado: "",
          DetalleDestino: "",
          CreadoPor: "",
        };
        if (response.status === 200) {
          // window.location.reload()
          Toast.fire({
            icon: "success",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "No se elimino el fideicomiso.",
        });
      });
    return false;
  },

  savePathDocAut: async (
    idAut: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocAut",
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
      .then((r) => { })
      .catch((e) => { });
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
          .catch((e) => { });
      } else {
        return null;
      }
    }, 1000);
  },

  autorizaciones: [],
  getAutorizaciones: async () => {
    return await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/get-autorizaciones",
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

  autorizacionSelect: {
    Id: "",
    IdEntidad: "",
    Entidad: "",
    NumeroAutorizacion: "",
    FechaPublicacion: "",
    DescripcionMedioPublicacion: "",
    IdMedioPublicacion: "",
    MontoAutorizado: "",
    DocumentoSoporte: "",
    AcreditacionQuorum: "",
    DestinoAutorizado: "",
    DetalleDestino: "",
    CreadoPor: "",
  },

  setAutorizacionSelect: (autorizacion: IAutorizaciones) => {
    set((state) => ({
      autorizacionSelect: autorizacion,
    }));
  },
});

import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { StateCreator } from "zustand";
import { ActualizaDescarga } from "../../components/APIS/pathDocSol/APISDocumentos";
import { useTrazabilidad } from "./main";


export interface IDataTrazabilidad {
  ID: string;
  IdSolicitud: string;
  NombreEstatus: string;
  RegistroSolicitud: string;
  NombreCompletoUsuarioModificador: string;
  FechaModificacion: string;
}

export interface TrazabilidadSlice {
  listadoRegistroTrazabilidad: IDataTrazabilidad[];
  getRegistroTrazabilidad: (IdSolicitud: string) => void;

  IdSolicitudNotificacion: string;
  setIdSolicitudNotificacion: (IdSolicitudNotificacion: string) => void;
  cleanIdSolicitud: () => void;

  consultaListaNotificaciones: (filtroNotificacion: boolean) => void;
  filtroNotificacion: boolean;


  getPrimerUsuarioEstatus2: (IdSolicitud: string) => void;
  setIdPrimerUsuarioEstatus2: (IdUsuario: string) => void;
  IdPrimerUsuarioEstatus2: string;
}

export const createTrazabilidadSlice: StateCreator<TrazabilidadSlice> = (
  set,
  get
) => ({

  consultaListaNotificaciones: (filtroNotificacion: boolean) => {
    set(() => ({
      filtroNotificacion: filtroNotificacion,
    }));
  },

  filtroNotificacion: false,

  IdSolicitudNotificacion: "",

  setIdSolicitudNotificacion: (IdSolicitudNotificacion: string) => {
    set(() => ({
      IdSolicitudNotificacion: IdSolicitudNotificacion,
    }));
  },

  cleanIdSolicitud: () => {
    set(() => ({
      IdSolicitudNotificacion: "",
    }));
  },

  listadoRegistroTrazabilidad: [],

  getRegistroTrazabilidad: async (IdSolicitud: string) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-TrazabilidadSolicitud", {
        params: {
          IdSolicitud: IdSolicitud,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {

        let fd = data.data;
        set(() => ({
          listadoRegistroTrazabilidad: fd,
        }));
      });
  },

  setIdPrimerUsuarioEstatus2: (IdUsuario: string) => {
    set(() => ({
      IdPrimerUsuarioEstatus2: IdUsuario,
    }));
  },

  IdPrimerUsuarioEstatus2: "",

  getPrimerUsuarioEstatus2: async (IdSolicitud: string) => {
    const state = useTrazabilidad.getState();
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-PrimerUsuarioEstatus2", {
        params: {
          IdSolicitud: IdSolicitud,
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        // data.data es un array de rows del stored procedure
        // Extraer el primer elemento y obtener el campo Id o IdUsuario
        let idUsuario = "";
        if (Array.isArray(data.data) && data.data.length > 0) {
          const row = data.data[0];
          idUsuario = row?.Id || row?.IdUsuario || row?.ID || row?.UsuarioModificador || "";
        } else if (typeof data.data === "string") {
          idUsuario = data.data;
        }
        
        state.setIdPrimerUsuarioEstatus2(idUsuario);
        console.log("Primer usuario con estatus 2: ", idUsuario);

      }).catch((error) => {
        console.log("Error al obtener el primer usuario con estatus 2", error);
        state.setIdPrimerUsuarioEstatus2("");
      });
  }
});



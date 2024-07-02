import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { StateCreator } from "zustand";
import { ActualizaDescarga } from "../../components/APIS/pathDocSol/APISDocumentos";


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
  setIdSolicitudNotificacion:(IdSolicitudNotificacion: string)  => void;
  cleanIdSolicitud:() =>void;
  

}

export const createTrazabilidadSlice: StateCreator<TrazabilidadSlice> = (
  set,
  get
) => ({
  IdSolicitudNotificacion: "",

  setIdSolicitudNotificacion: (IdSolicitudNotificacion : string)=> {
    set(() => ({
      IdSolicitudNotificacion: IdSolicitudNotificacion,
    }));
  },

  cleanIdSolicitud:() =>{
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
});

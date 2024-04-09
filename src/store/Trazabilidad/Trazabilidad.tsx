import axios from "axios";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
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
}

export const createTrazabilidadSlice: StateCreator<TrazabilidadSlice> = (
  set,
  get
) => ({
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

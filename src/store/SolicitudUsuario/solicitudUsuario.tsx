import { StateCreator } from "zustand";
import { ISolicitudes } from "../../components/Interfaces/InterfacesUsuario/ISoliciudes";

export interface SolicitudUsuarioSlice {
  idSolicitud: string;
  idUsuarioModificado: string;


  changeIdSolicitud: (id: string) => void;
  changeIdUsuarioModificado: (id: string) => void;

  indexSelect: number;
  setIndexSelect: (indexSelect:number) => void

  opendialog: boolean;
  setOpenDialog: (oepndialog: boolean) => void;

  //solicitudesFiltered: ISolicitudes[];
  //setsolicitudesFiltered: (solicitudesFiltered: ISolicitudes) => void;
}

export const createSolicitudUsuarioSlice: StateCreator<
  SolicitudUsuarioSlice
> = (set, get) => ({
  idSolicitud: "",

  indexSelect: -1,
  setIndexSelect(indexSelect: number) {
    set(() => ({
      indexSelect: indexSelect
    }))
  },

  opendialog:false,
  setOpenDialog(opendialog: boolean){
    set(() =>({
      opendialog: opendialog
    }))
  },

  // solicitudesFiltered:[],
  // setsolicitudesFiltered(solicitudesFiltered: ISolicitudes[]) {
  //   set(() => ({
  //     solicitudesFiltered: solicitudesFiltered
  //   }))
  // },


  idUsuarioModificado: "",

  changeIdSolicitud: (id: any) => set(() => ({ idSolicitud: id })),
  changeIdUsuarioModificado: (id: any) =>
    set(() => ({ idUsuarioModificado: id })),
});

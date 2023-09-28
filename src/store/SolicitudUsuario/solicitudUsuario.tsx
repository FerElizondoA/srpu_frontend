import { StateCreator } from "zustand";

export interface SolicitudUsuarioSlice {
  idSolicitud: string;
  idUsuarioModificado: string;

  changeIdSolicitud: (id: string) => void;
  changeIdUsuarioModificado: (id: string) => void;
}

export const createSolicitudUsuarioSlice: StateCreator<
  SolicitudUsuarioSlice
> = (set, get) => ({
  idSolicitud: "",

  idUsuarioModificado: "",

  changeIdSolicitud: (id: any) => set(() => ({ idSolicitud: id })),
  changeIdUsuarioModificado: (id: any) =>
    set(() => ({ idUsuarioModificado: id })),
});

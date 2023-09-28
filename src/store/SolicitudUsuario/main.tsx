import { create } from "zustand";

import {
  createSolicitudUsuarioSlice,
  SolicitudUsuarioSlice,
} from "../SolicitudUsuario/solicitudUsuario";

export type SolicitudStore = SolicitudUsuarioSlice;

export const useSolicitudUsuarioStore = create<SolicitudStore>()((...x) => ({
  ...createSolicitudUsuarioSlice(...x),
}));

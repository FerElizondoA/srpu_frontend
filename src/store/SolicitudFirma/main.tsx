import { create } from "zustand";

import {
  createSolicitudFirmaSlice,
  SolicitudFirmaSlice,
} from "../SolicitudFirma/solicitudFirma";

export type SolicitudStore = SolicitudFirmaSlice;

export const useSolicitudFirmaStore = create<SolicitudStore>()((...x) => ({
  ...createSolicitudFirmaSlice(...x),
}));

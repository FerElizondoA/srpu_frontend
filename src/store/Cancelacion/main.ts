import { create } from "zustand";
import {
  SolicitudCancelacionSlice,
  createSolicitudCancelacionSlice,
} from "./solicitud";

export type CancelacionStore = SolicitudCancelacionSlice;

export const useCancelacionStore = create<CancelacionStore>()((...x) => ({
  ...createSolicitudCancelacionSlice(...x),
}));

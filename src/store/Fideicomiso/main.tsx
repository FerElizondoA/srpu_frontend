import { create } from "zustand";

import {
  createFideicomisoSlice,
  FideicomisoSlice,
} from "../Fideicomiso/fideicomiso";

export type SolicitudStore = FideicomisoSlice;

export const useFideicomisoStore = create<SolicitudStore>()((...x) => ({
  ...createFideicomisoSlice(...x),
}));

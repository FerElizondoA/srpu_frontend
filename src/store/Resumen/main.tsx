import { create } from "zustand";

import { ResumenSlice, resumenSlice } from "./resumen";

export type resumenStore = ResumenSlice;

export const useResumenStore = create<resumenStore>()((...x) => ({
  ...resumenSlice(...x),
}));

import { create } from "zustand";
import { MandatoSlice, createMandatoSlice } from "./mandato";

export type MandatoStore = MandatoSlice;

export const useMandatoStore = create<MandatoStore>()((...x) => ({
  ...createMandatoSlice(...x),
}));

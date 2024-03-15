import { create } from "zustand";
import { InscripcionSlice, createInscripcionSlice } from "./inscripcion";

export type InscripcionStore = InscripcionSlice;

export const useInscripcionStore = create<InscripcionStore>()((...x) => ({
  ...createInscripcionSlice(...x),
}));

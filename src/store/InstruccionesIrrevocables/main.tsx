import { create } from "zustand";
import {
  InstruccionesIrrevocablesSlice,
  createInstruccionesIrrevocables,
} from "./instruccionesIrrevocables";

export type InstruccionesIrrevocables = InstruccionesIrrevocablesSlice;

export const useInstruccionesStore = create<InstruccionesIrrevocables>()(
  (...x) => ({
    ...createInstruccionesIrrevocables(...x),
  })
);

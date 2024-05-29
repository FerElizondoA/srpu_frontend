import { create } from "zustand";
import { TrazabilidadSlice, createTrazabilidadSlice } from "./Trazabilidad";


export type TrazabilidadStore = TrazabilidadSlice;

export const useTrazabilidad = create<TrazabilidadStore>()((...x) => ({
  ...createTrazabilidadSlice(...x),
}));

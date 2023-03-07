import create from "zustand";

import { createEncabezadoSlice, EncabezadoSlice } from "./encabezado";

export const useCortoPlazoStore = create<EncabezadoSlice>()((...x) => ({
    ...createEncabezadoSlice(...x)
}))


import { StateCreator } from "zustand"

export interface EncabezadoSlice{
    tipoDocumento: string,
    tipoEntePublico: string,
    solicitanteAutorizado: string,
    organismo: string,
    fechaContratacion: string,
    cargoSolicitante: string,
    addSolicitanteAutorizado: (newSolicitanteAutorizado: string) => void,
}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (set, get) => ({
    tipoDocumento: "",
    tipoEntePublico: "",
    solicitanteAutorizado: "",
    organismo: "",
    fechaContratacion: "",
    cargoSolicitante: "",
    addSolicitanteAutorizado: (newSolicitanteAutorizado: string) => set((state) => ({solicitanteAutorizado: newSolicitanteAutorizado}))
})


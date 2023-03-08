import { StateCreator } from "zustand"

export interface EncabezadoSlice{
    tipoDocumento: string,
    tipoEntePublico: string,
    solicitanteAutorizado: string,
    organismo: string,
    fechaContratacion: string,
    cargoSolicitante: string,
    changeSolicitanteAutorizado: (newSolicitanteAutorizado: string) => void,
}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (set) => ({
    tipoDocumento: "",
    tipoEntePublico: "",
    solicitanteAutorizado: "",
    organismo: "",
    fechaContratacion: "DD-MM-YYYY",
    cargoSolicitante: "",
    changeSolicitanteAutorizado: (newSolicitanteAutorizado: string) => set(() => ({solicitanteAutorizado: newSolicitanteAutorizado}))
})


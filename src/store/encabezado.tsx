import { StateCreator } from "zustand";
import axios from "axios";

export interface EncabezadoSlice{
    fetchedEntesPublicos: boolean;
    fetchedMunicipios: boolean;
    entesPublicosCatalog: string[];
    municipioCatalog: string[];
    tipoDocumento: string;
    tipoEntePublico: string;
    solicitanteAutorizado: string;
    organismo: string;
    fechaContratacion: string;
    cargoSolicitante: string;
    changeTipoDocumento: (newTipoDocumento: string) => void;
    changeTipoEntePublico: (newTipoEntePublico: string) => void;
    changeSolicitanteAutorizado: (newSolicitanteAutorizado: string) => void;
    changeOrganismo: (newOrganismo: string) => void;
    changeFechaContratacion: (newFechaContratacion: string) => void;
    changeCargoSolicitante: (newCargoSolicitante: string) => void;
    fetchEntesPublicos: () => void;
    fetchMunicipios: () => void;
}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (set, get) => ({
    fetchedEntesPublicos: false,
    fetchedMunicipios: false,
    entesPublicosCatalog: [],
    municipioCatalog: [],
    tipoDocumento: "Obligación a Corto Plazo",
    tipoEntePublico: "",
    solicitanteAutorizado: "",
    organismo: "",
    fechaContratacion: "DD-MM-YYYY",
    cargoSolicitante: "",
    changeTipoDocumento: (newTipoDocumento: string) => set(() => ({tipoDocumento: newTipoDocumento})),
    changeTipoEntePublico: (newTipoEntePublico: string) => set(() => ({tipoEntePublico: newTipoEntePublico})),
    changeSolicitanteAutorizado: (newSolicitanteAutorizado: string) => set(() => ({solicitanteAutorizado: newSolicitanteAutorizado})),
    changeOrganismo: (newOrganismo: string) => set(() => ({organismo: newOrganismo})),
    changeFechaContratacion: (newFechaContratacion: string) => set(() => ({fechaContratacion: newFechaContratacion})),
    changeCargoSolicitante: (newCargoSolicitante: string) => set(() => ({cargoSolicitante: newCargoSolicitante})),
    fetchEntesPublicos: async () => {
        if (!get().fetchedEntesPublicos) {
          console.log("fetchEntesPublicos executed!");
          const response = await axios.get(
            "http://10.200.4.199:8000/api/get-emtePublicoObligado",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          response.data.data.forEach((e: any) => {
            set((state) => ({
              entesPublicosCatalog: [...state.entesPublicosCatalog, e.data],
            }));
          });
          set(() => ({fetchedEntesPublicos: true}))
        }
    },
    fetchMunicipios: async () => {

    }
})


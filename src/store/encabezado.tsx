import { StateCreator } from "zustand";
import axios from "axios";
import dayjs from "dayjs";

export interface EncabezadoSlice{
    fetchedEntesPublicos: boolean;
    fetchedOrganismos: boolean;
    entesPublicosCatalog: string[];
    organismosCatalog: string[];
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
    fetchOrganismos: () => void;
}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (set, get) => ({
    fetchedEntesPublicos: false,
    fetchedOrganismos: false,
    entesPublicosCatalog: [],
    organismosCatalog: [],
    tipoDocumento: "Obligación a Corto Plazo",
    tipoEntePublico: "",
    solicitanteAutorizado: "",
    organismo: "",
    fechaContratacion: new Date().toString(),
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
            "http://10.200.4.199:8000/api/get-tiposEntePublico",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          response.data.data.forEach((e: any) => {
            set((state) => ({
              entesPublicosCatalog: [...state.entesPublicosCatalog, e.Descripcion],
            }));
          });
          set(() => ({fetchedEntesPublicos: true}))
        }
    },
    fetchOrganismos: async () => {
        if (!get().fetchedOrganismos) {
          console.log("fetchMunicipios executed!");
          const response = await axios.get(
            "http://10.200.4.199:8000/api/get-entePublicoObligado",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          response.data.data.forEach((e: any) => {
            set((state) => ({
              organismosCatalog: [...state.organismosCatalog, e.Descripcion],
            }));
          });
          set(() => ({fetchedOrganismos: true}))
        }
    }
})


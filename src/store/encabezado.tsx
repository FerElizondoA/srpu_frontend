import { StateCreator } from "zustand";
import axios from "axios";

export interface EncabezadoSlice{
    IdSolicitud: string;
    fetchedEntesPublicos: boolean;
    fetchedOrganismos: boolean;
    tipoDocumento: string;
    entesPublicosMap: Map<string | null, string>;
    IdTipoEntePublico: string;
    tipoEntePublico: string;
    solicitanteAutorizado: string;
    organismosMap: Map<string | null, any>;
    IdOrganismo: string;
    organismo: string;
    fechaContratacion: string;
    cargoSolicitante: string;
    changeIdSolicitud: (newId: string) => void;
    changeTipoDocumento: (newTipoDocumento: string) => void;
    changeTipoEntePublico: (newId: string, newTipoEntePublico: string) => void;
    changeSolicitanteAutorizado: (newSolicitanteAutorizado: string) => void;
    changeOrganismo: (newId: string, newOrganismo: string) => void;
    changeFechaContratacion: (newFechaContratacion: string) => void;
    changeCargoSolicitante: (newCargoSolicitante: string) => void;
    fetchEntesPublicos: () => void;
    fetchOrganismos: () => void;
}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (set, get) => ({
    IdSolicitud: "",
    fetchedEntesPublicos: false,
    fetchedOrganismos: false,
    tipoDocumento: "Obligación a Corto Plazo",
    entesPublicosMap: new Map<string  | null, string>(),
    IdTipoEntePublico: "",
    tipoEntePublico: "",
    solicitanteAutorizado: "",
    organismosMap: new Map<string | null, string>(),
    IdOrganismo: "",
    organismo: "",
    fechaContratacion: new Date().toString(),
    cargoSolicitante: "",
    changeIdSolicitud: (newId: string) => set(() => ({IdSolicitud: newId})),
    changeTipoDocumento: (newTipoDocumento: string) => set(() => ({tipoDocumento: newTipoDocumento})),
    changeTipoEntePublico: (newId: string, newTipoEntePublico: string) => set(() => ({ tipoEntePublico: newTipoEntePublico, IdTipoEntePublico: newId})),
    changeSolicitanteAutorizado: (newSolicitanteAutorizado: string) => set(() => ({solicitanteAutorizado: newSolicitanteAutorizado})),
    changeOrganismo: (newId: string, newOrganismo: string) => set(() => ({organismo: newOrganismo, IdOrganismo: newId})),
    changeFechaContratacion: (newFechaContratacion: string) => set(() => ({fechaContratacion: newFechaContratacion})),
    changeCargoSolicitante: (newCargoSolicitante: string) => set(() => ({cargoSolicitante: newCargoSolicitante})),
    fetchEntesPublicos: async () => {
        if (!get().fetchedEntesPublicos) {
          const response = await axios.get(
            process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposEntePublico",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          response.data.data.forEach((e: any) => {
            set((state) => ({
              entesPublicosMap: new Map(state.entesPublicosMap).set(e.Descripcion, e.Id)
            }));
          });
          set(() => ({fetchedEntesPublicos: true}))
        }
    },
    fetchOrganismos: async () => {
        if (!get().fetchedOrganismos) {
          const response = await axios.get(
            process.env.REACT_APP_APPLICATION_BACK + "/api/get-entePublicoObligado",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          response.data.data.forEach((e: any) => {
            set((state) => ({
              organismosMap: new Map(state.organismosMap).set(e.Descripcion, e.Id),
            }));
          });
          set(() => ({fetchedOrganismos: true}))
        }
    }
})


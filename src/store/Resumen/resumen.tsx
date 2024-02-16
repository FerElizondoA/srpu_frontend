import { StateCreator } from "zustand";

export interface ResumenSlice {
  //   encabezado: {
  //     tipoDocumento: string;
  //     solicitanteAutorizado: {
  //       Solicitante: string;
  //       Cargo: string;
  //       Nombre: string;
  //     };
  //     tipoEntePublico: { Id: string; TipoEntePublico: string };
  //     organismo: { Id: string; Organismo: string };
  //     fechaContratacion: string;
  //   };

  accion: string;
  setAccion: (accion: string) => void;
}

export const resumenSlice: StateCreator<ResumenSlice> = (set, get) => ({
  //   encabezado: {
  //     tipoDocumento: "Crédito Simple a Largo Plazo",
  //     solicitanteAutorizado: {
  //       Solicitante: localStorage.getItem("IdCentral") || "",
  //       Cargo: localStorage.getItem("Puesto") || "",
  //       Nombre: localStorage.getItem("NombreUsuario") || "",
  //     },
  //     tipoEntePublico: {
  //       Id: localStorage.getItem("IdTipoEntePublicoObligado") || "",
  //       TipoEntePublico: localStorage.getItem("TipoEntePublicoObligado") || "",
  //     },
  //     organismo: {
  //       Id: localStorage.getItem("IdEntePublicoObligado") || "",
  //       Organismo: localStorage.getItem("EntePublicoObligado") || "",
  //     },
  //     fechaContratacion: new Date().toString(),
  //   },

  accion: "",
  setAccion: (accion: string) => {
    set(() => ({
      accion: accion,
    }));
  },
});

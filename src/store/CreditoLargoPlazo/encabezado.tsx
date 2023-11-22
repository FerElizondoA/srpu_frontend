import { StateCreator } from "zustand";

export interface EncabezadoLargoPlazoSlice {
  encabezado: {
    tipoDocumento: string;
    solicitanteAutorizado: {
      Solicitante: string;
      Cargo: string;
      Nombre: string;
    };

    tipoEntePublico: { Id: string; TipoEntePublico: string };
    organismo: { Id: string; Organismo: string };
    fechaContratacion: string;
  };

  changeEncabezado: (
    tipoDocumento: string,
    solicitanteAutorizado: {
      Solicitante: string;
      Cargo: string;
      Nombre: string;
    },
    tipoEntePublico: { Id: string; TipoEntePublico: string },
    organismo: { Id: string; Organismo: string },
    fechaContratacion: string
  ) => void;
}

export const createEncabezadoLargoPlazoSlice: StateCreator<
  EncabezadoLargoPlazoSlice
> = (set, get) => ({
  encabezado: {
    tipoDocumento: "Crédito simple a largo plazo",
    solicitanteAutorizado: {
      Solicitante: localStorage.getItem("IdCentral") || "",
      Cargo: localStorage.getItem("Puesto") || "",
      Nombre: localStorage.getItem("NombreUsuario") || "",
    },
    tipoEntePublico: {
      Id: localStorage.getItem("IdTipoEntePublicoObligado") || "",
      TipoEntePublico: localStorage.getItem("TipoEntePublicoObligado") || "",
    },
    organismo: {
      Id: localStorage.getItem("IdEntePublicoObligado") || "",
      Organismo: localStorage.getItem("EntePublicoObligado") || "",
    },
    fechaContratacion: new Date().toString(),
  },

  changeEncabezado: (encabezado: any) =>
    set(() => ({
      encabezado: encabezado,
    })),
});

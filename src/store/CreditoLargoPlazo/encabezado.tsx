import { StateCreator } from "zustand";
import { useLargoPlazoStore } from "./main";

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

  changeEncabezado: (encabezado: any) => void;
}

export const createEncabezadoLargoPlazoSlice: StateCreator<
  EncabezadoLargoPlazoSlice
> = (set, get) => ({
  encabezado: {
    tipoDocumento: "Crédito Simple a Largo Plazo",
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

  changeEncabezado: (encabezado: any) => {
    const state = useLargoPlazoStore.getState();

    state.changeInformacionGeneral({
      ...state.informacionGeneral,
      fechaContratacion: encabezado.fechaContratacion,
    });
    set(() => ({
      encabezado: encabezado,
    }));
  },
});

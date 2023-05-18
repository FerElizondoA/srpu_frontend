import { StateCreator } from "zustand";
import axios from "axios";
import {
  ICatalogo,
  IEntePublico,
} from "../components/Interfaces/InterfacesCplazo/CortoPlazo/Encabezado/IListEncabezado";

export interface EncabezadoSlice {
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

  catalogoOrganismos: IEntePublico[];
  catalogoTiposEntePublico: ICatalogo[];

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

  // changeIdSolicitud: (newId: string) => void;getTiposEntesPublicos: () => void;
  getOrganismos: () => void;
  getTiposEntesPublicos: () => void;
}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (
  set,
  get
) => ({
  // IdSolicitud: "",
  encabezado: {
    tipoDocumento: "Crédito simple a corto plazo",
    solicitanteAutorizado: {
      Solicitante: localStorage.getItem("IdUsuario") || "",
      Cargo: localStorage.getItem("Puesto") || "",
      Nombre: localStorage.getItem("NombreUsuario") || "",
    },
    tipoEntePublico: {
      Id: "",
      TipoEntePublico: localStorage.getItem("TipoEntePublicoObligado") || "",
    },
    organismo: {
      Id: "",
      Organismo: localStorage.getItem("EntePublicoObligado") || "",
    },
    fechaContratacion: new Date().toString(),
  },

  catalogoOrganismos: [],
  catalogoTiposEntePublico: [],
  // changeIdSolicitud: (newId: string) => set(() => ({ IdSolicitud: newId })),

  changeEncabezado: (encabezado: any) =>
    set(() => ({
      encabezado: encabezado,
    })),

  getTiposEntesPublicos: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposEntePublico",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        set((state) => ({
          catalogoTiposEntePublico: data.data,
        }));
      });
  },
  getOrganismos: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-entePublicoObligado",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        set((state) => ({
          catalogoOrganismos: data.data,
        }));
      });
  },
});

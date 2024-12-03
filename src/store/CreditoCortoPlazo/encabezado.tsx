import { StateCreator } from "zustand";
import axios from "axios";
import {
  ICatalogo,
  IEntePublico,
} from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";
import { useCortoPlazoStore } from "./main";

export interface IEncabezado {
  tipoCredito: { Id: string; Descripcion: string };
  tipoDocumento: string;
  solicitanteAutorizado: {
    IdSolicitante: string;
    Cargo: string;
    Nombre: string;
  };
  tipoEntePublico: { Id: string; TipoEntePublico: string };
  organismo: { Id: string; Organismo: string };
  fechaContratacion: string;
}

export interface IUsuarios {
  Id: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  IdEntidad: string;
  IdRol: string;
  Puesto: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  Dependencia: string;
  Telefono: string;
  Celular: string;
  Ext: string;
}

export interface EncabezadoSlice {
  encabezado: IEncabezado;

  checkBoxOtroTipoSolicitud: boolean;
  changeCheckBoxOtroTipoSolicitud: (check: boolean) => void;

  catalogoOrganismos: IEntePublico[];
  catalogoTiposEntePublico: ICatalogo[];

  catalogoTiposSolicitudes: ICatalogo[];

  changeEncabezado: (encabezado: any) => void;

  listadoUsuarios: Array<IUsuarios>;
  setListadoUsuarios: (usuarios: IUsuarios[]) => void;

  getOrganismos: () => void;
  getTiposEntesPublicos: () => void;

  getTiposSolicitudes: (tipoSolicitud: string) => void;

}

export const createEncabezadoSlice: StateCreator<EncabezadoSlice> = (
  set,
  get
) => ({

  checkBoxOtroTipoSolicitud: false,
  
  changeCheckBoxOtroTipoSolicitud: (check: boolean) => {
    set(() => ({
      checkBoxOtroTipoSolicitud: check,
    }));
  },

  catalogoTiposSolicitudes: [],

  getTiposSolicitudes: async (tipoSolicitud: string) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-TiposSolicitudes", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        if (tipoSolicitud === "CP") {
          r = r.filter((v: any) => v.OCP === 1);
        } else if (tipoSolicitud === "LP") {
          r = r.filter((v: any) => v.OLP === 1);
        } else {
        }
        console.log("tiposSolciitudes:", r);
        
        set((state) => ({
          catalogoTiposSolicitudes: r,
        }));
      });
  },
  encabezado: {
    tipoCredito: {
      Id: "",
      Descripcion:  "",
    },
    tipoDocumento: "Crédito Simple a Corto Plazo",
    solicitanteAutorizado: {
      IdSolicitante: localStorage.getItem("IdCentral") || "",
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

  catalogoOrganismos: [],
  catalogoTiposEntePublico: [],

  changeEncabezado: (encabezado: any) => {
    const state = useCortoPlazoStore.getState();

    state.setInformacionGeneral({
      ...state.informacionGeneral,
      fechaContratacion: encabezado.fechaContratacion,
    });
    set(() => ({
      encabezado: encabezado,
    }));
  },

  listadoUsuarios: [],

  setListadoUsuarios: (usuarios: IUsuarios[]) => {
    set(() => ({
      listadoUsuarios: usuarios,
    }));
  },

  getTiposEntesPublicos: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tiposEntePublico", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        set((state) => ({
          catalogoTiposEntePublico: data.data,
        }));
      });
  },
  getOrganismos: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/get-entePublicoObligado",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoOrganismos: r,
        }));
      });
  },
});

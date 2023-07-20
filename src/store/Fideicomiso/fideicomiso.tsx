import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { useCortoPlazoStore } from "../main";
import Swal from "sweetalert2";
import { format } from "date-fns";

export interface GeneralFideicomiso {
  numeroFideicomiso: string;
  tipoFideicomiso: { Id: string; Descripcion: string };
  fechaFideicomiso: string;
  fiudiciario: { Id: string; Descripcion: string };
}

export interface Fideicomisario {
  fideicomisario: { Id: string; Descripcion: string };
  ordenFideicomisario: { Id: string; Descripcion: string };
}

export interface TipoMovimiento {
  tipo: string;
  tipoFideicomitente: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoOIngreso: { Id: string; Descripcion: string };
  entidad: { Id: string; Descripcion: string };
}

export interface SoporteDocumental {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface Fideicomiso {
  generalFideicomiso: GeneralFideicomiso;
  fideicomisario: Fideicomisario[];
  tipoDeMovimiento: TipoMovimiento[];
  soporteDocumental: SoporteDocumental[];
}

export interface FideicomisoSlice {
  generalFideicomiso: GeneralFideicomiso;
  fideicomisario: Fideicomisario;
  tipoDeMovimiento: TipoMovimiento;
  soporteDocumental: SoporteDocumental;

  tablaFideicomisario: Fideicomisario[];
  tablaTipoMovimiento: TipoMovimiento[];
  tablaSoporteDocumental: SoporteDocumental[];
  tablaFideicomisos: Fideicomiso[];

  catalogoTiposDeFideicomiso: ICatalogo[];
  catalogoFiudiciarios: ICatalogo[];
  catalogoFideicomisarios: ICatalogo[];
  catalogoOrdenesFideicomisario: ICatalogo[];
  catalogoTiposDeFideicomitente: ICatalogo[];
  catalogoTiposDeFuente: ICatalogo[];
  catalogoFondosOIngresos: ICatalogo[];

  setGeneralFideicomiso: (generalFideicomiso: GeneralFideicomiso) => void;
  setFideicomisario: (fideicomisario: Fideicomisario) => void;
  setTipoDeMovimiento: (tipoDeMovimiento: TipoMovimiento) => void;
  setSoporteDocumental: (soporteDocumental: SoporteDocumental) => void;

  addFideicomisario: (fideicomisario: Fideicomisario) => void;
  addTipoMovimiento: (tipoDeMovimiento: TipoMovimiento) => void;
  addSoporteDocumental: (soporteDocumental: SoporteDocumental) => void;

  removeFideicomisario: (index: number) => void;
  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  cleanFideicomisario: () => void;
  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getTiposFideicomiso: () => void;
  getFiudiciarios: () => void;
  getFideicomisarios: () => void;
  getOrdenesFideicomisario: () => void;
  getTiposDeFideicomitente: () => void;
  getTiposDeFuente: () => void;
  getFondosOIngresos: () => void;

  createFideicomiso: () => void;
  getFideicomisos: () => void;
}

export const createFideicomisoSlice: StateCreator<FideicomisoSlice> = (
  set,
  get
) => ({
  generalFideicomiso: {
    numeroFideicomiso: "",
    tipoFideicomiso: { Id: "", Descripcion: "" },
    fechaFideicomiso: new Date().toString(),
    fiudiciario: { Id: "", Descripcion: "" },
  },
  fideicomisario: {
    fideicomisario: { Id: "", Descripcion: "" },
    ordenFideicomisario: { Id: "", Descripcion: "" },
  },
  tipoDeMovimiento: {
    tipo: "Alta de fideicomitente",
    tipoFideicomitente: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoOIngreso: { Id: "", Descripcion: "" },
    entidad: { Id: "", Descripcion: "" },
  },
  soporteDocumental: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date().toString(),
  },

  tablaFideicomisario: [],
  tablaTipoMovimiento: [],
  tablaSoporteDocumental: [],
  tablaFideicomisos: [],

  catalogoTiposDeFideicomiso: [],
  catalogoFiudiciarios: [],
  catalogoFideicomisarios: [],
  catalogoOrdenesFideicomisario: [],
  catalogoTiposDeFideicomitente: [],
  catalogoTiposDeFuente: [],
  catalogoFondosOIngresos: [],

  setGeneralFideicomiso: (generalFideicomiso: GeneralFideicomiso) => {
    set(() => ({
      generalFideicomiso: {
        numeroFideicomiso: generalFideicomiso.numeroFideicomiso,
        tipoFideicomiso: generalFideicomiso.tipoFideicomiso,
        fechaFideicomiso: generalFideicomiso.fechaFideicomiso,
        fiudiciario: generalFideicomiso.fiudiciario,
      },
    }));
  },
  setFideicomisario: (fideicomisario: Fideicomisario) => {
    set(() => ({
      fideicomisario: {
        fideicomisario: fideicomisario.fideicomisario,
        ordenFideicomisario: fideicomisario.ordenFideicomisario,
      },
    }));
  },
  setTipoDeMovimiento: (tipoDeMovimiento: TipoMovimiento) => {
    set(() => ({
      tipoDeMovimiento: tipoDeMovimiento,
    }));
  },
  setSoporteDocumental: (soporteDocumental: SoporteDocumental) => {
    set(() => ({
      soporteDocumental: soporteDocumental,
    }));
  },

  addFideicomisario: (fideicomisario: Fideicomisario) => {
    set((state) => ({
      tablaFideicomisario: [...state.tablaFideicomisario, fideicomisario],
    }));
  },
  addTipoMovimiento: (tipoDeMovimiento: TipoMovimiento) => {
    set((state) => ({
      tablaTipoMovimiento: [...state.tablaTipoMovimiento, tipoDeMovimiento],
    }));
  },
  addSoporteDocumental: (soporteDocumental: SoporteDocumental) => {
    set((state) => ({
      tablaSoporteDocumental: [
        ...state.tablaSoporteDocumental,
        soporteDocumental,
      ],
    }));
  },

  removeFideicomisario: (index: number) =>
    set((state) => ({
      tablaFideicomisario: state.tablaFideicomisario.filter(
        (_, i) => i !== index
      ),
    })),
  removeTipoMovimiento: (index: number) => {
    set((state) => ({
      tablaTipoMovimiento: state.tablaTipoMovimiento.filter(
        (_, i) => i !== index
      ),
    }));
  },
  removeSoporteDocumental: (index: number) => {
    set((state) => ({
      tablaSoporteDocumental: state.tablaSoporteDocumental.filter(
        (_, i) => i !== index
      ),
    }));
  },

  cleanFideicomisario: () => {
    set(() => ({
      fideicomisario: {
        fideicomisario: { Id: "", Descripcion: "" },
        ordenFideicomisario: { Id: "", Descripcion: "" },
      },
    }));
  },
  cleanTipoMovimiento: () => {
    set((state) => ({
      tipoDeMovimiento: {
        tipo: "Alta de fideicomitente",
        tipoFideicomitente: { Id: "", Descripcion: "" },
        entidad: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoOIngreso: { Id: "", Descripcion: "" },
      },
    }));
  },
  cleanSoporteDocumental: () => {
    set((state) => ({
      soporteDocumental: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
    }));
  },

  getTiposFideicomiso: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposDeFideicomiso",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTiposDeFideicomiso: r,
        }));
      });
  },
  getFiudiciarios: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-fiudiciarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoFiudiciarios: r,
        }));
      });
  },
  getFideicomisarios: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-fideicomisarios",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoFideicomisarios: r,
        }));
      });
  },
  getOrdenesFideicomisario: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-ordenesFideicomisario",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoOrdenesFideicomisario: r,
        }));
      });
  },
  getTiposDeFideicomitente: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-tiposDeFideicomitente",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTiposDeFideicomitente: r,
        }));
      });
  },
  getTiposDeFuente: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposDeFuente", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTiposDeFuente: r,
        }));
      });
  },
  getFondosOIngresos: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-fondosOIngresos",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoFondosOIngresos: r,
        }));
      });
  },

  createFideicomiso: async () => {
    const state = useCortoPlazoStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-fideicomiso",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroFideicomiso: state.generalFideicomiso.numeroFideicomiso,
          TipoFideicomiso: state.generalFideicomiso.tipoFideicomiso.Id,
          FechaFideicomiso: format(
            new Date(state.generalFideicomiso.fechaFideicomiso),
            "dd/MM/yyyy"
          ),
          Fiudiciario: state.generalFideicomiso.fiudiciario.Id,
          Fideicomisario: JSON.stringify(state.tablaFideicomisario),
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimiento),
          SoporteDocumental: JSON.stringify(state.tablaSoporteDocumental),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El fideicomiso se ha creado exitosamente",
        });
      });
  },

  getFideicomisos: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-fideicomiso", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        console.log(r);
        console.log(JSON.parse(r[0].SoporteDocumental));

        set((state) => ({
          tablaFideicomisos: r,
        }));
      });
  },
});

import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";

export interface GeneralIntrucciones {
  numeroCuenta: string;
  cuentaCLABE: string;
  banco: { Id: string; Descripcion: string };
}

export interface TipoMovimientoInstrucciones {
  altaDeudor: string;
  tipoEntePublico: { Id: string; Descripcion: string };
  entidadFederativa: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string };
}

export interface Mandato {
  generalInstrucciones: GeneralIntrucciones;
  tipoMovimientoInstrucciones: TipoMovimientoInstrucciones[];
}

export interface InstruccionesIrrevocablesSlice {
  generalInstrucciones: GeneralIntrucciones;
  tipoMovimientoInstrucciones: TipoMovimientoInstrucciones;

  tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[];

  //CATALOGOS
  catalogoTiposDeFuente: ICatalogo[];
  catalogoFondosOIngresos: ICatalogo[];
  catalogoTipoEntePublicoObligado: ICatalogo[];
  catalogoInstituciones: ICatalogo[];
  catalogoMunicipiosUOrganismos: ICatalogo[];

  //

  //borrarInstruccion: (Id: string) => void;
  changeIdInstruccion: (Id: string) => void;
  idInstruccion: string;

  editarInstruccion: (
    tipoMovimientoInstrucciones: TipoMovimientoInstrucciones[]
  ) => void;

  setGeneralInstruccion: (generalInstruccion: GeneralIntrucciones) => void;
  setTipoMovimientoInstrucciones: (
    tipoMovimientoInstrucciones: TipoMovimientoInstrucciones
  ) => void;

  addTipoMovimientoInstrucciones: (
    tipoMovimientoInstrucciones: TipoMovimientoInstrucciones
  ) => void;

  removeTipoMovimientoInstrucciones: (index: number) => void;

  cleanTipoMovimientoInstruccion: (index: number) => void;

  //Get's
  getTiposDeFuenteInstrucciones: () => void;
  getInstitucionesInstrucciones: () => void;
  getFondosOIngresosInstrucciones: () => void;
  //

  // createInstruccion: () => void;
  // modificarInstruccion: () => void;

  //getInstruccion:() => void;
}

export const createInstruccionesIrrevocables: StateCreator<
  InstruccionesIrrevocablesSlice
> = (set, get) => ({
  idInstruccion: "",
  generalInstrucciones: {
    numeroCuenta: "",
    cuentaCLABE: "",
    banco: { Id: "", Descripcion: "" },
  },
  tipoMovimientoInstrucciones: {
    altaDeudor: "NO",
    tipoEntePublico: { Id: "", Descripcion: "" },
    entidadFederativa: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "" },
  },

  tablaTipoMovimientoInstrucciones: [],

  catalogoTiposDeFuente: [],
  catalogoFondosOIngresos: [],
  catalogoTipoEntePublicoObligado: [],
  catalogoInstituciones: [],
  catalogoMunicipiosUOrganismos: [],

  setGeneralInstruccion: (generalInstrucciones: GeneralIntrucciones) => {
    set(() => ({
      generalInstrucciones: generalInstrucciones,
    }));
  },

  setTipoMovimientoInstrucciones: (
    tipoMovimientoInstrucciones: TipoMovimientoInstrucciones
  ) => {
    set(() => ({
      tipoMovimientoInstrucciones: tipoMovimientoInstrucciones,
    }));
  },

  addTipoMovimientoInstrucciones: (
    tipoMovimientoInstrucciones: TipoMovimientoInstrucciones
  ) => {
    set((state) => ({
      tablaTipoMovimientoInstrucciones: [
        ...state.tablaTipoMovimientoInstrucciones,
        tipoMovimientoInstrucciones,
      ],
    }));
  },

  editarInstruccion: (
    tipoMovimientoInstrucciones: TipoMovimientoInstrucciones[]
  ) => {
    set(() => ({
      tablaTipoMovimientoInstrucciones: tipoMovimientoInstrucciones,
    }));
  },

  changeIdInstruccion: (Id: any) => {
    set(() => ({
      idInstruccion: Id,
    }));
  },
  cleanTipoMovimientoInstruccion: () => {
    set(() => ({
      tipoMovimientoInstrucciones: {
        altaDeudor: "",
        tipoEntePublico: { Id: "", Descripcion: "" },
        entidadFederativa: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "" },
      },
    }));
  },
  removeTipoMovimientoInstrucciones: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoInstrucciones:
        state.tablaTipoMovimientoInstrucciones.filter((_, i) => i !== index),
    }));
  },

  //Gets
  getTiposDeFuenteInstrucciones: async () => {
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

  getFondosOIngresosInstrucciones: async () => {
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

  getTipoEntePublicoObligadoInstrucciones: async () => {
    return await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-tiposEntePublico",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTipoEntePublicoObligado: r,
        }));
      });
  },

  getInstitucionesInstrucciones: async () => {
    return await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/get-institucionesFinancieras",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoInstituciones: r,
        }));
      });
  },

  getMunicipiosUOrganismosInstrucciones: async () => {
    return await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-entePublicoObligado",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoMunicipiosUOrganismos: r,
        }));
      });
  },

  //
});

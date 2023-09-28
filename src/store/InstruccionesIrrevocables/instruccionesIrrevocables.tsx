import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import Swal from "sweetalert2";
import { useInstruccionesStore } from "./main";

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

export interface Instruccion {
  generalInstrucciones: GeneralIntrucciones;
  tipoMovimientoInstrucciones: TipoMovimientoInstrucciones[];
}

export interface InstruccionesIrrevocablesSlice {
  idInstruccion: string;
  instruccionSelect: Instruccion[];
  setInstruccionSelect: (instruccion: Instruccion[]) => void;

  generalInstrucciones: GeneralIntrucciones;
  tipoMovimientoInstrucciones: TipoMovimientoInstrucciones;

  tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[];
  tablaInstrucciones: Array<any>;

  changeIdInstruccion: (Id: string) => void;

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

  getInstruccion: (setState: Function) => void;
  createInstruccion: () => void;
  modificaInstruccion: () => void;

  cleanInstruccion: () => void;

  saveFilesInstruccion: (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => void;
  savePathDocInstruccion: (
    idInstruccion: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;

  arrDocs: any[];

  setArrDocs: (arr: any) => void;
}

export const createInstruccionesIrrevocables: StateCreator<
  InstruccionesIrrevocablesSlice
> = (set, get) => ({
  idInstruccion: "",
  instruccionSelect: [],

  setInstruccionSelect: (instruccion: Instruccion[]) => {
    set((state) => ({
      instruccionSelect: instruccion,
    }));
  },

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
  tablaInstrucciones: [],

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

  createInstruccion: async () => {
    const state = useInstruccionesStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-instruccion",
        {
          NumeroCuenta: state.generalInstrucciones.numeroCuenta,
          CLABE: state.generalInstrucciones.cuentaCLABE,
          Banco: state.generalInstrucciones.banco.Id,
          TipoMovimiento: JSON.stringify(
            state.tablaTipoMovimientoInstrucciones
          ),
          EntePublico: localStorage.getItem("EntePublicoObligado"),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        if (data.data.ERROR) {
          Swal.fire({
            confirmButtonColor: "#15212f",
            cancelButtonColor: "rgb(175, 140, 85)",
            icon: "error",
            title: "Error",
            text: "Instrucción ya existente",
          });
        } else {
          Swal.fire({
            confirmButtonColor: "#15212f",
            cancelButtonColor: "rgb(175, 140, 85)",
            icon: "success",
            title: "Éxito",
            text: "La instruccion se ha creado exitosamente",
          });
          state.cleanInstruccion();
          state.changeIdInstruccion(data.data.Id);
        }
      })
      .catch((err) => {});
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

  cleanInstruccion: () => {
    set(() => ({
      idInstruccion: "",
      generalInstrucciones: {
        numeroCuenta: "",
        cuentaCLABE: "",
        banco: { Id: "", Descripcion: "" },
      },
      tablaTipoMovimientoInstrucciones: [],
    }));
  },

  getInstruccion: (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-instruccion", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set(() => ({
          tablaInstrucciones: r,
        }));
        setState(r);
      });
  },

  modificaInstruccion: async () => {
    const state = useInstruccionesStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-instruccion",
        {
          Id: state.idInstruccion,
          NumeroCuenta: state.generalInstrucciones.numeroCuenta,
          CLABE: state.generalInstrucciones.cuentaCLABE,
          Banco: state.generalInstrucciones.banco.Id,
          TipoMovimiento: JSON.stringify(
            state.tablaTipoMovimientoInstrucciones
          ),
          EntePublico: localStorage.getItem("EntePublicoObligado"),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        data.data.ERROR
          ? Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "error",
              title: "Error",
              text: "Instrucción ya existente",
            })
          : Swal.fire({
              confirmButtonColor: "#15212f",
              cancelButtonColor: "rgb(175, 140, 85)",
              icon: "success",
              title: "Éxito",
              text: "La instruccion se ha creado exitosamente",
            });
      })
      .catch((err) => {});
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

  saveFilesInstruccion(idRegistro, ruta, archivo) {},

  savePathDocInstruccion(
    idInstruccion,
    Ruta,
    NombreIdentificador,
    NombreArchivo
  ) {},

  arrDocs: [],

  setArrDocs(arr) {},
});

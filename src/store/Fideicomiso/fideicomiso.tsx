import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { IDatos } from "../../screens/fuenteDePago/Fideicomisos";
import { useFideicomisoStore } from "./main";

export type Fideicomiso = {
  Id: string;
  NumeroDeFideicomiso: string;
  IdTipoFideicomiso: string;
  DescripcionTipoFideicomiso: string;
  FechaDeFideicomiso: string;
  IdFiudiciario: string;
  DescripcionFiudiciario: string;
  Fideicomisario: string;
  TipoDeMovimiento: string;
  SoporteDocumental: string;
};

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

export interface FideicomisoSlice {
  fideicomisoSelect: Fideicomiso[];
  setFideicomisoSelect: (fideicomiso: Fideicomiso[]) => void;
  generalFideicomiso: GeneralFideicomiso;
  fideicomisario: Fideicomisario;
  tipoDeMovimiento: TipoMovimiento;
  soporteDocumental: SoporteDocumental;

  tablaFideicomisario: Fideicomisario[];
  tablaTipoMovimiento: TipoMovimiento[];
  tablaSoporteDocumental: SoporteDocumental[];
  tablaFideicomisos: IDatos[];

  catalogoTiposDeFideicomiso: ICatalogo[];
  catalogoFiudiciarios: ICatalogo[];
  catalogoFideicomisarios: ICatalogo[];
  catalogoOrdenesFideicomisario: ICatalogo[];
  catalogoTiposDeFideicomitente: ICatalogo[];
  catalogoTiposDeFuente: ICatalogo[];
  catalogoFondosOIngresos: ICatalogo[];

  borrarFideicomiso: (Id: string) => void;
  changeIdFideicomiso: (Id: string) => void;
  idFideicomiso: string;

  editarFideicomiso: (
    fideicomisario: Fideicomisario[],
    tipoDeMovimiento: TipoMovimiento[],
    soporteDocumental: SoporteDocumental[]
  ) => void;

  setGeneralFideicomiso: (generalFideicomiso: GeneralFideicomiso) => void;
  setFideicomisario: (fideicomisario: Fideicomisario) => void;
  setTipoDeMovimiento: (tipoDeMovimiento: TipoMovimiento) => void;
  setSoporteDocumental: (soporteDocumental: SoporteDocumental) => void;

  addFideicomisario: (fideicomisario: Fideicomisario) => void;
  addTipoMovimiento: (tipoDeMovimiento: TipoMovimiento) => void;
  addSoporteDocumental: (soporteDocumental: SoporteDocumental) => void;

  editFideicomiso: (
    fideicomisarios: Fideicomisario[],
    soporteDocumental: SoporteDocumental[]
  ) => void;

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
  modificarFideicomiso: () => void;
  getFideicomisos: (setState: any) => void;

  saveFilesFideicomiso: (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => void;

  savePathDocFideicomiso: (
    idFideicomiso: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => void;

  arrDocs: any[];

  setArrDocs: (arr: any) => void;
}

export const createFideicomisoSlice: StateCreator<FideicomisoSlice> = (
  set,
  get
) => ({
  fideicomisoSelect: [],

  setFideicomisoSelect: (fideicomiso: Fideicomiso[]) => {
    set((state) => ({
      fideicomisoSelect: fideicomiso,
    }));
  },

  idFideicomiso: "",
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
      generalFideicomiso: generalFideicomiso,
    }));
  },

  setFideicomisario: (fideicomisario: Fideicomisario) => {
    //tabla
    set(() => ({
      fideicomisario: {
        fideicomisario: fideicomisario.fideicomisario,
        ordenFideicomisario: fideicomisario.ordenFideicomisario,
      },
    }));
  },

  setTipoDeMovimiento: (tipoDeMovimiento: TipoMovimiento) => {
    // tabla
    set(() => ({
      tipoDeMovimiento: tipoDeMovimiento,
    }));
  },

  setSoporteDocumental: (soporteDocumental: SoporteDocumental) => {
    //tabla
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

  editFideicomiso: (
    fideicomisarios: Fideicomisario[],
    soporteDocumental: SoporteDocumental[]
  ) => {
    set((state) => ({
      tablaFideicomisario: fideicomisarios,
      tablaSoporteDocumental: soporteDocumental,
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

  changeIdFideicomiso: (id: any) => set(() => ({ idFideicomiso: id })),

  editarFideicomiso: (
    fideicomisario: Fideicomisario[],
    tipoDeMovimiento: TipoMovimiento[],
    soporteDocumental: SoporteDocumental[]
  ) => {
    set((state) => ({
      tablaFideicomisario: fideicomisario,
      tablaTipoMovimiento: tipoDeMovimiento,
      tablaSoporteDocumental: soporteDocumental,
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
    const state = useFideicomisoStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-fideicomiso",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroFideicomiso: state.generalFideicomiso.numeroFideicomiso,
          TipoFideicomiso: state.generalFideicomiso.tipoFideicomiso.Id,
          FechaFideicomiso: state.generalFideicomiso.fechaFideicomiso,
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
        state.changeIdFideicomiso(data.data.id);
        state.tablaSoporteDocumental.map((dato, index) => {
          return state.saveFilesFideicomiso(
            data.data.Id,
            `/SRPU/FIDEICOMISOS/${data.data.Id}`,
            state.tablaSoporteDocumental[index]
          );
        });

        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El fideicomiso se ha creado exitosamente",
        });
      });
  },

  modificarFideicomiso: async () => {
    const state = useFideicomisoStore.getState();
    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-fideicomiso",
        {
          IdFideicomiso: state.idFideicomiso,
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroFideicomiso: state.generalFideicomiso.numeroFideicomiso,
          TipoFideicomiso: state.generalFideicomiso.tipoFideicomiso.Id,
          FechaFideicomiso: state.generalFideicomiso.fechaFideicomiso,
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
        state.changeIdFideicomiso(data.result.Id);
        state.tablaSoporteDocumental.map((dato, index) => {
          return state.saveFilesFideicomiso(
            data.result.Id,
            `/SRPU/FIDEICOMISOS/${data.result.Id}`,
            { archivo: dato.archivo, nombreArchivo: dato.nombreArchivo }
          );
        });
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El fideicomiso se ha modificado exitosamente",
        });
      })
      .catch(function (error) {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Se encontró un error, verifique la información.",
        });
      });
  },

  borrarFideicomiso: async (Id: string) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: true,
      confirmButtonColor: "#15212f",
      cancelButtonColor: "rgb(175, 140, 85)",
      timer: 3000,
      timerProgressBar: true,
    });

    await axios
      .delete(
        process.env.REACT_APP_APPLICATION_BACK + "/api/delete-fideicomiso",
        {
          data: {
            IdFideicomiso: Id,
            IdUsuario: localStorage.getItem("IdUsuario"),
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          window.location.reload();
          Toast.fire({
            icon: "success",
            title: "Eliminado con exito",
          });
        }
        return true;
      })
      .catch(function () {
        Toast.fire({
          icon: "error",
          title: "No se elimino el fideicomiso.",
        });
      });
    return false;
  },

  getFideicomisos: async (setState: any) => {
    const state = useFideicomisoStore.getState();
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-fideicomiso", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        state.tablaFideicomisos = r;
        setState(r);
      });
  },

  saveFilesFideicomiso: async (
    idRegistro: string,
    ruta: string,
    archivo: { archivo: File; nombreArchivo: string }
  ) => {
    const state = useFideicomisoStore.getState();

    return setTimeout(() => {
      const url = new File([archivo.archivo], archivo.nombreArchivo);

      let dataArray = new FormData();
      dataArray.append("ROUTE", `${ruta}`);
      dataArray.append("ADDROUTE", "true");
      dataArray.append("FILE", url);

      if (archivo.archivo.size > 0) {
        return axios
          .post(
            process.env.REACT_APP_APPLICATION_FILES + "/api/ApiDoc/SaveFile",
            dataArray,
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          )
          .then(({ data }) => {
            state.savePathDocFideicomiso(
              idRegistro,
              data.RESPONSE.RUTA,
              data.RESPONSE.NOMBREIDENTIFICADOR,
              data.RESPONSE.NOMBREARCHIVO
            );
          })
          .catch((e) => {});
      } else {
        return null;
      }
    }, 1000);
  },

  savePathDocFideicomiso: async (
    idFideicomiso: string,
    Ruta: string,
    NombreIdentificador: string,
    NombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/api/create-addPathDocFideicomiso",
        {
          IdFideicomiso: idFideicomiso,
          Ruta: Ruta,
          NombreIdentificador: NombreIdentificador,
          NombreArchivo: NombreArchivo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((r) => {})
      .catch((e) => {});
  },

  arrDocs: [],

  setArrDocs(arr: any) {
    set((state) => ({
      arrDocs: arr,
    }));
  },
});

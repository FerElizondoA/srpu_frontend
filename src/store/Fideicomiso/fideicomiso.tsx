import axios from "axios";
import { StateCreator } from "zustand";
import { IFondoOIngreso } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { IDatosFideicomiso } from "../../screens/fuenteDePago/Fideicomisos";
import { useFideicomisoStore } from "./main";
import Swal from "sweetalert2";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export interface Fideicomisario {
  fideicomisario: { Id: string; Descripcion: string };
  ordenFideicomisario: { Id: string; Descripcion: string };
}

export interface DatosGeneralesFideicomiso {
  numeroFideicomiso: string;
  fechaFideicomiso: Date;
  tipoFideicomiso: { Id: string; Descripcion: string };
  fiduciario: { Id: string; Descripcion: string };
}

export interface TipoMovimientoFideicomiso {
  id: string;
  tipoFideicomitente: { Id: string; Descripcion: string };
  fideicomitente: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string; TipoDeFuente: string };
  fondoIngresoGobiernoEstatal: string;
  fondoIngresoMunicipios: string;
  fondoIngresoAsignadoMunicipio: string;
  ingresoOrganismo: string;
  fondoIngresoAfectadoXGobiernoEstatal: string;
  afectacionGobiernoEstatalEntre100: string;
  acumuladoAfectacionGobiernoEstatalEntre100: string;
  fondoIngresoAfectadoXMunicipio: string;
  acumuladoAfectacionMunicipioEntreAsignadoMunicipio: string;
  ingresoAfectadoXOrganismo: string;
  acumuladoAfectacionOrganismoEntre100: string;
}

export interface SoporteDocumentalFideicomiso {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: Date;
}

export type Fideicomiso = {
  id: string;
  datosGenerales: DatosGeneralesFideicomiso;
  tipoMovimientoFideicomiso: TipoMovimientoFideicomiso[];
  soporteDocumental: SoporteDocumentalFideicomiso;
};

export interface FideicomisoSlice {
  tablaFideicomisos: IDatosFideicomiso[];

  idFideicomiso: string;
  setIdFideicomiso: (Id: string) => void;

  fideicomisoSelect: Fideicomiso[];
  setFideicomisoSelect: (fideicomiso: Fideicomiso[]) => void;

  datosGenerales: DatosGeneralesFideicomiso;

  fideicomisario: Fideicomisario;
  tablaFideicomisario: Fideicomisario[];

  tipoMovimientoFideicomiso: TipoMovimientoFideicomiso;
  tablaTipoMovimientoFideicomiso: TipoMovimientoFideicomiso[];

  soporteDocumentalFideicomiso: SoporteDocumentalFideicomiso;
  tablaSoporteDocumentalFideicomiso: SoporteDocumentalFideicomiso[];

  cleanFideicomiso: () => void;

  editarFideicomiso: (
    id: string,
    datosGenerales: DatosGeneralesFideicomiso,
    fideicomisario: Fideicomisario[],
    tipoMovimiento: TipoMovimientoFideicomiso[],
    soporteDocumental: SoporteDocumentalFideicomiso[]
  ) => void;

  setDatosGenerales: (datosGenerales: DatosGeneralesFideicomiso) => void;
  setFideicomisario: (fideicomisario: Fideicomisario) => void;
  setTipoMovimiento: (tipoMovimiento: TipoMovimientoFideicomiso) => void;
  setSoporteDocumental: (
    soporteDocumental: SoporteDocumentalFideicomiso
  ) => void;

  addFideicomisario: (fideicomisario: Fideicomisario) => void;
  addTipoMovimiento: (tipoMovimiento: TipoMovimientoFideicomiso) => void;
  addSoporteDocumental: (
    soporteDocumental: SoporteDocumentalFideicomiso
  ) => void;

  removeFideicomisario: (index: number) => void;
  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  addPorcentaje: (tipoMovimiento: TipoMovimientoFideicomiso) => void;

  cleanFideicomisario: () => void;
  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getFideicomisos: (setState: Function) => void;
  createFideicomiso: () => void;
  modificaFideicomiso: () => void;
  deleteFideicomiso: (Id: string) => void;

  saveFilesFideicomiso: (idRegistro: string, ruta: string) => void;

  savePathDocFideicomiso: (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string
  ) => void;

  catalogoTiposDeFideicomiso: ICatalogo[];
  catalogoFiduciarios: ICatalogo[];
  catalogoFideicomisarios: ICatalogo[];
  catalogoOrdenesFideicomisario: ICatalogo[];
  catalogoTiposDeFideicomitente: ICatalogo[];
  catalogoTiposDeFuente: ICatalogo[];
  catalogoFondosOIngresos: IFondoOIngreso[];

  getTiposFideicomiso: () => void;
  getFiduciarios: () => void;
  getFideicomisarios: () => void;
  getOrdenesFideicomisario: () => void;
  getTiposDeFideicomitente: () => void;
  getTiposDeFuente: () => void;
  getFondosOIngresos: () => void;
}

export const createFideicomisoSlice: StateCreator<FideicomisoSlice> = (
  set,
  get
) => ({
  tablaFideicomisos: [],

  idFideicomiso: "",
  setIdFideicomiso: (Id: string) => {
    set(() => ({
      idFideicomiso: Id,
    }));
  },

  fideicomisoSelect: [],
  setFideicomisoSelect: (fideicomiso: Fideicomiso[]) => {
    set(() => ({
      fideicomisoSelect: fideicomiso,
    }));
  },

  datosGenerales: {
    numeroFideicomiso: "",
    fechaFideicomiso: new Date(),
    tipoFideicomiso: { Id: "", Descripcion: "" },
    fiduciario: { Id: "", Descripcion: "" },
  },

  fideicomisario: {
    fideicomisario: { Id: "", Descripcion: "" },
    ordenFideicomisario: { Id: "", Descripcion: "" },
  },
  tablaFideicomisario: [],

  tipoMovimientoFideicomiso: {
    id: "",
    tipoFideicomitente: { Id: "", Descripcion: "" },
    fideicomitente: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
    fondoIngresoGobiernoEstatal: "",
    fondoIngresoMunicipios: "",
    fondoIngresoAsignadoMunicipio: "",
    ingresoOrganismo: "",
    fondoIngresoAfectadoXGobiernoEstatal: "",
    afectacionGobiernoEstatalEntre100: "",
    acumuladoAfectacionGobiernoEstatalEntre100: "",
    fondoIngresoAfectadoXMunicipio: "",
    acumuladoAfectacionMunicipioEntreAsignadoMunicipio: "",
    ingresoAfectadoXOrganismo: "",
    acumuladoAfectacionOrganismoEntre100: "",
  },
  tablaTipoMovimientoFideicomiso: [],

  soporteDocumentalFideicomiso: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date(),
  },
  tablaSoporteDocumentalFideicomiso: [],

  cleanFideicomiso: () => {
    set(() => ({
      idFideicomiso: "",

      datosGenerales: {
        numeroFideicomiso: "",
        fechaFideicomiso: new Date(),
        tipoFideicomiso: { Id: "", Descripcion: "" },
        fiduciario: { Id: "", Descripcion: "" },
      },

      fideicomisario: {
        fideicomisario: { Id: "", Descripcion: "" },
        ordenFideicomisario: { Id: "", Descripcion: "" },
      },
      tablaFideicomisario: [],

      tipoMovimientoFideicomiso: {
        id: "",
        tipoFideicomitente: { Id: "", Descripcion: "" },
        fideicomitente: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        fondoIngresoGobiernoEstatal: "",
        fondoIngresoMunicipios: "",
        fondoIngresoAsignadoMunicipio: "",
        ingresoOrganismo: "",
        fondoIngresoAfectadoXGobiernoEstatal: "",
        afectacionGobiernoEstatalEntre100: "",
        acumuladoAfectacionGobiernoEstatalEntre100: "",
        fondoIngresoAfectadoXMunicipio: "",
        acumuladoAfectacionMunicipioEntreAsignadoMunicipio: "",
        ingresoAfectadoXOrganismo: "",
        acumuladoAfectacionOrganismoEntre100: "",
      },
      tablaTipoMovimientoFideicomiso: [],

      soporteDocumentalFideicomiso: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
      },
      tablaSoporteDocumentalFideicomiso: [],
    }));
  },

  editarFideicomiso: (
    id: string,
    datosGenerales: DatosGeneralesFideicomiso,
    fideicomisario: Fideicomisario[],
    tipoMovimiento: TipoMovimientoFideicomiso[],
    soporteDocumental: SoporteDocumentalFideicomiso[]
  ) => {
    set(() => ({
      idFideicomiso: id,
      datosGenerales: datosGenerales,
      tablaFideicomisario: fideicomisario,
      tablaTipoMovimientoFideicomiso: tipoMovimiento,
      tablaSoporteDocumentalFideicomiso: soporteDocumental,
    }));
  },

  setDatosGenerales: (datosGenerales: DatosGeneralesFideicomiso) => {
    set(() => ({
      datosGenerales: datosGenerales,
    }));
  },
  setFideicomisario: (fideicomisario: Fideicomisario) => {
    set(() => ({
      fideicomisario: fideicomisario,
    }));
  },
  setTipoMovimiento: (tipoMovimiento: TipoMovimientoFideicomiso) => {
    set(() => ({
      tipoMovimientoFideicomiso: tipoMovimiento,
    }));
  },
  setSoporteDocumental: (soporteDocumental: SoporteDocumentalFideicomiso) => {
    set(() => ({
      soporteDocumentalFideicomiso: soporteDocumental,
    }));
  },

  addFideicomisario: (fideicomisario: Fideicomisario) => {
    set((state) => ({
      tablaFideicomisario: [...state.tablaFideicomisario, fideicomisario],
    }));
  },
  addTipoMovimiento: (tipoMovimiento: TipoMovimientoFideicomiso) => {
    set((state) => ({
      tablaTipoMovimientoFideicomiso: [
        ...state.tablaTipoMovimientoFideicomiso,
        tipoMovimiento,
      ],
    }));
  },
  addSoporteDocumental: (soporteDocumental: SoporteDocumentalFideicomiso) => {
    set((state) => ({
      tablaSoporteDocumentalFideicomiso: [
        ...state.tablaSoporteDocumentalFideicomiso,
        soporteDocumental,
      ],
    }));
  },

  removeFideicomisario: (index: number) => {
    set((state) => ({
      tablaFideicomisario: state.tablaFideicomisario.filter(
        (_, i) => i !== index
      ),
    }));
  },
  removeTipoMovimiento: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoFideicomiso:
        state.tablaTipoMovimientoFideicomiso.filter((_, i) => i !== index),
    }));
  },
  removeSoporteDocumental: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalFideicomiso:
        state.tablaSoporteDocumentalFideicomiso.filter((_, i) => i !== index),
    }));
  },

  addPorcentaje: (tipoMovimiento: any) => {
    set(() => ({ tablaTipoMovimientoFideicomiso: tipoMovimiento }));
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
    set(() => ({
      tipoMovimientoFideicomiso: {
        id: "",
        tipoFideicomitente: { Id: "", Descripcion: "" },
        fideicomitente: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        fondoIngresoGobiernoEstatal: "",
        fondoIngresoMunicipios: "",
        fondoIngresoAsignadoMunicipio: "",
        ingresoOrganismo: "",
        fondoIngresoAfectadoXGobiernoEstatal: "",
        afectacionGobiernoEstatalEntre100: "",
        acumuladoAfectacionGobiernoEstatalEntre100: "",
        fondoIngresoAfectadoXMunicipio: "",
        acumuladoAfectacionMunicipioEntreAsignadoMunicipio: "",
        ingresoAfectadoXOrganismo: "",
        acumuladoAfectacionOrganismoEntre100: "",
      },
    }));
  },
  cleanSoporteDocumental: () => {
    set(() => ({
      soporteDocumentalFideicomiso: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
      },
    }));
  },

  getFideicomisos: (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-fideicomiso", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;

        set(() => ({
          tablaFideicomisos: r,
        }));

        setState(r);
      });
  },

  createFideicomiso: async () => {
    const state = useFideicomisoStore.getState();

    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    // eslint-disable-next-line array-callback-return
    state.tablaTipoMovimientoFideicomiso.map((v: any, index: number) => {
      acumuladoEstado += parseFloat(
        v.fondoIngresoAfectadoXGobiernoEstatal || 0
      );
      acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
      acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    });

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-fideicomiso",
        {
          NumeroFideicomiso: state.datosGenerales.numeroFideicomiso,
          FechaFideicomiso: state.datosGenerales.fechaFideicomiso,
          TipoFideicomiso: state.datosGenerales.tipoFideicomiso.Descripcion,
          Fiduciario: state.datosGenerales.fiduciario.Descripcion,
          Fideicomisario: JSON.stringify(state.tablaFideicomisario),
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoFideicomiso),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalFideicomiso
          ),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.setIdFideicomiso(data.data.Id);
        state.saveFilesFideicomiso(
          data.data.Id,
          `/SRPU/FIDEICOMISOS/${data.data.Id}`
        );

        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El mandato se ha creado exitosamente",
        });
      })
      .catch(() => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Mensaje",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      });
  },

  modificaFideicomiso: async () => {
    const state = useFideicomisoStore.getState();
    const cpState = useCortoPlazoStore.getState();

    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    // eslint-disable-next-line array-callback-return
    state.tablaTipoMovimientoFideicomiso.map((v: any, index: number) => {
      acumuladoEstado += parseFloat(
        v.fondoIngresoAfectadoXGobiernoEstatal || 0
      );
      acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
      acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    });

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-fideicomiso",
        {
          IdFideicomiso: state.idFideicomiso,
          FechaFideicomiso: state.datosGenerales.fechaFideicomiso,
          TipoFideicomiso: state.datosGenerales.tipoFideicomiso.Descripcion,
          Fiduciario: state.datosGenerales.fiduciario.Descripcion,
          Fideicomisario: JSON.stringify(state.tablaFideicomisario),
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoFideicomiso),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalFideicomiso
          ),
          CreadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.setIdFideicomiso(data.result.Id);
        cpState.deleteFiles(`/SRPU/FIDEICOMISOS/${data.result.Id}`);
        state.saveFilesFideicomiso(
          data.result.Id,
          `/SRPU/FIDEICOMISOS/${data.result.Id}`
        );
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

  deleteFideicomiso: async (Id: string) => {
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
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-Fideicomiso", {
        data: {
          IdFideicomiso: Id,
          IdUsuario: localStorage.getItem("IdUsuario"),
        },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
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
          title: "No se elimino el Fideicomiso.",
        });
      });
    return false;
  },

  saveFilesFideicomiso: async (idRegistro: string, ruta: string) => {
    const state = useFideicomisoStore.getState();

    return await state.tablaSoporteDocumentalFideicomiso.map((dato, index) => {
      return setTimeout(() => {
        const url = new File([dato.archivo], dato.nombreArchivo);

        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", url);

        if (dato.archivo.size > 0) {
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
    });
  },

  savePathDocFideicomiso: async (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-addPathDocMandato",
        {
          IdFideicomiso: id,
          Ruta: ruta,
          NombreIdentificador: nombreIdentificador,
          NombreArchivo: nombreArchivo,
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

  catalogoTiposDeFideicomiso: [],
  catalogoFiduciarios: [],
  catalogoFideicomisarios: [],
  catalogoOrdenesFideicomisario: [],
  catalogoTiposDeFideicomitente: [],
  catalogoTiposDeFuente: [],
  catalogoFondosOIngresos: [],

  getTiposFideicomiso: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tiposDeFideicomiso", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTiposDeFideicomiso: r,
        }));
      });
  },

  getFiduciarios: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-fiduciarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoFiduciarios: r,
        }));
      });
  },

  getFideicomisarios: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-fideicomisarios", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
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
        process.env.REACT_APP_APPLICATION_BACK + "/get-ordenesFideicomisario",
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
        process.env.REACT_APP_APPLICATION_BACK + "/get-tiposDeFideicomitente",
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tiposDeFuente", {
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
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-fondosOIngresos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoFondosOIngresos: r,
        }));
      });
  },
});

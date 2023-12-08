/* eslint-disable array-callback-return */
import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { IDatosInstrucciones } from "../../screens/fuenteDePago/InstruccionesIrrevocables";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { useInstruccionesStore } from "./main";

export interface IDatosGeneralesInstrucciones {
  numeroCuenta: string;
  cuentaCLABE: string;
  banco: { Id: string; Descripcion: string };
}

export interface IDeudorInstrucciones {
  id: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  entePublicoObligado: { Id: string; Descripcion: string };
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

export interface IBeneficiarioInstrucciones {
  tipoBeneficiario: { Id: string; Descripcion: string };
  beneficiario: { Id: string; Descripcion: string };
  fechaAlta: Date;
}

export interface ISoporteDocumentalInstrucciones {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: Date;
}

export interface IInstruccion {
  Id: string;
  generalInstrucciones: IDatosGeneralesInstrucciones;
  TipoMovimientoInstruccion: IDeudorInstrucciones[];
  SoporteDocumentalInstruccion: ISoporteDocumentalInstrucciones[];
}

export interface InstruccionesIrrevocablesSlice {
  tablaInstrucciones: IDatosInstrucciones[];

  idInstruccion: string;
  setIdInstruccion: (Id: string) => void;

  datosGenerales: IDatosGeneralesInstrucciones;

  tipoMovimiento: IDeudorInstrucciones;
  tablaTipoMovimiento: IDeudorInstrucciones[];

  beneficiario: IBeneficiarioInstrucciones;

  idTipoMovimientoSelect: string;
  setIdTipoMovimientoSelect: (id: string) => void;

  soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones;
  tablaSoporteDocumentalInstruccion: ISoporteDocumentalInstrucciones[];

  cleanInstruccion: () => void;

  editarInstruccion: (
    id: string,
    datosGenerales: IDatosGeneralesInstrucciones,
    tipoMovimiento: IDeudorInstrucciones[],
    soporteDocumental: ISoporteDocumentalInstrucciones[]
  ) => void;

  setDatosGenerales: (datosGenerales: IDatosGeneralesInstrucciones) => void;
  setTipoMovimiento: (tipoMovimiento: IDeudorInstrucciones) => void;
  setBeneficiario: (beneficiario: IBeneficiarioInstrucciones) => void;
  setSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalInstrucciones
  ) => void;

  addTipoMovimiento: (deudor: IDeudorInstrucciones) => void;
  addSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalInstrucciones
  ) => void;

  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  addPorcentaje: (tipoMovimiento: IDeudorInstrucciones) => void;

  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getInstrucciones: (setState: Function) => void;
  createInstruccion: (setLoading: Function) => void;
  modificaInstruccion: (setLoading: Function) => void;
  deleteInstruccion: (id: string) => void;

  saveFilesInstruccion: (
    idRegistro: string,
    ruta: string,
    setLoading: Function
  ) => void;
  savePathDocInstruccion: (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string,
    setLoading: Function
  ) => void;
}

export const createInstruccionesIrrevocables: StateCreator<
  InstruccionesIrrevocablesSlice
> = (set, get) => ({
  tablaInstrucciones: [],

  idInstruccion: "",
  setIdInstruccion: (id: string) => {
    set(() => ({
      idInstruccion: id,
    }));
  },

  datosGenerales: {
    numeroCuenta: "",
    cuentaCLABE: "",
    banco: { Id: "", Descripcion: "" },
  },

  tipoMovimiento: {
    id: "",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    entePublicoObligado: { Id: "", Descripcion: "" },
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
  tablaTipoMovimiento: [],

  beneficiario: {
    tipoBeneficiario: { Id: "", Descripcion: "" },
    beneficiario: { Id: "", Descripcion: "" },
    fechaAlta: new Date(),
  },

  idTipoMovimientoSelect: "",
  setIdTipoMovimientoSelect: (id: string) => {
    set(() => ({
      idTipoMovimientoSelect: id,
    }));
  },

  soporteDocumentalInstruccion: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date(),
  },
  tablaSoporteDocumentalInstruccion: [],

  cleanInstruccion: () => {
    set(() => ({
      idInstruccion: "",
      datosGenerales: {
        numeroCuenta: "",
        cuentaCLABE: "",
        banco: { Id: "", Descripcion: "" },
      },

      deudorInstrucciones: {
        id: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        entePublicoObligado: { Id: "", Descripcion: "" },
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
      tablaTipoMovimiento: [],

      beneficiario: {
        tipoBeneficiario: { Id: "", Descripcion: "" },
        beneficiario: { Id: "", Descripcion: "" },
        fechaAlta: new Date(),
      },
      soporteDocumentalInstruccion: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
      },
      tablaSoporteDocumentalInstruccion: [],
      idTipoMovimientoSelect: "",
    }));
  },

  editarInstruccion: (
    id: string,
    datosGenerales: IDatosGeneralesInstrucciones,
    tipoMovimiento: IDeudorInstrucciones[],
    soporteDocumental: ISoporteDocumentalInstrucciones[]
  ) => {
    set(() => ({
      idInstruccion: id,
      datosGenerales: datosGenerales,
      tablaTipoMovimiento: tipoMovimiento,
      tablaSoporteDocumentalInstruccion: soporteDocumental,
    }));
  },

  setDatosGenerales: (datosGenerales: IDatosGeneralesInstrucciones) => {
    set(() => ({
      datosGenerales: datosGenerales,
    }));
  },
  setTipoMovimiento: (deudor: IDeudorInstrucciones) => {
    set(() => ({
      tipoMovimiento: deudor,
    }));
  },
  setBeneficiario: (beneficiario: IBeneficiarioInstrucciones) => {
    set(() => ({
      beneficiario: beneficiario,
    }));
  },
  setSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalInstrucciones
  ) => {
    set(() => ({
      soporteDocumentalInstruccion: soporteDocumental,
    }));
  },

  addTipoMovimiento: (deudor: IDeudorInstrucciones) => {
    set((state) => ({
      tablaTipoMovimiento: [...state.tablaTipoMovimiento, deudor],
    }));
  },
  addSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalInstrucciones
  ) => {
    set((state) => ({
      tablaSoporteDocumentalInstruccion: [
        ...state.tablaSoporteDocumentalInstruccion,
        soporteDocumental,
      ],
    }));
  },
  removeTipoMovimiento: (index: number) => {
    set((state) => ({
      tablaTipoMovimiento: state.tablaTipoMovimiento.filter(
        (_, i) => i !== index
      ),
    }));
  },
  removeSoporteDocumental: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalInstruccion:
        state.tablaSoporteDocumentalInstruccion.filter((_, i) => i !== index),
    }));
  },

  addPorcentaje: (tipoMovimiento: any) => {
    set(() => ({ tablaTipoMovimiento: tipoMovimiento }));
  },

  cleanTipoMovimiento: () => {
    set(() => ({
      tipoMovimiento: {
        id: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        entePublicoObligado: { Id: "", Descripcion: "" },
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
      soporteDocumentalInstruccion: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
      },
    }));
  },

  getInstrucciones: (setState: Function) => {
    const state = useInstruccionesStore.getState();
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-Instrucciones", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        state.tablaInstrucciones = r;
        setState(r);
      });
  },

  createInstruccion: async (setLoading: Function) => {
    const state = useInstruccionesStore.getState();

    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    state.tablaTipoMovimiento.map((v: any, index: number) => {
      acumuladoEstado += parseFloat(
        v.fondoIngresoAfectadoXGobiernoEstatal || 0
      );
      acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
      acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    });

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-instruccion",
        {
          NumeroCuenta: state.datosGenerales.numeroCuenta,
          CLABE: state.datosGenerales.cuentaCLABE,
          Banco: state.datosGenerales.banco.Id,
          MunicipioOrganismoMandante:
            state.tablaTipoMovimiento[0].entePublicoObligado.Descripcion, //// revisar
          TipoEntePublicoObligado:
            state.tablaTipoMovimiento[0].tipoEntePublicoObligado.Descripcion,
          MecanismoPago: "Instrucciones Irrevocables",
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimiento),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalInstruccion
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
        state.setIdInstruccion(data.data.Id);
        state.saveFilesInstruccion(
          data.data.Id,
          `/SRPU/INSTRUCCIONESIRREVOCABLES/${data.data.Id}`,
          setLoading
        );
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "La instruccion se ha creado exitosamente",
        });
        state.cleanInstruccion();
      })
      .catch((error) => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Mensaje",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      });
  },

  modificaInstruccion: async (setLoading: Function) => {
    const state = useInstruccionesStore.getState();
    const cpState = useCortoPlazoStore.getState();
    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-Instruccion",
        {
          Id: state.idInstruccion,
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroCuenta: state.datosGenerales.numeroCuenta,
          CLABE: state.datosGenerales.cuentaCLABE,
          MunicipioOrganismoMandante:
            state.tablaTipoMovimiento[0].entePublicoObligado.Descripcion,
          TipoEntePublicoObligado:
            state.tablaTipoMovimiento[0].tipoEntePublicoObligado.Descripcion,
          MecanismoPago: "Instrucciones Irrevocables",
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimiento),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalInstruccion
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
        state.setIdInstruccion(data.result.Id);
        cpState.deleteFiles(
          `/SRPU/INSTRUCCIONESIRREVOCABLES/${data.result.Id}`
        );
        state.saveFilesInstruccion(
          data.result.Id,
          `/SRPU/INSTRUCCIONESIRREVOCABLES/${data.result.Id}`,
          setLoading
        );
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "La instruccion se ha creado exitosamente",
        });
      })
      .catch((error) => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "Mensaje",
          text: "Ha sucedido un error, inténtelo de nuevo",
        });
      });
  },

  deleteInstruccion: async (Id: string) => {
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
      .delete(process.env.REACT_APP_APPLICATION_BACK + "/delete-Instruccion", {
        data: {
          IdInstruccion: Id,
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
          title: "No se elimino la instrucción.",
        });
      });
    return false;
  },

  saveFilesInstruccion: async (
    idRegistro: string,
    ruta: string,
    setLoading: Function
  ) => {
    const state = useInstruccionesStore.getState();

    return await state.tablaSoporteDocumentalInstruccion.map((dato, index) => {
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
              state.savePathDocInstruccion(
                idRegistro,
                data.RESPONSE.RUTA,
                data.RESPONSE.NOMBREIDENTIFICADOR,
                data.RESPONSE.NOMBREARCHIVO,
                setLoading
              );
            })
            .catch((e) => {});
        } else {
          return null;
        }
      }, 1000);
    });
  },

  savePathDocInstruccion: async (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string,
    setLoading: Function
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
          "/create-addPathDocInstruccion",
        {
          IdInstruccion: id,
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
      .then((r) => {
        setLoading(false);
      })
      .catch((e) => {});
  },
});

import axios from "axios";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { IDatosInstrucciones } from "../../screens/fuenteDePago/InstruccionesIrrevocables";
import { useInstruccionesStore } from "./main";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export interface IDatosGeneralesInstrucciones {
  numeroCuenta: string;
  cuentaCLABE: string;
  banco: { Id: string; Descripcion: string };
}

export interface IDeudorInstrucciones {
  id: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  altaDeudor: string;
  entidadFederativa: { Id: string; Descripcion: string };
  //mandatario: { Id: string, Descripcion: string},
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
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface IInstruccion {
  Id: string;
  generalInstrucciones: IDatosGeneralesInstrucciones;
  TipoMovimientoInstruccion: IDeudorInstrucciones[];
  SoporteDocumentalInstruccion: ISoporteDocumentalInstrucciones[];
}

export interface InstruccionesIrrevocablesSlice {
  IdRegistroTabla: IDeudorInstrucciones;
  setIdResgistroTabla: (IdRegistroTabla: IDeudorInstrucciones) => void;

  CamposBeneficiario: IBeneficiarioInstrucciones;
  setCamposBeneficiario: (
    CamposBeneficiario: IBeneficiarioInstrucciones
  ) => void;

  idInstruccion: string;
  instruccionSelect: IInstruccion[];
  setInstruccionSelect: (instruccion: IInstruccion[]) => void;

  generalInstrucciones: IDatosGeneralesInstrucciones;
  tipoMovimientoInstruccion: IDeudorInstrucciones;
  soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones;

  catalogoTiposBeneficiarios: ICatalogo[];
  getTiposBeneficiarios: () => void;

  addSoporteDocumentalInstrucciones: (
    tablaSoporteDocumentalInstrucciones: ISoporteDocumentalInstrucciones
  ) => void;

  tablaSoporteDocumentalInstrucciones: ISoporteDocumentalInstrucciones[];
  tablaTipoMovimientoInstrucciones: IDeudorInstrucciones[];
  tablaInstrucciones: IDatosInstrucciones[];

  changeIdInstruccion: (Id: string) => void;
  removeSoporteDocumentalInstruccion: (index: number) => void;

  setSoporteDocumentalInstruccion: (
    soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones
  ) => void;
  setTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: IDeudorInstrucciones
  ) => void;

  setTablaTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: IDeudorInstrucciones[]
  ) => void;
  setTablaSoporteDocumentalInstrucciones: (
    soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones[]
  ) => void;

  setGeneralInstruccion: (
    generalInstruccion: IDatosGeneralesInstrucciones
  ) => void;

  addTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: IDeudorInstrucciones
  ) => void;

  removeTipoMovimientoInstrucciones: (index: number) => void;

  cleanTipoMovimientoInstruccion: (index: number) => void;
  cleanSoporteDocumentalInstruccion: () => void;

  addPorcentaje: (tipoMovimientoInstruccion: IDeudorInstrucciones) => void;

  getInstruccion: (setState: Function) => void;
  createInstruccion: (setLoading: Function) => void;
  modificaInstruccion: (setLoading: Function) => void;
  borrarInstruccion: (Id: string) => void;

  cleanInstruccion: () => void;

  saveFilesInstruccion: (
    idRegistro: string,
    ruta: string,
    setLoading: Function
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
  catalogoTiposBeneficiarios: [],
  getTiposBeneficiarios: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tipoBeneficiario", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTiposBeneficiarios: r,
        }));
      });
  },

  removeSoporteDocumentalInstruccion: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalInstrucciones:
        state.tablaSoporteDocumentalInstrucciones.filter((_, i) => i !== index),
    }));
  },

  IdRegistroTabla: {
    id: "",
    altaDeudor: "",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    entidadFederativa: { Id: "", Descripcion: "" },
    //mandatario: { Id: "", Descripcion: "" },
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

  setIdResgistroTabla: (IdRegistroTabla: IDeudorInstrucciones) => {
    set(() => ({
      IdRegistroTabla: IdRegistroTabla,
    }));
  },

  CamposBeneficiario: {
    tipoBeneficiario: { Id: "", Descripcion: "" },
    beneficiario: { Id: "", Descripcion: "" },
    fechaAlta: new Date(),
  },

  setCamposBeneficiario: (CamposBeneficiario: IBeneficiarioInstrucciones) => {
    set(() => ({
      CamposBeneficiario: CamposBeneficiario,
    }));
  },

  idInstruccion: "",
  instruccionSelect: [],

  setInstruccionSelect: (instruccion: IInstruccion[]) => {
    set((state) => ({
      instruccionSelect: instruccion,
    }));
  },

  generalInstrucciones: {
    numeroCuenta: "",
    cuentaCLABE: "",
    banco: { Id: "", Descripcion: "" },
    mecanismo: "Intrucciones Irrevocables",
    municipio: { Id: "", Descripcion: "" },
  },

  tipoMovimientoInstruccion: {
    id: "",
    altaDeudor: "",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    entidadFederativa: { Id: "", Descripcion: "" },
    //mandatario: { Id: "", Descripcion: "" },
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
  soporteDocumentalInstruccion: {
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date().toString(),
  },

  tablaSoporteDocumentalInstrucciones: [],
  tablaTipoMovimientoInstrucciones: [],
  tablaInstrucciones: [],

  setSoporteDocumentalInstruccion: (
    soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones
  ) => {
    set(() => ({
      soporteDocumentalInstruccion: soporteDocumentalInstruccion,
    }));
  },

  setGeneralInstruccion: (
    generalInstrucciones: IDatosGeneralesInstrucciones
  ) => {
    set(() => ({
      generalInstrucciones: generalInstrucciones,
    }));
  },

  setTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: IDeudorInstrucciones
  ) => {
    set(() => ({
      tipoMovimientoInstruccion: tipoMovimientoInstruccion,
    }));
  },

  setTablaTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: IDeudorInstrucciones[]
  ) => {
    set(() => ({
      tablaTipoMovimientoInstrucciones: tipoMovimientoInstruccion,
    }));
  },

  setTablaSoporteDocumentalInstrucciones: (
    soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones[]
  ) => {
    set(() => ({
      tablaSoporteDocumentalInstrucciones: soporteDocumentalInstruccion,
    }));
  },

  addSoporteDocumentalInstrucciones: (
    soporteDocumentalInstruccion: ISoporteDocumentalInstrucciones
  ) => {
    set((state) => ({
      tablaSoporteDocumentalInstrucciones: [
        ...state.tablaSoporteDocumentalInstrucciones,
        soporteDocumentalInstruccion,
      ],
    }));
  },

  addTipoMovimientoInstrucciones: (
    tipoMovimientoInstrucciones: IDeudorInstrucciones
  ) => {
    set((state) => ({
      tablaTipoMovimientoInstrucciones: [
        ...state.tablaTipoMovimientoInstrucciones,
        tipoMovimientoInstrucciones,
      ],
    }));
  },

  createInstruccion: async (setLoading: Function) => {
    const state = useInstruccionesStore.getState();

    let acumuladoEstado = 0;
    let acumuladoMunicipio = 0;
    let acumuladoOrganismo = 0;

    state.tablaTipoMovimientoInstrucciones.map((v: any, index: number) => {
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
          NumeroCuenta: state.generalInstrucciones.numeroCuenta,
          CLABE: state.generalInstrucciones.cuentaCLABE,
          Banco: state.generalInstrucciones.banco.Id,
          MunicipioOrganismoMandante:
            state.tablaTipoMovimientoInstrucciones[0].entidadFederativa
              .Descripcion, //// revisar
          TipoEntePublicoObligado:
            state.tablaTipoMovimientoInstrucciones[0].tipoEntePublicoObligado
              .Descripcion,
          MecanismoPago: "Instrucciones Irrevocables",
          TipoMovimiento: JSON.stringify(
            state.tablaTipoMovimientoInstrucciones
          ),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          //Municipio: state.generalInstrucciones.municipio,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalInstrucciones
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
        state.changeIdInstruccion(data.data.Id);
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
        state.changeIdInstruccion(data.data.Id);
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
          NumeroCuenta: state.generalInstrucciones.numeroCuenta,
          CLABE: state.generalInstrucciones.cuentaCLABE,
          MunicipioOrganismoMandante:
            state.tablaTipoMovimientoInstrucciones[0].entidadFederativa
              .Descripcion,
          TipoEntePublicoObligado:
            state.tablaTipoMovimientoInstrucciones[0].tipoEntePublicoObligado
              .Descripcion,
          MecanismoPago: "Instrucciones Irrevocables",
          TipoMovimiento: JSON.stringify(
            state.tablaTipoMovimientoInstrucciones
          ),
          AcumuladoEstado: acumuladoEstado,
          AcumuladoMunicipios: acumuladoMunicipio,
          AcumuladoOrganismos: acumuladoOrganismo,
          //Municipio: state.generalInstrucciones.municipio,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalInstrucciones
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
        state.changeIdInstruccion(data.result.Id);
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

  borrarInstruccion: async (Id: string) => {
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
        mecanismo: "Instrucciones Irrevocables",
        municipio: { Id: "", Descripcion: "" },
      },
      soporteDocumentalInstruccion: {
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
      tablaSoporteDocumentalInstrucciones: [],
    }));
  },
  cleanSoporteDocumentalInstruccion: () => {
    set(() => ({
      soporteDocumentalInstruccion: {
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
    }));
  },

  getInstruccion: (setState: Function) => {
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

  cleanTipoMovimientoInstruccion: () => {
    set(() => ({
      tipoMovimientoInstruccion: {
        id: "",
        altaDeudor: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        entidadFederativa: { Id: "", Descripcion: "" },
        //mandatario: { Id: "", Descripcion: "" },
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
      IdRegistroTabla: {
        id: "",
        altaDeudor: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        entidadFederativa: { Id: "", Descripcion: "" },
        //mandatario: { Id: "", Descripcion: "" },
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

  removeTipoMovimientoInstrucciones: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoInstrucciones:
        state.tablaTipoMovimientoInstrucciones.filter((_, i) => i !== index),
    }));
  },

  addPorcentaje: (tipoMovimientoInstrucciones: any) => {
    set((state) => ({
      tablaTipoMovimientoInstrucciones: tipoMovimientoInstrucciones,
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

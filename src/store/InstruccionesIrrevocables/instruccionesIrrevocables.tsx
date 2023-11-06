import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import Swal from "sweetalert2";
import { useInstruccionesStore } from "./main";
import { IDatosInstrucciones } from "../../screens/fuenteDePago/InstruccionesIrrevocables";

import { TipoMovimientoMandatoDeudor } from "../Mandatos/mandato";
import { useMandatoStore } from "../Mandatos/main";

export interface GeneralIntrucciones {
  numeroCuenta: string;
  cuentaCLABE: string;
  banco: { Id: string; Descripcion: string };
  mecanismo: string;
  municipio: { Id: string, Descripcion: string },
}

export interface TipoMovimientoInstrucciones {
  id: string,
  tipoEntePublicoObligado: { Id: string, Descripcion: string},
  altaDeudor:string,
  entidadFederativa: { Id: string, Descripcion:string },
  //mandatario: { Id: string, Descripcion: string},
  tipoFuente: { Id: string, Descripcion: string },
  fondoIngreso: { Id: string, Descripcion: string, TipoDeFuente: string },
  fondoIngresoGobiernoEstatal: string,
  fondoIngresoMunicipios: string,
  fondoIngresoAsignadoMunicipio: string,
  ingresoOrganismo: string,
  fondoIngresoAfectadoXGobiernoEstatal: string,
  afectacionGobiernoEstatalEntre100: string,
  acumuladoAfectacionGobiernoEstatalEntre100: string,
  fondoIngresoAfectadoXMunicipio: string,
  acumuladoAfectacionMunicipioEntreAsignadoMunicipio: string,
  ingresoAfectadoXOrganismo: string,
  acumuladoAfectacionOrganismoEntre100: string,
  
}

export interface Instruccion {
  Id: string;
  generalInstrucciones: GeneralIntrucciones;
  TipoMovimientoInstruccion: TipoMovimientoInstrucciones[];
}

export interface InstruccionesIrrevocablesSlice {
  idInstruccion: string;
  instruccionSelect: Instruccion[];
  setInstruccionSelect: (instruccion: Instruccion[]) => void;

  generalInstrucciones: GeneralIntrucciones;
  tipoMovimientoInstruccion: TipoMovimientoInstrucciones;

  tablaTipoMovimientoInstrucciones: TipoMovimientoInstrucciones[];
  tablaInstrucciones: IDatosInstrucciones[];

  changeIdInstruccion: (Id: string) => void;




  editarInstruccion: (
    tipoMovimientoInstruccion: TipoMovimientoInstrucciones[]
  ) => void;




  setGeneralInstruccion: (generalInstruccion: GeneralIntrucciones) => void;

  setTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: TipoMovimientoInstrucciones
  ) => void;

  addTipoMovimientoInstrucciones: (
    tipoMovimientoInstruccion: TipoMovimientoInstrucciones
  ) => void;

  removeTipoMovimientoInstrucciones: (index: number) => void;

  cleanTipoMovimientoInstruccion: (index: number) => void;

  addPorcentaje: (tipoMovimientoInstruccion: TipoMovimientoInstrucciones) =>  void;

  getInstruccion: (setState: Function) => void;
  createInstruccion: () => void;
  modificaInstruccion: () => void;
  borrarInstruccion:(Id: string) => void;


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
    mecanismo: "Intrucciones Irrevocables",
    municipio: { Id: "", Descripcion: "" },
  },

  tipoMovimientoInstruccion: {
    id: "",
    altaDeudor:"",
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

  tablaTipoMovimientoInstrucciones: [],
  tablaInstrucciones: [],

  setGeneralInstruccion: (generalInstrucciones: GeneralIntrucciones) => {
    set(() => ({
      generalInstrucciones: generalInstrucciones,
    }));
  },

  setTipoMovimientoInstrucciones: (tipoMovimientoInstrucciones: TipoMovimientoInstrucciones) => {
    set(() => ({
      tipoMovimientoInstruccion: tipoMovimientoInstrucciones,
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
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroCuenta: state.generalInstrucciones.numeroCuenta,
          CLABE: state.generalInstrucciones.cuentaCLABE,
          Banco: state.generalInstrucciones.banco.Id,
          TipoMovimiento: JSON.stringify(
            state.tablaTipoMovimientoInstrucciones
          ),
          //Municipio: state.generalInstrucciones.municipio,
          MecanismoPago: "Instrucciones Irrevocables",
          EntePublico: state.generalInstrucciones.municipio.Id,
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

  modificaInstruccion: async () => {
    const state = useInstruccionesStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-Instruccion",
        {
          Id: state.idInstruccion,
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroCuenta: state.generalInstrucciones.numeroCuenta,
          CLABE: state.generalInstrucciones.cuentaCLABE,
          Banco: state.generalInstrucciones.banco.Id,
          TipoMovimiento: JSON.stringify(
            state.tablaTipoMovimientoInstrucciones
          ),
          //Municipio: state.generalInstrucciones.municipio,
          MecanismoPago: state.generalInstrucciones.mecanismo,
          EntePublico: state.generalInstrucciones.municipio.Id,
          //EntePublico: localStorage.getItem("EntePublicoObligado"),
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
      .delete(
        process.env.REACT_APP_APPLICATION_BACK + "/api/delete-Instruccion",
        {
          data: {
            IdInstruccion: Id,
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
          title: "No se elimino la instrucción.",
        });
      });
    return false;
  },

  editarInstruccion: (tipoMovimientoInstrucciones: TipoMovimientoInstrucciones[]) => {
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
        mecanismo: "Instrucciones Irrevocables",
        municipio: { Id: "", Descripcion: "" },
      },
      tablaTipoMovimientoInstrucciones: []
    }));
  },

  getInstruccion: (setState: Function) => {
    const state = useInstruccionesStore.getState()
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-Instrucciones", {
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
        altaDeudor:"",
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

  saveFilesInstruccion(idRegistro, ruta, archivo) { },

  savePathDocInstruccion(
    idInstruccion,
    Ruta,
    NombreIdentificador,
    NombreArchivo
  ) { },

  arrDocs: [],

  setArrDocs(arr) { },
});

import axios from "axios";
import { StateCreator } from "zustand";
import { IFondoOIngreso } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { IDatosFideicomiso } from "../../screens/fuenteDePago/Fideicomisos";
import { useFideicomisoStore } from "./main";
import Swal from "sweetalert2";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export interface IDatosGeneralesFideicomiso {
  numeroFideicomiso: string;
  fechaFideicomiso: Date;
  tipoFideicomiso: { Id: string; Descripcion: string };
  fiduciario: { Id: string; Descripcion: string };
}

export interface IFideicomisario {
  fideicomisario: { Id: string; Descripcion: string };
  ordenFideicomisario: { Id: string; Descripcion: string };
}

export interface IDeudorFideicomisoNew {
  id: string;
  tipoFideicomitente: { Id: string; Descripcion: string };
  fideicomitente: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string; TipoDeFuente: string };

  AfectadoTotalIngreso: number;
  // SumAfectadoTotalIngreso: number;

  EquivalenciaCorrespondienteMunicipios: number;
  // SumEquivalenciaCorrespondienteMunicipios:number
}

export interface IPorcentajeAcumulados {
  IdTipoEntePublicoObligado: string;
  IdEntePublicoObligado: string;
  NombreEntePublico: string;
  AfectadoTotalIngreso: number;
  EquivalenciaCorrespondienteMunicipios: number;
}

export interface IDeudorFideicomiso {
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



export interface IBeneficiarioFideicomiso {
  tipoBeneficiario: { Id: string; Descripcion: string };
  beneficiario: { Id: string; Descripcion: string };
  fechaAlta: Date;
}

export interface ISoporteDocumentalFideicomiso {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: Date;
}

export type IFideicomiso = {
  id: string;
  datosGenerales: IDatosGeneralesFideicomiso;
  tipoMovimientoFideicomiso: IDeudorFideicomiso[];
  soporteDocumental: ISoporteDocumentalFideicomiso;
};

export interface FideicomisoSlice {
  tablaFideicomisos: IDatosFideicomiso[];

  idFideicomiso: string;
  setIdFideicomiso: (Id: string) => void;

  sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  };

  datosGenerales: IDatosGeneralesFideicomiso;

  fideicomisario: IFideicomisario;
  tablaFideicomisario: IFideicomisario[];

  tipoMovimientoFideicomiso: IDeudorFideicomiso;
  tablaTipoMovimientoFideicomiso: IDeudorFideicomiso[];

  beneficiario: IBeneficiarioFideicomiso;

  idTipoMovimientoSelect: string;
  setIdTipoMovimientoSelect: (id: string) => void;

  soporteDocumentalFideicomiso: ISoporteDocumentalFideicomiso;
  tablaSoporteDocumentalFideicomiso: ISoporteDocumentalFideicomiso[];

  cleanFideicomiso: () => void;

  editarFideicomiso: (
    id: string,
    datosGenerales: IDatosGeneralesFideicomiso,
    fideicomisario: IFideicomisario[],
    tipoMovimiento: IDeudorFideicomiso[],
    soporteDocumental: ISoporteDocumentalFideicomiso[]
  ) => void;

  setDatosGenerales: (datosGenerales: IDatosGeneralesFideicomiso) => void;
  setFideicomisario: (fideicomisario: IFideicomisario) => void;
  setTipoMovimiento: (tipoMovimiento: IDeudorFideicomiso) => void;
  setBeneficiario: (beneficiario: IBeneficiarioFideicomiso) => void;
  setSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalFideicomiso
  ) => void;

  addFideicomisario: (fideicomisario: IFideicomisario) => void;
  addTipoMovimiento: (tipoMovimiento: IDeudorFideicomiso) => void;
  addSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalFideicomiso
  ) => void;

  removeFideicomisario: (index: number) => void;
  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  addPorcentaje: (tipoMovimiento: IDeudorFideicomiso) => void;

  cleanFideicomisario: () => void;
  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getFideicomisos: (setState: Function) => void;
  createFideicomiso: (stateOpen: Function) => void;
  modificaFideicomiso: (setLoading: Function) => void;
  deleteFideicomiso: (Id: string) => void;

  createPorcentajesAcumulados: (stateOpen: Function) => void;
  DetallePorcentajesAcumulados: (IdEntePublicoObligado: string) => void;

  saveFilesFideicomiso: (
    idRegistro: string,
    ruta: string,
    //setLoading: Function,
    archivo: File
  ) => void;

  savePathDocFideicomiso: (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string,
    //setLoading: Function
  ) => void;

  catalogoTiposDeFideicomiso: ICatalogo[];
  catalogoFiduciarios: ICatalogo[];
  catalogoFideicomisarios: ICatalogo[];
  catalogoOrdenesFideicomisario: ICatalogo[];
  catalogoTiposDeFideicomitente: ICatalogo[];
  catalogoTiposDeFuente: ICatalogo[];
  catalogoFondosOIngresos: IFondoOIngreso[];

  getSumaPorcentajeAcumulado: (tabla: string) => void;
  getTiposFideicomiso: () => void;
  getFiduciarios: () => void;
  getFideicomisarios: () => void;
  getOrdenesFideicomisario: () => void;
  getTiposDeFideicomitente: () => void;
  getTiposDeFuente: () => void;
  getFondosOIngresos: () => void;

  tipoMovimientoFideicomisoNew: IDeudorFideicomisoNew;
  tablaTipoMovimientoFideicomisoNew: IDeudorFideicomisoNew[];
  setTipoMovimientoNew: (tipoMovimientoNew: IDeudorFideicomisoNew) => void;
  addTipoMovimientoNew: (tipoMovimientoNew: IDeudorFideicomisoNew) => void;
  removeTipoMovimientoNew: (index: number) => void;
  cleanTipoMovimientoNew: () => void;

  editarFideicomisoNew: (
    id: string,
    datosGenerales: IDatosGeneralesFideicomiso,
    fideicomisario: IFideicomisario[],
    tipoMovimientoFideicomisoNew: IDeudorFideicomisoNew[],
    soporteDocumental: ISoporteDocumentalFideicomiso[]
  ) => void;

  cleanFideicomisoNew: () => void;

  updateTipoMovimientoField: (
    index: number,
    field: keyof Pick<IDeudorFideicomisoNew, 'AfectadoTotalIngreso' | 'EquivalenciaCorrespondienteMunicipios'>,
    value: number
  ) => void;

  porcentajeAcumuladoRegistros: IPorcentajeAcumulados
  setPorcentajeAcumulado: (IPorcentajeAcumulados: IPorcentajeAcumulados) => void;

  arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[];
  addArregloPorcetajesAcumuladosRegistros: (arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados) => void;

  beneficiarioNew: IBeneficiarioFideicomiso;
  setBeneficiarioNew: (beneficiarioNew: IBeneficiarioFideicomiso) => void;
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

  sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: 0,
    SumaAcumuladoMunicipios: 0,
    SumaAcumuladoOrganismos: 0,
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

  //NUEVO FORMATO DE TIPO DE MOVIMIENTO DE FIDEICOMISO

  tipoMovimientoFideicomisoNew: {
    id: "",
    tipoFideicomitente: { Id: "", Descripcion: "" },
    fideicomitente: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
    AfectadoTotalIngreso: 0,
    // SumAfectadoTotalIngreso: 0,
    EquivalenciaCorrespondienteMunicipios: 0,
    // SumEquivalenciaCorrespondienteMunicipios: 0,
  },

  beneficiarioNew: {
    tipoBeneficiario: { Id: "", Descripcion: "" },
    beneficiario: { Id: "", Descripcion: "" },
    fechaAlta: new Date(),
  },

  porcentajeAcumuladoRegistros: {
    IdEntePublicoObligado: "",
    IdTipoEntePublicoObligado: "",
    NombreEntePublico: "",
    AfectadoTotalIngreso: 0.0,
    EquivalenciaCorrespondienteMunicipios: 0.0,
  },

  setPorcentajeAcumulado: (porcentajeAcumuladoRegistros: IPorcentajeAcumulados) => {
    set((state) => ({
      porcentajeAcumuladoRegistros: porcentajeAcumuladoRegistros,
    }));
  },

  arregloPorcetajesAcumuladosRegistros: [],

  addArregloPorcetajesAcumuladosRegistros: (arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados) => {
    set((state) => ({
      arregloPorcetajesAcumuladosRegistros: [
        ...state.arregloPorcetajesAcumuladosRegistros,
        arregloPorcetajesAcumuladosRegistros,
      ],
    }));
  },
  tablaTipoMovimientoFideicomisoNew: [],

  setBeneficiarioNew: (beneficiarioNew: IBeneficiarioFideicomiso) => {
    set(() => ({
      beneficiarioNew: beneficiarioNew,
    }));
  },
  setTipoMovimientoNew: (tipoMovimientoNew: IDeudorFideicomisoNew) => {
    set(() => ({
      tipoMovimientoFideicomisoNew: tipoMovimientoNew,
    }));
  },

  addTipoMovimientoNew: (tipoMovimientoNew: IDeudorFideicomisoNew) => {
    set((state) => ({
      tablaTipoMovimientoFideicomisoNew: [
        ...state.tablaTipoMovimientoFideicomisoNew,
        tipoMovimientoNew,
      ],
    }));
  },

  removeTipoMovimientoNew: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoFideicomisoNew:
        state.tablaTipoMovimientoFideicomisoNew.filter((_, i) => i !== index),
    }));
  },
  cleanTipoMovimientoNew: () => {
    set(() => ({
      tipoMovimientoFideicomisoNew: {
        id: "",
        tipoFideicomitente: { Id: "", Descripcion: "" },
        fideicomitente: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        AfectadoTotalIngreso: 0,
        //SumAfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0,
        //SumEquivalenciaCorrespondienteMunicipios: 0,
      },
    }));
  },

  updateTipoMovimientoField: (index, field, value) => {
    set((state) => {
      const updatedTabla = state.tablaTipoMovimientoFideicomisoNew.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );
      return { tablaTipoMovimientoFideicomisoNew: updatedTabla };
    });
  },


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

  cleanFideicomisoNew: () => {
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

      tipoMovimientoFideicomisoNew: {
        id: "",
        tipoFideicomitente: { Id: "", Descripcion: "" },
        fideicomitente: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        AfectadoTotalIngreso: 0,
        // SumAfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0,
        // SumEquivalenciaCorrespondienteMunicipios: 0,
      },
      tablaTipoMovimientoFideicomisoNew: [],

      soporteDocumentalFideicomiso: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date(),
      },
      tablaSoporteDocumentalFideicomiso: [],
    }));
  },

  editarFideicomisoNew: (
    id: string,
    datosGenerales: IDatosGeneralesFideicomiso,
    fideicomisario: IFideicomisario[],
    tipoMovimientoFideicomisoNew: IDeudorFideicomisoNew[],
    soporteDocumental: ISoporteDocumentalFideicomiso[]
  ) => {
    set(() => ({
      idFideicomiso: id,
      datosGenerales: datosGenerales,
      tablaFideicomisario: fideicomisario,
      tablaTipoMovimientoFideicomisoNew: tipoMovimientoFideicomisoNew,
      tablaSoporteDocumentalFideicomiso: soporteDocumental,
    }));
  },

  editarFideicomiso: (
    id: string,
    datosGenerales: IDatosGeneralesFideicomiso,
    fideicomisario: IFideicomisario[],
    tipoMovimiento: IDeudorFideicomiso[],
    soporteDocumental: ISoporteDocumentalFideicomiso[]
  ) => {
    set(() => ({
      idFideicomiso: id,
      datosGenerales: datosGenerales,
      tablaFideicomisario: fideicomisario,
      tablaTipoMovimientoFideicomiso: tipoMovimiento,
      tablaSoporteDocumentalFideicomiso: soporteDocumental,
    }));
  },

  setDatosGenerales: (datosGenerales: IDatosGeneralesFideicomiso) => {
    set(() => ({
      datosGenerales: datosGenerales,
    }));
  },
  setFideicomisario: (fideicomisario: IFideicomisario) => {
    set(() => ({
      fideicomisario: fideicomisario,
    }));
  },
  setTipoMovimiento: (tipoMovimiento: IDeudorFideicomiso) => {
    set(() => ({
      tipoMovimientoFideicomiso: tipoMovimiento,
    }));
  },
  setBeneficiario: (beneficiario: IBeneficiarioFideicomiso) => {
    set(() => ({
      beneficiario: beneficiario,
    }));
  },
  setSoporteDocumental: (soporteDocumental: ISoporteDocumentalFideicomiso) => {
    set(() => ({
      soporteDocumentalFideicomiso: soporteDocumental,
    }));
  },

  addFideicomisario: (fideicomisario: IFideicomisario) => {
    set((state) => ({
      tablaFideicomisario: [...state.tablaFideicomisario, fideicomisario],
    }));
  },
  addTipoMovimiento: (tipoMovimiento: IDeudorFideicomiso) => {
    set((state) => ({
      tablaTipoMovimientoFideicomiso: [
        ...state.tablaTipoMovimientoFideicomiso,
        tipoMovimiento,
      ],
    }));
  },

  addSoporteDocumental: (soporteDocumental: ISoporteDocumentalFideicomiso) => {
    set((state) => ({
      tablaSoporteDocumentalFideicomiso: [...state.tablaSoporteDocumentalFideicomiso, soporteDocumental,],
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
  DetallePorcentajesAcumulados: (IdEntePublicoObligado: string
    //setMensaje: Function
  ) => {
    const state = useFideicomisoStore.getState();
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/get-PorcentajesAcumulados",
        {
          params: {
            IdEntePublicoObligado,
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        if (data.mensaje) {
          console.log("MENSAJE DEL BACKEND:", data.mensaje);
          //setMensaje(data.mensaje); // puedes mostrarlo en pantalla
          //state.setPorcentajeAcumulado(); // limpia
        } else {
          console.log("PORCENTAJE ACUMULADO", data.data);
          state.setPorcentajeAcumulado(data.data);
          // setMensaje(""); // limpia mensaje
        }
      })
      .catch((err) => {
        console.error("Error al obtener porcentaje:", err);
        //setMensaje("Error al obtener información del servidor.");
      });
  },
  createPorcentajesAcumulados: async (stateOpen: Function) => {
    const state = useFideicomisoStore.getState();

    const peticiones = state.tablaTipoMovimientoFideicomisoNew.map((item) => {

      console.log("ITEM", item)
      return axios.post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-PorcentajesAcumulados",
        {
          IdTipoEntePublicoObligado: item.tipoFideicomitente.Id,
          IdEntePublicoObligado: item.fideicomitente.Id,
          NombreEntePublico: item.fideicomitente.Descripcion,
          AfectadoTotalIngreso: item.AfectadoTotalIngreso,
          EquivalenciaCorrespondienteMunicipios: item.EquivalenciaCorrespondienteMunicipios || 0.0,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      ).then(({ data }) => {
        console.log("DATA CREADA PORCENTAJE ACUMULADO", data?.data);
        return data;
      }).catch((error) => {
        console.log("data?.data", error?.data)
        console.error("ERROR DATA", error?.response?.data || error.message);
        throw error; // Esto es importante para que Promise.all detecte errores
      });
    });

    try {
      await Promise.all(peticiones); // Espera que todas las peticiones terminen
      console.log("✅ Todos los porcentajes acumulados fueron creados");
      state.createFideicomiso(stateOpen); // Ahora sí lo puedes ejecutar
    } catch (error) {
      console.error("❌ Error al crear uno o más porcentajes acumulados:", error);
      // Puedes mostrar un mensaje al usuario si quieres
    }
  },



  // createPorcentajeAcumualdo: async (stateOpen: Function) => {
  //   const state = useFideicomisoStore.getState();
  //   //const stateSaveFiles = useCortoPlazoStore.getState();
  //   console.log("TABLA NEW tipo de fidicomiso", state.tablaTipoMovimientoFideicomisoNew)
  //   return await state.tablaTipoMovimientoFideicomisoNew.map((v: any, index: number) => {
  //     return setTimeout(() => {

  //       if (state.tablaTipoMovimientoFideicomisoNew.length !== 0) {
  //         return axios.post(process.env.REACT_APP_APPLICATION_BACK + "/create-PorcentajesAcumulados",
  //           {
  //             IdTipoEntePublicoObligado: state.tablaTipoMovimientoFideicomisoNew[index].tipoFideicomitente.Id,
  //             IdEntePublicoObligado: state.tablaTipoMovimientoFideicomisoNew[index].fideicomitente.Id,
  //             NombreFideicomitente: state.tablaTipoMovimientoFideicomisoNew[index].fideicomitente.Descripcion,
  //             AfectadoTotalIngreso: state.tablaTipoMovimientoFideicomisoNew[index].AfectadoTotalIngreso,
  //             EquivalenciaCorrespondienteMunicipios: state.tablaTipoMovimientoFideicomisoNew[index].EquivalenciaCorrespondienteMunicipios,
  //             // CreadoPor: localStorage.getItem("IdUsuario"),
  //           },
  //           {
  //             headers: {
  //               Authorization: localStorage.getItem("jwtToken"),
  //             },
  //           }
  //         ).then(({ data }) => {

  //           state.createFideicomiso(stateOpen)
  //           console.log("DATA CREADA PORCENTAJE ACUMULADO", data.data);
  //         })
  //           .catch((data) => {
  //             console.log("ERROR DATA", data.data);
  //           });
  //       }

  //     }, 2000)
  //   })

  //   // await axios
  //   //   .post(
  //   //     process.env.REACT_APP_APPLICATION_BACK + "/create-PorcentajesAcumulados",
  //   //     {
  //   //       IdTipoEntePublicoObligado: state.datosGenerales.numeroFideicomiso,
  //   //       IdEntePublicoObligado: state.datosGenerales.fechaFideicomiso,
  //   //       NombreFideicomitente: state.datosGenerales.tipoFideicomiso.Descripcion,
  //   //       AfectadoTotalIngreso: state.datosGenerales.fiduciario.Descripcion,
  //   //       EquivalenciaCorrespondienteMunicipios: JSON.stringify(state.tablaFideicomisario),
  //   //       // CreadoPor: localStorage.getItem("IdUsuario"),
  //   //     },
  //   //     {
  //   //       headers: {
  //   //         Authorization: localStorage.getItem("jwtToken"),
  //   //       },
  //   //     }
  //   //   )
  //   //   .then(({ data }) => {
  //   //     //console.log("DATA CREADA PORCENTAJE ACUMULADO", data.data);


  //   //   })
  //   //   .catch((data) => {
  //   //     //console.log("ERROR DATA", data);

  //   //   });
  // },

  createFideicomiso: async (stateOpen: Function) => {
    const state = useFideicomisoStore.getState();
    const stateSaveFiles = useCortoPlazoStore.getState();

    // let acumuladoEstado = 0;
    // let acumuladoMunicipio = 0;
    // let acumuladoOrganismo = 0;

    // eslint-disable-next-line array-callback-return
    // state.tablaTipoMovimientoFideicomisoNew.map((v: any, index: number) => {
    //   acumuladoEstado += parseFloat(
    //     v.fondoIngresoAfectadoXGobiernoEstatal || 0
    //   );
    //   acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
    //   acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    // });

    console.log("TABLA NEW tipo de fidicomiso", state.tablaTipoMovimientoFideicomisoNew)

    const tipoMovimeintoNew = state.tablaTipoMovimientoFideicomisoNew.map(({
      id,
      tipoFideicomitente,
      fideicomitente,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios
    }) => ({
      id,
      tipoFideicomitente,
      fideicomitente,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios
    })
    );

    // Calcula la suma de AfectadoTotalIngreso
    const SumAfectadoTotalIngreso = state.tablaTipoMovimientoFideicomisoNew.reduce(
      (acumulador, item) => acumulador + (item.AfectadoTotalIngreso || 0), 0
    );

    // Calcula la suma de EquivalenciaCorrespondienteMunicipios
    const SumEquivalenciaCorrespondienteMunicipios = state.tablaTipoMovimientoFideicomisoNew.reduce(
      (acumulador, item) => acumulador + (item.EquivalenciaCorrespondienteMunicipios || 0), 0
    );

    setTimeout(() => {
      console.log("SUMA AfectadoTotalIngreso", SumAfectadoTotalIngreso);
      console.log("SUMA EquivalenciaCorrespondienteMunicipios", SumEquivalenciaCorrespondienteMunicipios);
    }, 2000);


    const soporteDocumentalPrueba = state.tablaSoporteDocumentalFideicomiso.map(({
      tipo, archivo, nombreArchivo, fechaArchivo }) => ({
        tipo,
        archivo,
        nombreArchivo,
        fechaArchivo,
      })
    );


    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/create-fideicomiso",
        {
          NumeroFideicomiso: state.datosGenerales.numeroFideicomiso,
          FechaFideicomiso: state.datosGenerales.fechaFideicomiso,
          TipoFideicomiso: state.datosGenerales.tipoFideicomiso.Descripcion,
          Fiduciario: state.datosGenerales.fiduciario.Descripcion,

          Fideicomisario: JSON.stringify(state.tablaFideicomisario),
          TipoMovimiento: JSON.stringify(tipoMovimeintoNew),

          SumAfectadoTotalIngreso: SumAfectadoTotalIngreso,
          SumEquivalenciaCorrespondienteMunicipios: SumEquivalenciaCorrespondienteMunicipios,


          // AcumuladoEstado: acumuladoEstado,
          // AcumuladoMunicipios: acumuladoMunicipio,
          // AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            soporteDocumentalPrueba
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
        //const stateNew = useCortoPlazoStore.getState();
        //state.createPorcentajeAcumualdo();
        state.setIdFideicomiso(data.data.Id);
        console.log("ID FIDEICOMISO", state.idFideicomiso);

        stateSaveFiles.saveFilesFuentesPago(
          data.data.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/FIDEICOMISOS/${data.data.Id}`
        );

        stateOpen(false);

        // if(state.idFideicomiso === "" || state.idFideicomiso === undefined){
        //   state.saveFilesFideicomiso(
        //     state.idFideicomiso,
        //     //data.result.Id,
        //     process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/FIDEICOMISOS/${data.result.Id}`,
        //     //`/SRPU/FIDEICOMISOS/${data.result.Id}`,
        //     //setLoading,
        //     new File([data.data], "PRUEBA DE FIDEICOMISO.pdf")
        //   );

        // }



        // state.saveFilesFideicomiso(
        //   data.data.Id,
        //   `/SRPU/FIDEICOMISOS/${data.data.Id}`,
        //   setLoading
        // );

        // Swal.fire({
        //   confirmButtonColor: "#15212f",
        //   cancelButtonColor: "rgb(175, 140, 85)",
        //   icon: "success",
        //   title: "Éxito",
        //   text: "El mandato se ha creado exitosamente",
        // });
      })
      .catch((data) => {
        console.log("ERROR DATA", data);
        // Swal.fire({
        //   confirmButtonColor: "#15212f",
        //   cancelButtonColor: "rgb(175, 140, 85)",
        //   icon: "error",
        //   title: "Mensaje",
        //   text: "Ha sucedido un error, inténtelo de nuevo",
        // });
      });
  },

  modificaFideicomiso: async (setLoading: Function) => {
    const state = useFideicomisoStore.getState();
    const cpState = useCortoPlazoStore.getState();

    // let acumuladoEstado = 0;
    // let acumuladoMunicipio = 0;
    // let acumuladoOrganismo = 0;

    // // eslint-disable-next-line array-callback-return
    // state.tablaTipoMovimientoFideicomiso.map((v: any, index: number) => {
    //   acumuladoEstado += parseFloat(
    //     v.fondoIngresoAfectadoXGobiernoEstatal || 0
    //   );
    //   acumuladoMunicipio += parseFloat(v.fondoIngresoAfectadoXMunicipio || 0);
    //   acumuladoOrganismo += parseFloat(v.ingresoAfectadoXOrganismo || 0);
    // });

    console.log("TABLA NEW tipo de fidicomiso", state.tablaTipoMovimientoFideicomisoNew)

    const tipoMovimeintoNew = state.tablaTipoMovimientoFideicomisoNew.map(({
      id,
      tipoFideicomitente,
      fideicomitente,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios
    }) => ({
      id,
      tipoFideicomitente,
      fideicomitente,
      tipoFuente,
      fondoIngreso,
      AfectadoTotalIngreso,
      EquivalenciaCorrespondienteMunicipios
    })
    );

    // Calcula la suma de AfectadoTotalIngreso
    const SumAfectadoTotalIngreso = state.tablaTipoMovimientoFideicomisoNew.reduce(
      (acumulador, item) => acumulador + (item.AfectadoTotalIngreso || 0), 0
    );

    // Calcula la suma de EquivalenciaCorrespondienteMunicipios
    const SumEquivalenciaCorrespondienteMunicipios = state.tablaTipoMovimientoFideicomisoNew.reduce(
      (acumulador, item) => acumulador + (item.EquivalenciaCorrespondienteMunicipios || 0), 0
    );

    setTimeout(() => {
      console.log("SUMA AfectadoTotalIngreso", SumAfectadoTotalIngreso);
      console.log("SUMA EquivalenciaCorrespondienteMunicipios", SumEquivalenciaCorrespondienteMunicipios);
    }, 2000);

    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/modify-fideicomiso",
        {
          IdFideicomiso: state.idFideicomiso,
          FechaFideicomiso: state.datosGenerales.fechaFideicomiso,
          TipoFideicomiso: state.datosGenerales.tipoFideicomiso.Descripcion,
          Fiduciario: state.datosGenerales.fiduciario.Descripcion,

          Fideicomisario: JSON.stringify(state.tablaFideicomisario),
          TipoMovimiento: JSON.stringify(tipoMovimeintoNew),

          SumAfectadoTotalIngreso: SumAfectadoTotalIngreso,
          SumEquivalenciaCorrespondienteMunicipios: SumEquivalenciaCorrespondienteMunicipios,


          // AcumuladoEstado: acumuladoEstado,
          // AcumuladoMunicipios: acumuladoMunicipio,
          // AcumuladoOrganismos: acumuladoOrganismo,
          SoporteDocumental: JSON.stringify(
            state.tablaSoporteDocumentalFideicomiso
          ),
          ModificadoPor: localStorage.getItem("IdUsuario"),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        console.log("DATA FIDEICOMISO", data);

        state.setIdFideicomiso(data.data.Id);
        state.saveFilesFideicomiso(
          data.result.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/FIDEICOMISOS/${data.result.Id}`,
          //`/SRPU/FIDEICOMISOS/${data.result.Id}`,
          //setLoading,
          new File([data.data], "PRUEBA DE FIDEICOMISO.pdf")
        );
        // Swal.fire({
        //   confirmButtonColor: "#15212f",
        //   cancelButtonColor: "rgb(175, 140, 85)",
        //   icon: "success",
        //   title: "Éxito",
        //   text: "El fideicomiso se ha modificado exitosamente",
        // });
      })
      .catch(function (error) {
        // Swal.fire({
        //   confirmButtonColor: "#15212f",
        //   cancelButtonColor: "rgb(175, 140, 85)",
        //   icon: "error",
        //   title: "Se encontró un error, verifique la información.",
        // });
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

  saveFilesFideicomiso: async (
    idRegistro: string,
    ruta: string,
    //setLoading: Function,
    archivo: File,
  ) => {
    const state = useFideicomisoStore.getState();

    return await state.tablaSoporteDocumentalFideicomiso.map((dato, index) => {
      return setTimeout(() => {
        //const url = new File([dato.archivo], dato.nombreArchivo);

        let dataArray = new FormData();
        dataArray.append("ROUTE", `${ruta}`);
        dataArray.append("ADDROUTE", "true");
        dataArray.append("FILE", archivo);

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
              console.log("DATA guardarDocumentosFideicomisos", data);
              state.savePathDocFideicomiso(
                idRegistro,
                data.RESPONSE.RUTA,
                data.RESPONSE.NOMBREIDENTIFICADOR,
                data.RESPONSE.NOMBREARCHIVO,
                //setLoading
              );
            })
            .catch((e) => { });
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
    nombreArchivo: string,
    //setLoading: Function
  ) => {
    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
        "/create-addPathDocFideicomiso",
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
      .then((r) => {
        console.log("r ENTRO: ", r.data);
        //setLoading(false);
      })
      .catch((e) => { });
  },

  catalogoTiposDeFideicomiso: [],
  catalogoFiduciarios: [],
  catalogoFideicomisarios: [],
  catalogoOrdenesFideicomisario: [],
  catalogoTiposDeFideicomitente: [],
  catalogoTiposDeFuente: [],
  catalogoFondosOIngresos: [],

  getSumaPorcentajeAcumulado: async (tabla: string) => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/sumaPorcentajeAcumulado",
        {
          params: { tabla: tabla },
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;

        set((state) => ({
          sumaPorcentajeAcumulado: r,
        }));
      });
  },

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

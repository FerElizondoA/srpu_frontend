import axios from "axios";
import { StateCreator } from "zustand";
import { IFondoOIngreso } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { ICatalogo } from "../../screens/Config/Catalogos";
import { IDatosFideicomiso } from "../../screens/fuenteDePago/Fideicomisos";
import { useFideicomisoStore } from "./main";
import Swal from "sweetalert2";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { alertaInfo } from "../../avisosPAUA/componentes/Alertas";

export interface ICombinaciones {
  IdEntePublicoObligado: string,
  IdFondoOIngreso: string
}

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


export interface IPorcentajeAcumulados {
  IdTipoEntePublicoObligado: string;
  IdEntePublicoObligado: string;
  NombreEntePublico: string;
  IdFondoOIngreso: string;
  NombreFondoOIngreso: string;
  AfectadoTotalIngreso: number;
  EquivalenciaCorrespondienteMunicipios: number;
}
export interface IDeudorFideicomisoNew {
  id: string;
  Clasificacion: { Id: string, Descripcion: string }
  tipoFideicomitente: { Id: string; Descripcion: string };
  fideicomitente: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string; TipoDeFuente: string };

  AfectadoTotalIngreso: number;
  // SumAfectadoTotalIngreso: number;

  EquivalenciaCorrespondienteMunicipios: number;
  // SumEquivalenciaCorrespondienteMunicipios:number
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

// export interface ISoporteDocumentalFideicomiso {
export interface ISoporteDocumentalFuentePago {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: Date;
}

export type IFideicomiso = {
  id: string;
  datosGenerales: IDatosGeneralesFideicomiso;
  tipoMovimientoFideicomiso: IDeudorFideicomiso[];
  soporteDocumental: ISoporteDocumentalFuentePago;
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

  soporteDocumentalFideicomiso: ISoporteDocumentalFuentePago;
  tablaSoporteDocumentalFideicomiso: ISoporteDocumentalFuentePago[];

  cleanFideicomiso: () => void;

  editarFideicomiso: (
    id: string,
    datosGenerales: IDatosGeneralesFideicomiso,
    fideicomisario: IFideicomisario[],
    tipoMovimiento: IDeudorFideicomiso[],
    soporteDocumental: ISoporteDocumentalFuentePago[]
  ) => void;

  setDatosGenerales: (datosGenerales: IDatosGeneralesFideicomiso) => void;
  setFideicomisario: (fideicomisario: IFideicomisario) => void;
  setTipoMovimiento: (tipoMovimiento: IDeudorFideicomiso) => void;
  setBeneficiario: (beneficiario: IBeneficiarioFideicomiso) => void;
  setSoporteDocumental: (
    soporteDocumental: any
  ) => void;

  addFideicomisario: (fideicomisario: IFideicomisario) => void;
  addTipoMovimiento: (tipoMovimiento: IDeudorFideicomiso) => void;
  addSoporteDocumental: (
    soporteDocumental: ISoporteDocumentalFuentePago
  ) => void;

  removeFideicomisario: (index: number) => void;
  removeTipoMovimiento: (index: number) => void;
  removeSoporteDocumental: (index: number) => void;

  addPorcentaje: (tipoMovimiento: IDeudorFideicomiso) => void;

  cleanFideicomisario: () => void;
  cleanTipoMovimiento: () => void;
  cleanSoporteDocumental: () => void;

  getFideicomisos: (setState: Function) => void;
  createFideicomiso: (stateOpen: Function, setLoading: Function) => void;
  modificaFideicomiso: (setLoading: Function) => void;
  deleteFideicomiso: (Id: string) => void;


  saveFilesFideicomiso: (
    idRegistro: string,
    ruta: string,
    setLoading: Function,
    archivo: File
  ) => void;

  savePathDocFuentePago: (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string,
    setLoading: Function,
    NombreTipoFuentePago: string,
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
    soporteDocumental: ISoporteDocumentalFuentePago[]
  ) => void;

  cleanFideicomisoNew: () => void;

  updateTipoMovimientoField: (
    index: number,
    field: keyof Pick<IDeudorFideicomisoNew, 'AfectadoTotalIngreso' | 'EquivalenciaCorrespondienteMunicipios'>,
    value: number
  ) => void;


  createPorcentajesAcumulados: (stateOpen: Function) => void;
  modificaPorcentajesAcumulados: (stateOpen: Function) => void;

  /*Busca individualmente el porcentaje acumulado de un ente publico obligado y su 
  fondo o ingreso cuando se esta llenando En tipo de movimiento del fideicomiso*/
  DetallePorcentajesAcumulados: (IdEntePublicoObligado: string, IdFondoIngreso: string) => void;

  /*Busca multiples porcentajes acumulados en la base de datos por el 
  ente publico obligado y fondo o ingreso  Pero desde el momento al querer editar busca 
  cada uno de ellos y se trae todos los porcentajes acumulados anexados al registro*/
  DetallePorcentajesAcumuladosMultiples: (combinaciones: ICombinaciones[]) => void;

  //Aqui se guardan individualmente cada ente publico con su fondo o ingreso respectivo
  //Pero no lo guarda en el array hasta que le da a agregar a la tabla tipo de movimiento 
  porcentajeAcumuladoRegistros: IPorcentajeAcumulados
  setPorcentajeAcumulado: (porcentajeAcumuladoRegistros: IPorcentajeAcumulados) => void;

  //Aqui es donde se guarda el arreglo de todos los porcentajes acumulados que vaya agregando
  //a la tabla de tipo de movimiento y verificara cuando se finalice o edite el fideicomiso 
  arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados[];
  addArregloPorcetajesAcumuladosRegistros: (arregloPorcetajesAcumuladosRegistros: IPorcentajeAcumulados) => void;

  cleanPorcentajesAcumulados: () => void;
  /*Esta tabla sera la copia fija  antes de editar un fideicomiso para luego hacer la comparativa 
  con la originalY la edicion */
  TablaPruebaEditarFideicomiso: IPorcentajeAcumulados[];
  setTablaPruebaEditarFideicomiso: (TablaPruebaEditarFideicomiso: IPorcentajeAcumulados) => void;

  beneficiarioNew: IBeneficiarioFideicomiso;
  setBeneficiarioNew: (beneficiarioNew: IBeneficiarioFideicomiso) => void;

  DetalleAsignacionTipoMoviSolicitudes: (Id: string, state: Function) => void
}

export const createFideicomisoSlice: StateCreator<FideicomisoSlice> = (
  set,
  get
) => ({
  TablaPruebaEditarFideicomiso: [],

  setTablaPruebaEditarFideicomiso: (
    TablaPruebaEditarFideicomiso: IPorcentajeAcumulados) => {
    set((state) => ({
      TablaPruebaEditarFideicomiso: [
        ...state.TablaPruebaEditarFideicomiso,
        TablaPruebaEditarFideicomiso,
      ],
    }));
  },
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
    Clasificacion: { Id: "", Descripcion: "" },
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
    IdFondoOIngreso: "",
    NombreFondoOIngreso: "",
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
        Clasificacion: { Id: "", Descripcion: "" },
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
        Clasificacion: { Id: "", Descripcion: "" },
        tipoFideicomitente: { Id: "", Descripcion: "" },
        fideicomitente: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "", TipoDeFuente: "" },
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0,
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
    soporteDocumental: ISoporteDocumentalFuentePago[]
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
    soporteDocumental: ISoporteDocumentalFuentePago[]
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
  setSoporteDocumental: (soporteDocumental: ISoporteDocumentalFuentePago) => {
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

  addSoporteDocumental: (soporteDocumental: ISoporteDocumentalFuentePago) => {


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

  DetallePorcentajesAcumulados: (IdEntePublicoObligado: string, IdFondoOIngreso: string
    //setMensaje: Function
  ) => {
    const state = useFideicomisoStore.getState();
    axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/get-PorcentajesAcumulados",
        {
          params: {
            IdEntePublicoObligado,
            IdFondoOIngreso
          },
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        // 2* Muestra si tiene un mensaje el backend de que si existe o no un porcentaje acumulado 
        // 2* Si es asi, lo trae y lo guarda sino solo muestra en la consola el mensaje
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

  DetallePorcentajesAcumuladosMultiples: (combinaciones: ICombinaciones[]) => {
    const state = useFideicomisoStore.getState();

    axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/get-PorcentajesAcumuladosMultiples",
        { combinaciones }, // se manda como body, no como params
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        if (data.data) {
          console.log("✅ Datos múltiples obtenidos:", data.data);
          state.addArregloPorcetajesAcumuladosRegistros(data.data); // Aquí mandas al estado global o local
          console.log("Arreglo de porcentajes acumulados actualizado:", state.arregloPorcetajesAcumuladosRegistros);
        } else if (data.mensaje) {
          console.log("ℹ️ Mensaje:", data.mensaje);
          // setResultados([]);
          //state.setPorcentajeAcumulado(data.data);
        }
      })
      .catch((err) => {
        console.error("❌ Error al obtener porcentajes múltiples:", err);

        //setResultados([]);
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
          IdFondoOIngreso: item.fondoIngreso.Id,
          NombreFondoOIngreso: item.fondoIngreso.Descripcion,
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
        console.error("ERROR", error);

        const mensajeError =
          error?.response?.data?.error || "Error desconocido al guardar los datos.";

        Swal.fire({
          icon: "error",
          title: "Error",
          text: mensajeError,
          confirmButtonColor: "#d33",
        });
        console.log("data?.data", error?.data)
        console.error("ERROR DATA", error?.response?.data || error.message);
        throw error; // Esto es importante para que Promise.all detecte errores
      });
    });

    try {
      await Promise.all(peticiones); // Espera que todas las peticiones terminen
      console.log("✅ Todos los porcentajes acumulados fueron creados");

      if (state.idFideicomiso === "") {
        //state.createFideicomiso(stateOpen); // Ahora sí lo puedes ejecutar
      }

      //quitar
      else if (state.idFideicomiso !== "") {
        //state.modificaFideicomiso(stateOpen); // Ahora sí lo puedes ejecutar
      }

    } catch (error) {
      console.error("❌ Error al crear uno o más porcentajes acumulados:", error);
      // Puedes mostrar un mensaje al usuario si quieres
    }
  },



  modificaPorcentajesAcumulados: async (stateOpen: Function) => {
    const state = useFideicomisoStore.getState();

    const peticiones = state.tablaTipoMovimientoFideicomisoNew.map((item) => {

      console.log("ITEM modifica porcentajes acumulados", item)
      return axios.put(
        process.env.REACT_APP_APPLICATION_BACK + "/modifica-PorcentajesAcumulados",
        {
          IdTipoEntePublicoObligado: item.tipoFideicomitente.Id,
          IdEntePublicoObligado: item.fideicomitente.Id,
          NombreEntePublico: item.fideicomitente.Descripcion,
          IdFondoOIngreso: item.fondoIngreso.Id,
          NombreFondoOIngreso: item.fondoIngreso.Descripcion,
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
        console.error("ERROR", error);

        const mensajeError =
          error?.response?.data?.error || "Error desconocido al guardar los datos.";

        Swal.fire({
          icon: "error",
          title: "Error",
          text: mensajeError,
          confirmButtonColor: "#d33",
        });


        console.log("data?.data", error?.data)
        console.error("ERROR DATA", error?.response?.data || error.message);
        throw error; // Esto es importante para que Promise.all detecte errores
      });
    });

    try {
      await Promise.all(peticiones); // Espera que todas las peticiones terminen
      console.log("✅ Todos los porcentajes acumulados fueron creados");
      state.modificaFideicomiso(stateOpen); // Ahora sí lo puedes ejecutar
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

  createFideicomiso: async (stateOpen: Function, setLoading: Function) => {
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
        console.log("dATOS FIDEICOMISO CREADO", data.data);

        console.log("ID FIDEICOMISO: ", data.data.Id)

        stateSaveFiles.saveFilesFuentesPago(
          "Fideicomiso",
          soporteDocumentalPrueba,
          data.data.Id,
          process.env.REACT_APP_APPLICATION_RUTA_ARCHIVOS + `/FUENTEDEPAGO/FIDEICOMISOS/${data.data.Id}`,
          setLoading,
        );

        stateOpen(false);

        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El mandato se ha creado exitosamente",
        });

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
          setLoading,
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
    setLoading: Function,
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
              state.savePathDocFuentePago(
                idRegistro,
                data.RESPONSE.RUTA,
                data.RESPONSE.NOMBREIDENTIFICADOR,
                data.RESPONSE.NOMBREARCHIVO,
                setLoading,
                "" //AQUI VA EL NOMBRE DE LA TIPO DE FUENTE DE PAGO PARA GUARDARLO EN LA TABLA DE LA BASE DE DATOS QUE ES.
              );
            })
            .catch((e) => { });
        } else {
          return null;
        }
      }, 1000);
    });
  },

  // savePathDocFideicomiso: async (
  savePathDocFuentePago: async (
    id: string,
    ruta: string,
    nombreIdentificador: string,
    nombreArchivo: string,
    setLoading: Function,
    NombreTipoFuentePago: string,
  ) => {

    const idFieldMap: Record<typeof NombreTipoFuentePago, string> = {
      Fideicomiso: "IdFideicomiso",
      Mandato: "IdMandato",
      Instruccion: "IdInstruccion",
    };

    const idField = idFieldMap[NombreTipoFuentePago];

    return await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK +
        `/create-addPathDoc${NombreTipoFuentePago}`,
        {
          [idField]: id,
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
        setLoading(false);
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

  cleanPorcentajesAcumulados: () => {
    set(() => ({
      //TablaPruebaEditarFideicomiso: [], // Limpia la tabla de prueba antes de editar
      arregloPorcetajesAcumuladosRegistros: [], // Limpia el arreglo de porcentajes acumulados
      porcentajeAcumuladoRegistros: {
        IdTipoEntePublicoObligado: "",
        IdEntePublicoObligado: "",
        NombreEntePublico: "",
        IdFondoOIngreso: "",
        NombreFondoOIngreso: "",
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0, //TE QUEDASTE AQUI EN EL TEMA DE LIMPIAR LAS VARIABLES DEL PORCENTAJE ACUMULADO
      }
    }));
  },

  DetalleAsignacionTipoMoviSolicitudes: async (Id: string, state: Function) => {
    //const state = useLargoPlazoStore.getState();

    return await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/detail-DetalleAsignacionTipoMovSolicitudes",
      params: { IdFuentePago: Id },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {

      console.log("DATA DETALLE ASIGNACION TIPO MOVI SOLICITUDES", data.data);
      state(data.data);
    });
  },

});

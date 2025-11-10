import axios from "axios";
import { StateCreator } from "zustand";
import { IDeudorFideicomiso, IDeudorFideicomisoNew } from "../Fideicomiso/fideicomiso";
import { useLargoPlazoStore } from "./main";
import { IDeudorInstrucciones } from "../InstruccionesIrrevocables/instruccionesIrrevocables";

export type IMecanismoVehiculoPago = { Id: string; NumeroRegistro: string };
export interface IRegistro {
  MecanismoPago: string;
  Id: string;
  NumeroRegistro: string;
  FechaRegistro: string;

  TipoFideicomiso: string;
  Fiduciario: string;
  Fideicomisario: string;

  Mandatario: string;
  Mandante: string;
  TipoEntePublicoObligado: string;


  CLABE: string;
  IdBanco: string;
  NombreBanco: string;
  EntePublicoObligado: string;

  TipoMovimiento: string;
  SoporteDocumental: string;
}

//ASIGNAR FUENTE
export type garantiaPago = {
  Id: string;
  Descripcion: string;
};

export interface ICatalogoClasificacion {
  Id: string;
  Descripcion: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  Deleted: number;
}

export type AsignarFuenteV = {
  clasificacion: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fuentePago: { Id: string; Descripcion: string };
  RespectoA: { Id: string; Descripcion: string };
};

export interface FuenteDePagoLargoPlazoSlice {

  tablaResumenMecanismoPago: IDeudorInstrucciones[];
  setTablaResumenMecanismoPago: (tablaResumenMecanismoPago: IDeudorInstrucciones[]) => void;

  tablaMecanismoVehiculoPago: IRegistro[];
  getMecanismosVehiculosPago: (tabla: string, setState: Function) => void;

  tipoMecanismoVehiculoPago: string;
  setTipoMecanismoVehiculoPago: (tipo: string) => void;

  mecanismoVehiculoPago: IRegistro;
  setMecanismoVehiculoPago: (mecanismo: IRegistro) => void;

  tablaAsignarFuente: IDeudorFideicomiso[];
  setTablaAsignarFuente: (fuente: IDeudorFideicomiso[]) => void;
  cleanTablaAsignarFuente: () => void;
  addPorcentaje: (tablaAsignarFuente: IDeudorFideicomiso) => void;


  getCatalogoClasificacion: (setState: Function) => void;


  OriginalTablaAsignarFuenteNew: IDeudorFideicomisoNew[];
  //setTablaAsignarFuenteNew: (fuente: IDeudorFideicomisoNew[]) => void;
  tablaAsignarFuenteNew: IDeudorFideicomisoNew[];
  setTablaAsignarFuenteNew: (fuente: IDeudorFideicomisoNew[]) => void;
  removeTablaAsignarFuente: (index: number) => void;

  cleanTablaAsignarFuenteNew: () => void;

  garantiaPago: string;
  setGarantiaPago: (garantiaPago: string) => void;

  getDetalleFuenteDePago: (Tabla: string, Id: string) => void;


  tipoMovimientoFuentesPago: IDeudorFideicomisoNew[],
  setTipoMovimientoFuentesPago: (tipoMovimientoFuentesPago: IDeudorFideicomisoNew[]) => void;
  cleanTipoMovimientoFuentesPago: () => void;

  updateTipoMovimientoField: (
    index: number,
    field: keyof Pick<IDeudorFideicomisoNew, 'AfectadoTotalIngreso' | 'EquivalenciaCorrespondienteMunicipios'>,
    value: number,
  ) => void;
}

export const createFuentePagoLargoPLazoSlice: StateCreator<
  FuenteDePagoLargoPlazoSlice
> = (set, get) => ({

  getCatalogoClasificacion: async (setState: Function) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-clasificacionAsignarFuentePago", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        setState(r)
      });
  },

  updateTipoMovimientoField: (index: number,
    field: keyof Pick<IDeudorFideicomisoNew, 'AfectadoTotalIngreso' | 'EquivalenciaCorrespondienteMunicipios'>,
    value: number,
    tablaActual?: IDeudorFideicomisoNew[]
  ) => {
    set((state) => {
      // Usa la tabla pasada, o si no, la del estado
      const baseTabla = tablaActual || state.tablaAsignarFuenteNew;

      const updatedTabla = baseTabla.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );

      return { tablaAsignarFuenteNew: updatedTabla };
      // const updatedTabla = state.tablaAsignarFuenteNew.map((row, i) =>
      //   i === index ? { ...row, [field]: value } : row
      // );
      // // setState(updatedTabla);
      // return { tablaAsignarFuenteNew: updatedTabla };

    });
  },
  removeTablaAsignarFuente: (index: number) =>
    set((state) => ({
      tablaAsignarFuenteNew: state.tablaAsignarFuenteNew.filter(
        (_, i) => i !== index
      ),
    })),


  tablaResumenMecanismoPago: [],
  setTablaResumenMecanismoPago: (tablaResumenMecanismoPago: IDeudorInstrucciones[]) =>
    set(() => ({
      tablaResumenMecanismoPago: tablaResumenMecanismoPago,
    })),

  tablaMecanismoVehiculoPago: [],

  tipoMecanismoVehiculoPago: "",
  setTipoMecanismoVehiculoPago: (tipo: string) =>
    set(() => ({
      tipoMecanismoVehiculoPago: tipo,
    })),

  mecanismoVehiculoPago: {
    MecanismoPago: "",
    Id: "",
    NumeroRegistro: "",
    FechaRegistro: "",

    TipoFideicomiso: "",
    Fiduciario: "",
    Fideicomisario: "",

    Mandatario: "",
    Mandante: "",
    TipoEntePublicoObligado: "",

    NumeroCuenta: "",
    CLABE: "",
    IdBanco: "",
    NombreBanco: "",
    EntePublicoObligado: "",

    TipoMovimiento: "",
    SoporteDocumental: "",
  },

  garantiaPago: "",

  tablaAsignarFuente: [],

  tablaAsignarFuenteNew: [],
  OriginalTablaAsignarFuenteNew: [],

  setTablaAsignarFuenteNew: (fuente: IDeudorFideicomisoNew[]) =>
    set(() => ({
      tablaAsignarFuenteNew: fuente.map(r => ({
        ...r,
        AfectadoTotalIngreso: 0,
        EquivalenciaCorrespondienteMunicipios: 0,
      })),
      OriginalTablaAsignarFuenteNew: fuente,
    })),
    
  cleanTablaAsignarFuenteNew: () =>
    set(() => ({
      tablaAsignarFuente: [],
    })),

  setTablaAsignarFuente: (fuente: IDeudorFideicomiso[]) =>
    set(() => ({
      tablaAsignarFuente: fuente,
    })),

  setMecanismoVehiculoPago: (mecanismo: IRegistro) =>
    set(() => ({
      mecanismoVehiculoPago: mecanismo,
    })),

  cleanTablaAsignarFuente: () =>
    set(() => ({
      tablaAsignarFuente: [],
    })),

  addPorcentaje: (tablaAsignarFuente: any) => {
    set(() => ({ tablaAsignarFuente: tablaAsignarFuente }));
  },

  setGarantiaPago: (garantiaPago: string) => {
    set(() => ({
      garantiaPago: garantiaPago,
    }));
  },

  getMecanismosVehiculosPago: (tabla: string, setState: Function) => { //Es este 
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + `/listaMecanismosDePago`, {
        params: { tabla: tabla },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        console.log("Mecanismos de pago fetched:", r);

        set(() => ({
          tablaMecanismoVehiculoPago: r,
        }));

        setState(r);
      })
      .catch((error) => {
        console.log("Error fetching mecanismos de pago:", error);
      })
  },

  getDetalleFuenteDePago: async (Tabla: string, Id: string) => {
    const state = useLargoPlazoStore.getState();

    return await axios({
      method: "get",
      url: process.env.REACT_APP_APPLICATION_BACK + "/detail-fuenteDePago",
      params: { Tabla: Tabla, Id: Id },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    }).then(({ data }) => {
      state.setMecanismoVehiculoPago(data.data);
    });
  },

  tipoMovimientoFuentesPago: [],

  setTipoMovimientoFuentesPago: (tipoMovimientoFuentesPago: IDeudorFideicomisoNew[]) =>
    set(() => ({
      tipoMovimientoFuentesPago: tipoMovimientoFuentesPago,
    })),

  cleanTipoMovimientoFuentesPago: () =>
    set(() => ({
      tipoMovimientoFuentesPago: [],
    })),
});

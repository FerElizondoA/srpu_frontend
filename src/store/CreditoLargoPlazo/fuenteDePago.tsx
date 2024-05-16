import axios from "axios";
import { StateCreator } from "zustand";
import { IDeudorFideicomiso } from "../Fideicomiso/fideicomiso";
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
  Banco: string;
  EntePublicoObligado: string;

  TipoMovimiento: string;
  SoporteDocumental: string;
}

//ASIGNAR FUENTE
export type garantiaPago = {
  Id: string;
  Descripcion: string;
};

export type AsignarFuenteV = {
  clasificacion: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fuentePago: { Id: string; Descripcion: string };
  RespectoA: { Id: string; Descripcion: string };
};

export interface FuenteDePagoLargoPlazoSlice {

  tablaResumenMecanismoPago: IDeudorInstrucciones[];
  setTablaResumenMecanismoPago:(tablaResumenMecanismoPago: IDeudorInstrucciones[]) => void;

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

  garantiaPago: string;
  setGarantiaPago: (garantiaPago: string) => void;

  getDetalleFuenteDePago: (Tabla: string, Id: string) => void;
}

export const createFuentePagoLargoPLazoSlice: StateCreator<
  FuenteDePagoLargoPlazoSlice
> = (set, get) => ({
  tablaResumenMecanismoPago:[],
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

    CLABE: "",
    Banco: "",
    EntePublicoObligado: "",

    TipoMovimiento: "",
    SoporteDocumental: "",
  },

  garantiaPago: "",

  tablaAsignarFuente: [],

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

  getMecanismosVehiculosPago: (tabla: string, setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + `/listaMecanismosDePago`, {
        params: { tabla: tabla },
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;

        set(() => ({
          tablaMecanismoVehiculoPago: r,
        }));

        setState(r);
      });
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
});

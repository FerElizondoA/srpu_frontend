import axios from "axios";
import { StateCreator } from "zustand";

export type IMecanismoVehiculoPago = { Id: string; NumeroRegistro: string };

export interface IRegistro {
  MecanismoPago: String;
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
  // TipoEntePublicoObligado: string;

  TipoMovimiento: string;
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
  tablaMecanismoVehiculoPago: IRegistro[];
  getMecanismosVehiculosPago: (tabla: string, setState: Function) => void;

  tipoMecanismoVehiculoPago: string;
  setTipoMecanismoVehiculoPago: (tipo: string) => void;

  mecanismoVehiculoPago: IRegistro;
  setMecanismoVehiculoPago: (mecanismo: IRegistro) => void;

  garantiaPago: string;
  changeGarantiaPago: (garantiaPago: string) => void;
}

export const createFuentePagoLargoPLazoSlice: StateCreator<
  FuenteDePagoLargoPlazoSlice
> = (set, get) => ({
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
    // TipoEntePublicoObligado: "",

    TipoMovimiento: "",
  },

  garantiaPago: "",

  setMecanismoVehiculoPago: (mecanismo: IRegistro) =>
    set(() => ({
      mecanismoVehiculoPago: mecanismo,
    })),

  changeGarantiaPago: (garantiaPago: string) => {
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
});

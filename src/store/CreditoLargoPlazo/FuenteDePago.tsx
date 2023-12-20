import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesLplazo/encabezado/IListEncabezado";

export type IMecanismoVehiculoPago = { Id: string; NumeroRegistro: string };

export interface IRegistro {
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

  garantiaPago: { Id: string; Descripcion: string };
  changeGarantiaPago: (garantiaPago: {
    Id: string;
    Descripcion: string;
  }) => void;

  catalogoClasificacion: ICatalogo[];
  getClasificacion: () => void;

  catalogoRespecto: ICatalogo[];
  getRespecto: () => void;

  catalogoFuenteDePago: ICatalogo[];
  getFuentePago: () => void;
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

  catalogoClasificacion: [],
  catalogoRespecto: [],
  catalogoFuenteDePago: [],

  garantiaPago: { Id: "", Descripcion: "" },

  setMecanismoVehiculoPago: (mecanismo: IRegistro) =>
    set(() => ({
      mecanismoVehiculoPago: mecanismo,
    })),

  changeGarantiaPago: (garantiaPago: garantiaPago) => () => ({
    garantiaPago: garantiaPago,
  }),

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

  getClasificacion: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/get-clasificacionAsignarFuentePago",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoClasificacion: r,
        }));
      });
  },

  getRespecto: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-respecto", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoRespecto: r,
        }));
      });
  },

  getFuentePago: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-fuenteDePago", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoFuenteDePago: r,
        }));
      });
  },
});

import { StateCreator } from "zustand";
import axios from "axios";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export type ObligadoSolidarioAval = {
  obligadoSolidario: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
};

export interface InformacionGeneralSlice {

  reestructura: string;
  changeRestructura: (restructura: string) => void;

  informacionGeneral: {
    fechaContratacion: string;
    fechaVencimiento: string;
    plazo: number;
    destino: { Id: string; Descripcion: string };
    monto: number;
    denominacion: string;
    institucionFinanciera: { Id: string; Descripcion: string };
  };

  tablaObligadoSolidarioAval: ObligadoSolidarioAval[];
  generalObligadoSolidarioAval: {
    obligadoSolidario: { Id: string; Descripcion: string };
    tipoEntePublicoObligado: { Id: string; Descripcion: string };
    entePublicoObligado: { Id: string; Descripcion: string };
  };

  catalogoInstituciones: ICatalogo[];
  catalogoDestinos: ICatalogo[];
  catalogoObligadoSolidarioAval: ICatalogo[];
  catalogoTipoEntePublicoObligado: ICatalogo[];

  changeInformacionGeneral: (
    fechaContratacion: string,
    fechaVencimiento: string,
    plazo: number,
    destino: { Id: string; Descripcion: string },
    monto: number,
    denominacion: string,
    institucionFinanciera: { Id: string; Descripcion: string }
  ) => void;

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: ObligadoSolidarioAval
  ) => void;

  changeObligadoSolidarioAval: (
    obligadoSolidario: { Id: string; Descripcion: string },
    tipoEntePublicoObligado: { Id: string; Descripcion: string },
    entePublicoObligado: { Id: string; Descripcion: string }
  ) => void;

  cleanObligadoSolidarioAval: () => void;
  removeObligadoSolidarioAval: (index: number) => void;

  getDestinos: () => void;
  getInstituciones: () => void;
  getTipoEntePublicoObligado: () => void;
  getObligadoSolidarioAval: () => void;
}

export const createInformacionGeneralSlice: StateCreator<
  InformacionGeneralSlice
> = (set, get) => ({
  reestructura: "",
  changeRestructura:(reestructura: string) => {
    set(() => ({
      reestructura: reestructura
    }))
  },

  informacionGeneral: {
    fechaContratacion: new Date().toString(),
    fechaVencimiento: new Date().toString(),
    plazo: 1,
    destino: { Id: "", Descripcion: "" },
    monto: 0,
    denominacion: "Pesos",
    institucionFinanciera: { Id: "", Descripcion: "" },
  },

  tablaObligadoSolidarioAval: [],
  generalObligadoSolidarioAval: {
    obligadoSolidario: { Id: "", Descripcion: "" }, // Descripcion: "No Aplica"
    tipoEntePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No Aplica"
    entePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "No Aplica"
  },

  catalogoInstituciones: [],
  catalogoDestinos: [],
  catalogoObligadoSolidarioAval: [],
  catalogoTipoEntePublicoObligado: [],

  changeInformacionGeneral: (informacionGeneral: any) =>
    set(() => ({
      informacionGeneral: informacionGeneral,
    })),

  changeObligadoSolidarioAval: (obligadoSolidario: any) => {
    set(() => ({
      generalObligadoSolidarioAval: obligadoSolidario,
    }));
  },

  addObligadoSolidarioAval: (newObligadoSolidarioAval: ObligadoSolidarioAval) =>
    set((state) => ({
      tablaObligadoSolidarioAval: [
        ...state.tablaObligadoSolidarioAval,
        newObligadoSolidarioAval,
      ],
    })),

  removeObligadoSolidarioAval: (index: number) =>
    set((state) => ({
      tablaObligadoSolidarioAval: state.tablaObligadoSolidarioAval.filter(
        (_, i) => i !== index
      ),
    })),

  cleanObligadoSolidarioAval: () =>
    set((state) => ({ tablaObligadoSolidarioAval: [] })),

  getDestinos: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-destinos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoDestinos: r,
        }));
      });
  },
  getInstituciones: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK +
          "/get-institucionesFinancieras",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoInstituciones: r,
        }));
      });
  },
  getTipoEntePublicoObligado: async () => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-tiposEntePublico", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoTipoEntePublicoObligado: r,
        }));
      });
  },
  getObligadoSolidarioAval: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/get-obligadoSolidarioAval",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoObligadoSolidarioAval: r,
        }));
      });
  },
});

import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../components/Interfaces/InterfacesCplazo/CortoPlazo/encabezado/IListEncabezado";

export interface IInformacionGeneral {
  fechaContratacion: string;
  fechaVencimiento: string;
  plazo: number;
  destino: { Id: string; Descripcion: string };
  monto: number;
  denominacion: string;
  institucionFinanciera: { Id: string; Descripcion: string };
}

export interface IObligadoSolidarioAval {
  obligadoSolidario: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  entePublicoObligado: { Id: string; Descripcion: string };
}

export interface InformacionGeneralSlice {
  reestructura: string;
  changeRestructura: (restructura: string) => void;

  informacionGeneral: IInformacionGeneral;

  generalObligadoSolidarioAval: {
    obligadoSolidario: string;
    tipoEntePublicoObligado: { Id: string; Descripcion: string };
    entePublicoObligado: { Id: string; Descripcion: string };
  };
  tablaObligadoSolidarioAval: IObligadoSolidarioAval[];

  catalogoInstituciones: ICatalogo[];
  catalogoDestinos: ICatalogo[];
  catalogoObligadoSolidarioAval: ICatalogo[];
  catalogoTipoEntePublicoObligado: ICatalogo[];

  changeInformacionGeneral: (informacionGeneral: any) => void;

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: IObligadoSolidarioAval
  ) => void;

  setTablaObligadoSolidarioAval: (
    obligadoSolidarioAval: IObligadoSolidarioAval[]
  ) => void;

  changeObligadoSolidarioAval: (
    obligadoSolidario: { Id: string; Descripcion: string },
    tipoEntePublicoObligado: { Id: string; Descripcion: string },
    entePublicoObligado: { Id: string; Descripcion: string }
  ) => void;

  cleanObligadoSolidarioAval: () => void;

  removeObligadoSolidarioAval: (index: number) => void;

  getDestinos: (tipoSolicitud: string) => void;
  getInstituciones: () => void;
  getTipoEntePublicoObligado: () => void;
  getObligadoSolidarioAval: () => void;
}

export const createInformacionGeneralSlice: StateCreator<
  InformacionGeneralSlice
> = (set, get) => ({
  reestructura: "",
  changeRestructura: (reestructura: string) => {
    set(() => ({
      reestructura: reestructura,
    }));
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
    obligadoSolidario: "NO APLICA",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "NO APLICA"
    entePublicoObligado: { Id: "", Descripcion: "" }, // Descripcion: "NO APLICA"
  },

  catalogoInstituciones: [],
  catalogoDestinos: [],
  catalogoObligadoSolidarioAval: [],
  catalogoTipoEntePublicoObligado: [],

  changeInformacionGeneral: (informacionGeneral: any) => {
    set(() => ({
      informacionGeneral: informacionGeneral,
    }));
  },

  changeObligadoSolidarioAval: (obligadoSolidario: any) => {
    set(() => ({
      generalObligadoSolidarioAval: obligadoSolidario,
    }));
  },

  addObligadoSolidarioAval: (
    newObligadoSolidarioAval: IObligadoSolidarioAval
  ) =>
    set((state) => ({
      tablaObligadoSolidarioAval: [
        ...state.tablaObligadoSolidarioAval,
        newObligadoSolidarioAval,
      ],
    })),

  setTablaObligadoSolidarioAval: (
    obligadoSolidarioAval: IObligadoSolidarioAval[]
  ) =>
    set((state) => ({
      tablaObligadoSolidarioAval: obligadoSolidarioAval,
    })),

  removeObligadoSolidarioAval: (index: number) =>
    set((state) => ({
      tablaObligadoSolidarioAval: state.tablaObligadoSolidarioAval.filter(
        (_, i) => i !== index
      ),
    })),

  cleanObligadoSolidarioAval: () =>
    set((state) => ({ tablaObligadoSolidarioAval: [] })),

  getDestinos: async (tipoSolicitud: string) => {
    await axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/get-destinos", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        if (tipoSolicitud === "CP") {
          r = r.filter((v: any) => v.OCP === 1);
        } else if (tipoSolicitud === "LP") {
          r = r.filter((v: any) => v.OLP === 1);
        } else {
        }

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

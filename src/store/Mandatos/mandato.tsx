import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { useLargoPlazoStore } from "../CreditoLargoPlazo/main";

export interface TipoMovimientoMandato {
  altaDeudor: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  mandatario: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string };
  fechaMandato: string;
}

export interface SoporteDocumentalMandato {
  tipo: string;
  archivo: File;
  nombreArchivo: string;
  fechaArchivo: string;
}

export interface Mandato {
  tipoMovimiento: TipoMovimientoMandato[];
  soporteDocumentalMandato: SoporteDocumentalMandato[];
}

export interface MandatoSlice {
  numeroMandato: string;
  tipoMovimientoMandato: TipoMovimientoMandato;
  soporteDocumentalMandato: SoporteDocumentalMandato;

  tablaTipoMovimientoMandato: TipoMovimientoMandato[];
  tablaSoporteDocumentalMandato: SoporteDocumentalMandato[];

  changeIdMandato: (Id: string) => void;
  changeNumeroMandato: (Id: string) => void;
  idMandato: string;

  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => void;

  setTipoMovimientoMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato
  ) => void;
  setSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => void;

  addTipoMovimientoMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato
  ) => void;
  addSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => void;

  removeTipoMovimientoMandato: (index: number) => void;
  removeSoporteDocumentalMandato: (index: number) => void;

  cleanTipoMovimientoMandato: () => void;
  cleanSoporteDocumentalMandato: () => void;

  getMandato: (setState: Function) => void;
  createMandato: () => void;
  modificaMandato: () => void;

  cleanMandato: () => void;
}

export const createMandatoSlice: StateCreator<MandatoSlice> = (set, get) => ({
  numeroMandato: "",
  idMandato: "",

  tipoMovimientoMandato: {
    altaDeudor: "NO",
    tipoEntePublicoObligado: { Id: "", Descripcion: "" },
    mandatario: { Id: "", Descripcion: "" },
    tipoFuente: { Id: "", Descripcion: "" },
    fondoIngreso: { Id: "", Descripcion: "" },
    fechaMandato: new Date().toString(),
  },
  soporteDocumentalMandato: {
    tipo: "",
    archivo: new File([], ""),
    nombreArchivo: "",
    fechaArchivo: new Date().toString(),
  },
  tablaTipoMovimientoMandato: [],
  tablaSoporteDocumentalMandato: [],

  //AQUI VAN LOS CATALAGOS

  catalogoMandatario: [],
  catalogoMandato: [],

  //
  setTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => {
    set(() => ({
      tipoMovimientoMandato: tipoMovimientoMandato,
    }));
  },

  setSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => {
    set(() => ({
      soporteDocumentalMandato: soporteDocumentalMandato,
    }));
  },

  addTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => {
    set((state) => ({
      tablaTipoMovimientoMandato: [
        ...state.tablaTipoMovimientoMandato,
        tipoMovimientoMandato,
      ],
    }));
  },

  addSoporteDocumentalMandato: (
    soporteDocumentalMandato: SoporteDocumentalMandato
  ) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: [
        ...state.tablaSoporteDocumentalMandato,
        soporteDocumentalMandato,
      ],
    }));
  },

  removeTipoMovimientoMandato: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoMandato: state.tablaTipoMovimientoMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },

  removeSoporteDocumentalMandato: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: state.tablaSoporteDocumentalMandato.filter(
        (_, i) => i !== index
      ),
    }));
  },

  cleanTipoMovimientoMandato: () => {
    set(() => ({
      tipoMovimientoMandato: {
        altaDeudor: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "" },
        fechaMandato: new Date().toString(),
      },
    }));
  },

  cleanSoporteDocumentalMandato: () => {
    set(() => ({
      soporteDocumentalMandato: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
    }));
  },

  changeIdMandato: (Id: any) => {
    set(() => ({
      idMandato: Id,
    }));
  },
  changeNumeroMandato: (NumeroMandato: any) => {
    set(() => ({
      numeroMandato: NumeroMandato,
    }));
  },

  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => {
    set(() => ({
      tablaTipoMovimientoMandato: tipoMovimientoMandato,
      tablaSoporteDocumental: soporteDocumentalMandato,
    }));
  },

  getMandato: (setState: Function) => {
    axios
      .get(process.env.REACT_APP_APPLICATION_BACK + "/api/get-mandato", {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(({ data }) => {
        let r = data.data;
        setState(r);
      });
  },

  createMandato: async () => {
    const state = useLargoPlazoStore.getState();
    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mandato",
        {
          NumeroMandato: state.numeroMandato,
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: format(
            new Date(state.tipoMovimientoMandato.fechaMandato),
            "dd/MM/yyyy"
          ),
          Mandatario: state.tipoMovimientoMandato.mandatario.Id,
          MunicipioMandante: "PRUEBA SETEADA",
          OrganismoMandante: "PRUEBA SETEADA",
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoMandato),
          SoporteDocumental: JSON.stringify(state.soporteDocumentalMandato),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.changeIdMandato(data.data.Id);
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El fideicomiso se ha creado exitosamente",
        });
      });
  },

  modificaMandato: async () => {
    const state = useCortoPlazoStore.getState();
    await axios
      .put(
        process.env.REACT_APP_APPLICATION_BACK + "/api/modify-fideicomiso",
        {
          IdFideicomiso: state.idFideicomiso,
          IdUsuario: localStorage.getItem("IdUsuario"),
          NumeroFideicomiso: state.generalFideicomiso.numeroFideicomiso,
          TipoFideicomiso: state.generalFideicomiso.tipoFideicomiso.Id,
          FechaFideicomiso: state.generalFideicomiso.fechaFideicomiso,
          Fiudiciario: state.generalFideicomiso.fiudiciario.Id,
          Fideicomisario: JSON.stringify(state.tablaFideicomisario),
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimiento),
          SoporteDocumental: JSON.stringify(state.tablaSoporteDocumental),
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "success",
          title: "Éxito",
          text: "El fideicomiso se ha modificado exitosamente",
        });
      })
      .catch(function (error) {
        Swal.fire({
          confirmButtonColor: "#15212f",
          cancelButtonColor: "rgb(175, 140, 85)",
          icon: "error",
          title: "No se Edito el fideicomiso.",
        });
      });
  },

  cleanMandato: () => {
    set(() => ({
      tipoMovimientoMandato: {
        altaDeudor: "",
        tipoEntePublicoObligado: { Id: "", Descripcion: "" },
        mandatario: { Id: "", Descripcion: "" },
        tipoFuente: { Id: "", Descripcion: "" },
        fondoIngreso: { Id: "", Descripcion: "" },
        fechaMandato: new Date().toString(),
      },
      soporteDocumentalMandato: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      },
      tablaTipoMovimientoMandato: [],
      tablaSoporteDocumentalMandato: [],
    }));
  },
});

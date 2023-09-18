import axios from "axios";
import { StateCreator } from "zustand";
import { ICatalogo } from "../../screens/Config/Catalogos";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";

export interface TipoMovimientoMandato {
  altaDeudor: string;
  tipoEntePublicoObligado: { Id: string; Descripcion: string };
  mandatario: { Id: string; Descripcion: string };
  tipoFuente: { Id: string; Descripcion: string };
  fondoIngreso: { Id: string; Descripcion: string };
  fechaMandato: string
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
  tipoMovimientoMandato: TipoMovimientoMandato;
  soporteDocumentalMandato: SoporteDocumentalMandato;

  tablaTipoMovimientoMandato: TipoMovimientoMandato[];
  tablaSoporteDocumentalMandato: SoporteDocumentalMandato[];

  //Aqui iran los catalogos
  catalogoMandatario: ICatalogo[];
  catalogoMandato: ICatalogo[];
  //

  //borrarMandato: (Id: string) => void; //es un axios que no se ha creado
  changeIdMandato: (Id: string) => void;
  idMandato: string;

  editarMandato: (
    tipoMovimientoMandato: TipoMovimientoMandato[],
    soporteDocumentalMandato: SoporteDocumentalMandato[]
  ) => void;

  setTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => void;
  setSoporteDocumentalMandato: (soporteDocumentalMandato: SoporteDocumentalMandato) => void;

  addTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => void;
  addSoporteDocumentalMandato: (soporteDocumentalMandato: SoporteDocumentalMandato) => void;

  removeTipoMovimientoMandato: (index: number) => void;
  removeSoporteDocumentalMandato: (index: number) => void;

  cleanTipoMovimientoMandato: () => void;
  cleanSoporteDocumentalMandato: () => void;

  //Aqui iran los Get y los axios
  getMandatario: () => void;
  //

  getMandato: (setstate: Function) => void;
  createMandato: () => void;
  modificaMandato: () => void;

}

export const createMandatoSlice: StateCreator<MandatoSlice> = (
  set,
  get
) => ({
  idMandato: "",
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

  //AQUI VAN LOS CATALAGOS

  catalogoMandatario: [],
  catalogoMandato:[],

  //
  setTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => {
    set(() => ({
      tipoMovimientoMandato: tipoMovimientoMandato
    }))
  },

  setSoporteDocumentalMandato: (soporteDocumentalMandato: SoporteDocumentalMandato) => {
    set(() => ({
      soporteDocumentalMandato: soporteDocumentalMandato
    }))
  },

  addTipoMovimientoMandato: (tipoMovimientoMandato: TipoMovimientoMandato) => {
    set((state) => ({
      tablaTipoMovimientoMandato: [...state.tablaTipoMovimientoMandato, tipoMovimientoMandato]
    }))
  },

  addSoporteDocumentalMandato: (soporteDocumentalMandato: SoporteDocumentalMandato) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: [...state.tablaSoporteDocumentalMandato, soporteDocumentalMandato]
    }))
  },

  removeTipoMovimientoMandato: (index: number) => {
    set((state) => ({
      tablaTipoMovimientoMandato: state.tablaTipoMovimientoMandato.filter((_, i) => i !== index),
    }))
  },

  removeSoporteDocumentalMandato: (index: number) => {
    set((state) => ({
      tablaSoporteDocumentalMandato: state.tablaSoporteDocumentalMandato.filter((_, i) => i !== index),
    }))
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
      }
    }))
  },
  cleanSoporteDocumentalMandato: () => {
    set(() => ({
      soporteDocumentalMandato: {
        tipo: "",
        archivo: new File([], ""),
        nombreArchivo: "",
        fechaArchivo: new Date().toString(),
      }
    }))
  },

  changeIdMandato: (Id: any) => {
    set(() => ({
      idMandato: Id
    }))
  },

  editarMandato: (tipoMovimientoMandato: TipoMovimientoMandato[], soporteDocumentalMandato: SoporteDocumentalMandato[]) => {
    set(() => ({
      tablaTipoMovimientoMandato: tipoMovimientoMandato,
      tablaSoporteDocumental: soporteDocumentalMandato,
    }))
  },

  getMandatario: async () => {
    await axios
      .get(
        process.env.REACT_APP_APPLICATION_BACK + "/api/get-mandatario",
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        let r = data.data;
        set((state) => ({
          catalogoMandatario: r,
        }));
      });
  },

  getMandato: async (
    setState: Function,
  ) => {
    await axios
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
    const state = useCortoPlazoStore.getState();

    await axios
      .post(
        process.env.REACT_APP_APPLICATION_BACK + "/api/create-mandato",
        {
          IdUsuario: localStorage.getItem("IdUsuario"),
          FechaMandato: state.tipoMovimientoMandato.fechaMandato,
          Mandatario: state.tipoMovimientoMandato.mandatario,
          MunicipioMandante: "PRUEBA SETEADA",
          OrganismoMandante: "PRUEBA SETEADA",
          TipoMovimiento: JSON.stringify(state.tablaTipoMovimientoMandato),
          SoporteDocumental: JSON.stringify(state.soporteDocumentalMandato)
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then(({ data }) => {
        state.changeIdFideicomiso(data.data.id);
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
});

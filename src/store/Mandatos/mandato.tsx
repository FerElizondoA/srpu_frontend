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
  soporteDocumental: SoporteDocumentalMandato[];
}

export interface MandatoSlice {
  tipoMovimientoMandato: TipoMovimientoMandato;
  soporteDocumentalMandato: SoporteDocumentalMandato;

  tablaTipoMovimientoMandato: TipoMovimientoMandato[];
  tablaSoporteDocumentalMandato: SoporteDocumentalMandato[];

  //Aqui iran los catalogos
  catalogoMandatario: ICatalogo[];
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

  catalogoMandatario:[],

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

  editarMandato: (tipoMovimientoMandato: TipoMovimientoMandato[], soporteDocumental: SoporteDocumentalMandato[]) => {
    set(() => ({
      tablaTipoMovimientoMandato: tipoMovimientoMandato,
      tablaSoporteDocumental: soporteDocumental,
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


});

import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { IEncabezado } from "../CreditoCortoPlazo/encabezado";
import {
  IInformacionGeneral,
  IObligadoSolidarioAval,
} from "../CreditoCortoPlazo/informacion_general";
import { ICondicionFinanciera } from "../CreditoCortoPlazo/condicion_financiera";

export interface IInscripcion {
  Id: string;
  NumeroRegistro: string;
  Nombre: string;
  TipoEntePublico: string;
  TipoSolicitud: string;
  Institucion: string;
  NoEstatus: string;
  Estatus: string;
  ControlInterno: string;
  Control: string;
  IdClaveInscripcion: string;
  MontoOriginalContratado: string;
  FechaContratacion: string;
  Solicitud: string;
  FechaCreacion: string;
  CreadoPor: string;
  UltimaModificacion: string;
  ModificadoPor: string;
  IdEditor: string;
  FechaRequerimientos: string;
  IdPathDoc?: string;
}

export interface ICredito {
  encabezado: IEncabezado;
  informacionGeneral: {
    informacionGeneral: IInformacionGeneral;
    obligadosSolidarios: IObligadoSolidarioAval[];
  };
  condicionesFinancieras: ICondicionFinanciera[];
}

export interface InscripcionSlice {
  inscripcion: IInscripcion;
  setInscripcion: (solicitud: IInscripcion) => void;

  proceso: string;
  setProceso: (proceso: string) => void;
}

export const createInscripcionSlice: StateCreator<InscripcionSlice> = (
  set,
  get
) => ({
  inscripcion: {
    Id: "",
    NumeroRegistro: "",
    Nombre: "",
    TipoEntePublico: "",
    TipoSolicitud: "",
    Institucion: "",
    NoEstatus: "",
    Estatus: "",
    ControlInterno: "",
    Control: "",
    IdClaveInscripcion: "",
    MontoOriginalContratado: "",
    FechaContratacion: "",
    Solicitud: "",
    FechaCreacion: "",
    CreadoPor: "",
    UltimaModificacion: "",
    ModificadoPor: "",
    IdEditor: localStorage.getItem("IdUsuario")!,
    FechaRequerimientos: "",
    IdPathDoc: "",
  },

  setInscripcion: (inscripcion: IInscripcion) => {
    const state = useCortoPlazoStore.getState();

    let aux: any = JSON.parse(inscripcion.Solicitud);
    state.changeEncabezado(aux?.encabezado);

    state.changeInformacionGeneral(aux?.informacionGeneral);
    state.setTablaObligadoSolidarioAval(
      aux?.informacionGeneral.obligadosSolidarios
    );
    aux?.condicionesFinancieras.map((v: any, index: number) => {
      return state.addCondicionFinanciera(v);
    });
    aux?.documentacion.map((v: any, index: number) => {
      return state.addDocumento(v);
    });
    state.changeReglasAplicables(aux?.inscripcion.declaratorias);

    set(() => ({ inscripcion: inscripcion }));
  },

  proceso: "",
  setProceso: (proceso: string) => {
    set(() => ({ proceso: proceso }));
  },
});

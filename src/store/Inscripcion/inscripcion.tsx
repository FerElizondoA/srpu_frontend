import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "../CreditoCortoPlazo/main";
import { IEncabezado } from "../CreditoCortoPlazo/encabezado";
import {
  IInformacionGeneral,
  IObligadoSolidarioAval,
} from "../CreditoCortoPlazo/informacion_general";
import { ICondicionFinanciera } from "../CreditoCortoPlazo/condicion_financiera";
import { useLargoPlazoStore } from "../CreditoLargoPlazo/main";
import { IGastosCostos } from "../CreditoLargoPlazo/informacion_general";
import { IDeudorFideicomiso } from "../Fideicomiso/fideicomiso";

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

export interface ISolicitudLargoPlazo {
  encabezado: IEncabezado;
  informacionGeneral: {
    informacionGeneral: IInformacionGeneral;
    obligadosSolidarios: {
      entePublicoObligado: { Id: string; Descripcion: string };
      tipoEntePublicoObligado: { Id: string; Descripcion: string };
    }[];
    destinoGastosCostos: IGastosCostos[];
  };
  autorizacion: {
    Id: string;
    MontoAutorizado: string;
    NumeroAutorizacion: string;
  };
  fuenteDePago: {
    fuente: IDeudorFideicomiso[];
    garantiaDePago: string;
    mecanismoVehiculoDePago: {
      Tipo: string;
      Id: string;
      NumeroRegistro: string;
      TipoFideicomiso: string;
      Fiduciario: string;
    };
  };
  condicionesFinancieras: ICondicionFinanciera[];
  documentacion: {
    descripcionTipo: string;
    nombreArchivo: string;
    tipoArchivo: string;
  }[];
  inscripcion: {
    servidorPublicoDirigido: string;
    cargoServidorPublicoServidorPublicoDirigido: string;
    declaratorias: string[];
  };
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
    const cpState = useCortoPlazoStore.getState();
    const lpState = useLargoPlazoStore.getState();

    let aux: ISolicitudLargoPlazo = JSON.parse(inscripcion.Solicitud);

    if (inscripcion.TipoSolicitud === "Crédito Simple a Corto Plazo") {
      cpState.changeEncabezado(aux?.encabezado);

      cpState.setInformacionGeneral(aux?.informacionGeneral.informacionGeneral);
      cpState.setTablaObligadoSolidarioAval(
        aux?.informacionGeneral.obligadosSolidarios
      );
      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return cpState.addCondicionFinanciera(v);
      });
      aux?.documentacion.map((v: any, index: number) => {
        return cpState.addDocumento(v);
      });
      cpState.changeReglasAplicables(aux?.inscripcion.declaratorias);
    } else if (inscripcion.TipoSolicitud === "Crédito Simple a Largo Plazo") {
      lpState.changeEncabezado(aux?.encabezado);

      lpState.setInformacionGeneral(aux?.informacionGeneral.informacionGeneral);
      lpState.setTablaObligadoSolidarioAval(
        aux?.informacionGeneral.obligadosSolidarios
      );
      lpState.setTablaGastosCostos(aux?.informacionGeneral.destinoGastosCostos);

      lpState.getDetalleAutorizacion(aux?.autorizacion.Id);

      // lpState.setTipoMecanismoVehiculoPago(
      //   aux?.fuenteDePago.mecanismoVehiculoDePago.Tipo
      // );

      aux?.condicionesFinancieras.map((v: any, index: number) => {
        return lpState.addCondicionFinanciera(v);
      });
      aux?.documentacion.map((v: any, index: number) => {
        return lpState.addDocumento(v);
      });
      lpState.changeReglasAplicables(aux?.inscripcion.declaratorias);
    }

    set(() => ({ inscripcion: inscripcion }));
  },

  proceso: "",
  setProceso: (proceso: string) => {
    set(() => ({ proceso: proceso }));
  },
});

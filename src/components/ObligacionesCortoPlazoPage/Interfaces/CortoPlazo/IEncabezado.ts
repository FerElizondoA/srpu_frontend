export interface IEncabezado {
    tipoDocumento: string;
    municipioOrganismo: string;
    tipoEntePublico: string;
    fechaSolicitud: string;
    solicitanteAutorizado: string;
    cargoSolicitante:string;
  }

export interface IInformacionGeneral {
    fechaContratacion: string;
    fechaVencimiento: string;
    plazo: string;
    destino: string;
    montoOriginalContratado: string;
    Denominacion:string;
}
   
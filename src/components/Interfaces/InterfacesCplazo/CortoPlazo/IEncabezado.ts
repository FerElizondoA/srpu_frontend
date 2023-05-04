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
  plazo: number;
  destino: {
    Id: string;
    Descripcion: string;
  };
  monto: number;
  denominacion: string;
  institucionFinanciera: { Id: string; Descripcion: string };
}

export interface ISolCortoPlazo {
  encabezado: IEncabezado;
  informacionGeneral:IInformacionGeneral;
}
export interface ISolicitud {
  solicitanteAutorizado: string; 
  oficionum: string;
  cargoSolicitante: string;
  organismo: string;
  institucion: string;
  montoOriginal: number;
  destino: string;
  plazoDias: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string; 
  tasaEfectiva: string;
  tasaReferencia: string;// tasa de referencia
  reglas: string[];
  tipoComision: string;
  nombreServidorPublico: string;
  tipoDocumento: string;
  capitalPeriocidadPago: string;
  obligadoSolidarioAval: string;
  fechaContratacion: Date;
  fechaVencimiento: Date;
  tipoEntePublico: string;
  
  
  
}

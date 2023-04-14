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
  tasaefectiva: string;
  tasaInteres: string;// tasa de referencia
  reglas: string[];
  tipoComision: string;
  nombreServidorPublico: string;
  tipoDocumento: string;
  periodoPago: string;
  obligadoSolidarioAval: string;
  fechaContratacion: Date;
  fechaVencimiento: Date;
  dias: string;
  tipoEntePublico: string;
  
  
  
}

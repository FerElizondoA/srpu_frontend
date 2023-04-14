export interface ISolicitud {
  nombre: string;
  oficionum: string;
  cargo: string;
  organismo: string;
  institucion: string;
  montoOriginal: number;
  destino: string;
  plazoDias: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string; 
  tasaEfectiva: string;
  tasaReferencia: string;
  reglas: string[];
  tipoComision: string;
  nombreServidorPublico: string;
  tipoDocumento: string;
  capitalPeriocidadPago: string;
  obligadoSolidarioAval: string;
  fechaContratacion: Date;
  fechaVencimiento: Date;
}

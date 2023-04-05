export interface ISolicitud {
  nombre: string;
  oficionum: string;
  cargo: string;
  organismo: string;
  InstitucionBancaria: string;
  monto: number;
  fechacontrato: Date;
  destino: string;
  dias: string;
  fechavencimiento: Date;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
  tasaefectiva: string;
  reglas: [];
  tipocomisiones: string;
  servidorpublico: string;
  contrato: string;
  periodopago: string;
  obligadoSolidario: string;
}

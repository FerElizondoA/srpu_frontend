import { StateCreator } from "zustand";
import { IFileLP } from "../../components/ObligacionesLargoPlazoPage/Panels/Documentacion";

export type Autorizacion = {
  AutorizacionLegislatura: string;
  tipoAutorizacion: string;
  numeroAutorizacion: string;
  FechaPublicacion: string;
  montoAutorizado: number;
  medioPublicacion: string;
  documentoSoporte: IFileLP;
  detalleDestino: string;
};

export interface AurotizacionLargoPlazoSlice {
  Autorizacion: {
    AutorizacionLegislatura: string;
    tipoAutorizacion: string;
    numeroAutorizacion: string;
    FechaPublicacion: string;
    montoAutorizado: number;
    medioPublicacion: string;
    documentoSoporte: IFileLP;
    detalleDestino: string;
  };

  tablaAutorizacion: Autorizacion[];




}

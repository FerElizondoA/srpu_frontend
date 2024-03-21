import { create } from "zustand";
import { EncabezadoSlice, createEncabezadoSlice } from "./encabezado";
import {
  AutorizacionLargoPlazoSlice,
  createAutorizacionLargoPlazoSlice,
} from "./autorizacion";
import {
  CondicionFinancieraSlice,
  createCondicionFinancieraSlice,
} from "./condicion_financiera";
import { PagosCapitalSlice, createPagosCapitalSlice } from "./pagos_capital";
import {
  ComentarioApartadoLargoPlazoSlice,
  createComentarioLargoPlazoSlice,
} from "./comentarios_apartado";

import {
  SolicitudInscripcionLargoPlazoSlice,
  createSolicitudInscripcionLargoPlazoSlice,
} from "./solicitud_inscripcion";
import {
  FuenteDePagoLargoPlazoSlice,
  createFuentePagoLargoPLazoSlice,
} from "./fuenteDePago";
import { TasaEfectivaSlice, createTasaEfectivaSlice } from "./tasa_efectiva";
import { DocumentosSlice, createDocumentoSlice } from "./documentacion";
import {
  InformacionGeneralSlice,
  createInformacionGeneralSlice,
} from "./informacion_general";

export type SolicitudStoreCSLP = EncabezadoSlice &
  InformacionGeneralSlice &
  CondicionFinancieraSlice &
  PagosCapitalSlice &
  TasaEfectivaSlice &
  SolicitudInscripcionLargoPlazoSlice &
  ComentarioApartadoLargoPlazoSlice &
  DocumentosSlice &
  FuenteDePagoLargoPlazoSlice &
  AutorizacionLargoPlazoSlice;

export const useLargoPlazoStore = create<SolicitudStoreCSLP>()((...x) => ({
  ...createEncabezadoSlice(...x),
  ...createInformacionGeneralSlice(...x),
  ...createCondicionFinancieraSlice(...x),
  ...createPagosCapitalSlice(...x),
  ...createTasaEfectivaSlice(...x),
  ...createSolicitudInscripcionLargoPlazoSlice(...x),
  ...createComentarioLargoPlazoSlice(...x),
  ...createDocumentoSlice(...x),
  ...createFuentePagoLargoPLazoSlice(...x),
  ...createAutorizacionLargoPlazoSlice(...x),
}));

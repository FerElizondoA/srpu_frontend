import { create } from "zustand";

import {
  EncabezadoLargoPlazoSlice,
  createEncabezadoLargoPlazoSlice,
} from "./encabezado";
import {
  createInformacionGeneralLargoPlazoSlice,
  InformacionGeneralLargoPlazoSlice,
} from "./informacion_general";
import {
  CondicionFinancieraLargoPlazoSlice,
  createCondicionFinancieraLargoPlazoSlice,
} from "./condicion_financiera";
import {
  PagosCapitalLargoPlazoSlice,
  createPagosCapitalLargoPlazoSlice,
} from "./pagos_capital";
import {
  createTasaEfectivaLargoPlazoSlice,
  TasaEfectivaLargoPlazoSlice,
} from "./tasa_efectiva";
import {
  SolicitudInscripcionLargoPlazoSlice,
  createSolicitudInscripcionLargoPlazoSlice,
} from "./solicitud_inscripcion";
import {
  ComentarioApartadoLargoPlazoSlice,
  createComentarioLargoPlazoSlice,
} from "./comentarios_apartado";
import {
  DocumentosLargoPlazoSlice,
  createDocumentoLargoPlazoSlice,
} from "./documentacion";
import {
  FuenteDePagoLargoPlazoSlice,
  createFuentePagoLargoPLazoSlice,
} from "./FuenteDePago";
import {
  AutorizacionLargoPlazoSlice,
  createAutorizacionLargoPlazoSlice,
} from "../Autorizacion/agregarAutorizacion";

export type SolicitudStoreCSLP = EncabezadoLargoPlazoSlice &
  InformacionGeneralLargoPlazoSlice &
  CondicionFinancieraLargoPlazoSlice &
  PagosCapitalLargoPlazoSlice &
  TasaEfectivaLargoPlazoSlice &
  SolicitudInscripcionLargoPlazoSlice &
  ComentarioApartadoLargoPlazoSlice &
  DocumentosLargoPlazoSlice &
  FuenteDePagoLargoPlazoSlice &
  AutorizacionLargoPlazoSlice;

export const useLargoPlazoStore = create<SolicitudStoreCSLP>()((...x) => ({
  ...createEncabezadoLargoPlazoSlice(...x),
  ...createInformacionGeneralLargoPlazoSlice(...x),
  ...createCondicionFinancieraLargoPlazoSlice(...x),
  ...createPagosCapitalLargoPlazoSlice(...x),
  ...createTasaEfectivaLargoPlazoSlice(...x),
  ...createSolicitudInscripcionLargoPlazoSlice(...x),
  ...createComentarioLargoPlazoSlice(...x),
  ...createDocumentoLargoPlazoSlice(...x),
  ...createFuentePagoLargoPLazoSlice(...x),
  ...createAutorizacionLargoPlazoSlice(...x),
}));

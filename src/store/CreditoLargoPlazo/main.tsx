import { create } from "zustand";

import {
  AgregarAutorizacionLargoPlazoSlice,
  createAgregarAutorizacionLargoPlazoSlice,
} from "../Autorizacion/agregarAutorizacion";
import {
  FuenteDePagoLargoPlazoSlice,
  createFuentePagoLargoPLazoSlice,
} from "./FuenteDePago";
import {
  ComentarioApartadoLargoPlazoSlice,
  createComentarioLargoPlazoSlice,
} from "./comentarios_apartado";
import {
  CondicionFinancieraLargoPlazoSlice,
  createCondicionFinancieraLargoPlazoSlice,
} from "./condicion_financiera";
import {
  DocumentosLargoPlazoSlice,
  createDocumentoLargoPlazoSlice,
} from "./documentacion";
import {
  EncabezadoLargoPlazoSlice,
  createEncabezadoLargoPlazoSlice,
} from "./encabezado";
import {
  InformacionGeneralLargoPlazoSlice,
  createInformacionGeneralLargoPlazoSlice,
} from "./informacion_general";
import {
  PagosCapitalLargoPlazoSlice,
  createPagosCapitalLargoPlazoSlice,
} from "./pagos_capital";
import {
  SolicitudInscripcionLargoPlazoSlice,
  createSolicitudInscripcionLargoPlazoSlice,
} from "./solicitud_inscripcion";
import {
  TasaEfectivaLargoPlazoSlice,
  createTasaEfectivaLargoPlazoSlice,
} from "./tasa_efectiva";

export type SolicitudStoreCSLP = EncabezadoLargoPlazoSlice &
  InformacionGeneralLargoPlazoSlice &
  CondicionFinancieraLargoPlazoSlice &
  PagosCapitalLargoPlazoSlice &
  TasaEfectivaLargoPlazoSlice &
  SolicitudInscripcionLargoPlazoSlice &
  ComentarioApartadoLargoPlazoSlice &
  DocumentosLargoPlazoSlice &
  FuenteDePagoLargoPlazoSlice &
  AgregarAutorizacionLargoPlazoSlice;

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
  ...createAgregarAutorizacionLargoPlazoSlice(...x),
}));

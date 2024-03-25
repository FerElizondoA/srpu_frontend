import { create } from "zustand";

import {
  AgregarAutorizacionLargoPlazoSlice,
  createAgregarAutorizacionLargoPlazoSlice,
} from "../Autorizacion/agregarAutorizacion";
import {
  FuenteDePagoLargoPlazoSlice,
  createFuentePagoLargoPLazoSlice,
} from "./fuenteDePago";
import {
  ComentarioApartadoLargoPlazoSlice,
  createComentarioLargoPlazoSlice,
} from "./comentarios_apartado";
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
import {
  CondicionFinancieraSlice,
  createCondicionFinancieraSlice,
} from "./condicion_financiera";

export type SolicitudStoreCSLP = EncabezadoLargoPlazoSlice &
  InformacionGeneralLargoPlazoSlice &
  CondicionFinancieraSlice &
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
  ...createCondicionFinancieraSlice(...x),
  ...createPagosCapitalLargoPlazoSlice(...x),
  ...createTasaEfectivaLargoPlazoSlice(...x),
  ...createSolicitudInscripcionLargoPlazoSlice(...x),
  ...createComentarioLargoPlazoSlice(...x),
  ...createDocumentoLargoPlazoSlice(...x),
  ...createFuentePagoLargoPLazoSlice(...x),
  ...createAgregarAutorizacionLargoPlazoSlice(...x),
}));

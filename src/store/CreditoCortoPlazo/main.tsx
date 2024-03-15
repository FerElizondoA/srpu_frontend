import { create } from "zustand";

import {
  createSolicitudFirmaSlice,
  SolicitudFirmaSlice,
} from "../SolicitudFirma/solicitudFirma";
import {
  ComentarioApartadoSlice,
  createComentarioSlice,
} from "./comentarios_apartado";
import {
  CondicionFinancieraSlice,
  createCondicionFinancieraSlice,
} from "./condicion_financiera";
import { createDocumentoSlice, DocumentosSlice } from "./documentacion";
import { createEncabezadoSlice, EncabezadoSlice } from "./encabezado";
import {
  createInformacionGeneralSlice,
  InformacionGeneralSlice,
} from "./informacion_general";
import { createPagosCapitalSlice, PagosCapitalSlice } from "./pagos_capital";
import {
  createSolicitudInscripcionSlice,
  SolicitudInscripcionSlice,
} from "./solicitud_inscripcion";
import { createTasaEfectivaSlice, TasaEfectivaSlice } from "./tasa_efectiva";

export type SolicitudStore = EncabezadoSlice &
  InformacionGeneralSlice &
  SolicitudInscripcionSlice &
  PagosCapitalSlice &
  TasaEfectivaSlice &
  CondicionFinancieraSlice &
  DocumentosSlice &
  ComentarioApartadoSlice &
  SolicitudFirmaSlice;

export const useCortoPlazoStore = create<SolicitudStore>()((...x) => ({
  ...createEncabezadoSlice(...x),
  ...createInformacionGeneralSlice(...x),
  ...createSolicitudInscripcionSlice(...x),
  ...createPagosCapitalSlice(...x),
  ...createTasaEfectivaSlice(...x),
  ...createCondicionFinancieraSlice(...x),
  ...createDocumentoSlice(...x),
  ...createComentarioSlice(...x),
  ...createSolicitudFirmaSlice(...x),
}));

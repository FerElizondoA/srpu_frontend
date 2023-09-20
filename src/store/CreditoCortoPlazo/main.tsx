import { create } from "zustand";

import { createEncabezadoSlice, EncabezadoSlice } from "./encabezado";
import {
  createInformacionGeneralSlice,
  InformacionGeneralSlice,
} from "./informacion_general";
import {
  createSolicitudInscripcionSlice,
  SolicitudInscripcionSlice,
} from "./solicitud_inscripcion";
import { createPagosCapitalSlice, PagosCapitalSlice } from "./pagos_capital";
import { createTasaEfectivaSlice, TasaEfectivaSlice } from "./tasa_efectiva";
import {
  createCondicionFinancieraSlice,
  CondicionFinancieraSlice,
} from "./condicion_financiera";
import { createDocumentoSlice, DocumentosSlice } from "./documentacion";
import {
  ComentarioApartadoSlice,
  createComentarioSlice,
} from "./comentarios_apartado";
import {
  createFideicomisoSlice,
  FideicomisoSlice,
} from "../Fideicomiso/fideicomiso";
import {
  createSolicitudFirmaSlice,
  SolicitudFirmaSlice,
} from "../SolicitudFirma/solicitudFirma";
import {
  createInstruccionesIrrevocables,
  InstruccionesIrrevocablesSlice,
} from "../InstruccionesIrrevocables/instruccionesIrrevocables";


export type SolicitudStore = EncabezadoSlice &
  InformacionGeneralSlice &
  SolicitudInscripcionSlice &
  PagosCapitalSlice &
  TasaEfectivaSlice &
  CondicionFinancieraSlice &
  DocumentosSlice &
  ComentarioApartadoSlice &
  FideicomisoSlice &
  SolicitudFirmaSlice &
  InstruccionesIrrevocablesSlice ;


export const useCortoPlazoStore = create<SolicitudStore>()((...x) => ({
  ...createEncabezadoSlice(...x),
  ...createInformacionGeneralSlice(...x),
  ...createSolicitudInscripcionSlice(...x),
  ...createPagosCapitalSlice(...x),
  ...createTasaEfectivaSlice(...x),
  ...createCondicionFinancieraSlice(...x),
  ...createDocumentoSlice(...x),
  ...createComentarioSlice(...x),
  ...createFideicomisoSlice(...x),
  ...createSolicitudFirmaSlice(...x),
  ...createInstruccionesIrrevocables(...x),


}));

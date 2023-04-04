import {create} from "zustand";

import { createEncabezadoSlice, EncabezadoSlice } from "./encabezado";
import { createInformacionGeneralSlice, InformacionGeneralSlice } from "./informacion_general";
import { createSolicitudInscripcionSlice, SolicitudInscripcionSlice } from "./solicitud_inscripcion";
import { createPagosCapitalSlice, PagosCapitalSlice } from "./pagos_capital";
import { createTasaEfectivaSlice, TasaEfectivaSlice } from "./tasa_efectiva";
import { createCondicionFinancieraSlice, CondicionFinancieraSlice } from "./condicion_financiera";
import { createDocumentoSlice, DocumentosSlice } from "./documentacion";

export type SolicitudSlice = EncabezadoSlice & InformacionGeneralSlice
                & SolicitudInscripcionSlice & PagosCapitalSlice
                & TasaEfectivaSlice & CondicionFinancieraSlice & DocumentosSlice;

export const useCortoPlazoStore = create<SolicitudSlice>()((...x) => ({
    ...createEncabezadoSlice(...x),
    ...createInformacionGeneralSlice(...x),
    ...createSolicitudInscripcionSlice(...x),
    ...createPagosCapitalSlice(...x),
    ...createTasaEfectivaSlice(...x),
    ...createCondicionFinancieraSlice(...x),
    ...createDocumentoSlice(...x)
}))


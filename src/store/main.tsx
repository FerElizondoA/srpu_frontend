import create from "zustand";

import { createEncabezadoSlice, EncabezadoSlice } from "./encabezado";
import { createInformacionGeneralSlice, InformacionGeneralSlice } from "./informacion_general";
import { createSolicitudInscripcionSlice, SolicitudInscripcionSlice } from "./solicitud_inscripcion";
import { createPagosCapitalSlice, PagosCapitalSlice } from "./pagos_capital";

type AllSlice = EncabezadoSlice & InformacionGeneralSlice
                & SolicitudInscripcionSlice & PagosCapitalSlice;

export const useCortoPlazoStore = create<AllSlice>()((...x) => ({
    ...createEncabezadoSlice(...x),
    ...createInformacionGeneralSlice(...x),
    ...createSolicitudInscripcionSlice(...x),
    ...createPagosCapitalSlice(...x)
}))


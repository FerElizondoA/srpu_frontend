// export const useLargoPlazoStore = create<SolicitudStore>()((...x) => ({
//     // ...createEncabezadoSlice(...x),
//     // ...createInformacionGeneralSlice(...x),
//     // ...createSolicitudInscripcionSlice(...x),
//     // ...createPagosCapitalSlice(...x),
//     // ...createTasaEfectivaSlice(...x),
//     // ...createCondicionFinancieraSlice(...x),
//     // ...createDocumentoSlice(...x),
//     // ...createComentarioSlice(...x),
//   }));
import { create } from "zustand";

import { EncabezadoLargoPlazoSlice, createEncabezadoLargoPlazoSlice } from "./encabezado";
import {createInformacionGeneralLargoPlazoSlice, InformacionGeneralLargoPlazoSlice} from "./informacion_general"


export type SolicitudStoreCSLP =

EncabezadoLargoPlazoSlice &
InformacionGeneralLargoPlazoSlice

export const useLargoPlazoStore = create<SolicitudStoreCSLP>()((...x) => ({
    ...createEncabezadoLargoPlazoSlice(...x),
    ...createInformacionGeneralLargoPlazoSlice(...x)
}))

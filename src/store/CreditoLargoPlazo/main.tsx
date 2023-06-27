
import { create } from "zustand";

import { EncabezadoLargoPlazoSlice, createEncabezadoLargoPlazoSlice } from "./encabezado";
import {createInformacionGeneralLargoPlazoSlice, InformacionGeneralLargoPlazoSlice} from "./informacion_general"
import {CondicionFinancieraLargoPlazoSlice, createCondicionFinancieraLargoPlazoSlice } from "./condicion_financiera";
import {PagosCapitalLargoPlazoSlice,createPagosCapitalLargoPlazoSlice} from "./pagos_capital"
import {createTasaEfectivaLargoPlazoSlice, TasaEfectivaLargoPlazoSlice} from "./tasa_efectiva"

export type SolicitudStoreCSLP =

EncabezadoLargoPlazoSlice &
InformacionGeneralLargoPlazoSlice &
CondicionFinancieraLargoPlazoSlice &
PagosCapitalLargoPlazoSlice &
TasaEfectivaLargoPlazoSlice


export const useLargoPlazoStore = create<SolicitudStoreCSLP>()((...x) => ({
    ...createEncabezadoLargoPlazoSlice(...x),
    ...createInformacionGeneralLargoPlazoSlice(...x),
    ...createCondicionFinancieraLargoPlazoSlice(...x),
    ...createPagosCapitalLargoPlazoSlice(...x),
    ...createTasaEfectivaLargoPlazoSlice(...x)
}))

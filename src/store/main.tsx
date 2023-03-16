import create from "zustand";

import { createEncabezadoSlice, EncabezadoSlice } from "./encabezado";
import { createInformacionGeneralSlice, InformacionGeneralSlice } from "./informacion_general";
import {createSolicitudInscripcionSlice, SolicitudInscripcionSlice} from "./solicitud_inscripcion";
export const useCortoPlazoStore = create<EncabezadoSlice & InformacionGeneralSlice & SolicitudInscripcionSlice>()((...x) => ({
    ...createEncabezadoSlice(...x),
    ...createInformacionGeneralSlice(...x),
    ...createSolicitudInscripcionSlice(...x)
}))


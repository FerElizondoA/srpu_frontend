import { StateCreator } from "zustand";
import dayjs, { Dayjs} from "dayjs";
import axios from "axios";

export interface InformacionGeneralSlice{
    institucionCatalog: string[],
    destinoCatalog: string[],
    fechaContratacion: string,
    plazoDias: number,
    montoOriginal: number,
    fechaVencimiento: string,
    destino: string,
    denominacion: string,
    changeFechaContratacion: (newFechaContratacion: string) => void,
    changePlazoDias: (newPlazoDias: number) => void,
    changeMontoOriginal: (newMontoOriginal: number) => void,
    changeFechaVencimiento: (newFechaVencimiento: string) => void,
    changeDestino: (newDestino: string) => void,
    changeDenominacion: (newDenominacion: string) => void,
    fetchDestinos: () => void,
    fetchInstituciones: () => void
}

export const createInformacionGeneralSlice: StateCreator<InformacionGeneralSlice> = (set) => ({
    institucionCatalog: [],
    destinoCatalog: [],
    fechaContratacion: "DD-MM-YYYY",
    plazoDias: 0,
    montoOriginal: 0,
    fechaVencimiento: "DD-MM-YYYY",
    destino: "",
    denominacion: "",
    changeFechaContratacion: (newFechaContratacion: string) => set(() =>  ({fechaContratacion: newFechaContratacion})),
    changePlazoDias: (newPlazoDias: number) => set(() => ({ plazoDias: newPlazoDias })),
    changeMontoOriginal: (newMontoOriginal: number) => set(() => ({ montoOriginal: newMontoOriginal })),
    changeFechaVencimiento: (newFechaVencimiento: string) => set(() => ({ fechaVencimiento: newFechaVencimiento})),
    changeDestino: (newDestino: string) => set(() => ({ destino: newDestino })),
    changeDenominacion: (newDenominacion: string) => set(() => ({ denominacion: newDenominacion })),
    fetchDestinos: async () => {
        const response = await axios.get("http://10.200.4.199:8000/api/get-destinos", {
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        })
        response.data.data.forEach((e: any) => {
            set((state) => ({ destinoCatalog: [...state.destinoCatalog, e]}))
        })
    },
    fetchInstituciones: async () => {
        const response = await axios.get("http://10.200.4.199:8000/api/get-institucionesFinancieras", {
            headers: {
                Authorization: localStorage.getItem("jwtToken"),
            },
        })
        response.data.data.forEach((e: any) => {
            set((state) => ({ institucionCatalog: [...state.institucionCatalog, e]}))
        })
    }
})
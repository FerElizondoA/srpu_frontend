import { StateCreator } from "zustand";

export type TasaInteres = {
    id: string;
    fechaPrimerPago: string;
    tasaFija: string;
    periocidadPago: string;
    tasaReferencia: string;
    sobreTasa: string;
    diasEjercicio: string;
}

export interface PagosCapitalSlice {
    disposicionFechaContratacion: string;
    disposicionImporte: number;
    capitalFechaPrimerPago: string;
    capitalPeriocidadPago: string;
    capitalNumeroPago: number;
    tasaFechaPrimerPago: string;
    tasaPeriocidadPago: string;
    tasaReferencia: string;
    sobreTasa: string;
    tasaDiasEjercicio: string;
    tasaInteresTable: TasaInteres[];
    changeDisposicionFechaContratacion: (newFechaContratacion: string) => void;
    changeDisposicionImporte: (newImporte: number) => void;
    changeCapitalFechaPrimerPago: (newFechaPrimerPago: string) => void;
    changeCapitalPeriocidadPago: (newPeriocidadPago: string) => void;
    changeCapitalNumeroPago: (newNumeroPago: number) => void;
    changeTasaFechaPrimerPago: (newFechaPrimerPago: string) => void;
    changeTasaPeriocidadPago: (newPeriocidadPago: string) => void;
    changeTasaReferencia: (newTasaReferencia: string) => void;
    changeSobreTasa: (newSobreTasa: string) => void;
    changeTasaDiasEjercicio: (newDiasEjercicio: string) => void;
    addTasaInteres: (newTasaInteres: TasaInteres) => void;
    removeTasaInteres: (index: number) => void;
}

export const createPagosCapitalSlice: StateCreator<PagosCapitalSlice> = (set) => ({
    disposicionFechaContratacion: "",
    disposicionImporte: 0,
    capitalFechaPrimerPago: "",
    capitalPeriocidadPago: "",
    capitalNumeroPago: 0,
    tasaFechaPrimerPago: "",
    tasaPeriocidadPago: "",
    tasaReferencia: "",
    sobreTasa: "",
    tasaDiasEjercicio: "",
    tasaInteresTable: [],
    changeDisposicionFechaContratacion: (newFechaContratacion: string) => set(() => ({disposicionFechaContratacion: newFechaContratacion})),
    changeDisposicionImporte: (newImporte: number) => set(() => ({disposicionImporte: newImporte})),
    changeCapitalFechaPrimerPago: (newFechaPrimerPago: string) => set(() => ({capitalFechaPrimerPago: newFechaPrimerPago})),
    changeCapitalPeriocidadPago: (newPeriocidadPago: string) => set(() => ({capitalPeriocidadPago: newPeriocidadPago})),
    changeCapitalNumeroPago: (newNumeroPago: number) => set(() => ({capitalNumeroPago: newNumeroPago})),
    changeTasaFechaPrimerPago: (newFechaPrimerPago: string) => set(() => ({tasaFechaPrimerPago: newFechaPrimerPago})),
    changeTasaPeriocidadPago: (newPeriocidadPago: string) => set(() => ({tasaPeriocidadPago: newPeriocidadPago})),
    changeTasaReferencia: (newTasaReferencia: string) => set(() => ({tasaReferencia: newTasaReferencia})),
    changeSobreTasa: (newSobreTasa: string) => set(() => ({sobreTasa: newSobreTasa})),
    changeTasaDiasEjercicio: (newDiasEjercicio: string) => set(() => ({tasaDiasEjercicio: newDiasEjercicio})),
    addTasaInteres: (newTasaInteres: TasaInteres) => set((state) => ({tasaInteresTable: [...state.tasaInteresTable, newTasaInteres]})),
    removeTasaInteres: (index: number) => set((state) => ({tasaInteresTable: state.tasaInteresTable.filter((_, i) => i !== index)}))
})
import { StateCreator } from "zustand";

export type CondicionFinanciera = {
    id: number;
    fechaDisposicion: string;
    importeDisposicion: string;
    fechaPrimerPagoCapital: string;
    periocidadPagoCapital: string;
    fechaPrimerPagoInteres: string;
    tasaInteres: string;
    comisiones: string;
};

export interface CondicionFinancieraSlice {
    condicionFinancieraTable: CondicionFinanciera[];
    addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) => void;
    removeCondicionFinanciera: (index: number) => void;
}

export const createCondicionFinancieraSlice: StateCreator<CondicionFinancieraSlice> = (set) => ({
    condicionFinancieraTable: [],
    addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) => set((state) => ({ condicionFinancieraTable: [...state.condicionFinancieraTable, newCondicionFinanciera] })),
    removeCondicionFinanciera: (index: number) => set((state) => ({ condicionFinancieraTable: state.condicionFinancieraTable.filter((_, i) => i !== index) }))
})
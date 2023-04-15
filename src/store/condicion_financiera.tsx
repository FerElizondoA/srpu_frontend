import { StateCreator } from "zustand";
import { useCortoPlazoStore } from "./main";
import { TasaInteres } from "./pagos_capital";
import { TasaEfectiva } from "./tasa_efectiva";

export type CondicionFinanciera = {
    id: number;
    fechaDisposicion: string;
    importeDisposicion: string;
    fechaPrimerPagoCapital: string;
    periocidadPagoCapital: string;
    fechaPrimerPagoInteres: string;
    tasaInteres: string;
    comisiones: string;
    numeroPagoCapital: number;
    tasasInteres: TasaInteres[];
    tasasEfectivas: TasaEfectiva[];
};

export interface CondicionFinancieraSlice {
    condicionFinancieraTable: CondicionFinanciera[];
    addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) => void;
    loadCondicionFinanciera: (condicionFinanciera: CondicionFinanciera) => void;
    removeCondicionFinanciera: (index: number) => void;
}

export const createCondicionFinancieraSlice: StateCreator<CondicionFinancieraSlice> = (set, get) => ({
    condicionFinancieraTable: [],
    addCondicionFinanciera: (newCondicionFinanciera: CondicionFinanciera) => set((state) => ({ condicionFinancieraTable: [...state.condicionFinancieraTable, newCondicionFinanciera] })),
    loadCondicionFinanciera: (condicionFinanciera: CondicionFinanciera) => {
    },
    removeCondicionFinanciera: (index: number) => set((state) => ({ condicionFinancieraTable: state.condicionFinancieraTable.filter((_, i) => i !== index) })),
})
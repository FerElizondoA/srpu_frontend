import { StateCreator } from "zustand";
import axios from "axios";

export type TasaEfectiva = {
    id: string;
    tipoComision: string;
    fechaPrimerPago: string;
    periocidadPago: string;
    porcentaje: number;
    monto: number;
    hasIVA: boolean;
}

export interface TasaEfectivaSlice {
    fetchedTiposComision: boolean;
    tipoComision: string;
    efectivaFechaContratacion: string;
    efectivaPeriocidadPago: string;
    hasPorcentaje: boolean;
    hasMonto: boolean;
    efectivaPorcentajeFijo: number;
    efectivaMontoFijo: number;
    efectivaDiasEjercicio: string;
    tasaEfectiva: string;
    hasIVA: boolean;
    tasaEfectivaTable: TasaEfectiva[];
    tiposComisionCatalog: string[];
    changeTipoComision: (newTipoComision: string) => void;
    changeEfectivaFechaContratacion: (newEfectivaFechaContratacion: string) => void;
    changeEfectivaPeriocidadPago: (newPeriocidadPago: string) => void;
    changeHasPorcentaje: (newHasPorcentaje: boolean) => void;
    changeHasMonto: (newHasMonto: boolean) => void;
    changeEfectivaPorcentajeFijo: (newEfectivaPorcentajeFijo: number) => void;
    changeEfectivaMontoFijo: (newEfectivaMontoFIjo: number) => void;
    changeEfectivaDiasEjercicio: (newEfectivaDiasEjercicio: string) => void;
    changeTasaEfectiva: (newTasaEfectiva: string) => void;
    changeHasIVA: (newHasIVA: boolean) => void;
    addTasaEfectiva: (newTasaEfectiva: TasaEfectiva) => void;
    removeTasaEfectiva: (index: number) => void;
    fetchTiposComision: () => void;
}

export const createTasaEfectivaSlice: StateCreator<TasaEfectivaSlice> = (set, get) => ({
    fetchedTiposComision: false,
    tipoComision: "",
    efectivaFechaContratacion: "",
    efectivaPeriocidadPago: "",
    hasPorcentaje: false,
    hasMonto: false,
    efectivaPorcentajeFijo: 0,
    efectivaMontoFijo: 0,
    efectivaDiasEjercicio: "",
    tasaEfectiva: "",
    hasIVA: false,
    tasaEfectivaTable: [],
    tiposComisionCatalog: [],
    changeTipoComision: (newTipoComision: string) => set(() => ({tipoComision: newTipoComision})),
    changeEfectivaFechaContratacion: (newEfectivaFechaContratacion: string) => set(() => ({efectivaFechaContratacion: newEfectivaFechaContratacion})),
    changeEfectivaPeriocidadPago: (newPeriocidadPago: string) => set(() => ({efectivaPeriocidadPago: newPeriocidadPago})),
    changeHasPorcentaje: (newHasPorcentaje: boolean) => set(() => ({hasPorcentaje: newHasPorcentaje})),
    changeHasMonto: (newHasMonto: boolean) => set(() => ({hasMonto: newHasMonto})),
    changeEfectivaPorcentajeFijo: (newEfectivaPorcentajeFijo: number) => set(() => ({efectivaPorcentajeFijo: newEfectivaPorcentajeFijo})),
    changeEfectivaMontoFijo: (newEfectivaMontoFIjo: number) => set(() => ({efectivaMontoFijo: newEfectivaMontoFIjo})),
    changeEfectivaDiasEjercicio: (newEfectivaDiasEjercicio: string) => set(() => ({efectivaDiasEjercicio: newEfectivaDiasEjercicio})),
    changeTasaEfectiva: (newTasaEfectiva: string) => set(() => ({tasaEfectiva: newTasaEfectiva})),
    changeHasIVA: (newHasIVA: boolean) => set(() => ({hasIVA: newHasIVA})),
    addTasaEfectiva: (newTasaEfectiva: TasaEfectiva) => set((state) => ({tasaEfectivaTable: [...state.tasaEfectivaTable, newTasaEfectiva]})),
    removeTasaEfectiva: (index: number) => set((state) => ({tasaEfectivaTable: state.tasaEfectivaTable.filter((_, i) => i !== index)})),
    fetchTiposComision: async () => {
        if(!get().fetchedTiposComision){
            console.log("fetchTiposComision executed!");
            const response = await axios.get(
              "http://10.200.4.199:8000/api/get-tipoDeComision",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            console.log(response)
            response.data.data.forEach((e: any) => {
              set((state) => ({
                tiposComisionCatalog: [...state.tiposComisionCatalog, e.Descripcion],
              }));
            });
            set(() => ({fetchedTiposComision: true}))
        }
    }
})
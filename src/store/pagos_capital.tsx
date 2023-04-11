import { StateCreator } from "zustand";
import axios from "axios";

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
    fetchedPeriocidadPago: boolean;
    fetchedTasaReferencia: boolean;
    fetchedDiasEjercicio: boolean;
    disposicionFechaContratacion: string;
    disposicionImporte: number;
    capitalFechaPrimerPago: string;
    IdCapitalPeriocidadPago: string;
    capitalPeriocidadPago: string;
    capitalNumeroPago: number;
    tasaFechaPrimerPago: string;
    tasaPeriocidadPago: string;
    tasaReferencia: string;
    sobreTasa: string;
    tasaDiasEjercicio: string;
    tasaInteresTable: TasaInteres[];
    periocidadDePagoMap: Map<string | null, string>;
    tasaReferenciaMap: Map<string | null, string>;
    diasEjercicioMap: Map<string | null, string>;
    changeDisposicionFechaContratacion: (newFechaContratacion: string) => void;
    changeDisposicionImporte: (newImporte: number) => void;
    changeCapitalFechaPrimerPago: (newFechaPrimerPago: string) => void;
    changeCapitalPeriocidadPago: (newId: string, newPeriocidadPago: string) => void;
    changeCapitalNumeroPago: (newNumeroPago: number) => void;
    changeTasaFechaPrimerPago: (newFechaPrimerPago: string) => void;
    changeTasaPeriocidadPago: (newPeriocidadPago: string) => void;
    changeTasaReferencia: (newId: string, newTasaReferencia: string) => void;
    changeSobreTasa: (newSobreTasa: string) => void;
    changeTasaDiasEjercicio: (newDiasEjercicio: string) => void;
    addTasaInteres: (newTasaInteres: TasaInteres) => void;
    removeTasaInteres: (index: number) => void;
    fetchPeriocidadPago: () => void;
    fetchTasaReferencia: () => void;
    fetchDiasEjercicio: () => void;
}

export const createPagosCapitalSlice: StateCreator<PagosCapitalSlice> = (set, get) => ({
    fetchedPeriocidadPago: false,
    fetchedTasaReferencia: false,
    fetchedDiasEjercicio: false,
    disposicionFechaContratacion: new Date().toString(),
    disposicionImporte: 0,
    capitalFechaPrimerPago: new Date().toString(),
    IdCapitalPeriocidadPago: "",
    capitalPeriocidadPago: "",
    capitalNumeroPago: 0,
    tasaFechaPrimerPago: new Date().toString(),
    tasaPeriocidadPago: "",
    tasaReferencia: "",
    sobreTasa: "",
    tasaDiasEjercicio: "",
    tasaInteresTable: [],
    periocidadDePagoMap: new Map<string | null, string>(),
    tasaReferenciaMap: new Map<string | null, string>(),
    diasEjercicioMap: new Map<string | null, string>(),
    changeDisposicionFechaContratacion: (newFechaContratacion: string) => set(() => ({disposicionFechaContratacion: newFechaContratacion})),
    changeDisposicionImporte: (newImporte: number) => set(() => ({disposicionImporte: newImporte})),
    changeCapitalFechaPrimerPago: (newFechaPrimerPago: string) => set(() => ({capitalFechaPrimerPago: newFechaPrimerPago})),
    changeCapitalPeriocidadPago: (newId: string, newPeriocidadPago: string) => set(() => ({capitalPeriocidadPago: newPeriocidadPago, IdCapitalPeriocidadPago: newId})),
    changeCapitalNumeroPago: (newNumeroPago: number) => set(() => ({capitalNumeroPago: newNumeroPago})),
    changeTasaFechaPrimerPago: (newFechaPrimerPago: string) => set(() => ({tasaFechaPrimerPago: newFechaPrimerPago})),
    changeTasaPeriocidadPago: (newPeriocidadPago: string) => set(() => ({tasaPeriocidadPago: newPeriocidadPago})),
    changeTasaReferencia: (newTasaReferencia: string) => set(() => ({tasaReferencia: newTasaReferencia})),
    changeSobreTasa: (newSobreTasa: string) => set(() => ({sobreTasa: newSobreTasa})),
    changeTasaDiasEjercicio: (newDiasEjercicio: string) => set(() => ({tasaDiasEjercicio: newDiasEjercicio})),
    addTasaInteres: (newTasaInteres: TasaInteres) => set((state) => ({tasaInteresTable: [...state.tasaInteresTable, newTasaInteres]})),
    removeTasaInteres: (index: number) => set((state) => ({tasaInteresTable: state.tasaInteresTable.filter((_, i) => i !== index)})),
    fetchPeriocidadPago: async () => {
        if(!get().fetchedPeriocidadPago){
            const response = await axios.get(
              process.env.REACT_APP_APPLICATION_BACK + "/api/get-periodicidadDePago",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            response.data.data.forEach((e: any) => {
              set((state) => ({
                periocidadDePagoMap: new Map(state.periocidadDePagoMap).set(e.Descripcion, e.Id)
              }));
            });
            set(() => ({fetchedPeriocidadPago: true}))
        }
    },
    fetchTasaReferencia: async () => {
        if(!get().fetchedTasaReferencia){
            const response = await axios.get(
              process.env.REACT_APP_APPLICATION_BACK + "/api/get-tasaDeReferencia",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            response.data.data.forEach((e: any) => {
              set((state) => ({
                tasaReferenciaMap: new Map(state.tasaReferenciaMap).set(e.Descripcion, e.Id)
              }));
            });
            set(() => ({fetchedTasaReferencia: true}))
        }
    },
    fetchDiasEjercicio: async () => {
        if(!get().fetchedDiasEjercicio){
            const response = await axios.get(
              process.env.REACT_APP_APPLICATION_BACK + "/api/get-diasDelEjercicio",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            response.data.data.forEach((e: any) => {
              set((state) => ({
                diasEjercicioMap: new Map(state.diasEjercicioMap).set(e.Descripcion, e.Id)
              }));
            });
            set(() => ({fetchedDiasEjercicio: true}))
        }
    }
})
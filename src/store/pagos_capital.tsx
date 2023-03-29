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
    capitalPeriocidadPago: string;
    capitalNumeroPago: number;
    tasaFechaPrimerPago: string;
    tasaPeriocidadPago: string;
    tasaReferencia: string;
    sobreTasa: string;
    tasaDiasEjercicio: string;
    tasaInteresTable: TasaInteres[];
    periocidadDePagoCatalog: string[];
    tasaReferenciaCatalog: string[];
    diasEjercicioCatalog: string[];
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
    capitalPeriocidadPago: "",
    capitalNumeroPago: 0,
    tasaFechaPrimerPago: new Date().toString(),
    tasaPeriocidadPago: "",
    tasaReferencia: "",
    sobreTasa: "",
    tasaDiasEjercicio: "",
    tasaInteresTable: [],
    periocidadDePagoCatalog: [],
    tasaReferenciaCatalog: [],
    diasEjercicioCatalog: [],
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
    removeTasaInteres: (index: number) => set((state) => ({tasaInteresTable: state.tasaInteresTable.filter((_, i) => i !== index)})),
    fetchPeriocidadPago: async () => {
        if(!get().fetchedPeriocidadPago){
            console.log("fetchPeriocidadPago executed!");
            const response = await axios.get(
              "http://10.200.4.199:8000/api/get-periodicidadDePago",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            console.log(response)
            response.data.data.forEach((e: any) => {
              set((state) => ({
                periocidadDePagoCatalog: [...state.periocidadDePagoCatalog, e.Descripcion],
              }));
            });
            set(() => ({fetchedPeriocidadPago: true}))
        }
    },
    fetchTasaReferencia: async () => {
        if(!get().fetchedTasaReferencia){
            console.log("fetchTasaReferencia executed!");
            const response = await axios.get(
              "http://10.200.4.199:8000/api/get-tasaDeReferencia",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            console.log(response)
            response.data.data.forEach((e: any) => {
              set((state) => ({
                tasaReferenciaCatalog: [...state.tasaReferenciaCatalog, e.Descripcion],
              }));
            });
            set(() => ({fetchedTasaReferencia: true}))
        }
    },
    fetchDiasEjercicio: async () => {
        if(!get().fetchedDiasEjercicio){
            console.log("fetchDiasEjercicio executed!");
            const response = await axios.get(
              "http://10.200.4.199:8000/api/get-diasDelEjercicio",
              {
                headers: {
                  Authorization: localStorage.getItem("jwtToken"),
                },
              }
            );
            console.log(response)
            response.data.data.forEach((e: any) => {
              set((state) => ({
                diasEjercicioCatalog: [...state.diasEjercicioCatalog, e.Descripcion],
              }));
            });
            set(() => ({fetchedDiasEjercicio: true}))
        }
    }
})
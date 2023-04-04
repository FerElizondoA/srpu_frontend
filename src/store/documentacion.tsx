import { StateCreator } from "zustand";
import axios from "axios";

export interface DocumentosSlice{
    documentosObligatorios: string;
    documentosObligatoriosArreglo: string[];
    changeDocumentosObligatorios: (newDocumentosObligatorios: string) => void;
    changeDocumentosObligatoriosArreglo: (newDocumentosObligatoriosArreglo: string) => void;
}


export const createDocumentoSlice: StateCreator<DocumentosSlice> = (set, get) => ({

documentosObligatorios: "",
documentosObligatoriosArreglo: [],
changeDocumentosObligatorios: (newDocumentosObligatorios: string) => set(() => ({documentosObligatorios: newDocumentosObligatorios})),
changeDocumentosObligatoriosArreglo: (newDocumentosObligatoriosArreglo: string) =>set((state) => ({ documentosObligatoriosArreglo: [...state.documentosObligatoriosArreglo, newDocumentosObligatoriosArreglo] })),
})  
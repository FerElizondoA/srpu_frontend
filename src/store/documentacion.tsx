import { StateCreator } from "zustand";
import axios from "axios";
import { IFile } from "../components/ObligacionesCortoPlazoPage/panels/Documentacion";


export interface DocumentosSlice{
    
    documentosObligatoriosArreglo: IFile[];
    
    addDocumentosObligatoriosArreglo: (newDocumentosObligatoriosArreglo: IFile) => void;
}


export const createDocumentoSlice: StateCreator<DocumentosSlice> = (set, get) => ({


documentosObligatoriosArreglo: [],

addDocumentosObligatoriosArreglo: (newDocumentosObligatoriosArreglo: IFile) =>set((state) => ({ documentosObligatoriosArreglo: [...state.documentosObligatoriosArreglo, newDocumentosObligatoriosArreglo] })),
})  
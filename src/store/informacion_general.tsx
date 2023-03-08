import { StateCreator } from "zustand";
import axios from "axios";

export interface InformacionGeneralSlice {
  fetchedInstitucion: boolean;
  fetchedDestino: boolean;
  institucionCatalog: string[];
  destinoCatalog: string[];
  fechaContratacion: string;
  plazoDias: number;
  montoOriginal: number;
  fechaVencimiento: string;
  destino: string;
  institucion: string;
  denominacion: string;
  changeFechaContratacion: (newFechaContratacion: string) => void;
  changePlazoDias: (newPlazoDias: number) => void;
  changeMontoOriginal: (newMontoOriginal: number) => void;
  changeFechaVencimiento: (newFechaVencimiento: string) => void;
  changeDestino: (newDestino: string) => void;
  changeInstitucion: (newInstitucion: string) => void;
  changeDenominacion: (newDenominacion: string) => void;
  fetchDestinos: (fetch: boolean) => void;
  fetchInstituciones: (fetch: boolean) => void;
}

export const createInformacionGeneralSlice: StateCreator<InformacionGeneralSlice> = (set,get) => ({
    fetchedInstitucion: false,
    fetchedDestino: false,
    institucionCatalog: [],
    destinoCatalog: [],
    fechaContratacion: "DD-MM-YYYY",
    plazoDias: 0,
    montoOriginal: 0,
    fechaVencimiento: "DD-MM-YYYY",
    destino: "",
    institucion: "",
    denominacion: "UDIS",
    changeFechaContratacion: (newFechaContratacion: string) => set(() =>  ({fechaContratacion: newFechaContratacion})),
    changePlazoDias: (newPlazoDias: number) => set(() => ({ plazoDias: newPlazoDias })),
    changeMontoOriginal: (newMontoOriginal: number) => set(() => ({ montoOriginal: newMontoOriginal })),
    changeFechaVencimiento: (newFechaVencimiento: string) => set(() => ({ fechaVencimiento: newFechaVencimiento})),
    changeDestino: (newDestino: string) => set(() => ({ destino: newDestino })),
    changeInstitucion: (newInstitucion: string) => set(() => ({ institucion: newInstitucion })),
    changeDenominacion: (newDenominacion: string) => set(() => ({ denominacion: newDenominacion })),
    fetchDestinos: async () => {
        if (!get().fetchedDestino) {
          console.log("fetchDestinos executed!");
          const response = await axios.get(
            "http://10.200.4.199:8000/api/get-destinos",
            {
              headers: {
                Authorization: localStorage.getItem("jwtToken"),
              },
            }
          );
          response.data.data.forEach((e: any) => {
            set((state) => ({
              destinoCatalog: [...state.destinoCatalog, e.Destino],
            }));
          });
          set(() => ({fetchedDestino: true}))
        }
    },
    fetchInstituciones: async () => {
      if (!get().fetchedInstitucion) {
        console.log("fetchInstituciones executed!");
        const response = await axios.get(
          "http://10.200.4.199:8000/api/get-institucionesFinancieras",
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );
        response.data.data.forEach((e: any) => {
          set((state) => ({
            institucionCatalog: [...state.institucionCatalog, e.Institucion],
          }));
        });
      }
      set(() => ({fetchedInstitucion: true}))
    }
})
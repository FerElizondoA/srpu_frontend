import { StateCreator } from "zustand";
import { differenceInDays } from "date-fns";
import { useCortoPlazoStore } from "./main";
import axios from "axios";
import { addDays } from "date-fns/esm";

export interface InformacionGeneralSlice {
  fetchedInstitucion: boolean;
  fetchedDestino: boolean;
  institucionCatalog: string[];
  destinoCatalog: string[];
  plazoDias: number;
  montoOriginal: number;
  fechaVencimiento: string;
  destino: string;
  institucion: string;
  denominacion: string;
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
    plazoDias: 0,
    montoOriginal: 0,
    fechaVencimiento: "",
    destino: "",
    institucion: "",
    denominacion: "Pesos",
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
          console.log(response)
          response.data.data.forEach((e: any) => {
            set((state) => ({
              destinoCatalog: [...state.destinoCatalog, e.Descripcion],
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
            institucionCatalog: [...state.institucionCatalog, e.Descripcion],
          }));
        });
      }
      set(() => ({fetchedInstitucion: true}))
    }
})
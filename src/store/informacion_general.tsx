import { StateCreator } from "zustand";
import axios from "axios";

export interface InformacionGeneralSlice {
  fetchedInstitucion: boolean;
  fetchedDestino: boolean;
  fetchedObligadoSolidarioAval: boolean;
  fetchedTipoEntePublicoObligado: boolean;
  institucionCatalog: string[];
  destinoCatalog: string[];
  obligadoSolidarioAvalCatalog: string[];
  tipoEntePublicoObligadoCatalog: string[];
  plazoDias: number;
  montoOriginal: number;
  fechaVencimiento: string;
  destino: string;
  tipoEntePublicoObligado: string;
  obligadoSolidarioAval: string;
  institucion: string;
  denominacion: string;
  changePlazoDias: (newPlazoDias: number) => void;
  changeMontoOriginal: (newMontoOriginal: number) => void;
  changeFechaVencimiento: (newFechaVencimiento: string) => void;
  changeDestino: (newDestino: string) => void;
  changeInstitucion: (newInstitucion: string) => void;
  changeDenominacion: (newDenominacion: string) => void;
  changeObligadoSolidarioAval: (newObligadoSolidarioAval: string) => void;
  changeTipoEntePublicoObligado: (newTipoEntePublicoObligado: string) => void;
  fetchDestinos: () => void;
  fetchInstituciones: () => void;
  fetchTipoEntePublicoObligado: () => void;
  fetchObligadoSolidarioAval: () => void;
}

export const createInformacionGeneralSlice: StateCreator<InformacionGeneralSlice> = (set,get) => ({
    fetchedInstitucion: false,
    fetchedDestino: false,
    fetchedObligadoSolidarioAval: false,
    fetchedTipoEntePublicoObligado: false,
    institucionCatalog: [],
    destinoCatalog: [],
    obligadoSolidarioAvalCatalog: [],
    tipoEntePublicoObligadoCatalog: [],
    plazoDias: 0,
    montoOriginal: 0,
    fechaVencimiento: "",
    destino: "",
    institucion: "",
    tipoEntePublicoObligado: "",
    obligadoSolidarioAval: "",
    denominacion: "Pesos",
    changePlazoDias: (newPlazoDias: number) => set(() => ({ plazoDias: newPlazoDias })),
    changeMontoOriginal: (newMontoOriginal: number) => set(() => ({ montoOriginal: newMontoOriginal })),
    changeFechaVencimiento: (newFechaVencimiento: string) => set(() => ({ fechaVencimiento: newFechaVencimiento})),
    changeDestino: (newDestino: string) => set(() => ({ destino: newDestino })),
    changeInstitucion: (newInstitucion: string) => set(() => ({ institucion: newInstitucion })),
    changeDenominacion: (newDenominacion: string) => set(() => ({ denominacion: newDenominacion })),
    changeObligadoSolidarioAval: (newObligadoSolidarioAval: string) => set(() => ({ obligadoSolidarioAval: newObligadoSolidarioAval})),
    changeTipoEntePublicoObligado: (newTipoEntePublicoObligado: string) => set(() => ({ tipoEntePublicoObligado: newTipoEntePublicoObligado})),
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
    },
    fetchTipoEntePublicoObligado: async () => {
      if (!get().fetchedTipoEntePublicoObligado) {
        console.log("fetchTipoEntePublicoObligado executed!");
        const response = await axios.get(
          "http://10.200.4.199:8000/api/get-tiposEntePublico",
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );
        response.data.data.forEach((e: any) => {
          set((state) => ({
            tipoEntePublicoObligadoCatalog: [...state.tipoEntePublicoObligadoCatalog, e.Descripcion],
          }));
        });
      }
      set(() => ({fetchedTipoEntePublicoObligado: true}))
    },
    fetchObligadoSolidarioAval: async () => {
      if (!get().fetchedObligadoSolidarioAval) {
        console.log("fetchObligadoSolidarioAval executed!");
        const response = await axios.get(
          "http://10.200.4.199:8000/api/get-obligadoSolidarioAval",
          {
            headers: {
              Authorization: localStorage.getItem("jwtToken"),
            },
          }
        );
        response.data.data.forEach((e: any) => {
          set((state) => ({
            obligadoSolidarioAvalCatalog: [...state.obligadoSolidarioAvalCatalog, e.Descripcion],
          }));
        });
      }
      set(() => ({fetchedObligadoSolidarioAval: true}))
    }
})
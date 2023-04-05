import { StateCreator } from "zustand";
import axios from "axios";

export type ObligadoSolidarioAval = {
  id: string;
  obligadoSolidario: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
}

export interface InformacionGeneralSlice {
  obligadoSolidarioAvalTable: ObligadoSolidarioAval[];
  fetchedInstitucion: boolean;
  fetchedDestino: boolean;
  fetchedObligadoSolidarioAval: boolean;
  fetchedTipoEntePublicoObligado: boolean;
  institucionMap: Map<string | null, string>;
  institucionCatalog: string[];
  destinoCatalog: string[];
  obligadoSolidarioAvalCatalog: string[];
  tipoEntePublicoObligadoCatalog: string[];
  plazoDias: number;
  montoOriginal: number;
  fechaVencimiento: string;
  destino: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
  obligadoSolidarioAval: string;
  IdInstitucion: string;
  institucion: string;
  denominacion: string;
  addObligadoSolidarioAval: (newObligadoSolidarioAval: ObligadoSolidarioAval) => void;
  removeObligadoSolidarioAval: (index: number) => void;
  changePlazoDias: (newPlazoDias: number) => void;
  changeMontoOriginal: (newMontoOriginal: number) => void;
  changeFechaVencimiento: (newFechaVencimiento: string) => void;
  changeDestino: (newDestino: string) => void;
  changeInstitucionValue: (newId: string, newInstitucion: string) => void;
  changeInstitucion: (newInstitucion: string) => void;
  changeDenominacion: (newDenominacion: string) => void;
  changeObligadoSolidarioAval: (newObligadoSolidarioAval: string) => void;
  changeTipoEntePublicoObligado: (newTipoEntePublicoObligado: string) => void;
  changeEntePublicoObligado: (newEntePublicoObligado: string) => void;
  fetchDestinos: () => void;
  fetchInstituciones: () => void;
  fetchTipoEntePublicoObligado: () => void;
  fetchObligadoSolidarioAval: () => void;
}

export const createInformacionGeneralSlice: StateCreator<InformacionGeneralSlice> = (set,get) => ({
    obligadoSolidarioAvalTable: [],
    fetchedInstitucion: false,
    fetchedDestino: false,
    fetchedObligadoSolidarioAval: false,
    fetchedTipoEntePublicoObligado: false,
    institucionMap: new Map<string | null, string>(),
    institucionCatalog: [],
    destinoCatalog: [],
    obligadoSolidarioAvalCatalog: [],
    tipoEntePublicoObligadoCatalog: [],
    plazoDias: 0,
    montoOriginal: 0,
    fechaVencimiento: new Date().toString(),
    destino: "",
    IdInstitucion: "",
    institucion: "",
    tipoEntePublicoObligado: "",
    entePublicoObligado: "",
    obligadoSolidarioAval: "",
    denominacion: "Pesos",
    addObligadoSolidarioAval: (newObligadoSolidarioAval: ObligadoSolidarioAval) => set((state) => ({ obligadoSolidarioAvalTable: [...state.obligadoSolidarioAvalTable, newObligadoSolidarioAval]})),
    removeObligadoSolidarioAval: (index: number) => set((state) => ({ obligadoSolidarioAvalTable: state.obligadoSolidarioAvalTable.filter((_, i) => i !== index)})),
    changePlazoDias: (newPlazoDias: number) => set(() => ({ plazoDias: newPlazoDias })),
    changeMontoOriginal: (newMontoOriginal: number) => set(() => ({ montoOriginal: newMontoOriginal })),
    changeFechaVencimiento: (newFechaVencimiento: string) => set(() => ({ fechaVencimiento: newFechaVencimiento})),
    changeDestino: (newDestino: string) => set(() => ({ destino: newDestino })),
    changeInstitucionValue: (newId: string, newInstitucion: string) => set(() => ({ institucion: newInstitucion, IdInstitucion: newId })),
    changeInstitucion: (newInstitucion: string) => set(() => ({ institucion: newInstitucion })),
    changeDenominacion: (newDenominacion: string) => set(() => ({ denominacion: newDenominacion })),
    changeObligadoSolidarioAval: (newObligadoSolidarioAval: string) => set(() => ({ obligadoSolidarioAval: newObligadoSolidarioAval})),
    changeTipoEntePublicoObligado: (newTipoEntePublicoObligado: string) => set(() => ({ tipoEntePublicoObligado: newTipoEntePublicoObligado})),
    changeEntePublicoObligado: (newEntePublicoObligado: string) => set(() => ({ entePublicoObligado: newEntePublicoObligado})),
    fetchDestinos: async () => {
        if (!get().fetchedDestino) {
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
              destinoCatalog: [...state.destinoCatalog, e.Descripcion],
            }));
          });
          set(() => ({fetchedDestino: true}))
        }

    },
    fetchInstituciones: async () => {
      if (!get().fetchedInstitucion) {
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
            institucionMap: state.institucionMap.set(e.Descripcion, e.Id)
          }));
        });
      }
      set(() => ({fetchedInstitucion: true}))
    },
    fetchTipoEntePublicoObligado: async () => {
      if (!get().fetchedTipoEntePublicoObligado) {
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
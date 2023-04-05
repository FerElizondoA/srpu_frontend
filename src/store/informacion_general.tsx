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
  destinoMap: Map<string | null, string>;
  obligadoSolidarioAvalMap: Map<string | null, string>;
  tipoEntePublicoObligadoMap: Map<string | null, string>;
  tipoEntePublicoObligadoCatalog: string[];
  plazoDias: number;
  montoOriginal: number;
  fechaVencimiento: string;
  IdDestino: string;
  destino: string;
  IdTipoEntePublicoObligado: string;
  tipoEntePublicoObligado: string;
  entePublicoObligado: string;
  IdObligadoSolidarioAval: string;
  obligadoSolidarioAval: string;
  IdInstitucion: string;
  institucion: string;
  denominacion: string;
  addObligadoSolidarioAval: (newObligadoSolidarioAval: ObligadoSolidarioAval) => void;
  removeObligadoSolidarioAval: (index: number) => void;
  changePlazoDias: (newPlazoDias: number) => void;
  changeMontoOriginal: (newMontoOriginal: number) => void;
  changeFechaVencimiento: (newFechaVencimiento: string) => void;
  changeDestino: (newId: string, newDestino: string) => void;
  changeInstitucion: (newId: string, newInstitucion: string) => void;
  changeDenominacion: (newDenominacion: string) => void;
  changeObligadoSolidarioAval: (newId: string, newObligadoSolidarioAval: string) => void;
  changeTipoEntePublicoObligado: (newId: string, newTipoEntePublicoObligado: string) => void;
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
    destinoMap: new Map<string | null, string>(),
    obligadoSolidarioAvalMap: new Map<string | null, string>(),
    tipoEntePublicoObligadoMap: new Map<string | null, string>(),
    tipoEntePublicoObligadoCatalog: [],
    plazoDias: 0,
    montoOriginal: 0,
    fechaVencimiento: new Date().toString(),
    IdDestino: "",
    destino: "",
    IdInstitucion: "",
    institucion: "",
    IdTipoEntePublicoObligado: "",
    tipoEntePublicoObligado: "",
    entePublicoObligado: "",
    IdObligadoSolidarioAval: "",
    obligadoSolidarioAval: "",
    denominacion: "Pesos",
    addObligadoSolidarioAval: (newObligadoSolidarioAval: ObligadoSolidarioAval) => set((state) => ({ obligadoSolidarioAvalTable: [...state.obligadoSolidarioAvalTable, newObligadoSolidarioAval]})),
    removeObligadoSolidarioAval: (index: number) => set((state) => ({ obligadoSolidarioAvalTable: state.obligadoSolidarioAvalTable.filter((_, i) => i !== index)})),
    changePlazoDias: (newPlazoDias: number) => set(() => ({ plazoDias: newPlazoDias })),
    changeMontoOriginal: (newMontoOriginal: number) => set(() => ({ montoOriginal: newMontoOriginal })),
    changeFechaVencimiento: (newFechaVencimiento: string) => set(() => ({ fechaVencimiento: newFechaVencimiento})),
    changeDestino: (newId: string, newDestino: string) => set(() => ({ destino: newDestino, IdDestino: newId })),
    changeInstitucion: (newId: string, newInstitucion: string) => set(() => ({ institucion: newInstitucion, IdInstitucion: newId })),
    changeDenominacion: (newDenominacion: string) => set(() => ({ denominacion: newDenominacion })),
    changeObligadoSolidarioAval: (newId: string, newObligadoSolidarioAval: string) => set(() => ({ obligadoSolidarioAval: newObligadoSolidarioAval, IdObligadoSolidarioAval: newId})),
    changeTipoEntePublicoObligado: (newId: string, newTipoEntePublicoObligado: string) => set(() => ({ tipoEntePublicoObligado: newTipoEntePublicoObligado, IdTipoEntePublicoObligado: newId})),
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
              destinoMap: new Map(state.destinoMap).set(e.Descripcion, e.Id)
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
            institucionMap: new Map(state.institucionMap).set(e.Descripcion, e.Id)
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
          console.log("tipoEntePublicoObligado: ", e)
          set((state) => ({
            tipoEntePublicoObligadoMap: new Map(state.tipoEntePublicoObligadoMap).set(e.Descripcion, e.Id)
          }));
        });
      }
      console.log("tipoEntePublicoObligadoMap: ", get().tipoEntePublicoObligadoMap)
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
            obligadoSolidarioAvalMap: new Map(state.obligadoSolidarioAvalMap).set(e.Descripcion, e.Id)
          }));
        });
      }
      set(() => ({fetchedObligadoSolidarioAval: true}))
    }
})
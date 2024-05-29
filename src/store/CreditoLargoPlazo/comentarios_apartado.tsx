import { StateCreator } from "zustand";

export interface ComentarioApartadoLargoPlazoSlice {
  comentarios: {};

  cleanComentario: () => void;

  newComentario: (newComentario: {
    Apartado: string;
    Comentario: string;
  }) => void;

  removeComentario: (apartado: string, Tab: string) => void;

  setComentarios: (comentario: any) => void;

  datosActualizar: Array<string>;

  setDatosActualizar: (datos: any) => void;
}

export const createComentarioLargoPlazoSlice: StateCreator<ComentarioApartadoLargoPlazoSlice> = (
  set,
  get
) => ({
  comentarios: {},

  cleanComentario: () => {
    set((state) => ({
      comentarios: {},
    }));
  },

  newComentario: (newComentario: { Apartado: string; Comentario: string }) => {
    set((state) => ({
      comentarios: {
        ...state.comentarios,
        [newComentario.Apartado]: newComentario.Comentario,
      },
    }));
  },

  removeComentario: (apartado: string, Tab: string) => {
    set((state) => ({
      comentarios: {
        ...state.comentarios,
        [apartado]: "",
      },
    }));
  },

  setComentarios: (comentarios: any) => {
    set((state) => ({
      comentarios: comentarios,
    }));
  },

  
  datosActualizar: [],

  setDatosActualizar: (datos: any) => {
    set((state) => ({
      datosActualizar: Object.keys(JSON.parse(datos[0]!.Comentarios)),
    }));
  },
});

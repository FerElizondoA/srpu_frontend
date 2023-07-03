import { StateCreator } from "zustand";

export interface ComentarioApartadoSlice {
  comentarios: {};

  cleanComentario: () => void;

  newComentario: (newComentario: {
    Apartado: string;
    Comentario: string;
  }) => void;

  removeComentario: (apartado: string, Tab: string) => void;

  setComentarios: (comentario: any) => void;
}

export const createComentarioSlice: StateCreator<ComentarioApartadoSlice> = (
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
});

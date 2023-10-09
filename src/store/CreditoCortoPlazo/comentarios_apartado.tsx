import { StateCreator } from "zustand";

export interface ComentarioApartadoSlice {
  idComentario: string;
  comentarios: {};
  comentariosRegistro: {};

  cleanComentario: () => void;

  newComentario: (newComentario: {
    Apartado: string;
    Comentario: string;
  }) => void;

  removeComentario: (apartado: string, Tab: string) => void;

  setComentarios: (comentario: any) => void;
  setComentariosRegistro: (comentario: any) => void;
}

export const createComentarioSlice: StateCreator<ComentarioApartadoSlice> = (
  set,
  get
) => ({
  idComentario: "",
  comentarios: {},
  comentariosRegistro: {},

  cleanComentario: () => {
    set((state) => ({
      comentarios: {},
      comentariosRegistro: {},
      idComentario: "",
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
  setComentariosRegistro: (comentarios: any) => {
    set((state) => ({
      comentariosRegistro: comentarios,
    }));
  },
});
